/**
 * Generates lib/blog-data.ts with 50 posts.
 * Run: node scripts/generate-blog-data.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const start = Date.UTC(2026, 0, 3, 12, 0, 0);
const end = Date.UTC(2026, 3, 16, 12, 0, 0);
const n = 50;
const mon = ["JAN", "FEB", "MAR", "APR"];
const dateLabelsAsc = [];
for (let i = 0; i < n; i++) {
  const ms = start + ((end - start) * i) / (n - 1);
  const d = new Date(ms);
  dateLabelsAsc.push(
    `${String(d.getUTCDate()).padStart(2, "0")} ${mon[d.getUTCMonth()]} ${d.getUTCFullYear()}`,
  );
}
/** Newest first (16 APR 2026 at index 0) */
const dateLabels = [...dateLabelsAsc].reverse();

const categories = ["Sunscreens", "Skin Care", "Routine", "Ingredients"];
const authors = [
  "On & Off Editorial",
  "Meera Iyer",
  "Arjun Valecha",
  "Nyra Khanna",
  "Lab Notes",
];

/** Stable unique image per post via Picsum seed (avoids broken Unsplash ids). */
function imageUrlForSlug(slug) {
  return `https://picsum.photos/seed/${encodeURIComponent(slug)}/800/500`;
}

const alts = [
  "Skincare tubes in warm daylight",
  "Dewy skin close-up",
  "Minimal bottles on a shelf",
  "Lab glass and droppers",
  "Hands blending lotion",
  "Vanity shelf with cosmetics",
  "Product flat lay on linen",
  "Serum bottle macro",
  "Sunlight across bathroom tile",
  "Cream texture on skin",
  "SPF and moisturizer arrangement",
  "Morning routine still life",
  "Pastel skincare packaging",
  "Mirror and skincare jars",
  "Hands rinsing at sink",
  "Outdoor workout and skin",
  "Beach hat and sunscreen",
  "Portrait with natural skin",
  "Travel pouch and minis",
  "Nightstand with face mist",
  "Rooftop golden hour skincare",
  "Gym bag and face mist",
  "Monsoon window sill bottles",
  "Desert-dry winter skin care",
  "Office desk SPF reapply",
  "Train commute skincare",
  "Weekend farmer market glow",
  "Post-swim rinse routine",
  "Flight carry-on minis",
  "College hostel sink setup",
  "Creator ring-light vanity",
  "Parent quick morning routine",
  "Sensitive skin minimal shelf",
  "Acne-prone gel textures",
  "Deep skin tone blend test",
  "Fair skin burn prevention",
  "Combination skin T-zone care",
  "Barrier repair night cream",
  "Antioxidant morning layer",
  "Double cleanse evening",
  "Lip care with SPF",
  "Hand cream and UV awareness",
  "Scalp and hairline SPF",
  "Body SPF for sleeves up",
  "Kids-safe family sunscreen",
  "Athlete sweat-resistant wear",
  "Older skin comfortable filters",
  "Teen starter SPF habit",
  "Budget routine that works",
  "Empty shelf and finished tubes",
];

