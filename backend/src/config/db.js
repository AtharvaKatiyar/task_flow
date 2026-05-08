import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
    connectionString,
});

const adapter = new PrismaPg(pool);

const globalForPrisma = globalThis;

const prisma = globalForPrisma.prisma || new PrismaClient({
    adapter,
    log: ['query', 'error', 'warn'],
});

if(process.env.NODE_ENV === 'development') {
    globalForPrisma.prisma = prisma;
}

export { prisma };