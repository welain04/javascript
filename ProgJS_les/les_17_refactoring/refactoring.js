// 1 задание
// В следующем коде несколько раз повторяются похожие операции. Проведите рефакторинг, чтобы избежать дублирования,
// используя функции или другие средства:
const product1 = { name: 'Product 1', price: 10 };
const product2 = { name: 'Product 2', price: 20 };
const total1 = product1.price * 1.2;
const total2 = product2.price * 1.2;
console.log('Total for Product 1:', total1);
console.log('Total for Product 2:', total2);

// ---------------------- 1 решение: ---------------
const products = [
  { name: 'Product 1', price: 10 },
  { name: 'Product 2', price: 20 }
];
const total = products.map(product => product.price * 1.2)
console.log(`Total for ${products[0].name}: ${total[0]}`);
console.log(`Total for ${products[1].name}: ${total[1]}`);


// 2 задание
// Код ниже содержит сложные вложенные условия. Упростите его, чтобы улучшить читаемость и уменьшить вероятность ошибок:
if (user.isAdmin) {
  if (user.isActive) {
    if (user.age > 18) {
      console.log('Access granted');
    }
  }
}

// -------------------------- 2 решение: --------------------
if (user.isAdmin && user.isActive && user.age > 18) {
  console.log('Access granted');
}


// 3 задание
// В следующей функции выполняется слишком много операций. Разделите её на несколько более коротких функций,
// чтобы улучшить читаемость и повторное использование кода:
function checkStock(item) {
  return Math.random() < 0.5; // Возвращает рандомно true или false, это просто иммитация функции!
}
function processOrder(order) {
  // Валидация данных заказа
  if (!order.id || !order.items || order.items.length === 0) {
    console.log('Invalid order');
    return;
  }

  let total = 0;
  for (let item of order.items) {
    total += item.price * item.quantity;
  }
  // Проверка наличия на складе
  for (let item of order.items) {
    if (!checkStock(item)) {
      console.log('Item out of stock:', item.name);
      return;
    }
  }
  // Выполнение заказа
  console.log('Order processed with total:', total);
}

// ------------------------- 3 решение: --------------------------------
function checkStock(item) {
  return Math.random() < 0.5; // Возвращает рандомно true или false, это просто иммитация функции!
}

function orderValidation(order, item) { //Валидация заказа и проверка наличия
  if (!order.id || !order.items || order.items.length === 0) {
    console.log('Invalid order');
    return false;
  } else if (!checkStock(item)) { // Проверка наличия на складе
    console.log('Item out of stock:', item.name);
    return false;
  } else {
    return true;
  }
}

function processOrder(order) { 
  let total = 0;
  for (let item of order.items) {
    total += item.price * item.quantity;
  }
  return console.log('Order processed with total:', total);
}

if (orderValidation(order, item)) { // Рассчет суммы, если валидация пройдена
  processOrder(order)
}
