const express = require('express');
const router = express.Router();
const path = require('path');

// Route pour afficher une image
router.get('/:filename', (req, res) => {
  const { filename } = req.params;
  const imagePath = path.join(__dirname, '..', 'images', filename);

  res.sendFile(imagePath, (err) => {
    if (err) {
      console.error(err);
      res.status(404).send('Image non trouvée');
    }
  });
});

module.exports = router;
