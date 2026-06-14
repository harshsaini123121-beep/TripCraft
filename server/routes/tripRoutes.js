const express = require('express');
const router = express.Router();
const { generateTrip, getMyTrips, getTripById, deleteTrip } = require('../controllers/tripController');
const { protect, optionalAuth } = require('../middleware/authMiddleware');

router.post('/generate', optionalAuth, generateTrip);
router.get('/my-trips', protect, getMyTrips);
router.get('/:id', getTripById);
router.delete('/:id', protect, deleteTrip);

module.exports = router;
