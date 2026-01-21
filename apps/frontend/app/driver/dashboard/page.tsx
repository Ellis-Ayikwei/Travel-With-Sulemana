"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Car, MapPin, DollarSign, Clock, User, Star, AlertCircle, CheckCircle, Moon, Sun, X, Bell, List } from "lucide-react";
import { useTheme } from "next-themes";

import axiosInstance, { getAuthToken } from "@/lib/api";
import DriverNavbar from "@/components/DriverNavbar";
import { useAuth } from "@/contexts/AuthContext";

type Ride = {
  id: string;
  rider_id?: string;
  driver_id?: string;
  rider_name?: string;
  pickup_location: string;
  dropoff_location: string;
  fare?: number;
  base_fare?: number;
  status: string;
  requested_at?: string;
  created_at?: string;
  updated_at?: string;
};

type DriverProfile = {
  id: string;
  user_id: string;
  status: string;
  verification_status: string;
  total_rides: number;
  completed_rides: number;
  average_rating: number;
  total_earnings: number;
  vehicle_plate: string;
  vehicle_model: string;
};

export default function DriverDashboardPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [profile, setProfile] = useState<DriverProfile | null>(null);
  const [availableRides, setAvailableRides] = useState<Ride[]>([]);
  const [completedRides, setCompletedRides] = useState<Ride[]>([]);
  const [activeRide, setActiveRide] = useState<Ride | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [isOnline, setIsOnline] = useState(false);
  const [newRideNotification, setNewRideNotification] = useState<Ride | null>(null);
  const [showIncomingJobsPanel, setShowIncomingJobsPanel] = useState(false);
  const lastRideIdsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Wait for auth to load before checking
    if (!authLoading) {
      // Check if user exists
      if (user) {
        loadDriverData();
        // Poll for new rides every 30 seconds
        const interval = setInterval(loadDriverData, 30000);
        return () => clearInterval(interval);
      } else {
        // No user - check if we have a token (might be loading from react-auth-kit)
        const token = typeof window !== "undefined" ? localStorage.getItem("campusride_access_token") : null;
        if (!token) {
          // No token at all - redirect to login
          setLoading(false);
          router.push("/auth/login");
        } else {
          // Token exists but user not loaded yet - wait a bit more
          // This handles the case where react-auth-kit is still initializing
          const retryTimeout = setTimeout(() => {
            // If still no user after delay, redirect
            setLoading(false);
            router.push("/auth/login");
          }, 1000);
          
          return () => clearTimeout(retryTimeout);
        }
      }
    }
  }, [authLoading, user]);

  async function loadDriverData() {
    try {
      // Ensure user is authenticated
      if (!user) {
        setMessage("Please log in to access driver dashboard");
        setLoading(false);
        return;
      }

      // Load driver profile
      let driverProfile = null;
      try {
        const profileData = await axiosInstance.get("/drivers/me");
        driverProfile = profileData.data;
        setProfile(driverProfile);
        setIsOnline(driverProfile.status === "active");
      } catch (e: any) {
        // Profile might not exist yet - this is okay, will show registration prompt
        setLoading(false);
        return; // Exit early if no driver profile
      }

      // Load active ride first (filtered by this driver)
      let currentActiveRide = null;
      if (driverProfile) {
        try {
          const activeData = await axiosInstance.get("/rides", {
            params: { driver_id: driverProfile.user_id, status: "in_progress" },
          });
          if (activeData.data && activeData.data.length > 0) {
            currentActiveRide = activeData.data[0];
            setActiveRide(currentActiveRide);
          } else {
            setActiveRide(null);
          }
        } catch (e) {
          // No active ride
          setActiveRide(null);
        }
      }

      // Load completed trips for this driver
      try {
        const completedData = await axiosInstance.get("/rides", {
          params: { driver_id: driverProfile.user_id, status: "completed" },
        });
        const completed = completedData.data || [];
        // Sort by most recent first
        completed.sort((a: Ride, b: Ride) => {
          const dateA = new Date(a.created_at || a.requested_at || 0).getTime();
          const dateB = new Date(b.created_at || b.requested_at || 0).getTime();
          return dateB - dateA;
        });
        // Get latest 5 completed rides
        setCompletedRides(completed.slice(0, 5));
      } catch (e) {
        setCompletedRides([]);
      }

      // Load available rides (only if driver is online and no active ride)
      if (driverProfile && driverProfile.status === "active" && !currentActiveRide) {
        try {
          const ridesData = await axiosInstance.get("/rides/available");
          const newRides = ridesData.data || [];
          // Filter out any rides that are not pending (double-check on frontend)
          const pendingRides = newRides.filter((r: Ride) => r.status === "pending" || !r.status);
          setAvailableRides(pendingRides);
          
          // Check for new ride notifications (only for pending rides)
          if (pendingRides.length > 0) {
            const currentRideIds = new Set<string>(pendingRides.map((r: Ride) => r.id));
            const newRide = pendingRides.find((r: Ride) => !lastRideIdsRef.current.has(r.id));
            
            if (newRide) {
              setNewRideNotification(newRide);
              // Request notification permission if not granted
              if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "default") {
                Notification.requestPermission();
              }
              // Show browser notification if permission granted
              if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "granted") {
                new Notification("New Ride Request", {
                  body: `Pickup: ${newRide.pickup_location}`,
                  icon: "/favicon.ico",
                });
              }
            }
            
            lastRideIdsRef.current = currentRideIds;
          }
        } catch (e) {
          // No available rides
          setAvailableRides([]);
        }
      } else {
        // Clear notification if driver goes offline or has active ride
        if (!driverProfile || driverProfile.status !== "active" || currentActiveRide) {
          setNewRideNotification(null);
          setAvailableRides([]);
        }
      }
    } catch (e: any) {
      setMessage(e.response?.data?.detail || e.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  }

  async function toggleAvailability() {
    if (!profile) return;
    try {
      const newStatus = profile.status === "active" ? "inactive" : "active";
      await axiosInstance.patch(`/drivers`, {
        user_id: profile.user_id,
        status: newStatus,
      });
      await loadDriverData();
    } catch (e: any) {
      setMessage(e.response?.data?.detail || e.message || "Failed to update status");
    }
  }

  async function acceptRide(rideId: string) {
    try {
      if (!profile) {
        setMessage("Driver profile not found");
        return;
      }
      await axiosInstance.post(`/rides/${rideId}/accept`, {
        driver_id: profile.user_id,
      });
      setMessage("Ride accepted successfully!");
      setNewRideNotification(null); // Close notification panel
      setShowIncomingJobsPanel(false); // Close jobs panel
      // Immediately remove accepted ride from available rides list
      setAvailableRides(prev => prev.filter(r => r.id !== rideId));
      await loadDriverData();
      // Redirect to active ride page after accepting
      router.push(`/driver/active-ride?id=${rideId}`);
    } catch (e: any) {
      setMessage(e.response?.data?.detail || e.response?.data?.error || e.message || "Failed to accept ride");
    }
  }

  function dismissNotification() {
    setNewRideNotification(null);
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-gray-600 dark:text-gray-400">Loading driver dashboard...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-gray-600 dark:text-gray-400">Redirecting to login...</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 p-4">
        <AlertCircle className="w-16 h-16 text-yellow-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Not Registered as Driver</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">You need to register as a driver first.</p>
        <Link
          href="/driver/register"
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Register as Driver
        </Link>
      </div>
    );
  }

      // Filter available rides to only show pending ones
      const pendingAvailableRides = availableRides.filter((r: Ride) => r.status === "pending" || !r.status);

      return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <DriverNavbar />

      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto space-y-6">
            {/* Header */}
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-800">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Driver Dashboard</h1>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    {profile.vehicle_model} • {profile.vehicle_plate}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setShowIncomingJobsPanel(!showIncomingJobsPanel)}
                    className="px-4 py-2 rounded-lg font-semibold transition-colors bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2"
                    disabled={!isOnline || activeRide !== null}
                  >
                    <List className="w-4 h-4" />
                    {showIncomingJobsPanel ? "Hide Jobs" : "View Jobs"}
                    {pendingAvailableRides.length > 0 && (
                      <span className="ml-2 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                        {pendingAvailableRides.length}
                      </span>
                    )}
                  </button>
                  <div className={`px-4 py-2 rounded-lg font-semibold ${
                    isOnline ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200" :
                    "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                  }`}>
                    {isOnline ? "Online" : "Offline"}
                  </div>
                  <button
                    onClick={toggleAvailability}
                    className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                      isOnline
                        ? "bg-red-600 text-white hover:bg-red-700"
                        : "bg-green-600 text-white hover:bg-green-700"
                    }`}
                  >
                    {isOnline ? "Go Offline" : "Go Online"}
                  </button>
                </div>
              </div>

          {message && (
            <div className={`mt-4 p-3 rounded-lg text-sm ${
              message.includes("Failed") || message.includes("error")
                ? "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-200"
                : "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-200"
            }`}>
              {message}
            </div>
          )}

          {profile.verification_status !== "verified" && (
            <div className="mt-4 p-4 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 rounded-lg">
              <AlertCircle className="w-5 h-5 inline mr-2" />
              Your account is {profile.verification_status}. Please wait for admin verification.
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Total Rides</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{profile.total_rides}</p>
              </div>
              <Car className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Completed</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{profile.completed_rides}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Rating</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {profile.average_rating > 0 ? profile.average_rating.toFixed(1) : "N/A"}
                </p>
              </div>
              <Star className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Total Earnings</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  GHS {Number(profile.total_earnings || 0).toFixed(2)}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </div>
        </div>

        {/* Active Ride */}
        {activeRide && (
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Active Ride</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="font-semibold text-gray-900 dark:text-white">{activeRide.rider_name || "Rider"}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span className="text-gray-700 dark:text-gray-300">{activeRide.pickup_location}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-purple-600" />
                <span className="text-gray-700 dark:text-gray-300">{activeRide.dropoff_location}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                <span className="font-bold text-gray-900 dark:text-white">GHS {(activeRide.base_fare || activeRide.fare || 0).toFixed(2)}</span>
              </div>
              <Link
                href={`/driver/active-ride?id=${activeRide.id}`}
                className="block w-full text-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                View Active Ride
              </Link>
            </div>
          </div>
        )}

        {/* Available Rides / Completed Rides */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-800">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {pendingAvailableRides.length > 0 ? "Available Rides" : "Completed Trips"}
            </h2>
            <button
              onClick={loadDriverData}
              className="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              Refresh
            </button>
          </div>
          {pendingAvailableRides.length > 0 ? (
            <div className="space-y-4">
              {pendingAvailableRides.map((ride) => (
                <motion.div
                  key={ride.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-blue-500 dark:hover:border-blue-600 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        <span className="font-semibold text-gray-900 dark:text-white">{ride.rider_name || "Rider"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <MapPin className="w-4 h-4" />
                        {ride.pickup_location} → {ride.dropoff_location}
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1 text-green-600">
                          <DollarSign className="w-4 h-4" />
                          GHS {(ride.base_fare || ride.fare || 0).toFixed(2)}
                        </span>
                        <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                          <Clock className="w-4 h-4" />
                          {new Date(ride.requested_at || ride.created_at || Date.now()).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => acceptRide(ride.id)}
                      disabled={!isOnline || activeRide !== null}
                      className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Accept Ride
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : completedRides.length > 0 ? (
            <div className="space-y-4">
              {completedRides.map((ride) => (
                <motion.div
                  key={ride.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-green-500 dark:hover:border-green-600 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        <span className="font-semibold text-gray-900 dark:text-white">{ride.rider_name || "Rider"}</span>
                        <span className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 text-xs font-medium rounded">
                          Completed
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <MapPin className="w-4 h-4" />
                        {ride.pickup_location} → {ride.dropoff_location}
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1 text-green-600">
                          <DollarSign className="w-4 h-4" />
                          GHS {(ride.base_fare || ride.fare || 0).toFixed(2)}
                        </span>
                        <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                          <Clock className="w-4 h-4" />
                          {new Date(ride.requested_at || ride.created_at || Date.now()).toLocaleDateString()} at {new Date(ride.requested_at || ride.created_at || Date.now()).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <Link
                  href="/driver/history"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  View All Completed Rides →
                </Link>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-600 dark:text-gray-400">
              <Car className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No available rides at the moment</p>
              <p className="text-sm mt-2">No completed trips yet</p>
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/driver/earnings"
            className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-600 transition-colors"
          >
            <DollarSign className="w-8 h-8 text-blue-600 mb-2" />
            <h3 className="font-semibold text-gray-900 dark:text-white">View Earnings</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Check your weekly payouts</p>
          </Link>
          <Link
            href="/driver/history"
            className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-600 transition-colors"
          >
            <Car className="w-8 h-8 text-blue-600 mb-2" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Ride History</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">View past rides</p>
          </Link>
          <Link
            href="/driver/profile"
            className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-600 transition-colors"
          >
            <User className="w-8 h-8 text-blue-600 mb-2" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Driver Profile</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Update your information</p>
          </Link>
        </div>
      </div>
      </div>

      {/* Incoming Jobs Side Panel */}
      <AnimatePresence>
        {(showIncomingJobsPanel || newRideNotification) && !activeRide && isOnline && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-900 shadow-2xl z-50 border-l border-gray-200 dark:border-gray-800"
          >
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 bg-blue-600 dark:bg-blue-700">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Bell className={`w-6 h-6 text-white ${newRideNotification ? 'animate-pulse' : ''}`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {newRideNotification ? "New Ride Request!" : "Available Jobs"}
                    </h3>
                    <p className="text-sm text-blue-100">
                      {newRideNotification ? "Tap to accept" : `${pendingAvailableRides.length} ride${pendingAvailableRides.length !== 1 ? 's' : ''} available`}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowIncomingJobsPanel(false);
                    dismissNotification();
                  }}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Ride Details / Available Rides List */}
              <div className="flex-1 overflow-y-auto p-6">
                {newRideNotification ? (
                  // Show single new notification
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                          Requested {new Date(newRideNotification.requested_at || newRideNotification.created_at || Date.now()).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="w-5 h-5 text-blue-600" />
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Pickup Location</span>
                        </div>
                        <p className="text-lg font-semibold text-gray-900 dark:text-white ml-7">
                          {newRideNotification.pickup_location}
                        </p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="w-5 h-5 text-purple-600" />
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Dropoff Location</span>
                        </div>
                        <p className="text-lg font-semibold text-gray-900 dark:text-white ml-7">
                          {newRideNotification.dropoff_location}
                        </p>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">Fare</span>
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            GHS {(newRideNotification.base_fare || newRideNotification.fare || 0).toFixed(2)}
                          </p>
                        </div>
                        <DollarSign className="w-8 h-8 text-green-600" />
                      </div>
                    </div>
                  </motion.div>
                ) : pendingAvailableRides.length > 0 ? (
                  // Show all available rides (filter out non-pending)
                  <div className="space-y-4">
                    {pendingAvailableRides.map((ride) => (
                      <motion.div
                        key={ride.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-blue-500 dark:hover:border-blue-600 transition-colors bg-white dark:bg-gray-800"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                            <span className="font-semibold text-gray-900 dark:text-white">{ride.rider_name || "Rider"}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <MapPin className="w-4 h-4 text-blue-600" />
                            <span>{ride.pickup_location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <MapPin className="w-4 h-4 text-purple-600" />
                            <span>{ride.dropoff_location}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="flex items-center gap-1 text-green-600 font-semibold">
                              <DollarSign className="w-4 h-4" />
                              GHS {(ride.base_fare || ride.fare || 0).toFixed(2)}
                            </span>
                            <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400 text-xs">
                              <Clock className="w-3 h-3" />
                              {new Date(ride.requested_at || ride.created_at || Date.now()).toLocaleTimeString()}
                            </span>
                          </div>
                          <button
                            onClick={() => {
                              acceptRide(ride.id);
                              setShowIncomingJobsPanel(false);
                            }}
                            className="w-full px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
                          >
                            Accept Ride
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  // No available rides
                  <div className="text-center py-12 text-gray-600 dark:text-gray-400">
                    <Car className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">No available rides</p>
                    <p className="text-sm mt-2">Check back later for new ride requests</p>
                  </div>
                )}
              </div>

              {/* Actions - Only show for single notification */}
              {newRideNotification && (
                <div className="p-6 border-t border-gray-200 dark:border-gray-800 space-y-3">
                  <button
                    onClick={() => {
                      acceptRide(newRideNotification.id);
                    }}
                    className="w-full px-6 py-4 bg-green-600 text-white font-bold text-lg rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-3 shadow-lg"
                  >
                    <CheckCircle className="w-6 h-6" />
                    Accept Ride
                  </button>
                  <button
                    onClick={() => {
                      setShowIncomingJobsPanel(false);
                      dismissNotification();
                    }}
                    className="w-full px-6 py-3 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
                  >
                    Dismiss
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop for side panel */}
      <AnimatePresence>
        {(showIncomingJobsPanel || newRideNotification) && !activeRide && isOnline && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setShowIncomingJobsPanel(false);
              dismissNotification();
            }}
            className="fixed inset-0 bg-black/50 z-40"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
