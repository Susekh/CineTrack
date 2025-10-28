export default function Footer() {
  return (
    <footer className="w-full bg-[#14181c] border-t border-[#2c2c2c] text-gray-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
    
        <div className="flex items-center gap-2 text-gray-500">
          <span className="font-semibold text-green-500">CineTrack</span>
          <span>© {new Date().getFullYear()}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-400">
          <span>Made with ❤️ by</span>
          <a
            href="https://portfolio-cty.pages.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-green-500 hover:text-green-500 transition-colors duration-200"
          >
            Subhranshu Khilar
          </a>
        </div>
      </div>
    </footer>
  );
}
