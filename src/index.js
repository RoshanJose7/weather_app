//import statements
const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();

//defining path's
const publicFolder = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partials = path.join(__dirname, "../templates/partials");

//setting up handlebars config
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partials);

app.use(express.static(publicFolder));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Home Page",
    name: "Roshan Jose",
  });
});

app.get("/weather", (req, res) => {
  let add = req.query.address;
  if (!add) {
    return res.render("weather", {
      title: "Enter address query to find the weather.",
      message: "No Address Specified!!!",
      name: "Roshan Jose",
    });
  }
  res.render("weather", {
    title: "Weather App",
    message: "Address: " + add,
    name: "Roshan Jose",
  });
});

// app.get("/products", (req, res) => {
//   console.log(req.query);
//   res.send({
//     products: [],
//   });
// });

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    name: "Roshan Jose",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    error: "Some helpful message!!",
    name: "Roshan Jose",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404_page", {
    title: "Error Code:404",
    error: "Help article not found!!!",
    name: "Roshan Jose",
  });
});

app.get("*", (req, res) => {
  res.render("404_page", {
    title: "Error Code:404",
    message: "Page not found!!!",
    name: "Roshan Jose",
  });
});
app.listen(3000, () => {
  console.log("Server is setup on port 3000");
});
