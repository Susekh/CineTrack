import { Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import EntryFilter from "./EntryFilter";

export interface Entry {
  id: number;
  title: string;
  description?: string;
  type?: string;
  director?: string;
  budget?: number;
  duration?: string;
  yearOrTime?: string;
  picture?: string;
}

interface EntryTableProps {
  entries: Entry[];
  onDelete: (id: number) => void;
}

export default function EntryTable({ entries, onDelete }: EntryTableProps) {
  const navigate = useNavigate();
  const fallbackImage = "/fallback.png";

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const filteredEntries = useMemo(() => {
    return entries.filter((e) => {
      const matchesSearch =
        e.title?.toLowerCase().includes(search.toLowerCase()) ||
        e.director?.toLowerCase().includes(search.toLowerCase());
      const matchesType = typeFilter ? e.type === typeFilter : true;
      return matchesSearch && matchesType;
    });
  }, [entries, search, typeFilter]);

  const formatYearOrTime = (value?: string) => {
    if (!value) return "-";
    const date = new Date(value);
    return isNaN(date.getTime())
      ? value
      : date.toLocaleDateString("en-GB", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
  };

  if (entries.length === 0)
    return (
      <p className="text-gray-400 text-sm text-center py-6">
        No entries found.
      </p>
    );

  return (
    <div className="w-full">
      <EntryFilter
        search={search}
        setSearch={setSearch}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
      />

      {/* Responsive wrapper with scroll on small screens */}
      <div className="w-full overflow-x-auto rounded-md border border-[#2c2c2c] bg-[#14181c]">
        <table className="min-w-[700px] w-full border-collapse text-left">
          <thead>
            <tr className="bg-[#1b1f23] border-b border-[#2c2c2c] text-xs uppercase tracking-wide text-gray-400">
              <th className="p-3 font-semibold">Poster</th>
              <th className="p-3 font-semibold">Title</th>
              <th className="p-3 font-semibold">Type</th>
              <th className="p-3 font-semibold">Director</th>
              <th className="p-3 font-semibold">Budget</th>
              <th className="p-3 font-semibold">Duration</th>
              <th className="p-3 font-semibold">Year</th>
              <th className="p-3 font-semibold text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredEntries.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="text-center text-gray-500 py-6 text-sm"
                >
                  No matching results.
                </td>
              </tr>
            ) : (
              filteredEntries.map((entry, i) => (
                <tr
                  key={entry.id}
                  className={`border-b border-[#2c2c2c] ${
                    i % 2 === 0 ? "bg-[#14181c]" : "bg-[#1c1f23]"
                  } hover:bg-[#21262b] transition-colors duration-200`}
                >
                  <td className="p-3">
                    <img
                      src={entry.picture || fallbackImage}
                      alt={entry.title}
                      className="w-12 h-16 sm:w-14 sm:h-20 object-cover rounded-sm border border-[#2c2c2c]"
                    />
                  </td>

                  <td className="p-3 text-white font-medium wrap-break-words max-w-[150px] sm:max-w-none">
                    {entry.title}
                  </td>

                  <td className="p-3 text-gray-300 capitalize">
                    {entry.type ? entry.type.replace("_", " ") : "-"}
                  </td>

                  <td className="p-3 text-gray-300">{entry.director || "-"}</td>

                  <td className="p-3 text-gray-200 whitespace-nowrap">
                    {entry.budget ? `$${entry.budget.toLocaleString()}` : "-"}
                  </td>

                  <td className="p-3 text-gray-300">{entry.duration || "-"}</td>

                  <td className="p-3 text-gray-300">
                    {formatYearOrTime(entry.yearOrTime)}
                  </td>

                  <td className="p-3 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => navigate(`/entry/edit/${entry.id}`)}
                        className="px-2 py-1 rounded-sm bg-gray-700 cursor-pointer hover:bg-green-600 hover:text-black text-gray-200 text-xs font-medium transition-colors duration-200"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => onDelete(entry.id)}
                        className="px-2 py-1 rounded-sm bg-gray-700 cursor-pointer hover:bg-red-600 hover:text-black text-gray-200 text-xs font-medium transition-colors duration-200"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Hint for mobile users */}
      <p className="text-gray-500 text-xs text-center mt-2 sm:hidden italic">
        Swipe left/right to see more columns →
      </p>
    </div>
  );
}
