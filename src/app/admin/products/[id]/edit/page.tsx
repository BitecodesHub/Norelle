"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

interface ProductForm {
  title: string;
  description: string;
  price: string;
  comparePrice: string;
  category: "PERFUME" | "ATTAR";
  stock: string;
  featured: boolean;
  longevity: string;
  ingredients: string;
  notesTop: string;
  notesHeart: string;
  notesBase: string;
}

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<ProductForm>({
    title: "",
    description: "",
    price: "",
    comparePrice: "",
    category: "ATTAR",
    stock: "",
    featured: false,
    longevity: "",
    ingredients: "",
    notesTop: "",
    notesHeart: "",
    notesBase: "",
  });

  useEffect(() => {
    fetch(`/api/admin/products/${id}`, { method: "GET" })
      .then((r) => {
        if (!r.ok) throw new Error("Not found");
        return r.json();
      })
      .then((p) => {
        setForm({
          title: p.title ?? "",
          description: p.description ?? "",
          price: String(p.price ?? ""),
          comparePrice: p.comparePrice ? String(p.comparePrice) : "",
          category: p.category ?? "ATTAR",
          stock: String(p.stock ?? "0"),
          featured: p.featured ?? false,
          longevity: p.longevity ?? "",
          ingredients: p.ingredients ?? "",
          notesTop: p.notes?.top ?? "",
          notesHeart: p.notes?.heart ?? "",
          notesBase: p.notes?.base ?? "",
        });
      })
      .catch(() => {
        // Fallback: fetch all and find by id
        fetch("/api/products")
          .then((r) => r.json())
          .then((products: Array<Record<string, unknown>>) => {
            const p = products.find((x) => String(x._id) === id);
            if (!p) { toast.error("Product not found"); router.push("/admin/products"); return; }
            const notes = p.notes as { top?: string; heart?: string; base?: string } | undefined;
            setForm({
              title: String(p.title ?? ""),
              description: String(p.description ?? ""),
              price: String(p.price ?? ""),
              comparePrice: p.comparePrice ? String(p.comparePrice) : "",
              category: (p.category as "PERFUME" | "ATTAR") ?? "ATTAR",
              stock: String(p.stock ?? "0"),
              featured: Boolean(p.featured),
              longevity: String(p.longevity ?? ""),
              ingredients: String(p.ingredients ?? ""),
              notesTop: notes?.top ?? "",
              notesHeart: notes?.heart ?? "",
              notesBase: notes?.base ?? "",
            });
          });
      })
      .finally(() => setLoading(false));
  }, [id, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const body = {
        title: form.title,
        description: form.description,
        price: Number(form.price),
        comparePrice: form.comparePrice ? Number(form.comparePrice) : null,
        category: form.category,
        stock: Number(form.stock),
        featured: form.featured,
        longevity: form.longevity,
        ingredients: form.ingredients,
        notes: {
          top: form.notesTop,
          heart: form.notesHeart,
          base: form.notesBase,
        },
      };
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error("Update failed");
      toast.success("Product updated!");
      router.push("/admin/products");
    } catch {
      toast.error("Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-parchment flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-gold animate-spin" />
      </div>
    );
  }

  const inputClass = "w-full px-4 py-3 bg-white border border-tan rounded-xl text-cream font-sans text-sm focus:outline-none focus:border-gold/60 transition-colors";
  const labelClass = "block text-xs font-sans text-mocha tracking-wider uppercase mb-1.5";

  return (
    <div className="min-h-screen bg-parchment">
      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin/products" className="text-mocha hover:text-cream transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="font-serif text-3xl text-cream">Edit Product</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white border border-tan rounded-2xl p-6 space-y-5 shadow-card">
            <h2 className="font-serif text-lg text-cream mb-1">Basic Info</h2>

            <div>
              <label className={labelClass}>Title</label>
              <input name="title" value={form.title} onChange={handleChange} required className={inputClass} placeholder="Product name" />
            </div>

            <div>
              <label className={labelClass}>Description</label>
              <textarea name="description" value={form.description} onChange={handleChange} rows={4} className={inputClass} placeholder="Product description" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Price (₹)</label>
                <input name="price" type="number" value={form.price} onChange={handleChange} required min={0} className={inputClass} placeholder="250" />
              </div>
              <div>
                <label className={labelClass}>Compare Price (₹)</label>
                <input name="comparePrice" type="number" value={form.comparePrice} onChange={handleChange} min={0} className={inputClass} placeholder="Leave blank if no sale" />
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
              <label htmlFor="featured" className="text-sm font-sans text-mocha">Featured product</label>
            </div>
          </div>

          <div className="bg-white border border-tan rounded-2xl p-6 space-y-5 shadow-card">
            <h2 className="font-serif text-lg text-cream mb-1">Scent Notes</h2>
            <div>
              <label className={labelClass}>Top Notes</label>
              <input name="notesTop" value={form.notesTop} onChange={handleChange} className={inputClass} placeholder="e.g. Saffron, Cardamom, Rose" />
            </div>
            <div>
              <label className={labelClass}>Heart Notes</label>
              <input name="notesHeart" value={form.notesHeart} onChange={handleChange} className={inputClass} placeholder="e.g. Hindi Oud, Amber" />
            </div>
            <div>
              <label className={labelClass}>Base Notes</label>
              <input name="notesBase" value={form.notesBase} onChange={handleChange} className={inputClass} placeholder="e.g. Sandalwood, Musk" />
            </div>
          </div>

          <div className="bg-white border border-tan rounded-2xl p-6 space-y-5 shadow-card">
            <h2 className="font-serif text-lg text-cream mb-1">Details</h2>
            <div>
              <label className={labelClass}>Longevity</label>
              <input name="longevity" value={form.longevity} onChange={handleChange} className={inputClass} placeholder="e.g. 12–18 hours" />
            </div>
            <div>
              <label className={labelClass}>Ingredients</label>
              <textarea name="ingredients" value={form.ingredients} onChange={handleChange} rows={3} className={inputClass} placeholder="Full INCI ingredients list" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-8 py-3 bg-gold hover:bg-gold-light text-noir font-sans text-sm font-medium rounded-xl transition-all disabled:opacity-60"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {saving ? "Saving…" : "Save Changes"}
            </button>
            <Link href="/admin/products" className="px-6 py-3 text-sm text-mocha font-sans hover:text-cream transition-colors">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
