"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  MapPin,
  Clock,
  Car,
  Phone,
  Navigation,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  User,
} from "lucide-react";
import axiosInstance, { getAuthToken } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

type RideData = {
  id: string;
  rider_id: string;
  driver_id?: string;
  pickup_location: string;
  dropoff_location: string;
  status: "pending" | "accepted" | "in_progress" | "completed" | "cancelled";
  fare?: number;
  created_at: string;
  updated_at: string;
};

type DriverInfo = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  vehicle_model?: string;
  vehicle_plate?: string;
};

function RideInProgressContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  const rideId = searchParams.get("id");

  const [ride, setRide] = useState<RideData & { driver_info?: DriverInfo } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!rideId) {
      setError("No ride ID provided");
      setLoading(false);
      return;
    }

    fetchRideStatus();
    // Poll for updates every 10 seconds
    const interval = setInterval(fetchRideStatus, 10000);

    return () => clearInterval(interval);
  }, [rideId]);

  async function fetchRideStatus() {
    if (!rideId) return;

    try {
      // Fetch ride details (API now includes driver_info)
      const rideResponse = await axiosInstance.get(`/rides/${rideId}`);
      setRide(rideResponse.data);
    } catch (e: any) {
      setError(e.response?.data?.detail || e.message || "Failed to load ride status");
    } finally {
      setLoading(false);
    }
  }

  const getStatusMessage = () => {
    if (!ride) return "Loading...";

    switch (ride.status) {
      case "pending":
        return "Waiting for driver to accept...";
      case "accepted":
        return "Driver is on the way to pickup";
      case "in_progress":
        return "Ride in progress";
      case "completed":
        return "Ride completed";
      case "cancelled":
        return "Ride cancelled";
      default:
        return "Unknown status";
    }
  };

  const getStatusColor = () => {
    if (!ride) return "bg-gray-100";

    switch (ride.status) {
      case "completed":
        return "bg-green-100 dark:bg-green-900/20";
      case "cancelled":
        return "bg-red-100 dark:bg-red-900/20";
      case "in_progress":
      case "accepted":
        return "bg-blue-100 dark:bg-blue-900/20";
      default:
        return "bg-yellow-100 dark:bg-yellow-900/20";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-600 dark:text-gray-400 mb-4">Loading ride status...</div>
        </div>
      </div>
    );
  }

  if (error || !ride) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-black">
        <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-4 py-4">
            <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white">
              Campus Ride
            </Link>
          </div>
        </nav>
        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
            <AlertCircle className="w-8 h-8 text-red-600 mb-4" />
            <h3 className="text-xl font-semibold text-red-900 dark:text-red-400 mb-2">
              {error || "Ride not found"}
            </h3>
            <Link
              href="/history"
              className="inline-flex items-center gap-2 text-red-700 dark:text-red-400 hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to History
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white">
              Campus Ride
            </Link>
            <Link
              href="/history"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              Back to History
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Status Banner */}
        <div className={`${getStatusColor()} rounded-2xl p-6 mb-6`}>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {getStatusMessage()}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Ride ID: {ride.id}
              </p>
            </div>
            {ride.status === "completed" && (
              <CheckCircle className="w-12 h-12 text-green-600" />
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Ride Details Card */}
          <div className="md:col-span-2 bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Ride Details
            </h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-blue-600 mt-1" />
                <div className="flex-1">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Pickup</div>
                  <div className="font-medium text-gray-900 dark:text-white">{ride.pickup_location}</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-green-600 mt-1" />
                <div className="flex-1">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Destination</div>
                  <div className="font-medium text-gray-900 dark:text-white">{ride.dropoff_location}</div>
                </div>
              </div>

              {ride.fare && (
                <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Total Fare</span>
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      GHS {ride.fare.toFixed(2)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Driver & Status Card */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              {ride.driver_id ? "Your Driver" : "Waiting"}
            </h3>

            {ride.driver_id && ride.driver_info ? (
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Driver Name</div>
                  <div className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {ride.driver_info.first_name} {ride.driver_info.last_name || "Driver"}
                  </div>
                </div>

                {ride.driver_info.vehicle_model && (
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Vehicle</div>
                    <div className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                      <Car className="w-4 h-4" />
                      {ride.driver_info.vehicle_model} {ride.driver_info.vehicle_plate ? `(${ride.driver_info.vehicle_plate})` : ""}
                    </div>
                  </div>
                )}

                {ride.driver_info.phone && (
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Contact</div>
                    <a
                      href={`tel:${ride.driver_info.phone}`}
                      className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      <Phone className="w-4 h-4" />
                      {ride.driver_info.phone}
                    </a>
                  </div>
                )}

                {ride.status === "in_progress" || ride.status === "accepted" ? (
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                      <Car className="w-4 h-4" />
                      <span className="font-semibold">Driver on the way</span>
                    </div>
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="text-center py-8">
                <Car className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600 dark:text-gray-400">
                  Waiting for driver to accept...
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Map Placeholder */}
        {(ride.status === "in_progress" || ride.status === "accepted") && (
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                <Navigation className="w-5 h-5" />
                Live Tracking
              </h3>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-xl h-64 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                <p className="text-gray-600 dark:text-gray-400">
                  Map view would be displayed here
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {ride.status !== "completed" && ride.status !== "cancelled" && (
          <div className="flex gap-4">
            <Link
              href="/history"
              className="flex-1 px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-medium rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 text-center transition-colors"
            >
              View All Rides
            </Link>
          </div>
        )}

        {ride.status === "completed" && (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <h3 className="text-lg font-semibold text-green-900 dark:text-green-400">
                Ride Completed Successfully!
              </h3>
            </div>
            <p className="text-green-800 dark:text-green-300 mb-4">
              Thank you for using Campus Ride. We hope you had a great experience!
            </p>
            <Link
              href="/history"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-medium rounded-xl hover:bg-green-700 transition-colors"
            >
              View Ride History
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default function RideInProgressPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center">
          <div className="text-center">
            <div className="text-gray-600 dark:text-gray-400 mb-4">Loading...</div>
          </div>
        </div>
      }
    >
      <RideInProgressContent />
    </Suspense>
  );
}
