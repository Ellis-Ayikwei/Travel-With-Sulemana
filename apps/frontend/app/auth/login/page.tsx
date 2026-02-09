"use client";

import Link from "next/link";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthAPI } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import axiosInstance from "@/lib/api";
import Navigation from "@/components/Navigation";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDriverLogin, setIsDriverLogin] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    if (!emailOrPhone || !password) {
      setError("Please enter both email/phone and password");
      setLoading(false);
      return;
    }
    
    try {
      const res = await AuthAPI.login(emailOrPhone, password);
      
      if (res.access) {
        // Fetch full user data if not provided
        let userData = res.user;
        if (!userData || !userData.id) {
          try {
            // Set token temporarily for API call
            if (typeof window !== "undefined") {
              localStorage.setItem("campusride_access_token", res.access);
            }
            const userResponse = await axiosInstance.get("/auth/me");
            userData = userResponse.data;
          } catch (e) {
            // Use partial user data from login response
            userData = res.user || {};
          }
        }
        
        // Login with react-auth-kit, passing user data
        login(res.access, res.refresh, userData);
        
        // Small delay to ensure auth state is set before redirect
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Check for 'from' parameter first (redirect to requested page)
        const fromParam = searchParams.get("from");
        if (fromParam) {
          router.push(decodeURIComponent(fromParam));
          return;
        }
        
        // Determine redirect based on user type or explicit driver login
        const userType = userData?.user_type || "customer";
        
        // Redirect based on user type
        if (userType === "admin") {
          router.push("/admin/dashboard");
        } else if (isDriverLogin || userType === "driver") {
          router.push("/driver/dashboard");
        } else {
          router.push("/book-ride");
        }
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || err.message || "Invalid credentials. Please check your email/phone and password.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <Navigation />

      {/* Login Form */}
      <div className="flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md border border-gray-200 dark:border-gray-800 p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {isDriverLogin ? "Sign in as Driver" : "Sign in"}
          </h1>
          <button
            type="button"
            onClick={() => setIsDriverLogin(!isDriverLogin)}
            className="text-sm px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {isDriverLogin ? "Switch to Rider" : "Switch to Driver"}
          </button>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Email or Phone</label>
            <input
              type="text"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              placeholder="Enter email or phone number"
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
            <div className="mt-4 space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                No account? <Link href="/auth/signup" className="underline hover:text-gray-900 dark:hover:text-white">Create one</Link>
              </p>
              {!isDriverLogin && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Are you a driver? <Link href="/driver/register" className="underline hover:text-gray-900 dark:hover:text-white">Register as driver</Link>
                </p>
              )}
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Admin? <Link href="/admin/login" className="underline hover:text-gray-900 dark:hover:text-white font-medium text-red-600 dark:text-red-400">Admin Login</Link>
              </p>
            </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center">
        <div className="text-gray-600 dark:text-gray-400">Loading...</div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
