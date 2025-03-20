//ЗАДАНИЕ 1: 
//Напиши функцию, которая принимает строку и проверяет, является ли она 
//палиндромом. Если да - функция возвращает true, если нет - false;

//моя функция не чувствительна к регистру, пробелам, некоторым знакам пунктуации,
//т.е. можно проверять предложения - палиндромы

/*
function checkPalindrome(userString) { // функция забирает введенную строку
  data = (userString.toUpperCase()); //
  const dataArr = [...data]; // введенная строка переводится в массив
  function removeSpacesArr(arr) { // удаляем пробелы,",.!?*-" из массива, если они есть
    for (i = 0; i <= (arr.length - 1); i++) {
      if ((arr[i] == ' ') || arr[i] == ',' || arr[i] == '.' || arr[i] == '!'
        || arr[i] == '?' || arr[i] == '*' || arr[i] == '-') {
        arr.splice(i, 1);
        i--;
      }
    }
  }
  removeSpacesArr(dataArr)
  const reversedDataArr = [...dataArr].reverse(); // создаем новый массив с перевернутой строкой

  let sum = 0;
  for (i = 0; i <= (dataArr.length - 1); i++) { // сравниваем 2 массива поиндексно
    if (dataArr[i] == reversedDataArr[i]) {
      sum += 1;
    }
  }
  if (sum == (dataArr.length)) {
    return true
  } else {
    return false
  }
}

console.log(checkPalindrome('Лидер бодро, гордо бредил.!!!?'));
*/

//ЗАДАНИЕ 2: 
//Напиши функцию, которая принимает строку (предложение) и 
//находит первое самое короткое слово в ней и возвращает его;


function checkTheFirstShortWord(data) {// функция забирает введенную строку
    const dataArr = [...data]; // переводим строку в массив
    const arrWordFirst = [] // определяем массив с первым словом
    const arrWordSecond = []// определяем массив со вторым словом
  
    function createAnArrayWithOneWordFromTheGeneralArray(arrWord) { // создаем массив с одним словом 
      //из базового массива, поиндексно вносим буквы в массив и удаляемих их из базового, 
      //пока не споткнемся о пробел, тогда останавливаем запись слова и удаляем пробел
      for (let i = 0; i < dataArr.length; i++) {
        if (dataArr[i] != ' ') {
          arrWord.push(dataArr[i]);
          dataArr.splice([i], 1);
          i--
        } else {
          dataArr.splice([i], 1);
          break
        }
      }
    }
  
    createAnArrayWithOneWordFromTheGeneralArray(arrWordFirst)// создаем массив с первым словом
    createAnArrayWithOneWordFromTheGeneralArray(arrWordSecond)// создаем массив со вторым словом
  
    function writeAShortWordIntoTheFirstArray() {
      if (arrWordSecond.length === 0) {
        return
      } else if (0 < arrWordSecond.length < arrWordFirst.length) {
        arrWordFirst.splice(0, arrWordFirst.length);
        arrWordFirst.push(...arrWordSecond)
        arrWordSecond.splice(0, arrWordSecond.length);
      } else if (arrWordSecond.length >= arrWordFirst.length) { // сравниваем длину 1 и 2 массива, 
        //самое короткое из них записываем в 1 массив 
        //(если убрать знак равно, то будем выводить последнее короткое слово, а не первое)
        arrWordSecond.splice(0, arrWordSecond.length); //удвляем все из 2 массива
      }
    }
    writeAShortWordIntoTheFirstArray() //записываем короткое слово в arrWordFirst
    for (let n = dataArr.length; n > 0; n = dataArr.length) { //зацикливаем перезапись 2 массива + сравнения из базового 
      //пока не закончится базовый массив
      createAnArrayWithOneWordFromTheGeneralArray(arrWordSecond) //записывам новое слово в массив 2
      writeAShortWordIntoTheFirstArray() //сравниваем длину массивов - короткое сохраняем в 1 массив
    }
    return `Первое короткое слово: ${arrWordFirst.join('')}`;
  }
  console.log(checkTheFirstShortWord('первое самое короткое t слово в строке и'));
  
  
  //ЗАДАНИЕ 3: 
  //Напиши функцию, которая форматирует строку с цифрами в телефонный номер. 
  //Пример: createPhoneNumber(123456789) → 8 (123) 456-789;
  /*
  function createPhoneNumber(PhoneNumber) {
    const PhoneNumberArr = [...PhoneNumber];
    const [a, b, c, d, e, f, ...rest] = PhoneNumberArr
    return `8 (${[a, b, c].join('')}) ${[d, e, f].join('')}-${rest.join('')}`;
    }
  console.log(createPhoneNumber('123456789'));
  */
  
  //ЗАДАНИЕ 4: 
  //Напиши функцию, которая ищет минимальное и максимальное значение в массиве;
  /*
  const arrOfRandomNumbers = [1, 2, 3, 4, 14, -2, 5, 5, 4, 6];
  
  function findMaxAndMinValueArr(numbers) {
    const maxValue = Math.max(...numbers);
    const minValue = Math.min(...numbers);
    return `max: ${maxValue}, min: ${minValue}`;
  }
  
  console.log(findMaxAndMinValueArr(arrOfRandomNumbers));
  
  
  //ЗАДАНИЕ 5:
  // *Напиши функцию, которая на вход принимает массив, а на выходе возвращает новый,
  //отсортированный в порядке возрастания, массив.
  //Попробуй реализовать алгоритм сортировки самостоятельно.
  //Если не получается - почитай про bubble sort и попробуй реализовать её.
  
  //Вариант решения 5.1:
  
  /*
  const arrToSort1 = [1, 2, 3, 4, 14, -2, 5, 5, 4, 6];
  function sortArrayInAscendingOrder(arr) {
    const sortArr = arr.toSorted((a, b) => a - b)// метод как sort(), но не влияет на исходный массив
  
    return sortArr;
  }
  console.log(sortArrayInAscendingOrder(arrToSort1));
  */
  
  //Вариант решения 5.2 (посмобрела bubble sort): до этого пыталась сама подобное реализовать,
  //но не догадалась менять местами значения и застряла на этом
  
  /*
  const arrToSort = [1, 2, 3, 4, 14, -2, 5, 5, 4, 6];
  
  function bblSortArr(arr) {
    let sortArr = [...arr];
  
    for (let i = 0; i < sortArr.length; i++) {
      for (let j = 0; j < (sortArr.length - i - 1); j++) {
        if (sortArr[j] > sortArr[j + 1]) {
          let temp = sortArr[j]
          sortArr[j] = sortArr[j + 1]
          sortArr[j + 1] = temp
        }
      }
    }
  
    return sortArr;
  }
  
  console.log(bblSortArr(arrToSort));
  */
  
  //Наглядно, как работает bubble sort: цикл последовательно 
  //сдвигает большие числа вправо, а мелкие влево
  //  0  1  2  3   4   5  6  7  8  9
  // [1, 2, 3, 4, 14, -2, 5, 5, 4, 6]; 
  // [1, 2, 3, 4, -2, 14, 5, 5, 4, 6]; //после оконч циклв j=4 arr.length - i - 1 = 9
  // [1, 2, 3, 4, -2, 5, 14, 5, 4, 6]; //5
  // [1, 2, 3, 4, -2, 5, 5, 14, 4, 6]; //6
  // [1, 2, 3, 4, -2, 5, 5, 4, 14, 6]; //7
  // [1, 2, 3, 4, -2, 5, 5, 4, 6, 14]; //8
  // [1, 2, 3, -2, 4, 5, 5, 4, 6, 14]; //после оконч циклв j=3 arr.length - i - 1 = 8