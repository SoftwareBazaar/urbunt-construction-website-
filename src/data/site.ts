export const company = {
  name: "Urban T Construction Co.",
  tagline: "From Foundation to Finishing — One Company, Every Trade.",
  phone: "+254 111 770 039",
  phoneHref: "tel:+254111770039",
  whatsapp: "254111770039",
  email: "Urbantconstructions@gmail.com",
  address: "Westways arcade northern bypass",
  hours: "Mon–Sat, 7:30am – 6:00pm",
};

export function whatsappLink(message: string) {
  return `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(message)}`;
}

export type Service = {
  slug: string;
  name: string;
  group: "Structural" | "MEP" | "Finishes & Interior" | "Outdoor & Security";
  blurb: string;
  scope: string[];
  materials: string[];
  from: string;
  faqs: { q: string; a: string }[];
  combine: string[];
};

export const services: Service[] = [
  {
    slug: "architecture-design",
    name: "Architecture & Design",
    group: "Structural",
    blurb: "Concept design, working drawings, 3D renders and a costed BOQ before a single block is laid.",
    scope: ["Concept & schematic design", "Working drawings", "3D renders & walkthroughs", "BOQ preparation", "Permit & approval support"],
    materials: ["Registered architects", "Licensed structural engineers", "County approval liaison"],
    from: "KSh 85,000",
    combine: ["masonry", "electrical", "plumbing"],
    faqs: [
      { q: "How long do drawings take?", a: "Concept in 7 days, full working drawings and BOQ within 3–4 weeks depending on scale." },
      { q: "Do you handle approvals?", a: "Yes — we prepare and submit the full approval package and track it to consent." },
    ],
  },
  {
    slug: "masonry",
    name: "Masonry",
    group: "Structural",
    blurb: "Block work, stone work, foundations and retaining walls built to engineered tolerances.",
    scope: ["Foundations & footings", "Machine-cut stone & block work", "Retaining walls", "Structural columns & beams", "Site setting out"],
    materials: ["Machine-cut stone", "Grade 32.5R/42.5N cement", "BS-certified rebar"],
    from: "KSh 1,200 / m²",
    combine: ["architecture-design", "roofing", "plastering-ceilings"],
    faqs: [
      { q: "Do you supply materials?", a: "We can build labour-only or supply-and-fix — both priced transparently in the BOQ." },
      { q: "Is a structural engineer involved?", a: "Every structural element is signed off by our in-house engineer." },
    ],
  },
  {
    slug: "carpentry",
    name: "Carpentry",
    group: "Structural",
    blurb: "Roof carpentry, doors, mahogany staircases, fitted furniture and bespoke artifacts.",
    scope: ["Roof trusses & purlins", "Doors & frames", "Mahogany staircases", "Fitted wardrobes & kitchens", "Custom furniture"],
    materials: ["Grade-A mahogany", "Treated cypress", "Marine plywood", "Blum fittings"],
    from: "KSh 45,000",
    combine: ["flooring", "painting-decor", "roofing"],
    faqs: [
      { q: "Can you match an existing finish?", a: "Yes — send a photo on WhatsApp and we'll match stain and profile." },
      { q: "Is timber treated?", a: "All structural timber is pressure-treated and warrantied against termites." },
    ],
  },
  {
    slug: "plumbing",
    name: "Plumbing",
    group: "MEP",
    blurb: "Water supply, drainage, modern shower installation and sealing, PVC systems and sanitary fittings.",
    scope: ["Water supply & distribution", "Drainage & soil stacks", "Shower installation & sealing", "Sanitary fittings", "Leak detection & repairs"],
    materials: ["PPR & uPVC systems", "Grundfos pumps", "Branded sanitaryware"],
    from: "KSh 12,000",
    combine: ["electrical", "flooring", "smart-security"],
    faqs: [
      { q: "Do you do emergency call-outs?", a: "Yes — message us on WhatsApp and we dispatch the nearest crew, usually same day." },
      { q: "Is the work warrantied?", a: "12-month workmanship warranty on all plumbing installations." },
    ],
  },
  {
    slug: "electrical",
    name: "Electrical",
    group: "MEP",
    blurb: "Wiring, fittings, backup power, smart-home cabling and compliance certification.",
    scope: ["First & second fix wiring", "Distribution boards", "Solar & backup power", "Smart-home cabling", "Compliance certification"],
    materials: ["EPRA-licensed technicians", "Copper cabling to KEBS spec", "Schneider / Legrand fittings"],
    from: "KSh 15,000",
    combine: ["smart-security", "plumbing", "plastering-ceilings"],
    faqs: [
      { q: "Do you issue a compliance certificate?", a: "Yes, all installations are certified by an EPRA-licensed electrician." },
      { q: "Can you add solar later?", a: "We pre-wire for solar so a later retrofit costs a fraction." },
    ],
  },
  {
    slug: "roofing",
    name: "Roofing",
    group: "Structural",
    blurb: "All roof types, waterproofing, gutters and leak repairs — dry-season pricing available.",
    scope: ["Roof structure & covering", "Tiles, stone-coated, IT4/IT5", "Waterproofing", "Gutters & downpipes", "Leak diagnosis & repair"],
    materials: ["Decra / Onduline", "Mabati Rolling Mills sheets", "Bitumen membranes"],
    from: "KSh 950 / m²",
    combine: ["carpentry", "masonry", "painting-decor"],
    faqs: [
      { q: "How fast can a leak be fixed?", a: "Most leak repairs are diagnosed and sealed within 48 hours of your message." },
      { q: "Do you re-roof occupied houses?", a: "Yes, in phased sections so the home stays usable throughout." },
    ],
  },
  {
    slug: "painting-decor",
    name: "Painting & Decor",
    group: "Finishes & Interior",
    blurb: "Interior and exterior painting, texture finishes and decorative artifacts.",
    scope: ["Surface preparation", "Interior & exterior painting", "Texture & special finishes", "Wallpaper & murals", "Decorative artifacts"],
    materials: ["Crown / Duracoat premium lines", "Low-VOC interior emulsions"],
    from: "KSh 380 / m²",
    combine: ["plastering-ceilings", "flooring", "carpentry"],
    faqs: [
      { q: "How many coats?", a: "Primer plus two finish coats as standard, three on exterior elevations." },
      { q: "Do you move furniture?", a: "Yes, protection and reinstatement are included in the quote." },
    ],
  },
  {
    slug: "plastering-ceilings",
    name: "Plastering & Ceilings",
    group: "Finishes & Interior",
    blurb: "Wall plastering, tongue-and-groove ceilings, gypsum ceilings and cornices.",
    scope: ["Wall plaster & skim", "Gypsum ceilings", "T&G timber ceilings", "Cornices & coving", "Cove lighting details"],
    materials: ["Gypsum board 9mm/12mm", "Treated T&G cypress"],
    from: "KSh 650 / m²",
    combine: ["painting-decor", "electrical", "flooring"],
    faqs: [
      { q: "Gypsum or T&G?", a: "Gypsum suits crisp modern interiors; T&G suits warm, rustic and high-humidity spaces." },
      { q: "How long to cure?", a: "Plaster cures in 7–14 days before painting for a lasting finish." },
    ],
  },
  {
    slug: "flooring",
    name: "Flooring",
    group: "Finishes & Interior",
    blurb: "Epoxy flooring, wood and mahogany flooring, and precision tiling.",
    scope: ["Epoxy & resin floors", "Solid & engineered wood", "Porcelain & ceramic tiling", "Screeding & levelling", "Skirting & trims"],
    materials: ["Industrial-grade epoxy systems", "Grade-A mahogany", "Porcelain to EN 14411"],
    from: "KSh 1,450 / m²",
    combine: ["plastering-ceilings", "painting-decor", "plumbing"],
    faqs: [
      { q: "Is epoxy suitable for homes?", a: "Yes — seamless, easy to clean, and available in matte or high-gloss." },
      { q: "How level must the substrate be?", a: "We screed and level as part of the quoted scope." },
    ],
  },
  {
    slug: "landscaping",
    name: "Landscaping",
    group: "Outdoor & Security",
    blurb: "Gardens, driveways, outdoor living spaces and irrigation.",
    scope: ["Soft & hard landscaping", "Cabro & paved driveways", "Outdoor kitchens & decks", "Irrigation systems", "Perimeter planting"],
    materials: ["Cabro pavers", "Indigenous planting", "Drip irrigation"],
    from: "KSh 120,000",
    combine: ["masonry", "smart-security", "flooring"],
    faqs: [
      { q: "Do you maintain gardens after?", a: "Optional monthly maintenance plans are available." },
      { q: "Can a driveway take heavy vehicles?", a: "Yes — we spec 80mm cabro on engineered sub-base for heavy loads." },
    ],
  },
  {
    slug: "smart-security",
    name: "Smart Security & Automation",
    group: "Outdoor & Security",
    blurb: "Biometric access, CCTV and sensors, and home or building automation.",
    scope: ["Biometric access control", "CCTV & NVR systems", "Motion & perimeter sensors", "Lighting & blind automation", "Remote app control"],
    materials: ["Hikvision / Dahua", "ZKTeco access control", "Shelly / KNX automation"],
    from: "KSh 65,000",
    combine: ["electrical", "landscaping", "plastering-ceilings"],
    faqs: [
      { q: "Can this be retrofitted?", a: "Yes, most systems retrofit with minimal wall chasing." },
      { q: "Who monitors the cameras?", a: "You do, from your phone — with optional third-party monitoring." },
    ],
  },
  {
    slug: "post-construction-cleaning",
    name: "Post-Construction Cleaning",
    group: "Finishes & Interior",
    blurb: "Full site clean-up and handover-ready detailing so you move into a finished home, not a site.",
    scope: ["Debris removal", "Deep clean of all surfaces", "Glass & frame detailing", "Floor polishing", "Snag-list touch-ups"],
    materials: ["Non-abrasive professional products", "Industrial extraction"],
    from: "KSh 25,000",
    combine: ["painting-decor", "flooring", "landscaping"],
    faqs: [
      { q: "Is it included in full contracts?", a: "Yes — every turnkey package includes handover cleaning." },
      { q: "How long does it take?", a: "Typically 1–3 days depending on floor area." },
    ],
  },
];

