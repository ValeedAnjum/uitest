"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEffect } from "react";

export const useAuthOperations = () => {
  const { signIn, signUp, signInWithGoogle, logout, user, loading } = useAuth();
  const router = useRouter();

  const handleSignIn = async (email: string, password: string) => {
    try {
      await signIn(email, password);
      router.push("/user-dashboad");
    } catch (error: any) {
      toast.error(error.message || "Failed to sign in. Please try again.");
    }
  };

  const handleSignUp = async (
    email: string,
    password: string,
    name?: string
  ) => {
    try {
      await signUp(email, password, name);
      toast.success("Account created successfully!");
      router.push("/user-dashboad");
    } catch (error: any) {
      toast.error(
        error.message || "Failed to create account. Please try again."
      );
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      router.push("/user-dashboad");
    } catch (error: any) {
      toast.error(
        error.message || "Failed to sign in with Google. Please try again."
      );
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Signed out successfully");
      router.push("/login");
    } catch {
      toast.error("Failed to sign out. Please try again.");
    }
  };

  return {
    user,
    loading,
    handleSignIn,
    handleSignUp,
    handleGoogleSignIn,
    handleLogout,
  };
};

// Hook for checking if user is authenticated
export const useRequireAuth = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  return { user, loading };
};
