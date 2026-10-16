import Link from "next/link";
import type { Area, City } from "@/data/cities";
import { cities, districts } from "@/data/cities";
import type { Intent, Service } from "@/data/services";
import { services } from "@/data/services";
import { comboSlug } from "@/lib/pages";
import { QuotePanel } from "./QuotePanel";
import { CheckList, CtaBand, FaqStatic, LinkCloud, PageHero } from "./ui";

function Frame({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px]">{children}</div>;
}

export function ServiceView({ service }: { service: Service }) {
  return (
    <>
      <PageHero
        eyebrow={service.group}
        title={service.name}
        highlight="across Hyderabad"
        text={service.lede}
        crumbs={[{ href: "/", label: "Home" }, { href: "/services", label: "Services" }, { label: service.name }]}
      />
      <Frame>
        <div className="space-y-10">
          <section>
            <h2 className="font-display text-2xl font-bold">Where this is going wrong</h2>
            <div className="mt-4"><CheckList items={service.problems} /></div>
          </section>
          <section>
            <h2 className="font-display text-2xl font-bold">What a proper fit changes</h2>
            <div className="mt-4"><CheckList items={service.benefits} /></div>
          </section>
          <section className="grid gap-6 md:grid-cols-2">
            <div>
              <h2 className="font-display text-2xl font-bold">Where we install</h2>
              <div className="mt-4"><CheckList items={service.where} /></div>
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold">Materials</h2>
              <div className="mt-4"><CheckList items={service.materials} /></div>
            </div>
          </section>
          <section>
            <h2 className="font-display text-2xl font-bold">What moves the quote</h2>
            <div className="mt-4"><CheckList items={service.priceFactors} /></div>
          </section>
          {service.intents.length > 0 ? (
            <LinkCloud
              title="Related briefs"
              links={service.intents.map((intent) => ({ href: `/${intent.slug}`, label: intent.title }))}
            />
          ) : null}
          <LinkCloud
            title={`${service.name} by city`}
            links={cities.map((city) => ({
              href: `/${comboSlug(service.slug, city.slug)}`,
              label: `${service.name} in ${city.name}`,
            }))}
          />
          <section>
            <h2 className="font-display text-2xl font-bold">Questions</h2>
            <div className="mt-4">
              <FaqStatic items={service.faqs} />
            </div>
          </section>
        </div>
        <QuotePanel service={service.name} />
      </Frame>
      <CtaBand title={`Planning ${service.name.toLowerCase()}?`} text="Every opening in Hyderabad has its own span, wall and access. Start with a measurement." />
    </>
  );
}

export function IntentView({ service, intent }: { service: Service; intent: Intent }) {
  return (
    <>
      <PageHero
        eyebrow={service.name}
        title={intent.title}
        highlight="in Hyderabad"
        text={intent.angle}
        crumbs={[
          { href: "/", label: "Home" },
          { href: `/${service.slug}`, label: service.name },
          { label: intent.title },
        ]}
      />
      <Frame>
        <div className="space-y-8">
          <p className="text-base leading-8 text-brand-800/85">{service.lede}</p>
          <CheckList items={service.benefits} />
          <LinkCloud
            title="Same brief, local pages"
            links={cities.slice(0, 12).map((city) => ({
              href: `/${comboSlug(service.slug, city.slug)}`,
              label: `${service.name} in ${city.name}`,
            }))}
          />
          <FaqStatic items={service.faqs} />
        </div>
        <QuotePanel service={service.name} />
      </Frame>
    </>
  );
}

export function ComboView({ service, city }: { service: Service; city: City }) {
  const localFaqs = [
    {
      q: `Do you measure ${service.name.toLowerCase()} in ${city.name}?`,
      a: `${city.visitNote} ${service.name} is quoted only after that opening is measured.`,
    },
    {
      q: `Which material do you use in ${city.name}?`,
      a: city.materialHint,
    },
    ...service.faqs,
  ];
  return (
    <>
      <PageHero
        eyebrow={`${city.region} | ${city.district} district`}
        title={`${service.name} in ${city.name}`}
        text={`${city.intro} ${service.summary}`}
        crumbs={[
          { href: "/", label: "Home" },
          { href: `/${service.slug}`, label: service.name },
          { href: `/locations/${city.slug}`, label: city.name },
          { label: `${service.name} in ${city.name}` },
        ]}
      />
      <Frame>
        <div className="space-y-10">
          <div className="space-y-4 text-base leading-8 text-brand-800/85">
            <p>{service.lede}</p>
            <p>
              In {city.name} this work sits on {city.housing}. {city.climate}
            </p>
            <p>
              Neighbourhoods we are regularly asked about include {city.localities.join(", ")}. Nearby areas in {city.district} are booked from the same Hyderabad rota when the slot is workable.
            </p>
          </div>
          <section>
            <h2 className="font-display text-2xl font-bold">Local reasons people call</h2>
            <div className="mt-4"><CheckList items={service.problems} /></div>
          </section>
          <section>
            <h2 className="font-display text-2xl font-bold">How the fit is planned</h2>
            <div className="mt-4"><CheckList items={service.benefits} /></div>
          </section>
          <section>
            <h2 className="font-display text-2xl font-bold">Price factors in {city.name}</h2>
            <div className="mt-4"><CheckList items={[...service.priceFactors, city.materialHint]} /></div>
          </section>
          {city.areas.length > 0 ? (
            <LinkCloud
              title={`Areas in ${city.name}`}
              links={city.areas.map((area) => ({ href: `/areas/${area.slug}`, label: area.name }))}
            />
          ) : null}
          <LinkCloud
            title={`Other services in ${city.name}`}
            links={services
              .filter((item) => item.slug !== service.slug)
              .map((item) => ({ href: `/${comboSlug(item.slug, city.slug)}`, label: `${item.name} in ${city.name}` }))}
          />
          <FaqStatic items={localFaqs} />
        </div>
        <QuotePanel service={service.name} city={city.name} />
      </Frame>
      <CtaBand
        title={`${service.name} in ${city.name} starts with a measurement`}
        text="We do not price this from a statewide chart. Share the locality and the opening."
      />
    </>
  );
}

