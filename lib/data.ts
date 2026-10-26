import { type Product } from "./schemas/product";
import { type SiteSettings } from "./schemas/settings";

/**
 * Global Brand Identity & Static Atelier Specifications
 * Central source of truth for all brand copy, contacts, locations, and metadata.
 */
export const BRAND = {
  name: "Amara Gold",
  legalName: "Amara Gold Private Limited",
  shortName: "Amara Gold",
  tagline: "Eternal Purity in Sovereign 916 Gold",
  subtitle: "Kochi • Kozhikode • Thrissur • Dubai",
  fullSubtitle: "Amara Gold • Kerala & UAE • Established 1993",
  establishedYear: 1993,
  establishedText: "Established 1993 • Kerala & UAE",

  description:
    "Explore exquisite 916 sovereign gold, certified natural diamonds, and bridal trousseau collections handcrafted across Kerala and Dubai.",
  heroHeadline: ["Eternal Beauty,", "Sculpted in 916 Gold."],
  heroDescription:
    "Handcrafted by hereditary master goldsmiths in Thrissur and Kozhikode with BIS 916 sovereign gold, certified VVS diamonds, and royal Travancore emeralds.",
  collectionsDescription:
    "Explore Amara Gold's signature 916 sovereign gold and diamond collections — bridal Kasavu filigree kadas, solitaire rings, and ceremonial Travancore Palakka emerald sets.",
  consultationDescription:
    "Schedule a private appointment at our bridal viewing suites in Kochi, Kozhikode, Thrissur, or Dubai for bespoke wedding trousseau and diamond jewellery.",
  adminPortalDescription:
    "Internal atelier production CMS, vault inventory controls, and private consultation inquiries.",
  announcement:
    "Complimentary insured armored delivery across Kerala, the UAE & worldwide private salons",

  currency: "INR",
  url: "https://amaragold.com",

  contact: {
    email: "concierge@amaragold.com",
    phone: "+91 484 238 9000",
    phoneDisplay: "+91 (484) 238-9000",
    adminEmail: "director@amaragold.com",
    adminDefaultPassword: "AtelierDirector2026!",
  },

  headquarters: {
    street: "Marine Drive Pavilion, Shanmugham Road",
    city: "Kochi",
    postalCode: "682031",
    country: "India",
    district: "Marine Drive, Ernakulam",
    fullAddress: "Marine Drive Pavilion, Shanmugham Road, Kochi 682031, Kerala, India",
  },

  cities: ["Kochi", "Kozhikode", "Thrissur", "Dubai"],
  citiesSummary: "Kochi • Kozhikode • Thrissur • Dubai",

  salons: [
    {
      id: "kochi",
      name: "Amara Gold Marine Drive Salon",
      city: "Kochi",
      district: "Marine Drive",
      address: "Marine Drive Pavilion, Shanmugham Road, Kochi 682031",
      phone: "+91 484 238 9000",
      telHref: "tel:+914842389000",
      schedule: "Monday – Sunday • 10:00 AM – 8:30 PM",
      ctaLabel: "Request Kochi Salon",
      callCtaLabel: "Call Kochi Concierge",
    },
    {
      id: "kozhikode",
      name: "Amara Gold Calicut Flagship Atelier",
      city: "Kozhikode",
      district: "Mavoor Road",
      address: "Amara House, Mavoor Road, Kozhikode 673001, Kerala",
      phone: "+91 495 276 4400",
      telHref: "tel:+914952764400",
      schedule: "Monday – Saturday • Master Bench Viewing",
      ctaLabel: "Request Calicut Atelier",
      callCtaLabel: "Call Calicut Concierge",
    },
    {
      id: "thrissur",
      name: "Amara Gold Swarna Salon",
      city: "Thrissur",
      district: "Round West",
      address: "18 Round West, Thrissur 680001, Kerala",
      phone: "+91 487 242 1100",
      telHref: "tel:+914872421100",
      schedule: "Tuesday – Sunday • Bridal Trousseau Lounge",
      ctaLabel: "Request Thrissur Salon",
      callCtaLabel: "Call Thrissur Concierge",
    },
    {
      id: "dubai",
      name: "Amara Gold Dubai DIFC Private Salon",
      city: "Dubai",
      district: "DIFC Gate Precinct",
      address: "Gate Precinct 4, DIFC, Dubai, United Arab Emirates",
      phone: "+971 4 362 7000",
      telHref: "tel:+97143627000",
      schedule: "Daily • Dedicated Amara Gold Concierge",
      ctaLabel: "Request Dubai Salon",
      callCtaLabel: "Call Dubai Concierge",
    },
  ],

  certifications: [
    {
      id: "bis-916",
      name: "BIS 916 Sovereign Hallmark",
      shortName: "BIS 916",
      organization: "Bureau of Indian Standards",
      description:
        "Every gram of gold is certified 22k (91.6% purity) and laser-engraved with government HUID.",
    },
    {
      id: "gia-natural",
      name: "GIA Natural Diamond Dossier",
      shortName: "GIA",
      organization: "Gemological Institute of America",
      description:
        "Each solitaire diamond is accompanied by a full GIA dossier confirming natural Earth origin, cut grade, and clarity.",
    },
    {
      id: "igi-natural",
      name: "IGI Gemological Verification",
      shortName: "IGI",
      organization: "International Gemological Institute",
      description:
        "Comprehensive grading report verifying untreated VVS natural diamonds and colored gemstones.",
    },
  ],

  clientProtocols: [
    {
      id: "protocol-1",
      question: "How do I schedule a private bridal trousseau viewing?",
      answer:
        "Private viewing suites in Kochi, Kozhikode, Thrissur, or Dubai are arranged exclusively through our direct concierge. Each two-hour consultation includes a personal senior gemologist and high-magnification optical inspection bench.",
    },
    {
      id: "protocol-2",
      question: "What is the timeline for bespoke wedding commissions?",
      answer:
        "Bespoke creations require six to eight weeks from initial design rendering to final BIS 916 hallmarking, with weekly progress dossiers and wax maquettes presented to the patron.",
    },
    {
      id: "protocol-3",
      question: "What certifications accompany Amara Gold jewelry?",
      answer:
        "All gold is officially stamped with the Bureau of Indian Standards (BIS 916 Hallmark) along with the unique HUID code. All solitaire diamonds include comprehensive laboratory reports from GIA (Gemological Institute of America) or IGI.",
    },
    {
      id: "protocol-4",
      question: "How is delivery arranged across Kerala and the UAE?",
      answer:
        "All private commissions can be collected in person at any of our Kerala or Dubai viewing lounges, or dispatched via armored logistics with 100% door-to-door insurance directly to your residence.",
    },
  ],

  museumProvenance: {
    title: "Amara Gold Royal Kerala Archival Dossier",
    summary:
      "All Amara Gold creations are accompanied by independent laboratory dossiers from GIA and IGI, verifying natural untreated gemstone origin, BIS 916 gold purity, and ethical Kimberley Process compliance.",
  },

  trustBadges: [
    "BIS 916 Sovereign Gold Hallmarked",
    "GIA & IGI Master Verified Diamonds",
  ],

  governance: [
    "BIS 916 Sovereign Hallmark Guarantee",
    "Dual Lab Certification (GIA & IGI)",
    "Kimberley Process Ethical Sourcing",
    "100% Insured Armored Global Logistics",
  ],

  editorialNotes: [
    {
      title: "Hereditary Thrissur Goldsmiths",
      description:
        "Every Kada and Kasavu necklace is hand-carved by multi-generational master craftsmen using traditional Indian high jewellery techniques.",
    },
    {
      title: "Uncompromising 916 Purity",
      description:
        "Each gram of gold is tested and certified 22k with laser-engraved HUID government hallmarks for complete authenticity.",
    },
    {
      title: "Natural Untreated Gemstones",
      description:
        "We source only untreated natural gemstones accompanied by full gemological passports from GIA, SSEF, or IGI.",
    },
  ],

  seo: {
    keywords: [
      "amara gold",
      "amara gold jewelry",
      "amara gold kochi",
      "kerala jewelry",
      "kochi fine jewelry",
      "thrissur gold",
      "calicut gold",
      "travancore palakka",
      "916 sovereign gold",
      "bridal trousseau kerala",
      "dubai fine jewellery",
    ],
    defaultTitle: "Amara Gold | Eternal Purity in Sovereign 916 Gold",
    titleTemplate: "%s | Amara Gold",
    homeTitle: "Amara Gold | Kerala Fine Jewellery & Certified Diamonds",
    collectionsTitle: "Fine Jewellery Collections | Amara Gold",
    consultationTitle: "Private Salon Consultation | Amara Gold",
    aboutTitle: "Our Heritage & Lineage • Established 1993 | Amara Gold",
    aboutDescription: "Over three decades of hereditary Thrissur goldsmith lineage, BIS 916 sovereign hallmarking, and royal Kerala fine jewellery across Kochi, Calicut, Thrissur, and Dubai.",
    termsTitle: "Terms of Service & Atelier Governance",
    privacyTitle: "Privacy Policy & Client Data Discretion",
    adminTitle: "Atelier Management | Amara Gold",
    termsDescription: "Official terms of service, bespoke commission protocols, insured armored transit, and dual gemological certification standards at Amara Gold.",
    privacyDescription: "Client data discretion and privacy policy governed by strict confidentiality standards at Amara Gold.",
    ogImageAlt: "Amara Gold | Eternal Purity in Sovereign 916 Gold",
  },
} as const;

