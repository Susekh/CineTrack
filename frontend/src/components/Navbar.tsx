import { Link } from "react-router";
import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const { user, loading } = useAuth();

  useEffect(() => {
    console.log("[Navbar] Auth state:", { user, loading });
  }, [user, loading]);

  return (
    <nav className="w-full bg-[#14181c] border-b border-[#2c2c2c] text-white">
      <div className="max-w-7xl cursor-pointer mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link
          to="/"
          className="text-xl font-bold tracking-tight text-[#00c030] hover:text-[#00e040] transition-colors duration-200"
        >
          CineTrack
        </Link>

        <Link
          to="/dashboard"
          className="px-4 py-1.5 cursor-pointer text-sm font-medium text-white bg-[#2c3440] hover:bg-[#00c030] hover:text-black border border-transparent transition-colors duration-200 rounded-sm"
        >
          Dashboard
        </Link>
      </div>
    </nav>
  );
}
