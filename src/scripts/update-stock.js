const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });
mongoose.connect(process.env.MONGODB_URI).then(async () => {
  const db = mongoose.connection.db;
  const result = await db.collection('products').updateMany({}, { $set: { stockQuantity: 100 } });
  console.log(result.modifiedCount + ' products updated successfully.');
  process.exit(0);
});
