"use client";

import { useState, useEffect } from "react";

// Simple compatibility wrapper - react-auth-kit handles everything
// This file maintains backward compatibility with existing useAuth() calls
// while using react-auth-kit under the hood

interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  user_type: "customer" | "driver" | "admin";
}

// Dynamic import to handle react-auth-kit's export structure
let ReactAuthKit: any;
try {
  ReactAuthKit = require("react-auth-kit");
} catch (e) {
  ReactAuthKit = {};
}

// Custom hook that wraps react-auth-kit to maintain existing API
export function useAuth() {
  // Call hooks unconditionally - React requirement
  // Wrap in try-catch to handle cases where react-auth-kit isn't loaded
  let signIn: any = null;
  let signOut: any = null;
  let authUser: any = null;
  let isAuthenticated: any = null;
  
  try {
    if (ReactAuthKit.useSignIn) {
      signIn = ReactAuthKit.useSignIn();
    }
    if (ReactAuthKit.useSignOut) {
      signOut = ReactAuthKit.useSignOut();
    }
    if (ReactAuthKit.useAuthUser) {
      authUser = ReactAuthKit.useAuthUser();
    }
    if (ReactAuthKit.useIsAuthenticated) {
      isAuthenticated = ReactAuthKit.useIsAuthenticated();
    }
  } catch (error) {
    console.error("Error initializing react-auth-kit hooks", error);
  }
  
  // Make state reactive with useState
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuth, setIsAuth] = useState(false);
  
  // Get user data - authUser is a function that returns the user
  const getUser = (): User | null => {
    try {
      if (authUser && typeof authUser === 'function') {
        const user = authUser() as User | null;
        return user;
      }
      // Fallback: check localStorage token and decode
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("campusride_access_token");
        if (token) {
          try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
              atob(base64)
                .split('')
                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
            );
            const decoded = JSON.parse(jsonPayload) as { id: string; email: string; user_type: string };
            return {
              id: decoded.id,
              email: decoded.email,
              first_name: "",
              last_name: "",
              user_type: decoded.user_type as "customer" | "driver" | "admin",
            };
          } catch (e) {
            // Token decode failed
          }
        }
      }
    } catch (error) {
      console.error("Error getting user", error);
    }
    return null;
  };
  
  // Check if authenticated
  const getIsAuthenticated = (): boolean => {
    try {
      if (isAuthenticated && typeof isAuthenticated === 'function') {
        return isAuthenticated();
      }
      // Fallback: check if token exists
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("campusride_access_token");
        return !!token;
      }
    } catch (error) {
      console.error("Error checking authentication", error);
    }
    return false;
  };

  // Sync state with react-auth-kit on mount and when it changes
  useEffect(() => {
    const updateAuthState = () => {
      const user = getUser();
      const authenticated = getIsAuthenticated();
      setCurrentUser(user);
      setIsAuth(authenticated);
    };
    
    // Initial load
    updateAuthState();
    
    // Poll for changes every 2 seconds (react-auth-kit should trigger re-renders, but this ensures sync)
    const interval = setInterval(updateAuthState, 2000);
    
    // Also listen for storage changes (when logout clears localStorage)
    const handleStorageChange = () => {
      updateAuthState();
    };
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [authUser, isAuthenticated]);

  return {
    user: currentUser,
    isAuthenticated: isAuth,
    isLoading: false, // react-auth-kit handles this internally
    login: (access: string, refresh?: string, userData?: User) => {
      // Store tokens in localStorage (for backward compatibility with api.ts)
      if (typeof window !== "undefined") {
        localStorage.setItem("campusride_access_token", access);
        if (refresh) localStorage.setItem("campusride_refresh_token", refresh);
      }

      // Try to get user data from parameter, token, or fetch from API
      let authState: User | null = userData || null;
      
      if (!authState) {
        // Decode token to get user info as fallback
        try {
          const base64Url = access.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const jsonPayload = decodeURIComponent(
            atob(base64)
              .split('')
              .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
              .join('')
          );
          const decoded = JSON.parse(jsonPayload) as { id: string; email: string; user_type: string };
          
          authState = {
            id: decoded.id,
            email: decoded.email,
            first_name: "",
            last_name: "",
            user_type: decoded.user_type as "customer" | "driver" | "admin",
          };
        } catch (error) {
          console.error("Failed to decode token", error);
          return;
        }
      }

      // Use react-auth-kit's signIn
      if (signIn && typeof signIn === 'function') {
        try {
          const success = signIn({
            token: access,
            expiresIn: 604800, // 7 days
            tokenType: "Bearer",
            authState: authState,
          });
          // Immediately update state if signIn succeeded
          if (success) {
            setCurrentUser(authState);
            setIsAuth(true);
          }
        } catch (error) {
          console.error("Failed to sign in with react-auth-kit", error);
        }
      } else {
        // Fallback: update state directly if react-auth-kit isn't available
        setCurrentUser(authState);
        setIsAuth(true);
      }
    },
    logout: () => {
      // Clear tokens from localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("campusride_access_token");
        localStorage.removeItem("campusride_refresh_token");
      }
      if (signOut && typeof signOut === 'function') {
        try {
          signOut();
        } catch (error) {
          console.error("Failed to sign out with react-auth-kit", error);
        }
      }
      // Immediately update state
      setCurrentUser(null);
      setIsAuth(false);
    },
    refreshUser: async () => {
      // For now, just return - react-auth-kit handles state automatically
      return Promise.resolve();
    },
  };
}

// Export react-auth-kit's AuthProvider for use in Providers
export const AuthProvider = ReactAuthKit.AuthProvider || ((props: any) => props.children);
