//Задание 1:
//Найдите с помощью break points ошибку в коде этой функции и исправьте ее:


function hasEvenNumber(arr) {

  let foundEven = false;

  for (let i = 0; i < arr.length; i++) {

    if (arr[i] % 2 === 0) {

      foundEven = true;

    } else if (arr[i] % 2 !== 0) {

      foundEven = false;

    }

  }

  return foundEven;

}

console.log(hasEvenNumber([1, 3, 4, 5])); // Ожидается: true

//не поняла как использовать удобно break points, постоянно приходилось перезагружать страницу, 
//чтобы запустить код, все сбивалось, значения только в консоль получалось выводить, но это я и в https://jsitor.com/ 
// console.log() удобнее делала,
//если пыталась исправить код в источниках - непонятно как его запустить снова, то есть на месте работать не получалось,
//в итоге я просто глазами просмотрела код и поняла, что он не останавливантся вовремя и перезаписывает false, 
//если четное число не последнее
//По break points посмотрела все предложеные материалы, видео, но не понимаю как работать по-человечески с этим, может у меня 
// настройки в браузере какие-то ущербные?

function hasEvenNumber(arr) {
  let foundEven = false;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 === 0) {
      foundEven = true;
    }
  }
  return foundEven;
}

console.log(hasEvenNumber([1, 3, 4, 5])); // Ожидается: true

//Задание 2:
//Найдите с помощью debugger ошибку в коде этой функции и исправьте ее:

// тут я воспользовалась debugger и break points, код исправлять во вкладке источники не получилось, 
// но я смогла увидеть промежуточные значения справа от строк кода - это помогло, но я возвращалась в VSCode, 
// чтобы внисти исправления, сохраняла, а потом обновляла все это в браузере 2 кликами, чтобы включить отладчик, это реально так работает?
// и я все еще не понимаю чем отличается debugger от просто точек остановы, 
// если код все равно работает полностью до обозначеного точкой места или это просто прикол как флажок в коде?

function calculateAverage(numbers) {
  debugger
    let sum = 0;
    for (let i = 0; i <= numbers.length - 1; i++) {
      sum += numbers[i];
    }
    return sum / numbers.length;
  }

console.log(calculateAverage([2, 4, 6])); // Ожидается: 4


//Задание 3:
//Найдите с помощью console.log ошибку в коде этой функции и исправьте ее:

//Этот способ мы уважаем, этот способ нраица :)"

function findLargestNumber(arr) {
  let largest = -Infinity;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > largest) {
      largest = arr[i];
    }
  }
  return largest;
}

console.log(findLargestNumber([ -30, -10, -20 ])); // Ожидается: -10