export type BrandDetails = typeof BRAND;

/**
 * Live Benchmark Kerala Daily Gold Rates
 * Standard benchmark observed across Thrissur, Kochi, and Kozhikode bullion associations.
 */
export const DAILY_GOLD_RATES = {
  gold22kPerGram: 6885,
  gold22kPerPavan: 55080, // 8 grams = 1 sovereign / pavan
  gold24kPerGram: 7510,
  gold18kPerGram: 5635,
  silverPerGram: 98,
  change22k: "+₹15",
  isPositive: true,
  lastUpdated: "Today, 10:30 AM IST",
  marketLocation: "Kerala Bullion & Thrissur Association Benchmark",
} as const;

/**
 * Traditional Kerala Jewelry Categories & Taxonomy
 */
export const KERALA_CATEGORIES = [
  {
    title: "Bridal Harams & Malas",
    subtitle: "Manga Mala, Palakka & Kasu Malas",
    pavanRange: "4 – 25 Pavans (32g – 200g)",
    href: "/collections?category=Bridal+Harams+%26+Malas",
    image: "https://res.cloudinary.com/dunh3j6yu/image/upload/v1792967200/etoile-atelier/manga-maala-diamond-sautoir.jpg",
  },
  {
    title: "Kasavu Kadas & Bangles",
    subtitle: "Solid 22K Sculpted Openwork Filigree",
    pavanRange: "2 – 8 Pavans per pair (16g – 64g)",
    href: "/collections?category=Kasavu+Kadas+%26+Bangles",
    image: "https://res.cloudinary.com/dunh3j6yu/image/upload/v1792877319/etoile-atelier/aura-sculpted-diamond-cuff.jpg",
  },
  {
    title: "Heritage Palakka & Temple",
    subtitle: "Travancore Royal Cabochon Emeralds",
    pavanRange: "3 – 12 Pavans (24g – 96g)",
    href: "/collections?category=Heritage+Palakka+%26+Temple",
    image: "https://res.cloudinary.com/dunh3j6yu/image/upload/v1792877320/etoile-atelier/verdant-colombian-emerald-drops.jpg",
  },
  {
    title: "Diamond Solitaires",
    subtitle: "Certified Natural VVS Solitaires & Bands",
    pavanRange: "18K Gold & Platinum 950",
    href: "/collections?category=Diamond+Solitaires",
    image: "https://res.cloudinary.com/dunh3j6yu/image/upload/v1792877317/etoile-atelier/solitaire-lumina-diamond-ring.jpg",
  },
  {
    title: "Jimikkis & Earrings",
    subtitle: "Temple Bell & Royal Kasavu Studs",
    pavanRange: "1.5 – 6 Pavans (12g – 48g)",
    href: "/collections?category=Jimikkis+%26+Earrings",
    image: "https://res.cloudinary.com/dunh3j6yu/image/upload/v1792967199/etoile-atelier/nagapadam-emerald-pendant.jpg",
  },
  {
    title: "Coins & Bullion",
    subtitle: "999 Pure 24K & 916 22K Hallmarked Coins",
    pavanRange: "1g, 4g, 8g (1 Pavan), 20g & 50g",
    href: "/collections?category=Coins+%26+Bullion",
    image: "https://res.cloudinary.com/dunh3j6yu/image/upload/v1792877320/etoile-atelier/constellation-eternity-band.jpg",
  },
] as const;

