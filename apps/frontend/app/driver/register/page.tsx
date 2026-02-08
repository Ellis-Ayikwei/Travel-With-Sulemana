"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Upload, Car, FileText, AlertCircle, CheckCircle, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import axiosInstance, { getAuthToken } from "@/lib/api";

export default function DriverRegisterPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [formData, setFormData] = useState({
    license_number: "",
    license_expiry_date: "",
    vehicle_model: "",
    vehicle_plate: "",
    vehicle_color: "",
  });
  const [files, setFiles] = useState({
    driving_license: null as File | null,
    vehicle_registration: null as File | null,
    vehicle_insurance: null as File | null,
  });
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFiles({
        ...files,
        [e.target.name]: e.target.files[0],
      });
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");
    setErrors({});

    try {
      const token = getAuthToken();
      if (!token) {
        router.push("/auth/login");
        return;
      }

      // Get user ID from token
      const userResponse = await axiosInstance.get("/auth/me");
      const userId = userResponse.data.id;

      // Create driver profile
      const driverData = await axiosInstance.post("/drivers", {
        user_id: userId,
        license_number: formData.license_number,
        license_expiry_date: formData.license_expiry_date,
        vehicle_model: formData.vehicle_model,
        vehicle_plate: formData.vehicle_plate,
        vehicle_color: formData.vehicle_color || "",
        status: "inactive",
        verification_status: "pending",
        total_rides: 0,
        completed_rides: 0,
        average_rating: 0,
        total_earnings: 0,
      });

      setMessage("Registration successful! Your application is pending admin verification.");
      setTimeout(() => {
        router.push("/driver/dashboard");
      }, 2000);
    } catch (e: any) {
      const errorData = e.response?.data;
      if (errorData?.errors) {
        setErrors(errorData.errors);
      } else {
        setMessage(errorData?.error || errorData?.detail || e.message || "An error occurred. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-black/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Campus Ride</h1>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                Home
              </Link>
              <Link href="/book-ride" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                Book a Ride
              </Link>
              <Link href="/driver/dashboard" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                Driver Dashboard
              </Link>
            </div>
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
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
              <Link
                href="/auth/login"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex items-center justify-center p-4 pt-8">
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-800"
      >
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">Register as Driver</h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
          Complete your driver profile to start accepting rides
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* License Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <FileText className="w-5 h-5" /> License Information
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                License Number *
              </label>
              <input
                type="text"
                name="license_number"
                value={formData.license_number}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              {errors.license_number && (
                <p className="text-red-600 text-sm mt-1">{errors.license_number}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                License Expiry Date *
              </label>
              <input
                type="date"
                name="license_expiry_date"
                value={formData.license_expiry_date}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              {errors.license_expiry_date && (
                <p className="text-red-600 text-sm mt-1">{errors.license_expiry_date}</p>
              )}
            </div>
          </div>

          {/* Vehicle Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Car className="w-5 h-5" /> Vehicle Information
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Vehicle Model *
              </label>
              <input
                type="text"
                name="vehicle_model"
                value={formData.vehicle_model}
                onChange={handleInputChange}
                placeholder="e.g., Toyota Corolla"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              {errors.vehicle_model && (
                <p className="text-red-600 text-sm mt-1">{errors.vehicle_model}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Vehicle Plate Number *
              </label>
              <input
                type="text"
                name="vehicle_plate"
                value={formData.vehicle_plate}
                onChange={handleInputChange}
                placeholder="e.g., GR 1234-24"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              {errors.vehicle_plate && (
                <p className="text-red-600 text-sm mt-1">{errors.vehicle_plate}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Vehicle Color
              </label>
              <input
                type="text"
                name="vehicle_color"
                value={formData.vehicle_color}
                onChange={handleInputChange}
                placeholder="e.g., Blue"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Documents */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Upload className="w-5 h-5" /> Required Documents
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Driving License *
              </label>
              <input
                type="file"
                name="driving_license"
                onChange={handleFileChange}
                accept="image/*,.pdf"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              {files.driving_license && (
                <p className="text-sm text-green-600 mt-1">✓ {files.driving_license.name}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Vehicle Registration *
              </label>
              <input
                type="file"
                name="vehicle_registration"
                onChange={handleFileChange}
                accept="image/*,.pdf"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              {files.vehicle_registration && (
                <p className="text-sm text-green-600 mt-1">✓ {files.vehicle_registration.name}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Vehicle Insurance (Optional)
              </label>
              <input
                type="file"
                name="vehicle_insurance"
                onChange={handleFileChange}
                accept="image/*,.pdf"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {files.vehicle_insurance && (
                <p className="text-sm text-green-600 mt-1">✓ {files.vehicle_insurance.name}</p>
              )}
            </div>
          </div>

          {message && (
            <div
              className={`p-4 rounded-lg flex items-start gap-2 ${
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

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "Submitting..." : "Submit Registration"}
          </button>
        </form>
      </motion.div>
      </div>
    </div>
  );
}

