
import { db } from "./db";
import { sessions, type Session, type InsertSession } from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  createSession(session: InsertSession): Promise<Session>;
  getSession(id: string): Promise<Session | undefined>;
  updateSession(id: string, session: Partial<InsertSession>): Promise<Session>;
}

export class DatabaseStorage implements IStorage {
  async createSession(session: InsertSession): Promise<Session> {
    const [newSession] = await db.insert(sessions).values(session).returning();
    return newSession;
  }

  async getSession(id: string): Promise<Session | undefined> {
    const [session] = await db.select().from(sessions).where(eq(sessions.id, id));
    return session;
  }

  async updateSession(id: string, updates: Partial<InsertSession>): Promise<Session> {
    const [updated] = await db
      .update(sessions)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(sessions.id, id))
      .returning();
    return updated;
  }
}

export const storage = new DatabaseStorage();
