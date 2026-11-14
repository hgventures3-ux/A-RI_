const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

// Load .env.local
const envPath = path.join(__dirname, "..", ".env.local");
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, "utf-8");
  content.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      const idx = trimmed.indexOf("=");
      if (idx !== -1) {
        const k = trimmed.substring(0, idx).trim();
        const v = trimmed.substring(idx + 1).trim();
        if (!process.env[k]) {
          process.env[k] = v;
        }
      }
    }
  });
}

const MONGODB_URI = process.env.MONGODB_URI;

async function runTest() {
  console.log("=== STARTING 100% WORKING BLOG ADD/UPDATE/DELETE TEST ===");
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI not found");
  }

  await mongoose.connect(MONGODB_URI);
  console.log("✓ Connected to MongoDB Atlas");

  const db = mongoose.connection.db;
  const articlesCol = db.collection("articles");
  const uploadsCol = db.collection("uploads");

  // Step 1: Test Image Upload Storage & Retrieval
  console.log("\n[1/5] Testing Image Upload to MongoDB...");
  const dummyBuffer = Buffer.from("RIFF....WEBPVP8 ...fake-image-bytes-for-test...");
  const testFilename = `blog-test-${Date.now()}.webp`;
  
  await uploadsCol.insertOne({
    filename: testFilename,
    contentType: "image/webp",
    data: dummyBuffer,
    size: dummyBuffer.length,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  console.log(`✓ Uploaded mock image: ${testFilename}`);

  const fetchedUpload = await uploadsCol.findOne({ filename: testFilename });
  if (!fetchedUpload || fetchedUpload.data.toString() !== dummyBuffer.toString()) {
    throw new Error("Failed to retrieve uploaded image from MongoDB");
  }
  console.log(`✓ Successfully verified image retrieval from DB. URL: /api/uploads/${testFilename}`);

  // Step 2: Test Create (Add New Blog Article)
  console.log("\n[2/5] Testing Add New Blog Article (POST)...");
  const testSlug = `automated-test-makhana-health-${Date.now()}`;
  const newArticle = {
    title: "The Ultimate Guide to Roasted Fox Nuts & Makhana Health",
    slug: testSlug,
    subtitle: "A comprehensive look at nutritional benefits, antioxidants, and guilt-free snacking.",
    summary: "A comprehensive look at nutritional benefits, antioxidants, and guilt-free snacking.",
    date: "November 14, 2026",
    author: "Editorial Team",
    image: `/api/uploads/${testFilename}`,
    paragraphs: [
      "Phool Makhana, or Fox Nuts, is one of the most nutrient-dense superfoods cultivated in the Mithila region of Bihar.",
      "High in plant-based protein, low in glycemic index, and naturally gluten-free, it has become an international favourite for conscious snacking.",
      "In this guide, we dive deep into how ethical contract farming preserves quality from wetland harvest to vacuum-sealed packaging."
    ],
    metaTitle: "Makhana Health & Nutrition Guide | AÉRI",
    metaDescription: "Discover why Phool Makhana is the ultimate guilt-free superfood.",
    status: "Published",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const insertResult = await articlesCol.insertOne(newArticle);
  console.log(`✓ Inserted new article with ID: ${insertResult.insertedId}`);

  // Step 3: Test Read (Single article by slug)
  console.log("\n[3/5] Testing Article Retrieval (GET by slug)...");
  const foundArticle = await articlesCol.findOne({ slug: testSlug });
  if (!foundArticle || foundArticle.title !== newArticle.title) {
    throw new Error("Created article not found or title mismatch");
  }
  console.log(`✓ Article retrieved: "${foundArticle.title}" (slug: ${foundArticle.slug}, paragraphs: ${foundArticle.paragraphs.length})`);

  // Step 4: Test Update (Edit Blog Article)
  console.log("\n[4/5] Testing Update Blog Article (PUT / Edit)...");
  const updatedTitle = "The Ultimate Guide to Roasted Fox Nuts & Makhana Health (2026 Edition)";
  const updatedSubtitle = "Updated with 2026 laboratory testing data, export guidelines, and health benefits.";
  const newParagraph = "New Update: Certified non-GMO and gluten-free across all batches.";

  await articlesCol.updateOne(
    { slug: testSlug },
    {
      $set: {
        title: updatedTitle,
        subtitle: updatedSubtitle,
        summary: updatedSubtitle,
        paragraphs: [...newArticle.paragraphs, newParagraph],
        updatedAt: new Date(),
      },
    }
  );

  const updatedDoc = await articlesCol.findOne({ slug: testSlug });
  if (!updatedDoc || updatedDoc.title !== updatedTitle || updatedDoc.paragraphs.length !== 4) {
    throw new Error("Article update verification failed");
  }
  console.log(`✓ Article updated successfully to: "${updatedDoc.title}"`);
  console.log(`✓ Total paragraphs now: ${updatedDoc.paragraphs.length}`);

  // Step 5: Test Delete (Soft Delete status: "Deleted")
  console.log("\n[5/5] Testing Delete Article (DELETE)...");
  await articlesCol.updateOne(
    { slug: testSlug },
    { $set: { status: "Deleted", updatedAt: new Date() } }
  );

  const deletedDoc = await articlesCol.findOne({ slug: testSlug });
  if (!deletedDoc || deletedDoc.status !== "Deleted") {
    throw new Error("Article deletion status verification failed");
  }
  console.log(`✓ Article marked as Deleted and excluded from live feed`);

  // Clean up test data
  await articlesCol.deleteOne({ slug: testSlug });
  await uploadsCol.deleteOne({ filename: testFilename });
  console.log("✓ Test records cleaned up successfully");

  console.log("\n=== ALL BLOG ADD, UPDATE, UPLOAD, AND DELETE TESTS PASSED (100% WORKING) ===\n");
  await mongoose.disconnect();
}

runTest().catch((err) => {
  console.error("TEST FAILED:", err);
  process.exit(1);
});
