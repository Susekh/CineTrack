import { Link } from "react-router";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-[#1c2228] overflow-hidden text-center">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/5662857/pexels-photo-5662857.png')",
        }}
      ></div>

      <div className="absolute inset-0 bg-linear-to-r from-[#1c2228] via-[#1c2228]/40 to-[#1c2228]"></div>
      <div className="absolute inset-0 bg-linear-to-b from-[#1c2228]/60 via-transparent to-[#1c2228]"></div>
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Hero Content */}
      <div className="relative z-10 px-4 sm:px-6 max-w-5xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-10" style={{ fontFamily: 'Georgia, serif' }}>
          Watch. Log. Repeat. 
          <br />
          Find what friends enjoy. 
          <br />
          Join the film community.
        </h1>

        <Link
          to="/dashboard"
          className="inline-block cursor-pointer bg-green-600 hover:bg-green-500 text-white font-bold text-base px-8 py-3 rounded transition-colors"
        >
          Get started — it's free!
        </Link>
      </div>

      <div className="absolute right-4 bottom-12 text-gray-500 text-xs rotate-90 origin-bottom-right">
        CineTrack (2025)
      </div>
    </div>
  );
}