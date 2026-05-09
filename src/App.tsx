/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { Navbar, Footer } from './components/Navigation';
import { HomeView, GalleryView, AboutView, ContactView } from './components/Views';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  // Smooth scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const renderView = () => {
    switch (currentPage) {
      case 'home':
        return <HomeView key="home" />;
      case 'gallery':
        return <GalleryView key="gallery" />;
      case 'about':
        return <AboutView key="about" />;
      case 'contact':
        return <ContactView key="contact" />;
      default:
        return <HomeView key="home" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar currentPage={currentPage} onPageChange={setCurrentPage} />
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {renderView()}
        </AnimatePresence>
      </main>

      <Footer />

      {/* Floating Scroll Indicator (Mobile only) */}
      <div className="fixed bottom-6 right-6 md:hidden z-40">
        <div className="w-12 h-12 bg-background/80 border border-outline-variant backdrop-blur-md flex items-center justify-center opacity-60">
          <div className="w-px h-6 bg-on-background animate-bounce"></div>
        </div>
      </div>
    </div>
  );
}
