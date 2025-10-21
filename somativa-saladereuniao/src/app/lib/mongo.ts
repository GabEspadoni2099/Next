// lib/mongo.ts
import mongoose from 'mongoose';


const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) throw new Error('MONGODB_URI not defined in .env');


let cached: any = (global as any)._mongo;
if (!cached) cached = (global as any)._mongo = { conn: null, promise: null };


export async function connectToMongo() {
if (cached.conn) return cached.conn;
if (!cached.promise) {
cached.promise = mongoose.connect(MONGODB_URI).then(m => m.connection);
}
cached.conn = await cached.promise;
return cached.conn;
}