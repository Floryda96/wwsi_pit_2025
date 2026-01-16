var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("Pages/index", {
    layout: "./Layouts/layout",
    title: "Express",
    welcome: "Hello World!",
  });
});

router.get("/about", function (req, res, next) {
  res.render("Pages/about", {
    layout: "./Layouts/layout",
    title: "About",
    welcome: "Hello World!",
  });
});

module.exports = router;
