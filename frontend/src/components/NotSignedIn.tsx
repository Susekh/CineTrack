import { Link } from "react-router-dom";

export default function NotSignedIn() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-b from-gray-950 to-gray-900 text-gray-300 px-6">
      <div className="text-center space-y-4">
        <h2 className="text-2xl sm:text-3xl font-bold bg-linear-to-r from-gray-200 via-white to-gray-300 bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(255,255,255,0.15)]">
          You’re not signed in
        </h2>

        <p className="text-gray-400 text-sm sm:text-base">
          Please log in to access your dashboard and continue exploring.
        </p>

        <Link
          to="/auth"
          className="inline-block cursor-pointer mt-4 px-6 py-2 rounded-lg bg-green-500 text-black font-semibold hover:bg-green-600 transition-all shadow-[0_0_15px_rgba(0,224,84,0.2)]"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
