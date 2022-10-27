module.exports = function task19(A) {
  const arr = [];
  let a, n = 1;
  do {
    a = Math.sin(Math.tan(n / 2));
    n = n + 1;
  } while (a > 0)
  arr.push(a);
  return arr;
}