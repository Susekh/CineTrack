import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])/;

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Email is invalid"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(passwordRegex, "Password must contain an uppercase letter and a special character"),
});

const signinSchema = z.object({
  email: z.string().email("Email is invalid"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignupForm = z.infer<typeof signupSchema>;
type SigninForm = z.infer<typeof signinSchema>;

interface AuthFormProps {
  mode: "signin" | "signup";
  onSubmit: (data: Record<string, string>) => void;
  submitting: boolean;
}

export default function AuthForm({ mode, onSubmit, submitting }: AuthFormProps) {
  const schema = mode === "signin" ? signinSchema : signupSchema;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninForm | SignupForm>({
    resolver: zodResolver(schema),
  });

  const [showPassword, setShowPassword] = useState(false);

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="text-gray-200">
      {mode === "signup" && (
        <>
          <label className="block mb-2 text-sm font-medium text-gray-300">Name</label>
          <input
            {...register("name" as keyof SignupForm)}
            type="text"
            className="w-full mb-2 px-3 py-2 bg-gray-800 border border-gray-700 rounded focus:ring-2 focus:ring-[#00A878] outline-none transition"
            placeholder="Full name"
            disabled={submitting}
          />
          {"name" in errors && (
            <p className="text-xs text-red-500 mb-2">{errors.name?.message as string}</p>
          )}
        </>
      )}

      {/* Email */}
      <label className="block mb-2 text-sm font-medium text-gray-300">Email</label>
      <input
        {...register("email")}
        type="email"
        className="w-full mb-2 px-3 py-2 bg-gray-800 border border-gray-700 rounded focus:ring-2 focus:ring-[#00A878] outline-none transition"
        placeholder="you@example.com"
        disabled={submitting}
      />
      {errors.email && <p className="text-xs text-red-500 mb-2">{errors.email.message as string}</p>}

      {/* Password */}
      <label className="block mb-2 text-sm font-medium text-gray-300">Password</label>
      <div className="relative">
        <input
          {...register("password")}
          type={showPassword ? "text" : "password"}
          className="w-full mb-2 px-3 py-2 bg-gray-800 border border-gray-700 rounded pr-10 focus:ring-2 focus:ring-[#00A878] outline-none transition"
          placeholder={
            mode === "signup"
              ? "At least 6 chars, 1 uppercase, 1 special"
              : "Your password"
          }
          disabled={submitting}
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
          tabIndex={-1}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {errors.password && (
        <p className="text-xs text-red-500 mb-2">{errors.password.message as string}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className={`mt-4 w-full px-4 py-2 rounded text-white font-medium transition ${
          mode === "signin"
            ? "bg-linear-to-r from-[#00A878] to-[#007A5E] hover:opacity-90"
            : "bg-linear-to-r from-[#3B82F6] to-[#2563EB] hover:opacity-90"
        } disabled:opacity-60`}
      >
        {submitting
          ? mode === "signin"
            ? "Signing in..."
            : "Creating account..."
          : mode === "signin"
          ? "Sign in"
          : "Create account"}
      </button>
    </form>
  );
}
