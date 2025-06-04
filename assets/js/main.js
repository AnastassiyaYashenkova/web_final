// меню-кнопка открытия бокового меню 
const menuBtn = document.querySelector('.menu-button');
const sideMenu = document.querySelector('.side-menu');
let isMenuOpen = false;

menuBtn.addEventListener('click', () => {
  if (!isMenuOpen) {
    sideMenu.style.transform = 'translateX(0)';
    isMenuOpen = true;
  } else {
    sideMenu.style.transform = 'translateX(-100%)';
    isMenuOpen = false;
  }
});

//список faq
document.addEventListener('DOMContentLoaded', () => {
    const accordion = document.querySelector(".accordion");
    const panel = document.querySelector(".panel");

    accordion.addEventListener("click", () => {
        accordion.classList.toggle("active");
        panel.style.display = (panel.style.display === "block") ? "none" : "block";
    });
});

//модальные окна для отзывов 
const reviewButtons = document.querySelectorAll('.review-btn');
const modal = document.getElementById('reviewModal');
const closeBtn = document.querySelector('.close-btn');

reviewButtons.forEach(button => {
    button.addEventListener('click', () => {
        modal.style.display = 'flex';
    });
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// поиск фильмов по названию 
const searchBar = document.querySelector('.search-bar');
searchBar.addEventListener('input', () => {
    const query = searchBar.value.toLowerCase();
    const movies = document.querySelectorAll('.movie-card');

    movies.forEach(movie => {
        const title = movie.querySelector('.movie-title').textContent.toLowerCase();
        movie.style.display = title.includes(query) ? 'block' : 'none';
    });
});
  
let isLoggedIn = false;


const movieTitles = ["The Witch", "Parasite", "Shrek", "Interstellar", "Inside Out", "Titanic", "Barbie", "Pride&Prejudice", "The Secret Life of Pets", "Avatar", "Soul", "Wonder Woman", "Up", "Train to Busan", "Forgotten", "Unlocked", "20th Century Girl", "Frozen", "Minions", "The Call"];
const movieRatings = [8.2, 8.6, 7.9, 8.7, 8.1, 7.8, 6.9, 8.3, 7.0, 5.9, 9.8, 8.7, 6.3, 7.4, 5.5, 8.6, 7.3, 9.1, 6.4, 10];

const movieData = [
  { title: "The Witch", rating: 8.2 },
  { title: "Parasite", rating: 8.6 },
  { title: "Shrek", rating: 7.9 },
  { title: "Interstellar", rating: 8.7 },
  { title: "Inside Out", rating: 8.1 },
  { title: "Titanic", rating: 7.8 },
  { title: "Barbie", rating: 6.9 },
  { title: "Pride&Prejudice", rating: 8.3 },
  { title: "The Secret Life of Pets", rating: 7.0 },
  { title: "Avatar", rating: 5.9 },
  { title: "Soul", rating: 9.8 },
  { title: "Wonder Woman", rating: 8.7 },
  { title: "Up", rating: 6.3 },
  { title: "Train to Busan", rating: 7.4 },
  { title: "Forgotten", rating: 5.5 },
  { title: "Unlocked", rating: 8.6 },
  { title: "20th Century Girl", rating: 7.3 },
  { title: "Frozen", rating: 9.1 },
  { title: "Minions", rating: 6.4 },
  { title: "The Call", rating: 10.0 }
];

document.addEventListener("DOMContentLoaded", () => {
  // отображение рейтингов (убрала рандомную генерацию, значения задаем заранее в массиве выше)
  // изменения: массив для выпадающих списков сравнения, фильм как объект для корректного отображения рейтинга
  const ratingElements = document.querySelectorAll(".rating");

  document.querySelectorAll(".movie-card").forEach(card => {
    const title = card.querySelector(".movie-title").textContent.trim();
    const ratingObj = movieData.find(movie => movie.title === title);
    if (ratingObj) {
      const ratingEl = card.querySelector(".rating");
      ratingEl.innerHTML = `<span class="star">★</span> ${ratingObj.rating}/10`;
    }
  });

  // сравнение рейтингов через выпадающие списки
  const dropdownA = document.getElementById("movieA");
  const dropdownB = document.getElementById("movieB");

  if (dropdownA && dropdownB) {
    // Заполнение списков
    movieTitles.forEach((title, i) => {
      dropdownA.add(new Option(title, i));
      dropdownB.add(new Option(title, i));
    });

    document.getElementById("compareBtn").addEventListener("click", () => {
      const indexA = parseInt(dropdownA.value);
      const indexB = parseInt(dropdownB.value);

      if (indexA === indexB) {
        document.getElementById("comparisonResult").textContent = "❗ Please select two different movies.";
        return;
      }

      const ratingA = movieRatings[indexA];
      const ratingB = movieRatings[indexB];
      let result = "";

      if (ratingA > ratingB) {
        result = `🎥 ${movieTitles[indexA]} has a higher rating (${ratingA}/10) than ${movieTitles[indexB]} (${ratingB}/10).`;
      } else if (ratingA < ratingB) {
        result = `🎥 ${movieTitles[indexB]} has a higher rating (${ratingB}/10) than ${movieTitles[indexA]} (${ratingA}/10).`;
      } else {
        result = `🎥 Both movies have the same rating (${ratingA}/10).`;
      }

      document.getElementById("comparisonResult").textContent = result;
    });
  }

const movieListEl = document.getElementById("movieList");
const titleInput = document.getElementById("newTitle");
const genreInput = document.getElementById("newGenre");
const ratingInput = document.getElementById("newRating");
const addBtn = document.getElementById("addMovieBtn");
const deleteBtn = document.getElementById("deleteBtn");

// редактирование
const editTitleInput = document.getElementById("editTitle");
const editGenreInput = document.getElementById("editGenre");
const editRatingInput = document.getElementById("editRating");
const editBtn = document.getElementById("editBtn");

// Загружаем список с объектами или по умолчанию
let myFavoriteMovies = JSON.parse(localStorage.getItem("favoriteMovies")) || [
  { title: "Inception", genre: "Sci-Fi", rating: 8.8 },
  { title: "The Matrix", genre: "Action", rating: 9.0 },
  { title: "Barbie", genre: "Comedy", rating: 6.5 }
];

function renderMovieList() {
  movieListEl.innerHTML = "";
  myFavoriteMovies.forEach((movie) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${movie.title}</strong> | Genre: ${movie.genre} | Rating: ${movie.rating}`;
    movieListEl.appendChild(li);
  });
}

if (movieListEl && titleInput && genreInput && ratingInput && addBtn) {
  renderMovieList();

  // добавляем новый фильм с характеристиками
  addBtn.addEventListener("click", () => {
    const title = titleInput.value.trim();
    const genre = genreInput.value.trim();
    const rating = parseFloat(ratingInput.value);
    if (title && genre && !isNaN(rating)) {
      myFavoriteMovies.push({ title, genre, rating });
      localStorage.setItem("favoriteMovies", JSON.stringify(myFavoriteMovies));
      renderMovieList();
      titleInput.value = "";
      genreInput.value = "";
      ratingInput.value = "";
    } else {
      alert("Please fill in all fields correctly.");
    }
  });
}

// удаление фильма по названию
deleteBtn.addEventListener("click", () => {
  const titleToDelete = titleInput.value.trim().toLowerCase();
  const index = myFavoriteMovies.findIndex(
    (movie) => movie.title.toLowerCase() === titleToDelete
  );
  if (index !== -1) {
    myFavoriteMovies.splice(index, 1);
    localStorage.setItem("favoriteMovies", JSON.stringify(myFavoriteMovies));
    renderMovieList();
    titleInput.value = "";
  } else {
    alert("There is no such film in the list");
  }
});

// изменение характеристик уже добавленного фильма
  editBtn.addEventListener("click", () => {
    const titleToEdit = titleInput.value.trim().toLowerCase();
    const newGenre = genreInput.value.trim();
    const newRating = parseFloat(ratingInput.value);
    if (titleToEdit && newGenre && !isNaN(newRating)) {
      const movie = myFavoriteMovies.find(m => m.title.toLowerCase() === titleToEdit);
      if (movie) {
        movie.genre = newGenre;
        movie.rating = newRating;
        localStorage.setItem("favoriteMovies", JSON.stringify(myFavoriteMovies));
        renderMovieList();
        titleInput.value = "";
        genreInput.value = "";
        ratingInput.value = "";
      } else {
        alert("There is no such film in the list");
      }
    } else {
      alert("Input new characteristics");
    }
  });
});
  
 //наведение курсора (изменение цвета заголовка)
 document.querySelectorAll(".movie-title").forEach((title) => {
   title.addEventListener("mouseover", () => {
    title.style.color = "#F5C962"; 
  });
 });

  document.addEventListener("DOMContentLoaded", () => {
    const movieGroups = [
      { title: "The Witch", range: [1, 5] },
      { title: "Parasite", range: [6, 10] },
      { title: "Shrek", range: [11, 15] },
      { title: "Interstellar", range: [16, 20] },
      { title: "Inside Out", range: [21, 25] },
      { title: "Titanic", range: [26, 30] },
      { title: "Barbie", range: [31, 35] },
      { title: "Pride & Prejudice", range: [36, 40] },
      { title: "The Secret Life of Pets", range: [41, 45] },
      { title: "Avatar", range: [46, 50] },
      { title: "Frozen", range: [51, 55] },
      { title: "Soul", range: [56, 60] },
      { title: "Wonder Woman", range: [61, 65] },
      { title: "Up", range: [66, 70] },
      { title: "Train to Busan", range: [71, 75] },
      { title: "Forgotten", range: [76, 80] },
      { title: "Unlocked", range: [81, 85] },
      { title: "20th Century Girl", range: [86, 90] },
      { title: "The Call", range: [91, 95] },
      { title: "Minions", range: [96, 100] },
    ];

// при загрузке изменяем текст в заголовке на 4 секунды
const welcomeText = document.querySelector(".section-title");
if (welcomeText) {
  setTimeout(() => {
    welcomeText.textContent = "Recently viewed movies";
  }, 4000)
}

function findMovieByNumber(number) {
  return movieGroups.find(movie => number >= movie.range[0] && number <= movie.range[1]);
}

// генерация рандомного фильма со звуком
const btn = document.getElementById("generateMovieBtn");
const spinSound = new Audio("assets/audio/random.mp3");
  
btn.addEventListener("click", () => {
  spinSound.play();
  const numberEl = document.getElementById("generatedNumber");
  const movieEl = document.getElementById("movieOfTheDay");
  
  numberEl.textContent = "🔄 Generating...";
  movieEl.textContent = "";
  
  let intervalId;
  let finalNumber;
  
  // старт генерации
  intervalId = setInterval(() => {
    const fake = Math.floor(Math.random() * 100) + 1;
    numberEl.textContent = `🎲 ${fake}`;
  }, 70);
  
  // конец генерации через 1.5s
  setTimeout(() => {
    clearInterval(intervalId);
    finalNumber = Math.floor(Math.random() * 100) + 1;
  
    // определяем четное/нечетное
    const parity = finalNumber % 2 === 0 ? "even" : "odd";
  
    // сравниваем с 50
    let sizeText = "";
    if (finalNumber < 50) {
      sizeText = "less than 50";
    } else if (finalNumber === 50) {
      sizeText = "equal to 50";
    } else {
      sizeText = "greater than 50";
    }
  
    numberEl.textContent = `🎯 Number: ${finalNumber} — It is ${parity} and ${sizeText}.`;
  
    const movie = findMovieByNumber(finalNumber);
    movieEl.textContent = `🎬 Your Lucky Movie is: "${movie.title}"`;
    }, 1500);
  });
});

// изменить картинку при нажатии кнопки
const movieImg = document.querySelector(".movie-img");
const changeBtn = document.createElement("button");
changeBtn.textContent = "Change Image";
changeBtn.className = "button";
document.body.appendChild(changeBtn);

changeBtn.addEventListener("click", () => {
  if (movieImg) {
    movieImg.src = "assets/img/movie182.jpg";
    movieImg.alt = "Updated Movie";
  }
});

// Higher-order function (функция в функции)
function handleInteraction(callback) {
  console.log("Running interaction...");
  callback();
}

const movieEvent = {
  title: "Weekly Movie Pick",
  date: "2025-05-18",
  updateTitle: function (newTitle) {
    this.title = newTitle;
    document.getElementById("movieOfTheDay").textContent = "🎬 " + this.title;
  }
};

const updateBtn = document.createElement("button");
updateBtn.textContent = "Secret movie";
updateBtn.className = "button";
document.body.appendChild(updateBtn);

updateBtn.addEventListener("click", () => {
  movieEvent.updateTitle("Top Secret Movie Drop: Mouse");
});


//api
const API_KEY = "744334d6"; 
const imdbIDs = ["tt0111161", "tt0068646", "tt0468569", "tt1375666", "tt0137523"]; 

async function loadTrendingMovies() {
  const container = document.getElementById("trendingMovies");
  container.innerHTML = "";

  try {
    for (const id of imdbIDs) {
      const response = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`);
      const movie = await response.json();

      if (movie.Response === "True" && movie.Poster && movie.Poster !== "N/A") {
        const card = document.createElement("div");
        card.className = "movie-card";

        const img = document.createElement("img");
        img.className = "movie-img";
        img.src = movie.Poster;
        img.alt = movie.Title;

        const title = document.createElement("h3");
        title.className = "movie-title";
        title.textContent = movie.Title;

        card.appendChild(img);
        card.appendChild(title);
        container.appendChild(card);
      } else {
        console.warn("Movie not found or has no poster:", movie.Title);
      }
    }
  } catch (error) {
    console.error("Error fetching movie data:", error);
    container.innerHTML = "<p style='color:red'>Could not load trending movies.</p>";
  }
}

document.addEventListener("DOMContentLoaded", loadTrendingMovies);
