"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Car, Clock, DollarSign, ArrowRight, X } from "lucide-react";
import Link from "next/link";
import axiosInstance from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

export default function BookRidePage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [estimating, setEstimating] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [estimate, setEstimate] = useState<{
    distance?: number;
    duration?: string;
    fare?: number;
  } | null>(null);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  // Check authentication and redirect if needed
  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        // Redirect to login with from parameter to return here after login
        router.push(`/auth/login?from=${encodeURIComponent("/book-ride")}`);
      }
    }
  }, [isAuthenticated, authLoading, router]);

  // Show loading state while checking auth
  if (authLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-gray-600 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  async function getEstimate() {
    if (!pickup || !destination) {
      setError("Please enter both pickup and destination");
      return;
    }

    setEstimating(true);
    setEstimate(null);
    setError("");

    try {
      // Simple fare estimation (fixed rate per km)
      const estimatedDistance = 5; // km (placeholder - in real app, calculate from addresses)
      const farePerKm = 2; // GHS per km
      const estimatedFare = estimatedDistance * farePerKm;
      const estimatedDuration = "10-15 min";

      setEstimate({
        distance: estimatedDistance,
        duration: estimatedDuration,
        fare: estimatedFare,
      });
    } catch (e: any) {
      setError(e.response?.data?.detail || e.response?.data?.message || e.message || "Failed to estimate fare");
    } finally {
      setEstimating(false);
    }
  }

  async function createRideRequest() {
    if (!pickup || !destination) {
      setError("Please enter both pickup and destination");
      return;
    }

    setSubmitting(true);
    setMessage("");
    setError("");

    try {
      // User is already authenticated (checked at page level)
      // Get user ID
      const userResponse = await axiosInstance.get("/auth/me");
      const riderId = userResponse.data.id;

      const data = await axiosInstance.post("/rides", {
        rider_id: riderId,
        pickup_location: pickup,
        dropoff_location: destination,
        fare: estimate?.fare || 10,
      });

      setMessage(`Ride requested successfully! Ride ID: ${data.data.id}`);
      
      // Redirect to ride in progress after a delay
      setTimeout(() => {
        router.push(`/ride-in-progress?id=${data.data.id}`);
      }, 2000);
    } catch (e: any) {
      setError(e.response?.data?.detail || e.response?.data?.message || e.message || "Failed to create ride request");
    } finally {
      setSubmitting(false);
    }
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
            <div className="flex items-center gap-4">
              <Link
                href="/history"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                History
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

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Book a Ride
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Enter your pickup and destination to get started
          </p>

          <div className="space-y-6">
            {/* Pickup Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <MapPin className="w-4 h-4 inline mr-1" />
                Pickup Location
              </label>
              <input
                type="text"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                placeholder="e.g., Library, Main Gate, Dormitory Block A"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Destination */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <MapPin className="w-4 h-4 inline mr-1" />
                Destination
              </label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="e.g., Lecture Hall 3, Cafeteria, Sports Complex"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Estimate Button */}
            <button
              onClick={getEstimate}
              disabled={!pickup || !destination || estimating}
              className="w-full px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-medium rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {estimating ? "Calculating..." : "Get Estimated Fare"}
            </button>

            {/* Estimate Display */}
            {estimate && (
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Ride Estimate</h3>
                <div className="grid grid-cols-3 gap-4">
                  {estimate.distance && (
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Distance</div>
                      <div className="text-lg font-semibold text-gray-900 dark:text-white">
                        {estimate.distance.toFixed(1)} km
                      </div>
                    </div>
                  )}
                  {estimate.duration && (
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Duration</div>
                      <div className="text-lg font-semibold text-gray-900 dark:text-white">
                        {estimate.duration}
                      </div>
                    </div>
                  )}
                  {estimate.fare && (
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Estimated Fare</div>
                      <div className="text-lg font-semibold text-gray-900 dark:text-white">
                        GHS {estimate.fare.toFixed(2)}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 text-red-700 dark:text-red-400">
                {error}
              </div>
            )}

            {/* Success Message */}
            {message && (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 text-green-700 dark:text-green-400">
                {message}
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={createRideRequest}
              disabled={!pickup || !destination || submitting}
              className="w-full px-6 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {submitting ? (
                "Requesting Ride..."
              ) : (
                <>
                  Request Ride
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>

          {/* Info Section */}
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">What to Expect</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-start gap-3">
                <Car className="w-5 h-5 text-gray-600 dark:text-gray-400 mt-1" />
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">Verified Drivers</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    All drivers are campus-verified
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-gray-600 dark:text-gray-400 mt-1" />
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">Quick Response</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Average 10 min response time
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <DollarSign className="w-5 h-5 text-gray-600 dark:text-gray-400 mt-1" />
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">Transparent Pricing</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Fares calculated by distance
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

