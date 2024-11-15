const express = require('express');
const router = express.Router();
const { getAllUsers, getUserByID, getUserTicket } = require('../controllers/userController');

router.get('/', getAllUsers);
router.get('/:id', getUserByID);
router.get('/ticket/:id', getUserTicket)

module.exports = router;
