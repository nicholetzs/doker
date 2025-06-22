const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const PORT = 3000;
const MONGO_URL = process.env.MONGO_URL;
const DB_NAME = process.env.DB_NAME;

app.use(express.json());

let db;
let mensagensCollection;

// Conectar ao MongoDB
MongoClient.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then((client) => {
    db = client.db(DB_NAME);
    mensagensCollection = db.collection("mensagens");

    app.listen(PORT, () => {
      console.log(`Backend rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Erro ao conectar ao MongoDB:", err);
  });

// Rota GET: listar mensagens
app.get("/api/mensagens", async (req, res) => {
  try {
    const mensagens = await mensagensCollection.find().toArray();
    res.json(mensagens);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao buscar mensagens." });
  }
});

// Rota POST: criar nova mensagem
app.post("/api/mensagens", async (req, res) => {
  const nova = req.body;
  try {
    const resultado = await mensagensCollection.insertOne(nova);
    res.status(201).json(resultado.ops?.[0] || nova);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao salvar mensagem." });
  }
});
