const express = require('express');
const router = express.Router();
const db = require('../db');

// GET tous les utilisateurs
router.get('/', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// POST un nouvel utilisateur
router.post('/', (req, res) => {
    const { name, email } = req.body;
  
    // Vérification des données
    if (!name || !email) {
      return res.status(400).json({ error: 'Le nom et l\'email sont requis' });
    }
  
    // Requête SQL pour ajouter un utilisateur
    db.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Erreur lors de l\'ajout de l\'utilisateur');
      }
      res.status(201).json({ id: result.insertId, name, email });
    });
  });

// DELETE un utilisateur
router.delete('/:id', (req, res) => {
    const { id } = req.params; // Récupère l'ID de l'URL
  
    db.query('DELETE FROM users WHERE id = ?', [id], (err, result) => {
      if (err) return res.status(500).send(err);
      if (result.affectedRows === 0) {
        return res.status(404).send('Utilisateur non trouvé');
      }
      res.send(`Utilisateur avec l'ID ${id} a été supprimé.`);
    });
  });
  
  

module.exports = router;
