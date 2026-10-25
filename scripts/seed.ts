try {
  process.loadEnvFile();
} catch {}

import { MongoClient } from "mongodb";
import { INITIAL_PRODUCTS, INITIAL_SETTINGS, BRAND } from "../lib/data";
import { auth } from "../lib/auth";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/jewelry";

async function seed() {
  console.log("Connecting to MongoDB for seeding:", uri.replace(/:([^:@]+)@/, ":****@"));
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("jewelry");

    // 1. Seed & Update Products with New Luxury Imagery
    const productsCollection = db.collection("products");
    console.log(`Synchronizing ${INITIAL_PRODUCTS.length} initial luxury jewelry items...`);
    for (const prod of INITIAL_PRODUCTS) {
      await productsCollection.updateOne(
        { slug: prod.slug },
        {
          $set: {
            title: prod.title,
            sku: prod.sku,
            description: prod.description,
            shortDescription: prod.shortDescription,
            price: prod.price,
            compareAtPrice: prod.compareAtPrice,
            category: prod.category,
            collection: prod.collection,
            metals: prod.metals,
            gemstones: prod.gemstones,
            caratWeight: prod.caratWeight,
            clarity: prod.clarity,
            cutGrade: prod.cutGrade,
            images: prod.images,
            stockStatus: prod.stockStatus,
            stockQuantity: prod.stockQuantity,
            featured: prod.featured,
            updatedAt: new Date(),
          },
          $setOnInsert: {
            createdAt: new Date(),
          },
        },
        { upsert: true }
      );
    }
    console.log("Products synchronized with luxury imagery successfully.");

    // 2. Seed Settings
    const settingsCollection = db.collection("settings");
    const settingsCount = await settingsCollection.countDocuments();
    if (settingsCount === 0) {
      console.log("Seeding atelier settings...");
      await settingsCollection.insertOne(INITIAL_SETTINGS as unknown as Parameters<typeof settingsCollection.insertOne>[0]);
      console.log("Settings seeded successfully.");
    } else {
      console.log(`Settings collection already has ${settingsCount} items. Skipping.`);
    }

    // 3. Create indexes
    await productsCollection.createIndex({ slug: 1 }, { unique: true });
    await productsCollection.createIndex({ category: 1 });
    await productsCollection.createIndex({ featured: 1 });
    await productsCollection.createIndex({ stockStatus: 1 });
    console.log("Indexes created successfully.");

    // 4. Seed Director Admin Account via Better Auth
    try {
      console.log("Verifying Atelier Director admin account...");
      await auth.api.signUpEmail({
        body: {
          email: BRAND.contact.adminEmail,
          password: BRAND.contact.adminDefaultPassword,
          name: "Director Vivienne",
        },
      });
      console.log("Director admin account initialized successfully.");
    } catch {
      console.log("Director admin account already active.");
    }

    console.log("Database seed & verification completed successfully!");
  } catch (error) {
    console.error("Error during seed:", error);
    process.exit(1);
  } finally {
    await client.close();
    process.exit(0);
  }
}

seed();
