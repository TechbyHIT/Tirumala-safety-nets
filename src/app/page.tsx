import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";
import { absoluteUrl } from "@/seo/urls";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/") },
};

export default function Page() {
  return <HomePage />;
}
