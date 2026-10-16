import { cities } from "@/data/cities";
import { services } from "@/data/services";
import { QuoteForm } from "./QuoteForm";

export function QuotePanel(props: { service?: string; city?: string; need?: string }) {
  return <QuoteForm {...props} cityNames={cities.map((city) => city.name)} serviceNames={services.map((service) => service.name)} />;
}
