const express = require("express");
const app = express();
const { user_game } = require("./models");
const { user_game_biodata } = require("./models");
const { user_game_history } = require("./models");
var methodOverride = require("method-override");
const userList = require("./user.json");
let isAuthenticated = false;

const port = 3000;

app.use(methodOverride("_method"));
app.use(express.json());

app.use(
  express.urlencoded({
    extended: false,
  })
);

app.set("view engine", "ejs");

app.get("/", authen, (req, res) => {
  res.render("articles/create", { authen: isAuthenticated });
});

app.get("/login", notAuthen, (req, res) => {
  res.render("articles/login");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const checkUsername = userList.filter((user) => {
    return username === user.username;
  });

  const checkPassword = checkUsername.filter((user) => {
    return password === user.password;
  });

  if (checkPassword.length > 0) {
    isAuthenticated = true;
    return res.redirect("/");
  }

  return res.redirect("/login");
});

app.get("/articles/create", (req, res) => {
  res.render("articles/create");
});

app.get("/articles/:id/update", (req, res) => {
  res.render("articles/" + req.params.id);
});

app.get("/articles", (req, res) => {
  user_game.findAll().then((a) => res.render("articles/index", { a }));
});

app.post("/articles", (req, res) => {
  user_game
    .create({
      nickname: req.body.nickname,
      server: req.body.server,
      approved: req.body.approved,
    })
    .then((a) => res.status(200).json("Article created!"))
    .catch((err) => res.status(400).json("Can't create article"));
});

app.get("/articles/:id", (req, res) => {
  user_game
    .findOne({
      where: { id: req.params.id },
    })
    .then((a) => res.render("articles/show", { a }));
});

// TRYING METHOD OVERRIDE FOR PUT METHOD
app.post("/articles/:id", (req, res) => {
  user_game
    .update(
      {
        nickname: req.body.nickname,
        server: req.body.server,
        // approved: req.body.approved,
      },
      {
        where: { id: req.params.id },
      }
    )
    .then((a) => res.status(200).json("Article updated!"))
    .catch((err) => res.status(400).json("Can't update article"));
});

// NORMAL DELETE
app.delete("/articles/:id", (req, res) => {
  user_game
    .destroy({
      where: { id: req.params.id },
    })
    .then((a) => res.status(201).json("Deleted!"))
    .catch((err) => res.status(400).json("Can't delete!"));
});

app.listen(port, () => console.log(`running in ${port}`));

function authen(req, res, next) {
  if (isAuthenticated) {
    return next();
  }

  return res.redirect("/login");
}
function notAuthen(req, res, next) {
  if (!isAuthenticated) {
    return next();
  }

  return res.redirect("/");
}
