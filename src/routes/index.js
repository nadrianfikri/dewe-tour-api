const express = require('express');
const router = express.Router();

// import controller
const { addUser, getUsers, getUser, updateUser, deleteUser } = require('../controller/userController');

// route
router.post('/users', addUser);
router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

module.exports = router;
