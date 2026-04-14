import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductDetail from "@/components/product/ProductDetail";
import connectDB from "@/lib/mongoose";
import Product from "@/models/Product";
import Review from "@/models/Review";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  await connectDB();
  const product = await Product.findOne({ slug }).select("title description images price").lean() as {
    title?: string; description?: string; images?: string[]; price?: number;
  } | null;
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.title,
    description: product.description?.substring(0, 160),
    openGraph: {
      images: product.images?.[0] ? [{ url: product.images[0] }] : [],
    },
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

  // JSON-LD Schema
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: productData.title,
    description: productData.description,
    image: productData.images,
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: productData.price,
      availability: productData.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
    aggregateRating: productData.reviewCount > 0
      ? { "@type": "AggregateRating", ratingValue: productData.rating, reviewCount: productData.reviewCount }
      : undefined,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Navbar />
      <main className="pt-20 min-h-screen">
        <ProductDetail product={productData} reviews={reviewData} />
      </main>
      <Footer />
    </>
  );
}
