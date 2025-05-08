const express = require('express');
const router = express.Router();
const { translateWord } = require('../services/translateService');
// const newrelic = require('newrelic'); // Removido

router.get('/', async (req, res) => {
  try {
    const { word, lang } = req.query;
    if (!word || !lang) {
      return res.status(400).json({ error: 'Parâmetros word e lang são obrigatórios.' });
    }
    const result = await translateWord(word, lang);
    res.json(JSON.parse(result.answer));
  } catch (err) {
    console.error('Erro detalhado:', err); // Exibe o erro real no terminal
    res.status(500).json({ error: 'Erro ao consultar o serviço de tradução' });
  }
});

module.exports = router;
