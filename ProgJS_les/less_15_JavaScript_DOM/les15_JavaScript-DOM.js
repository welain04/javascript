//ЗАДАНИЕ 1:
//Найди элемент на странице по его ID и измени его текстовое содержимое на что-то новое;
const changeById = document.getElementById ('findID');
changeById.textContent = '**ИЗМЕНЕНИЕ**';

//ЗАДАНИЕ 2:
//Используй JavaScript, чтобы изменить фон и цвет текста элемента 
//с определенным классом
const changeColorAndBackground = document.querySelector('.change-color-background');
changeColorAndBackground.style.color = 'yellow';
changeColorAndBackground.style.background = 'red';

//ЗАДАНИЕ 3:
//Напиши код, который создает новый параграф с текстом и добавляет 
//его в конец документа;
const newTextParagraph = document.createElement('p');
newTextParagraph.textContent = 'Новый параграф с текстом';
document.body.append(newTextParagraph);

//ЗАДАНИЕ 4:
//Напиши функцию, которая удаляет элемент с указанным ID из документа;

function removeElement (idToRemoveElement) {
    const elementToRemove = document.getElementById(idToRemoveElement);
    elementToRemove.parentNode.removeChild(elementToRemove);
    return
};
removeElement('remove-object');

//ЗАДАНИЕ 5:
//Измени атрибут ссылки на новый URL и выведи его значение в консоль;

const updatedLink = document.querySelector('a');
updatedLink.setAttribute('href', 'https://doka.guide/js/dom/');
console.log(updatedLink.getAttribute('href'));

//ЗАДАНИЕ 6:
//Создай новый элемент, добавь к нему класс и добавь его в DOM;

const newElementWithClass = document.createElement('div');
newElementWithClass.innerHTML = '<h1>Новый элемент с классом</h1>'
newElementWithClass.classList.add('new-element');
changeColorAndBackground.before(newElementWithClass);

//ЗАДАНИЕ 7:
//Переключи класс у существующего элемента и проверьте 
//его наличие в консоли

newElementWithClass.classList.toggle('new-element');

if (newElementWithClass.classList.contains('new-element')) {
    console.log('У элемента есть класс new-element')
} else {
    console.log('У элемента НЕТ класса new-element') 
}