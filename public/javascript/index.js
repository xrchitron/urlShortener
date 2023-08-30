const functions = require("./public/javascript/functions");
const urlGeneration = document.querySelector("#url-generation");
const port = 4000;
let inputValue = document.querySelector("#originalUrl").value;
const db = [];
let currentShortenUrl = "";

urlGeneration.addEventListener("click", (event) => {
  if (!event.target.classList.contains("shorten-btn")) return;
  //generate garbled code
  let generatedUrl = functions.randomUrlText();
  //search database. if garbled code existed, return original one
  db.forEach((ele) => {
    if (ele.url === inputValue) {
      generatedUrl = ele.shorten;
    }
  });
  //store garbled code to global environment in order to be copied
  currentShortenUrl = generatedUrl;
  //generate showed html
  let rawHTML = "";
  rawHTML += `
  <h5 class="card-text text-center">Success! Please use this link:</h5>
    <p class="text-center"><a href="./${generatedUrl}" class="link-underline-primary link-offset-2"> http://localhost:${port}/${generatedUrl}</a></p>
    <p class="text-center"><button class="btn btn-outline-primary copy-btn">Copy</button></p>
  `;
  urlGeneration.innerHTML = rawHTML;
});

urlGeneration.addEventListener("click", (event) => {
  if (!event.target.classList.contains("copy-btn")) return;
  navigator.clipboard.writeText(`http://localhost:${port}/${currentShortenUrl}`);
});
