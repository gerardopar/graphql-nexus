# Migration `20200817173502-prisma-app`

This migration has been generated by Gerardo Paredes at 8/17/2020, 10:35:02 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."Post" (
"id" SERIAL,
"title" text  NOT NULL ,
"body" text  NOT NULL ,
"published" boolean  NOT NULL ,
PRIMARY KEY ("id"))
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200817173502-prisma-app
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,18 @@
+// This is your Prisma schema file,
+// learn more about it in the docs: https://pris.ly/d/prisma-schema
+
+datasource db {
+  provider = "postgresql"
+  url = "***"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model Post {
+  id        Int     @id @default(autoincrement())
+  title     String
+  body      String
+  published Boolean
+}
```

