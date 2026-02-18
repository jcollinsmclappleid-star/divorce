
import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

import { seedDatabase } from "./seed";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // Seed Data
  seedDatabase().catch(console.error);
  
  // PDF Generation Endpoint (Stub for now)
  app.post(api.pdf.generate.path, async (req, res) => {
    try {
      // In a real implementation, we would use a library like 'pdfkit' or 'puppeteer'
      // to generate a PDF from the request body (AppState).
      // For now, we'll return a 501 Not Implemented or a dummy success.
      
      console.log("Generating PDF for state:", req.body);
      
      // Simulate PDF generation delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      res.json({ message: "PDF generation simulation successful. Check console." });
    } catch (error) {
       res.status(500).json({ message: "Failed to generate PDF" });
    }
  });

  // Session Management (Optional for MVP, but good to have)
  app.post(api.sessions.create.path, async (req, res) => {
    try {
      const input = api.sessions.create.input.parse(req.body);
      const session = await storage.createSession({
        id: crypto.randomUUID(),
        name: input.name || "Untitled Session",
        data: input.data
      });
      res.status(201).json(session);
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({ message: err.errors });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  });

  app.get(api.sessions.get.path, async (req, res) => {
    const session = await storage.getSession(req.params.id);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }
    res.json(session);
  });
  
  app.put(api.sessions.update.path, async (req, res) => {
    try {
      const input = api.sessions.update.input.parse(req.body);
      const session = await storage.updateSession(req.params.id, {
        name: input.name,
        data: input.data
      });
      res.json(session);
    } catch (err) {
       res.status(500).json({ message: "Failed to update session" });
    }
  });

  return httpServer;
}
