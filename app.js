const express = require("express");
const { engine } = require("express-handlebars");
const mysql = require("mysql");
const randomUrlText = require("./public/javascript/functions.js");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "test_password",
  database: "url_shortener",
});
connection.connect();

const app = express();

const port = 3000;
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

// Create a route to shorten a URL
app.post("/shorten", async (req, res) => {
  // Get the original URL from the request body
  const originalUrl = req.body.originalUrl;

  // Generate a short ID for the URL
  const shortId = randomUrlText();

  // Save the URL and short ID to the database
  const sql = `INSERT INTO urls (originalUrl, shortId) VALUES ("${originalUrl}", "${shortId}")`;
  await connection.query(sql);

  // Redirect the user to the shortened URL
  res.redirect(`/${shortId}`);
});

// Create a route to redirect to the original URL
app.get("/:shortId", async (req, res) => {
  // Get the short ID from the request URL
  const shortId = req.params.shortId;

  // Get the original URL from the database
  const sql = `SELECT originalUrl FROM urls WHERE shortId = "${shortId}"`;
  const results = await connection.query(sql);

  // If the URL is not found, return a 404 error
  if (results.length === 0) {
    res.status(404).send("The URL was not found.");
    return;
  }

  // Redirect the user to the original URL
  res.redirect(results[0].originalUrl);
});

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`);
});
