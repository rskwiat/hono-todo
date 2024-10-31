import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
// import { createInsertSchema, createSelectSchema } from 'drizzle-zod';


export const tasks = sqliteTable('tasks', {
  id: integer('id', { mode: 'number' })
    .primaryKey({ autoIncrement: true }),
  name: text('name')
    .notNull(),
  completed: integer('done', { mode: 'boolean' })
    .notNull()
    .default(false),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date()),
});
