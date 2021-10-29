const express = require('express');
const router = express.Router();

// import controller
const { addUser, getUsers, getUser, updateUser, deleteUser } = require('../controller/userController');
const { addCountry, getAllCountry, getCountry, updateCountry, deleteCountry } = require('../controller/countryController');
const { addTrip, getAllTrip, getTrip, updateTrip, deleteTrip } = require('../controller/tripController');

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

// routes trip
router.post('/trip', addTrip);
router.get('/trip', getAllTrip);
router.get('/trip/:id', getTrip);
router.put('/trip/:id', updateTrip);
router.delete('/trip/:id', deleteTrip);

module.exports = router;
