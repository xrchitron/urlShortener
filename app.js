const express = require("express");
const { engine } = require("express-handlebars");

const app = express();
const port = 4000;

const functions = require("./public/javascript/functions");
console.log(functions.randomUrlText());
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

// app.get("/:shorten", (req, res) => {
//     const
//     res.redirect()
// })

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`);
});
