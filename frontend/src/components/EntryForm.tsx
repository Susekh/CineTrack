import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { entrySchema, type EntrySchemaType } from "../types/entry.types";
import { useState, useEffect } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router";

type EntryFormProps = {
  initialData?: EntrySchemaType;
  entryId?: number;
};

export default function EntryForm({ initialData, entryId }: EntryFormProps) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [dateValue, setDateValue] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<EntrySchemaType>({
    resolver: zodResolver(entrySchema),
    defaultValues: initialData || {
      title: "",
      type: "MOVIE",
      director: "",
      budget: 0,
      location: "",
      duration: "",
      yearOrTime: new Date(),
      picture: "",
    },
  });

  useEffect(() => {
    if (initialData?.yearOrTime) {
      const date = new Date(initialData.yearOrTime);
      setDateValue(date.toISOString().split("T")[0]);
      setValue("yearOrTime", date);
    }
  }, [initialData, setValue]);

  const onSubmit: SubmitHandler<EntrySchemaType> = async (data) => {
    try {
      setLoading(true);
      if (entryId) await api.put(`/entry/${entryId}`, data);
      else await api.post("/entry", data);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      if (err instanceof Error) alert(err.message);
      else alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    setDateValue(newDate);
    setValue("yearOrTime", new Date(newDate));
  };

  return (
    <div className="bg-linear-to-b from-gray-900 to-black text-gray-100 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 w-full max-w-lg bg-gray-950/80 backdrop-blur-md border border-gray-800 p-8 rounded-2xl shadow-lg"
      >
        <h2 className="text-2xl font-semibold text-white mb-2 text-center">
          {entryId ? "Edit Entry" : "Add a New Entry"}
        </h2>
        <p className="text-sm text-gray-400 text-center mb-4">
          Log your favorite movie or show details 🎬
        </p>

        {/* Title */}
        <div>
          <label className="block text-sm text-gray-300 mb-1">Title</label>
          <input
            {...register("title")}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#00A878] outline-none"
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Type */}
        <div>
          <label className="block text-sm text-gray-300 mb-1">Type</label>
          <select
            {...register("type")}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#00A878] outline-none"
          >
            <option value="MOVIE">Movie</option>
            <option value="TV_SHOW">TV Show</option>
          </select>
          {errors.type && (
            <p className="text-red-500 text-xs mt-1">{errors.type.message}</p>
          )}
        </div>

        {/* Director */}
        <div>
          <label className="block text-sm text-gray-300 mb-1">Director</label>
          <input
            {...register("director")}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#00A878] outline-none"
          />
          {errors.director && (
            <p className="text-red-500 text-xs mt-1">{errors.director.message}</p>
          )}
        </div>

        {/* Budget */}
        <div>
          <label className="block text-sm text-gray-300 mb-1">Budget</label>
          <input
            type="number"
            {...register("budget", { valueAsNumber: true })}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#00A878] outline-none"
          />
          {errors.budget && (
            <p className="text-red-500 text-xs mt-1">{errors.budget.message}</p>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm text-gray-300 mb-1">Location</label>
          <input
            {...register("location")}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#00A878] outline-none"
          />
          {errors.location && (
            <p className="text-red-500 text-xs mt-1">{errors.location.message}</p>
          )}
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm text-gray-300 mb-1">Duration</label>
          <input
            {...register("duration")}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#00A878] outline-none"
          />
          {errors.duration && (
            <p className="text-red-500 text-xs mt-1">{errors.duration.message}</p>
          )}
        </div>

        {/* Release Date */}
        <div>
          <label className="block text-sm text-gray-300 mb-1">
            Release Date
          </label>
          <input
            type="date"
            value={dateValue}
            onChange={handleDateChange}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#00A878] outline-none"
          />
          {errors.yearOrTime && (
            <p className="text-red-500 text-xs mt-1">
              {errors.yearOrTime.message}
            </p>
          )}
        </div>

        {/* Picture */}
        <div>
          <label className="block text-sm text-gray-300 mb-1">
            Picture URL (optional)
          </label>
          <input
            {...register("picture")}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#00A878] outline-none"
          />
          {errors.picture && (
            <p className="text-red-500 text-xs mt-1">{errors.picture.message}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 rounded-lg cursor-pointer font-medium text-white bg-linear-to-r from-[#00A878] to-[#007A5E] hover:opacity-90 transition disabled:opacity-60"
        >
          {loading ? "Saving..." : entryId ? "Update Entry" : "Create Entry"}
        </button>
      </form>
    </div>
  );
}
