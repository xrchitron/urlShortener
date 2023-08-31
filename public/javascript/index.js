const urlGeneration = document.querySelector("#url-generation");

urlGeneration.addEventListener("click", (event) => {
  if (!event.target.classList.contains("copy-btn")) return;
  navigator.clipboard.writeText(`http://localhost:{{port}}/{{currentShortenUrl}}`);
});
