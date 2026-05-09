/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Instagram, Facebook, Twitter, Linkedin, Globe } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface NavbarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export function Navbar({ currentPage, onPageChange }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { label: t('nav.gallery'), id: 'gallery' },
    { label: t('nav.about'), id: 'about' },
    { label: t('nav.contact'), id: 'contact' },
  ];

  return (
    <header className="sticky top-0 w-full z-50 bg-background/80 border-b border-outline-variant backdrop-blur-xl">
      <nav className="flex justify-between items-center px-6 md:px-margin-desktop py-4 max-w-container-max mx-auto">
        <button 
          onClick={() => onPageChange('home')}
          className="font-serif text-3xl tracking-tight cursor-pointer hover:opacity-70 transition-opacity"
        >
          Jean Dia
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-10 items-center">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => onPageChange(link.id)}
              className={`font-sans text-sm transition-all duration-300 ${
                currentPage === link.id 
                  ? 'text-secondary border-b border-secondary pb-1' 
                  : 'text-on-background hover:text-secondary'
              }`}
            >
              {link.label}
            </button>
          ))}
          
          <div className="flex items-center gap-2 ml-4">
            <button 
              onClick={() => setLanguage('fr')}
              className={`font-sans text-[10px] uppercase tracking-widest font-semibold transition-colors ${language === 'fr' ? 'text-secondary' : 'opacity-40 hover:opacity-100'}`}
            >
              FR
            </button>
            <span className="opacity-20 text-[10px]">/</span>
            <button 
              onClick={() => setLanguage('en')}
              className={`font-sans text-[10px] uppercase tracking-widest font-semibold transition-colors ${language === 'en' ? 'text-secondary' : 'opacity-40 hover:opacity-100'}`}
            >
              EN
            </button>
          </div>
        </div>

        {/* Mobile Menu Icon */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsOpen(true)}
        >
          <Menu size={24} />
        </button>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
        )}
        {isOpen && (
          <motion.div
            key="menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="fixed inset-0 bg-background z-[70]"
          >
              <div className="flex flex-col items-center justify-center h-full px-8">
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-6 right-6 p-3 text-on-background hover:text-secondary transition-colors"
                  aria-label="Fermer le menu"
                >
                  <X size={28} />
                </button>
                <nav className="flex flex-col items-center gap-12">
                  {navLinks.map((link) => (
                    <button
                      key={link.id}
                      onClick={() => {
                        onPageChange(link.id);
                        setIsOpen(false);
                      }}
                      className={`font-sans text-3xl tracking-wide transition-colors ${
                        currentPage === link.id ? 'text-secondary font-bold' : 'text-on-background hover:text-secondary'
                      }`}
                    >
                      {link.label}
                    </button>
                  ))}
                </nav>
                <div className="absolute bottom-16 flex flex-col items-center gap-6">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setLanguage('fr')}
                      className={`text-sm font-bold tracking-[0.2em] transition-colors ${
                        language === 'fr' ? 'text-secondary' : 'text-on-background opacity-40 hover:opacity-100'
                      }`}
                    >
                      FR
                    </button>
                    <span className="text-on-background opacity-20">/</span>
                    <button
                      onClick={() => setLanguage('en')}
                      className={`text-sm font-bold tracking-[0.2em] transition-colors ${
                        language === 'en' ? 'text-secondary' : 'text-on-background opacity-40 hover:opacity-100'
                      }`}
                    >
                      EN
                    </button>
                  </div>
                  <div className="flex gap-6 text-on-background opacity-60">
                    <a href="#" className="hover:text-secondary transition-colors"><Instagram size={20} /></a>
                    <a href="#" className="hover:text-secondary transition-colors"><Facebook size={20} /></a>
                    <a href="#" className="hover:text-secondary transition-colors"><Twitter size={20} /></a>
                    <a href="#" className="hover:text-secondary transition-colors"><Linkedin size={20} /></a>
                    <a href="#" className="hover:text-secondary transition-colors"><Globe size={20} /></a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
      </AnimatePresence>
    </header>
  );
}

export function Footer() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <footer className="w-full border-t border-outline-variant mt-section-gap bg-background py-16">
      <div className="flex flex-col md:flex-row justify-between items-center px-6 md:px-margin-desktop max-w-container-max mx-auto gap-12">
        <div className="text-center md:text-left">
          <span className="font-serif text-3xl block mb-2 tracking-tight">Jean Dia</span>
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] opacity-40 font-semibold">{t('footer.copyright')}</p>
        </div>
        <div className="flex items-center gap-10">
          <div className="flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-4">
            <a href="#" className="font-sans text-[10px] uppercase tracking-[0.1em] opacity-60 hover:text-secondary hover:opacity-100 transition-all font-semibold">{t('footer.instagram')}</a>
            <a href="#" className="font-sans text-[10px] uppercase tracking-[0.1em] opacity-60 hover:text-secondary hover:opacity-100 transition-all font-semibold">{t('footer.facebook')}</a>
            <a href="#" className="font-sans text-[10px] uppercase tracking-[0.1em] opacity-60 hover:text-secondary hover:opacity-100 transition-all font-semibold">{t('footer.twitter')}</a>
            <a href="#" className="font-sans text-[10px] uppercase tracking-[0.1em] opacity-60 hover:text-secondary hover:opacity-100 transition-all font-semibold">{t('footer.linkedin')}</a>
          </div>
          <span className="opacity-20">/</span>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setLanguage('fr')}
              className={`font-sans text-[10px] uppercase tracking-[0.1em] transition-all font-semibold ${language === 'fr' ? 'text-secondary' : 'opacity-60 hover:opacity-100'}`}
            >
              FR
            </button>
            <span className="opacity-20 text-[10px]">/</span>
            <button 
              onClick={() => setLanguage('en')}
              className={`font-sans text-[10px] uppercase tracking-[0.1em] transition-all font-semibold ${language === 'en' ? 'text-secondary' : 'opacity-60 hover:opacity-100'}`}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
