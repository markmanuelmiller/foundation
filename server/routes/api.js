const express = require('express');

const databaseController = require('../controllers/databaseController');

const router = express.Router();

router.post('/', databaseController.runQuery, (req, res) => {
  return res.json('ok');
});

module.exports = router;
