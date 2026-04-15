import { BUSINESS } from "@/lib/schemas";

export default function NAPBlock({ className = "" }: { className?: string }) {
  return (
    <address className={`not-italic font-sans text-sm leading-relaxed ${className}`}>
      <strong className="text-cream font-medium block mb-1">{BUSINESS.legalName}</strong>
      <span className="text-cream/70">
        {BUSINESS.address.street}
        <br />
        {BUSINESS.address.locality}, {BUSINESS.address.region} {BUSINESS.address.postalCode}
      </span>
      <br />
      <a href={`tel:${BUSINESS.phone}`} className="text-cream/70 hover:text-gold transition-colors">
        +91 94287 67709
      </a>
    </address>
  );
}
