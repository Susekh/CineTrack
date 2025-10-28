import { useEffect, useState } from "react";
import EntryForm from "../components/EntryForm";
import api from "../utils/api";
import { useParams } from "react-router-dom";
import type { EntrySchemaType } from "../types/entry.types";

export default function EditEntryPage() {
  const { id } = useParams(); 
  const [entry, setEntry] = useState<EntrySchemaType | null>(null);

  useEffect(() => {
    const fetchEntry = async () => {
      if (id) {
        try {
          const response = await api.get(`/entry/${id}`);
          setEntry(response.data.entry);
        } catch (error) {
          console.error("Failed to fetch entry:", error);
        }
      }
    };

    fetchEntry();
  }, [id]);

  if (!entry) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <EntryForm initialData={entry} entryId={Number(id)} />
    </div>
  );
}
