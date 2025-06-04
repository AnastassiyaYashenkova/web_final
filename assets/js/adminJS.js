$(document).ready(function () {
  
  // Загружаем категории из localStorage или создаём пустой массив
  let categoryArray = JSON.parse(localStorage.getItem("adminCategories")) || [];

  // Отображаем сохранённые категории списком
  categoryArray.forEach(cat => {
    $('#categoryList').append(`<li>${cat}</li>`);
  });

  // Константы статистики
  const totalUsers = 100;
  const activeUsers = 55;
  const isGrowth = true;

  $('#statsText').text(`Total users: ${totalUsers}, Active: ${activeUsers}, Growth: ${isGrowth}`);

  // Добавление категории с сохранением в localStorage
  $('#addCategoryBtn').click(function () {
    const input = $('#categoryInput').val().trim();
    if (input) {
      categoryArray.push(input);
      localStorage.setItem("adminCategories", JSON.stringify(categoryArray)); // сохраняем
      $('#categoryList').append(`<li>${input}</li>`);
      $('#categoryInput').val('');

      console.log("Category added:", input);
    }
  });

  // Генерация ID (с циклом)
  $('#generateBtn').click(function () {
    $('#idList').empty();
    for (let i = 1; i <= 5; i++) {
      const generatedID = 100 + i;
      $('#idList').append(`<li>ID-${generatedID}</li>`);
    }

    const randomID = Math.floor(Math.random() * 100);
    console.log("Generated ID: " + randomID);
  });

  // Анимация jQuery отображения/скрытия блока
  $('#toggleBox').click(function () {
    $('#animatedBox').slideToggle();
  });
});
