"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MapPin, Clock, DollarSign, CheckCircle, XCircle, Car, ArrowRight } from "lucide-react";
import axiosInstance from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

type Ride = {
  id: string;
  tracking_number?: string;
  pickup: string;
  destination: string;
  status: "pending" | "accepted" | "in_progress" | "completed" | "cancelled";
  fare?: number;
  created_at: string;
  driver_name?: string;
  driver_phone?: string;
};

export default function RideHistoryPage() {
  const { user } = useAuth();
  const [rides, setRides] = useState<Ride[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      fetchRides();
    }
  }, [user]);

  async function fetchRides() {
    try {
      if (!user) {
        setError("Please log in to view your ride history");
        setLoading(false);
        return;
      }

      // Fetch rides for current user
      const response = await axiosInstance.get("/rides", {
        params: { rider_id: user.id },
      });

      const ridesData = response.data || [];
      
      // Transform to Ride format
      const transformedRides: Ride[] = ridesData.map((ride: any) => ({
        id: ride.id,
        tracking_number: ride.id,
        pickup: ride.pickup_location || "N/A",
        destination: ride.dropoff_location || "N/A",
        status: ride.status || "pending",
        fare: ride.fare || 0,
        created_at: ride.created_at || new Date().toISOString(),
        driver_name: undefined, // Will be fetched separately if needed
        driver_phone: undefined,
      }));

      setRides(transformedRides);
    } catch (e: any) {
      setError(e.response?.data?.detail || e.message || "Failed to load ride history");
      setRides([]);
    } finally {
      setLoading(false);
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "cancelled":
        return <XCircle className="w-5 h-5 text-red-600" />;
      case "in_progress":
      case "accepted":
        return <Car className="w-5 h-5 text-blue-600" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400";
      case "cancelled":
        return "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400";
      case "in_progress":
      case "accepted":
        return "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400";
      default:
        return "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white">
              Campus Ride
            </Link>
            <div className="flex items-center gap-4">
              <Link
                href="/book-ride"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                Book Ride
              </Link>
              <Link
                href="/"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                Home
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Ride History
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            View all your past and current rides
          </p>
        </div>

        {loading ? (
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-12 text-center">
            <div className="text-gray-600 dark:text-gray-400">Loading rides...</div>
          </div>
        ) : error ? (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 text-red-700 dark:text-red-400">
            {error}
          </div>
        ) : rides.length === 0 ? (
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-12 text-center">
            <Car className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No Rides Yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Book your first ride to get started
            </p>
            <Link
              href="/book-ride"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              Book a Ride
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {rides.map((ride) => (
              <div
                key={ride.id}
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(ride.status)}
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {ride.tracking_number || `Ride #${ride.id.slice(0, 8)}`}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {formatDate(ride.created_at)}
                      </div>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(
                      ride.status
                    )}`}
                  >
                    {ride.status.replace("_", " ")}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-600 dark:text-gray-400 mt-0.5" />
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">From</div>
                      <div className="font-medium text-gray-900 dark:text-white">{ride.pickup}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-600 dark:text-gray-400 mt-0.5" />
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">To</div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {ride.destination}
                      </div>
                    </div>
                  </div>

                  {ride.driver_name && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Car className="w-4 h-4" />
                      <span>Driver: {ride.driver_name}</span>
                      {ride.driver_phone && <span>• {ride.driver_phone}</span>}
                    </div>
                  )}

                  {ride.fare && (
                    <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Total Fare</span>
                      <span className="text-lg font-bold text-gray-900 dark:text-white">
                        GHS {ride?.fare?.toFixed(2)}
                      </span>
                    </div>
                  )}

                  {(ride.status === "in_progress" || ride.status === "accepted" || ride.status === "pending") && (
                    <Link
                      href={`/ride-in-progress?id=${ride.id}`}
                      className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                    >
                      View Ride
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
