import { useState, useEffect } from "react";
import api from "../utils/api";

interface User {
  id: number;
  name: string;
  email: string;
}

interface ApiResponse<T> {
  success: boolean;
  user?: T;
  msg?: string;
  [key: string]: unknown;
}

interface Credentials {
  email: string;
  password: string;
}

interface SignupData extends Credentials {
  name: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Checking if user is logged in on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log("[useAuth] Checking user session...");
        const res = await api.get<ApiResponse<User>>("/auth/me", { withCredentials: true });
        console.log("[useAuth] /auth/me response:", res.data);

        if (res.data.success && res.data.user) {
          setUser(res.data.user);
        } else {
          console.warn("[useAuth] No active session or invalid user data");
          setUser(null);
        };
      } catch (error) {
        if (error instanceof Error) {
          console.error("[useAuth] Error fetching user:", error.message);
        } else {
          console.error("[useAuth] Unknown error fetching user:", error);
        }
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Signup
  const signup = async (data: SignupData): Promise<void> => {
    try {
      console.log("[useAuth] Signing up user:", data.email);
      const res = await api.post<ApiResponse<User>>("/auth/signup", data, { withCredentials: true });
      console.log("[useAuth] Signup response:", res.data);

      if (res.data.success && res.data.user) {
        setUser(res.data.user);
      } else {
        console.warn("[useAuth] Signup did not return valid user data");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("[useAuth] Signup error:", error.message);
      } else {
        console.error("[useAuth] Unknown signup error:", error);
      }
      throw error;
    }
  };

  // Signin
  const signin = async (data: Credentials): Promise<void> => {
    try {
      console.log("[useAuth] Signing in user:", data.email);
      const res = await api.post<ApiResponse<User>>("/auth/signin", data, { withCredentials: true });
      console.log("[useAuth] Signin response:", res.data);

      if (res.data.success && res.data.user) {
        setUser(res.data.user);
      } else {
        console.warn("[useAuth] Signin failed or returned invalid data");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("[useAuth] Signin error:", error.message);
      } else {
        console.error("[useAuth] Unknown signin error:", error);
      }
      throw error;
    }
  };

  // Signout
  const signout = async (): Promise<void> => {
    try {
      console.log("[useAuth] Signing out user...");
      const res = await api.post<ApiResponse<null>>("/auth/signout", {}, { withCredentials: true });
      console.log("[useAuth] Signout response:", res.data);
      setUser(null);
    } catch (error) {
      if (error instanceof Error) {
        console.error("[useAuth] Signout error:", error.message);
      } else {
        console.error("[useAuth] Unknown signout error:", error);
      }
    }
  };

  return { user, setUser, loading, signup, signin, signout };
};
