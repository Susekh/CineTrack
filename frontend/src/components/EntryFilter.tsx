interface EntryFilterProps {
  search: string;
  setSearch: (val: string) => void;
  typeFilter: string;
  setTypeFilter: (val: string) => void;
}

export default function EntryFilter({
  search,
  setSearch,
  typeFilter,
  setTypeFilter,
}: EntryFilterProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-4">
      <input
        type="text"
        placeholder="Search by title or director..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full sm:w-1/2 px-3 py-2 rounded-md bg-[#1b1f23] border border-[#2c2c2c] text-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
      />

      <select
        value={typeFilter}
        onChange={(e) => setTypeFilter(e.target.value)}
        className="px-3 py-2 rounded-md bg-[#1b1f23] border border-[#2c2c2c] text-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-gray-500"
      >
        <option value="">All Types</option>
        <option value="MOVIE">Movies</option>
        <option value="TV_SHOW">TV Shows</option>
      </select>
    </div>
  );
}
