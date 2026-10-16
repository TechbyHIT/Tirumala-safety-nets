import type { Metadata } from "next";
import { absoluteUrl } from "@/seo/urls";
import { InstallationGallery } from "@/components/InstallationGallery";
import { allGalleryCards, heroImage } from "@/data/gallery";
import { GoldLink, PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Installation gallery",
  description:
    "Invisible grills, balcony safety nets, duct nets, cloth hangers, bird spikes and sports nets photographed from Tirumala Safety Nets work across Hyderabad.",
  alternates: { canonical: absoluteUrl("/gallery") },
};

export default function GalleryPage() {
  const hero = heroImage("gallery-hero", "invisible-grills");
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="A showcase of installations"
        highlight="across Hyderabad"
        text="Invisible grills, balcony and children nets, pigeon and duct work, cloth hangers and sports nets — arranged the way homeowners actually look through a gallery: one photograph at a time, by category."
        image={hero}
        crumbs={[{ href: "/", label: "Home" }, { label: "Gallery" }]}
        actions={<GoldLink href="/contact?need=photo">Send a photo of your opening</GoldLink>}
      />
      <InstallationGallery
        photos={allGalleryCards()}
        filters
        href=""
        eyebrow="Our work"
        title="Browse by system"
        text="Filter the masonry. Click any photograph to enlarge it. These are the same categories used on service and city pages."
      />
    </>
  );
}
