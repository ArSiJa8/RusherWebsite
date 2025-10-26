import type { Express } from "express";
import { createServer, type Server } from "http";

const RUSHERHACK_API_URL = "https://rusherdevelopment.github.io/rusherhack-plugins/api/v1/";
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

interface CachedData {
  data: any;
  timestamp: number;
}

let pluginsCache: CachedData | null = null;

export async function registerRoutes(app: Express): Promise<Server> {
  // API endpoint to fetch plugins
  app.get("/api/plugins", async (req, res) => {
    try {
      const now = Date.now();

      // Return cached data if it's still fresh
      if (pluginsCache && now - pluginsCache.timestamp < CACHE_DURATION) {
        return res.json(pluginsCache.data);
      }

      // Fetch fresh data from Rusherhack API
      const response = await fetch(RUSHERHACK_API_URL);

      if (!response.ok) {
        throw new Error(`Failed to fetch plugins: ${response.statusText}`);
      }

      const data = await response.json();

      // Update cache
      pluginsCache = {
        data,
        timestamp: now,
      };

      res.json(data);
    } catch (error) {
      console.error("Error fetching plugins:", error);
      
      // If we have stale cached data, return it as fallback
      if (pluginsCache) {
        return res.json(pluginsCache.data);
      }

      res.status(500).json({
        error: "Failed to fetch plugins",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
