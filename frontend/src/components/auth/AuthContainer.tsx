import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import ShimmerLoader from "../shimmers/ShimmerLoader";

interface AuthContainerProps {
  children: React.ReactNode;
}

const AuthContainer= ({ children } : AuthContainerProps) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <ShimmerLoader/>;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

export default AuthContainer;
