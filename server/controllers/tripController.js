const mongoose = require('mongoose');
const Trip = require('../models/Trip');
const { generateTripPlan } = require('../services/aiService');

// In-memory fallback cache for when MongoDB is not connected
const demoTrips = new Map();

const generateTrip = async (req, res) => {
  try {
    const { source, destination, budget, numberOfDays, numberOfPeople, preferences } = req.body;

    if (!source || !destination || !budget || !numberOfDays || !numberOfPeople)
      return res.status(400).json({ message: 'All trip details are required' });

    const budgetCategory =
      budget / numberOfPeople < 5000
        ? 'budget'
        : budget / numberOfPeople < 15000
        ? 'mid-range'
        : 'luxury';

    const generatedPlan = await generateTripPlan({
      source, destination, budget, numberOfDays, numberOfPeople,
      preferences: preferences || [],
    });

    const isDbConnected = mongoose.connection.readyState === 1;
    let trip;

    if (isDbConnected) {
      trip = await Trip.create({
        userId: req.user ? req.user._id : null,
        source, destination, budget, budgetCategory,
        numberOfDays, numberOfPeople,
        preferences: preferences || [],
        generatedPlan,
      });

      if (req.user) {
        const User = require('../models/User');
        await User.findByIdAndUpdate(req.user._id, { $push: { savedTrips: trip._id } });
      }
    } else {
      console.warn('⚠️  Database is offline. Generating trip in Demo Mode (saved in memory).');
      const mockId = 'demo-' + Math.random().toString(36).substr(2, 9);
      trip = {
        _id: mockId,
        userId: null,
        source,
        destination,
        budget,
        budgetCategory,
        numberOfDays,
        numberOfPeople,
        preferences: preferences || [],
        generatedPlan,
        createdAt: new Date(),
      };
      demoTrips.set(mockId, trip);
    }

    res.status(201).json(trip);
  } catch (error) {
    console.error('Trip generation error:', error);
    res.status(500).json({ message: error.message || 'Failed to generate trip plan' });
  }
};

const getMyTrips = async (req, res) => {
  try {
    const isDbConnected = mongoose.connection.readyState === 1;
    if (!isDbConnected) {
      // Return generated demo trips that match the session (if any)
      const tripsArray = Array.from(demoTrips.values());
      return res.json(tripsArray);
    }

    const trips = await Trip.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(trips);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTripById = async (req, res) => {
  try {
    const id = req.params.id;
    if (id.startsWith('demo-')) {
      const demoTrip = demoTrips.get(id);
      if (demoTrip) return res.json(demoTrip);
      return res.status(404).json({ message: 'Trip not found in demo memory' });
    }

    const trip = await Trip.findById(id);
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    res.json(trip);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTrip = async (req, res) => {
  try {
    const id = req.params.id;
    if (id.startsWith('demo-')) {
      if (demoTrips.delete(id)) {
        return res.json({ message: 'Trip deleted successfully from demo memory' });
      }
      return res.status(404).json({ message: 'Trip not found in demo memory' });
    }

    const trip = await Trip.findById(id);
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    if (trip.userId && trip.userId.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Not authorized' });

    await Trip.findByIdAndDelete(id);
    const User = require('../models/User');
    await User.findByIdAndUpdate(req.user._id, { $pull: { savedTrips: id } });

    res.json({ message: 'Trip deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { generateTrip, getMyTrips, getTripById, deleteTrip };
