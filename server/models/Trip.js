const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  source: { type: String, required: true },
  destination: { type: String, required: true },
  budget: { type: Number, required: true },
  budgetCategory: { type: String, enum: ['budget', 'mid-range', 'luxury'], default: 'mid-range' },
  numberOfDays: { type: Number, required: true },
  numberOfPeople: { type: Number, required: true },
  preferences: { type: [String], default: [] },
  generatedPlan: {
    itinerary: [
      {
        day: Number,
        title: String,
        theme: String,
        activities: [String],
      },
    ],
    hotels: [
      {
        name: String,
        area: String,
        pricePerNight: Number,
        totalPrice: Number,
        rating: Number,
        amenities: [String],
        platform: String,
        bookingUrl: String,
        highlight: String,
      },
    ],
    transport: [
      {
        mode: String,
        provider: String,
        estimatedCostPerPerson: Number,
        totalCost: Number,
        duration: String,
        platform: String,
        bookingUrl: String,
        pros: [String],
        departureInfo: String,
      },
    ],
    topPlaces: [
      {
        name: String,
        description: String,
        entryFee: String,
        bestTime: String,
        category: String,
        mustSee: Boolean,
      },
    ],
    totalEstimatedCost: Number,
    costBreakdown: {
      transport: Number,
      accommodation: Number,
      food: Number,
      activities: Number,
      miscellaneous: Number,
    },
    tips: [String],
    bestTimeToVisit: String,
    localCuisine: [String],
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Trip', tripSchema);
