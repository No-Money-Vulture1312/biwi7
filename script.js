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

// Füge dies am Ende der JS-Datei ein
document.addEventListener('DOMContentLoaded', function() {
  const prevBtn = document.getElementById('prevSectionBtn');
  const nextBtn = document.getElementById('nextSectionBtn');
  const materialContainers = Array.from(document.querySelectorAll('.matrial_container'));
  const sections = Array.from(document.querySelectorAll('.section'));
  const frontPage = document.getElementById('front-page');
  let currentContainerIndex = 0;
  let lastActiveSectionId = null;

  // Header-Links Mapping
  const headerLinks = {
    'wahlen_inhalt': document.querySelector('#wahlen_top h1'),
    'definition_inhalt': document.querySelector('#definition_top h1'),
    'mitbestimmung_inhalt': document.querySelector('#mitbestimmung_top h1')
  };

  // Aktualisiert den aktuellen Container-Index basierend auf Scroll-Position
  function updateCurrentContainerIndex() {
    const scrollPosition = window.scrollY + (window.innerHeight / 3);
    const topBarHeight = parseInt(getComputedStyle(document.documentElement)
      .getPropertyValue('--top-bar-height'));
    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;

    // Wenn wir ganz oben sind (front-page)
    if (scrollPosition < frontPage.offsetTop + frontPage.offsetHeight - topBarHeight) {
      currentContainerIndex = -1; // Spezialwert für front-page
      return;
    }

    // Wenn wir ganz unten sind, zum letzten Container springen
    if (window.scrollY + windowHeight >= documentHeight - 50) { // 50px Toleranz
      currentContainerIndex = materialContainers.length - 1;
      return;
    }

    // Finde den nächstgelegenen Container
    let closestContainer = null;
    let minDistance = Infinity;

    materialContainers.forEach((container, index) => {
      const containerTop = container.offsetTop - topBarHeight;
      const distance = Math.abs(scrollPosition - containerTop);
      
      if (distance < minDistance) {
        minDistance = distance;
        closestContainer = index;
      }
    });

    if (closestContainer !== null) {
      currentContainerIndex = closestContainer;
    }
  }

  // Für die Button-Navigation
  function navigateToContainer(index) {
    if (index === -1) {
      // Zur front-page navigieren
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }

    if (index >= 0 && index < materialContainers.length) {
      const container = materialContainers[index];
      const topBarHeight = parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue('--top-bar-height'));
      
      window.scrollTo({
        top: container.offsetTop - topBarHeight,
        behavior: 'smooth'
      });
    }
  }

  // Für die Header-Hervorhebung
  function updateActiveSection() {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const frontPageBottom = frontPage.offsetTop + frontPage.offsetHeight;
    const topBarHeight = parseInt(getComputedStyle(document.documentElement)
      .getPropertyValue('--top-bar-height'));

    // Wenn wir in der front-page sind, alle Hervorhebungen entfernen
    if (scrollPosition < frontPageBottom - topBarHeight) {
      if (lastActiveSectionId !== null) {
        Object.values(headerLinks).forEach(link => {
          if (link) link.classList.remove('active-section');
        });
        lastActiveSectionId = null;
      }
      return;
    }

    let newActiveSectionId = null;
    const sectionCheckPosition = scrollPosition + (windowHeight / 3);

    // Aktive Section finden
    sections.forEach(section => {
      const sectionTop = section.offsetTop - topBarHeight;
      const sectionBottom = sectionTop + section.offsetHeight;
      
      if (sectionCheckPosition >= sectionTop && sectionCheckPosition < sectionBottom) {
        newActiveSectionId = section.id;
      }
    });

    // Nur aktualisieren wenn sich die Section geändert hat
    if (newActiveSectionId !== lastActiveSectionId) {
      // Alle Hervorhebungen entfernen
      Object.values(headerLinks).forEach(link => {
        if (link) link.classList.remove('active-section');
      });

      // Neue Section hervorheben (falls nicht null)
      if (newActiveSectionId && headerLinks[newActiveSectionId]) {
        headerLinks[newActiveSectionId].classList.add('active-section');
      }
      
      lastActiveSectionId = newActiveSectionId;
    }
  }

  function updateNavigationButtons() {
    prevBtn.disabled = currentContainerIndex <= 0;
    nextBtn.disabled = currentContainerIndex >= materialContainers.length - 1;
  }

  function updateScrollProgress() {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const maxScroll = documentHeight - windowHeight;
    const scrollProgress = Math.min(100, (scrollPosition / maxScroll) * 100);
    document.documentElement.style.setProperty('--scroll-progress', `${scrollProgress}%`);
  }

  function handleScroll() {
    updateScrollProgress();
    updateCurrentContainerIndex();
    updateNavigationButtons();
    updateActiveSection();
  }

  // Event Listener
  prevBtn.addEventListener('click', () => {
    if (currentContainerIndex === -1) {
      navigateToContainer(materialContainers.length - 1);
    } else if (currentContainerIndex > 0) {
      navigateToContainer(currentContainerIndex - 1);
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentContainerIndex === -1) {
      navigateToContainer(0);
    } else if (currentContainerIndex < materialContainers.length - 1) {
      navigateToContainer(currentContainerIndex + 1);
    }
  });

  window.addEventListener('scroll', handleScroll);

  // Initialisierung
  handleScroll();
});