const countries = [
  "Казахстан", "Россия", "Франция", "США", "Япония",
  "Германия", "Китай", "Индия", "Бразилия", "Великобритания",
  "Италия", "Канада", "Австралия", "Испания", "Турция",
  "Египет", "Аргентина", "Мексика", "Нигерия", "Нигер"
];

const countriesInfo = [
  { name: "Казахстан", flag: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Flag_of_Kazakhstan.svg", capital: "Нур-Султан", currency: "Тенге", language: "Казахский" },
  { name: "Россия", flag: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Flag_of_Russia.svg", capital: "Москва", currency: "Рубль", language: "Русский" },
  { name: "Франция", flag: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Flag_of_France.svg", capital: "Париж", currency: "Евро", language: "Французский" },
  { name: "США", flag: "https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg", capital: "Вашингтон", currency: "Доллар", language: "Английский" },
  { name: "Япония", flag: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Flag_of_Japan.svg", capital: "Токио", currency: "Йена", language: "Японский" },
  { name: "Германия", flag: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Flag_of_Germany.svg", capital: "Берлин", currency: "Евро", language: "Немецкий" },
  { name: "Китай", flag: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_the_People%27s_Republic_of_China.svg", capital: "Пекин", currency: "Юань", language: "Китайский" },
  { name: "Индия", flag: "https://upload.wikimedia.org/wikipedia/commons/4/41/Flag_of_India.svg", capital: "Нью-Дели", currency: "Рупия", language: "Хинди, Английский" },
  { name: "Бразилия", flag: "https://upload.wikimedia.org/wikipedia/commons/0/05/Flag_of_Brazil.svg", capital: "Бразилиа", currency: "Реал", language: "Португальский" },
  { name: "Великобритания", flag: "https://flagcdn.com/gb.svg", capital: "Лондон", currency: "Фунт стерлингов", language: "Английский" },
  { name: "Италия", flag: "https://upload.wikimedia.org/wikipedia/commons/0/03/Flag_of_Italy.svg", capital: "Рим", currency: "Евро", language: "Итальянский" },
  { name: "Канада", flag: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Canada_%28Pantone%29.svg", capital: "Оттава", currency: "Канадский доллар", language: "Английский, Французский" },
  { name: "Австралия", flag: "https://upload.wikimedia.org/wikipedia/commons/8/88/Flag_of_Australia_%28converted%29.svg", capital: "Канберра", currency: "Австралийский доллар", language: "Английский" },
  { name: "Испания", flag: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Spain.svg", capital: "Мадрид", currency: "Евро", language: "Испанский" },
  { name: "Турция", flag: "https://upload.wikimedia.org/wikipedia/commons/b/b4/Flag_of_Turkey.svg", capital: "Анкара", currency: "Турецкая лира", language: "Турецкий" },
  { name: "Египет", flag: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Flag_of_Egypt.svg", capital: "Каир", currency: "Египетский фунт", language: "Арабский" },
  { name: "Аргентина", flag: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Flag_of_Argentina.svg", capital: "Буэнос-Айрес", currency: "Песо", language: "Испанский" },
  { name: "Мексика", flag: "https://upload.wikimedia.org/wikipedia/commons/f/fc/Flag_of_Mexico.svg", capital: "Мехико", currency: "Песо", language: "Испанский" },
  { name: "Нигерия", flag: "https://upload.wikimedia.org/wikipedia/commons/7/79/Flag_of_Nigeria.svg", capital: "Абуджа", currency: "Найра", language: "Английский" },
  { name: "Нигер", flag: "https://upload.wikimedia.org/wikipedia/commons/f/f4/Flag_of_Niger.svg", capital: "Ниамей", currency: "Франк КФА", language: "Французский" }
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