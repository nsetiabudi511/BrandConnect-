import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-c7ecd8ca/health", (c) => {
  return c.json({ status: "ok" });
});

// Get user's brand readiness data
app.get("/make-server-c7ecd8ca/brand-readiness/:userId", async (c) => {
  try {
    const userId = c.req.param("userId");
    const key = `brand_readiness:${userId}`;
    
    const data = await kv.get(key);
    
    if (!data) {
      return c.json({ error: "Brand readiness data not found" }, 404);
    }
    
    return c.json(data);
  } catch (error) {
    console.log(`Error fetching brand readiness data: ${error}`);
    return c.json({ error: "Failed to fetch brand readiness data" }, 500);
  }
});

// Update user's brand readiness data
app.post("/make-server-c7ecd8ca/brand-readiness/:userId", async (c) => {
  try {
    const userId = c.req.param("userId");
    const body = await c.req.json();
    const key = `brand_readiness:${userId}`;
    
    await kv.set(key, body);
    
    return c.json({ success: true, data: body });
  } catch (error) {
    console.log(`Error saving brand readiness data: ${error}`);
    return c.json({ error: "Failed to save brand readiness data" }, 500);
  }
});

// Get user's progress history
app.get("/make-server-c7ecd8ca/progress/:userId", async (c) => {
  try {
    const userId = c.req.param("userId");
    const key = `progress:${userId}`;
    
    const data = await kv.get(key);
    
    if (!data) {
      return c.json({ monthlyData: [], milestones: [] });
    }
    
    return c.json(data);
  } catch (error) {
    console.log(`Error fetching progress data: ${error}`);
    return c.json({ error: "Failed to fetch progress data" }, 500);
  }
});

// Update user's progress history
app.post("/make-server-c7ecd8ca/progress/:userId", async (c) => {
  try {
    const userId = c.req.param("userId");
    const body = await c.req.json();
    const key = `progress:${userId}`;
    
    await kv.set(key, body);
    
    return c.json({ success: true, data: body });
  } catch (error) {
    console.log(`Error saving progress data: ${error}`);
    return c.json({ error: "Failed to save progress data" }, 500);
  }
});

// Get all users' brand readiness (for admin/analytics)
app.get("/make-server-c7ecd8ca/all-brand-readiness", async (c) => {
  try {
    const prefix = "brand_readiness:";
    const allData = await kv.getByPrefix(prefix);
    
    return c.json({ users: allData });
  } catch (error) {
    console.log(`Error fetching all brand readiness data: ${error}`);
    return c.json({ error: "Failed to fetch brand readiness data" }, 500);
  }
});

Deno.serve(app.fetch);