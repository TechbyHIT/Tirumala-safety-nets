import type { Metadata } from "next";
import { absoluteUrl } from "@/seo/urls";
import { InstallationGallery } from "@/components/InstallationGallery";
import { galleryCards, heroImage } from "@/data/gallery";
import { CheckList, GhostLink, GoldLink, PageHero, Panel } from "@/components/ui";

export const metadata: Metadata = {
  title: "About Tirumala Safety Nets",
  description:
    "A measurement-led installer of safety nets, invisible grills, pigeon protection, cloth hangers and sports nets across Hyderabad and Secunderabad.",
  alternates: { canonical: absoluteUrl("/about") },
};

const points = [
  "We serve the entire city, from the IT corridor to the Old City and the ORR.",
  "Cable and net type are written in the quote.",
  "Summer sun and the rains are part of the planning.",
  "Bird control stays physical and humane.",
  "We do not publish invented ratings or install counts.",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Safer openings, without the iron clutter"
        highlight="for Hyderabad homes"
        text="Tirumala Safety Nets measures invisible grills, safety nets, cloth hangers, sports nets and bird spikes for balconies, windows, ducts and grounds across Hyderabad and Secunderabad."
        image={heroImage("about", "invisible-grills")}
        crumbs={[{ href: "/", label: "Home" }, { label: "About" }]}
        actions={
          <>
            <GoldLink href="/contact">Request a measurement</GoldLink>
            <GhostLink href="/services">See the systems</GhostLink>
          </>
        }
      />
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-12 sm:px-6 md:grid-cols-3">
        {[
          ["Vision", "Open balconies and windows that stay bright, ventilated and harder to fall through, across Hyderabad and Secunderabad."],
          ["Mission", "Fit the service the opening needs, after an inspection, with the materials named in writing."],
          ["Promise", "No one-price-for-every-balcony fiction, no poison for pigeons, and no star rating we did not earn."],
        ].map(([title, text]) => (
          <article key={title} className="rounded-3xl border border-brand-100 bg-white p-6">
            <h2 className="font-display text-xl font-bold">{title}</h2>
            <p className="mt-3 text-sm leading-7 text-brand-800/80">{text}</p>
          </article>
        ))}
      </div>
      <div className="mx-auto max-w-6xl px-4 pb-8 sm:px-6">
        <h2 className="font-display text-3xl font-bold">The fitting starts with the space</h2>
        <ol className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            ["01", "Start with the opening", "Shape, railing condition, and the surfaces that can take a hook or an anchor decide the system."],
            ["02", "Think about daily use", "View, airflow, drying, children, pets, and cleaning access belong in the same plan."],
            ["03", "Keep the next step clear", "City, photos, and what the installation must do are enough to start. The written quote follows the visit."],
          ].map(([index, title, text]) => (
            <li key={title} className="rounded-3xl bg-white p-5 ring-1 ring-brand-100">
              <p className="font-display text-2xl font-extrabold text-cta-500">{index}</p>
              <h3 className="mt-2 font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-7 text-brand-800/75">{text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8">
          <CheckList items={points} />
        </div>
      </div>
      <div className="mx-auto grid max-w-6xl gap-6 px-4 pb-12 sm:px-6 lg:grid-cols-2">
        <Panel eyebrow="Coverage" title="One city, many kinds of opening">
          <div className="space-y-4 text-sm leading-7 text-brand-800/80">
            <p>West Hyderabad — Gachibowli, Kondapur, Madhapur, Hitech City, Manikonda and Kokapet — is towers and gated communities. Society rules on the facade belong in the visit plan.</p>
            <p>North and east apartments, from Kukatpally and Miyapur to Uppal, LB Nagar and Dilsukhnagar, are denser balconies, ducts and pigeon ledges.</p>
            <p>Secunderabad, Banjara Hills, Jubilee Hills, the Old City and the ORR villas change access, plaster and terrace size. Each opening is still measured on its own.</p>
          </div>
        </Panel>
        <Panel eyebrow="Quote" title="What a written estimate is expected to name">
          <CheckList
            items={[
              "The opening: balcony, window, duct, terrace, stair or a real practice ground.",
              "The system: cable, mesh, spikes, a drying line, or a sports net — and why that one.",
              "The material: stainless steel cable or sun-safe netting, and the walls it fixes to.",
              "Access: floor, society hours, and whether the locality changes the day.",
              "What is not included, so a second product on the same balcony is not hidden inside the first price.",
            ]}
          />
        </Panel>
      </div>
      <InstallationGallery photos={galleryCards("about", 6)} compact title="How the finished work looks" text="Cable, mesh, ducts and hangers from the same systems we specify after a site visit." />
    </>
  );
}
