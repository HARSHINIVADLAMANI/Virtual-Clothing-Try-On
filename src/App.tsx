import React from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Home } from './pages/Home';
import { Marketplace } from './pages/Marketplace';
import { TryOn } from './pages/TryOn';
import { Camera, Search, Sparkles } from 'lucide-react';

function Navbar() {
  const location = useLocation();

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-neutral-200 px-4 sm:px-6 py-3 sm:py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 sm:gap-3 group">
          <div className="bg-gradient-to-tr from-yellow-400 to-yellow-300 p-1.5 sm:p-2 rounded-xl shadow-sm group-hover:shadow-md transition-all group-hover:scale-105">
            <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-900" />
          </div>
          <div>
            <h1 className="text-base sm:text-xl font-bold tracking-tight text-neutral-900">Virtual Try-On</h1>
            <p className="text-xs text-neutral-500 font-medium hidden sm:block">AR Experience</p>
          </div>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link 
            to="/" 
            className={`text-sm font-semibold transition-colors ${location.pathname === '/' ? 'text-blue-600' : 'text-neutral-600 hover:text-neutral-900'}`}
          >
            Home
          </Link>
          <Link 
            to="/marketplace" 
            className={`text-sm font-semibold transition-colors ${location.pathname.startsWith('/marketplace') ? 'text-blue-600' : 'text-neutral-600 hover:text-neutral-900'}`}
          >
            Marketplace
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/marketplace"
            className="flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all shadow-sm hover:shadow-md"
          >
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>Explore</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans selection:bg-blue-100 flex flex-col overflow-x-hidden">
        <Navbar />
        <main className="flex-1 flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/try-on/:id" element={<TryOn />} />
            <Route path="/try-on" element={<TryOn />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
