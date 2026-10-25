import { MongoClient, type Db } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Invalid/Missing environment variable: 'MONGODB_URI'");
}

/**
 * MongoDB Connection Options
 * Strictly adheres to project standards:
 * - maxPoolSize: 5
 * - minPoolSize: 0
 * - maxIdleTimeMS: 30000
 * - connectTimeoutMS & serverSelectionTimeoutMS: 10000 (resilient against Atlas cold starts / replica set discovery)
 */
const options = {
  maxPoolSize: 5,
  minPoolSize: 0,
  maxIdleTimeMS: 30000,
  connectTimeoutMS: 10000,
  serverSelectionTimeoutMS: 10000,
};

declare global {
  // eslint-disable-next-line no-var
  var _mongoClient: MongoClient | undefined;
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

// Preserve MongoClient across warm invocations in dev (HMR) and production (Next.js serverless/workers)
const client: MongoClient = global._mongoClient ?? new MongoClient(uri, options);
global._mongoClient = client;

function createClientPromise(): Promise<MongoClient> {
  return client.connect().catch((error) => {
    // Reset so subsequent attempts can reconnect instead of retaining a permanent rejection
    global._mongoClientPromise = undefined;
    throw error;
  });
}

const clientPromise: Promise<MongoClient> =
  global._mongoClientPromise ?? (global._mongoClientPromise = createClientPromise());

export const mongoClient = client;
export const db: Db = client.db("jewelry");

export async function getDb(dbName = "jewelry"): Promise<Db> {
  try {
    const connectedClient = await (global._mongoClientPromise ?? (global._mongoClientPromise = createClientPromise()));
    return connectedClient.db(dbName);
  } catch (error) {
    // Self-healing attempt: clear cached rejection and attempt connection once more
    global._mongoClientPromise = undefined;
    const retryPromise = (global._mongoClientPromise = createClientPromise());
    const connectedClient = await retryPromise;
    return connectedClient.db(dbName);
  }
}

export default clientPromise;
