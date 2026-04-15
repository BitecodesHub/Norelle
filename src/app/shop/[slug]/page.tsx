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

  return {
    title: `${product.title} — ${categoryLabel} | Buy Online Ahmedabad`,
    description: `${product.description?.substring(0, 140)} Shop ${product.title} by Norelle. Free delivery in Ahmedabad.`,
    keywords: [
      product.title ?? "",
      `buy ${categoryLabel.toLowerCase()} online`,
      `${categoryLabel.toLowerCase()} Ahmedabad`,
      "Norelle fragrance",
      "luxury perfume India",
    ].filter(Boolean),
    openGraph: {
      images: product.images?.[0] ? [{ url: product.images[0] }] : [],
      title: `${product.title} — Norelle ${categoryLabel}`,
      description: product.description?.substring(0, 160),
    },
    alternates: { canonical: `https://norelle.in/shop/${slug}` },
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
    { name: "Home", url: "https://norelle.in" },
    { name: "Shop", url: "https://norelle.in/shop" },
    { name: categoryLabel, url: `https://norelle.in/shop?category=${productData.category}` },
    { name: productData.title, url: `https://norelle.in/shop/${productData.slug}` },
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
