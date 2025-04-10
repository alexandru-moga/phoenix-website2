// Initialize Particle System
const particleSystem = new ParticleSystem(document.getElementById('swirlCanvas'));

// Play Sound on Logo Click
document.getElementById('logoLink').addEventListener('click', () => {
});

// Language Configuration
const translations = {
    en: {
      welcome: "Welcome to Phoenix Club",
      projects: "Our Projects",
      contact: "Contact Us",
      // Add all other translatable strings
    },
    ro: {
      welcome: "Bun venit la Phoenix Club",
      projects: "Proiectele noastre",
      contact: "Contactați-ne",
      // Add all other translations
    }
  };
  
  // Language Toggle Logic
  const languageToggle = document.getElementById('languageToggle');
  const storedLang = localStorage.getItem('lang') || 'en';
  
  function updateLanguage(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-lang]').forEach(el => {
      const key = el.dataset.lang;
      el.textContent = translations[lang][key];
    });
  }
  
  languageToggle.checked = storedLang === 'ro';
  updateLanguage(storedLang);
  
  languageToggle.addEventListener('change', (e) => {
    const lang = e.target.checked ? 'ro' : 'en';
    localStorage.setItem('lang', lang);
    updateLanguage(lang);
  });
  