export function PriceView({
  title,
  intro,
  service,
}: {
  title: string;
  intro: string;
  service: Service;
}) {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title={title}
        text={intro}
        crumbs={[{ href: "/", label: "Home" }, { href: `/${service.slug}`, label: service.name }, { label: "Price" }]}
      />
      <Frame>
        <div className="space-y-8">
          <CheckList items={service.priceFactors} />
          <p className="text-sm leading-7 text-brand-800/80">
            After the visit you get a written figure for material, fittings and labour. Society permission, floor height and an awkward corner are line items when they are real, not surprises after fitting.
          </p>
          <LinkCloud
            title="City pages"
            links={cities.slice(0, 16).map((city) => ({
              href: `/${comboSlug(service.slug, city.slug)}`,
              label: `${service.name} in ${city.name}`,
            }))}
          />
        </div>
        <QuotePanel service={service.name} />
      </Frame>
    </>
  );
}

export function CityView({ city }: { city: City }) {
  return (
    <>
      <PageHero
        eyebrow={`${city.region} | ${city.district}`}
        title={`Safety nets and invisible grills in ${city.name}`}
        text={city.intro}
        crumbs={[{ href: "/", label: "Home" }, { href: "/locations", label: "Locations" }, { label: city.name }]}
      />
      <Frame>
        <div className="space-y-10">
          <div className="grid gap-4 md:grid-cols-2">
            <article className="rounded-3xl bg-white p-5 ring-1 ring-brand-100">
              <h2 className="font-semibold">Climate</h2>
              <p className="mt-2 text-sm leading-7 text-brand-800/80">{city.climate}</p>
            </article>
            <article className="rounded-3xl bg-white p-5 ring-1 ring-brand-100">
              <h2 className="font-semibold">Materials conversation</h2>
              <p className="mt-2 text-sm leading-7 text-brand-800/80">{city.materialHint}</p>
            </article>
          </div>
          <p className="text-base leading-8 text-brand-800/85">
            Most of the work in {city.name} is on {city.housing}. {city.visitNote}
          </p>
          <LinkCloud
            title={`Services in ${city.name}`}
            links={services.map((service) => ({
              href: `/${comboSlug(service.slug, city.slug)}`,
              label: `${service.name} in ${city.name}`,
            }))}
          />
          {city.areas.length > 0 ? (
            <div className="grid gap-3 md:grid-cols-2">
              {city.areas.map((area) => (
                <Link key={area.slug} href={`/locations/hyderabad/${city.slug}/${area.slug}`} className="rounded-3xl border border-brand-100 bg-white p-4">
                  <h3 className="font-semibold">{area.name}</h3>
                  <p className="mt-2 text-sm leading-6 text-brand-800/75">{area.detail}</p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm leading-7 text-brand-800/80">
              Localities we are asked for include {city.localities.join(", ")}.
            </p>
          )}
          <FaqStatic
            items={[
              { q: `Do you visit ${city.name}?`, a: city.visitNote },
              { q: `What should the quote name in ${city.name}?`, a: city.materialHint },
              {
                q: "Do you cover the rest of the district?",
                a: `Yes. ${city.district} district is in scope. Towns beyond the city proper are confirmed against travel time before the day is locked.`,
              },
            ]}
          />
        </div>
        <QuotePanel city={city.name} />
      </Frame>
      <CtaBand title={`Book a measurement in ${city.name}`} text="Share the locality and whether you need cable, mesh, spikes, a hanger or a sports net." />
    </>
  );
}

export function AreaView({ city, area }: { city: City; area: Area }) {
  return (
    <>
      <PageHero
        eyebrow={city.name}
        title={`Invisible grills and safety nets in ${area.name}`}
        text={area.detail}
        crumbs={[
          { href: "/", label: "Home" },
          { href: `/locations/${city.slug}`, label: city.name },
          { label: area.name },
        ]}
      />
      <Frame>
        <div className="space-y-8">
          <p className="text-base leading-8 text-brand-800/85">
            {area.name} is measured with the rest of {city.name}. {city.climate} {city.materialHint}
          </p>
          <LinkCloud
            title={`Services for ${area.name}`}
            links={services.map((service) => ({
              href: `/${comboSlug(service.slug, city.slug)}`,
              label: `${service.name} in ${city.name}`,
            }))}
          />
          <LinkCloud
            title={`Other areas in ${city.name}`}
            links={city.areas.filter((item) => item.slug !== area.slug).map((item) => ({ href: `/areas/${item.slug}`, label: item.name }))}
          />
        </div>
        <QuotePanel city={`${area.name}, ${city.name}`} />
      </Frame>
    </>
  );
}

export function DistrictList() {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {districts.map((district) => {
        const hub = cities.find((item) => item.name === district.hub || item.slug === district.hub.toLowerCase());
        return (
          <p key={district.name} className="rounded-2xl bg-white px-4 py-3 text-sm ring-1 ring-brand-100">
            <span className="font-semibold">{district.name}</span>
            <span className="text-brand-800/70"> · hub </span>
            {hub ? (
              <Link href={`/locations/hyderabad/${hub.slug}`} className="font-semibold text-brand-900">
                {district.hub}
              </Link>
            ) : (
              district.hub
            )}
          </p>
        );
      })}
    </div>
  );
}