const TITLES = [
  "SPF without the grease: humidity is the real judge",
  "Glass skin energy without twelve steps",
  "Heatwave routine: three steps that survive 3 p.m.",
  "Humectants, filters, finish: plain English",
  "White cast and undertone: test like a human",
  "Shelfie psychology: pretty packaging you will use",
  "Niacinamide meets daily SPF: stacking without drama",
  "Ceramides when you sweat: barrier care in monsoon",
  "Desk-to-cab reapplication: social anxiety hacks",
  "HA under sunscreen: how much water your skin wants",
  "Vitamin C morning: oxidation fears vs reality",
  "Zinc myths: mineral is not automatically gentle",
  "Chemical filters: names are scary, behavior matters",
  "PA and PPD: what those letters imply for brown skin",
  "Water resistance: pool day vs office day",
  "Powder SPF: touch-ups without cake face",
  "Stick SPF: pockets, purses, and precision",
  "Spray SPF: where it helps, where it fails",
  "Makeup-first mornings: primer order with SPF",
  "Tinted SPF: coverage expectations in daylight",
  "Acne-prone: comedogenic lists and grain of salt",
  "Retinoid nights: spacing so your face does not peel off",
  "Exfoliation summer: less is often more",
  "Occlusives at night: when petrolatum is your friend",
  "Fragrance-free vs unscented: label reading101",
  "Fungal acne chatter: stay skeptical, stay kind",
  "Slugging debate: plastic wrap for your face or not",
  "Face mists: cosmetic joy vs real hydration",
  "Ice rollers: lymphatic hype vs simple cold",
  "Gua sha daily: realistic benefit window",
  "LED masks at home: expectations on a budget",
  "Dermarolling at home: why we do not cheerlead",
  "Supplements for skin: food first, capsules second",
  "Blue light from screens: sunscreen marketing reality",
  "Pollution and skin: cleanse evidence in cities",
  "Hard water and film: chelating shampoos for face myth",
  "Travel minis: decant legally, label clearly",
  "Airport security: tubes vs jars vs sticks",
  "Hostel bathrooms: shared sinks and your towel",
  "Creator lighting: SPF under ring lights and windows",
  "Wedding week skin: calm routine beats panic peels",
  "Festival color and sun: barrier before glitter",
  "Cricket Sunday: brim hat plus reapply rhythm",
  "Hiking SPF: neck, ears, hands you forget",
  "Baby steps for dads new to SPF",
  "Older relatives: comfortable textures win arguments",
  "Teen acne and SPF: gel textures that do not fight",
  "Budget fifty rupees a day: drugstore can work",
  "Luxury splurge: when texture truly upgrades habit",
  "Year-one habit audit: what you actually finished",
];

const EXCERPTS = [
  "Texture beats lab flex when humidity is doing the judging.",
  "Dewy without the intimidation: fewer steps, clearer intent.",
  "Carry less, repeat more: heat survival for students and commuters.",
  "Label words decoded without turning filters into villains.",
  "Cast is about film, light, amount, and honest daylight.",
  "If you like looking at it, you will reach for it. Behavior design 101.",
  "Niacinamide and SPF can share a morning if you respect order.",
  "Barrier support when sweat strips your cheeks but oil pools on nose.",
  "Tiny rituals that make noon SPF feel normal at work.",
  "Humectants need balance: mist is not a substitute for strategy.",
  "Ascorbic acid stability: dark bottle, cap on, realistic hopes.",
  "Mineral filters are tools, not personality types.",
  "Organic filters earned a bad rap from bad education, not chemistry.",
  "Photoprotection depth matters for daily life in strong UV seasons.",
  "Forty minutes of water resistance is not forty hours of freedom.",
  "Powder is a touch-up ally, not a first-application hero.",
  "Sticks reward edges: eyes, ears, scars, sports lines.",
  "Spray overspray is real: lungs, fabric, uneven film.",
  "Primer plus SPF: who sits first depends on chemistry and patience.",
  "Tint evens tone lightly; it is not foundation unless you build it.",
  "Comedogenic charts are hints, not laws written for your face.",
  "Retinoids need spacing from acids and respect for peeling phases.",
  "Acids in summer: lower frequency, higher sunscreen discipline.",
  "Sealants lock water you already put there: do not skip humectants.",
  "Fragrance policy is personal; patch tests are universal.",
  "Diagnoses belong to clinicians, not Reddit threads.",
  "Slugging is optional; listening to congestion is mandatory.",
  "Mist between steps can help spread; it cannot replace moisturizer.",
  "Cold tools feel good; they do not replace sunscreen.",
  "Facial massage for minutes, not miracles.",
  "LED home devices vary wildly; skepticism is healthy.",
  "Needles at home multiply infection and scar risk.",
  "Zinc pills will not replace sunscreen on your skin.",
  "HEV fear sells products; sane habits sell peace of mind.",
  "PM2.5 stresses skin: cleanse gently, barrier kindly.",
  "Hard water annoys hair more than face for most people.",
  "TSA-friendly sizes still need sun protection you will wear.",
  "Cabin air dries skin: mist plus cream beats mist alone.",
  "Flip-flops by the sink mean less product contamination.",
  "Content lighting lies a little; window daylight does not.",
  "Calm skin photographs better than freshly peeled skin.",
  "Glitter sticks; barrier first keeps removal gentler.",
  "Field sports mean brim, shade breaks, and timer reminders.",
  "Elevation and reflection increase dose: ears matter.",
  "Start with a texture he will not mock out of the tube.",
  "Dry older skin wants elegant slip, not chalk wars.",
  "Teens need honesty about oil, not shame about acne.",
  "Price per wear beats price per gram if you finish the tube.",
  "Sometimes expensive texture is the habit hinge. No guilt needed.",
  "Empty bottles tell the truth your shelf aesthetic hides.",
];

