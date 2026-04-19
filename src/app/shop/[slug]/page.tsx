import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductDetail from "@/components/product/ProductDetail";
import connectDB from "@/lib/mongoose";
import Product from "@/models/Product";
import Review from "@/models/Review";
import { productSchema, breadcrumbSchema } from "@/lib/schemas";

const CATEGORY_LABELS: Record<string, string> = {
  PERFUME: "Perfume",
  ATTAR: "Attar",
  EAU_DE_PARFUM: "Eau de Parfum",
  EAU_DE_TOILETTE: "Eau de Toilette",
  BODY_MIST: "Body Mist",
};

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  await connectDB();
  const product = await Product.findOne({ slug }).select("title description images price category").lean() as {
    title?: string; description?: string; images?: string[]; price?: number; category?: string;
  } | null;
  if (!product) return { title: "Product Not Found" };

  const categoryLabel = CATEGORY_LABELS[product.category ?? ""] ?? "Fragrance";
  const canonicalUrl = `https://www.norelleperfumes.com/shop/${slug}`;
  const priceStr = product.price ? ` Starting ₹${product.price.toLocaleString("en-IN")}.` : "";
  const shortDesc = (product.description ?? "").substring(0, 150).trim();

  return {
    title: `${product.title} — ${categoryLabel} by Norelle | Buy Online Ahmedabad`,
    description: `${shortDesc} Shop ${product.title} — handcrafted ${categoryLabel.toLowerCase()} by Norelle, Ahmedabad.${priceStr} 100% natural. Free delivery.`,
    keywords: [
      product.title ?? "",
      `buy ${product.title} online`,
      `${product.title} price`,
      `${categoryLabel.toLowerCase()} Ahmedabad`,
      `buy ${categoryLabel.toLowerCase()} online India`,
      "Norelle fragrance",
      "luxury perfume India",
      "natural attar India",
    ].filter(Boolean),
    openGraph: {
      type: "website",
      url: canonicalUrl,
      siteName: "Norelle",
      images: product.images?.[0]
        ? [{ url: product.images[0], width: 1200, height: 1200, alt: `${product.title} — Norelle ${categoryLabel}` }]
        : [],
      title: `${product.title} — Norelle ${categoryLabel}`,
      description: shortDesc,
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.title} — Norelle ${categoryLabel}`,
      description: shortDesc,
      images: product.images?.[0] ? [product.images[0]] : [],
    },
    alternates: { canonical: canonicalUrl },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  await connectDB();

  const product = await Product.findOne({ slug }).lean() as Record<string, unknown> | null;
  if (!product) notFound();

  const reviews = await Review.find({ product: (product as { _id: unknown })._id })
    .sort({ createdAt: -1 })
    .limit(20)
    .lean();

  const productData = JSON.parse(JSON.stringify(product));
  const reviewData = JSON.parse(JSON.stringify(reviews));

  const categoryLabel = CATEGORY_LABELS[productData.category] ?? "Fragrance";

  // JSON-LD Schemas
  const schema = productSchema({
    title: productData.title,
    description: productData.description,
    images: productData.images,
    price: productData.price,
    comparePrice: productData.comparePrice,
    stock: productData.stock,
    slug: productData.slug,
    category: productData.category,
    rating: productData.rating,
    reviewCount: productData.reviewCount,
    notes: productData.notes,
    longevity: productData.longevity,
    reviews: reviewData.map((r: { userName: string; rating: number; comment: string }) => ({
      userName: r.userName,
      rating: r.rating,
      comment: r.comment,
    })),
  });

  const breadcrumbs = breadcrumbSchema([
    { name: "Home", url: "https://www.norelleperfumes.com" },
    { name: "Shop", url: "https://www.norelleperfumes.com/shop" },
    { name: categoryLabel, url: `https://www.norelleperfumes.com/shop?category=${productData.category}` },
    { name: productData.title, url: `https://www.norelleperfumes.com/shop/${productData.slug}` },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <Navbar />
      <main className="pt-20 min-h-screen">
        <ProductDetail product={productData} reviews={reviewData} />
      </main>
      <Footer />
    </>
  );
}
