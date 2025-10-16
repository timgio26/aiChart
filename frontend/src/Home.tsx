import { Outlet } from "react-router";

export function Home() {
  return (
<div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-white text-gray-800 font-sans">
  {/* Navigation */}
  <nav className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex items-center justify-between">
    <h1 className="text-2xl font-bold tracking-tight text-indigo-600">📊 Chart AI</h1>
    {/* Future NavLinks */}
    {/* <NavLink to={"/"} className="text-sm text-gray-600 hover:text-indigo-500">AI Cook</NavLink> */}
    {/* <NavLink to={"/"} className="text-sm text-gray-600 hover:text-indigo-500">Chart AI</NavLink> */}
  </nav>

  {/* Main Content */}
  <main className="flex-grow px-6 py-10 max-w-4xl mx-auto space-y-6">
    <p className="text-lg leading-relaxed text-gray-700">
      A web-based tool for evaluating how Large Language Models (LLMs) interpret chart images using 
      <span className="font-semibold text-indigo-500"> mini-VLAT</span> and 
      <span className="font-semibold text-indigo-500"> Chain-of-Thought (CoT) prompting</span>.
    </p>

    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <Outlet />
    </div>
  </main>

  {/* Footer */}
  <footer className="text-center text-sm text-gray-400 py-4">
    © {new Date().getFullYear()} Chart AI · Timotius Giovandi ✨
  </footer>
</div>
  );
}
