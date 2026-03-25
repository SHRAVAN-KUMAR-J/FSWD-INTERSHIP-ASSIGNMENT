import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
    if (isDark) document.documentElement.classList.add('dark');
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          MyApp
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-lg">
          <NavLink to="/" className={({ isActive }) => `hover:text-blue-600 transition ${isActive ? 'text-blue-600 font-bold' : ''}`}>Home</NavLink>
          <NavLink to="/about" className={({ isActive }) => `hover:text-blue-600 transition ${isActive ? 'text-blue-600 font-bold' : ''}`}>About</NavLink>
          <NavLink to="/contact" className={({ isActive }) => `hover:text-blue-600 transition ${isActive ? 'text-blue-600 font-bold' : ''}`}>Contact</NavLink>
          <button
            onClick={toggleDarkMode}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-full hover:scale-110 transition"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-3xl"
        >
          {isOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 py-6 px-6 flex flex-col gap-6 text-lg">
          <NavLink to="/" onClick={() => setIsOpen(false)} className="hover:text-blue-600">Home</NavLink>
          <NavLink to="/about" onClick={() => setIsOpen(false)} className="hover:text-blue-600">About</NavLink>
          <NavLink to="/contact" onClick={() => setIsOpen(false)} className="hover:text-blue-600">Contact</NavLink>
          <button onClick={toggleDarkMode} className="text-left">{darkMode ? 'Light Mode ☀️' : 'Dark Mode 🌙'}</button>
        </div>
      )}
    </nav>
  );
}