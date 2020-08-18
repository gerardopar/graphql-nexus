# Migration `20200818032758-test-app`

This migration has been generated by Gerardo Paredes at 8/17/2020, 8:27:58 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql

```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200818022340-test-app..20200818032758-test-app
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -24,13 +24,15 @@
   body      String
   published Boolean
   comments  Comment[]
   authorId  Int? 
-  author    User? @relation(fields: [authorId], references: [id])
+  author    User?   @relation(fields: [authorId], references: [id])
 }
 model Comment {
   id        Int     @id @default(autoincrement())
   text      String
   authorId  Int? 
-  author    User? @relation(fields: [authorId], references: [id])
+  author    User?   @relation(fields: [authorId], references: [id])
+  postId    Int?  
+  post      Post?   @relation(fields: [postId], references: [id])
 }
```

