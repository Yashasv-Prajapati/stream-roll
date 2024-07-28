import { relations } from "drizzle-orm";
import { integer, text, boolean, varchar, pgTable, serial } from "drizzle-orm/pg-core";


export const user = pgTable("user",{
    id: serial("id").primaryKey(),
    username: varchar("username").notNull(),
    password: varchar("password").notNull(),
    email: text("email").notNull(),
})


export const video = pgTable("video", {
  id: integer("id").primaryKey(),
  userId: integer("user_id").references(()=>user.id),
  title: text("title").notNull(),
  description: text("description").notNull(),
  url: text("url").notNull(),
});

export const userVideoRelation = relations(user, ({many})=>({
        video: many(video)
    })
)
