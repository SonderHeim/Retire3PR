module.exports = function task13(A) {
  let N = A;
  const arr = [];
  while (N >= 3){
    N = N / 3;
    if (N % 3 == 0){
      arr.push("Число является степенью.");
      break;
    } else {
      arr.push("Число не является степенью.");
      break;
    }
  }
  return arr;
}