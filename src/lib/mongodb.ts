import mongoose from 'mongoose';

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
interface GlobalMongoose {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

const globalCache = globalThis as typeof globalThis & {
  mongoose?: GlobalMongoose;
};

if (!globalCache.mongoose) {
  globalCache.mongoose = { conn: null, promise: null };
}

const cached = globalCache.mongoose;

export async function dbConnect() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error(
      'Please define the MONGODB_URI environment variable. On Vercel, add it in Project Settings → Environment Variables.'
    );
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(uri, {
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