export const serviceGroups = [
  "Structural",
  "MEP",
  "Finishes & Interior",
  "Outdoor & Security",
] as const;

export type Package = {
  slug: string;
  name: string;
  summary: string;
  ideal: string;
  from: string;
  duration: string;
  includes: string[];
  tiers: { name: string; detail: string }[];
};

export const packages: Package[] = [
  {
    slug: "foundation-to-finishing",
    name: "Foundation to Finishing",
    summary: "One contract, one project manager, concept to keys-in-hand.",
    ideal: "New residential or commercial builds",
    from: "KSh 38,000 / m²",
    duration: "6–14 months",
    includes: ["architecture-design", "masonry", "roofing", "plumbing", "electrical", "plastering-ceilings", "painting-decor", "flooring", "landscaping", "post-construction-cleaning"],
    tiers: [
      { name: "Standard", detail: "Solid structure, quality standard finishes, fixed timeline." },
      { name: "Premium", detail: "Upgraded finishes, mahogany joinery, designer fittings." },
      { name: "Signature", detail: "Architect-led bespoke detailing, smart systems, landscaping included." },
    ],
  },
  {
    slug: "residential-collection",
    name: "Residential Collection",
    summary: "Bungalows, maisonettes, villas and modern homes, tiered by size and finish level.",
    ideal: "Homeowners & individual developers",
    from: "KSh 4.2M",
    duration: "5–10 months",
    includes: ["architecture-design", "masonry", "carpentry", "roofing", "plumbing", "electrical", "painting-decor", "flooring"],
    tiers: [
      { name: "Standard", detail: "2–3 bedroom bungalow, efficient plan, durable finishes." },
      { name: "Premium", detail: "4 bedroom maisonette, ensuite masters, feature staircase." },
      { name: "Signature", detail: "Villa-grade build with smart security and full landscaping." },
    ],
  },
  {
    slug: "commercial-institutional",
    name: "Commercial & Institutional",
    summary: "Offices, restaurants, petrol stations, retail and hospitality — compliance and MEP coordinated.",
    ideal: "Businesses, franchises, institutions",
    from: "On tender",
    duration: "4–18 months",
    includes: ["architecture-design", "masonry", "electrical", "plumbing", "plastering-ceilings", "flooring", "smart-security"],
    tiers: [
      { name: "Fit-out", detail: "Shell-to-brand fit-out with programme guarantee." },
      { name: "Full Build", detail: "Ground-up build with MEP coordination and compliance." },
      { name: "Multi-site", detail: "Rollout programme for franchises and branch networks." },
    ],
  },
  {
    slug: "civil-infrastructure",
    name: "Civil & Infrastructure",
    summary: "Roads, culverts, bridges, drainage and site works, delivered tender-ready.",
    ideal: "Government, developers, estates",
    from: "On tender",
    duration: "3–24 months",
    includes: ["architecture-design", "masonry", "landscaping"],
    tiers: [
      { name: "Estate Works", detail: "Internal roads, drainage and cabro for gated developments." },
      { name: "Public Works", detail: "Culverts, bridges and county road contracts." },
      { name: "Framework", detail: "Multi-year maintenance and works frameworks." },
    ],
  },
  {
    slug: "smart-secure-homes",
    name: "Smart & Secure Homes Upgrade",
    summary: "Biometric access, CCTV, sensors and automation — integrated during build or retrofitted.",
    ideal: "Tech-forward homeowners, any client as an add-on",
    from: "KSh 180,000",
    duration: "1–4 weeks",
    includes: ["smart-security", "electrical", "plastering-ceilings"],
    tiers: [
      { name: "Essential", detail: "CCTV, access control and app monitoring." },
      { name: "Connected", detail: "Adds lighting, gate and irrigation automation." },
      { name: "Signature", detail: "Whole-home KNX automation with scenes and backup power." },
    ],
  },
];

