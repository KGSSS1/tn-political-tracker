import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // 1. ALWAYS FETCH FROM API TO BURN CREDITS & GET NEW DATA
    const API_KEY = process.env.NEWS_API_KEY; 
    const query = encodeURIComponent('"Tamil Nadu" AND ("Vijay" OR "TVK" OR "Politics")');
    const url = `https://newsdata.io/api/1/news?apikey=${API_KEY}&q=${query}&language=en&country=in`;
    
    // We remove the Next.js cache so this route ALWAYS runs when called
    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok) throw new Error("Failed to fetch from NewsData.io");
    
    const data = await response.json();

    // 2. PREPARE THE 10 NEWEST ARTICLES
    const newsToInsert = data.results.map((article: any) => ({
      title: article.title,
      description: article.description?.substring(0, 250) + "..." || "Read the full article for more details...",
      source_link: article.link,
    }));

    // 3. BULK INSERT (IGNORE DUPLICATES)
    // skipDuplicates ensures that if the link already exists in the DB, it just skips it without crashing
    await prisma.news.createMany({ 
      data: newsToInsert,
      skipDuplicates: true 
    });

    // 4. RETURN THE 10 MOST RECENT ARTICLES FROM YOUR DATABASE ARCHIVE
    const archiveNews = await prisma.news.findMany({ 
      orderBy: { id: 'desc' }, 
      take: 10 
    });

    const formattedArchive = archiveNews.map(article => ({
        ...article,
        date: new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    }));

    return NextResponse.json(formattedArchive);

  } catch (error) {
    console.error("News API Error:", error);
    return NextResponse.json({ error: "Failed to harvest news." }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}