const express = require("express");
const mysql = require("mysql2");
const config = require("./config");
const router = express.Router();

const connection = mysql.createConnection({
  host: config.DB_HOST,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_DATABASE,
});

connection.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
    return;
  }
  console.log("Conexão com o banco de dados estabelecida!");
});

// Formata a data dd-MM-yyyy
function formataData(dataString) {
  
  const date = new Date(dataString);
  const ano = date.getUTCFullYear();
  const mes = String(date.getUTCMonth() + 1).padStart(2, "0");
  const dia = String(date.getUTCDate()).padStart(2, "0");
  return `${dia}-${mes}-${ano}`;
}

// Rota para carregar todos os lembretes
router.get("/carregarlembretes", (req, res) => {
  const query = "SELECT * FROM lembretes;";

  connection.query(query, (err, result) => {
    if (err) {
      console.error("Erro ao obter os lembretes:", err);
      res.status(500).json({ error: "Erro ao obter os lembretes" });
      return;
    }

    for (const obj of result) {
      obj.data_lembrete = formataData(obj.data_lembrete);
    }

    res.status(200).json(result);
  });
});

// Rota para criar um novo lembrete
router.post("/criarlembrete", (req, res) => {
  const { nome, data } = req.body;

  const query = `INSERT INTO lembretes (nome, data_lembrete) VALUES (?, ?);`;
  connection.query(query, [nome, data], (err, result) => {
    if (err) {
      console.error("Erro ao criar o lembrete:", err);
      res.status(500).json({ error: "Erro ao criar o lembrete" });
      return;
    }

    data_lembrete = formataData(data);

    res.status(201).json({ id: result.insertId, nome, data_lembrete });
  });
});

// Rota para deletar um lembrete
router.delete("/deletarlembrete/:id", (req, res) => {
  const id = req.params.id;

  const query = `DELETE FROM lembretes WHERE id = ?;`;
  connection.query(query, [id], (err, result) => {
    if (err) {
      console.error("Erro ao deletar o lembrete:", err);
      res.status(500).json({ error: "Erro ao deletar o lembrete" });
      return;
    }
    res.status(200).json({ message: "Lembrete deletado com sucesso" });
  });
});

module.exports = router;
