const express = require('express');
const router = express.Router();
const {
  getAllParties,
  getPartyById,
  togglePartyLike,
} = require('../controllers/partyController');

router.get('/', getAllParties);
router.get('/:id', getPartyById);
router.get('/like/:userid/:partyid', togglePartyLike);

module.exports = router;
