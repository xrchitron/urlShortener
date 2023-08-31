const express = require("express");
const { engine } = require("express-handlebars");
const functions = require("./public/javascript/functions");
// const fs = require("fs");
const app = express();
const port = 4000;
const db = [
  { shorten: "8L8kgr", url: "https://www.google.com/" },
  { shorten: "nfF7ck", url: "https://www.youtube.com/" },
  { shorten: "LKomQU", url: "https://github.com/" },
  { shorten: "9FJVs9", url: "https://dictionary.cambridge.org/zht/" },
];
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
// app.use(express.json());
app.get("/", (req, res) => {
  res.render("index");
});
app.post("/shorten", (req, res) => {
  const originalUrl = req.body.originalUrl;
  let generatedUrl = functions.randomUrlText();
  // if input empty, return invalid message
  if (!originalUrl) {
    const message = "Please input valid url";
    res.status(401).render("index", { message });
  }
  if (originalUrl) {
    const result = db.find((ele) => {
      return ele.url === originalUrl;
    });
    if (result) {
      generatedUrl = result.shorten;
      res.render("shorten", { generatedUrl, port });
      return;
    } else {
      const writeContent = { shorten: generatedUrl, url: originalUrl };
      db.push(writeContent);
      res.status(200).render("shorten", { generatedUrl, port });
      return;
    }
  }
  //   if (originalUrl) {
  //     fs.readFile("./public/json/data.json", "utf-8", (err, data) => {
  //       if (err) {
  //         return console.log("data error");
  //       } else {
  //         const content = JSON.parse(data);

  //         content.find((ele) => {
  //           if (ele.url === originalUrl) {
  //             generatedUrl = ele.shorten;
  //             return res.status(200).render("shorten", { generatedUrl, port });
  //           } else {
  //             const writeContent = { shorten: generatedUrl, url: originalUrl };
  //             content.push(writeContent);
  //             fs.writeFile("./public/json/data.json", JSON.stringify(content), (error) => {
  //               if (error) {
  //                 console.log("An error has occurred", error);
  //                 return;
  //               }
  //               console.log("data saved successfully");
  //               return res.status(200).render("shorten", { generatedUrl, port });
  //             });
  //           }
  //         });
  //       }
  //     });
  //   }
});

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`);
});
