const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
const db = require("./database");
//const multer = require("multer");
//const storage = require("./controller/index");
const port = process.env.PORT || 3000;
const Carros = require("./model/carros");
//const upload = multer({ storage });
//const lista_carros = [];
let message = "";

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

  if (!nome) {
    message = "Nome do carro é obrigatório!";
    res.render("cadastro", { message });
  }

  if (!marca) {
    message = "Marca do carro é obrigatório!";
    res.render("cadastro", { message });
  }

  if (!imagem) {
    message = "Imagem do carro é obrigatório!";
    res.render("cadastro", { message });
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
    message = "Erro ao cadastrar o veículo!";
    res.render("cadastro", { message });
  }
});

/*app.get("/upload", function (req, res) {
  res.render("cadastro");
});

app.post("/upload", upload.array("imagem"), function (req, res) {
  req.files.map((img) => {
    lista_carros.push({ nome: img.filename, caminho: img.destination });
  });
  res.json(lista_carros); // essa é a lista de nomes que devem ser salvo no banco de dados
});*/

app.get("/edicao/:id", async (req, res) => {
  const carro = await Carros.findByPk(req.params.id);

  if (!carro) {
    message = "Carro não encontrado!";
    res.render("edicao", { message });
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
  message = "Carro editado com sucesso!";
  res.render("edicao", {
    carro: carroEditado,
    message,
  });
});

app.get("/deletar/:id", async (req, res) => {
  const carro = await Carros.findByPk(req.params.id);
  if (!carro) {
    message = "Carro não encontrado!";
    res.render("deletar", {
      carro,
    });
  }
  res.render("deletar", {
    carro,
    message,
  });
});

app.post("/deletar/:id", async (req, res) => {
  const carro = await Carros.findByPk(req.params.id);
  if (!carro) {
    message = "Carro não encontrado!";
    res.render("deletar", { message });
  }
  await carro.destroy();
  message = `Carro ${carro.nome} deletado com sucesso!`;
  res.render("edicao", { message });
});

db.conectado();
app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);
