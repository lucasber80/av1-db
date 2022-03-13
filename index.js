const express = require("express");
const app = express();
const port = 8081;
const Banco = require("./banco.js");
const Funcoes = require("./funcoes");

app.get("/banco", (req, res) => {
  const banco = new Banco(10);
  res.send({ data: banco.table });
});

app.get("/banco/:id", (req, res) => {
  const banco = new Banco(10);
  const funcoes = new Funcoes();
  const item = funcoes.returnTableItem(req.params.id, banco);
  res.send({ data: item });
});

app.g;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
