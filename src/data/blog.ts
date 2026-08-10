export type Post = {
  slug: string;
  title: string;
  category: "Cost Guides" | "Project Spotlights" | "Maintenance Tips" | "Regulation";
  excerpt: string;
  date: string;
  readMinutes: number;
  author: string;
  image: "residential" | "commercial" | "civil";
  body: { heading: string; paragraphs: string[]; bullets?: string[] }[];
};

export const posts: Post[] = [
  {
    slug: "how-much-does-a-bungalow-cost-2026",
    title: "How much does a bungalow cost to build in 2026?",
    category: "Cost Guides",
    excerpt:
      "A line-by-line breakdown of what a three-bedroom bungalow actually costs today — substructure to snagging — using live BOQ rates.",
    date: "2026-07-14",
    readMinutes: 8,
    author: "Urban T Quantity Surveying Team",
    image: "residential",
    body: [
      {
        heading: "The short answer",
        paragraphs: [
          "A standard-finish three-bedroom bungalow of roughly 110 m² lands between KSh 4.6M and KSh 6.2M in the greater Nairobi metro in 2026. Premium finishes push the same footprint to KSh 7.5M–9M, and a signature-tier build with imported joinery and full home automation can exceed KSh 12M.",
          "The spread is not vagueness — it is finish level, ground conditions and distance from the nearest materials depot. Those three variables account for almost all of the difference between two identical floor plans.",
        ],
      },
      {
        heading: "Where the money actually goes",
        paragraphs: [
          "On a standard-finish bungalow, the cost distribution is remarkably consistent across sites:",
        ],
        bullets: [
          "Substructure and foundations — 12–16% (higher on black cotton soil)",
          "Walling and structural frame — 22–26%",
          "Roofing and rainwater goods — 10–13%",
          "Plumbing and electrical first and second fix — 14–18%",
          "Plastering, ceilings, floors and paint — 20–24%",
          "Joinery, fittings and external works — 10–14%",
        ],
      },
      {
        heading: "The three cost traps",
        paragraphs: [
          "First, unpriced ground conditions. A soil test costs a fraction of a percent of the build and routinely saves six figures on foundation redesign.",
          "Second, mid-build specification changes. Switching floor finish after the screed is down means demolition, not just a price difference.",
          "Third, provisional sums that never get converted into firm rates. Every provisional sum in your BOQ is an open cheque until it is priced.",
        ],
      },
      {
        heading: "How to sanity-check a quote",
        paragraphs: [
          "Ask for the BOQ, not a summary. A defensible quote lists quantities, unit rates and totals per element, so you can compare like for like against any other contractor. If a bidder will not show you rates, you are not comparing prices — you are comparing optimism.",
        ],
      },
    ],
  },
  {
    slug: "boq-explained-for-first-time-clients",
    title: "BOQ explained: how to read the document that controls your budget",
    category: "Cost Guides",
    excerpt:
      "The Bill of Quantities is the single most powerful document in a construction contract. Here is how to read one without a QS degree.",
    date: "2026-06-28",
    readMinutes: 6,
    author: "Urban T Quantity Surveying Team",
    image: "commercial",
    body: [
      {
        heading: "What a BOQ is",
        paragraphs: [
          "A Bill of Quantities is a measured list of every item of work in your project — quantities, units, rates and totals. It converts drawings into money, item by item, so that two contractors bidding on the same job are pricing exactly the same scope.",
        ],
      },
      {
        heading: "The five columns that matter",
        paragraphs: ["Every BOQ line has the same anatomy:"],
        bullets: [
          "Description — the exact work item and specification",
          "Unit — m², m³, linear metre, number or item",
          "Quantity — the measured amount taken off the drawings",
          "Rate — the price per unit, inclusive of labour, material and plant",
          "Amount — quantity multiplied by rate",
        ],
      },
      {
        heading: "Preliminaries are not padding",
        paragraphs: [
          "The preliminaries section covers site setup, hoarding, security, insurance, supervision and site welfare. It typically runs 8–12% of the contract sum. A bid with suspiciously low preliminaries is usually a bid that intends to recover the difference through variations later.",
        ],
      },
      {
        heading: "Use it after signing, too",
        paragraphs: [
          "The BOQ is your valuation tool for the whole build. Monthly certificates should reference BOQ line items and percentages complete. If your progress payments cannot be traced back to BOQ lines, you have lost cost control before the first slab.",
        ],
      },
    ],
  },
  {
    slug: "karen-villa-project-spotlight",
    title: "Project spotlight: nine months, nine months — the Karen Signature Villa",
    category: "Project Spotlights",
    excerpt:
      "How a five-bedroom villa with integrated smart security was handed over on the exact contracted date, and what made the schedule hold.",
    date: "2026-05-30",
    readMinutes: 7,
    author: "Project Delivery",
    image: "residential",
    body: [
      {
        heading: "The brief",
        paragraphs: [
          "A five-bedroom family villa in Karen with a fixed handover date driven by a school term. The client had land, a rough concept and a hard deadline — the classic conditions under which construction schedules slip.",
        ],
      },
      {
        heading: "What we changed in the sequence",
        paragraphs: [
          "Smart security conduit was installed during first fix rather than retrofitted, removing four weeks of chasing walls and making good at the end of the programme. Roofing was brought forward to close the shell before the long rains, which allowed internal finishing to continue through weather that would otherwise have stopped the site.",
        ],
      },
      {
        heading: "The numbers",
        paragraphs: [
          "Contract value KSh 42M against a KSh 40–44M BOQ range. Programme: nine months planned, nine months actual. Two variations, both client-initiated, both priced from published BOQ rates before instruction.",
        ],
      },
    ],
  },
  {
    slug: "rainy-season-roof-checklist",
    title: "The rainy-season roof checklist every homeowner should run",
    category: "Maintenance Tips",
    excerpt:
      "Twenty minutes of inspection before the rains prevents the ceiling replacement that costs a hundred times more.",
    date: "2026-04-11",
    readMinutes: 4,
    author: "Roofing Division",
    image: "residential",
    body: [
      {
        heading: "Do this before the first heavy rain",
        paragraphs: ["Most roof failures announce themselves months in advance. Look for:"],
        bullets: [
          "Gutters holding standing water or silt — a sign of sag or blocked downpipes",
          "Lifted or backed-out fixings on iron sheets, especially at ridge and eaves",
          "Cracked or missing mortar at flashings and parapet junctions",
          "Ceiling stains, however faint — they are always older than they look",
          "Vegetation or debris in valleys, the single most common leak source",
        ],
      },
      {
        heading: "What you can fix yourself, and what you cannot",
        paragraphs: [
          "Clearing gutters and valleys is homeowner work. Re-fixing sheets, re-bedding flashings and waterproofing a flat roof are not — the failure mode of a bad repair is water tracking laterally and appearing in a room three metres away, long after you have forgotten the patch.",
        ],
      },
    ],
  },
  {
    slug: "nca-approvals-what-to-expect",
    title: "County approvals and NCA compliance: a realistic timeline",
    category: "Regulation",
    excerpt:
      "What the approval process actually involves, how long each stage takes, and the documents that cause the most delay.",
    date: "2026-03-19",
    readMinutes: 6,
    author: "Compliance & Approvals",
    image: "civil",
    body: [
      {
        heading: "The sequence",
        paragraphs: [
          "Architectural approval, structural approval, NEMA where applicable, and NCA project registration. These are partly parallel, but structural approval cannot be lodged before the architectural set is stable, so the practical critical path is drawings first.",
        ],
      },
      {
        heading: "Realistic durations",
        paragraphs: ["On a straightforward residential plot in 2026:"],
        bullets: [
          "Architectural submission to consent — 4 to 8 weeks",
          "Structural submission to consent — 3 to 6 weeks, overlapping",
          "NCA project registration — under 2 weeks once consents are in hand",
          "NEMA (where required) — add 4 to 6 weeks",
        ],
      },
      {
        heading: "What actually causes delay",
        paragraphs: [
          "Not the county. It is almost always incomplete title documentation, an unresolved boundary discrepancy, or a change of scheme after submission. Get the land documents clean before drawings begin and the process becomes predictable.",
        ],
      },
    ],
  },
  {
    slug: "smart-security-during-build",
    title: "Why smart security belongs in the build, not the retrofit",
    category: "Maintenance Tips",
    excerpt:
      "Integrating biometrics, CCTV and automation during first fix costs less and performs better than any post-handover installation.",
    date: "2026-02-08",
    readMinutes: 5,
    author: "Smart Systems Division",
    image: "commercial",
    body: [
      {
        heading: "The cost argument",
        paragraphs: [
          "Conduit installed during first fix is trivially cheap. The same cabling retrofitted means chasing finished walls, making good, repainting and — on a good finish — never quite matching the original. On a typical four-bedroom home, integrating during build runs 30–45% below the retrofit equivalent.",
        ],
      },
      {
        heading: "The performance argument",
        paragraphs: [
          "Camera positions chosen at design stage sit where coverage demands, not where a cable can be hidden. Access control is powered from the distribution board rather than a visible spur. Sensors sit flush. The system disappears into the building instead of being bolted onto it.",
        ],
      },
      {
        heading: "If you have already moved in",
        paragraphs: [
          "Retrofit is still worth doing — wireless mesh systems have closed much of the performance gap. Plan it as a project with a proper survey rather than buying a boxed kit and hoping the coverage works.",
        ],
      },
    ],
  },
];

export const postCategories = [
  "All",
  "Cost Guides",
  "Project Spotlights",
  "Maintenance Tips",
  "Regulation",
] as const;

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
