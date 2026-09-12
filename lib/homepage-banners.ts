import { prisma } from "@/lib/prisma";
import type { HeroBanner } from "@/components/home/HeroSlider";
import { unstable_noStore } from "next/cache";

const fallbackBanners: HeroBanner[] = [
  {
    id: "fallback-1",
    title: "शिक्षा से",
    highlight: "उज्ज्वल भविष्य",
    description:
      "श्री विक्रमादित्य इंटर कॉलेज विद्यार्थियों के सर्वांगीण विकास, अनुशासन और गुणवत्तापूर्ण शिक्षा के लिए प्रतिबद्ध है।",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1920&q=85",
  },
  {
    id: "fallback-2",
    title: "ज्ञान, अनुशासन और",
    highlight: "संस्कार",
    description:
      "हमारा उद्देश्य विद्यार्थियों को आधुनिक शिक्षा के साथ बेहतर संस्कार और जिम्मेदार नागरिक बनने की प्रेरणा देना है।",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1920&q=85",
  },
  {
    id: "fallback-3",
    title: "आपके बच्चे के",
    highlight: "बेहतर कल की ओर",
    description:
      "सीखने के अनुकूल वातावरण, समर्पित शिक्षकों और निरंतर मार्गदर्शन के साथ विद्यार्थियों के भविष्य को मजबूत बनाना।",
    image:
      "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1920&q=85",
  },
];

export async function getHomepageBanners(): Promise<HeroBanner[]> {
  unstable_noStore();

  try {
    const dbBanners = await prisma.banner.findMany({
      where: {
        isPublished: true,
      },
      orderBy: [
        {
          sortOrder: "asc",
        },
        {
          id: "asc",
        },
      ],
      select: {
        id: true,
        title: true,
        highlight: true,
        description: true,
        image: true,
        buttonText: true,
        buttonLink: true,
      },
    });

    if (dbBanners.length > 0) {
      return dbBanners;
    }

    return fallbackBanners;
  } catch (error) {
    console.error("Homepage banner fetch error:", error);

    return fallbackBanners;
  }
}