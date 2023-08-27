const urlGeneration = document.querySelector("#url-generation");
const copyBtn = document.querySelector("#copy-btn");
let generatedUrl = "test";

urlGeneration.addEventListener("click", (event) => {
  if (!event.target.classList.contains("shorten-btn")) return;
  let rawHTML = "";
  rawHTML += `
  <h5 class="card-text text-center">Success! Please use this link:</h5>
    <p class="text-center"><a href="${generatedUrl}" class="link-underline-primary link-offset-2">${generatedUrl}</a></p>
    <p class="text-center"><button class="btn btn-outline-primary copy-btn">Copy</button></p>
  `;
  urlGeneration.innerHTML = rawHTML;
});

urlGeneration.addEventListener("click", (event) => {
  if (!event.target.classList.contains("copy-btn")) return;
  navigator.clipboard.writeText(generatedUrl);
});
