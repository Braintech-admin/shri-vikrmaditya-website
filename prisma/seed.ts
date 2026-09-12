import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST!,
  port: Number(process.env.DATABASE_PORT || 3306),
  user: process.env.DATABASE_USER!,
  password: process.env.DATABASE_PASSWORD || "",
  database: process.env.DATABASE_NAME!,
  connectionLimit: 5,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Starting database seed...");

  // --------------------------------------------------
  // 1. NEWS CATEGORIES
  // --------------------------------------------------

  const newsCategories = [
    "प्रवेश",
    "शैक्षणिक",
    "महत्वपूर्ण सूचना",
    "सांस्कृतिक",
    "खेलकूद",
    "अभिभावक",
    "अन्य",
  ];

  for (const [index, name] of newsCategories.entries()) {
    await prisma.newsCategory.upsert({
      where: { name },
      update: {
        isActive: true,
        sortOrder: index + 1,
      },
      create: {
        name,
        isActive: true,
        sortOrder: index + 1,
      },
    });
  }

  console.log("✅ News categories seeded");


  // --------------------------------------------------
  // 2. GALLERY CATEGORIES
  // --------------------------------------------------

  const galleryCategories = [
    "विद्यालय परिसर",
    "शैक्षणिक गतिविधियाँ",
    "सांस्कृतिक कार्यक्रम",
    "खेलकूद",
    "वार्षिक समारोह",
    "अन्य कार्यक्रम",
  ];

  for (const [index, name] of galleryCategories.entries()) {
    await prisma.galleryCategory.upsert({
      where: { name },
      update: {
        isActive: true,
        sortOrder: index + 1,
      },
      create: {
        name,
        isActive: true,
        sortOrder: index + 1,
      },
    });
  }

  console.log("✅ Gallery categories seeded");


  // --------------------------------------------------
  // 3. SITE SETTINGS
  // --------------------------------------------------

  const existingSiteSetting = await prisma.siteSetting.findFirst();

  if (existingSiteSetting) {
    await prisma.siteSetting.update({
      where: {
        id: existingSiteSetting.id,
      },
      data: {
        schoolName: "Shri Vikramaditya Inter College",
        schoolNameHindi: "श्री विक्रमादित्य इंटर कॉलेज",
        address: "बरौली कर्मा, कौंधियरा, प्रयागराज",
        email: "vikramadityap20@gmail.com",
        managerPhone: "8009707183",
        principalPhone: "8795690972",
        inquiryPhone: "9580548475",
        establishedYear: 2018,
        motto: "शिक्षा • संस्कार • अनुशासन",
        logo: "/school-logo.png",
        websiteEnabled: true,
      },
    });
  } else {
    await prisma.siteSetting.create({
      data: {
        schoolName: "Shri Vikramaditya Inter College",
        schoolNameHindi: "श्री विक्रमादित्य इंटर कॉलेज",
        address: "बरौली कर्मा, कौंधियरा, प्रयागराज",
        email: "vikramadityap20@gmail.com",
        managerPhone: "8009707183",
        principalPhone: "8795690972",
        inquiryPhone: "9580548475",
        establishedYear: 2018,
        motto: "शिक्षा • संस्कार • अनुशासन",
        logo: "/school-logo.png",
        websiteEnabled: true,
      },
    });
  }

  console.log("✅ Site settings seeded");


  // --------------------------------------------------
  // 4. INITIAL ADMIN USERS
  // --------------------------------------------------

  const superAdminUsername = process.env.SUPER_ADMIN_USERNAME;
  const superAdminPassword = process.env.SUPER_ADMIN_PASSWORD;

  const websiteAdminUsername = process.env.WEBSITE_ADMIN_USERNAME;
  const websiteAdminPassword = process.env.WEBSITE_ADMIN_PASSWORD;

  if (
    !superAdminUsername ||
    !superAdminPassword ||
    !websiteAdminUsername ||
    !websiteAdminPassword
  ) {
    throw new Error(
      "❌ Admin credentials are missing. Please check your .env file."
    );
  }


  // --------------------------------------------------
  // SUPER ADMIN
  // --------------------------------------------------

  const superAdminPasswordHash = await bcrypt.hash(
    superAdminPassword,
    12
  );

  await prisma.user.upsert({
    where: {
      username: superAdminUsername,
    },
    update: {
      name: "Super Admin",
      role: "SUPER_ADMIN",
      isActive: true,
    },
    create: {
      name: "Super Admin",
      username: superAdminUsername,
      passwordHash: superAdminPasswordHash,
      role: "SUPER_ADMIN",
      isActive: true,
    },
  });

  console.log("✅ Super Admin created/updated");


  // --------------------------------------------------
  // WEBSITE ADMIN
  // --------------------------------------------------

  const websiteAdminPasswordHash = await bcrypt.hash(
    websiteAdminPassword,
    12
  );

  await prisma.user.upsert({
    where: {
      username: websiteAdminUsername,
    },
    update: {
      name: "Website Admin",
      role: "WEBSITE_ADMIN",
      isActive: true,
    },
    create: {
      name: "Website Admin",
      username: websiteAdminUsername,
      passwordHash: websiteAdminPasswordHash,
      role: "WEBSITE_ADMIN",
      isActive: true,
    },
  });

  console.log("✅ Website Admin created/updated");

  console.log("");
  console.log("🎉 Database seed completed successfully!");
  console.log("");
}

main()
  .catch((error) => {
    console.error("❌ Seed failed:");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });