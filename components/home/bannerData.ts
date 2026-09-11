export type Banner = {
  id: number;
  title: string;
  highlight: string;
  description: string;
  image: string;
  buttonText?: string;
  buttonLink?: string;
};

export const banners: Banner[] = [
  {
    id: 1,
    title: "शिक्षा के साथ",
    highlight: "संस्कार और अनुशासन",
    description:
      "विद्यार्थियों के उज्ज्वल भविष्य और सर्वांगीण विकास के लिए गुणवत्तापूर्ण शिक्षा का प्रयास।",
    image:
      "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1800&q=85",
    buttonText: "विद्यालय के बारे में",
    buttonLink: "/about",
  },
  {
    id: 2,
    title: "ज्ञान, संस्कार और",
    highlight: "उज्ज्वल भविष्य",
    description:
      "एक ऐसा शैक्षणिक वातावरण जहाँ विद्यार्थी ज्ञान के साथ आत्मविश्वास और जिम्मेदारी भी सीखते हैं।",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1800&q=85",
    buttonText: "शैक्षणिक जानकारी",
    buttonLink: "/academics",
  },
  {
    id: 3,
    title: "अपने बच्चे के लिए",
    highlight: "बेहतर भविष्य चुनें",
    description:
      "शिक्षा, संस्कार और अनुशासन के मजबूत आधार के साथ अपने बच्चे को आगे बढ़ने का अवसर दें।",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1800&q=85",
    buttonText: "प्रवेश जानकारी",
    buttonLink: "/admission",
  },
];