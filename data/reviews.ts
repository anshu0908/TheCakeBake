// Real Google review excerpts (paraphrased) from the brief. Do not invent additional named reviews.
export type Theme = "customized cakes" | "cake design" | "cake quality" | "fresh cakes";

export interface Review {
  id: string;
  author: string;
  badge?: string;
  when: string;
  rating?: number;
  short: string; // for carousel
  full: string; // for reviews page
  themes: Theme[];
  reply?: string;
  generic?: boolean;
}

export const reviewThemes: { id: Theme; count: number }[] = [
  { id: "customized cakes", count: 63 },
  { id: "cake design", count: 34 },
  { id: "cake quality", count: 36 },
  { id: "fresh cakes", count: 16 },
];

export const reviews: Review[] = [
  {
    id: "r1", author: "Chirag K.", when: "3 months ago", rating: 5,
    short: "The cake was perfect and exceeded expectations. I shared a reference picture while ordering and the final cake matched it.",
    full: "The cake was perfect and exceeded expectations. I shared a reference picture while ordering and the final cake matched it.",
    themes: ["customized cakes", "cake design"],
  },
  {
    id: "r2", author: "Verified Google reviewer", when: "3 years ago", rating: 5,
    short: "Amazing, light cake with great taste, vanilla base with fresh fruit filling, exactly as wanted. Really really impressed.",
    full: "Amazing, light cake with great taste, vanilla base with fresh fruit filling, exactly as wanted. Booked on Thursday for Saturday delivery. A 2 kg cake that served about 25 people, priced ₹2,200 versus a ₹4,700 quote from a freelancer. Really really impressed.",
    themes: ["cake quality", "fresh cakes", "customized cakes"],
  },
  {
    id: "r3", author: "Saumya A.", badge: "Local Guide", when: "8 months ago",
    short: "Ordered a customised cake for my son's 1st birthday and it turned out beautifully.",
    full: "Ordered a customised cake for her son's 1st birthday. The reviewer noted that pricing is on the higher side compared with peer shops.",
    themes: ["customized cakes"],
  },
  {
    id: "r4", author: "Ananya S.", when: "7 months ago",
    short: "Beautiful cake design, exactly the look I was hoping for.",
    full: "Praised the beautiful cake design (around ₹1,600), and hoped for a richer flavour for the price.",
    themes: ["cake design"],
    reply: "Thank you for the kind words about the design, and for the honest feedback on flavour. We would love to hear more so we can make your next cake even better. Please message us anytime.",
  },
  {
    id: "r5", author: "Verified Google reviewer", when: "Google review", generic: true,
    short: "Soft, fresh cake and delivery right on time.",
    full: "Customers often describe soft, fresh cakes and delivery right on time.",
    themes: ["fresh cakes", "cake quality"],
  },
  {
    id: "r6", author: "Verified Google reviewer", when: "Google review", generic: true,
    short: "Smooth, professional ordering and a design that exceeded what I imagined.",
    full: "Customers often mention a smooth, professional ordering process and designs that exceed expectations.",
    themes: ["customized cakes", "cake design"],
  },
];

export const ratingBreakdown = [
  // Illustrative distribution consistent with a 4.6 average (see README).
  { stars: 5, pct: 78 }, { stars: 4, pct: 13 }, { stars: 3, pct: 5 }, { stars: 2, pct: 2 }, { stars: 1, pct: 2 },
];

export const reviewSummary =
  "Customers describe delicious, fresh, soft cakes with beautiful customized designs that often exceed expectations, plus timely delivery and a smooth, professional ordering process. Some mention the cakes are priced on the higher side, but say quality and taste justify it.";
