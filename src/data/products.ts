import type { Product } from "@/types/product";

/**
 * Local static demo catalogue — 36 products across 7 categories.
 *
 * Product imagery uses publicly available Unsplash CDN photos (verified at
 * build time), so no broken paths can ship. Attribution/licensing notes are
 * included in the README.
 */

/** Standardized Unsplash CDN image helper (keeps URLs short and consistent). */
function img(id: string, width = 900): string {
  return `https://images.unsplash.com/photo-${id}?q=80&w=${width}&auto=format&fit=crop`;
}

const FREE_SHIPPING_THRESHOLD = 5000; // free-delivery threshold used across UI copy
export { FREE_SHIPPING_THRESHOLD };

export const PRODUCTS: Product[] = [
  /* ---------------------- Smartphones ---------------------- */
  {
    id: "aurora-neo-12-pro",
    slug: "aurora-neo-12-pro",
    name: "Aurora Neo 12 Pro",
    brand: "Aurora",
    category: "smartphones",
    price: 189990,
    originalPrice: 204990,
    rating: 4.8,
    reviews: 1123,
    image: img("1592750475338-74b7b21085ab"),
    imageAlt: "Aurora Neo 12 Pro flagship smartphone in graphite, angled to show the triple camera module",
    description:
      "The Neo 12 Pro pairs a 6.7\" LTPO AMOLED display with Aurora's A12 Fusion chip for flagship-grade performance. A 5,300 mAh battery, 120Hz refresh rate and 45W fast charging power a full day of heavy use.",
    features: [
      "6.7-inch LTPO AMOLED, 120Hz adaptive refresh",
      "A12 Fusion chip with 12GB RAM",
      "Triple 50MP camera system with 5× optical zoom",
      "5,300 mAh battery with 45W fast charge",
    ],
    inStock: true,
    featured: true,
    bestseller: true,
    addedAt: "2026-09-14",
  },
  {
    id: "aurora-neo-12",
    slug: "aurora-neo-12",
    name: "Aurora Neo 12",
    brand: "Aurora",
    category: "smartphones",
    price: 139990,
    rating: 4.7,
    reviews: 862,
    image: img("1605236453806-6ff36851218e"),
    imageAlt: "Aurora Neo 12 smartphone floating against a dark studio background",
    description:
      "Same Aurora silicon, distilled. The Neo 12 keeps the 6.5\" AMOLED and a clean Android build while trimming the camera stack — the smartest way into the Aurora ecosystem.",
    features: [
      "6.5-inch AMOLED, 120Hz",
      "A12 Fusion chip with 8GB RAM",
      "Dual 48MP camera system",
      "48-hour standby battery life",
    ],
    inStock: true,
    featured: false,
    bestseller: true,
    addedAt: "2026-08-02",
  },
  {
    id: "aurora-neo-11-ultra",
    slug: "aurora-neo-11-ultra",
    name: "Aurora Neo 11 Ultra",
    brand: "Aurora",
    category: "smartphones",
    price: 154990,
    originalPrice: 179990,
    rating: 4.6,
    reviews: 540,
    image: img("1512941937669-90a1b58e7e9c"),
    imageAlt: "Aurora Neo 11 Ultra smartphone lying on a desk next to a laptop",
    description:
      "Last season's Ultra at its best price ever. Titanium frame, periscope zoom and Aurora's best-in-class haptics — still arguably the most complete phone we sell.",
    features: [
      "Titanium frame, IP68 rated",
      "5× periscope telephoto lens",
      '6.8-inch QHD+ LTPO "Ultra Bright" display',
      "Wireless and reverse charging",
    ],
    inStock: true,
    featured: false,
    bestseller: false,
    addedAt: "2026-03-18",
  },
  {
    id: "nexon-vela-5",
    slug: "nexon-vela-5",
    name: "Nexon Vela 5",
    brand: "Nexon",
    category: "smartphones",
    price: 89990,
    rating: 4.6,
    reviews: 1489,
    image: img("1610945265064-0e34e5519bbf"),
    imageAlt: "Nexon Vela 5 smartphone in iridescent violet, shown beside its retail box",
    description:
      "Nexon's camera-first midranger. A large sensor with OIS, 67W charging and a glass sandwich build — the Vela 5 punches well above its price band.",
    features: [
      "50MP main sensor with OIS",
      "6.6-inch FHD+ AMOLED, 120Hz",
      "67W charge in 42 minutes",
      "Nexon Vela OS with 4 years of updates",
    ],
    inStock: true,
    featured: true,
    bestseller: true,
    addedAt: "2026-07-05",
  },
  {
    id: "nexon-vela-5-neo",
    slug: "nexon-vela-5-neo",
    name: "Nexon Vela 5 Neo",
    brand: "Nexon",
    category: "smartphones",
    price: 64990,
    rating: 4.5,
    reviews: 934,
    image: img("1598327105666-5b89351aff97"),
    imageAlt: "Nexon Vela 5 Neo smartphone facing forward with its home screen visible",
    description:
      "All the Vela essentials — bright AMOLED, clean UI, dependable battery — in a lighter, thinner package that keeps every daily interaction effortless.",
    features: [
      "6.5-inch AMOLED, 120Hz",
      "Nexon Vela Neo engine",
      "5,000 mAh battery, 33W charging",
      "Sustainable Comet recovered-material frame",
    ],
    inStock: true,
    featured: false,
    bestseller: false,
    addedAt: "2026-06-21",
  },
  {
    id: "nexon-vela-4s",
    slug: "nexon-vela-4s",
    name: "Nexon Vela 4s",
    brand: "Nexon",
    category: "smartphones",
    price: 39990,
    originalPrice: 47990,
    rating: 4.4,
    reviews: 2104,
    image: img("1610945415295-d9bbf067e59c"),
    imageAlt: "Nexon Vela 4s smartphone in matte black resting on its retail packaging",
    description:
      "Our top-value smartphone pick. The Vela 4s now ships with 24 months of warranty at a clearance price — the easiest upgrade for any first-time buyer.",
    features: [
      "6.4-inch AMOLED, 90Hz",
      "48MP dual camera with night mode",
      "5,000 mAh battery, 25W charging",
      "Dual SIM + microSD expansion",
    ],
    inStock: true,
    featured: false,
    bestseller: false,
    addedAt: "2026-01-30",
  },

  /* ------------------------- Tablets ------------------------ */
  {
    id: "aurora-pad-s-11",
    slug: "aurora-pad-s-11",
    name: "Aurora Pad S 11",
    brand: "Aurora",
    category: "tablets",
    price: 74990,
    rating: 4.7,
    reviews: 412,
    image: img("1585790050230-5dd28404ccb9"),
    imageAlt: "Aurora Pad S 11 tablet shown in two sizes with a stylus on a white desk",
    description:
      "A laptop-class tablet in a take-anywhere size. Pad S 11 runs Aurora PadOS with desktop-style multitasking, supported by the A12 Fusion chip and a laminated 120Hz display.",
    features: [
      "11-inch 120Hz laminated display",
      "A12 Fusion chip, 8GB RAM",
      "Pad Smart stylus and folio support",
      "10 hours of video playback",
    ],
    inStock: true,
    featured: true,
    bestseller: false,
    addedAt: "2026-08-19",
  },
  {
    id: "nexon-tab-v-12",
    slug: "nexon-tab-v-12",
    name: "Nexon Tab V 12",
    brand: "Nexon",
    category: "tablets",
    price: 58990,
    rating: 4.5,
    reviews: 287,
    image: img("1544244015-0df4b3ffc6b0"),
    imageAlt: "Nexon Tab V 12 tablet on a desk next to its stylus and keyboard case",
    description:
      "Built for study and streaming nights. The Tab V 12 pairs a vivid 2.1K display with V-planner note software and a bundled stylus — no separate accessories to buy.",
    features: [
      '12.1-inch 2.1K "Vivid" display',
      "Stylus + slim folio included",
      "Quad speakers tuned for movies",
      "8,000 mAh battery",
    ],
    inStock: true,
    featured: false,
    bestseller: false,
    addedAt: "2026-05-09",
  },
  {
    id: "aurora-pad-mini-8",
    slug: "aurora-pad-mini-8",
    name: "Aurora Pad Mini 8",
    brand: "Aurora",
    category: "tablets",
    price: 45990,
    rating: 4.5,
    reviews: 198,
    image: img("1561154464-82e9adf32764"),
    imageAlt: "Aurora Pad Mini 8 tablet held in one hand, home screen visible",
    description:
      "The perfect couch-and-commute size. Pad Mini 8 is feather light, supports the Pad Smart stylus, and doubles as a second screen for Aurora laptops.",
    features: [
      '8.3-inch "Mini Retina" display',
      "295 g featherweight build",
      "Sidecar mode for Aurora laptops",
      "All-day 4,322 mAh battery",
    ],
    inStock: true,
    featured: false,
    bestseller: false,
    addedAt: "2026-04-02",
  },
  {
    id: "nexon-tab-air-10-se",
    slug: "nexon-tab-air-10-se",
    name: "Nexon Tab Air 10 SE",
    brand: "Nexon",
    category: "tablets",
    price: 28990,
    originalPrice: 32990,
    rating: 4.3,
    reviews: 519,
    image: img("1587033411391-5d9e51cce126"),
    imageAlt: "Nexon Tab Air 10 SE tablet on a white desk beside a small succulent plant",
    description:
      "A friendly entry tablet for the whole family: eye-safe display tuning, parental profiles and Kids Space — now discounted while limited stock lasts.",
    features: [
      "10.1-inch eye-comfort display",
      "Kids Space with parental controls",
      "Dual-band Wi-Fi + LTE option",
      "Up to 1TB expandable storage",
    ],
    inStock: false,
    featured: false,
    bestseller: false,
    addedAt: "2026-02-11",
  },

  /* ------------------------ Headphones ---------------------- */
  {
    id: "vanta-studio-one",
    slug: "vanta-studio-one",
    name: "Vanta Studio One ANC",
    brand: "Vanta",
    category: "headphones",
    price: 24990,
    originalPrice: 29990,
    rating: 4.8,
    reviews: 1846,
    image: img("1618366712010-f4ae9c647dcb"),
    imageAlt: "Vanta Studio One ANC over-ear headphones in matte black on a beige background",
    description:
      "Over-ear reference sound with class-leading adaptive noise cancelling. Studio One folds flat, works wired or wireless, and sips battery for a 38-hour cushion.",
    features: [
      "Adaptive ANC with transparency mode",
      "38-hour battery (60 hours wired ANC)",
      "Multipoint Bluetooth 5.4",
      "Foldable with travel case",
    ],
    inStock: true,
    featured: true,
    bestseller: true,
    addedAt: "2026-09-01",
  },
  {
    id: "vanta-nova-anc",
    slug: "vanta-nova-anc",
    name: "Vanta Nova ANC",
    brand: "Vanta",
    category: "headphones",
    price: 19990,
    rating: 4.7,
    reviews: 743,
    image: img("1546435770-a3e426bf472b"),
    imageAlt: "Vanta Nova ANC headphones in charcoal, shown from above on a white desk",
    description:
      "The everyday ANC companion. Nova keeps Vanta's warm tuning, adds soft memory-foam cups and drops the price — the gateway pair for serious listeners.",
    features: [
      "Active noise cancelling",
      "30-hour battery life",
      "Quick-charge: 10 min for 5 hours",
      "Rotating ear cups",
    ],
    inStock: true,
    featured: false,
    bestseller: false,
    addedAt: "2026-07-22",
  },
  {
    id: "vanta-orbit-wireless",
    slug: "vanta-orbit-wireless",
    name: "Vanta Orbit Wireless",
    brand: "Vanta",
    category: "headphones",
    price: 12990,
    rating: 4.5,
    reviews: 1120,
    image: img("1484704849700-f032a568e944"),
    imageAlt: "Vanta Orbit Wireless headphones resting on a walnut table",
    description:
      "Light, cozy and honest. Orbit skips the gadgetry for pure comfort — a 28-hour battery and Vanta's signature clear mids at a mid-tier price.",
    features: [
      "28-hour battery life",
      "Featherweight 214 g frame",
      "Bluetooth 5.3 + 3.5mm jack",
      "Two-tone comfort headband",
    ],
    inStock: true,
    featured: false,
    bestseller: false,
    addedAt: "2026-04-16",
  },
  {
    id: "vanta-studio-one-lite",
    slug: "vanta-studio-one-lite",
    name: "Vanta Studio One Lite",
    brand: "Vanta",
    category: "headphones",
    price: 16990,
    rating: 4.4,
    reviews: 388,
    image: img("1585771724684-38269d6639fd"),
    imageAlt: "Vanta Studio One Lite on-ear headphones in tan and black placed on a wooden desk",
    description:
      "Studio One's sound in a lighter on-ear shell. The Lite trades noise cancelling for all-day battery and a frankly ridiculous comfort-to-weight ratio.",
    features: [
      "On-ear design, 190 g",
      "42-hour battery life",
      "Passive noise isolation",
      "Braided detachable cable",
    ],
    inStock: true,
    featured: false,
    bestseller: false,
    addedAt: "2026-03-04",
  },
  {
    id: "sonique-arena-x",
    slug: "sonique-arena-x",
    name: "Sonique Arena X",
    brand: "Sonique",
    category: "headphones",
    price: 18990,
    rating: 4.6,
    reviews: 654,
    image: img("1583394838336-acd977736f90"),
    imageAlt: "Sonique Arena X over-ear headphones in studio black against a white background",
    description:
      "Arena X is tuned for stage presence: deep sub-bass, a clean top end and a padded headband that survives three-hour sessions without a hint of fatigue.",
    features: [
      "40 mm bio-cellulose drivers",
      "Sub-bass enriched tuning",
      "Detachable boom-free cable",
      "25-hour battery life",
    ],
    inStock: true,
    featured: false,
    bestseller: false,
    addedAt: "2026-06-08",
  },
  {
    id: "sonique-venue-700",
    slug: "sonique-venue-700",
    name: "Sonique Venue 700",
    brand: "Sonique",
    category: "headphones",
    price: 11490,
    rating: 4.3,
    reviews: 296,
    image: img("1614860243518-c12eb2fdf66c"),
    imageAlt: "Sonique Venue 700 headphones folded flat on a light grey surface",
    description:
      "A folder-friendly on-ear set for commuters who pack light. Venue 700 closes flat, resists scratches and keeps 20 hours of playback per charge.",
    features: [
      "Folding on-ear design",
      "20-hour battery life",
      "Scratch-resistant matte finish",
      "USB-C charging",
    ],
    inStock: false,
    featured: false,
    bestseller: false,
    addedAt: "2026-02-25",
  },

  /* -------------------------- Earbuds ------------------------ */
  {
    id: "prism-buds-air-6",
    slug: "prism-buds-air-6",
    name: "Prism Buds Air 6 ANC",
    brand: "Prism",
    category: "earbuds",
    price: 12490,
    originalPrice: 13990,
    rating: 4.6,
    reviews: 2384,
    image: img("1606841837239-c5a1a4a07af7"),
    imageAlt: "Prism Buds Air 6 earbuds and open charging case on a bright blue background",
    description:
      "True wireless ANC earbuds that simply do everything well: adaptive noise cancelling, spatial audio with head tracking and a 32-hour total battery.",
    features: [
      "Adaptive ANC + transparency",
      "32-hour total battery with case",
      "Spatial audio with head tracking",
      "IPX4 sweat resistance",
    ],
    inStock: true,
    featured: true,
    bestseller: true,
    addedAt: "2026-09-28",
  },
  {
    id: "prism-buds-pro-4",
    slug: "prism-buds-pro-4",
    name: "Prism Buds Pro 4",
    brand: "Prism",
    category: "earbuds",
    price: 9990,
    rating: 4.5,
    reviews: 1657,
    image: img("1606741965326-cb990ae01bb2"),
    imageAlt: "Prism Buds Pro 4 earbuds photographed beside their open white case",
    description:
      "Prism's comfort champion. Pro 4 tips come in four sizes with a pressure-balanced fit, and the in-app EQ unlocks Prism's studio presets for free.",
    features: [
      "Pressure-balanced ergonomic fit",
      "6-hour buds, 28-hour total",
      "Studio EQ presets in app",
      "Bluetooth 5.4 multipoint",
    ],
    inStock: true,
    featured: false,
    bestseller: true,
    addedAt: "2026-08-11",
  },
  {
    id: "prism-buds-mini-5",
    slug: "prism-buds-mini-5",
    name: "Prism Buds Mini 5",
    brand: "Prism",
    category: "earbuds",
    price: 6490,
    rating: 4.3,
    reviews: 876,
    image: img("1588423771073-b8903fbb85b5"),
    imageAlt: "Prism Buds Mini 5 small white earbuds held in an open case, one hand",
    description:
      "Tiny in every dimension — buds, case, and price. Mini 5 disappears in the ear and covers a full commute week on one top-up.",
    features: [
      "Ultra-compact buds and case",
      "5-hour buds, 24-hour total",
      "Touch controls with wear detection",
      "IPX4 splash proof",
    ],
    inStock: true,
    featured: false,
    bestseller: false,
    addedAt: "2026-05-30",
  },
  {
    id: "prism-buds-sport-3",
    slug: "prism-buds-sport-3",
    name: "Prism Buds Sport 3",
    brand: "Prism",
    category: "earbuds",
    price: 7990,
    rating: 4.4,
    reviews: 1240,
    image: img("1606220588913-b3aacb4d2f46"),
    imageAlt: "Prism Buds Sport 3 earbuds with red accents shown with their charging case",
    description:
      "Made for runners and lifters: winged earhooks lock the fit, an IPX7 build survives heavy sweat and rain, and a bass-forward profile carries your cadence.",
    features: [
      "IPX7 rain and sweat proof",
      "Winged sport earhooks",
      "Bass-forward EQ profile",
      "8-hour buds, 26-hour total",
    ],
    inStock: true,
    featured: false,
    bestseller: false,
    addedAt: "2026-07-01",
  },
  {
    id: "vanta-buds-500",
    slug: "vanta-buds-500",
    name: "Vanta Buds 500",
    brand: "Vanta",
    category: "earbuds",
    price: 4990,
    rating: 4.2,
    reviews: 1930,
    image: img("1655804439989-24758d6e96b8"),
    imageAlt: "Vanta Buds 500 glossy black earbuds in an open case on a marble surface",
    description:
      "Vanta's budget hero. Deep bass, a clean mic array for calls, and a pocket-sized case — honest low-cost buds without compromises you notice.",
    features: [
      "12 mm dynamic drivers",
      "IPX5 rated build",
      "Fast pairing on Android and iOS",
      "6-hour buds, 22-hour total",
    ],
    inStock: true,
    featured: false,
    bestseller: false,
    addedAt: "2026-03-27",
  },
  {
    id: "sonique-pebble-pods",
    slug: "sonique-pebble-pods",
    name: "Sonique Pebble Pods",
    brand: "Sonique",
    category: "earbuds",
    price: 4690,
    originalPrice: 5490,
    rating: 4.1,
    reviews: 1124,
    image: img("1600294037681-c80b4cb5b434"),
    imageAlt: "Sonique Pebble Pods white earbuds and rounded case on a dark blue background",
    description:
      "Rounded, pebble-shaped buds that sit flush — ideal for side sleepers and small ears. A simple, honest pair for podcasts and calls all week long.",
    features: [
      "Pebble-flat ergonomic shape",
      "Sleep-friendly zero pressure fit",
      "20-hour total battery",
      "Two-tone voice call clarity",
    ],
    inStock: true,
    featured: false,
    bestseller: false,
    addedAt: "2026-01-19",
  },
  /* ------------------------ Smartwatches --------------------- */
  {
    id: "kairo-pulse-2-pro",
    slug: "kairo-pulse-2-pro",
    name: "Kairo Pulse 2 Pro",
    brand: "Kairo",
    category: "smartwatches",
    price: 34990,
    rating: 4.7,
    reviews: 842,
    image: img("1546868871-7041f2a55e12"),
    imageAlt: "Kairo Pulse 2 Pro smartwatch with an always-on AMOLED face on a white background",
    description:
      "Kairo's flagship health computer. Dual-band GPS, ECG-grade heart tracking and a 2-week battery make Pulse 2 Pro the most capable watch we stock.",
    features: [
      "Always-on 1.9\" AMOLED",
      "ECG + blood oxygen tracking",
      "Dual-band race-accurate GPS",
      "14-day battery life",
    ],
    inStock: true,
    featured: true,
    bestseller: true,
    addedAt: "2026-09-10",
  },
  {
    id: "kairo-pulse-2",
    slug: "kairo-pulse-2",
    name: "Kairo Pulse 2",
    brand: "Kairo",
    category: "smartwatches",
    price: 22990,
    originalPrice: 25990,
    rating: 4.5,
    reviews: 1287,
    image: img("1434493789847-2f02dc6ca35d"),
    imageAlt: "Kairo Pulse 2 smartwatch worn on the wrist showing the activity dashboard",
    description:
      "The everyday Pulse. Same Kairo health engine as the Pro with a slimmer case, plus 120 workout modes and sleep coaching that actually changes habits.",
    features: [
      '1.7" AMOLED, 60Hz',
      "120 workout modes",
      "Sleep and stress coaching",
      "10-day battery life",
    ],
    inStock: true,
    featured: false,
    bestseller: false,
    addedAt: "2026-06-18",
  },
  {
    id: "kairo-trail-r",
    slug: "kairo-trail-r",
    name: "Kairo Trail R",
    brand: "Kairo",
    category: "smartwatches",
    price: 29990,
    rating: 4.6,
    reviews: 415,
    image: img("1508685096489-7aacd43bd3b1"),
    imageAlt: "Kairo Trail R rugged smartwatch worn outdoors in rainy weather",
    description:
      "A rugged navigator for the trail. MIL-STD-810 build, storm-tested waterproofing and offline topo maps make Trail R the watch that comes home with you.",
    features: [
      "MIL-STD-810H rugged build",
      "Offline topographic maps",
      "10 ATM water resistance",
      "25-day battery in explorer mode",
    ],
    inStock: true,
    featured: false,
    bestseller: false,
    addedAt: "2026-04-25",
  },
  {
    id: "kairo-move-fit",
    slug: "kairo-move-fit",
    name: "Kairo Move Fit",
    brand: "Kairo",
    category: "smartwatches",
    price: 12990,
    rating: 4.2,
    reviews: 1756,
    image: img("1617043786394-f977fa12eddf"),
    imageAlt: "Kairo Move Fit fitness smartwatch displayed in front of its packaging",
    description:
      "Move Fit tracks the basics brilliantly — steps, sleep, ten sports — and pushes Kairo coaching nudges to keep streaks alive. Our best value wearable.",
    features: [
      "Steps, sleep and heart rate",
      "10 sport modes",
      "Smartphone notifications",
      "7-day battery life",
    ],
    inStock: false,
    featured: false,
    bestseller: false,
    addedAt: "2026-02-02",
  },
  {
    id: "orbita-chrono-s",
    slug: "orbita-chrono-s",
    name: "Orbita Chrono S",
    brand: "Orbita",
    category: "smartwatches",
    price: 17990,
    rating: 4.4,
    reviews: 239,
    image: img("1523275335684-37898b6baf30"),
    imageAlt: "Orbita Chrono S hybrid smartwatch with a silver analog face and steel strap",
    description:
      "A hybrid chrono that reads like a classic watch and tracks like a wearable. Chrono S hides a two-year battery behind a sapphire-topped analog dial.",
    features: [
      "Sapphire analog hybrid display",
      "Two-year coin-cell battery",
      "Steel strap, 316L housing",
      "Notifications + activity tracking",
    ],
    inStock: true,
    featured: false,
    bestseller: false,
    addedAt: "2026-01-08",
  },

  /* -------------------------- Speakers ----------------------- */
  {
    id: "sonique-boom-40",
    slug: "sonique-boom-40",
    name: "Sonique Boom 40",
    brand: "Sonique",
    category: "speakers",
    price: 15990,
    rating: 4.6,
    reviews: 928,
    image: img("1589003077984-894e133dabab"),
    imageAlt: "Sonique Boom 40 portable speaker with RGB light ring, standing on a yellow backdrop",
    description:
      "A party-ready cylinder with 40 W of room-filling stereo and a light ring that syncs to the beat. Boom 40 floats a full day on one battery.",
    features: [
      "40 W stereo output with light ring",
      "24-hour playtime",
      "IPX6 splash proof",
      "Pair two for dual-speaker stereo",
    ],
    inStock: true,
    featured: true,
    bestseller: false,
    addedAt: "2026-08-30",
  },
  {
    id: "sonique-boom-go-12",
    slug: "sonique-boom-go-12",
    name: "Sonique Boom Go 12",
    brand: "Sonique",
    category: "speakers",
    price: 7490,
    rating: 4.4,
    reviews: 1414,
    image: img("1608043152269-423dbba4e7e1"),
    imageAlt: "Sonique Boom Go 12 compact fabric-covered portable speaker on a wooden table",
    description:
      "The travel-size Boom: a fabric-wrapped 12 W rig tuned for outdoor midrange punch, plus a rubberized strap that clamps to almost anything.",
    features: [
      "12 W full-range output",
      "IPX7 waterproof build",
      "12-hour battery life",
      "Strap + carabiner included",
    ],
    inStock: true,
    featured: false,
    bestseller: true,
    addedAt: "2026-05-15",
  },
  {
    id: "sonique-stage-one",
    slug: "sonique-stage-one",
    name: "Sonique Stage One",
    brand: "Sonique",
    category: "speakers",
    price: 22990,
    rating: 4.5,
    reviews: 173,
    image: img("1545454675-3531b543be5d"),
    imageAlt: "Sonique Stage One two-way bookshelf speaker with wooden cabinet on a desk",
    description:
      "A two-way bookshelf speaker for desk-first listeners. Stage One's wooden cabinet and 4\" woven driver make late-night vinyl and lo-fi genuinely warm.",
    features: [
      'Two-way 4" wooden cabinet',
      "Optical + USB-C + Bluetooth inputs",
      "Dedicated subwoofer output",
      "Bass response down to 52 Hz",
    ],
    inStock: true,
    featured: false,
    bestseller: false,
    addedAt: "2026-04-09",
  },
  {
    id: "zephyr-aera-360",
    slug: "zephyr-aera-360",
    name: "Zephyr Aera 360",
    brand: "Zephyr",
    category: "speakers",
    price: 10990,
    originalPrice: 12990,
    rating: 4.4,
    reviews: 366,
    image: img("1558537348-c0f8e733989d"),
    imageAlt: "Zephyr Aera 360 cylindrical speaker lit a deep red with its grille glow visible",
    description:
      "Aera 360 projects sound and light in a full ring, filling corners regular speakers forget. Your lighting desk's favorite accessory.",
    features: [
      "360° radial sound field",
      "Sync 8 units into one room",
      "RGB ambient light modes",
      "18-hour battery life",
    ],
    inStock: true,
    featured: false,
    bestseller: false,
    addedAt: "2026-03-13",
  },

  /* ------------------------ Accessories ---------------------- */
  {
    id: "volta-turbocharge-65w",
    slug: "volta-turbocharge-65w",
    name: "Volta TurboCharge 65W GaN",
    brand: "Volta",
    category: "accessories",
    price: 3490,
    rating: 4.7,
    reviews: 3126,
    image: img("1583863788434-e58a36330cf0"),
    imageAlt: "Volta TurboCharge 65W GaN charger with braided cable, mobile and laptop",
    description:
      "One compact brick to charge your laptop and phone together. GaN III internals shrink the plug while the dual USB-C ports power up to 65 W stably.",
    features: [
      "65W dual USB-C GaN III",
      "Foldable travel pins",
      "Lasts 50,000 charge cycles",
      "Two-year warranty",
    ],
    inStock: true,
    featured: true,
    bestseller: true,
    addedAt: "2026-10-12",
  },
  {
    id: "volta-powerbank-20k",
    slug: "volta-powerbank-20k",
    name: "Volta PowerPack 20K",
    brand: "Volta",
    category: "accessories",
    price: 4990,
    rating: 4.5,
    reviews: 2054,
    image: img("1609091839311-d5365f9ff1c5"),
    imageAlt: "Volta PowerPack 20K power bank held in hand between a phone and laptop",
    description:
      "A 20,000 mAh slab with 22.5W PD output, a crisp status display, and airline-safe cells — it tops up a phone four times or a tablet once.",
    features: [
      "20,000 mAh / 22.5W PD",
      "Digital charge percentage display",
      "Charges 3 devices at once",
      "Airline-safe approved capacity",
    ],
    inStock: true,
    featured: false,
    bestseller: false,
    addedAt: "2026-09-05",
  },
  {
    id: "volta-halomag-15w",
    slug: "volta-halomag-15w",
    name: "Volta HaloMag 15W",
    brand: "Volta",
    category: "accessories",
    price: 2990,
    originalPrice: 3490,
    rating: 4.6,
    reviews: 743,
    image: img("1615526675045-07531f986a9e"),
    imageAlt: "Volta HaloMag 15W round magnetic wireless charger on a dark desk",
    description:
      "Snap-and-charge simplicity for magnetic phones. HaloMag aligns perfectly every time, supports 15W fast charging and desk-stand viewing in one flip.",
    features: [
      "15W magnetic fast charge",
      "Aluminium cooling shell",
      "Foldable kickstand viewing",
      "Braided 1.5 m USB-C cable",
    ],
    inStock: true,
    featured: false,
    bestseller: false,
    addedAt: "2026-08-22",
  },
  {
    id: "orbita-glide-pro",
    slug: "orbita-glide-pro",
    name: "Orbita Glide Pro Mouse",
    brand: "Orbita",
    category: "accessories",
    price: 3890,
    rating: 4.5,
    reviews: 1620,
    image: img("1615663245857-ac93bb7c39e7"),
    imageAlt: "Orbita Glide Pro wireless mouse in matte black on a dark background",
    description:
      "A sculpted ergonomic mouse with silent switches, 7,000 DPI track-anywhere sensor and triple-device pairing — comfortable through an eight-hour day.",
    features: [
      "Silent switches and scroll wheel",
      "7,000 DPI sensor",
      "Bluetooth + 2.4GHz dongle",
      "90-day battery per charge",
    ],
    inStock: true,
    featured: false,
    bestseller: false,
    addedAt: "2026-06-30",
  },
  {
    id: "orbita-caseguard-kit",
    slug: "orbita-caseguard-kit",
    name: "Orbita CaseGuard Kit",
    brand: "Orbita",
    category: "accessories",
    price: 2490,
    originalPrice: 2990,
    rating: 4.3,
    reviews: 489,
    image: img("1697008230017-c0a2a252b19a"),
    imageAlt: "Orbita CaseGuard Kit with multiple matte and clear phone cases laid out flat",
    description:
      "Three protective cases, one price — a matte daily, a clear show-off and a rugged drop-test shell, each cut precisely for modern flagships.",
    features: [
      "3 cases: matte, clear, rugged",
      "2 m military-grade drop rating",
      "Anti-yellowing clear polymer",
      "Fits Neo and Vela series",
    ],
    inStock: true,
    featured: false,
    bestseller: true,
    addedAt: "2026-07-28",
  },
];

