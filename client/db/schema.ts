import { relations } from "drizzle-orm";
import { integer, text, sqliteTable } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    username: text("username").notNull(),
    password: text("password").notNull(),
    email: text("email").notNull(),
});

export const videos = sqliteTable("videos", {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    userId: integer("user_id").references(() => users.id),
    title: text("title").notNull(),
    description: text("description").notNull(),
    url: text("url").notNull(),
});

// Define the watchHistory table
export const watchHistory = sqliteTable("watch_history", {
    id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
    userId: integer("user_id").references(() => users.id).notNull(),
    videoId: integer("video_id").references(() => videos.id).notNull(),
    watchedAt: integer("watched_at", { mode: 'timestamp' }).notNull(),
});

// Define the relations
export const userVideoRelation = relations(users, ({ many }) => ({
    videos: many(videos)
}));

export const videoUserRelation = relations(videos, ({ one }) => ({
    user: one(users, {
        fields: [videos.userId],
        references: [users.id],
    })
}));

export const userWatchHistoryRelation = relations(users, ({ many }) => ({
    watchHistories: many(watchHistory)
}));

export const videoWatchHistoryRelation = relations(videos, ({ many }) => ({
    watchHistories: many(watchHistory)
}));

export const watchHistoryRelations = relations(watchHistory, ({ one }) => ({
    user: one(users, {
        fields: [watchHistory.userId],
        references: [users.id],
    }),
    video: one(videos, {
        fields: [watchHistory.videoId],
        references: [videos.id],
    }),
}));
