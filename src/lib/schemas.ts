// Centralized JSON-LD schema library for Norelle
// All structured data schemas are generated from here to ensure NAP consistency

const BUSINESS = {
  name: "Norelle — Luxury Perfumes & Attar",
  legalName: "Norelle",
  url: "https://norelle.in",
  phone: "+919428767709",
  email: "hello@norelle.in",
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
} as const;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BUSINESS.legalName,
    url: BUSINESS.url,
    logo: `${BUSINESS.url}/logo.png`,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: BUSINESS.phone,
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi", "Gujarati"],
    },
    address: postalAddress(),
  };
}

export function websiteSearchSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: BUSINESS.url,
    name: BUSINESS.legalName,
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
  areaServed?: string[];
  hasMap?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Store",
    "@id": `${BUSINESS.url}/#store`,
    name: BUSINESS.name,
    description:
      "Premium luxury perfume and attar shop in Ahmedabad. Handcrafted fragrances, 100% natural attars, and designer perfumes with free delivery across Ahmedabad.",
    url: BUSINESS.url,
    image: `${BUSINESS.url}/og-image.jpg`,
    telephone: BUSINESS.phone,
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
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "10:00",
        closes: "20:00",
      },
    ],
    paymentAccepted: "Cash, UPI, Credit Card, Debit Card",
    currenciesAccepted: "INR",
    ...(overrides?.areaServed && { areaServed: overrides.areaServed }),
    ...(overrides?.hasMap && { hasMap: overrides.hasMap }),
  };
}

export function breadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqSchema(
  items: { question: string; answer: string }[]
) {
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
  comparePrice?: number;
  stock: number;
  slug: string;
  category: string;
  rating: number;
  reviewCount: number;
  notes?: { top?: string; heart?: string; base?: string };
  longevity?: string;
  reviews?: { userName: string; rating: number; comment: string }[];
}) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.images,
    url: `${BUSINESS.url}/shop/${product.slug}`,
    sku: product.slug,
    brand: { "@type": "Brand", name: "Norelle" },
    seller: { "@type": "Organization", name: "Norelle", url: BUSINESS.url },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: product.price,
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      seller: { "@type": "Organization", name: "Norelle" },
      url: `${BUSINESS.url}/shop/${product.slug}`,
    },
  };

  if (product.reviewCount > 0) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    };
  }

  if (product.reviews && product.reviews.length > 0) {
    schema.review = product.reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.userName },
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating,
      },
      reviewBody: r.comment,
    }));
  }

  const additionalProperties = [];
  if (product.notes?.top) {
    additionalProperties.push({
      "@type": "PropertyValue",
      name: "Top Notes",
      value: product.notes.top,
    });
  }
  if (product.notes?.heart) {
    additionalProperties.push({
      "@type": "PropertyValue",
      name: "Heart Notes",
      value: product.notes.heart,
    });
  }
  if (product.notes?.base) {
    additionalProperties.push({
      "@type": "PropertyValue",
      name: "Base Notes",
      value: product.notes.base,
    });
  }
  if (product.longevity) {
    additionalProperties.push({
      "@type": "PropertyValue",
      name: "Longevity",
      value: product.longevity,
    });
  }
  if (additionalProperties.length > 0) {
    schema.additionalProperty = additionalProperties;
  }

  return schema;
}

export function collectionPageSchema(
  name: string,
  description: string,
  url: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url,
    isPartOf: { "@type": "WebSite", name: "Norelle", url: BUSINESS.url },
  };
}

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

export { BUSINESS };
