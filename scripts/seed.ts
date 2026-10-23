import { MongoClient } from "mongodb";
import { INITIAL_PRODUCTS, INITIAL_SETTINGS } from "../lib/data";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/jewelry";

async function seed() {
  console.log("Connecting to MongoDB for seeding:", uri);
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("jewelry");

    // 1. Seed Products
    const productsCollection = db.collection("products");
    const existingCount = await productsCollection.countDocuments();
    if (existingCount === 0) {
      console.log(`Seeding ${INITIAL_PRODUCTS.length} initial luxury jewelry items...`);
      await productsCollection.insertMany(INITIAL_PRODUCTS as unknown as Parameters<typeof productsCollection.insertMany>[0]);
      console.log("Products seeded successfully.");
    } else {
      console.log(`Products collection already has ${existingCount} items. Skipping.`);
    }

    // 2. Seed Settings
    const settingsCollection = db.collection("settings");
    const settingsCount = await settingsCollection.countDocuments();
    if (settingsCount === 0) {
      console.log("Seeding atelier settings...");
      await settingsCollection.insertOne(INITIAL_SETTINGS as unknown as Parameters<typeof settingsCollection.insertOne>[0]);
      console.log("Settings seeded successfully.");
    }

    // 3. Create indexes
    await productsCollection.createIndex({ slug: 1 }, { unique: true });
    await productsCollection.createIndex({ category: 1 });
    await productsCollection.createIndex({ featured: 1 });
    await productsCollection.createIndex({ stockStatus: 1 });
    console.log("Indexes created successfully.");

  } catch (error) {
    console.error("Error during seed:", error);
  } finally {
    await client.close();
  }
}

seed();
