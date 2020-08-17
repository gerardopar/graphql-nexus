import { schema } from 'nexus';
import { db } from './db';
import { use } from 'nexus';
import { prisma } from 'nexus-plugin-prisma';

use(prisma());

schema.addToContext(() => {
    return {
        db
    }
});