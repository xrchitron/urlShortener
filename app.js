const express = require("express");
const { engine } = require("express-handlebars");
const functions = require("./public/javascript/functions");
const fs = require("fs");
const app = express();
const port = 4000;
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.get("/", (req, res) => {
  res.render("index");
});
app.post("/shorten", (req, res) => {
  const originalUrl = req.body.originalUrl;
  let generatedUrl = functions.randomUrlText(6);
  // if input empty, return invalid message
  if (!originalUrl) {
    const message = "Please input valid url";
    res.status(401).render("index", { message });
  }
  // if input exist, do the following steps
  if (originalUrl) {
    //looking for any url has existed in the database
    fs.readFile("./public/json/data.json", "utf-8", (err, data) => {
      if (err) {
        return console.log("data error");
      } else {
        const content = JSON.parse(data);
        const result = content.find((ele) => {
          return ele.url === originalUrl;
        });
        if (result) {
          generatedUrl = result.shorten;
          res.render("shorten", { generatedUrl, port });
          return;
        } else {
          // if not existed, push content to database and render the view
          const writeContent = { shorten: generatedUrl, url: originalUrl };
          content.push(writeContent);
          fs.writeFile("./public/json/data.json", JSON.stringify(content), (error) => {
            if (error) {
              console.log("An error has occurred", error);
              return;
            }
            console.log("data saved successfully");
            res.status(200).render("shorten", { generatedUrl, port });
            return;
          });
        }
      }
    });
  }
});

app.get("/:shortenUrl", (req, res) => {
  fs.readFile("./public/json/data.json", "utf-8", (err, data) => {
    if (err) {
      return console.log("data error");
    } else {
      const content = JSON.parse(data);
      const result = content.find((ele) => {
        return ele.shorten === req.params.shortenUrl;
      });
      res.redirect(result.url);
    }
  });
});

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`);
});
