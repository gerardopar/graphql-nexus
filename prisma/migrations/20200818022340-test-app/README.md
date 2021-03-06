# Migration `20200818022340-test-app`

This migration has been generated by Gerardo Paredes at 8/17/2020, 7:23:40 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."User" (
"id" SERIAL,
"firstName" text  NOT NULL ,
"lastName" text  NOT NULL ,
PRIMARY KEY ("id"))

CREATE TABLE "public"."Comment" (
"id" SERIAL,
"text" text  NOT NULL ,
"authorId" integer   ,
"postId" integer   ,
PRIMARY KEY ("id"))

ALTER TABLE "public"."Post" ADD COLUMN "authorId" integer   ;

ALTER TABLE "public"."Comment" ADD FOREIGN KEY ("authorId")REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."Comment" ADD FOREIGN KEY ("postId")REFERENCES "public"."Post"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."Post" ADD FOREIGN KEY ("authorId")REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200817173502-prisma-app..20200818022340-test-app
--- datamodel.dml
+++ datamodel.dml
@@ -2,17 +2,35 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
 }
+model User {
+  id        Int     @id @default(autoincrement())
+  firstName String
+  lastName  String
+  posts     Post[]
+  comments  Comment[]
+}
+
 model Post {
   id        Int     @id @default(autoincrement())
   title     String
   body      String
   published Boolean
+  comments  Comment[]
+  authorId  Int? 
+  author    User? @relation(fields: [authorId], references: [id])
+}
+
+model Comment {
+  id        Int     @id @default(autoincrement())
+  text      String
+  authorId  Int? 
+  author    User? @relation(fields: [authorId], references: [id])
 }
```


