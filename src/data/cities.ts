import { hyderabadLocalities } from "./hyderabad-areas";
import { attachAreas } from "./neighbourhoods";

export type Area = {
  slug: string;
  name: string;
  detail: string;
};

export type Region =
  | "West Hyderabad"
  | "North Hyderabad"
  | "Central Hyderabad"
  | "Secunderabad"
  | "East Hyderabad"
  | "South Hyderabad"
  | "ORR and Outskirts";

export type City = {
  slug: string;
  name: string;
  region: Region;
  district: string;
  intro: string;
  climate: string;
  housing: string;
  materialHint: string;
  visitNote: string;
  localities: string[];
  areas: Area[];
};

export const districts = [
  { name: "Serilingampally", hub: "Gachibowli" },
  { name: "Kukatpally", hub: "Kukatpally" },
  { name: "Khairatabad", hub: "Banjara Hills" },
  { name: "Secunderabad", hub: "Secunderabad" },
  { name: "LB Nagar", hub: "LB Nagar" },
  { name: "Charminar", hub: "Old City" },
  { name: "Uppal", hub: "Uppal" },
  { name: "Malkajgiri", hub: "Malkajgiri" },
  { name: "Quthbullapur", hub: "Kompally" },
  { name: "Rajendranagar", hub: "Attapur" },
  { name: "Rangareddy", hub: "Kokapet" },
  { name: "Medchal", hub: "Medchal" },
  { name: "Sangareddy", hub: "Patancheru" },
  { name: "Shamshabad", hub: "Shamshabad" },
] as const;

const climate =
  "Hyderabad summers are hot, then the rains keep balcony walls damp for weeks. West-facing nets need to be made for the sun. Pigeons use AC trays, sunshades and service ducts on apartment towers.";

function hub(
  slug: string,
  name: string,
  region: Region,
  district: string,
  intro: string,
  housing: string,
  localities: string[],
  materialHint = "Sun-safe netting for balconies, stainless steel cable for invisible grills, and stainless hooks. The written quote names what we fit after the opening is measured.",
): City {
  return {
    slug,
    name,
    region,
    district,
    intro,
    climate,
    housing,
    materialHint,
    visitNote: `${name} is on the Hyderabad measurement rota. Share the locality, floor, society timing and one photo of the opening so the visit can be confirmed.`,
    localities,
    areas: [],
  };
}

