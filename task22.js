module.exports = function task22(A) {
  const arr = [];
  let i = 0, N = A, s = 0;

  while (s <= N) {
    s = Math.pow(3, i);
    if (s >= N) {
      break;
    }
    if (s < N){
      i++;
    }
  }
  arr.push(Math.pow(3, i - 1))
  return arr;
}