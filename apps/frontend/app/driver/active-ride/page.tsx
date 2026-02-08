"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Car, MapPin, Clock, User, Phone, Navigation, CheckCircle, AlertCircle } from "lucide-react";
import axiosInstance, { getAuthToken } from "@/lib/api";
import DriverNavbar from "@/components/DriverNavbar";

function ActiveRideContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const rideId = searchParams.get("id");

  const [ride, setRide] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (rideId) {
      loadRideDetails();
      const interval = setInterval(loadRideDetails, 10000); // Poll every 10 seconds
      return () => clearInterval(interval);
    }
  }, [rideId]);

  async function loadRideDetails() {
    try {
      const response = await axiosInstance.get(`/rides/${rideId}`);
      setRide(response.data);
    } catch (e: any) {
      setMessage(e.response?.data?.detail || e.message || "Failed to load ride");
    } finally {
      setLoading(false);
    }
  }

  async function startRide() {
    try {
      await axiosInstance.patch(`/rides/${rideId}`, {
        status: "in_progress",
      });
      await loadRideDetails();
      setMessage("Ride started successfully!");
    } catch (e: any) {
      setMessage(e.response?.data?.detail || e.response?.data?.error || e.message || "Failed to start ride");
    }
  }

  async function completeRide() {
    try {
      await axiosInstance.patch(`/rides/${rideId}`, {
        status: "completed",
      });
      setMessage("Ride completed successfully!");
      setTimeout(() => {
        router.push("/driver/dashboard");
      }, 2000);
    } catch (e: any) {
      setMessage(e.response?.data?.detail || e.response?.data?.error || e.message || "Failed to complete ride");
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-gray-600 dark:text-gray-400">Loading ride details...</div>
        </div>
      </div>
    );
  }

  if (!ride) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
          <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Ride Not Found</h2>
          <button
            onClick={() => router.push("/driver/dashboard")}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <DriverNavbar />

      <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-800"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <Car className="w-8 h-8 text-blue-600" /> Active Ride
          </h2>

          {message && (
            <div
              className={`mb-6 p-4 rounded-lg flex items-start gap-2 ${
                message.includes("successful")
                  ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200"
                  : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200"
              }`}
            >
              {message.includes("successful") ? (
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
              )}
              <p>{message}</p>
            </div>
          )}

          {/* Map Placeholder */}
          <div className="relative h-64 bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden mb-6">
            <div className="absolute inset-0 flex items-center justify-center text-gray-500 dark:text-gray-400">
              <div className="text-center">
                <Navigation className="w-12 h-12 mx-auto mb-2" />
                <p>Live Map View</p>
              </div>
            </div>
          </div>

          {/* Ride Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Rider Information</h3>
              <div className="space-y-2 text-gray-700 dark:text-gray-300">
                <p className="flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" /> {ride.rider_name || ride.rider_email}
                </p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Ride Details</h3>
              <div className="space-y-2 text-gray-700 dark:text-gray-300">
                <p className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" /> {ride.pickup_location}
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-purple-600" /> {ride.dropoff_location}
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-green-600" /> Status: {ride.status.replace("_", " ")}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            {ride.status === "accepted" ? (
              <button
                onClick={startRide}
                className="flex-1 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                <Navigation className="w-5 h-5" /> Start Ride
              </button>
            ) : ride.status === "in_progress" ? (
              <button
                onClick={completeRide}
                className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-5 h-5" /> Complete Ride
              </button>
            ) : ride.status === "completed" ? (
              <div className="flex-1 px-6 py-3 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 font-semibold rounded-lg flex items-center justify-center gap-2">
                <CheckCircle className="w-5 h-5" /> Ride Completed
              </div>
            ) : null}

            <button
              onClick={() => router.push("/driver/dashboard")}
              className="px-6 py-3 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </motion.div>
      </div>
      </div>
    </div>
  );
}

export default function ActiveRidePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ActiveRideContent />
    </Suspense>
  );
}

