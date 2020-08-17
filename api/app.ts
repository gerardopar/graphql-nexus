// import { schema } from 'nexus'; // commented out to replace the mock -> db with the real postgres db
// import { db } from './db'; // commented out to replace the mock -> db with the real postgres db
import { use } from 'nexus'; 
import { prisma } from 'nexus-plugin-prisma'; // prisma plugin 

use(prisma()); // initialize prisma plugin

// schema.addToContext(() => { // commented out to replace the mock -> db with the real postgres db
//     return {
//         db
//     }
// });