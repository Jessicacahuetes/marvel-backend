//import des packages
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

//import des routers
const charactersRouter = require("./routes/characters");
const comicsRouter = require("./routes/comics");

// console.log("Clé API Marvel :", process.env.API_KEY);

app.get("/", (req, res) => {
  try {
    return res.status(200).json("Welcome to the Marvel Multiverse");
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//utilisation des routers
app.use(charactersRouter);
app.use(comicsRouter);

//route poubelle
app.all("*", (req, res) => {
  return res.status(404).json("Not found");
});

app.listen(process.env.PORT || PORT, () => {
  console.log("Server started 🦸🏻‍♂️ "); // Quand je vais lancer ce serveur, la callback va être appelée
});
