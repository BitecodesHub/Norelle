// Centralized JSON-LD schema library for Norelle
// All structured data schemas are generated here to ensure NAP consistency

export const BUSINESS = {
  name: "Norelle — Luxury Perfumes & Attar",
  legalName: "Norelle",
  url: "https://www.norelleperfumes.com",
  phone: "+919428767709",
  email: "hello@norelleperfumes.com",
  address: {
    street: "62, Nanadan Society, Bahai Center, Shahpur",
    locality: "Ahmedabad",
    region: "Gujarat",
    postalCode: "380001",
    country: "IN",
  },
  geo: { latitude: 23.0301, longitude: 72.5876 },
  priceRange: "₹₹₹",
  openingHours: "Mo-Su 10:00-20:00",
  sameAs: [
    "https://www.instagram.com/norelleperfumes",
    "https://www.facebook.com/norelleperfumes",
  ],
} as const;

function postalAddress() {
  return {
    "@type": "PostalAddress",
    streetAddress: BUSINESS.address.street,
    addressLocality: BUSINESS.address.locality,
    addressRegion: BUSINESS.address.region,
    postalCode: BUSINESS.address.postalCode,
    addressCountry: BUSINESS.address.country,
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BUSINESS.url}/#organization`,
    name: BUSINESS.legalName,
    legalName: BUSINESS.name,
    url: BUSINESS.url,
    logo: {
      "@type": "ImageObject",
      url: `${BUSINESS.url}/logo.png`,
      width: 400,
      height: 100,
    },
    image: `${BUSINESS.url}/og-image.jpg`,
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    address: postalAddress(),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: BUSINESS.phone,
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi", "Gujarati"],
    },
    sameAs: BUSINESS.sameAs,
  };
}

export function websiteSearchSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BUSINESS.url}/#website`,
    url: BUSINESS.url,
    name: BUSINESS.legalName,
    description: "Premium luxury perfumes and natural attars in Ahmedabad.",
    inLanguage: "en-IN",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BUSINESS.url}/shop?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function localBusinessSchema(overrides?: {
  name?: string;
  description?: string;
  areaServed?: string[];
  hasMap?: string;
  pageUrl?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "Store"],
    "@id": `${BUSINESS.url}/#localbusiness`,
    name: overrides?.name ?? BUSINESS.name,
    description:
      overrides?.description ??
      "Premium luxury perfume and attar shop in Ahmedabad. Handcrafted fragrances, 100% natural attars, and designer perfumes with free delivery across Ahmedabad.",
    url: overrides?.pageUrl ?? BUSINESS.url,
    image: `${BUSINESS.url}/og-image.jpg`,
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    priceRange: BUSINESS.priceRange,
    address: postalAddress(),
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS.geo.latitude,
      longitude: BUSINESS.geo.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "10:00",
        closes: "20:00",
      },
    ],
    paymentAccepted: "Cash, UPI, Credit Card, Debit Card",
    currenciesAccepted: "INR",
    servesCuisine: undefined,
    hasMap: overrides?.hasMap ?? `https://maps.google.com/?q=${BUSINESS.geo.latitude},${BUSINESS.geo.longitude}`,
    sameAs: BUSINESS.sameAs,
    ...(overrides?.areaServed && { areaServed: overrides.areaServed }),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${items[items.length - 1]?.url}#breadcrumb`,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function productSchema(product: {
  title: string;
  description: string;
  images: string[];
  price: number;
  comparePrice?: number | null;
  stock: number;
  slug: string;
  category: string;
  rating: number;
  reviewCount: number;
  notes?: { top?: string; heart?: string; base?: string };
  longevity?: string;
  reviews?: { userName: string; rating: number; comment: string }[];
}) {
  const productUrl = `${BUSINESS.url}/shop/${product.slug}`;
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${productUrl}#product`,
    name: product.title,
    description: product.description,
    image: product.images,
    url: productUrl,
    sku: product.slug,
    brand: { "@type": "Brand", name: "Norelle" },
    offers: {
      "@type": "Offer",
      "@id": `${productUrl}#offer`,
      priceCurrency: "INR",
      price: product.price,
      ...(product.comparePrice && { highPrice: product.comparePrice }),
      priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "Norelle",
        url: BUSINESS.url,
      },
      url: productUrl,
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: 0,
          currency: "INR",
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "IN",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 1, unitCode: "DAY" },
          transitTime: { "@type": "QuantitativeValue", minValue: 1, maxValue: 3, unitCode: "DAY" },
        },
      },
    },
  };

  if (product.reviewCount > 0) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
      bestRating: 5,
      worstRating: 1,
    };
  }

  if (product.reviews?.length) {
    schema.review = product.reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.userName },
      reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
      reviewBody: r.comment,
    }));
  }

  const additionalProperties = [];
  if (product.notes?.top) additionalProperties.push({ "@type": "PropertyValue", name: "Top Notes", value: product.notes.top });
  if (product.notes?.heart) additionalProperties.push({ "@type": "PropertyValue", name: "Heart Notes", value: product.notes.heart });
  if (product.notes?.base) additionalProperties.push({ "@type": "PropertyValue", name: "Base Notes", value: product.notes.base });
  if (product.longevity) additionalProperties.push({ "@type": "PropertyValue", name: "Longevity", value: product.longevity });
  if (additionalProperties.length) schema.additionalProperty = additionalProperties;

  return schema;
}

export function collectionPageSchema(name: string, description: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${url}#collectionpage`,
    name,
    description,
    url,
    inLanguage: "en-IN",
    isPartOf: { "@type": "WebSite", "@id": `${BUSINESS.url}/#website`, name: "Norelle", url: BUSINESS.url },
    breadcrumb: breadcrumbSchema([
      { name: "Home", url: BUSINESS.url },
      { name, url },
    ]),
  };
}

export function localLandingSchema(params: {
  area: string;
  pageUrl: string;
  description: string;
}) {
  return localBusinessSchema({
    name: `Norelle Perfumes — ${params.area}`,
    description: params.description,
    pageUrl: params.pageUrl,
    areaServed: [params.area, "Ahmedabad"],
  });
}
