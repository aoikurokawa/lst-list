export function Header() {
  return (
    <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <span className="text-white font-bold text-lg">L</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">
                Solana LST Dashboard
              </h1>
              <p className="text-sm text-slate-400">Liquid Staking Tokens</p>
            </div>
          </div>
          <div className="text-sm text-slate-400">
            Auto-refreshes every minute
          </div>
        </div>
      </div>
    </header>
  );
}
