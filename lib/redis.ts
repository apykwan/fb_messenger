"use server";

import Redis from 'ioredis';

let client: Redis | null = null;

export async function redisDB() {
  if (!client) {
    try {
      client = new Redis(process.env.REDIS_URL!);
    } catch (error) {
      console.error("Failed to connect to Redis:", error);
      throw error;
    }
  }
  return client;
}