const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  getUsersByPartyID,
} = require('../controllers/userController');

router.get('/', getAllUsers);
router.get('/:id', getUserbyID);
router.get('/party/:id', getUserbyPartyID);

module.exports = router;
