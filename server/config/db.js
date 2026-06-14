const mongoose = require('mongoose');

const connectDB = async () => {
  const rawUri = process.env.MONGO_URI;
  const isPlaceholder = !rawUri || rawUri.includes('YOUR_USERNAME') || rawUri.includes('YOUR_PASSWORD');
  const dbUri = isPlaceholder ? 'mongodb://localhost:27017/tripcraft' : rawUri;

  if (isPlaceholder) {
    console.warn('⚠️  MONGO_URI is missing or contains placeholders. Falling back to local MongoDB: mongodb://localhost:27017/tripcraft');
  }

  try {
    const conn = await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds instead of hanging
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    console.error('\n💡 To resolve database errors:');
    console.error('   1. Ensure MongoDB is installed and running locally.');
    console.error('   2. Or configure a valid MONGO_URI in your server/.env file.');
    console.error('   (The server will still run, but database actions will fail)\n');
  }
};

module.exports = connectDB;
