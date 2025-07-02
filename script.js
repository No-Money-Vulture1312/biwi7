let largeText = false;
let darkMode = false;
let currentFontSize = 16;

const languages = [
  { code: 'de', name: 'Deutsch', flag: 'de' },
  { code: 'tr', name: 'Türkisch', flag: 'tr' },
  { code: 'en', name: 'Englisch', flag: 'gb' },
  { code: 'ar', name: 'Arabisch', flag: 'sa' },
  { code: 'fr', name: 'Französisch', flag: 'fr' },
  { code: 'it', name: 'Italienisch', flag: 'it' },
  { code: 'tlh', name: 'Klingonisch', flag: 'us' }, // Platzhalter-Flagge
];

let currentLang = 'de';

function createLanguageMenu() {
  const menu = document.getElementById('langMenu2');
  menu.innerHTML = '';

  languages.forEach(lang => {
    const option = document.createElement('div');
    option.className = 'language-option';
    if (lang.code === currentLang) option.classList.add('selected');

    option.innerHTML = `<img src="https://flagcdn.com/w40/${lang.flag}.png" alt="${lang.name}"> ${lang.name}`;
    option.addEventListener('click', () => {
      currentLang = lang.code;
      document.getElementById('current-flag').src = `https://flagcdn.com/w40/${lang.flag}.png`;
      translateTo(lang.code);
      createLanguageMenu(); // Update Selection
      setTimeout(() => {
        document.getElementById('langMenu2').style.display = 'none';
      }, 3000);
    });
    menu.appendChild(option);
  });
}



function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: 'de',
    autoDisplay: false
  }, 'google_translate_element');
}

function translateTo(langCode) {
  const select = document.querySelector('select.goog-te-combo');
  if (select) {
    select.value = langCode;
    select.dispatchEvent(new Event('change'));
  }
}

window.addEventListener('load', () => {
  createLanguageMenu();

  toggleFontSize(0);
});

function toggleDarkMode() {
  darkMode = !darkMode;
  document.body.classList.toggle('darkmode');
}

function toggleFontSize(step) {
  currentFontSize += step;
  document.documentElement.style.fontSize = currentFontSize + 'px';
}

function scrollSeite(name) {
  const ziel = document.getElementById(name);

  const rect = ziel.getBoundingClientRect();
  const offsetTop = window.pageYOffset + rect.top;
  const gap =  parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--top-bar-height').trim());

  window.scrollTo({
    top: offsetTop - gap,
    behavior: 'smooth'
  });
}

document.getElementById('langButton').addEventListener('click', () => {
  const menu = document.getElementById('langMenu2');
  menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
});

document.getElementById('darkBtn').addEventListener('click', function () {
  toggleDarkMode(); 
});

document.getElementById('fontBtnDown').addEventListener('click', function () {
  toggleFontSize(-1);
});

document.getElementById('fontBtnUp').addEventListener('click', function () {
  toggleFontSize(1);
});

document.getElementById("wahlen_banner").addEventListener('click', function() {
  scrollSeite('wahlen_inhalt')
});
document.getElementById("wahlen_top").addEventListener('click', function() {
  scrollSeite('wahlen_inhalt')
});

document.getElementById("definition_banner").addEventListener('click', function() {
  scrollSeite('definition_inhalt')
});
document.getElementById("definition_top").addEventListener('click', function() {
  scrollSeite('definition_inhalt')
});

document.getElementById("mitbestimmung_banner").addEventListener('click', function() {
  scrollSeite('mitbestimmung_inhalt')
});
document.getElementById("mitbestimmung_top").addEventListener('click', function() {
  scrollSeite('mitbestimmung_inhalt')
});

document.getElementById('scrollToTopBtn').addEventListener('click', function () {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});