/**
 * Traditional Kerala Wedding Trousseau Curations
 */
export const BRIDAL_TROUSSEAU_PACKAGES = [
  {
    id: "royal-minimalist",
    name: "Royal Minimalist Trousseau",
    pavanTarget: "25 Pavans (200 Grams)",
    priceEstimate: "₹18,50,000",
    badge: "Contemporary Elegance",
    description: "Curated for intimate ceremonial elegance. Includes a master choker, classic Palakka haram, 4 Kasavu filigree bangles, and matched Jimikkis in BIS 916 sovereign gold.",
    pieces: [
      "Choker Necklace (3 Pavans)",
      "Palakka Long Haram (6 Pavans)",
      "4 Kasavu Bangles (8 Pavans)",
      "Bridal Jimikki Earrings (3 Pavans)",
      "Diamond Solitaire Ring (1 Pavan)",
      "Waist Band / Oddiyanam (4 Pavans)",
    ],
  },
  {
    id: "heritage-travancore",
    name: "Heritage Travancore Trousseau",
    pavanTarget: "50 Pavans (400 Grams)",
    priceEstimate: "₹36,00,000",
    badge: "Most Selected by Kerala Families",
    description: "The classical Kerala wedding grandeur. Layered 4-tier bridal necklace hierarchy from neck to waist, master cuff kada, and traditional bridal head & hip ornaments.",
    pieces: [
      "Elakkathali Choker (4 Pavans)",
      "Mullamottu Mala (8 Pavans)",
      "Manga Maala (10 Pavans)",
      "Nagapada Long Haram (12 Pavans)",
      "6 Heritage Bangles & Kadas (10 Pavans)",
      "Bridal Jimikkis & Maang Tikka (6 Pavans)",
    ],
  },
  {
    id: "imperial-amara",
    name: "Imperial Sovereign Trousseau",
    pavanTarget: "100 Pavans (800 Grams)",
    priceEstimate: "₹72,00,000",
    badge: "Grand Royal Heirloom",
    description: "The pinnacle of South Indian heirloom high jewelry. Hand-sculpted in Thrissur with antique unheated gemstones, syndicated uncut diamonds, and solid 22K Kasavu filigree.",
    pieces: [
      "Padmanabhaswamy Temple Collar (8 Pavans)",
      "Royal Manga Maala (14 Pavans)",
      "Kasu Mala Imperial Sautoir (18 Pavans)",
      "Grand Oddiyanam Waist Belt (20 Pavans)",
      "8 Architectural Kadas & Cuffs (24 Pavans)",
      "Full Bridal Diamond & Emerald Suite (16 Pavans)",
    ],
  },
] as const;

