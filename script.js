const countries = [
  "Казахстан", "Россия", "Франция", "США", "Япония",
  "Германия", "Китай", "Индия", "Бразилия", "Великобритания",
  "Италия", "Канада", "Австралия", "Испания", "Турция",
  "Египет", "Аргентина", "Мексика", "Нигерия", "Нигер"
];

const countriesInfo = [
  { name: "Казахстан", flag: "https://flagcdn.com/w1280/kz.png", capital: "Нур-Султан", currency: "Тенге", language: "Казахский" },
  { name: "Россия", flag: "https://flagcdn.com/w1280/ru.png", capital: "Москва", currency: "Рубль", language: "Русский" },
  { name: "Франция", flag: "https://flagcdn.com/w1280/fr.png", capital: "Париж", currency: "Евро", language: "Французский" },
  { name: "США", flag: "https://flagcdn.com/w1280/us.png", capital: "Вашингтон", currency: "Доллар", language: "Английский" },
  { name: "Япония", flag: "https://flagcdn.com/w1280/jp.png", capital: "Токио", currency: "Йена", language: "Японский" },
  { name: "Германия", flag: "https://flagcdn.com/w1280/de.png", capital: "Берлин", currency: "Евро", language: "Немецкий" },
  { name: "Китай", flag: "https://flagcdn.com/w1280/cn.png", capital: "Пекин", currency: "Юань", language: "Китайский" },
  { name: "Индия", flag: "https://flagcdn.com/w1280/in.png", capital: "Нью-Дели", currency: "Рупия", language: "Хинди, Английский" },
  { name: "Бразилия", flag: "https://flagcdn.com/w1280/br.png", capital: "Бразилиа", currency: "Реал", language: "Португальский" },
  { name: "Великобритания", flag: "https://flagcdn.com/w1280/gb.png", capital: "Лондон", currency: "Фунт стерлингов", language: "Английский" },
  { name: "Италия", flag: "https://flagcdn.com/w1280/it.png", capital: "Рим", currency: "Евро", language: "Итальянский" },
  { name: "Канада", flag: "https://flagcdn.com/w1280/ca.png", capital: "Оттава", currency: "Канадский доллар", language: "Английский, Французский" },
  { name: "Австралия", flag: "https://flagcdn.com/w1280/au.png", capital: "Канберра", currency: "Австралийский доллар", language: "Английский" },
  { name: "Испания", flag: "https://flagcdn.com/w1280/es.png", capital: "Мадрид", currency: "Евро", language: "Испанский" },
  { name: "Турция", flag: "https://flagcdn.com/w1280/tr.png", capital: "Анкара", currency: "Турецкая лира", language: "Турецкий" },
  { name: "Египет", flag: "https://flagcdn.com/w1280/eg.png", capital: "Каир", currency: "Египетский фунт", language: "Арабский" },
  { name: "Аргентина", flag: "https://flagcdn.com/w1280/ar.png", capital: "Буэнос-Айрес", currency: "Песо", language: "Испанский" },
  { name: "Мексика", flag: "https://flagcdn.com/w1280/mx.png", capital: "Мехико", currency: "Песо", language: "Испанский" },
  { name: "Нигерия", flag: "https://flagcdn.com/w1280/ng.png", capital: "Абуджа", currency: "Найра", language: "Английский" },
  { name: "Нигер", flag: "https://flagcdn.com/w1280/ne.png", capital: "Ниамей", currency: "Франк КФА", language: "Французский" }
];

let currentIndex = 0;

function updateCard() {
  document.getElementById("card").classList.remove("flipped");
  const country = countriesInfo[currentIndex];
  const cardFront = document.querySelector(".card-front");
  const cardBack = document.querySelector(".card-back");
  cardFront.innerHTML = `<img class="flag" src="${country.flag}" alt="Флаг ${country.name}">`;
  cardBack.innerHTML = `
    <div class="info-row"><b>${country.name}</b></div>
    <div class="info-row">Столица: <span class="info-value">${country.capital}</span></div>
    <div class="info-row">Валюта: <span class="info-value">${country.currency}</span></div>
    <div class="info-row">Язык: <span class="info-value">${country.language}</span></div>
  `;
  updateProgress();
}

function animateCardSlide(direction, callback) {
  const card = document.getElementById('card');
  const slideClass = direction === 'left' ? 'slide-left' : 'slide-right';
  const appearClass = direction === 'left' ? 'appear-right' : 'appear-left';
  card.classList.add(slideClass);
  setTimeout(() => {
    callback();
    card.classList.remove(slideClass);
    card.classList.add(appearClass);
    setTimeout(() => {
      card.classList.remove(appearClass);
    }, 350);
  }, 350);
}

function prevCard() {
  animateCardSlide('right', () => {
    currentIndex = (currentIndex - 1 + countriesInfo.length) % countriesInfo.length;
    updateCard();
  });
}

function nextCard() {
  animateCardSlide('left', () => {
    currentIndex = (currentIndex + 1) % countriesInfo.length;
    updateCard();
  });
}

function randomCard() {
  const direction = Math.random() > 0.5 ? 'left' : 'right';
  animateCardSlide(direction, () => {
    let rand;
    do {
      rand = Math.floor(Math.random() * countriesInfo.length);
    } while (rand === currentIndex && countriesInfo.length > 1);
    currentIndex = rand;
    updateCard();
  });
}

document.addEventListener('DOMContentLoaded', function() {
  currentIndex = 0;
  updateCard();
  document.getElementById('card').addEventListener('click', function() {
    if (!this.classList.contains('slide-left') && !this.classList.contains('slide-right')) {
      this.classList.toggle('flipped');
    }
  });
});

function updateProgress() {
  document.getElementById("progress").textContent = `${currentIndex + 1} из ${countriesInfo.length}`;
}

function showSuggestions() {
  const input = document.getElementById('search').value.toLowerCase();
  const suggestionsDiv = document.getElementById('suggestions');
  suggestionsDiv.innerHTML = '';
  if (!input) {
    suggestionsDiv.style.display = 'none';
    return;
  }
  const matches = countries.filter(c => c.toLowerCase().includes(input));
  if (matches.length === 0) {
    suggestionsDiv.style.display = 'none';
    return;
  }
  suggestionsDiv.style.display = 'block';
  matches.forEach(country => {
    const div = document.createElement('div');
    div.className = 'suggestion-item';
    div.textContent = country;
    div.onclick = function() {
      document.getElementById('search').value = country;
      suggestionsDiv.style.display = 'none';
      const foundIndex = countries.findIndex(c => c === country);
      if (foundIndex !== -1) {
        currentIndex = foundIndex;
        updateCard();
      }
    };
    suggestionsDiv.appendChild(div);
  });
}

function searchOnEnter(event) {
  if (event.key === 'Enter') {
    const query = document.getElementById('search').value.toLowerCase();
    const foundIndex = countries.findIndex(c => c.toLowerCase() === query);
    if (foundIndex !== -1) {
      currentIndex = foundIndex;
      updateCard();
    }
    document.getElementById('suggestions').style.display = 'none';
  }
}