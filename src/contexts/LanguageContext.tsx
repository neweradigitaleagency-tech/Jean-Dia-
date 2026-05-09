import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    'nav.gallery': 'Gallery',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'footer.copyright': '© Jean Dia 2024',
    'footer.instagram': 'Instagram',
    'footer.facebook': 'Facebook',
    'footer.twitter': 'Twitter',
    'footer.linkedin': 'LinkedIn',
    'footer.language': 'Language',
    'home.hero.title': 'Raw Materials / Void',
    'home.view_gallery': 'View the Collection',
    'home.recent_works': 'Selected Experiments',
    'gallery.title': 'The Collection',
    'gallery.description': 'Exploring the intersection of raw material and digital void. A curation of works from 2020 to present.',
    'gallery.all': 'All',
    'gallery.inquire': 'Inquire',
    'gallery.year': 'Year',
    'gallery.medium': 'Medium',
    'gallery.dimensions': 'Dimensions',
    'gallery.id': 'ID',
    'about.title': 'The Process',
    'about.bio': 'Jean Dia is an Ivorian visual artist whose work explores the tension between stillness and movement. His abstract compositions, often characterized by an economy of means, invite profound contemplation. Based in Abidjan, he develops a visual language where the texture of the canvas becomes a narrative element in its own right. For Dia, each work is a subtraction. By removing the superfluous, he seeks to achieve a raw emotional essence, rooted in the materiality of oil paint and natural pigments.',
    'about.exhibitions': 'Exhibitions / Expositions',
    'about.recognitions': 'Recognitions / Distinctions',
    'about.detail_note': 'Matière No. 04 — Detail (Oil on linen)',
    'contact.title': 'Inquiry / Contact',
    'contact.bio': 'For any inquiries regarding acquisitions, collaborations, or simply to discuss my work, please feel free to reach out via the form below.',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.placeholder.name': 'Your name...',
    'contact.placeholder.email': 'email@example.com',
    'contact.placeholder.message': 'Your message...',
    'contact.send': 'Send',
    'contact.sent': 'Sent',
    'contact.thanks': 'Thank you. Your message has been sent.',
    'contact.whatsapp': 'Chat on WhatsApp',
    'contact.response_time': 'Quick response assured.',
    'contact.studio_view': 'Studio View',
    'seo.home.title': 'Jean Dia | Ivorian Visual Artist',
    'seo.home.description': 'Explore the abstract works of Jean Dia, an Ivorian visual artist based in Abidjan. Exploring matter and the void.',
    'seo.gallery.title': 'The Collection | Jean Dia',
    'seo.gallery.description': 'A curation of abstract works from 2020 to present. Matter, void, and digital experiments.',
    'seo.about.title': 'The Process | Jean Dia',
    'seo.about.description': 'Learn about the artistic journey and philosophy of Jean Dia. Based in Abidjan, Côte d\'Ivoire.',
    'seo.contact.title': 'Contact | Jean Dia',
    'seo.contact.description': 'Get in touch with Jean Dia for inquiries, collaborations, or visits to the Abidjan studio.'
  },
  fr: {
    'nav.gallery': 'Galerie',
    'nav.about': 'À propos',
    'nav.contact': 'Contact',
    'footer.copyright': '© Jean Dia 2024',
    'footer.instagram': 'Instagram',
    'footer.facebook': 'Facebook',
    'footer.twitter': 'Twitter',
    'footer.linkedin': 'LinkedIn',
    'footer.language': 'Langue',
    'home.hero.title': 'Matière Brute / Vide',
    'home.view_gallery': 'Voir la Collection',
    'home.recent_works': 'Expériences Choisies',
    'gallery.title': 'La Collection',
    'gallery.description': 'Exploration de l\'intersection entre la matière brute et le vide numérique. Une sélection d\'œuvres de 2020 à aujourd\'hui.',
    'gallery.all': 'Toutes',
    'gallery.inquire': 'S\'informer',
    'gallery.year': 'Année',
    'gallery.medium': 'Médium',
    'gallery.dimensions': 'Dimensions',
    'gallery.id': 'ID',
    'about.title': 'Le Processus',
    'about.bio': 'Jean Dia est un artiste peintre ivoirien dont le travail explore la tension entre l\'immobilité et le mouvement. Ses compositions abstraites, souvent caractérisées par une économie de moyens, invitent à une contemplation profonde. Résidant à Abidjan, il développe un langage visuel où la texture de la toile devient un élément narratif à part entière. Pour Dia, chaque œuvre est une soustraction. En retirant le superflu, il cherche à atteindre une essence émotionnelle brute, ancrée dans la matérialité de la peinture à l\'huile et des pigments naturels.',

    'seo.home.title': 'Jean Dia | Peintre Ivoirien',

    'seo.home.description': 'Découvrez le travail abstrait de Jean Dia, artiste peintre ivoirien basé à Abidjan. Exploration de la matière et du vide.',
    'seo.gallery.title': 'La Collection | Jean Dia',
    'seo.gallery.description': 'Une sélection d\'œuvres abstraites de 2020 à aujourd\'hui. Matière, vide et expériences numériques.',
    'seo.about.title': 'Le Processus | Jean Dia',
    'seo.about.description': 'Découvrez le parcours artistique et la philosophie de Jean Dia. Basé à Abidjan, Côte d\'Ivoire.',
    'seo.contact.title': 'Contact | Jean Dia',
    'seo.contact.description': 'Contactez Jean Dia pour toute demande d\'acquisition, collaboration ou visite du studio à Abidjan.'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