/**
 * Gold Savings & Advance Purchase Scheme
 */
export const GOLD_SAVINGS_SCHEME = {
  name: "Amara Swarna Nidhi",
  tagline: "Monthly Advance Gold Accumulation Plan",
  tenure: "11 Months",
  minMonthlyAmount: "₹5,000",
  benefit1: "100% Making Charge (VA) Discount up to 18% on maturity",
  benefit2: "Complete protection against gold price hikes (Rate locked on every monthly payment)",
  benefit3: "Redeemable across all Kerala salons & Dubai DIFC showroom",
  benefit4: "Zero enrollment charges & digital passbook tracking",
} as const;

export const INITIAL_SETTINGS: SiteSettings = {
  atelierName: BRAND.name,
  tagline: BRAND.tagline,
  announcementBar: BRAND.announcement,
  contactEmail: BRAND.contact.email,
  contactPhone: BRAND.contact.phone,
  currency: BRAND.currency,
  locations: BRAND.salons.map((s) => `${s.city} (${s.district})`),
  heroSlides: [
    {
      id: "couture-emerald-necklace",
      image: "https://res.cloudinary.com/dunh3j6yu/image/upload/v1792971894/etoile-atelier/hero-editorial-couture-emerald.jpg",
      alt: "Amara Gold Haute Joaillerie Emerald & Diamond Collar Necklace in 22K Gold",
      title: "Haute Joaillerie Emerald Collar",
      subtitle: "3.40 ct Royal Zambian Emerald • Natural VVS Diamonds",
      href: "/collections?category=Heritage+Palakka+%26+Temple",
      actionText: "Discover Emerald Collar",
    },
    {
      id: "lumina-solitaire",
      image: "https://res.cloudinary.com/dunh3j6yu/image/upload/v1792971502/etoile-atelier/hero-editorial-solitaire-on-figure.jpg",
      alt: "The Amara Gold Lumina Solitaire Diamond Ring on-figure in 22K Gold and Platinum 950",
      title: "The Amara Gold Lumina Solitaire",
      subtitle: "2.15 ct VVS1 Natural Diamond • Hand-Set in Platinum & 22K Gold",
      href: "/products/amara-gold-lumina-solitaire-ring",
      actionText: "Inspect Lumina Solitaire",
    },
    {
      id: "sculpted-gold-cuff",
      image: "https://res.cloudinary.com/dunh3j6yu/image/upload/v1792971895/etoile-atelier/hero-editorial-sculpted-cuff.jpg",
      alt: "Amara Gold Architectural Sculpted Diamond Cuff Bracelet in Solid 22K Gold",
      title: "Architectural Sculpted Gold Cuff",
      subtitle: "4.20 ctw Brilliant Diamonds • Hand-Formed Solid Gold",
      href: "/collections?category=Kasavu+Kadas+%26+Bangles",
      actionText: "Examine Sculpted Cuff",
    },
  ],
  heroWorkbenchImage: "https://res.cloudinary.com/dunh3j6yu/image/upload/v1792877321/etoile-atelier/artisan-workbench.jpg",
  heroWorkbenchAlt: "Master Goldsmith Bench, Thrissur and Kerala Ateliers",
  heroWorkbenchTitle: "Amara Gold & Thrissur Goldsmith Studio",
  heroWorkbenchSubtitle: "Royal Indian Goldsmith Lineage • Established 1993",
  updatedAt: new Date("2026-01-01"),
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    title: "The Amara Gold Lumina Solitaire Diamond Ring",
    slug: "amara-gold-lumina-solitaire-ring",
    sku: "AMR-RNG-001",
    description: "Sculpted in our Kozhikode atelier, the Amara Gold Lumina elevates a rare 2.15-carat round brilliant-cut natural diamond of exceptional VVS1 clarity. Each prong is sculpted in solid Platinum 950 and 22k sovereign gold to maximize optical dispersion.",
    shortDescription: "2.15ct Flawless VVS1 Solitaire Diamond in sculpted Platinum 950 & 22k sovereign gold micro-pavé.",
    price: 1850000,
    compareAtPrice: 2100000,
    category: "Diamond Solitaires",
    collection: "Amara Solitaire",
    metals: ["Platinum 950", "22k Yellow Gold", "18k White Gold"],
    gemstones: ["Natural Diamond"],
    caratWeight: 2.15,
    clarity: "VVS1",
    cutGrade: "Excellent",
    grossWeightGrams: 8.4,
    netGoldWeightGrams: 7.97,
    pavanWeight: 1.0,
    makingChargePercent: 9.5,
    goldPurity: "Platinum 950 & 22K (916 BIS Hallmarked)",
    huidCode: "KL-916-209B",
    images: [
      {
        url: "https://res.cloudinary.com/dunh3j6yu/image/upload/v1792877317/etoile-atelier/solitaire-lumina-diamond-ring.jpg",
        alt: "The Amara Gold Lumina Solitaire Diamond Ring in solid Platinum 950 and 22k gold",
        isPrimary: true,
      },
    ],
    stockStatus: "in_stock",
    stockQuantity: 3,
    featured: true,
    createdAt: new Date("2026-01-10"),
    updatedAt: new Date("2026-01-10"),
  },
  {
    title: "Amara Gold Nagapadam Emerald & Diamond Pendant",
    slug: "amara-gold-nagapadam-emerald-pendant",
    sku: "AMR-NCK-002",
    description: "Inspired by Travancore royal archives, an untreated 3.40-carat cushion-cut emerald is encircled by graduated pear-cut natural diamonds in a modern reinterpretation of the historic Nagapadam motif, suspended from a 22k gold hand-twisted chain.",
    shortDescription: "3.40ct Royal Zambian Emerald with VVS Diamond halo in 22k Temple Gold.",
    price: 1420000,
    compareAtPrice: null,
    category: "Heritage Palakka & Temple",
    collection: "Heritage Archive",
    metals: ["22k Yellow Gold", "18k White Gold", "Platinum 950"],
    gemstones: ["Zambian Emerald", "Natural Diamond"],
    caratWeight: 3.4,
    clarity: "VVS2",
    cutGrade: "Excellent",
    grossWeightGrams: 28.5,
    netGoldWeightGrams: 24.0,
    pavanWeight: 3.0,
    makingChargePercent: 8.5,
    goldPurity: "22K (916 BIS Hallmarked)",
    huidCode: "KL-916-512D",
    images: [
      {
        url: "https://res.cloudinary.com/dunh3j6yu/image/upload/v1792967199/etoile-atelier/nagapadam-emerald-pendant.jpg",
        alt: "Amara Gold Nagapadam Emerald & Diamond Pendant in 22k Gold",
        isPrimary: true,
      },
    ],
    stockStatus: "in_stock",
    stockQuantity: 2,
    featured: true,
    createdAt: new Date("2026-01-12"),
    updatedAt: new Date("2026-01-12"),
  },
  {
    title: "Kasavu Filigree Diamond Kada",
    slug: "kasavu-filigree-diamond-kada",
    sku: "AMR-BRC-003",
    description: "An architectural solid 22k yellow gold hinged kada featuring 4.20 carats of pavé-set round brilliant F/VS diamonds woven through intricate openwork Kasavu lace filigree, hand-worked in the goldsmith workshops of Thrissur.",
    shortDescription: "4.20ctw Brilliant-Cut Diamonds and Thrissur Kasavu filigree in 22k Sovereign Gold.",
    price: 2450000,
    compareAtPrice: 2700000,
    category: "Kasavu Kadas & Bangles",
    collection: "Kasavu Filigree",
    metals: ["22k Yellow Gold", "18k Yellow Gold", "18k Rose Gold"],
    gemstones: ["Natural Diamond"],
    caratWeight: 4.2,
    clarity: "VS1",
    cutGrade: "Very Good",
    grossWeightGrams: 42.0,
    netGoldWeightGrams: 40.0,
    pavanWeight: 5.0,
    makingChargePercent: 11.0,
    goldPurity: "22K (916 BIS Hallmarked)",
    huidCode: "KL-916-883A",
    images: [
      {
        url: "https://res.cloudinary.com/dunh3j6yu/image/upload/v1792877319/etoile-atelier/aura-sculpted-diamond-cuff.jpg",
        alt: "Kasavu Filigree Diamond Kada in solid 22k yellow gold",
        isPrimary: true,
      },
    ],
    stockStatus: "in_stock",
    stockQuantity: 1,
    featured: true,
    createdAt: new Date("2026-01-15"),
    updatedAt: new Date("2026-01-15"),
  },
  {
    title: "Travancore Royal Palakka Earrings",
    slug: "travancore-royal-palakka-earrings",
    sku: "AMR-EAR-004",
    description: "A regal pair of matched vivid green emerald cabochon drops totaling 5.10 carats, framed by brilliant-cut natural diamonds in sovereign 22k gold bezels, echoing the royal heirloom jewellery of the Travancore Maharajas.",
    shortDescription: "5.10ctw Matched Vivid Green Emeralds and Natural Diamonds in 22k Hallmarked Gold.",
    price: 3200000,
    compareAtPrice: null,
    category: "Jimikkis & Earrings",
    collection: "Heritage Archive",
    metals: ["22k Yellow Gold", "18k Yellow Gold", "Platinum 950"],
    gemstones: ["Zambian Emerald", "Natural Diamond"],
    caratWeight: 5.1,
    clarity: "Minor Oil",
    cutGrade: "Excellent",
    grossWeightGrams: 22.8,
    netGoldWeightGrams: 20.0,
    pavanWeight: 2.5,
    makingChargePercent: 9.0,
    goldPurity: "22K (916 BIS Hallmarked)",
    huidCode: "KL-916-339K",
    images: [
      {
        url: "https://res.cloudinary.com/dunh3j6yu/image/upload/v1792877320/etoile-atelier/verdant-colombian-emerald-drops.jpg",
        alt: "Travancore Royal Palakka Earrings in 22k yellow gold",
        isPrimary: true,
      },
    ],
    stockStatus: "made_to_order",
    stockQuantity: 1,
    featured: true,
    createdAt: new Date("2026-01-18"),
    updatedAt: new Date("2026-01-18"),
  },
  {
    title: "Nilavilakku Star Diamond Eternity Band",
    slug: "nilavilakku-star-diamond-band",
    sku: "AMR-RNG-005",
    description: "A continuous loop of 18 calibrated step-cut diamonds totaling 3.60 carats, set in an open-gallery sovereign gold mounting inspired by the radiating flame geometry of Kerala's sacred Nilavilakku lamps.",
    shortDescription: "3.60ctw Step-Cut Diamond full eternity band in solid 22k Gold and Platinum 950.",
    price: 1680000,
    compareAtPrice: 1950000,
    category: "Diamond Solitaires",
    collection: "Amara Solitaire",
    metals: ["22k Yellow Gold", "Platinum 950", "18k White Gold"],
    gemstones: ["Natural Diamond"],
    caratWeight: 3.6,
    clarity: "VVS2",
    cutGrade: "Excellent",
    grossWeightGrams: 10.2,
    netGoldWeightGrams: 8.0,
    pavanWeight: 1.0,
    makingChargePercent: 10.0,
    goldPurity: "22K (916 BIS Hallmarked) & Plat 950",
    huidCode: "KL-916-741N",
    images: [
      {
        url: "https://res.cloudinary.com/dunh3j6yu/image/upload/v1792877320/etoile-atelier/constellation-eternity-band.jpg",
        alt: "Nilavilakku Star Diamond Eternity Band in 22k gold and Platinum 950",
        isPrimary: true,
      },
    ],
    stockStatus: "in_stock",
    stockQuantity: 4,
    featured: true,
    createdAt: new Date("2026-01-20"),
    updatedAt: new Date("2026-01-20"),
  },
  {
    title: "Amara Gold Manga Maala Diamond Sautoir",
    slug: "amara-gold-manga-maala-sautoir",
    sku: "AMR-NCK-006",
    description: "A ceremonial haute joaillerie transformation of the classical Kerala Manga Maala, setting 6.80 carats of syndicated uncut diamonds within hand-sculpted 22k gold mango paisley pods, anchored by luminous natural pearls.",
    shortDescription: "6.80ctw Uncut Polki Diamonds and Natural South Sea Pearls in 22k Sovereign Gold.",
    price: 2800000,
    compareAtPrice: 3100000,
    category: "Bridal Harams & Malas",
    collection: "Heritage Archive",
    metals: ["22k Yellow Gold", "18k Yellow Gold"],
    gemstones: ["Polki Natural Diamond", "Basra Natural Pearl", "Zambian Emerald"],
    caratWeight: 6.8,
    clarity: "Natural Lustre",
    cutGrade: "Excellent",
    grossWeightGrams: 88.5,
    netGoldWeightGrams: 80.0,
    pavanWeight: 10.0,
    makingChargePercent: 12.0,
    goldPurity: "22K (916 BIS Hallmarked)",
    huidCode: "KL-916-991M",
    images: [
      {
        url: "https://res.cloudinary.com/dunh3j6yu/image/upload/v1792967200/etoile-atelier/manga-maala-diamond-sautoir.jpg",
        alt: "Amara Gold Manga Maala Diamond Sautoir in 22k Gold",
        isPrimary: true,
      },
    ],
    stockStatus: "in_stock",
    stockQuantity: 1,
    featured: true,
    createdAt: new Date("2026-01-22"),
    updatedAt: new Date("2026-01-22"),
  },
];
