const express = require('express');
const router = express.Router();
const {
  getAllParties,
  getPartyById,
} = require('../controllers/partyController');

router.get('/', getAllParties);
router.get('/:id', getPartyById);

module.exports = router;
