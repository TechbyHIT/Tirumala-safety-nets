import type { Area } from "./cities";
import { fillSparseAreas } from "./area-factory";
// extraAreas is merged in cities.ts via attachAreas — keep city slugs aligned.

function n(slug: string, name: string, detail: string): Area {
  return { slug, name, detail };
}

export const extraAreas: Record<string, Area[]> = {
  visakhapatnam: [
    n("dwaraka-nagar", "Dwaraka Nagar", "Central commercial-residential streets with older apartment balconies over shops and busy bus routes."),
    n("siripuram", "Siripuram", "Junction-side flats and offices where window invisible grills and balcony nets share tight service access."),
    n("asilmetta", "Asilmetta", "Mid-town apartments with French windows and society rules on drilling the common facade."),
    n("pendurthi", "Pendurthi", "Western growth of independent houses and new mid-rise blocks with open stair voids and terrace drying."),
    n("bheemunipatnam", "Bheemunipatnam", "Coastal town-edge homes where salt air, beach wind and balcony fall gaps belong in the same quote."),
    n("sagar-nagar", "Sagar Nagar", "Beach-approach apartments with sea-facing balconies, pigeon ledges and a real SS316 conversation."),
    n("lawsons-bay", "Lawsons Bay Colony", "Older coastal colony houses and low-rise flats; window openings and terrace edges take humid Bay air."),
    n("akkayyapalem", "Akkayyapalem", "Dense inner-city housing with compact balcony railings and utility ducts that collect pigeons."),
    n("maddilapalem", "Maddilapalem", "Transit-side apartments where balcony child safety and cloth hangers are often booked together."),
    n("malkapuram", "Malkapuram", "Southern industrial-adjacent houses and small flats with terrace nets and duct bird problems."),
    n("kancharapalem", "Kancharapalem", "Older railway-side stock: plastered brick walls, mixed railing heights and window grill requests."),
    n("simhachalam", "Simhachalam", "Foothill houses and temple-approach homes where stair nets and terrace edges follow the slope."),
    n("sujatha-nagar", "Sujatha Nagar", "Planned residential streets of duplex houses with open staircases and balcony sit-outs."),
    n("vepagunta", "Vepagunta", "Northern fringe houses and small apartment blocks with wide terraces used for drying."),
    n("anandapuram", "Anandapuram", "Highway-side layouts and villas with long balcony runs and garden-facing windows."),
    n("sabbavaram", "Sabbavaram", "Outer residential and house plots where terrace fall protection is the usual first brief."),
    n("duvvada", "Duvvada", "Railway and steel-belt housing with compact balconies and pigeon pressure on utility ledges."),
    n("steel-plant-township", "Steel Plant Township", "Township flats and houses with repeating balcony modules, ducts and association approval steps."),
    n("auto-nagar-vizag", "Auto Nagar", "Workshop-adjacent homes and small apartments; balcony nets and window cables on dusty walls."),
    n("old-gajuwaka", "Old Gajuwaka", "Older lanes of houses and walk-ups with stair voids, terrace storage and bird ledges."),
    n("one-town-vizag", "One Town", "Historic core streets: window openings over shops, mixed wall ages and tight ladder access."),
    n("allipuram", "Allipuram", "Inner residential blocks with balcony railings of mixed heights and frequent pigeon nesting."),
    n("waltair-uplands", "Waltair Uplands", "Elevated older homes and apartments; sea breeze, French windows and a view-led grill brief."),
    n("cbm-compound", "CBM Compound", "Established central colony with houses, low flats and window child-safety requests."),
    n("jagadamba", "Jagadamba Junction", "Core junction flats above commercial streets; compact balconies and facade-sensitive cable work."),
    n("narava", "Narava", "Western residential outgrowth of houses and new layouts with open terraces."),
    n("marikavalasa", "Marikavalasa", "Northern corridor villas and apartments with L-shaped balconies and society facade rules."),
    n("endada", "Endada", "Hill-edge homes between the beach road and the IT belt; wind and salt on upper balconies."),
    n("sontyam", "Sontyam", "Outer northern houses and farm-edge plots with terrace edges and stair openings."),
    n("tagarapuvalasa", "Tagarapuvalasa", "Bheemili-road town edge: independent houses, small apartments and humid coastal fittings."),
    n("venkojipalem", "Venkojipalem", "Residential pocket of flats and houses with balcony drying and window mesh requests."),
    n("muralinagar", "Muralinagar", "Established colony streets; duplex stairs, balcony nets and older plaster anchors."),
    n("madhavadhara", "Madhavadhara", "Hill-adjacent houses and apartments where balcony corners turn with the slope."),
    n("lalitha-nagar", "Lalitha Nagar", "Central-east homes with mixed balcony depths and frequent cloth-hanger fittings."),
    n("maharanipeta", "Maharanipeta", "Older coastal-adjacent streets: window grills, low balconies and humid wall conditions."),
    n("ram-nagar-vizag", "Ram Nagar", "Inner residential grid of houses and small flats; stair nets and balcony child safety."),
    n("pandurangapuram", "Pandurangapuram", "Beach-side residential streets with sea-facing balconies and pigeon ledges on parapets."),
    n("isukathota", "Isukathota", "Mid-north apartments and houses along the main corridor; repeating balcony modules."),
    n("kurmannapalem", "Kurmannapalem", "Industrial-south housing with terrace drying, duct nets and dusty balcony tracks."),
    n("sheela-nagar", "Sheela Nagar", "Gajuwaka-side colony of houses and walk-ups; balcony railings and utility bird issues."),
    n("aganampudi", "Aganampudi", "Western industrial fringe houses and new layouts with open terrace edges."),
    n("mindi", "Mindi", "Port-adjacent neighbourhood of houses and small blocks; salt air on balcony hardware."),
    n("pedagantyada", "Pedagantyada", "Southern residential and industrial-edge streets with terrace nets and window openings."),
    n("sriharipuram", "Sriharipuram", "Dense southern housing; compact balconies, ducts and evening mosquito-screen requests."),
    n("chinamushidiwada", "Chinamushidiwada", "Northern outer houses and small apartments with wide sit-outs and stair voids."),
    n("adavivaram", "Adavivaram", "Foothill approach homes; terrace edges, monkey-prone trees in places, and slope-side balconies."),
    n("kapuluppada", "Kapuluppada", "Beach-north layouts of villas and apartments with exposed balconies and wind."),
    n("thimmapuram", "Thimmapuram", "Northern coastal-plain houses and new plots with terrace fall gaps."),
    n("gambhiram", "Gambhiram", "IT-north outgrowth of gated apartments and houses with society balcony rules."),
    n("dabagardens", "Dabagardens", "Older central gardens-side homes; window openings and low balcony railings."),
    n("resapuvanipalem", "Resapuvanipalem", "Inner north-east flats and houses with balcony nets and pigeon AC ledges."),
    n("lankelapalem", "Lankelapalem", "Western industrial-corridor housing with terrace storage and duct bird control."),
    n("pisinikada", "Pisinikada", "Outer western houses and layouts; stair voids and long terrace parapets."),
    n("seethammadhara", "Seethammadhara", "Established north-central apartments and houses; window and stair openings differ on every floor."),
  ],
  vijayawada: [
    n("auto-nagar-vij", "Auto Nagar", "Workshop-belt homes and small apartments; dusty balcony walls and window cables on old plaster."),
    n("currency-nagar", "Currency Nagar", "Planned residential blocks of apartments with repeating balconies and active pigeon ledges."),
    n("gannavaram", "Gannavaram", "Airport-side town edge: houses, new flats and terrace drying on the Krishna-district fringe."),
    n("enikepadu", "Enikepadu", "Western outgrowth of gated apartments and independent houses with wide balcony sit-outs."),
    n("ramavarappadu", "Ramavarappadu", "NH-side residential growth; mid-rise balconies and society permission for facade work."),
    n("gollapudi", "Gollapudi", "Krishna-west houses and walk-ups with open stairs and terrace edges above the river approach."),
    n("ibrahimpatnam-vij", "Ibrahimpatnam", "Southern town-edge houses and new layouts with terrace fall protection and school-ground nets."),
    n("payakapuram", "Payakapuram", "Northern residential streets of houses and small flats; balcony child safety and cloth hangers."),
    n("ajit-singh-nagar", "Ajit Singh Nagar", "Dense housing colony with compact balcony railings and utility-duct pigeon nets."),
    n("bhavanipuram", "Bhavanipuram", "River-west neighbourhood of houses and apartments; stair voids and humid balcony hooks."),
    n("krishnalanka", "Krishnalanka", "Older island-side streets; window openings, low balconies and mixed wall ages."),
    n("one-town-vij", "One Town", "Historic core: balconies over shops, tight access and facade-sensitive invisible grills."),
    n("vidhyadharapuram", "Vidhyadharapuram", "Established colony of duplex houses with open staircases and balcony nets."),
    n("yanamalakuduru", "Yanamalakuduru", "Eastern residential expansion; villas and flats with L-shaped balconies."),
    n("penamaluru", "Penamaluru", "Southern mandal-edge houses and new apartments with terrace and window work."),
    n("nunna", "Nunna", "Northern fringe houses and layouts; wide terraces used for drying and storage."),
    n("satyanarayanapuram", "Satyanarayanapuram", "Inner residential grid; balcony railings of mixed heights and frequent bird spikes on parapets."),
    n("siddhartha-nagar", "Siddhartha Nagar", "College-adjacent rentals and houses; children safety nets and mosquito screens as separate jobs."),
    n("tarapet", "Tarapet", "Old-town commercial-residential streets with window grills over narrow lanes."),
  ],
  guntur: [
    n("arundelpet", "Arundelpet", "Central residential-commercial streets with older balcony railings above shops."),
    n("kothapet-guntur", "Kothapet", "Busy inner neighbourhood of houses and walk-ups; stair nets and compact balconies."),
    n("syamala-nagar", "Syamala Nagar", "Planned colony of houses and low flats with terrace drying and window openings."),
    n("old-guntur", "Old Guntur", "Historic lanes; mixed wall plaster, window child safety and tight ladder access."),
    n("pedakakani", "Pedakakani", "Eastern fringe houses and new layouts with open terrace edges and school compounds."),
    n("stambhalagaruvu", "Stambhalagaruvu", "Residential extension of apartments and houses along the ring; repeating balcony modules."),
  ],
  kakinada: [
    n("bhanugudi", "Bhanugudi Junction", "Central apartment and house mix; balcony pigeon nets and evening mosquito screens."),
    n("vakalapudi", "Vakalapudi", "Industrial-north housing with terrace nets and salt-influenced balcony hardware."),
    n("sarpavaram", "Sarpavaram", "Temple-side residential streets of houses and small flats with window openings."),
    n("turangi", "Turangi", "Outgrowth houses and layouts toward the port road; exposed terraces and bird ledges."),
    n("indrapalem", "Indrapalem", "Coastal-plain houses and new plots with balcony sit-outs and humid fittings."),
    n("gandhi-nagar-kkd", "Gandhi Nagar", "Established colony; duplex stairs, cloth hangers and balcony child safety."),
  ],
  rajahmundry: [
    n("danavaipeta", "Danavaipeta", "Apartment growth pocket with repeating balconies and active pigeon nesting on ledges."),
    n("rajanagaram", "Rajanagaram", "Northern corridor houses and new flats; terrace drying and highway-side dust on walls."),
    n("aryapuram", "Aryapuram", "Older Godavari-side streets; window openings and low balcony railings on humid walls."),
    n("kambala-cheruvu", "Kambala Cheruvu", "Residential lake-side layouts of houses and small apartments with sit-out balconies."),
    n("innespeta", "Innespeta", "Central commercial-residential streets; facade-sensitive cable grills and compact nets."),
  ],
  nellore: [
    n("stonehousepet", "Stonehousepet", "Older inner streets of houses and walk-ups; window grills and mixed railing heights."),
    n("ak-nagar", "A.K. Nagar", "Planned residential blocks with apartment balconies and association drilling rules."),
    n("fathekhanpet", "Fathekhanpet", "Dense housing with compact balconies, ducts and pigeon AC trays."),
    n("venkatachalam", "Venkatachalam", "Southern fringe houses and layouts; terrace edges and school-ground sports nets."),
  ],
  tirupati: [
    n("bairagipatted", "Bairagipatted", "Dense residential pocket of houses and flats; balcony nets and window child safety."),
    n("tk-street", "T.K. Street area", "Central streets near daily traffic; compact balconies over mixed-use buildings."),
    n("chandragiri", "Chandragiri", "Fort-town edge houses and new layouts; terrace fall gaps and foothill sun on mesh."),
    n("tiruchanur", "Tiruchanur", "Temple-approach homes and small apartments with balcony sit-outs and pigeon ledges."),
    n("avilala", "Avilala", "Outer residential growth of houses and gated streets with wide terraces."),
  ],
  kurnool: [
    n("nandyal-road", "Nandyal Road", "Highway-side apartments and houses with west-facing balconies and hard summer UV."),
    n("adoni-road-side", "Adoni Road side", "Western residential extension; terrace nets and dusty balcony tracks."),
    n("gayatri-estate", "Gayatri Estate", "Planned housing streets of houses and low flats with stair voids and drying hangers."),
  ],
  eluru: [
    n("powerpet", "Powerpet", "Railway-side commercial-residential streets with balcony railings over shops."),
    n("ashok-nagar-eluru", "Ashok Nagar", "Established colony of houses and apartments; cloth hangers and children safety nets."),
    n("rr-pet", "R.R. Pet", "Central residential grid; window openings and compact balcony modules."),
    n("sanivarapupeta", "Sanivarapupeta", "Outgrowth houses and new layouts with terrace edges and open stairs."),
  ],
  anakapalle: [
    n("anakapalle-town", "Anakapalle town", "Market-core houses and new mid-rise flats with balcony sit-outs and humid fittings."),
    n("kasimkota", "Kasimkota road", "Highway houses and small apartments; terrace drying and window cables."),
  ],
  vizianagaram: [
    n("fort-area-vzm", "Fort area", "Old fort-city houses with internal courts, terrace edges and window openings."),
    n("cantonment-vzm", "Cantonment side", "Laid-out streets of houses and low flats with balcony railings of mixed ages."),
    n("dasannapeta", "Dasannapeta", "Residential extension; duplex stairs and new apartment balconies."),
  ],
  srikakulam: [
    n("balaga", "Balaga", "Town residential side of houses and small flats with terrace nets and balcony gaps."),
    n("day-night-junction", "Day & Night Junction", "Central streets; compact balconies over shops and humid coastal-plain air."),
  ],
  bhimavaram: [
    n("juvvalapalem", "Juvvalapalem", "Residential pocket of town houses with terrace water tanks and pigeon gaps between walls."),
    n("college-road-bvr", "College side", "Rental houses and small apartments; children nets and mosquito screens as separate lines."),
  ],
  ongole: [
    n("bhagyanagar-ongole", "Bhagyanagar", "Residential colony of houses and bypass-side flats with west-facing balconies."),
    n("lawyerpet", "Lawyerpet", "Established streets; window openings and terrace edges in hot Prakasam sun."),
  ],
  kadapa: [
    n("nagarajupeta", "Nagarajupeta", "Central residential streets of houses and apartments; terrace UV and dusty tracks."),
    n("rims-side", "RIMS side", "Hospital-adjacent housing; balcony child safety and window grills."),
  ],
  anantapur: [
    n("ramnagar-atp", "Ramnagar", "Residential colony with houses and small flats; terrace mesh must be UV-stable."),
    n("saptagiri-circle", "Saptagiri Circle", "Central junction-side apartments and houses with west-facing balcony sun."),
  ],
  nandyal: [
    n("nandi-temple-side", "Nandi temple side", "Town houses and new mid-rise blocks with terrace drying in dry Rayalaseema heat."),
  ],
  chittoor: [
    n("gandhipuram-ctr", "Gandhipuram", "Residential streets of houses and growing apartment lanes; UV on terrace nets."),
  ],
  machilipatnam: [
    n("bandar-town", "Bandar town", "Old port-town houses; salt air on window cables and balcony hardware."),
    n("housing-colonies-mtm", "Housing colonies", "Planned colony flats with balcony railings and humid coastal evenings."),
  ],
  amalapuram: [
    n("college-road-amp", "College road", "Town houses and small apartments; mosquito screens and balcony fall nets as two jobs."),
  ],
  tuni: [
    n("nh-tuni", "NH service lanes", "Highway houses and low-rise buildings with terrace storage and balcony sit-outs."),
  ],
  tadepalligudem: [
    n("station-tpg", "Station side", "Railway-side duplex houses with open staircases and compact balcony rails."),
  ],
  yellamanchili: [
    n("station-ylm", "Station road", "Town houses and low-rise flats; humid coastal-plain balconies and terrace edges."),
  ],
  narsipatnam: [
    n("agency-approach", "Agency approach", "Foothill-side houses with open terraces; monkey-prone trees in places and stair voids."),
  ],
  chirala: [
    n("weaving-streets", "Weaving streets", "Close-set traditional houses with new balcony openings that were never grilled."),
    n("beach-road-chirala", "Beach road side", "Seaward houses and colonies; salt air on balcony cables and terrace nets."),
  ],
  tenali: [
    n("chinaravuru", "Chinaravuru", "Town-edge houses and small apartments with balcony openings high above the lane."),
  ],
  gudivada: [
    n("railway-gdv", "Railway side", "Close-built houses on narrow plots; window grills and tight ladder plans."),
  ],
  madanapalle: [
    n("ctm-road", "CTM road side", "College-town houses and hostels; balcony nets and cooler-night but high-UV terraces."),
  ],
  hindupur: [
    n("bypass-hup", "Bypass", "Highway houses and small apartments; UV mesh and stainless spikes on hot parapets."),
  ],
  samalkot: [
    n("railway-colony-smt", "Railway colony", "Quarter-style houses and walk-ups with compact balconies and dusty window tracks."),
    n("industrial-samalkot", "Industrial side", "Factory-adjacent flats and houses; terrace drying and pigeon ledges on utility walls."),
  ],
  palakollu: [
    n("temple-side-pk", "Temple side", "Close-built town houses with balcony sit-outs, pigeon gaps and evening mosquito pressure."),
  ],
  tanuku: [
    n("college-tanuku", "College road", "Rental houses and small apartments; children safety nets and stair voids in duplexes."),
  ],
  narasapuram: [
    n("river-narsapur", "River side", "River-delta houses with humid balcony hardware and terrace edges above the water approach."),
  ],
  bobbili: [
    n("fort-bobbili", "Fort side", "Fort-town houses with internal courts, terrace edges and window openings that were never grilled."),
  ],
  parvathipuram: [
    n("quarters-pvp", "Quarters", "Government-quarter streets with repeating balcony modules and school-compound edges."),
  ],
  kavali: [
    n("college-kavali", "College roads", "Hostels and rental houses; balcony child safety and terrace UV on the Nellore-district highway town."),
  ],
  bapatla: [
    n("college-bapatla", "College side", "Hostels and town houses; seaward breeze on some balconies, sheltered streets on others."),
  ],
  mangalagiri: [
    n("amaravati-road-mgl", "Amaravati road apartments", "New gated apartment balconies with society facade rules on the capital-region corridor."),
  ],
  tadepalli: [
    n("undavalli-side", "Undavalli side", "River-edge houses and new flats; humid balcony hooks and cave-approach residential streets."),
  ],
  proddatur: [
    n("market-proddatur", "Market streets", "Dense town houses over shops; compact balconies and hard Rayalaseema sun on terraces."),
  ],
  srikalahasti: [
    n("temple-skht", "Temple town", "Pilgrim-side houses and lodges used as homes; terrace UV and balcony sit-outs."),
  ],
  adoni: [
    n("market-adoni", "Market streets", "Old-town rooms over shops with window openings and dusty, hot balcony tracks."),
  ],
  paderu: [
    n("agency-paderu", "Agency approaches", "Hill-headquarters houses and quarters; wet-season hooks and, where trees sit on the terrace, a monkey-prone opening talk."),
  ],
  nuzvid: [
    n("college-nuzvid", "College roads", "Hostels and town houses with balcony sit-outs and terrace UV in a drier Eluru-district climate."),
  ],
  jangareddygudem: [
    n("foothill-jrg", "Foothill side", "Houses toward the Ghats edge; terrace openings and, where trees lean on the parapet, a wildlife-exclusion talk."),
  ],
  tekkali: [
    n("nh-tekkali", "NH side", "Highway houses and small flats; humid coastal-plain balconies near the Odisha border."),
  ],
  chodavaram: [
    n("school-chdv", "School side", "Mandal-town houses and school compounds with terrace edges and window openings."),
  ],
  palasa: [
    n("kasibugga", "Kasibugga", "Twin-town houses and trade streets; humid balcony hardware and terrace drying."),
  ],
};

export function attachAreas<T extends { slug: string; name: string; region: string; district: string; climate: string; housing: string; visitNote: string; materialHint: string; areas: Area[]; localities: string[] }>(list: T[]): T[] {
  const merged = list.map((city) => {
    const extra = extraAreas[city.slug] ?? [];
    const map = new Map(city.areas.map((area) => [area.slug, area]));
    const names = new Set(city.areas.map((area) => area.name.toLowerCase()));
    for (const area of extra) {
      if (map.has(area.slug) || names.has(area.name.toLowerCase())) continue;
      map.set(area.slug, area);
      names.add(area.name.toLowerCase());
    }
    const areas = [...map.values()];
    const localityNames = new Set([...city.localities, ...areas.map((area) => area.name)]);
    return { ...city, areas, localities: [...localityNames] };
  });
  return fillSparseAreas(merged);
}