export { PRODUCTS as ALL_PRODUCTS };

/* ------------------------------------------------------------------ */
/* Lookups                                                             */
/* ------------------------------------------------------------------ */

const PRODUCT_BY_ID = new Map(PRODUCTS.map((p) => [p.id, p]));
const PRODUCT_BY_SLUG = new Map(PRODUCTS.map((p) => [p.slug, p]));

export function getProductById(id: string): Product | undefined {
  return PRODUCT_BY_ID.get(id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCT_BY_SLUG.get(slug);
}

/** Products shown in the homepage "Featured gadgets" rail, in display order. */
export const FEATURED_IDS = [
  "aurora-neo-12-pro",
  "vanta-studio-one",
  "prism-buds-air-6",
  "kairo-pulse-2-pro",
  "nexon-vela-5",
  "aurora-pad-s-11",
  "sonique-boom-40",
  "volta-turbocharge-65w",
];

export function getFeaturedProducts(): Product[] {
  return FEATURED_IDS.map((id) => PRODUCT_BY_ID.get(id)).filter(
    (p): p is Product => p != null
  );
}

/** Related products: same category first, then same brand, farthest from self. */
export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const scored = PRODUCTS.filter((p) => p.id !== product.id).map((p) => {
    const sameCategory = p.category === product.category ? 2 : 0;
    const sameBrand = p.brand === product.brand ? 1 : 0;
    return { p, score: sameCategory + sameBrand };
  });
  return scored
    .sort((a, b) => b.score - a.score || b.p.rating - a.p.rating)
    .slice(0, limit)
    .map((entry) => entry.p);
}

/** Distinct brand list, alphabetical — drives the brand filter checkboxes. */
export function getBrands(): string[] {
  return [...new Set(PRODUCTS.map((p) => p.brand))].sort();
}

/** Category counts for the shop sidebar and category chips. */
export function getCategoryCounts(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const p of PRODUCTS) counts[p.category] = (counts[p.category] ?? 0) + 1;
  return counts;
}

export function countProducts(): number {
  return PRODUCTS.length;
}
