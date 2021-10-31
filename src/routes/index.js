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
router.put('/users/:id', auth, uploadfile('avatar'), updateUser);
router.delete('/users/:id', auth, deleteUser);

// routes country
router.post('/country', auth, adminOnly, addCountry);
router.get('/country', getAllCountry);
router.get('/country/:id', getCountry);
router.put('/country/:id', auth, adminOnly, updateCountry);
router.delete('/country/:id', auth, adminOnly, deleteCountry);

// routes trip
router.post('/trip', auth, adminOnly, uploadfile('images'), addTrip);
router.get('/trip', getAllTrip);
router.get('/trip/:id', getTrip);
router.put('/trip/:id', auth, adminOnly, uploadfile('images'), updateTrip);
router.delete('/trip/:id', auth, adminOnly, deleteTrip);

// routes transaction
router.post('/transaction/:id', auth, addTransaction);
router.get('/transaction', auth, adminOnly, getAllTransaction);
router.get('/transaction/:id', auth, getTransaction);
router.put('/transaction/:id', auth, uploadfile('attachment'), updateTransaction);
router.delete('/transaction/:id', auth, deleteTransaction);

// routes auth
router.post('/register', register);
router.post('/login', login);

module.exports = router;
