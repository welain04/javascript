const a = 1;
const b = 2;
const c = 3;

let d = b * b - a * c;

let x1 = (-b + Math.sqrt(d)) / a;
let x2 = (-b - Math.sqrt(d)) / a;

console.log({ x1, x2 });