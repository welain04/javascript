// *доп задания


const firstQuastion = document.getElementById('first-quastion');
const clickOnRunningButton = document.getElementById('running-the-test');
const counterOfCorrectAnswers = document.getElementById('counter-of-correct-answers')
const resultTest = document.getElementById('test-result') // вызываем элем. результата



clickOnRunningButton.addEventListener('click', function (event) {
    clickOnRunningButton.style.display = "none";
    resultTest.style.display = "none";
    firstQuastion.style.display = "flex";
});

const checkAnswerFirst = document.getElementById('check-answer-1') //вызываем элем. для проверки 1 вопроса
const secondQuastion = document.getElementById('second-quastion');

let trueAnswer = 0

function answersCounter() {
    function clickOnTestAnswer(numberQuastion, nowQuastion, nextQuastion) { //если кликнули по верной кнопке окрась зеленым, если нет- красным

        numberQuastion.addEventListener('click', function (event) {
            const targetElement = event.target // определяем куда кликнули
            if (targetElement.closest('BUTTON')) {
                if (targetElement.classList.contains('true-answer')) { // правильный ответ - зеленый
                    targetElement.style.backgroundColor = "#3ccc3c";
                    trueAnswer++
                } else {
                    targetElement.style.backgroundColor = "#f15b5b"; // неправильный ответ - красный
                }

                setTimeout(() => { // таймер, чтобы можно было увидеть цвет выбр. ответа и переключился новый
                    nowQuastion.style.display = "none";
                    nextQuastion.style.display = "flex";
                }, 500);

                setTimeout(() => { // таймер снятия цвета проверки
                    targetElement.style.backgroundColor = "";
                    targetElement.style.backgroundColor = "";
                }, 500);
            }
        })
    };

    clickOnTestAnswer(checkAnswerFirst, firstQuastion, secondQuastion); //запускаем проверку 1 вопроса


    const checkAnswerSecond = document.getElementById('check-answer-2') // вызываем элем. для проверки 2 вопроса
    const thirdQuastion = document.getElementById('third-quastion'); // для перехода к 3 вопросу

    clickOnTestAnswer(checkAnswerSecond, secondQuastion, thirdQuastion); //запускаем проверку 2 вопроса


    const checkAnswerThird = document.getElementById('check-answer-3') // вызываем элем. для проверки 3 вопроса
    const fourthQuastion = document.getElementById('fourth-quastion'); // для перехода к 4 вопросу

    clickOnTestAnswer(checkAnswerThird, thirdQuastion, fourthQuastion); //запускаем проверку 3 вопроса


    const checkAnswerFourth = document.getElementById('check-answer-4') // вызываем элем. для проверки 4 вопроса
    const fifthQuastion = document.getElementById('fifth-quastion'); // для перехода к 5 вопросу

    clickOnTestAnswer(checkAnswerFourth, fourthQuastion, fifthQuastion); //запускаем проверку 4 вопроса


    const parentInputAnswerFifth = document.getElementById('answer-form-5') // вызываем элем. для проверки 1го открытого вопроса
    const inputAnswerFifth = document.getElementById('input-answer-5')
    const sixthQuastion = document.getElementById('sixth-quastion');
    const answerFifth = 'зебра';

    function clickOnOpenAnswer(parentInputAnswer, inputAnswer, nowQuastion, nextQuastion, answer) {
        let valueEnd = ''
        parentInputAnswer.addEventListener('click', function (event) {

            inputAnswer.addEventListener('input', function (eventInput) { //записываем в переменную последнее введенное значение вполе ввода
                valueEnd = eventInput.target.value;
            });

            if (event.target.closest('BUTTON')) { //при нажатии на кнопку выполняется проверка введенного текста                

                if (valueEnd.toLowerCase() === answer) {
                    inputAnswer.style.backgroundColor = "#3ccc3c";
                    trueAnswer++
                } else {
                    inputAnswer.style.backgroundColor = "#f15b5b";
                }

                setTimeout(() => { // таймер, чтобы можно было увидеть цвет выбр. ответа и переключился новый
                    nowQuastion.style.display = "none";
                    nextQuastion.style.display = "flex";
                }, 500)

                setTimeout(() => { // таймер снятия цвета проверки
                    inputAnswer.style.backgroundColor = "";
                }, 500);
            }
            event.preventDefault(); // чтобы не перезагружалась страница
            parentInputAnswer.reset();
        });
    };

    clickOnOpenAnswer(parentInputAnswerFifth, inputAnswerFifth, fifthQuastion, sixthQuastion, answerFifth) //запускаем проверку 1(5) открытого вопроса 

    const parentInputAnswerSixth = document.getElementById('answer-form-6') // вызываем элем. для проверки 1го открытого вопроса
    const inputAnswerSixth = document.getElementById('input-answer-6')
    const seventhQuastion = document.getElementById('seventh-quastion');
    const answerSixth = 'испугался';

    clickOnOpenAnswer(parentInputAnswerSixth, inputAnswerSixth, sixthQuastion, seventhQuastion, answerSixth) //запускаем проверку 2(6) открытого вопроса 


    const parentInputAnswerSeventh = document.getElementById('answer-form-7') // вызываем элем. для проверки последнего открытого вопроса (7)
    const inputAnswerSeventh = document.getElementById('input-answer-7')
    const answerSeventh = 'душанбе';

    function clickOnLastAnswer(parentInputAnswer, inputAnswer, nowQuastion, answer) {
        let valueEnd = ''
        parentInputAnswer.addEventListener('click', function (event) {

            inputAnswer.addEventListener('input', function (eventInput) { //записываем в переменную последнее введенное значение вполе ввода
                valueEnd = eventInput.target.value;
            });
            
            if (event.target.closest('BUTTON')) { //при нажатии на кнопку выполняется проверка введенного текста
                

                if (valueEnd.toLowerCase() === answer) {
                    inputAnswer.style.backgroundColor = "#3ccc3c";
                    trueAnswer++ 
                } else {
                    inputAnswer.style.backgroundColor = "#f15b5b";
                }
                localStorage.clear();
                //console.log(trueAnswer)

                let bestResultInHistory = localStorage.getItem("result");
                
                if (trueAnswer > Number(bestResultInHistory)) {
                    localStorage.setItem('result', String(trueAnswer));
                }
                console.log(Number(bestResultInHistory))
                const bestResult = document.getElementById('better-result');
                if (bestResultInHistory === null) {
                    bestResult.style.display = "none";
                } else {
                    bestResult.innerHTML = `<br/>Ваш лучший результат: ${bestResultInHistory} из 7`;
                } 

                setTimeout(() => { // таймер, чтобы можно было увидеть цвет выбр. ответа и переключился новый
                    nowQuastion.style.display = "none";
                    clickOnRunningButton.style.display = "flex";
                    clickOnRunningButton.textContent = 'Начать тест заново';
                    resultTest.style.display = "flex";
                  
                    const counterOfCorrectAnswers = document.getElementById('counter-of-correct-answers')
                    counterOfCorrectAnswers.textContent = `ВАШ РЕЗУЛЬТАТ: ${trueAnswer} из 7`;
                    const counterPercent = document.getElementById('percentage-counter');
                    counterPercent.textContent = `Вы кринжулик на ${Math.round(trueAnswer * 100 / 7)}%`;  

                }, 500)

                setTimeout(() => { // таймер снятия цвета проверки
                    inputAnswer.style.backgroundColor = "";
                    trueAnswer = 0
                }, 500);

            }
            event.preventDefault(); // чтобы не перезагружалась страница
            parentInputAnswer.reset();
        });
    };

    clickOnLastAnswer(parentInputAnswerSeventh, inputAnswerSeventh, seventhQuastion, answerSeventh);
}


answersCounter()
