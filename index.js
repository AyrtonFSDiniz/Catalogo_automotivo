const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/index", (req, res) => {
  res.render("/");
});

app.get("/detalhes", (req, res) => {
  res.render("detalhes");
});

app.get("/listagem", (req, res) => {
  res.render("listagem");
});

app.get("/edicao", (req, res) => {
  res.render("edicao");
});

app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);
