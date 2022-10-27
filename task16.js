module.exports = function task16() {
  const arr = [];
  const step = 1.2;

  for (let x = -12; x <= 1; x += step) {
    const z = Math.tan(x) + 5 * Math.cos(x - 2);

    if (z < 0) {
      arr.push(z);
    }
  }

  return arr;
}