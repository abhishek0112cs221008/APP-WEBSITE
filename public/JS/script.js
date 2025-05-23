// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function () {
    const themeToggle = document.getElementById('themeToggle');
    const langSwitch = document.getElementById('lang-switch');
  
    // Initialize AOS animations
    AOS.init({
      duration: 800,
      once: true,
    });
  
    // Theme Toggle: Light/Dark mode
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
  
      // Toggle icon between moon and sun
      if (document.body.classList.contains('dark-mode')) {
        themeToggle.textContent = '☀️'; // Light mode icon
      } else {
        themeToggle.textContent = '🌙'; // Dark mode icon
      }
  
      // Save theme to localStorage
      localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    });
  
    // Restore saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-mode');
      themeToggle.textContent = '☀️';
    } else {
      themeToggle.textContent = '🌙';
    }
  
    // Translation dictionary
    const translations = {
      en: {
        heading: "Welcome to Abhishek's App Store",
        subheading: "Discover futuristic, animated, and beautiful apps",
        explore: "Explore",
        contact: "Contact",
        contact_us: "Contact Us",
        finance_desc: "Track your expenses and savings with ease.",
        download: "Download",
        send_msg: "Send Message",
        apps: "Apps",
        about: "About",
        about_us: "About Us",
        about_desc: "We create modern apps tailored for daily needs and productivity."
      },
      hi: {
        heading: "अभिषेक के ऐप स्टोर में आपका स्वागत है",
        subheading: "फ्यूचरिस्टिक, एनिमेटेड और सुंदर ऐप्स खोजें",
        explore: "खोजें",
        contact: "संपर्क",
        contact_us: "हमसे संपर्क करें",
        finance_desc: "अपने खर्चों और बचत को आसानी से ट्रैक करें।",
        download: "डाउनलोड करें",
        send_msg: "संदेश भेजें",
        apps: "ऐप्स",
        about: "बारे में",
        about_us: "हमारे बारे में",
        about_desc: "हम ऐसे आधुनिक ऐप्स बनाते हैं जो आपकी दैनिक ज़रूरतों और उत्पादकता के लिए अनुकूल हैं।"
      }
    };
  
    // Function to update text based on selected language
    function updateTranslations(lang) {
      document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
          element.textContent = translations[lang][key];
        }
      });
    }
  
    // Language switcher event
    langSwitch.addEventListener('change', () => {
      const selectedLang = langSwitch.value;
      localStorage.setItem('language', selectedLang);
      updateTranslations(selectedLang);
    });
  
    // Set saved language on load
    const savedLang = localStorage.getItem('language') || 'en';
    langSwitch.value = savedLang;
    updateTranslations(savedLang);
  });
  