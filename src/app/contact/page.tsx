import type { Metadata } from "next";
import { absoluteUrl } from "@/seo/urls";
import { site } from "@/config/site";
import { InstallationGallery } from "@/components/InstallationGallery";
import { QuotePanel } from "@/components/QuotePanel";
import { galleryCards, heroImage } from "@/data/gallery";
import { GoldLink, PageHero, Panel } from "@/components/ui";

export const metadata: Metadata = {
  title: "Request a site visit",
  description:
    "Book a measurement for safety nets, invisible grills, pigeon nets, cloth hangers or sports nets anywhere in Hyderabad.",
  alternates: { canonical: absoluteUrl("/contact") },
};

type Search = { service?: string; city?: string; need?: string };

export default async function ContactPage({ searchParams }: { searchParams: Promise<Search> }) {
  const query = await searchParams;
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Request a quote"
        text={
          query.need === "photo"
            ? "Send the city, a full photo of the opening, and closer photos of the top and side fixing surfaces. Width and height help. The written figure still follows a measurement."
            : "Share the Hyderabad locality, the opening and the service you have in mind. We confirm coverage and arrange a measurement before any price is treated as final."
        }
        image={heroImage("contact", "balcony-safety-nets")}
        crumbs={[{ href: "/", label: "Home" }, { label: "Contact" }]}
        actions={<GoldLink href="#visit-form">Go to the form</GoldLink>}
      />
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.85fr_1.15fr]">
        <aside className="space-y-4 text-sm leading-7 text-brand-800/80">
          <Panel eyebrow="Prepare" title="What helps a useful reply">
            <ol className="space-y-3">
              <li><span className="font-semibold text-brand-900">Locality.</span> Any area in Hyderabad, Secunderabad or the ORR fringe is in scope. Send the street if it is not already listed.</li>
              <li><span className="font-semibold text-brand-900">The opening.</span> Balcony, window, duct, terrace, stairs, or a ground that actually exists for sport.</li>
              <li><span className="font-semibold text-brand-900">Photographs.</span> One full frame, then closer shots of the top and side fixing surfaces. Width and height help if you have them.</li>
              <li><span className="font-semibold text-brand-900">Who uses it.</span> Children, pets, pigeons, drying clothes, or a practice bay change the system.</li>
            </ol>
          </Panel>
          <p className="rounded-3xl bg-white p-5 ring-1 ring-brand-100">
            <span className="block font-semibold text-brand-900">Hours</span>
            {site.hours}
          </p>
          <p className="rounded-3xl bg-white p-5 ring-1 ring-brand-100">
            <span className="block font-semibold text-brand-900">Email</span>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
          <p className="rounded-3xl bg-white p-5 ring-1 ring-brand-100">
            <span className="block font-semibold text-brand-900">Service area</span>
            Entire Hyderabad and Secunderabad, including the ORR neighbourhoods. Phone and WhatsApp appear here once they are set for the business.
          </p>
          {site.phoneDisplay ? (
            <p className="rounded-3xl bg-white p-5 ring-1 ring-brand-100">
              <span className="block font-semibold text-brand-900">Phone</span>
              {site.phoneDisplay}
            </p>
          ) : null}
        </aside>
        <div id="visit-form">
          <QuotePanel service={query.service} city={query.city} need={query.need} />
        </div>
      </div>
      <InstallationGallery photos={galleryCards("contact", 6)} compact title="Recent styles of work" text="The same balcony, window and duct systems we come to measure after you send the form." />
    </>
  );
}