export type Project = {
  slug: string;
  title: string;
  type: "Residential" | "Commercial" | "Civil";
  location: string;
  year: number;
  duration: string;
  budget: string;
  image: string;
  brief: string;
  trades: string[];
  testimonial: { quote: string; author: string; role?: string };
};

export const projects: Project[] = [
  {
    slug: "makueni-school",
    title: "Makueni School Complex",
    type: "Commercial",
    location: "Makueni County",
    year: 2025,
    duration: "8 months (planned 8)",
    budget: "KSh 32M",
    image: "makueni",
    brief: "Complete educational facility with classrooms, administrative block, and playground infrastructure. Delivered on schedule with high-quality finishes suitable for institutional use.",
    trades: ["architecture-design", "masonry", "roofing", "plastering-ceilings", "flooring", "painting-decor", "electrical", "plumbing", "landscaping"],
    testimonial: { quote: "The quality of workmanship exceeded our expectations. Every detail was thoughtfully executed.", author: "Makueni School Management", role: "Client" },
  },
  {
    slug: "karen-signature-villa",
    title: "Karen Signature Villa",
    type: "Residential",
    location: "Karen, Nairobi",
    year: 2026,
    duration: "9 months (planned 9)",
    budget: "KSh 42M",
    image: "residential",
    brief: "A 5-bedroom villa delivered from architectural concept to handover cleaning, with full smart security integrated during the build.",
    trades: ["architecture-design", "masonry", "roofing", "flooring", "smart-security"],
    testimonial: { quote: "They handed over on the exact date in the contract. In this industry, that is unheard of.", author: "W. Mwangi, Homeowner" },
  },
  {
    slug: "westlands-office-fitout",
    title: "Westlands Office Fit-Out",
    type: "Commercial",
    location: "Westlands, Nairobi",
    year: 2025,
    duration: "14 weeks (planned 16)",
    budget: "KSh 27M",
    image: "commercial",
    brief: "1,800 m² shell-to-brand fit-out with coordinated MEP, acoustic ceilings and epoxy floors, delivered two weeks early.",
    trades: ["electrical", "plastering-ceilings", "flooring", "plumbing"],
    testimonial: { quote: "The BOQ we signed is the invoice we paid. No surprises.", author: "A. Otieno, Operations Director" },
  },
  {
    slug: "kiambu-road-culverts",
    title: "Kiambu Estate Roads & Culverts",
    type: "Civil",
    location: "Kiambu",
    year: 2025,
    duration: "7 months (planned 7)",
    budget: "KSh 61M",
    image: "civil",
    brief: "3.4 km of estate roads with box culverts and storm drainage, engineered for heavy construction traffic.",
    trades: ["masonry", "landscaping"],
    testimonial: { quote: "Drainage held through the heaviest rains we've had in a decade.", author: "Estate Management Committee" },
  },
];

