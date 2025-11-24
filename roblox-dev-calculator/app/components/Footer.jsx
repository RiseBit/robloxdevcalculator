export default function Footer() {
  return (
    <footer className="max-w-7xl mx-auto px-5 py-8 text-center border-t-2 border-borderColor mt-16">
      <div className="mb-4">
        <p className="text-textSecondary text-sm font-bold tracking-wide">
          Built by <a href="https://x.com/RiseBit_Dev" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">RiseBit</a>, a 16-year-old Full-Stack Roblox Developer
        </p>
        <p className="text-textSecondary text-xs mt-2">
          Specializing in Lua/Roblox development, Automation, and web development
        </p>
      </div>
      <p className="text-textSecondary text-sm font-bold tracking-wide">
        © 2025 Roblox Dev Calculator. Not affiliated with Roblox Corporation.
      </p>
      <p className="text-textSecondary text-xs mt-2">
        DevEx rates updated November 2025 • Using official Roblox exchange rates
      </p>
    </footer>
  )
}