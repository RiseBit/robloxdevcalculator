export default function Header() {
  return (
    <header className="bg-bgCard border-b-2 border-accent/50 sticky top-0 z-50 shadow-[0_4px_20px_rgba(91,141,255,0.15)] backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-5 py-6 flex flex-wrap justify-between items-center gap-4">
        <h1 className="text-3xl font-black text-primary tracking-tight hover:tracking-wide hover:text-accent transition-all duration-300">
          Roblox Dev Calculator
        </h1>
        <a 
          href="https://x.com/RiseBit_Dev" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group relative"
        >
          <img 
            src="/RiseBit PFP.png" 
            alt="RiseBit Portfolio" 
            className="w-14 h-14 rounded-full border-2 border-accent/50 group-hover:border-accent object-cover transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-[0_0_25px_rgba(91,141,255,0.6)]"
          />
        </a>
      </div>
    </header>
  )
}