export const promotions = [
  {
    title: "Bundle Discount",
    reward: "Up to 12% off",
    mechanic: "Automatically applied when you request 2 or more individual services in one quote.",
    validity: "Ongoing",
  },
  {
    title: "Full-Contract Signing Bonus",
    reward: "Free architecture consultation",
    mechanic: "Sign any turnkey contract and receive concept design consultation or a landscaping add-on at no cost.",
    validity: "Until 31 December 2026",
  },
  {
    title: "Referral Programme",
    reward: "2% of contract value",
    mechanic: "Refer a client whose project is signed and receive a cash reward or credit on your own works.",
    validity: "Ongoing",
  },
  {
    title: "Dry-Season Roofing",
    reward: "10% off roofing labour",
    mechanic: "Book roofing or waterproofing works during the dry season window.",
    validity: "Jul – Sep 2026",
  },
  {
    title: "Repeat-Client Loyalty",
    reward: "Tiered 5–15% off",
    mechanic: "Returning clients unlock increasing discounts on every additional trade or project.",
    validity: "Ongoing",
  },
];

export const trustStats = [
  { value: "18", label: "Years in business" },
  { value: "540+", label: "Projects completed" },
  { value: "96%", label: "On-time completion" },
  { value: "NCA 1", label: "Registered & insured" },
];

