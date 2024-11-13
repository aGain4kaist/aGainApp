const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  getPartybyUserID,
  getClothbyUserID,
} = require('../controllers/userController');

router.get('/', getAllUsers);
router.get('/:id', getUserbyID);
router.get('/party/:id', getPartybyUserID); // 유저가 참가한 파티의 리스트
router.get('/cloth/:id', getClothbyUserID); // 유저가 파티에 내놓은 옷의 리스트

module.exports = router;
