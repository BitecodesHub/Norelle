"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, Loader2, X } from "lucide-react";
import toast from "react-hot-toast";

interface VariantRow {
  size: string;
  price: string;
}

export default function NewProductPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [variants, setVariants] = useState<VariantRow[]>([
    { size: "6ml", price: "250" },
    { size: "12ml", price: "350" },
  ]);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    price: "250",
    comparePrice: "",
    category: "ATTAR" as "PERFUME" | "ATTAR",
    stock: "50",
    featured: false,
    longevity: "",
    ingredients: "",
    notesTop: "",
    notesHeart: "",
    notesBase: "",
    imageUrl: "",
  });

  const toSlug = (s: string) =>
    s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    setForm((p) => ({
      ...p,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "title" ? { slug: toSlug(value) } : {}),
    }));
  };

  const addVariant = () => setVariants((v) => [...v, { size: "", price: "" }]);
  const removeVariant = (i: number) => setVariants((v) => v.filter((_, idx) => idx !== i));
  const updateVariant = (i: number, field: keyof VariantRow, val: string) =>
    setVariants((v) => v.map((row, idx) => (idx === i ? { ...row, [field]: val } : row)));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const body = {
        title: form.title,
        slug: form.slug,
        description: form.description,
        price: Number(form.price),
        comparePrice: form.comparePrice ? Number(form.comparePrice) : undefined,
        category: form.category,
        stock: Number(form.stock),
        featured: form.featured,
        longevity: form.longevity,
        ingredients: form.ingredients,
        notes: { top: form.notesTop, heart: form.notesHeart, base: form.notesBase },
        images: form.imageUrl ? [form.imageUrl] : [],
        variants: variants
          .filter((v) => v.size && v.price)
          .map((v) => ({ size: v.size, price: Number(v.price) })),
      };
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? "Failed to create product");
      }
      toast.success("Product created!");
      router.push("/admin/products");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const inputClass = "w-full px-4 py-3 bg-white border border-tan rounded-xl text-cream font-sans text-sm focus:outline-none focus:border-gold/60 transition-colors";
  const labelClass = "block text-xs font-sans text-mocha tracking-wider uppercase mb-1.5";

  return (
    <div className="min-h-screen bg-parchment">
      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin/products" className="text-mocha hover:text-cream transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="font-serif text-3xl text-cream">New Product</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="bg-white border border-tan rounded-2xl p-6 space-y-5 shadow-card">
            <h2 className="font-serif text-lg text-cream">Basic Info</h2>

            <div>
              <label className={labelClass}>Title</label>
              <input name="title" value={form.title} onChange={handleChange} required className={inputClass} placeholder="Arabian Touch" />
            </div>

            <div>
              <label className={labelClass}>Slug (auto-generated)</label>
              <input name="slug" value={form.slug} onChange={handleChange} required className={inputClass} placeholder="arabian-touch" />
            </div>

            <div>
              <label className={labelClass}>Description</label>
              <textarea name="description" value={form.description} onChange={handleChange} rows={4} required className={inputClass} placeholder="Product description" />
            </div>

            <div>
              <label className={labelClass}>Image URL</label>
              <input name="imageUrl" value={form.imageUrl} onChange={handleChange} className={inputClass} placeholder="/Attars/Arabian Touch.png" />
              <p className="text-xs text-latte font-sans mt-1">Use path like /Attars/filename.png for local images</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Base Price (₹)</label>
                <input name="price" type="number" value={form.price} onChange={handleChange} required min={0} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Compare Price (₹)</label>
                <input name="comparePrice" type="number" value={form.comparePrice} onChange={handleChange} min={0} className={inputClass} placeholder="Optional" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Category</label>
                <select name="category" value={form.category} onChange={handleChange} className={inputClass}>
                  <option value="ATTAR">Attar</option>
                  <option value="PERFUME">Perfume</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Stock</label>
                <input name="stock" type="number" value={form.stock} onChange={handleChange} min={0} className={inputClass} />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <input type="checkbox" name="featured" id="featured" checked={form.featured} onChange={handleChange} className="w-4 h-4 accent-gold" />
              <label htmlFor="featured" className="text-sm font-sans text-mocha">Featured on homepage</label>
            </div>
          </div>

          {/* Variants */}
          <div className="bg-white border border-tan rounded-2xl p-6 space-y-4 shadow-card">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-lg text-cream">Size Variants</h2>
              <button type="button" onClick={addVariant} className="flex items-center gap-1.5 text-xs font-sans text-gold hover:text-gold-dark transition-colors">
                <Plus className="w-3.5 h-3.5" /> Add Size
              </button>
            </div>
            {variants.map((v, i) => (
              <div key={i} className="flex gap-3 items-center">
                <input
                  value={v.size}
                  onChange={(e) => updateVariant(i, "size", e.target.value)}
                  placeholder="6ml"
                  className="flex-1 px-4 py-2.5 bg-charcoal border border-tan rounded-xl text-cream font-sans text-sm focus:outline-none focus:border-gold/60"
                />
                <input
                  type="number"
                  value={v.price}
                  onChange={(e) => updateVariant(i, "price", e.target.value)}
                  placeholder="250"
                  className="flex-1 px-4 py-2.5 bg-charcoal border border-tan rounded-xl text-cream font-sans text-sm focus:outline-none focus:border-gold/60"
                />
                <button type="button" onClick={() => removeVariant(i)} className="text-latte hover:text-red-500 transition-colors p-1">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            <p className="text-xs text-latte font-sans">Size variants let customers choose 6ml / 12ml etc. with different prices.</p>
          </div>

          {/* Scent Notes */}
          <div className="bg-white border border-tan rounded-2xl p-6 space-y-5 shadow-card">
            <h2 className="font-serif text-lg text-cream">Scent Notes</h2>
            <div>
              <label className={labelClass}>Top Notes</label>
              <input name="notesTop" value={form.notesTop} onChange={handleChange} className={inputClass} placeholder="Saffron, Rose, Cardamom" />
            </div>
            <div>
              <label className={labelClass}>Heart Notes</label>
              <input name="notesHeart" value={form.notesHeart} onChange={handleChange} className={inputClass} placeholder="Hindi Oud, Amber" />
            </div>
            <div>
              <label className={labelClass}>Base Notes</label>
              <input name="notesBase" value={form.notesBase} onChange={handleChange} className={inputClass} placeholder="Sandalwood, Musk" />
            </div>
          </div>

          {/* Details */}
          <div className="bg-white border border-tan rounded-2xl p-6 space-y-5 shadow-card">
            <h2 className="font-serif text-lg text-cream">Details</h2>
            <div>
              <label className={labelClass}>Longevity</label>
              <input name="longevity" value={form.longevity} onChange={handleChange} className={inputClass} placeholder="12–18 hours" />
            </div>
            <div>
              <label className={labelClass}>Ingredients</label>
              <textarea name="ingredients" value={form.ingredients} onChange={handleChange} rows={3} className={inputClass} placeholder="Full INCI list" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button type="submit" disabled={saving}
              className="flex items-center gap-2 px-8 py-3 bg-gold hover:bg-gold-light text-noir font-sans text-sm font-medium rounded-xl transition-all disabled:opacity-60">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              {saving ? "Creating…" : "Create Product"}
            </button>
            <Link href="/admin/products" className="px-6 py-3 text-sm text-mocha font-sans hover:text-cream transition-colors">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
