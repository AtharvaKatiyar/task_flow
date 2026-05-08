import { redis } from "../config/redis.js";

const cache = (keyPrefix) =>
  async (req, res, next) => {
    try {
      const key = `${keyPrefix}:${JSON.stringify(
        req.query
      )}`;

      const cachedData =
        await redis.get(key);

      if (cachedData) {
        return res.json(
          JSON.parse(cachedData)
        );
      }

      req.cacheKey = key;

      next();
    } catch (error) {
      console.error(
        "Redis cache error:",
        error
      );

      next();
    }
  };

export default cache;