function slugify(s, i) {
  const base = s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `${base}-${i}`;
}

function bodyFor(i, title, dateLabel) {
  const climates = [
    "coastal humidity",
    "dry winter air",
    "monsoon stickiness",
    "high-altitude sun",
    "polluted city haze",
    "desert heat",
    "tropical indoors with aggressive AC",
    "temperate spring UV ramps",
  ];
  const c = climates[i % climates.length];
  const habits = [
    "two-finger-length rule for face and neck",
    "reapply after towel-drying sweat",
    "wait sixty seconds between serum and SPF when you can",
    "blot before reapply instead of stacking on oil slick",
    "carry a mini you are not embarrassed to use in public",
    "set a phone alarm for outdoor lunch breaks",
  ];
  const h = habits[i % habits.length];
  return [
    `Published ${dateLabel}. ${title} is part of our Journal from January through mid-April 2026. We write for people who want protection that respects real schedules, real mirrors, and climates like ${c}.`,
    `Open with honesty: no routine works if you will not repeat it. We bias toward steps that feel reasonable on a tired Tuesday, not only on a curated Sunday. If this article clashes with your prescriber, trust the clinician who sees your skin.`,
    `Mechanics matter. ${h.charAt(0).toUpperCase() + h.slice(1)}. Layer thinnest to thickest where possible, and give products a moment to settle. Rushing is how pilling, streaking, and uneven white cast sneak in, even with thoughtful formulas.`,
    `Context shifts the scorecard. The same SPF can feel holy-grail in one season and meh in another when sweat, water, or foundation chemistry changes. Treat that as information, not betrayal. Adjust amount, primer, or blotting before you declare the tube useless.`,
    `Safety and claims stay grounded. Patch test new launches along the jawline for several days. Stinging that repeats is a stop signal. For legal SPF ratings, UVA claims, and PA values, your box and regulatory paperwork beat any blog paragraph, including this one.`,
    `Closing note dated ${dateLabel}: we are glad you read this far. Share the post if it helped someone in your group chat, and come back when we publish the next block. Skincare should be steady, not performative.`,
  ];
}

function esc(s) {
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n");
}

function quoteBlock(strings) {
  return strings.map((s) => `      "${esc(s)}"`).join(",\n");
}

const posts = [];
for (let i = 0; i < n; i++) {
  const title = TITLES[i];
  const excerpt = EXCERPTS[i];
  const cat = categories[i % categories.length];
  const trending = i < 12;
  const author = authors[i % authors.length];
  const dateLabel = dateLabels[i];
  const slug = slugify(title, i);
  posts.push({
    slug,
    title,
    excerpt,
    category: cat,
    trending,
    author,
    dateLabel,
    image: imageUrlForSlug(slug),
    imageAlt: alts[i],
    body: bodyFor(i, title, dateLabel),
  });
}

const header = `export type BlogCategory =
  | "Sunscreens"
  | "Skin Care"
  | "Routine"
  | "Ingredients";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  trending: boolean;
  author: string;
  dateLabel: string;
  image: string;
  imageAlt: string;
  body: string[];
};

export const BLOG_FILTER_LABELS = [
  "All",
  "Trending",
  "Sunscreens",
  "Skin Care",
  "Routine",
  "Ingredients",
] as const;

export type BlogFilterId = (typeof BLOG_FILTER_LABELS)[number];

export const BLOG_POSTS: BlogPost[] = [
`;

const items = posts
  .map(
    (p) => `  {
    slug: "${esc(p.slug)}",
    title: "${esc(p.title)}",
    excerpt: "${esc(p.excerpt)}",
    category: "${p.category}",
    trending: ${p.trending},
    author: "${esc(p.author)}",
    dateLabel: "${p.dateLabel}",
    image: "${esc(p.image)}",
    imageAlt: "${esc(p.imageAlt)}",
    body: [
${quoteBlock(p.body)}
    ],
  }`,
  )
  .join(",\n");

fs.writeFileSync(path.join(root, "lib", "blog-data.ts"), `${header}${items}
];
`, "utf8");
console.log("Wrote lib/blog-data.ts");
