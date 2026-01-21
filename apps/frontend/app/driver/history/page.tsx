"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { History, MapPin, Car, DollarSign, Calendar, Star } from "lucide-react";
import axiosInstance, { getAuthToken } from "@/lib/api";
import DriverNavbar from "@/components/DriverNavbar";

type Ride = {
  id: string;
  rider_name: string;
  pickup_location: string;
  dropoff_location: string;
  base_fare: number;
  status: string;
  requested_at: string;
  completed_at: string | null;
  rating: number | null;
};

export default function DriverHistoryPage() {
  const [rides, setRides] = useState<Ride[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadRideHistory();
  }, []);

  async function loadRideHistory() {
    try {
      const token = getAuthToken();
      if (!token) {
        setError("Please log in");
        return;
      }

      // Get driver profile to filter rides by driver
      const driverResponse = await axiosInstance.get("/drivers/me");
      const driverId = driverResponse.data.user_id;

      // Get all rides filtered by driver
      const response = await axiosInstance.get("/rides", {
        params: { driver_id: driverId },
      });

      // Filter completed/cancelled rides
      const completedRides = response.data.filter(
        (ride: Ride) => ride.status === "completed" || ride.status === "cancelled"
      );
      setRides(completedRides);
    } catch (e: any) {
      setError(e.response?.data?.detail || e.message || "Failed to load ride history");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-gray-600 dark:text-gray-400">Loading ride history...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <DriverNavbar />
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <History className="w-8 h-8 text-blue-600" />
            Ride History
          </h2>

          {error && (
            <div className="bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200 p-4 rounded-lg">
              {error}
            </div>
          )}

          {rides.length === 0 ? (
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-12 text-center border border-gray-200 dark:border-gray-800">
              <Car className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">No completed rides yet</p>
              <Link
                href="/driver/dashboard"
                className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Go to Dashboard
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {rides.map((ride) => (
                <motion.div
                  key={ride.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-600 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {new Date(ride.requested_at).toLocaleDateString()} at{" "}
                          {new Date(ride.requested_at).toLocaleTimeString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900 dark:text-white">{ride.rider_name}</span>
                        {ride.rating && (
                          <span className="flex items-center gap-1 text-yellow-600">
                            <Star className="w-4 h-4 fill-current" />
                            {ride.rating}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <MapPin className="w-4 h-4 text-blue-600" />
                        {ride.pickup_location}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <MapPin className="w-4 h-4 text-purple-600" />
                        {ride.dropoff_location}
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={
                            ride.status === "completed"
                              ? "px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200"
                              : "px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200"
                          }
                        >
                          {ride.status}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        <DollarSign className="w-5 h-5 inline text-green-600" /> GHS {ride?.base_fare?.toFixed(2)}
                      </p>
                    </div>
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