export const pillars = [
  {
    title: "Affordability",
    body: "Transparent BOQ-based pricing, published package ranges, payment plans and live promotions applied automatically.",
  },
  {
    title: "Quality",
    body: "Licensed engineers and architects, named materials and brands, workmanship warranties and photographed references.",
  },
  {
    title: "Time of Completion",
    body: "Stated timelines per tier, weekly progress updates and a 96% on-time handover record you can audit.",
  },
];

export const processSteps = [
  { step: "01", title: "Consultation", detail: "Site visit, brief and budget conversation.", time: "Week 1" },
  { step: "02", title: "Architecture & BOQ", detail: "Drawings, renders and a line-by-line costed BOQ.", time: "Weeks 2–5" },
  { step: "03", title: "Approvals", detail: "County submission and consent tracking.", time: "Weeks 5–9" },
  { step: "04", title: "Foundation", detail: "Setting out, excavation and substructure.", time: "Months 3–4" },
  { step: "05", title: "Structural", detail: "Walling, slabs, roofing and shell completion.", time: "Months 4–8" },
  { step: "06", title: "Finishes", detail: "MEP second fix, ceilings, floors, paint and joinery.", time: "Months 8–11" },
  { step: "07", title: "Handover", detail: "Snagging, deep clean and keys with warranty pack.", time: "Month 12" },
];

export const testimonials = [
  { quote: "We came for one electrician and ended up giving them the whole house. The crew's discipline sold us.", author: "J. Kariuki", role: "Homeowner, Runda", rating: 5 },
  { quote: "The BOQ transparency is what won the tender internally. Every line was defensible.", author: "S. Njeri", role: "Property Developer", rating: 5 },
  { quote: "Response on WhatsApp was under five minutes, on a Sunday, for a burst pipe.", author: "M. Abdi", role: "Landlord, Kilimani", rating: 5 },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export const socials = [
  { name: "Instagram", handle: "@urbantconstruction", url: "https://instagram.com/" },
  { name: "Facebook", handle: "Urban T Construction Co.", url: "https://facebook.com/" },
  { name: "TikTok", handle: "@urbantconstruction", url: "https://tiktok.com/" },
  { name: "YouTube", handle: "Urban T Site Reels", url: "https://youtube.com/" },
  { name: "LinkedIn", handle: "Urban T Construction Co.", url: "https://linkedin.com/" },
  { name: "X", handle: "@urbantconstruction", url: "https://x.com/" },
];

export const socialPosts = [
  { image: "residential", caption: "Signature villa handover day — Karen.", channel: "Instagram", meta: "1.2k likes" },
  { image: "commercial", caption: "Epoxy pour, 1,800m² office floor, overnight shift.", channel: "TikTok", meta: "48k views" },
  { image: "civil", caption: "Box culvert set in a single day. Kiambu estate roads.", channel: "Instagram", meta: "860 likes" },
  { image: "residential", caption: "Mahogany staircase, hand-finished on site.", channel: "YouTube", meta: "12k views" },
  { image: "commercial", caption: "Acoustic ceiling grid going in ahead of programme.", channel: "Facebook", meta: "310 reactions" },
  { image: "civil", caption: "Drone pass over 3.4km of new estate roads.", channel: "YouTube", meta: "24k views" },
];

export const careerRoles = [
  { title: "Site Engineer", type: "Full-time", location: "Nairobi", detail: "Degree in civil engineering, 4+ years on residential or commercial sites, competent with programme and QA documentation." },
  { title: "Project Manager", type: "Full-time", location: "Nairobi", detail: "Track record delivering KSh 30M+ contracts on programme, strong client-facing communication and BOQ literacy." },
  { title: "Licensed Electrician", type: "Full-time / contract", location: "Nairobi & Kiambu", detail: "EPRA licensed, comfortable with smart-home wiring and compliance certification." },
  { title: "Finishing Foreman", type: "Contract", location: "Rotating sites", detail: "Plastering, ceilings, tiling and paint crews — snagging discipline is the job." },
  { title: "Quantity Surveyor", type: "Full-time", location: "Westlands office", detail: "BOQ preparation, valuations and variation pricing across concurrent projects." },
  { title: "Subcontractor crews", type: "Ongoing panel", location: "All regions", detail: "Masonry, roofing, plumbing, landscaping and cleaning crews for our pre-qualified panel." },
];
