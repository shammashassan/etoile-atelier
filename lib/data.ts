import { type Product } from "./schemas/product";
import { type SiteSettings } from "./schemas/settings";

/**
 * Global Brand Identity & Static Atelier Specifications
 * Central source of truth for all brand copy, contacts, locations, and metadata.
 */
export const BRAND = {
  name: "Étoile Atelier",
  legalName: "Étoile Atelier S.A.S.",
  shortName: "Étoile Atelier",
  tagline: "Fine Jewelry & Haute Joaillerie",
  subtitle: "Place Vendôme • Haute Joaillerie",
  fullSubtitle: "Haute Joaillerie & Fine Lapidary Arts • Place Vendôme • Established 1924",
  establishedYear: 1924,
  establishedText: "Established 1924 • Place Vendôme",

  description:
    "Handcrafted fine jewelry, ethical diamonds, and bespoke atelier creations sculpted in Place Vendôme.",
  heroHeadline: ["Rare Gemstones,", "Sculpted by Hand."],
  heroDescription:
    "Handcrafted in our Place Vendôme workshops with unheated Ceylon sapphires, Muzo emeralds, and certified natural diamonds set in solid Platinum 950.",
  collectionsDescription:
    "Explore our permanent and seasonal jewelry collections — archival solitaires, pavé necklaces, rare Ceylon sapphires, and bespoke cuffs sculpted in Platinum 950.",
  consultationDescription:
    "Schedule a private appointment at our Place Vendôme atelier or request a remote gemological consultation for custom bridal and haute joaillerie commissions.",
  adminPortalDescription:
    "Internal production CMS, inventory controls, and private consultation inquiries.",
  announcement:
    "Complimentary insured global shipping & private atelier consultation",

  currency: "USD",
  url: "https://etoile-atelier.vercel.app",

  contact: {
    email: "concierge@etoile-atelier.com",
    phone: "+1 (800) 458-9214",
    phoneDisplay: "+1 (800) 458-9214",
    adminEmail: "director@etoile-atelier.com",
    adminDefaultPassword: "AtelierDirector2026!",
  },

  headquarters: {
    street: "12 Place Vendôme",
    city: "Paris",
    postalCode: "75001",
    country: "France",
    district: "Place Vendôme",
    fullAddress: "12 Place Vendôme, 75001 Paris, France",
  },

  cities: ["Paris", "Geneva", "London", "New York"],
  citiesSummary: "Paris • Geneva • London • New York",

  salons: [
    {
      id: "paris",
      name: "Paris Vendôme Salon",
      city: "Paris",
      district: "Place Vendôme",
      address: "12 Place Vendôme, 75001 Paris",
      phone: "+33 1 42 68 00 00",
      telHref: "tel:+33142680000",
      schedule: "By Private Appointment Only",
      ctaLabel: "Request Paris Salon",
      callCtaLabel: "Call Paris Concierge",
    },
    {
      id: "geneva",
      name: "Geneva Rhône Salon",
      city: "Geneva",
      district: "Rue du Rhône",
      address: "Rue du Rhône 42, 1204 Genève",
      phone: "+41 22 819 1200",
      telHref: "tel:+41228191200",
      schedule: "Tuesday – Saturday",
      ctaLabel: "Request Geneva Salon",
      callCtaLabel: "Call Geneva Concierge",
    },
    {
      id: "london",
      name: "London Mayfair Salon",
      city: "London",
      district: "Mayfair",
      address: "14 New Bond Street, Mayfair, London",
      phone: "+44 20 7946 0912",
      telHref: "tel:+442079460912",
      schedule: "Monday – Friday",
      ctaLabel: "Request London Salon",
      callCtaLabel: "Call London Concierge",
    },
    {
      id: "new-york",
      name: "New York Madison Salon",
      city: "New York",
      district: "Madison Ave",
      address: "680 Madison Avenue, New York, NY",
      phone: "+1 212 555 0198",
      telHref: "tel:+12125550198",
      schedule: "By Private Appointment Only",
      ctaLabel: "Request New York Salon",
      callCtaLabel: "Call New York Concierge",
    },
  ],

  navigation: {
    main: [
      { label: "Collections", href: "/collections" },
      { label: "Bespoke Salon", href: "/consultation" },
      { label: "Optical Studio", href: "/#studio", hideMobile: true },
      { label: "Vendôme Vault", href: "/#vault", hideMobile: true },
    ],
    admin: [
      { label: "Atelier Overview", href: "/admin", icon: "LayoutDashboard" },
      { label: "Jewelry Collection", href: "/admin/products", icon: "Gem" },
      { label: "Bespoke Inquiries", href: "/admin/inquiries", icon: "CalendarCheck" },
      { label: "Atelier Settings", href: "/admin/settings", icon: "Settings" },
    ],
  },

  commitments: [
    {
      id: "provenance",
      title: "Conflict-Free & Certified Provenance",
      description:
        "Every stone is hand-selected and accompanied by full GIA or SSEF gemological certificates verifying natural unheated origin.",
    },
    {
      id: "viewing-salons",
      title: "Private Viewing Salons",
      description:
        "Experience stones in person at our salons in Paris (Place Vendôme), London (New Bond St), Geneva, or New York (Madison Ave).",
    },
    {
      id: "timeline",
      title: "6 to 8 Week Artisan Timeline",
      description:
        "Hand-forged by master jewelers with weekly photographic progress dossiers delivered directly to your private concierge.",
    },
  ],

  editorialNotes: [
    {
      title: "Dual Gemological Certification",
      description:
        "Every solitaire is documented with concurrent GIA and LFG Paris laboratory dossiers detailing origin, clarity, and unheated status.",
    },
    {
      title: "Place Vendôme Handover",
      description:
        "Hand delivery arranged via armored courier worldwide or personal handover in our private salon suite.",
    },
  ],

  governance: [
    "Solid Platinum 950 Metallurgy",
    "18-Karat Recycled Gold",
    "Kimberley Process Audited",
    "GIA & LFG Double Certification",
  ],

  trustBadges: [
    "Insured Global Transport",
    "Kimberley Audited Gemstones",
  ],

  discretionNotice:
    "All inquiries are held in strict discretion under Swiss and French banking-level data privacy.",

  faqProtocols: [
    {
      id: "protocol-1",
      question: "What should I anticipate during my private salon viewing?",
      answer:
        "You will be received in an individual salon suite with dedicated gemological consultation. Our senior gemologist will present unmounted stones, loose diamonds under 10× binocular loupes, and archival mounting sketches tailored to your preferences. Vintage Champagne and refreshments are served throughout.",
    },
    {
      id: "protocol-2",
      question: "Can I bring my own family heirloom gemstones for resetting?",
      answer:
        "Yes. Our lapidaries and master jewelers frequently reset archival family stones. We conduct a non-destructive gemological evaluation, check girdle integrity, and design a custom Platinum 950 or 18k gold setting sculpted around the exact dimensions of your gemstone.",
    },
    {
      id: "protocol-3",
      question: "What gemological certifications accompany bespoke commissions?",
      answer:
        "All solitaire diamonds and colored gemstones are accompanied by premier independent laboratory reports from GIA (Gemological Institute of America) or SSEF (Swiss Gemmological Institute), certifying color grade, clarity, carat weight, and untreated geographical origin.",
    },
    {
      id: "protocol-4",
      question: "How are discretion, non-disclosure, and insured worldwide delivery handled?",
      answer:
        "All private commissions remain strictly confidential under Swiss privacy protocol. Finished pieces can be collected in person at any of our four global salons, or dispatched via armored logistics (Malca-Amit / Brinks) with 100% door-to-door insurance.",
    },
  ],

  museumProvenance: {
    title:
      "Haute Joaillerie Archival Dossier & Gemological Certification",
    summary:
      "All Étoile Atelier creations are accompanied by independent laboratory dossiers from the Gemological Institute of America (GIA) and the Swiss Gemmological Institute (SSEF), verifying natural unheated provenance, flawless cut grades, and ethical Kimberley Process compliance.",
  },

  seo: {
    keywords: [
      "haute joaillerie",
      "fine jewelry",
      "bespoke jewelry",
      "Place Vendôme",
      "ethical diamonds",
      "sapphires",
      "emeralds",
      "atelier",
    ],
    defaultTitle: "Étoile Atelier | Haute Joaillerie & Fine Jewelry",
    titleTemplate: "%s | Étoile Atelier",
    homeTitle: "Étoile Atelier | Haute Joaillerie & Fine Jewelry — Place Vendôme",
    collectionsTitle: "Haute Joaillerie Collections",
    consultationTitle: "Private Atelier Consultation & Bespoke Commissions",
    termsTitle: "Terms of Service & Atelier Governance",
    privacyTitle: "Privacy Policy & Client Data Discretion",
    adminTitle: "Atelier Management | Étoile Atelier",
    termsDescription: "Official terms of service, bespoke commission protocols, insured armored transit, and dual gemological certification standards at Étoile Atelier.",
    privacyDescription: "Client data discretion and privacy policy governed by French and Swiss banking-level confidentiality standards at Étoile Atelier.",
    ogImageAlt: "Étoile Atelier | Haute Joaillerie • Place Vendôme",
  },
} as const;