const citySeeds: City[] = [
  hub("gachibowli", "Gachibowli", "West Hyderabad", "Hyderabad", "Gachibowli mixes IT-corridor towers, gated communities and villa pockets. Balconies are wide, society rules on the facade are strict, and pigeon dust on AC ledges is a regular brief.", "high-rise apartments, gated communities and villas", ["Financial District", "Nanakramguda", "Gowlidoddi", "ISB Road", "Telecom Nagar"]),
  hub("kondapur", "Kondapur", "West Hyderabad", "Hyderabad", "Kondapur is a dense residential belt beside the IT corridor: mid and high-rise flats, utility balconies, and families who want the view kept open.", "apartments and gated communities", ["Botanical Garden", "Kothaguda", "Masjid Banda", "Whitefields", "Kondapur Village"]),
  hub("madhapur", "Madhapur", "West Hyderabad", "Hyderabad", "Madhapur towers sit on the Hitech City edge. Open balconies, French windows and service shafts are the usual openings.", "high-rise apartments", ["Ayyappa Society", "Kavuri Hills", "Image Gardens", "Silicon Valley"]),
  hub("hitech-city", "Hitech City", "West Hyderabad", "Hyderabad", "Hitech City is towers, offices and the homes around them. Balcony fall gaps and pigeon entry on upper floors lead the enquiries.", "apartments and commercial frontages", ["Mindspace", "Cyber Towers", "Izzatnagar", "Hitech City Road"]),
  hub("manikonda", "Manikonda", "West Hyderabad", "Hyderabad", "Manikonda and Puppalaguda are apartment and villa streets along the ORR approach, with L-shaped balconies and society facade rules.", "apartments and villas", ["Puppalaguda", "Alkapur Township", "OU Colony", "Manikonda Jagir"]),
  hub("nallagandla", "Nallagandla", "West Hyderabad", "Hyderabad", "Nallagandla, Tellapur and Gopanpally are newer gated housing. Wide sit-outs and stair voids show up together.", "gated apartments and villas", ["Tellapur", "Gopanpally", "Nallagandla HUDA", "Serilingampally"]),
  hub("kokapet", "Kokapet", "West Hyderabad", "Rangareddy", "Kokapet, Narsingi and Gandipet are premium towers and villa plots on the western ORR. View, cable finish and terrace edges are the usual brief.", "premium towers and villas", ["Narsingi", "Gandipet", "Khajaguda", "Neopolis", "Golden Mile"]),
  hub("raidurg", "Raidurg", "West Hyderabad", "Hyderabad", "Raidurg and Knowledge City are high-rise residential and office edges where balcony nets and invisible grills are planned around a strict elevation.", "high-rise apartments", ["Knowledge City", "Raidurgam", "Wipro Circle", "Panmaktha"]),
  hub("kukatpally", "Kukatpally", "North Hyderabad", "Hyderabad", "Kukatpally and KPHB are some of Hyderabad's densest apartment streets. Compact balconies, ducts and pigeon ledges are booked every week.", "dense apartments and houses", ["KPHB Phase 1", "KPHB Phase 3", "KPHB Phase 6", "Allwyn Colony", "Vivekananda Nagar"]),
  hub("miyapur", "Miyapur", "North Hyderabad", "Hyderabad", "Miyapur is the north-west growth corridor: new towers, older houses and a mix of balcony, window and terrace jobs.", "apartments and independent houses", ["Miyapur X Roads", "Deepthisri Nagar", "Mayuri Nagar", "Gangaram"]),
  hub("nizampet", "Nizampet", "North Hyderabad", "Medchal-Malkajgiri", "Nizampet, Pragathi Nagar and Bachupally are gated flats and houses where children, pets and drying share the same balcony.", "gated apartments and houses", ["Pragathi Nagar", "Bachupally", "Nizampet Road", "Bowrampet"]),
  hub("chandanagar", "Chandanagar", "North Hyderabad", "Hyderabad", "Chandanagar, Madinaguda and Hafeezpet sit between Miyapur and the ORR. Mid-rise balconies and utility corners are the common opening.", "mid-rise apartments", ["Madinaguda", "Hafeezpet", "Lingampally", "Gangaram"]),
  hub("moosapet", "Moosapet", "North Hyderabad", "Hyderabad", "Moosapet, Erragadda and Sanath Nagar mix older flats and houses. Window openings and stair voids need their own measurement.", "older apartments and houses", ["Bharat Nagar", "Erragadda", "Sanath Nagar", "Moti Nagar"]),
  hub("balanagar", "Balanagar", "North Hyderabad", "Hyderabad", "Balanagar and Ferozguda are industrial-edge housing with compact balconies, terrace drying and pigeon pressure on utility ledges.", "houses and small apartments", ["Ferozguda", "IDA Balanagar", "Kukatpally Y Junction", "Shobana Colony"]),
  hub("banjara-hills", "Banjara Hills", "Central Hyderabad", "Hyderabad", "Banjara Hills homes and apartments are planned around the view. Cable grills and quiet balcony nets are compared before a grade is named.", "villas, apartments and independent homes", ["Road No 1", "Road No 10", "Road No 12", "MLA Colony"]),
  hub("jubilee-hills", "Jubilee Hills", "Central Hyderabad", "Hyderabad", "Jubilee Hills and Film Nagar mix villas and premium flats. Stair voids, wide sit-outs and a clean cable finish are the usual conversation.", "villas and premium apartments", ["Road No 36", "Road No 45", "Film Nagar", "Checkpost"]),
  hub("ameerpet", "Ameerpet", "Central Hyderabad", "Hyderabad", "Ameerpet, SR Nagar and Punjagutta are dense inner-city flats. Compact balconies, windows over the lane and pigeon AC corners share the same streets.", "dense apartments", ["SR Nagar", "Balkampet", "Punjagutta", "Greenlands"]),
  hub("somajiguda", "Somajiguda", "Central Hyderabad", "Hyderabad", "Somajiguda and Himayatnagar sit between the business core and older residential blocks. Window grills and balcony nets are both requested.", "apartments and houses", ["Raj Bhavan Road", "Himayatnagar", "Prakash Nagar"]),
  hub("khairatabad", "Khairatabad", "Central Hyderabad", "Hyderabad", "Khairatabad, Lakdikapul and Nampally mix offices, older flats and houses. Access and wall condition lead the quote.", "apartments, houses and commercial frontages", ["Lakdikapul", "Nampally", "Masab Tank", "Bazarghat"]),
  hub("begumpet", "Begumpet", "Central Hyderabad", "Hyderabad", "Begumpet is established apartments and houses near the airport road. French windows and balcony drying are common.", "apartments and independent houses", ["SP Road", "Pattigadda", "Greenlands"]),
  hub("secunderabad", "Secunderabad", "Secunderabad", "Hyderabad", "Secunderabad covers the clock-tower core, Maredpally and older cantonment-side flats. Plaster, window reveals and pigeon ledges vary from block to block.", "older apartments and houses", ["Clock Tower", "Maredpally", "Park Lane", "Karkhana"]),
  hub("trimulgherry", "Trimulgherry", "Secunderabad", "Hyderabad", "Trimulgherry and Bolarum are cantonment and residential streets with houses, low flats and open stair edges.", "houses and low-rise apartments", ["Bolarum", "Lal Bazar", "Rashtrapati Nilayam"]),
  hub("sainikpuri", "Sainikpuri", "Secunderabad", "Hyderabad", "Sainikpuri, Neredmet and Yapral are family colonies and apartments. Balcony child safety and pigeon nets are often asked for together.", "colonies, apartments and houses", ["Neredmet", "Defence Colony", "Yapral", "Vayupuri"]),
  hub("alwal", "Alwal", "Secunderabad", "Hyderabad", "Alwal and Lothkunta sit on the northern Secunderabad edge: houses, new flats and terrace drying.", "houses and mid-rise apartments", ["Lothkunta", "Old Alwal", "Suchitra Cross"]),
  hub("malkajgiri", "Malkajgiri", "Secunderabad", "Medchal-Malkajgiri", "Malkajgiri is a large residential circle of apartments and houses. Ducts, balconies and window openings are measured separately.", "apartments and houses", ["Anandbagh", "Safilguda", "Mirjalaguda", "Gautam Nagar"]),
  hub("ecil", "ECIL", "Secunderabad", "Hyderabad", "ECIL, Kapra and AS Rao Nagar are north-east residential belts with repeating apartment balconies and utility bird problems.", "apartments and colonies", ["Kapra", "Kushai Guda", "Radhika Nagar", "AS Rao Nagar"]),
  hub("bowenpally", "Bowenpally", "Secunderabad", "Hyderabad", "Bowenpally and Diamond Point mix markets, older houses and flats. Window child safety and compact balcony nets are the usual start.", "houses and apartments", ["Tadbund", "Diamond Point", "Hasmathpet", "Old Bowenpally"]),
  hub("uppal", "Uppal", "East Hyderabad", "Hyderabad", "Uppal, Ramanthapur and Habsiguda are east-city apartments and houses. Pigeon nets on service balconies and child nets on family fronts are both common.", "apartments and houses", ["Uppal Depot", "Ramanthapur", "Habsiguda", "Survey of India"]),
  hub("lb-nagar", "LB Nagar", "East Hyderabad", "Hyderabad", "LB Nagar is a major eastern hub: Kothapet, Chaitanyapuri and dense apartment streets with balcony, duct and window work.", "dense apartments", ["Kothapet", "Chaitanyapuri", "Snehapuri Colony", "Mansoorabad"]),
  hub("dilsukhnagar", "Dilsukhnagar", "East Hyderabad", "Hyderabad", "Dilsukhnagar and Moosarambagh are busy residential streets. Compact balconies, older railings and pigeon AC corners share the same blocks.", "apartments and houses", ["Moosarambagh", "Gaddiannaram", "Chaderghat", "Malakpet"]),
  hub("nagole", "Nagole", "East Hyderabad", "Hyderabad", "Nagole and Saroornagar are eastern apartment growth with utility ducts and family balconies.", "apartments", ["Bandlaguda", "Saroornagar", "Hastinapuram"]),
  hub("vanasthalipuram", "Vanasthalipuram", "East Hyderabad", "Rangareddy", "Vanasthalipuram and Hayathnagar stretch toward the eastern edge: houses, new flats and terrace parapets used for drying.", "houses and apartments", ["Hayathnagar", "BN Reddy Nagar", "Panama", "Auto Nagar"]),
  hub("tarnaka", "Tarnaka", "East Hyderabad", "Hyderabad", "Tarnaka and the Osmania side are older residential streets with window openings, low balconies and mixed wall ages.", "older apartments and houses", ["Osmania University", "Lalapet", "Mettuguda"]),
  hub("boduppal", "Boduppal", "East Hyderabad", "Medchal-Malkajgiri", "Boduppal, Peerzadiguda and Narapally are newer eastern layouts of apartments and houses.", "apartments and independent houses", ["Peerzadiguda", "Chengicherla", "Narapally"]),
  hub("mehdipatnam", "Mehdipatnam", "South Hyderabad", "Hyderabad", "Mehdipatnam is a busy southern junction of apartments and houses. Balcony nets, window cables and pigeon ledges are planned around tight access.", "apartments and houses", ["Humayun Nagar", "NMDC", "Rethibowli", "Gudimalkapur"]),
  hub("tolichowki", "Tolichowki", "South Hyderabad", "Hyderabad", "Tolichowki and Shaikpet mix apartments and houses on the south-west inner ring. Family balconies and utility corners are the usual openings.", "apartments and houses", ["Shaikpet", "Galaxy", "Toli Chowki X Roads"]),
  hub("attapur", "Attapur", "South Hyderabad", "Hyderabad", "Attapur and Rajendranagar are southern residential growth along the PVNR corridor, with mid-rise balconies and new gated streets.", "apartments and gated communities", ["Rajendranagar", "Upperpally", "Hyderguda", "Pillar No 68"]),
  hub("santosh-nagar", "Santosh Nagar", "South Hyderabad", "Hyderabad", "Santosh Nagar, Chandrayangutta and Barkas are dense southern neighbourhoods. Window openings, stair voids and compact balconies need individual measurement.", "dense houses and apartments", ["Chandrayangutta", "Barkas", "IS Sadan", "Bandlaguda"]),
  hub("old-city", "Old City", "South Hyderabad", "Hyderabad", "The Old City around Charminar, Yakutpura and Falaknuma is close-built housing. Access, older plaster and window openings decide the fitting more than a catalogue size.", "close-built houses and small apartments", ["Charminar", "Moghalpura", "Yakutpura", "Falaknuma", "Pathergatti"]),
  hub("shamshabad", "Shamshabad", "South Hyderabad", "Rangareddy", "Shamshabad covers the airport belt and the town around it: houses, staff colonies and new layouts with terrace edges.", "houses, colonies and new layouts", ["Airport Colony", "Rajiv Gandhi International Airport", "Shamshabad Town", "Kothur Road"]),
  hub("kompally", "Kompally", "ORR and Outskirts", "Medchal-Malkajgiri", "Kompally and Suchitra are northern ORR housing: villas, gated apartments and open terraces.", "villas and gated apartments", ["Suchitra", "Gundlapochampally", "Jeedimetla", "Petbasheerabad"]),
  hub("ghatkesar", "Ghatkesar", "ORR and Outskirts", "Medchal-Malkajgiri", "Ghatkesar, Pocharam and Keesara are eastern growth with villas, apartments and long terrace parapets.", "villas and apartments", ["Pocharam", "Keesara", "Annojiguda", "NFC Nagar"]),
  hub("patancheru", "Patancheru", "ORR and Outskirts", "Sangareddy", "Patancheru, RC Puram and Beeramguda are the western industrial-residential fringe. Houses, BHEL-side colonies and new flats share the rota.", "houses, colonies and apartments", ["RC Puram", "Beeramguda", "Isnapur", "BHEL Township"]),
  hub("adibatla", "Adibatla", "ORR and Outskirts", "Rangareddy", "Adibatla and Tukkuguda are southern ORR townships and villa plots. Terrace edges and new balcony modules are the usual brief.", "townships and villas", ["Tukkuguda", "Maheshwaram", "Kongara Kalan"]),
  hub("ibrahimpatnam", "Ibrahimpatnam", "ORR and Outskirts", "Rangareddy", "Ibrahimpatnam and the south-east fringe are houses and new layouts where terrace fall protection is often the first request.", "houses and new layouts", ["Mangalpally", "Turkayamjal", "Manneguda"]),
  hub("medchal", "Medchal", "ORR and Outskirts", "Medchal-Malkajgiri", "Medchal and Shamirpet are northern outskirts of houses, small apartments and open plots.", "houses and small apartments", ["Shamirpet", "Athvelly", "Gundla Pochampally Road"]),
];

export const cities: City[] = attachAreas(
  citySeeds.map((city) => {
    const more = hyderabadLocalities[city.slug] ?? [];
    const localities = [...new Set([...city.localities, ...more])];
    return { ...city, localities };
  }),
);

export const regions: Region[] = [
  "West Hyderabad",
  "North Hyderabad",
  "Central Hyderabad",
  "Secunderabad",
  "East Hyderabad",
  "South Hyderabad",
  "ORR and Outskirts",
];

export function getCity(slug: string) {
  return cities.find((city) => city.slug === slug);
}

export function getArea(slug: string) {
  for (const city of cities) {
    const area = city.areas.find((item) => item.slug === slug);
    if (area) return { city, area };
  }
  return undefined;
}

export function citiesIn(region: City["region"]) {
  return cities.filter((city) => city.region === region);
}
