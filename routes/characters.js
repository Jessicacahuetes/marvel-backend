// import des packages
const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/characters", async (req, res) => {
  try {
    let limit = 100; // Valeur par défaut (nombre de personnages à afficher par page)

    let filters = ""; // Variable pour stocker les filtres à ajouter à la requête vers l'API

    // Si la query name est fournie, on ajoute un filtre pour rechercher des personnages par nom
    if (req.query.name) {
      filters += `&name=${req.query.name}`;
    }

    // idem pour limit, on ajuste la limite de résultats
    if (req.query.limit) {
      limit = req.query.limit;
    }

    // de même pour page est fournie, on ajoute un filtre skip pour gérer la pagination
    if (req.query.page) {
      filters += `&skip=${(req.query.page - 1) * limit}`;
    }

    // Envoi de la requête à l'API Marvel avec les filtres et la clé API
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.API_KEY}${filters}&limit=${limit}`
    );

    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
