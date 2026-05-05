import { NextResponse } from 'next/server';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, Promise as PromiseModel } from '@prisma/client';

// 1. Set up the connection pool
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });

// 2. Pass the pool to the Prisma adapter
const adapter = new PrismaPg(pool);

// 3. Initialize Prisma with the adapter
const prisma = new PrismaClient({ adapter });

export async function GET() {
  try {
    const promises = await prisma.promise.findMany({
      orderBy: { last_updated: 'desc' }
    });

    const formattedPromises = promises.map((p: PromiseModel) => ({
      ...p,
      last_updated: new Date(p.last_updated).toLocaleDateString('en-CA')
    }));

    return NextResponse.json(formattedPromises);
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Failed to fetch promises." }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}