// ЗАДАНИЕ 1:
// Назначь для кнопки обработчик события click, который будет изменять текст этой кнопки при нажатии;

document.getElementById('change-button').addEventListener('click', function (event) {
    const changeTextButton = document.getElementById('change-button');
    changeTextButton.textContent = "Кнопка нажата";
});

// ЗАДАНИЕ 2:
// Назначь для любого элемента обработчик события mouseover, который будет изменять размер элемента при наведении;
const mouseoverChangeSize = document.getElementById('mouseover')

mouseoverChangeSize.addEventListener('mouseover', () => {
    mouseoverChangeSize.style.fontSize = '40px';
});

mouseoverChangeSize.addEventListener('mouseout', () => {
    mouseoverChangeSize.style.fontSize = '';
});

// ЗАДАНИЕ 3:
// Назначь для инпута обработчик события keyup, который будет выводить отпущенную клавишу в консоль;

document.getElementById('input-keyup').addEventListener('keyup', function (event) {
    console.log(`Отпущенная клавиша ${event.target.value}`);
});

// ЗАДАНИЕ 4:
// Создай форму и добавь обработчик события submit, который будет показывать сообщение об успешной отправке;

document.getElementById('form-submit').addEventListener('submit', () => {
    alert(`Форма успешно отправлена!`);
});

// ЗАДАНИЕ 5:
// Пусть на странице есть кнопка с надписью 'Изменить тему', которая позволяет переключать тему страницы. 
// Например, по умолчанию тема светлая: задний фон - белый, текст - черный. 
// Нажимаем на кнопку -> тема меняется на темную: цвет фона - черный, текст - белый. 
// Еще раз нажимаем на кнопку -> тема снова светлая и т. д.

const bodyColor = document.getElementById('body-color');
const changeColorTheme = document.getElementById('change-color-theme')
changeColorTheme.addEventListener('click', function (event) {
    bodyColor.style.backgroundColor = 'black';
    bodyColor.style.color = 'white';

    changeColorTheme.addEventListener('click', function (event) {
        bodyColor.style.backgroundColor = '';
        bodyColor.style.color = '';

    });
});