function generateRandomNumber(range) {
  return Math.floor(Math.random() * range);
}
function randomUrlText(textLength) {
  const number = "0123456789";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase = uppercase.toLowerCase();
  let wordPool = number + uppercase + lowercase;
  wordPool = Array.from(wordPool);
  const randomNumber = [];
  for (let i = 0, range = wordPool.length; i < textLength; i++) {
    randomNumber[i] = wordPool[generateRandomNumber(range)];
  }
  return randomNumber.join("");
}
module.exports = { randomUrlText, generateRandomNumber };
