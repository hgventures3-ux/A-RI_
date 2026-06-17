const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });
mongoose.connect(process.env.MONGODB_URI).then(async () => {
  const db = mongoose.connection.db;
  const result = await db.collection('products').updateMany({}, { $set: { price: 2.99, weight: "30g" } });
  console.log(result.modifiedCount + ' products updated successfully to 2.99 EUR / 30g.');
  process.exit(0);
});
