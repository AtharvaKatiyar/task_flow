import { redis } from "../config/redis.js";

export const clearCacheByPrefix =
  async (prefix) => {
    try {
      const keys = await redis.keys(
        `${prefix}*`
      );

      if (keys.length > 0) {
        await redis.del(keys);
      }
    } catch (error) {
      console.error(
        "Cache clear error:",
        error
      );
    }
  };