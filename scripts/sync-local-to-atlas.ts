/* eslint-disable @typescript-eslint/no-explicit-any */
import { MongoClient } from "mongodb";

const LOCAL_URI = "mongodb://localhost:27017/jewelry";
const ATLAS_URI = "mongodb+srv://shammashassankt_db_user:ivxzTadpyz7dqFVC@etoile-atelier.tcgalgk.mongodb.net/jewelry?retryWrites=true&w=majority";

async function syncLocalToAtlas() {
  console.log("=== Syncing Local MongoDB to MongoDB Atlas ===");
  console.log("Source (Local):", LOCAL_URI);
  console.log("Target (Atlas):", ATLAS_URI.replace(/:([^:@]+)@/, ":****@"));

  const localClient = new MongoClient(LOCAL_URI);
  const atlasClient = new MongoClient(ATLAS_URI);

  try {
    await localClient.connect();
    console.log("✓ Connected to Local MongoDB");

    await atlasClient.connect();
    console.log("✓ Connected to Atlas MongoDB");

    const localDb = localClient.db("jewelry");
    const atlasDb = atlasClient.db("jewelry");

    // Get all collections in local database
    const localCollections = await localDb.listCollections().toArray();
    console.log(`\nFound ${localCollections.length} collections in local database:`, localCollections.map(c => c.name));

    for (const collInfo of localCollections) {
      const collName = collInfo.name;
      if (collName.startsWith("system.")) continue;

      const localColl = localDb.collection(collName);
      const atlasColl = atlasDb.collection(collName);

      const docs = await localColl.find({}).toArray();
      console.log(`\nProcessing '${collName}': ${docs.length} documents found locally.`);

      if (docs.length > 0) {
        // Clear destination collection or replace
        await atlasColl.deleteMany({});
        console.log(`  - Cleared existing Atlas collection '${collName}'`);

        // Insert documents
        const insertRes = await atlasColl.insertMany(docs);
        console.log(`  - Inserted ${insertRes.insertedCount} documents into Atlas '${collName}'`);
      } else {
        // Ensure collection exists even if empty
        const atlasCollections = await atlasDb.listCollections({ name: collName }).toArray();
        if (atlasCollections.length === 0) {
          await atlasDb.createCollection(collName);
          console.log(`  - Created empty collection '${collName}' on Atlas`);
        }
      }

      // Sync indexes
      try {
        const rawIndexes = await localColl.indexes();
        const customIndexes = rawIndexes.filter(idx => idx.name !== "_id_");
        for (const idx of customIndexes) {
          const key = idx.key;
          const options: any = { name: idx.name };
          if (idx.unique) options.unique = true;
          if (idx.sparse) options.sparse = true;
          if (idx.expireAfterSeconds !== undefined) options.expireAfterSeconds = idx.expireAfterSeconds;

          try {
            await atlasColl.createIndex(key, options);
            console.log(`  - Recreated index '${idx.name}' on Atlas '${collName}'`);
          } catch (idxErr: any) {
            console.warn(`  - Warning creating index '${idx.name}':`, idxErr.message);
          }
        }
      } catch (idxErr: any) {
        console.warn(`  - Could not fetch indexes for '${collName}':`, idxErr.message);
      }
    }

    console.log("\n=== Verifying Atlas Collections and Counts ===");
    const atlasColls = await atlasDb.listCollections().toArray();
    for (const c of atlasColls) {
      const count = await atlasDb.collection(c.name).countDocuments();
      console.log(`✓ Atlas collection '${c.name}': ${count} documents`);
    }

    console.log("\n=== All Data Successfully Pushed to MongoDB Atlas! ===");
  } catch (error) {
    console.error("Migration error:", error);
    process.exit(1);
  } finally {
    await localClient.close();
    await atlasClient.close();
  }
}

syncLocalToAtlas();
