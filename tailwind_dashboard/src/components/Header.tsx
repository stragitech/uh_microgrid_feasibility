'use client';

import { useState } from 'react';
import Link from 'next/link';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-red-700 text-white py-2 fixed w-full top-0 z-10 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="font-bold text-lg">UH Microgrid Study</div>
        <nav className="hidden md:block">
          <ul className="flex space-x-4">
            <li><Link href="#home" className="hover:text-yellow-400">Home</Link></li>
            <li><Link href="#about" className="hover:text-yellow-400">About</Link></li>
            <li><Link href="#case-studies" className="hover:text-yellow-400">Case Studies</Link></li>
            <li><Link href="#global-map" className="hover:text-yellow-400">Global Map</Link></li>
            <li><Link href="#uh-map" className="hover:text-yellow-400">UH Map</Link></li>
            <li><Link href="#uh-focus" className="hover:text-yellow-400">UH Focus</Link></li>
            <li><Link href="#funding-policy" className="hover:text-yellow-400">Funding/Policy</Link></li>
            <li><Link href="#resources" className="hover:text-yellow-400">Resources</Link></li>
          </ul>
        </nav>
        <button className="md:hidden focus:outline-none" onClick={toggleMenu}>
          <span className="block w-6 h-0.5 bg-white mb-1"></span>
          <span className="block w-6 h-0.5 bg-white mb-1"></span>
          <span className="block w-6 h-0.5 bg-white"></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden fixed top-0 right-0 w-3/4 h-full bg-red-700 text-white shadow-lg transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out z-20`}>
        <ul className="flex flex-col items-center pt-10 space-y-4">
          <li><Link href="#home" className="hover:text-yellow-400" onClick={toggleMenu}>Home</Link></li>
          <li><Link href="#about" className="hover:text-yellow-400" onClick={toggleMenu}>About</Link></li>
          <li><Link href="#case-studies" className="hover:text-yellow-400" onClick={toggleMenu}>Case Studies</Link></li>
          <li><Link href="#global-map" className="hover:text-yellow-400" onClick={toggleMenu}>Global Map</Link></li>
          <li><Link href="#uh-map" className="hover:text-yellow-400" onClick={toggleMenu}>UH Map</Link></li>
          <li><Link href="#uh-focus" className="hover:text-yellow-400" onClick={toggleMenu}>UH Focus</Link></li>
          <li><Link href="#funding-policy" className="hover:text-yellow-400" onClick={toggleMenu}>Funding/Policy</Link></li>
          <li><Link href="#resources" className="hover:text-yellow-400" onClick={toggleMenu}>Resources</Link></li>
        </ul>
      </div>
      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black opacity-50 z-10" onClick={toggleMenu}></div>}
    </header>
  );
};

export default Header;