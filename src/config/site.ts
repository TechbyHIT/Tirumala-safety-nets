export const site = {
  name: "Tirumala Safety Nets",
  shortName: "Tirumala",
  tagline: "Safety nets, invisible grills and bird protection across Hyderabad",
  description:
    "Tirumala Safety Nets measures and installs balcony safety nets, pigeon nets, invisible grills, children and pet nets, cloth hangers and sports nets for homes and buildings across Hyderabad and Secunderabad. A written quote follows the site measurement.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:5125",
  phoneDisplay: process.env.NEXT_PUBLIC_PHONE_DISPLAY || "",
  phoneTel: process.env.NEXT_PUBLIC_PHONE_TEL || "",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || "",
  email: process.env.NEXT_PUBLIC_EMAIL || "care@tirumalasafetynets.in",
  hours: "Mon–Sun: 8:00 AM – 8:00 PM",
  address: "Hyderabad, Telangana, India",
  region: "Entire Hyderabad",
};

export function telHref() {
  return site.phoneTel ? `tel:${site.phoneTel}` : "/contact";
}

export function whatsappHref(text: string) {
  if (!site.whatsapp) return "";
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}
