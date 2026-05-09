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
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-72 bg-background border-l border-outline-variant z-[70] shadow-xl"
            >
              <div className="flex flex-col p-6 h-full">
                <div className="flex justify-between items-center mb-16">
                  <span className="font-serif text-2xl">Jean Dia</span>
                  <button onClick={() => setIsOpen(false)} className="p-2">
                    <X size={24} />
                  </button>
                </div>
                <nav className="flex flex-col gap-10">
                  {navLinks.map((link) => (
                    <button
                      key={link.id}
                      onClick={() => {
                        onPageChange(link.id);
                        setIsOpen(false);
                      }}
                      className={`text-left font-sans text-xl transition-colors ${
                        currentPage === link.id ? 'text-secondary font-bold' : 'text-on-background'
                      }`}
                    >
                      {link.label}
                    </button>
                  ))}
                </nav>
                <div className="mt-auto pt-8 border-t border-outline-variant flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setLanguage('fr')}
                      className={`text-[10px] font-bold tracking-[0.2em] transition-colors ${language === 'fr' ? 'text-secondary' : 'opacity-40'}`}
                    >
                      FR
                    </button>
                    <span className="opacity-20 text-[10px]">/</span>
                    <button 
                      onClick={() => setLanguage('en')}
                      className={`text-[10px] font-bold tracking-[0.2em] transition-colors ${language === 'en' ? 'text-secondary' : 'opacity-40'}`}
                    >
                      EN
                    </button>
                  </div>
                  <div className="flex gap-4 opacity-60">
                    <a href="#" className="hover:text-secondary transition-colors"><Instagram size={18} /></a>
                    <a href="#" className="hover:text-secondary transition-colors"><Facebook size={18} /></a>
                    <a href="#" className="hover:text-secondary transition-colors"><Twitter size={18} /></a>
                    <a href="#" className="hover:text-secondary transition-colors"><Linkedin size={18} /></a>
                    <a href="#" className="hover:text-secondary transition-colors"><Globe size={18} /></a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
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
