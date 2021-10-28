const express = require('express');
const router = express.Router();

// import controller
const { addUser, getUsers, getUser } = require('../controller/userController');

// route
router.post('/users', addUser);
router.get('/users', getUsers);
router.get('/users/:id', getUser);

module.exports = router;
