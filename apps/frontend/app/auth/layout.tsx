import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Campus Ride",
    default: "Authentication | Campus Ride",
  },
  description: "Sign in or create an account with Campus Ride to manage your errands and deliveries.",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

