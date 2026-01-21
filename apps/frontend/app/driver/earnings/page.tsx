"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { DollarSign, Calendar, TrendingUp, FileText, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import axiosInstance, { getAuthToken } from "@/lib/api";
import DriverNavbar from "@/components/DriverNavbar";

type Earning = {
  id: string;
  base_fare: number;
  commission_amount: number;
  driver_earnings: number;
  week_start: string;
  week_end: string;
  is_paid: boolean;
  created_at: string;
};

export default function DriverEarningsPage() {
  const [earnings, setEarnings] = useState<Earning[]>([]);
  const [weeklySummary, setWeeklySummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadEarnings();
  }, []);

  async function loadEarnings() {
    try {
      const token = getAuthToken();
      if (!token) {
        setError("Please log in");
        return;
      }

      // Get driver profile
      const driverResponse = await axiosInstance.get("/drivers/me");
      const driver = driverResponse.data;

      // Calculate earnings from completed rides
      const ridesResponse = await axiosInstance.get("/rides", {
        params: { driver_id: driver.user_id, status: "completed" },
      });

      const completedRides = ridesResponse.data || [];
      
      // Calculate weekly summary (last 7 days)
      const now = new Date();
      const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const weekRides = completedRides.filter((ride: any) => {
        const rideDate = new Date(ride.completed_at || ride.created_at);
        return rideDate >= weekStart;
      });

      const totalFare = weekRides.reduce((sum: number, ride: any) => sum + (ride.fare || 0), 0);
      const commission = totalFare * 0.15; // 15% commission
      const driverEarnings = totalFare - commission;

      setWeeklySummary({
        total_rides: weekRides.length,
        total_fare: totalFare,
        total_commission: commission,
        total_earnings: driverEarnings,
        week_start: weekStart.toISOString(),
        week_end: now.toISOString(),
      });

      // For earnings history, use all completed rides
      const earningsHistory = completedRides.map((ride: any) => ({
        id: ride.id,
        base_fare: ride.fare || 0,
        commission_amount: (ride.fare || 0) * 0.15,
        driver_earnings: (ride.fare || 0) * 0.85,
        week_start: weekStart.toISOString(),
        week_end: now.toISOString(),
        is_paid: false, // Simplified - would need payment tracking
        created_at: ride.completed_at || ride.created_at,
      }));

      setEarnings(earningsHistory);
    } catch (e: any) {
      setError(e.response?.data?.detail || e.message || "Failed to load earnings");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-gray-600 dark:text-gray-400">Loading earnings...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <DriverNavbar />

      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Earnings & Payouts</h2>

        {error && (
          <div className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200 p-4 rounded-lg">
            {error}
          </div>
        )}

        {/* Weekly Summary */}
        {weeklySummary && (
          <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg p-8 text-white">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Calendar className="w-6 h-6" /> Current Week Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <p className="text-blue-100 text-sm mb-1">Total Rides</p>
                <p className="text-3xl font-bold">{weeklySummary.total_rides || 0}</p>
              </div>
              <div>
                <p className="text-blue-100 text-sm mb-1">Total Fare</p>
                <p className="text-3xl font-bold">
                  GHS {weeklySummary.total_fare ? parseFloat(weeklySummary.total_fare).toFixed(2) : "0.00"}
                </p>
              </div>
              <div>
                <p className="text-blue-100 text-sm mb-1">Commission</p>
                <p className="text-3xl font-bold">
                  GHS {weeklySummary.total_commission ? parseFloat(weeklySummary.total_commission).toFixed(2) : "0.00"}
                </p>
              </div>
              <div>
                <p className="text-blue-100 text-sm mb-1">Your Earnings</p>
                <p className="text-3xl font-bold">
                  GHS {weeklySummary.total_earnings ? parseFloat(weeklySummary.total_earnings).toFixed(2) : "0.00"}
                </p>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-white/20">
              <p className="text-sm text-blue-100">
                Week: {new Date(weeklySummary.week_start).toLocaleDateString()} -{" "}
                {new Date(weeklySummary.week_end).toLocaleDateString()}
              </p>
            </div>
          </div>
        )}

        {/* Earnings History */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-800">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <FileText className="w-6 h-6" /> Earnings History
          </h3>
          {earnings.length === 0 ? (
            <div className="text-center py-8 text-gray-600 dark:text-gray-400">
              <DollarSign className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No earnings recorded yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {earnings.map((earning) => (
                <motion.div
                  key={earning.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-blue-500 dark:hover:border-blue-600 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {new Date(earning.week_start).toLocaleDateString()} -{" "}
                          {new Date(earning.week_end).toLocaleDateString()}
                        </span>
                        {earning.is_paid && (
                          <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200 rounded text-xs font-medium">
                            Paid
                          </span>
                        )}
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">Base Fare</p>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            GHS {earning.base_fare.toFixed(2)}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">Commission</p>
                          <p className="font-semibold text-red-600 dark:text-red-400">
                            -GHS {earning.commission_amount.toFixed(2)}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600 dark:text-gray-400">Your Earnings</p>
                          <p className="font-bold text-green-600 dark:text-green-400 text-lg">
                            GHS {earning.driver_earnings.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}

