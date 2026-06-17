const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });
mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 5000 }).then(() => {
  console.log('MongoDB connected successfully!');
  process.exit(0);
}).catch(err => {
  console.error('MongoDB connection failed:', err);
  process.exit(1);
});
