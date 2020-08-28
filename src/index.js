//import statements
const path = require("path");
const express = require("express");
const hbs = require("hbs");
const forecast = require("./forecast");

const app = express();
const port = process.env.PORT || 3000;

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
  if (!req.query.address) {
    return res.render("index", {
      title: "Weather App",
      message: "Enter address to get the Weather Forecast :)",
      name: "Roshan Jose",
    });
  }
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.render("weather", {
      title: "Weather Forecast",
      message: "Enter address to get the Weather Forecast :)",
      name: "Roshan Jose",
    });
  }

  forecast(req.query.address, (error, forecastData) => {
    if (error) {
      return console.log(error);
    } else {
      console.log(forecastData);
      res.render("weather", {
        title: "City-" + req.query.address,
        message: forecastData,
        name: "Roshan Jose",
      });
      res.send(forecastData);
    }
  });
});

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
app.listen(port, () => {
  console.log("Server is setup on port " + port);
});
