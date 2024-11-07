const express = require('express');
const router = express.Router();
const {
  getAllParties,
  getPartyById,
  getClothesOfParty,
} = require('../controllers/partyController');

router.get('/', getAllParties);
router.get('/:id', getPartyById);
router.get('/clothes/:id', getClothesOfParty);

module.exports = router;
