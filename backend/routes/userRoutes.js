const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUserByID,
  getUserTicket,
  buyCloth,
  getUserExchange,
} = require('../controllers/userController');

router.get('/', getAllUsers);
router.get('/:id', getUserByID);
router.get('/ticket/:id', getUserTicket);
router.get('/trade/:user_id/:cloth_id', buyCloth); // user_id를 가진 유저가 cloth_id를 가진 옷을 구매함.
// 옷의 원 주인과 유저 모두 exchange 횟수 증가, 구매하는 유저는 티켓 소모
router.get('/trade/:id', getUserExchange); // id를 가진 유저의 교환 횟수를 불러옴

module.exports = router;