export type BrandDetails = typeof BRAND;

export const INITIAL_SETTINGS: SiteSettings = {
  atelierName: BRAND.name,
  tagline: BRAND.tagline,
  announcementBar: BRAND.announcement,
  contactEmail: BRAND.contact.email,
  contactPhone: BRAND.contact.phone,
  currency: BRAND.currency,
  locations: BRAND.salons.map((s) => `${s.city} (${s.district})`),
  updatedAt: new Date("2026-01-01"),
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    title: "The Solitaire Lumina Diamond Ring",
    slug: "solitaire-lumina-diamond-ring",
    sku: "ETO-RNG-001",
    description: "Handcrafted in our Paris atelier, the Solitaire Lumina elevates an exceptional 2.15-carat round brilliant cut diamond on a micro-pavé shank. Each prong is hand-sculpted in solid Platinum 950 to maximize light transmission through the pavilion facets.",
    shortDescription: "2.15ct Round Brilliant Diamond in sculpted Platinum 950 micro-pavé.",
    price: 18500,
    compareAtPrice: 21000,
    category: "Rings",
    collection: "Solitaires",
    metals: ["Platinum 950", "18k White Gold", "18k Yellow Gold"],
    gemstones: ["Natural Diamond"],
    caratWeight: 2.15,
    clarity: "VVS1",
    cutGrade: "Excellent",
    images: [
      {
        url: "https://res.cloudinary.com/dunh3j6yu/image/upload/v1792877317/etoile-atelier/solitaire-lumina-diamond-ring.jpg",
        alt: "The Solitaire Lumina Diamond Ring in sculpted Platinum 950",
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
    title: "Céleste Royal Sapphire Pendant",
    slug: "celeste-royal-sapphire-pendant",
    sku: "ETO-NCK-002",
    description: "An unheated 3.40-carat cushion-cut Royal Blue Sapphire from Sri Lanka, encircled by a halo of pear-cut natural diamonds suspended from an 18k solid White Gold diamond-cut cable chain.",
    shortDescription: "3.40ct Royal Blue Sapphire halo pendant in 18k White Gold.",
    price: 14200,
    compareAtPrice: null,
    category: "Necklaces",
    collection: "High Jewelry",
    metals: ["18k White Gold", "Platinum 950"],
    gemstones: ["Royal Blue Sapphire", "Natural Diamond"],
    caratWeight: 3.4,
    clarity: "VVS2",
    cutGrade: "Excellent",
    images: [
      {
        url: "https://res.cloudinary.com/dunh3j6yu/image/upload/v1792877318/etoile-atelier/celeste-royal-sapphire-pendant.jpg",
        alt: "Céleste Royal Sapphire Pendant necklace with diamond halo",
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
    title: "Aura Sculpted Diamond Cuff",
    slug: "aura-sculpted-diamond-cuff",
    sku: "ETO-BRC-003",
    description: "An architectural solid 18k Yellow Gold hinged bangle featuring 4.20 carats of pavé-set round brilliant F/VS diamonds arranged in three graduating ribbons of light.",
    shortDescription: "4.20ctw Diamond architectural cuff in solid 18k Yellow Gold.",
    price: 24500,
    compareAtPrice: 27000,
    category: "Bracelets",
    collection: "Aura",
    metals: ["18k Yellow Gold", "18k Rose Gold"],
    gemstones: ["Natural Diamond"],
    caratWeight: 4.2,
    clarity: "VS1",
    cutGrade: "Very Good",
    images: [
      {
        url: "https://res.cloudinary.com/dunh3j6yu/image/upload/v1792877319/etoile-atelier/aura-sculpted-diamond-cuff.jpg",
        alt: "Aura Sculpted Diamond Cuff bracelet in solid 18k yellow gold",
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
    title: "Verdant Colombian Emerald Drops",
    slug: "verdant-colombian-emerald-drops",
    sku: "ETO-EAR-004",
    description: "A breathtaking pair of matched Muzo Colombian Emeralds totaling 5.10 carats, suspended beneath brilliant-cut diamond studs in warm 18k Yellow Gold bezels.",
    shortDescription: "5.10ctw Matched Colombian Emeralds and Diamonds in 18k Yellow Gold.",
    price: 32000,
    compareAtPrice: null,
    category: "Earrings",
    collection: "High Jewelry",
    metals: ["18k Yellow Gold", "Platinum 950"],
    gemstones: ["Colombian Emerald", "Natural Diamond"],
    caratWeight: 5.1,
    clarity: "Minor Oil",
    cutGrade: "Excellent",
    images: [
      {
        url: "https://res.cloudinary.com/dunh3j6yu/image/upload/v1792877320/etoile-atelier/verdant-colombian-emerald-drops.jpg",
        alt: "Verdant Colombian Emerald drop earrings in 18k gold",
        isPrimary: true,
      },
    ],
    stockStatus: "made_to_order",
    stockQuantity: 1,
    featured: false,
    createdAt: new Date("2026-01-18"),
    updatedAt: new Date("2026-01-18"),
  },
  {
    title: "Constellation Eternity Band",
    slug: "constellation-eternity-band",
    sku: "ETO-RNG-005",
    description: "A continuous loop of 18 calibrated emerald-cut diamonds (totaling 3.60 carats) set in an open-gallery Platinum 950 mounting that allows maximum light reflection.",
    shortDescription: "3.60ctw Emerald-Cut Diamond full eternity band in Platinum 950.",
    price: 16800,
    compareAtPrice: 19500,
    category: "Rings",
    collection: "Solitaires",
    metals: ["Platinum 950", "18k White Gold", "18k Rose Gold"],
    gemstones: ["Natural Diamond"],
    caratWeight: 3.6,
    clarity: "VVS2",
    cutGrade: "Excellent",
    images: [
      {
        url: "https://res.cloudinary.com/dunh3j6yu/image/upload/v1792877320/etoile-atelier/constellation-eternity-band.jpg",
        alt: "Constellation Emerald-Cut Diamond Eternity Band in Platinum 950",
        isPrimary: true,
      },
    ],
    stockStatus: "in_stock",
    stockQuantity: 4,
    featured: true,
    createdAt: new Date("2026-01-20"),
    updatedAt: new Date("2026-01-20"),
  },
];
