"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  Clock,
  User,
  Car,
  Mail,
  Phone,
  AlertCircle,
  Moon,
  Sun,
} from "lucide-react";
import { useTheme } from "next-themes";
import axiosInstance, { getAuthToken } from "@/lib/api";

type DriverWithUser = {
  id: string;
  user_id: string;
  status: "active" | "inactive";
  verification_status: "pending" | "verified" | "rejected";
  license_number?: string;
  vehicle_model?: string;
  vehicle_plate?: string;
  total_rides: number;
  completed_rides: number;
  average_rating: number;
  total_earnings: number;
  user: {
    id: string;
    email: string;
    phone: string;
    first_name: string;
    last_name: string;
  } | null;
};

export default function AdminDriversPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [drivers, setDrivers] = useState<DriverWithUser[]>([]);
  const [filter, setFilter] = useState<"all" | "pending" | "verified" | "rejected">("pending");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setMounted(true);
    loadDrivers();
  }, [filter]);

  async function loadDrivers() {
    try {
      const token = getAuthToken();
      if (!token) {
        router.push("/auth/login");
        return;
      }

      const params: any = {};
      if (filter !== "all") {
        params.verification_status = filter;
      }

      const response = await axiosInstance.get("/admin/drivers", { params });
      setDrivers(response.data || []);
    } catch (e: any) {
      if (e.response?.status === 403 || e.response?.status === 401) {
        setError("Unauthorized: Admin access required");
        setTimeout(() => router.push("/auth/login"), 2000);
      } else {
        setError(e.response?.data?.detail || e.message || "Failed to load drivers");
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateDriverStatus(userId: string, status: "verified" | "rejected") {
    try {
      setMessage("");
      await axiosInstance.patch("/admin/drivers", {
        user_id: userId,
        verification_status: status,
      });
      setMessage(`Driver ${status === "verified" ? "verified" : "rejected"} successfully!`);
      await loadDrivers();
    } catch (e: any) {
      setMessage(e.response?.data?.detail || e.message || "Failed to update driver status");
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-gray-600 dark:text-gray-400">Loading drivers...</div>
      </div>
    );
  }

  if (error && drivers.length === 0) {
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
              <Link href="/admin/dashboard" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                Dashboard
              </Link>
              <Link href="/admin/drivers" className="text-gray-900 dark:text-white font-medium">
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
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Driver Verification</h1>
                <p className="text-gray-600 dark:text-gray-400">Review and verify driver applications</p>
              </div>
              
              {/* Filter Tabs */}
              <div className="flex gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                {(["all", "pending", "verified", "rejected"] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      filter === f
                        ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {message && (
            <div
              className={`p-4 rounded-lg flex items-start gap-2 ${
                message.includes("successfully")
                  ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200"
                  : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200"
              }`}
            >
              {message.includes("successfully") ? (
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
              )}
              <p>{message}</p>
            </div>
          )}

          {error && (
            <div className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200 p-4 rounded-lg">
              {error}
            </div>
          )}

          {/* Drivers List */}
          {drivers.length === 0 ? (
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-12 text-center border border-gray-200 dark:border-gray-800">
              <Clock className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-lg text-gray-600 dark:text-gray-400">
                No {filter === "all" ? "" : filter} drivers found
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {drivers.map((driver) => (
                <motion.div
                  key={driver.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-800"
                >
                  <div className="flex flex-col lg:flex-row justify-between gap-6">
                    {/* Driver Info */}
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                          <User className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {driver.user?.first_name} {driver.user?.last_name}
                          </h3>
                          <div className="flex items-center gap-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                            <span className="flex items-center gap-1">
                              <Mail className="w-4 h-4" />
                              {driver.user?.email}
                            </span>
                            <span className="flex items-center gap-1">
                              <Phone className="w-4 h-4" />
                              {driver.user?.phone}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Driver Details */}
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {driver.license_number && (
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">License Number</p>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {driver.license_number}
                            </p>
                          </div>
                        )}
                        {driver.vehicle_model && (
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Vehicle Model</p>
                            <p className="text-sm font-medium text-gray-900 dark:text-white flex items-center gap-1">
                              <Car className="w-4 h-4" />
                              {driver.vehicle_model}
                            </p>
                          </div>
                        )}
                        {driver.vehicle_plate && (
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Vehicle Plate</p>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {driver.vehicle_plate}
                            </p>
                          </div>
                        )}
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Total Rides</p>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{driver.total_rides}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Completed</p>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {driver.completed_rides}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Rating</p>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {driver.average_rating > 0 ? driver.average_rating.toFixed(1) : "N/A"}
                          </p>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            driver.verification_status === "verified"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200"
                              : driver.verification_status === "rejected"
                              ? "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200"
                          }`}
                        >
                          {driver.verification_status === "verified" && (
                            <CheckCircle className="w-3 h-3 inline mr-1" />
                          )}
                          {driver.verification_status === "rejected" && (
                            <XCircle className="w-3 h-3 inline mr-1" />
                          )}
                          {driver.verification_status === "pending" && (
                            <Clock className="w-3 h-3 inline mr-1" />
                          )}
                          {driver.verification_status.charAt(0).toUpperCase() + driver.verification_status.slice(1)}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            driver.status === "active"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200"
                              : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                          }`}
                        >
                          {driver.status === "active" ? "Online" : "Offline"}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    {driver.verification_status === "pending" && (
                      <div className="flex flex-col gap-3 lg:min-w-[200px]">
                        <button
                          onClick={() => updateDriverStatus(driver.user_id, "verified")}
                          className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
                        >
                          <CheckCircle className="w-5 h-5" />
                          Verify Driver
                        </button>
                        <button
                          onClick={() => updateDriverStatus(driver.user_id, "rejected")}
                          className="flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
                        >
                          <XCircle className="w-5 h-5" />
                          Reject Driver
                        </button>
                      </div>
                    )}

                    {driver.verification_status !== "pending" && (
                      <div className="flex items-center justify-center lg:min-w-[200px]">
                        <div className="text-center">
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Status</p>
                          <p
                            className={`text-lg font-semibold ${
                              driver.verification_status === "verified"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {driver.verification_status === "verified" ? "Verified" : "Rejected"}
                          </p>
                          {driver.verification_status === "rejected" && (
                            <button
                              onClick={() => updateDriverStatus(driver.user_id, "verified")}
                              className="mt-3 px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                              Approve Anyway
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

