import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const promisesData = [
  {
    "title": "Establish Ministry of Artificial Intelligence",
    "category": "Governance",
    "status": "Not Started",
    "source": "TVK 2026 Manifesto",
    "last_updated": "2026-05-05"
  },
  {
    "title": "Issue Citizen Privilege Card & Super App for Welfare Delivery",
    "category": "Governance",
    "status": "Not Started",
    "source": "TVK 2026 Manifesto",
    "last_updated": "2026-05-05"
  },
  {
    "title": "Launch Dashboard for Accountable Governance",
    "category": "Governance",
    "status": "Not Started",
    "source": "TVK 2026 Manifesto",
    "last_updated": "2026-05-05"
  },
  {
    "title": "Enact Right to Service Act for Time-Bound Delivery",
    "category": "Governance",
    "status": "Not Started",
    "source": "TVK 2026 Manifesto",
    "last_updated": "2026-05-05"
  },
  {
    "title": "Launch Makkal Arangam Digital Petition Platform",
    "category": "Governance",
    "status": "Not Started",
    "source": "TVK 2026 Manifesto",
    "last_updated": "2026-05-05"
  },
  {
    "title": "Allocate 10% of District Funds for Participatory Budgeting",
    "category": "Governance",
    "status": "Not Started",
    "source": "TVK 2026 Manifesto",
    "last_updated": "2026-05-05"
  },
  {
    "title": "Establish Secretariat Branch in Madurai",
    "category": "Governance",
    "status": "Not Started",
    "source": "TVK 2026 Manifesto",
    "last_updated": "2026-05-05"
  },
  {
    "title": "Provide ₹2,500 Monthly to Women Heads of Family",
    "category": "Women's Welfare",
    "status": "Not Started",
    "source": "TVK 2026 Manifesto",
    "last_updated": "2026-05-05"
  },
  {
    "title": "Free State Bus Travel for All Women",
    "category": "Women's Welfare",
    "status": "Not Started",
    "source": "TVK 2026 Manifesto",
    "last_updated": "2026-05-05"
  },
  {
    "title": "Distribute 6 Free LPG Cylinders Annually",
    "category": "Women's Welfare",
    "status": "Not Started",
    "source": "TVK 2026 Manifesto",
    "last_updated": "2026-05-05"
  },
  {
    "title": "Provide Baby Welcome Kit & Gold Ring to New Mothers",
    "category": "Women's Welfare",
    "status": "Not Started",
    "source": "TVK 2026 Manifesto",
    "last_updated": "2026-05-05"
  },
  {
    "title": "₹15,000 Annual Education Grant for Mothers of Schoolgirls",
    "category": "Women's Welfare",
    "status": "Not Started",
    "source": "TVK 2026 Manifesto",
    "last_updated": "2026-05-05"
  },
  {
    "title": "Provide 8g Gold & Silk Saree to Indigent Brides",
    "category": "Women's Welfare",
    "status": "Not Started",
    "source": "TVK 2026 Manifesto",
    "last_updated": "2026-05-05"
  },
  {
    "title": "Provide ₹25,000 Maternity Assistance",
    "category": "Women's Welfare",
    "status": "Not Started",
    "source": "TVK 2026 Manifesto",
    "last_updated": "2026-05-05"
  },
  {
    "title": "Offer ₹5 Lakh Interest-Free Loans for Women's SHGs",
    "category": "Women's Welfare",
    "status": "Not Started",
    "source": "TVK 2026 Manifesto",
    "last_updated": "2026-05-05"
  },
  {
    "title": "Establish 500 Rani Velunachiyar Padai Women Police Groups",
    "category": "Security",
    "status": "Not Started",
    "source": "TVK 2026 Manifesto",
    "last_updated": "2026-05-05"
  },
  {
    "title": "Install Panic Buttons in Public Transport (5-Min Response)",
    "category": "Security",
    "status": "Not Started",
    "source": "TVK 2026 Manifesto",
    "last_updated": "2026-05-05"
  },
  {
    "title": "Set Up Anjalai Ammal Fasttrack Courts for Crimes Against Women",
    "category": "Justice",
    "status": "Not Started",
    "source": "TVK 2026 Manifesto",
    "last_updated": "2026-05-05"
  },
  {
    "title": "Move Education to State List & Abolish NEET",
    "category": "Education",
    "status": "Not Started",
    "source": "TVK 2026 Manifesto",
    "last_updated": "2026-05-05"
  },
  {
    "title": "Provide Collateral-Free Education Loans Up to ₹20 Lakh",
    "category": "Education",
    "status": "Not Started",
    "source": "TVK 2026 Manifesto",
    "last_updated": "2026-05-05"
  },
  {
    "title": "Establish 100 Kamarajar Special Residential Schools",
    "category": "Education",
    "status": "Not Started",
    "source": "TVK 2026 Manifesto",
    "last_updated": "2026-05-05"
  },
  {
    "title": "Provide ₹10,000/mo Upskilling Stipend for Graduates",
    "category": "Youth",
    "status": "Not Started",
    "source": "TVK 2026 Manifesto",
    "last_updated": "2026-05-05"
  },
  {
    "title": "Provide ₹4,000/mo Unemployment Allowance for Graduates",
    "category": "Youth",
    "status": "Not Started",
    "source": "TVK 2026 Manifesto",
    "last_updated": "2026-05-05"
  },
  {
    "title": "Create 5 Lakh New Government Jobs",
    "category": "Employment",
    "status": "Not Started",
    "source": "TVK 2026 Manifesto",
    "last_updated": "2026-05-05"
  },
  {
    "title": "Hire 500,000 CM People Service Associates at ₹18,000/mo",
    "category": "Employment",
    "status": "Not Started",
    "source": "TVK 2026 Manifesto",
    "last_updated": "2026-05-05"
  },
  {
    "title": "GST & Electricity Incentives for Hiring 75% Locals",
    "category": "Economy",
    "status": "Not Started",
    "source": "TVK 2026 Manifesto",
    "last_updated": "2026-05-05"
  },
  {
    "title": "Offer ₹25 Lakh Business Loans for Young Entrepreneurs",
    "category": "Economy",
    "status": "Not Started",
    "source": "TVK 2026 Manifesto",
    "last_updated": "2026-05-05"
  },
  {
    "title": "Develop AI City, AI University, & Innovation Hubs",
    "category": "Technology",
    "status": "Not Started",
    "source": "TVK 2026 Manifesto",
    "last_updated": "2026-05-05"
  },
  {
    "title": "Establish ₹15,000 Crore Credit Guarantee Fund for MSMEs",
    "category": "Industry",
    "status": "Not Started",
    "source": "TVK 2026 Manifesto",
    "last_updated": "2026-05-05"
  },
  {
    "title": "Provide 5-Year Electricity Tax Waiver for MSMEs",
    "category": "Industry",
    "status": "Not Started",
    "source": "TVK 2026 Manifesto",
    "last_updated": "2026-05-05"
  },
  {
    "title": "Guarantee All Business Licenses Issued Within 21 Days",
    "category": "Industry",
    "status": "Not Started",
    "source": "TVK 2026 Manifesto",
    "last_updated": "2026-05-05"
  },
  {
    "title": "Provide ₹30,000/year Price Offset Grant for Weavers",
    "category": "Industry",
    "status": "Not Started",
    "source": "TVK 2026 Manifesto",
    "last_updated": "2026-05-05"
  },
  {
    "title": "Full Crop Loan Waiver for Farmers (<5 Acres)",
    "category": "Agriculture",
    "status": "Not Started",
    "source": "TVK 2026 Manifesto",
    "last_updated": "2026-05-05"
  },
  {
    "title": "Guarantee MSP: ₹3,500 Paddy / ₹4,500 Sugarcane",
    "category": "Agriculture",
    "status": "Not Started",
    "source": "TVK 2026 Manifesto",
    "last_updated": "2026-05-05"
  },
  {
    "title": "Issue Cultivator Rights Card with ₹10,000 Annual Support",
    "category": "Agriculture",
    "status": "Not Started",
    "source": "TVK 2026 Manifesto",
    "last_updated": "2026-05-05"
  },
  {
    "title": "Ensure 100% Crop Insurance Coverage",
    "category": "Agriculture",
    "status": "Not Started",
    "source": "TVK 2026 Manifesto",
    "last_updated": "2026-05-05"
  },
  {
    "title": "Increase Fishing Ban Relief to ₹20,000 & ₹7,000 Monsoon Aid",
    "category": "Fisheries",
    "status": "Not Started",
    "source": "TVK 2026 Manifesto",
    "last_updated": "2026-05-05"
  },
  {
    "title": "Provide ₹25 Lakh Accident Insurance for Fishermen",
    "category": "Fisheries",
    "status": "Not Started",
    "source": "TVK 2026 Manifesto",
    "last_updated": "2026-05-05"
  },
  {
    "title": "Implement ₹25 Lakh Universal Family Health Insurance",
    "category": "Healthcare",
    "status": "Not Started",
    "source": "TVK 2026 Manifesto",
    "last_updated": "2026-05-05"
  },
  {
    "title": "Build 5 Multi-Specialty Hospitals & 2,000 Tele-Clinics",
    "category": "Healthcare",
    "status": "Not Started",
    "source": "TVK 2026 Manifesto",
    "last_updated": "2026-05-05"
  },
  {
    "title": "Allocate ₹500 Crore Annually for Mental Health",
    "category": "Healthcare",
    "status": "Not Started",
    "source": "TVK 2026 Manifesto",
    "last_updated": "2026-05-05"
  },
  {
    "title": "Provide Free IVF Treatment & Free Sanitary Pads",
    "category": "Healthcare",
    "status": "Not Started",
    "source": "TVK 2026 Manifesto",
    "last_updated": "2026-05-05"
  },
  {
    "title": "Provide 200 Units Free Electricity & Monthly Billing",
    "category": "Infrastructure",
    "status": "Not Started",
    "source": "TVK 2026 Manifesto",
    "last_updated": "2026-05-05"
  },
  {
    "title": "Offer Up to ₹1 Lakh Subsidy for Rooftop Solar",
    "category": "Environment",
    "status": "Not Started",
    "source": "TVK 2026 Manifesto",
    "last_updated": "2026-05-05"
  },
  {
    "title": "Mission Chennai: Restore Cooum, Adyar, & Pallikaranai",
    "category": "Environment",
    "status": "Not Started",
    "source": "TVK 2026 Manifesto",
    "last_updated": "2026-05-05"
  },
  {
    "title": "Ensure All Future TNSTC Bus Purchases are EVs",
    "category": "Infrastructure",
    "status": "Not Started",
    "source": "TVK 2026 Manifesto",
    "last_updated": "2026-05-05"
  }

];

async function main() {
  console.log(`Start seeding...`);
  
  // Clear existing data to avoid duplicates if you run this multiple times
  await prisma.promise.deleteMany(); 
  
  // Insert all the new promises
  const result = await prisma.promise.createMany({
    data: promisesData.map(p => ({
      title: p.title,
      category: p.category,
      status: p.status,
      source: p.source,
      // Prisma expects a standard DateTime object, so we convert the string
      last_updated: new Date(p.last_updated) 
    })),
    skipDuplicates: true,
  });

  console.log(`Seeding finished. Inserted ${result.count} promises.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });