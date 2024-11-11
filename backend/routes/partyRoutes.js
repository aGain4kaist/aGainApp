const express = require('express');
const router = express.Router();
const {
  getAllParties,
  getPartyById,
} = require('../controllers/partyController');

router.get('/', getAllParties);
router.get('/:id', getPartyById);
//router.get('/:id/cloth', getClothesOfParty); // 파티에 속한 모든 옷을 불러온다.
//router.get('/:id/users', getUsersOfParty); // 파티에 속한 모든 유저를 불러온다.

module.exports = router;
