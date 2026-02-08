"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthAPI, setAuthTokens } from "@/lib/api";
import { Shield, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function AdminLoginPage() {
  const router = useRouter();
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

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
        setAuthTokens(res.access, res.refresh);

        // Check if user is admin
        const user = res.user || {};
        const userType = user.user_type || "customer";

        if (userType !== "admin") {
          setError("This login is only for administrators. Please use the regular login page.");
          setLoading(false);
          return;
        }

        router.push("/admin/dashboard");
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.detail || err.message || "Invalid credentials. Please check your email/phone and password.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-black/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Campus Ride</h1>
            </Link>
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
              <Link
                href="/auth/login"
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-medium px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                Regular Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Login Form */}
      <div className="flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md border border-gray-200 dark:border-gray-800 p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
              <Shield className="w-6 h-6 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Login</h1>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Secure access for Campus Ride administrators only
          </p>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Email or Phone</label>
              <input
                type="text"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                placeholder="Enter admin email or phone number"
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 bg-red-600 dark:bg-red-700 text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign in as Admin"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              Need regular access?{" "}
              <Link href="/auth/login" className="underline hover:text-gray-900 dark:hover:text-white">
                Go to regular login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

