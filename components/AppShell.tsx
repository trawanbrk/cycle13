import Navigation from "./Navigation";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0f0f12]">
      <Navigation />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {children}
      </main>
      <footer className="border-t border-[#2a2a32] mt-12 py-6 text-center text-[#555560] text-sm">
        <div className="max-w-6xl mx-auto px-4">
          Cycle OS &mdash; авторская символико-операционная модель. Не является научным, религиозным, историческим или предсказательным стандартом.
        </div>
      </footer>
    </div>
  );
}