module.exports = function task10(A) {
  if (A === 0) {
    throw new Error('A не может быть равен 0');
  }
  const arr = [];
  let i = 1, N = A, s = 0;

  while (s <= N) {
    s = Math.pow(4, i);
    if (s >= N) {
      break;
    }
    if (s < N){
      i++;
    }
  }
  arr.push(Math.pow(4, i))
  return arr;
}