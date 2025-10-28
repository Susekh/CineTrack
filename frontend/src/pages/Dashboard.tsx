import { useAuth } from "../hooks/useAuth";
import EntryList from "../components/EntryList";
import ShimmerLoader from "../components/shimmers/ShimmerLoader";
import NotSignedIn from "../components/NotSignedIn";

export default function Dashboard() {
  const { user, signout, loading } = useAuth();

  if (loading) {
    return <ShimmerLoader />;
  }

  if (!user) {
    return <NotSignedIn />;
  }

  return (
    <div className="relative min-h-screen bg-linear-to-br from-[#14181C] via-[#1B2B34] to-[#0A0F14] text-gray-100">
      <div className="relative z-10 px-4 py-10">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header Section */}
          <div className="bg-[#1C252C] border border-[#2E3A44] rounded-md shadow-md px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-semibold text-white tracking-tight leading-snug font-['Poppins']">
                <span className="text-gray-400 font-light">Hello,&nbsp;</span>
                <span className="text-[#00A878] font-semibold">
                  {user.name}
                </span>
                <span className="ml-1">👋</span>
              </h1>
              <p className="text-sm text-gray-400 mt-1">{user.email}</p>
            </div>

            <button
              onClick={signout}
              className="px-4 py-2 cursor-pointer bg-gray-600 hover:bg-green-400 hover:text-black text-gray-200 font-medium rounded-md transition-colors duration-200"
            >
              Logout
            </button>
          </div>

          {/* Entry List Section */}
          <div>
            <EntryList />
          </div>
        </div>
      </div>
    </div>
  );
}
