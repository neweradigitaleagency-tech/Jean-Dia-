/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { ARTWORKS, EXHIBITIONS, RECOGNITIONS } from '../constants';
import { X, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export function HomeView() {
  const recentWorks = ARTWORKS.slice(0, 3);
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Helmet>
        <title>{t('seo.home.title')}</title>
        <meta name="description" content={t('seo.home.description')} />
        <meta property="og:title" content={t('seo.home.title')} />
        <meta property="og:description" content={t('seo.home.description')} />
      </Helmet>
      {/* Hero Section */}
      <section className="relative h-[90vh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUvlNgg1SI9ai-Ks6ILBT37TbO1aU8IgrFaoMKzFuG2id6xLvSGy4nJViGHQ2gzECOwWxb5yUCYbnw0DnTQ1DjBlUNgBlajpTPrfPg-mfq-_lEXJC1bzSXxUdnzcPSBcA0IpALR0bFvD2Xp360QkcodXDQYrjlF2U75Pvt2_B2tLw90XrSHhfTXah4L3Bd-En-3HduUrKtCuKF4NsuIe5FcksEm7NafjWPi5XK753htUax0kmb0KqMFX9YyWTbWUy9JZGICZUYnbI" 
            alt="Hero Artwork" 
          />
          <div className="absolute inset-0 hero-gradient"></div>
        </div>
        <div className="relative z-10 text-center px-6">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-serif text-6xl md:text-8xl text-on-background mb-4 tracking-tighter"
          >
            Jean Dia
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="font-sans text-xs tracking-[0.3em] font-semibold opacity-60 uppercase"
          >
            {t('home.hero.title')}
          </motion.p>
        </div>
      </section>

      {/* Statement */}
      <section className="py-section-gap px-6 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-10"
        >
          <div className="space-y-8">
            <p className="font-serif text-3xl md:text-4xl leading-tight italic">
              « L'abstraction est une conversation silencieuse entre l'espace et l'émotion, où chaque geste devient une trace du temps. »
            </p>
            <div className="w-12 h-px bg-secondary mx-auto"></div>
            <p className="font-sans text-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed opacity-60 italic">
              "Abstraction is a silent conversation between space and emotion, where every gesture becomes a trace of time."
            </p>
          </div>
        </motion.div>
      </section>

      {/* Featured Works */}
      <section className="px-6 md:px-margin-desktop max-w-container-max mx-auto mb-section-gap">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          {/* Large Work */}
          <div className="md:col-span-7 group cursor-pointer">
            <div className="overflow-hidden border border-outline-variant bg-surface-container mb-6">
              <img 
                src={recentWorks[0].image} 
                alt={recentWorks[0].title}
                className="w-full grayscale-[0.2] hover:grayscale-0 transition-all duration-1000 hover:scale-105" 
              />
            </div>
            <div className="flex justify-between items-baseline">
              <h3 className="font-serif text-3xl">{recentWorks[0].title}</h3>
              <span className="font-sans text-[10px] font-bold tracking-widest opacity-40">{recentWorks[0].year} / {recentWorks[0].dimensions}</span>
            </div>
          </div>

          {/* Side Column */}
          <div className="md:col-span-5 flex flex-col justify-end gap-gutter">
            {recentWorks.slice(1).map((work, idx) => (
              <div key={work.id} className={`group cursor-pointer ${idx === 1 ? 'pt-12 md:pl-12' : ''}`}>
                <div className="overflow-hidden border border-outline-variant bg-surface-container mb-4">
                  <img src={work.image} alt={work.title} className="w-full grayscale-[0.2] hover:grayscale-0 transition-all duration-1000 hover:scale-105" />
                </div>
                <h3 className="font-serif text-2xl">{work.title}</h3>
                <p className="font-sans text-[10px] font-bold tracking-widest opacity-40 uppercase">{work.year} / {work.dimensions}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}

export function GalleryView() {
  const [selectedSeries, setSelectedSeries] = useState<string | null>(null);
  const [selectedArtwork, setSelectedArtwork] = useState<typeof ARTWORKS[0] | null>(null);
  const { t } = useLanguage();

  const series = useMemo(() => Array.from(new Set(ARTWORKS.map(w => w.series))), []);

  const filteredArtworks = useMemo(() => {
    if (!selectedSeries) return ARTWORKS;
    return ARTWORKS.filter(w => w.series === selectedSeries);
  }, [selectedSeries]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="px-6 md:px-margin-desktop max-w-container-max mx-auto"
    >
      <Helmet>
        <title>{t('seo.gallery.title')}</title>
        <meta name="description" content={t('seo.gallery.description')} />
        <meta property="og:title" content={t('seo.gallery.title')} />
        <meta property="og:description" content={t('seo.gallery.description')} />
      </Helmet>
      <section className="mt-16 mb-section-gap">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-outline-variant pb-12 gap-8">
          <div className="max-w-2xl">
            <h2 className="font-serif text-5xl md:text-6xl mb-6 italic">{t('gallery.title')}</h2>
            <p className="font-sans text-lg opacity-60">{t('gallery.description')}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={() => setSelectedSeries(null)}
              className={`font-sans text-[10px] font-bold tracking-widest border px-6 py-3 transition-all uppercase ${!selectedSeries ? 'bg-secondary text-background border-secondary' : 'border-outline hover:border-secondary'}`}
            >
              {t('gallery.all')}
            </button>
            {series.map(s => (
              <button 
                key={s} 
                onClick={() => setSelectedSeries(s)}
                className={`font-sans text-[10px] font-bold tracking-widest border px-6 py-3 transition-all uppercase ${selectedSeries === s ? 'bg-secondary text-background border-secondary' : 'border-outline hover:border-secondary'}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter items-start"
        >
          <AnimatePresence mode="popLayout">
            {filteredArtworks.map((work, idx) => (
              <motion.div
                key={work.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                onClick={() => setSelectedArtwork(work)}
                className={`group relative overflow-hidden border border-outline-variant cursor-pointer ${idx % 3 === 1 ? 'lg:mt-24' : idx % 3 === 2 ? 'lg:mt-12' : ''}`}
              >
                <div className="aspect-[3/4] overflow-hidden bg-surface-container">
                  <img 
                    src={work.image} 
                    alt={work.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" 
                  />
                </div>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 backdrop-blur-[2px]">
                  <p className="font-sans text-[10px] font-bold tracking-widest text-white/60 mb-1 uppercase">Series: {work.series}</p>
                  <h3 className="font-serif text-3xl text-white">{work.title}</h3>
                  <p className="font-sans text-xs italic text-white/80 mt-2">{work.medium}, {work.year}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Artwork Detail Modal */}
      <AnimatePresence>
        {selectedArtwork && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12 overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArtwork(null)}
              className="fixed inset-0 bg-background/95 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              className="relative w-full max-w-6xl flex flex-col md:flex-row gap-12 items-center bg-background p-4 md:p-8 border border-outline-variant shadow-2xl"
            >
              <button 
                onClick={() => setSelectedArtwork(null)}
                className="absolute top-4 right-4 p-3 text-on-background hover:text-secondary transition-colors z-10"
              >
                <X size={32} />
              </button>
              
              <div className="w-full md:w-7/12 border border-outline-variant bg-surface-container">
                <img 
                  src={selectedArtwork.image} 
                  alt={selectedArtwork.title} 
                  className="w-full h-auto object-contain max-h-[70vh]" 
                />
              </div>

              <div className="w-full md:w-5/12 space-y-12 text-left">
                <div>
                  <span className="font-sans text-[10px] font-bold tracking-[0.3em] opacity-40 uppercase block mb-4">Series: {selectedArtwork.series}</span>
                  <h2 className="font-serif text-5xl md:text-7xl mb-4 italic tracking-tighter">{selectedArtwork.title}</h2>
                  <div className="w-16 h-px bg-secondary mt-8"></div>
                </div>

                <div className="grid grid-cols-2 gap-y-10 border-t border-outline-variant/30 pt-10">
                  <div>
                    <h4 className="font-sans text-[10px] font-bold tracking-widest opacity-30 uppercase mb-2">{t('gallery.year')}</h4>
                    <p className="font-sans font-medium">{selectedArtwork.year}</p>
                  </div>
                  <div>
                    <h4 className="font-sans text-[10px] font-bold tracking-widest opacity-30 uppercase mb-2">{t('gallery.medium')}</h4>
                    <p className="font-sans font-medium">{selectedArtwork.medium}</p>
                  </div>
                  <div>
                    <h4 className="font-sans text-[10px] font-bold tracking-widest opacity-30 uppercase mb-2">{t('gallery.dimensions')}</h4>
                    <p className="font-sans font-medium">{selectedArtwork.dimensions}</p>
                  </div>
                  <div>
                    <h4 className="font-sans text-[10px] font-bold tracking-widest opacity-30 uppercase mb-2">{t('gallery.id')}</h4>
                    <p className="font-sans font-medium">#{selectedArtwork.id.padStart(4, '0')}</p>
                  </div>
                </div>

                <div className="flex gap-6 pt-8">
                  <button className="flex-1 bg-on-background text-background px-8 py-5 font-sans text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-secondary transition-all flex items-center justify-center gap-3">
                    {t('gallery.inquire')} <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function AboutView() {
  const { t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="px-6 md:px-margin-desktop max-w-container-max mx-auto"
    >
      <Helmet>
        <title>{t('seo.about.title')}</title>
        <meta name="description" content={t('seo.about.description')} />
        <meta property="og:title" content={t('seo.about.title')} />
        <meta property="og:description" content={t('seo.about.description')} />
      </Helmet>
      <section className="pt-24 flex flex-col md:flex-row gap-gutter items-start">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-5/12 aspect-[4/5] overflow-hidden border border-outline-variant"
        >
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJVnM11JBlMcCB82Y3br6hShQq1E8Fuy88hITnmEPEljO-TXTXkTB6pVfs_fhsuMzETtPAgnai_NwvY86UVE-V4qsxagh_aXzWLaoshdqwU3MKj3OEQTjvhWEplP7E7o2NVuy3kCUqzk_xaGjzVA2OXV-CvIVdlvTeNmwcSeQQ5eSd570Ak76-SBWiAzTBt9SkVe1R4BlM1taZpotTK7Yy_H1cO7YOCckb36JXdQKP3fi3JS_s3NX3BQVtUebeGY9moX02MqDQN2Q" 
            alt="Jean Dia Portrait"
            className="w-full h-full object-cover grayscale"
          />
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full md:w-7/12"
        >
          <div className="flex gap-2 text-[10px] font-bold tracking-widest opacity-30 uppercase mb-8">
            <span>Index</span> / <span>{t('nav.about')}</span> / <span>Jean Dia</span>
          </div>
          <h1 className="font-serif text-6xl md:text-8xl mb-16 leading-none tracking-tighter italic">{t('about.title')}</h1>
          
          <div className="grid grid-cols-1 gap-12 border-t border-outline-variant pt-12">
            <p className="font-sans text-xl leading-relaxed opacity-80 max-w-2xl">
              {t('about.bio')}
            </p>
          </div>
        </motion.div>
      </section>

      {/* Exhibitions & Recognitions */}
      <section className="mt-section-gap grid grid-cols-1 md:grid-cols-12 gap-gutter border-t border-outline-variant pt-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="md:col-span-4"
        >
          <h2 className="font-serif text-4xl italic mb-12">{t('about.exhibitions')}</h2>
          <div className="space-y-12">
            {EXHIBITIONS.map((ex, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-default"
              >
                <span className="font-sans text-[10px] opacity-40 block mb-2 font-bold tracking-widest">{ex.year}</span>
                <h3 className="font-serif text-xl group-hover:text-secondary transition-colors">{ex.title}</h3>
                <p className="font-sans text-xs opacity-60 mt-1 uppercase tracking-wider">{ex.location}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="md:col-span-8 md:pl-24"
        >
          <h2 className="font-serif text-4xl italic mb-12">{t('about.recognitions')}</h2>
          <div className="divide-y divide-outline-variant/30">
            {RECOGNITIONS.map((rec, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + (i * 0.1) }}
                className="py-8 flex flex-col md:flex-row md:items-center justify-between gap-4 group"
              >
                <div>
                  <h3 className="font-serif text-2xl group-hover:text-secondary transition-colors italic">{rec.title}</h3>
                  <p className="font-sans text-xs opacity-60 mt-1 uppercase tracking-wider">{rec.location}</p>
                </div>
                <span className="font-sans text-[10px] opacity-40 font-bold tracking-widest">{rec.year}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <motion.section 
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="mt-section-gap"
      >
         <div className="w-full h-[600px] overflow-hidden border border-outline-variant bg-surface-container">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXFvbPbWhAZK-kQsZ3oYFp0H5kI5jza0x-2qC7UDKT4Fw6w_wmRcz7YKgb7c6hIlCcth1szLJ8Xrt6z-ueOA5Y0v1_xUxgMzrNmQolK3mPFhfdVfUbfS2mzxjqRP_4PqfxNi_ffST0Wa4sjxEr3bL6T-QMFjbBQFKcFuNcmkKLT-ycX6N1oO7UT7dUBcgUaWiXte17gUhdQqTvPhbh_l_o3jKI7aC0qo_Tf3ar1rRi8IGzRgLGOS0RxP0cG3Pz57N0uvDKG5YabTI" 
              className="w-full h-full object-cover scale-110 grayscale hover:grayscale-0 transition-all duration-1000"
              alt={t('about.detail_note')}
            />
         </div>
         <p className="text-[10px] font-bold tracking-widest opacity-40 mt-4 text-right uppercase italic">{t('about.detail_note')}</p>
      </motion.section>
    </motion.div>
  );
}

export function ContactView() {
  const [isSent, setIsSent] = useState(false);
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    setTimeout(() => setIsSent(false), 5000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="px-6 md:px-margin-desktop max-w-container-max mx-auto"
    >
      <Helmet>
        <title>{t('seo.contact.title')}</title>
        <meta name="description" content={t('seo.contact.description')} />
        <meta property="og:title" content={t('seo.contact.title')} />
        <meta property="og:description" content={t('seo.contact.description')} />
      </Helmet>
      <section className="mt-24 md:mt-40 max-w-4xl">
        <h1 className="font-serif text-7xl md:text-9xl mb-12 tracking-tighter">{t('nav.contact')}.</h1>
        <div className="grid md:grid-cols-1 gap-8">
          <p className="font-sans text-xl opacity-80 leading-relaxed max-w-2xl">
            {t('contact.title')} — {t('contact.bio') || 'Pour toute demande d\'acquisition, collaboration ou simplement pour échanger sur mon travail, n\'hésitez pas à me contacter via le formulaire ci-dessous.'}
          </p>
        </div>
      </section>

      <section className="mt-32 grid md:grid-cols-12 gap-gutter items-start">
        <div className="md:col-span-7">
          <form onSubmit={handleSubmit} className="space-y-16">
            <div className="flex flex-col group">
              <label className="font-sans text-[10px] font-bold tracking-[0.2em] opacity-30 group-focus-within:opacity-100 transition-opacity mb-2 uppercase">{t('contact.name')}</label>
              <input required className="bg-transparent border-b border-outline focus:border-secondary outline-none py-4 text-xl font-sans transition-colors" type="text" placeholder={t('contact.placeholder.name')} />
            </div>

            <div className="flex flex-col group">
              <label className="font-sans text-[10px] font-bold tracking-[0.2em] opacity-30 group-focus-within:opacity-100 transition-opacity mb-2 uppercase">{t('contact.email')}</label>
              <input required className="bg-transparent border-b border-outline focus:border-secondary outline-none py-4 text-xl font-sans transition-colors" type="email" placeholder={t('contact.placeholder.email')} />
            </div>

            <div className="flex flex-col group">
              <label className="font-sans text-[10px] font-bold tracking-[0.2em] opacity-30 group-focus-within:opacity-100 transition-opacity mb-2 uppercase">{t('contact.message')}</label>
              <textarea required className="bg-transparent border-b border-outline focus:border-secondary outline-none py-4 text-xl font-sans resize-none transition-colors" rows={4} placeholder={t('contact.placeholder.message')}></textarea>
            </div>
            
            <div className="flex items-center gap-10">
              <button 
                type="submit"
                disabled={isSent}
                className={`bg-on-background text-background px-12 py-5 font-sans text-[10px] font-bold tracking-[0.3em] uppercase transition-all flex items-center gap-4 ${isSent ? 'opacity-50 cursor-default' : 'hover:bg-secondary'}`}
              >
                {t(isSent ? 'contact.sent' : 'contact.send')}
                {!isSent && <ArrowRight size={14} />}
              </button>
              
              <AnimatePresence>
                {isSent && (
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="font-serif italic text-secondary text-sm"
                  >
                    {t('contact.thanks')}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </form>
        </div>

        <div className="md:col-span-4 md:col-start-9 space-y-16 mt-24 md:mt-0">
          <div className="bg-surface-container p-10 border border-outline-variant/30">
            <h3 className="font-sans text-[10px] font-bold tracking-widest opacity-40 mb-8 uppercase">{t('contact.whatsapp')}</h3>
            <a href="#" className="flex items-center justify-center gap-3 bg-[#25D366] text-white py-5 px-6 transition-all hover:brightness-110 shadow-lg shadow-emerald-500/20">
              <span className="font-sans text-[10px] font-bold tracking-widest uppercase">{t('contact.whatsapp')}</span>
            </a>
            <p className="mt-6 text-[10px] font-bold tracking-widest opacity-40 text-center uppercase">{t('contact.response_time')}</p>
          </div>
          <div className="aspect-[3/4] overflow-hidden border border-outline-variant drop-shadow-sm group">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxP6zA7tmjeIlzts623bOQ5RyGAfn1bZ5OT0ZCFXvqMA8Zsmp1U8l99RajebVe0-CBU-kv62mY2rpLWWbWNQ3uXxQKgO8E4_4ZMgzPtiH5K4K-Rr2cKpdDFHAGIc73c8RwCRcXiWE9JXHAaYUftiZn2nyGwNOGJVo2IsJ39kT3SaN1UN8-FFtIt4xJJIznoTOYiDoQ9zj26toiUaX-81Kwl0YeONga0evP7nVbQhVN-UtT_1qjC1lhR_qbcY6n0FiVYJN7w5A2rEI" 
              className="w-full h-full object-cover grayscale transition-transform duration-1000 group-hover:scale-110"
              alt={t('contact.studio_view')}
            />
            <div className="absolute inset-0 bg-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
