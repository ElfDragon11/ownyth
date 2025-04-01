import { pgTable, text, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const waitlist = pgTable("waitlist", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  fullName: text("full_name").notNull(),
  Hp: text("Hp").notNull(),
  source: text("source").notNull(),
  mediaPreference: text("media_preference").notNull(),
  userType: text("user_type").notNull(),
});

export const insertWaitlistSchema = createInsertSchema(waitlist)
  .pick({
    email: true,
    fullName: true,
    Hp: true,
    source: true,
    mediaPreference: true,
    userType: true,
  })
  .extend({
    email: z.string().email("Please enter a valid email address"),
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    Hp: z.string(),
    mediaPreference: z.string(),
    userType: z.string(),
  });

  export type InsertWaitlist = {
    email: string;
    fullName: string;
    Hp: string;
    source: string;
    mediaPreference: string;
    userType: string;
  };