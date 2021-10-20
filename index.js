const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
const db = require("./database");
const multer = require("multer");
const storage = require("./controller/index");
const port = process.env.PORT; /*|| 3000*/
const Carros = require("./model/carros");
const upload = multer({ storage });
const lista_carros = [];
let message = "";

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "views/public")));
app.use(express.urlencoded({ extended: true }));

let messageCadastro = "";

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

app.get("/listagem", async (req, res) => {
  const carros = await Carros.findAll();
  res.render("listagem", { carros: carros });
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
    imagem,
    aceleracao,
    torque,
  } = req.body;
  message = "Cadastro realizado com sucesso!";
  if (!nome) {
    res.render("cadastro", { mensagem: "Nome do carro é obrigatório!" });
  }

  if (!marca) {
    res.render("cadastro", { mensagem: "Marca do carro é obrigatório!" });
  }

  if (!imagem) {
    res.render("cadastro", { mensagem: "Imagem do carro é obrigatório!" });
  }

  try {
    const carros = await Carros.create({
      Nome: nome,
      Marca: marca,
      Ano: ano,
      Cilindrada: cilindrada,
      Potencia: potencia,
      Peso: peso,
      Numero_Cilindros: numerocilindros,
      Imagem: imagem,
      Aceleracao: aceleracao,
      Torque: torque,
    });
    res.render("listagem", message, { Carros: carros });
  } catch (err) {
    console.log(err);
    res.render("cadastro", { mensagem: "Erro ao cadastrar o veículo!" });
  }
});

app.get("/upload", function (req, res) {
  res.render("cadastro");
});

app.post("/upload", upload.array("imagem"), function (req, res) {
  req.files.map((img) => {
    lista_carros.push({ nome: img.filename, caminho: img.destination });
  });
  res.json(lista_carros); // essa é a lista de nomes que devem ser salvo no banco de dados
});

app.get("/edicao/:id", async (req, res) => {
  const carro = await Carros.findByPk(req.params.id);

  if (!carro) {
    res.render("edicao", {
      mensagem: "Carro não encontrado!",
    });
  }
  res.render("edicao", { carro: carro });
});

app.post("/edicao/:id", async (req, res) => {
  const carro = await Carros.findByPk(req.params.id);
  const { id, nome, marca } = req.body;
  carro.id = id;
  carro.nome = nome;
  carro.marca = marca;
  const carroEditado = await carro.save();
  res.render("edicao", {
    carro: carroEditado,
    mensagemSucesso: "Carro editado com sucesso!",
  });
});

app.get("/deletar/:id", async (req, res) => {
  const carro = await Carros.findByPk(req.params.id);
  if (!carro) {
    res.render("deletar", { mensagem: "Carro não encontrado!" });
  }
  res.render("deletar", { carro });
});

app.post("/deletar/:id", async (req, res) => {
  const carro = await Carros.findByPk(req.params.id);
  if (!carro) {
    res.render("deletar", { mensagem: "Carro não encontrado!" });
  }
  await carro.destroy();
  res.render("edicao", {
    mensagem: `Carro ${carro.nome} deletado com sucesso!`,
  });
});

db.conectado();
app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);
