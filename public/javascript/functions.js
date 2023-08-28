function randomUrlText() {
  const number = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const uppercaseA = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M"];
  const uppercaseN = ["N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
  const lowercaseA = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m"];
  const lowercaseN = ["n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  const wordPool = [...number, ...uppercaseA, ...uppercaseN, ...lowercaseA, ...lowercaseN];
  const randomNumber = [];
  for (let i = 0; i < 6; i++) {
    randomNumber[i] = wordPool[Math.floor(Math.random() * wordPool.length)];
  }
  return randomNumber.join("");
}

module.exports = randomUrlText;
