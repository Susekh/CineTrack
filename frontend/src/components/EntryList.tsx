import { useEffect, useState, useRef, useCallback } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import EntryTable from "../components/EntryTable";
import ConfirmationModal from "./Modals/ConfirmationModa";

interface Entry {
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

export default function EntryList() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextCursor, setNextCursor] = useState<number | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [entryToDelete, setEntryToDelete] = useState<number | null>(null);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const fetchEntries = useCallback(async (cursor?: number) => {
    try {
      setLoading(true);
      const res = await api.get("/entry", {
        params: { cursor, limit: 10 },
        withCredentials: true,
      });
      const { entries: newEntries, nextCursor: next } = res.data;

      setEntries((prev) => {
        const existingIds = new Set(prev.map((e) => e.id));
        const unique = newEntries.filter((e: Entry) => !existingIds.has(e.id));
        return [...prev, ...unique];
      });

      setNextCursor(next);
      setHasMore(!!next);
    } catch (err) {
      console.error("Error fetching entries:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          fetchEntries(nextCursor || undefined);
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [fetchEntries, hasMore, loading, nextCursor]);

  const handleDelete = async () => {
    if (entryToDelete !== null) {
      try {
        await api.delete(`/entry/${entryToDelete}`, { withCredentials: true });
        setEntries((prev) => prev.filter((e) => e.id !== entryToDelete));
      } catch (err) {
        console.error("Error deleting entry:", err);
      } finally {
        setShowModal(false);
        setEntryToDelete(null);
      }
    }
  };

  return (
    <div className="relative bg-[#1C252C] border border-gray-700 rounded-md shadow-md p-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-gray-600 pb-4 mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-white tracking-tight">
            Your List
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Manage and review your saved records.
          </p>
        </div>

        <button
          onClick={() => navigate("/entry/new")}
          className="w-full md:w-auto px-4 py-2 cursor-pointer bg-green-500 text-black font-semibold rounded-md hover:bg-green-600 transition active:scale-95"
        >
          + Add Entry
        </button>
      </div>

      <div className="overflow-x-auto rounded-md">
        {entries.length === 0 && !loading ? (
          <p className="text-gray-400 text-sm text-center py-6">
            No entries yet — start by adding one!
          </p>
        ) : (
          <EntryTable entries={entries} onDelete={setEntryToDelete} />
        )}
      </div>

      {hasMore && (
        <div
          ref={observerRef}
          className="text-center py-4 text-gray-500 text-sm italic tracking-wide"
        >
          {loading ? "Loading more..." : "Scroll for more"}
        </div>
      )}

      <ConfirmationModal
        isOpen={showModal}
        onConfirm={handleDelete}
        onCancel={() => {
          setShowModal(false);
          setEntryToDelete(null);
        }}
        message="Are you sure you want to delete this entry?"
      />
    </div>
  );
}
