// Single source of truth for brand + business settings. Change values here.
export const site = {
  name: "The Cake Bake",
  type: "Bakery and Cake Shop",
  url: "https://thecakebake.com",
  rating: 4.6,
  reviewCount: 1608,
  address: {
    line: "101L, Circular Rd, near Ghaba Ki Kothi, New Colony, Sector 7",
    city: "Gurugram",
    region: "Haryana",
    postalCode: "122001",
    full: "101L, Circular Rd, near Ghaba Ki Kothi, New Colony, Sector 7, Gurugram, Haryana 122001",
  },
  phoneDisplay: "099998 32424",
  phoneTel: "+919999832424",
  whatsappNumber: "919999832424",
  whatsappUrl: "https://wa.me/919999832424",
  plusCode: "F297+9Q Gurugram, Haryana",
  // PLACEHOLDER: opening time is not confirmed by the client. Closing time is from Google.
  hours: { open: "09:00", close: "22:30", openLabel: "9:00 am", closeLabel: "10:30 pm", timeZone: "Asia/Kolkata" },
  services: ["Online order", "Takeaway", "No-contact delivery", "Custom cakes"],
  // Delivery
  freeDeliveryAbove: 1500,
  deliveryFee: 150,
  // Mock coupons: percent off the subtotal
  coupons: { WELCOME10: 10, CAKEBAKE5: 5 } as Record<string, number>,
  // Social (placeholder URLs)
  social: { instagram: "https://instagram.com/", facebook: "https://facebook.com/", youtube: "https://youtube.com/" },
  googleReviewsUrl: "https://www.google.com/maps/search/?api=1&query=The+Cake+Bake+Sector+7+Gurugram",
  mapsDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=The+Cake+Bake+101L+Circular+Rd+Sector+7+Gurugram+122001",
  mapsEmbedUrl: "https://www.google.com/maps?q=The+Cake+Bake+101L+Circular+Rd+Sector+7+Gurugram+122001&output=embed",
  // Credit line in footer: easy to remove (set to "")
  demoCredit: "Website demo by [Your Name]",
  // Demo admin credential (also in README)
  admin: { user: "admin", pass: "cakebake123" },
};
export type Site = typeof site;
