const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
const db = require("./model/database");
const port = process.env.PORT; /*|| 3000*/
const Carros = require("./model/carros");

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "views/public")));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/index", (req, res) => {
  res.render("index");
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

app.get("/edicao/:id", async (req, res) => {
  const carros = await Carros.findByPk(req.params.id);
  res.render("edicao", );
});

app.get("/carros", async (req, res) => {
  const carros = await Carros.findAll();
  //res.json(carros);
  res.render("carros", { Carros: carros });
});

app.post("/carros", async (req, res) => {
  const {
    nome,
    marca,
    ano,
    cilindrada,
    potencia,
    peso,
    numerocilindros,
    imagem_url,
  } = req.body;
  const carros = Carros.create({
    Nome: nome,
    Marca: marca,
    Ano: ano,
    Cilindrada: cilindrada,
    Potencia: potencia,
    Peso: peso,
    Numero_Cilindros: numerocilindros,
    Imagem: imagem_url,
  });
  res, render("..views/carros", { Carros: carros });
});

db.conectado();
app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);
