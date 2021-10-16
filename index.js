const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
const db = require("./database");
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

app.get("/edicao", (req, res) => {
  res.render("edicao");
});

app.get("/cadastro", (req, res) => {
  res.render("cadastro");
});

app.get("/listagem/:id", async (req, res) => {
  const carros = await Carros.findByPk(req.params.id);
});

app.get("/listagem", async (req, res) => {
  const carros = await Carros.findAll();
  res.render("listagem", { carros: carros});
});

app.post("/cadastro", async (req, res) => {
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
  res.render("listagem", { Carros: carros });
});

db.conectado();
app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);
