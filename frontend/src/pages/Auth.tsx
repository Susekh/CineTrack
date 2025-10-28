import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import AuthForm from "../components/auth/AuthForm";
import toast from "react-hot-toast";

export default function Auth() {
  const { signup, signin, user, loading } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, loading, navigate]);

  const handleAuth = async (data: Record<string, string>) => {
    setServerError(null);
    setSubmitting(true);

    try {
      if (mode === "signin") {
        await signin({ email: data.email, password: data.password });
        toast.success("Welcome back 🎬");
        navigate("/dashboard");
      } else {
        await signup({
          name: data.name,
          email: data.email,
          password: data.password,
        });
        toast.success("Account created! Sign in to continue 🚀");
        setMode("signin");
      }
    } catch (err) {
      const message =
        err &&
        typeof err === "object" &&
        "response" in err &&
        (err as { response?: { data?: { message?: string } } }).response?.data
          ?.message
          ? (err as { response: { data: { message: string } } }).response.data
              .message
          : "Something went wrong. Please try again.";

      setServerError(message);
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-gray-400">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center  relative">
      {/* Vignette overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div className="relative z-10 w-full max-w-md bg-black/80 border border-gray-800 rounded-2xl shadow-lg p-8 text-gray-200">
        <h2 className="text-2xl font-semibold text-center mb-6">
          {mode === "signin" ? "Sign In to Continue" : "Create Your Account"}
        </h2>

        {serverError && (
          <div className="mb-4 text-sm text-red-400 bg-red-900/40 p-2 rounded">
            {serverError}
          </div>
        )}

        <AuthForm mode={mode} onSubmit={handleAuth} submitting={submitting} />

        <div className="mt-6 text-center text-sm text-gray-400">
          {mode === "signin" ? (
            <>
              New here?{" "}
              <button
                onClick={() => {
                  setServerError(null);
                  setMode("signup");
                }}
                className="text-green-400 hover:underline"
              >
                Create an account
              </button>
            </>
          ) : (
            <>
              Have an account?{" "}
              <button
                onClick={() => {
                  setServerError(null);
                  setMode("signin");
                }}
                className="text-green-400 hover:underline"
              >
                Sign in
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
