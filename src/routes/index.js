const express = require('express');
const router = express.Router();

// import controller
const { addUser, getUsers, getUser, deleteUser } = require('../controller/userController');

// route
router.post('/users', addUser);
router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.delete('/users/:id', deleteUser);

module.exports = router;
