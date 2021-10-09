const express = require('express');
const router = express.Router();
const rentalController = require('../app/controllers/RentalController');

router.get('/get/search', rentalController.search);
router.post('/update/extra', rentalController.updateExtraNote);
router.get('/get/extra', rentalController.getExtraNote);
router.post('/delete', rentalController.deleteRentalForm);
router.get('/get', rentalController.getRentalForm);
router.post('/create', rentalController.createRentalForm);

module.exports = router;
