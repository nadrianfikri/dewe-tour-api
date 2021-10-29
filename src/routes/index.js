const express = require('express');
const router = express.Router();

// import controller
const { addUser, getUsers, getUser, updateUser, deleteUser } = require('../controller/userController');
const { addCountry, getAllCountry, getCountry, updateCountry, deleteCountry } = require('../controller/countryController');

// routes user
router.post('/users', addUser);
router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

// routes country
router.post('/country', addCountry);
router.get('/country', getAllCountry);
router.get('/country/:id', getCountry);
router.put('/country/:id', updateCountry);
router.delete('/country/:id', deleteCountry);

module.exports = router;
