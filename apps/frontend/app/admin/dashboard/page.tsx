"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Users,
  Car,
  CheckCircle,
  Clock,
  DollarSign,
  AlertCircle,
  FileText,
  TrendingUp,
  Moon,
  Sun,
} from "lucide-react";
import { useTheme } from "next-themes";
import axiosInstance, { getAuthToken } from "@/lib/api";

type Stats = {
  users: {
    total: number;
    customers: number;
    drivers: number;
    admins: number;
  };
  drivers: {
    total: number;
    pending: number;
    verified: number;
    active: number;
  };
  rides: {
    total: number;
    completed: number;
    pending: number;
    in_progress: number;
  };
  revenue: {
    total: number;
    driver_earnings: number;
    commission: number;
  };
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setMounted(true);
    loadStats();
    // Refresh stats every 30 seconds
    const interval = setInterval(loadStats, 30000);
    return () => clearInterval(interval);
  }, []);

  async function loadStats() {
    try {
      const token = getAuthToken();
      if (!token) {
        router.push("/auth/login");
        return;
      }

      const response = await axiosInstance.get("/admin/stats");
      setStats(response.data);
    } catch (e: any) {
      if (e.response?.status === 403 || e.response?.status === 401) {
        setError("Unauthorized: Admin access required");
        setTimeout(() => router.push("/auth/login"), 2000);
      } else {
        setError(e.response?.data?.detail || e.message || "Failed to load stats");
      }
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-gray-600 dark:text-gray-400">Loading admin dashboard...</div>
      </div>
    );
  }

  if (error && !stats) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 p-4">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Access Denied</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
        <Link
          href="/auth/login"
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-black/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Campus Ride Admin</h1>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link href="/admin/dashboard" className="text-gray-900 dark:text-white font-medium">
                Dashboard
              </Link>
              <Link href="/admin/drivers" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                Driver Verification
              </Link>
            </div>
            <div className="flex items-center gap-3">
              {mounted && (
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors rounded-lg"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? (
                    <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  ) : (
                    <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  )}
                </button>
              )}
              <button
                onClick={() => {
                  if (typeof window !== "undefined") {
                    localStorage.removeItem("campusride_access_token");
                    localStorage.removeItem("campusride_refresh_token");
                    router.push("/admin/login");
                  }
                }}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-800">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Admin Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage drivers, rides, and system statistics</p>
          </div>

          {error && (
            <div className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200 p-4 rounded-lg">
              {error}
            </div>
          )}

          {/* Stats Grid */}
          {stats && (
            <>
              {/* Users Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Total Users</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.users.total}</p>
                    </div>
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Customers</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.users.customers}</p>
                    </div>
                    <Users className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Drivers</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.users.drivers}</p>
                    </div>
                    <Car className="w-8 h-8 text-purple-600" />
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Admins</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.users.admins}</p>
                    </div>
                    <Users className="w-8 h-8 text-orange-600" />
                  </div>
                </div>
              </div>

              {/* Drivers Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Total Drivers</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.drivers.total}</p>
                    </div>
                    <Car className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Pending Verification</p>
                      <p className="text-2xl font-bold text-yellow-600">{stats.drivers.pending}</p>
                    </div>
                    <Clock className="w-8 h-8 text-yellow-600" />
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Verified</p>
                      <p className="text-2xl font-bold text-green-600">{stats.drivers.verified}</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Active Drivers</p>
                      <p className="text-2xl font-bold text-blue-600">{stats.drivers.active}</p>
                    </div>
                    <Car className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
              </div>

              {/* Rides Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Total Rides</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.rides.total}</p>
                    </div>
                    <Car className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Pending</p>
                      <p className="text-2xl font-bold text-yellow-600">{stats.rides.pending}</p>
                    </div>
                    <Clock className="w-8 h-8 text-yellow-600" />
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">In Progress</p>
                      <p className="text-2xl font-bold text-blue-600">{stats.rides.in_progress}</p>
                    </div>
                    <Car className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">Completed</p>
                      <p className="text-2xl font-bold text-green-600">{stats.rides.completed}</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                </div>
              </div>

              {/* Revenue Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl shadow-lg p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm mb-1">Total Revenue</p>
                      <p className="text-3xl font-bold">GHS {stats.revenue.total.toFixed(2)}</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-green-100" />
                  </div>
                </div>
                <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm mb-1">Driver Earnings</p>
                      <p className="text-3xl font-bold">GHS {stats.revenue.driver_earnings.toFixed(2)}</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-blue-100" />
                  </div>
                </div>
                <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl shadow-lg p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-sm mb-1">Commission</p>
                      <p className="text-3xl font-bold">GHS {stats.revenue.commission.toFixed(2)}</p>
                    </div>
                    <FileText className="w-8 h-8 text-purple-100" />
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link
                  href="/admin/drivers"
                  className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-600 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                      <Clock className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Driver Verification</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {stats.drivers.pending} pending verification{stats.drivers.pending !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                </Link>
                <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-800">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                      <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Rides Management</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        View and manage all rides
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

