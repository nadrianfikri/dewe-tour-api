const express = require('express');
const router = express.Router();

// controller
const { addUser, getUsers, getUser, updateUser, deleteUser } = require('../controller/userController');
const { addCountry, getAllCountry, getCountry, updateCountry, deleteCountry } = require('../controller/countryController');
const { addTrip, getAllTrip, getTrip, updateTrip, deleteTrip } = require('../controller/tripController');
const { addTransaction, getAllTransaction, getTransaction, updateTransaction, deleteTransaction } = require('../controller/transactionController');
const { register, login } = require('../controller/authController');

// middlewares
const { auth, adminOnly } = require('../middlewares/auth');
const { uploadfile } = require('../middlewares/uploadFile');

// routes user
router.post('/users', addUser);
router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

// routes country
router.post('/country', auth, adminOnly, addCountry);
router.get('/country', getAllCountry);
router.get('/country/:id', getCountry);
router.put('/country/:id', updateCountry);
router.delete('/country/:id', deleteCountry);

// routes trip
router.post('/trip', auth, adminOnly, uploadfile('images'), addTrip);
router.get('/trip', getAllTrip);
router.get('/trip/:id', getTrip);
router.put('/trip/:id', updateTrip);
router.delete('/trip/:id', deleteTrip);

// routes transaction
router.post('/transaction', auth, addTransaction);
router.get('/transaction', getAllTransaction);
router.get('/transaction/:id', getTransaction);
router.put('/transaction/:id', updateTransaction);
router.delete('/transaction/:id', deleteTransaction);

// routes auth
router.post('/register', register);
router.post('/login', login);

module.exports = router;
