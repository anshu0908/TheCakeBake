// Seed menu. NOTE: prices are placeholders, not the client's real prices.
import { images as img } from "./images";
import type { Product, SizeOption } from "@/lib/types";

const round50 = (n: number) => Math.round(n / 50) * 50;
const kg = (base: number): SizeOption[] => [
  { label: "500 g", price: base },
  { label: "1 kg", price: round50(base * 1.9) },
  { label: "2 kg", price: round50(base * 3.7) },
];
const box = (labels: string[], prices: number[]): SizeOption[] => labels.map((label, i) => ({ label, price: prices[i] }));

type P = Omit<Product, "gallery" | "inStock" | "messageOnCake"> & Partial<Pick<Product, "inStock" | "messageOnCake">>;

const make = (p: P, extra: string[]): Product => ({
  inStock: true,
  messageOnCake: p.category === "cakes",
  ...p,
  gallery: [p.image, ...extra.filter((x) => x !== p.image)],
});

const g = img.gallery;

export const seedProducts: Product[] = [
  make({ id: "p1", slug: "rasmalai-cake-tub", name: "Rasmalai Cake Tub", short: "Saffron sponge soaked in rasmalai milk, layered with cream and pistachio.",
    description: "Rasmalai made into a cake. Saffron sponge soaked in cardamom rabri milk, layered with light cream and topped with pistachio and rose petals. It comes in a tub you can hand over as a gift.",
    category: "tubs", image: img.products.rasmalai, sizes: box(["Single tub", "Pack of 2", "Pack of 4"], [349, 649, 1249]), tags: ["Bestseller"], eggless: true, popularity: 98 }, [g[6], g[4]]),
  make({ id: "p2", slug: "rose-cake-tub", name: "Rose Cake Tub", short: "Rose-scented sponge with whipped cream and a hint of gulkand.",
    description: "Rose sponge layered with whipped cream, rose petal preserve and crushed pistachio. Light, floral and pink.",
    category: "tubs", image: img.products.roseTub, sizes: box(["Single tub", "Pack of 2", "Pack of 4"], [329, 619, 1199]), tags: ["Bestseller"], eggless: true, popularity: 94 }, [g[2], g[0]]),
  make({ id: "p3", slug: "vanilla-cupcake", name: "Vanilla Cupcake", short: "Buttery vanilla bean cupcake with silky buttercream swirl.",
    description: "Vanilla bean sponge with a swirl of buttercream and sprinkles. Easy to share at school, at the office or at a small party.",
    category: "cupcakes", image: img.products.vanillaCupcake, sizes: box(["Box of 4", "Box of 6", "Box of 12"], [349, 499, 949]), tags: ["Bestseller"], eggless: true, popularity: 90 }, [g[1], g[5]]),
  make({ id: "p4", slug: "dry-fruit-cake", name: "Dry Fruit Cake", short: "Rich, moist loaf packed with nuts and candied fruit.",
    description: "A slow-baked loaf full of almonds, cashews, raisins and candied fruit. It keeps and travels well, which makes it a good festival gift.",
    category: "dry", image: img.products.dryFruit, sizes: box(["500 g", "1 kg"], [550, 1050]), tags: [], eggless: true, popularity: 78 }, [g[6], g[3]]),
  make({ id: "p5", slug: "rose-gulkand-cake", name: "Rose Gulkand Cake", short: "Rose and gulkand cream layers with a fragrant sponge.",
    description: "Rose sponge layered with gulkand cream and finished with edible petals.",
    category: "cakes", image: img.products.roseGulkand, sizes: kg(800), tags: ["Bestseller"], eggless: true, popularity: 96 }, [g[2], g[7]]),
  make({ id: "p6", slug: "tiramisu-pastry", name: "Tiramisu Pastry", short: "Espresso-soaked sponge with mascarpone cream and cocoa.",
    description: "Tiramisu as a single pastry: coffee-soaked sponge, mascarpone cream and dark cocoa on top.",
    category: "cupcakes", image: img.products.tiramisu, sizes: box(["1 piece", "Box of 4", "Box of 6"], [179, 649, 949]), tags: ["Bestseller"], eggless: false, popularity: 88 }, [g[4], g[1]]),
  make({ id: "p7", slug: "death-by-chocolate", name: "Death by Chocolate", short: "Dark chocolate sponge, ganache and chocolate shards.",
    description: "Layers of dark chocolate sponge and ganache, covered in chocolate shavings.",
    category: "cakes", image: img.products.deathByChoc, sizes: kg(750), tags: ["Bestseller"], eggless: true, popularity: 100 }, [g[0], g[8]]),
  make({ id: "p8", slug: "black-forest-cake", name: "Black Forest", short: "Chocolate sponge, whipped cream and cherries.",
    description: "Chocolate sponge, light whipped cream, black cherries and chocolate curls.",
    category: "cakes", image: img.products.blackForest, sizes: kg(650), tags: [], eggless: true, popularity: 82 }, [g[8], g[0]]),
  make({ id: "p9", slug: "red-velvet-cake", name: "Red Velvet", short: "Velvety cocoa sponge with cream cheese frosting.",
    description: "Soft, subtly cocoa-flavoured red sponge layered with tangy cream cheese frosting.",
    category: "cakes", image: img.products.redVelvet, sizes: kg(750), tags: ["Bestseller"], eggless: true, popularity: 92 }, [g[5], g[7]]),
  make({ id: "p10", slug: "fresh-fruit-cake", name: "Fresh Fruit Cake", short: "Vanilla sponge, light cream and seasonal fresh fruit.",
    description: "Light vanilla sponge with whipped cream and a thick layer of seasonal fruit. Not too sweet.",
    category: "cakes", image: img.products.fruitCake, sizes: kg(700), tags: [], eggless: true, popularity: 85 }, [g[3], g[2]]),
  make({ id: "p11", slug: "butterscotch-cake", name: "Butterscotch", short: "Caramel sponge with crunchy praline.",
    description: "Butterscotch cream, golden caramel and crunchy praline over soft vanilla sponge.",
    category: "cakes", image: img.products.butterscotch, sizes: kg(650), tags: [], eggless: true, popularity: 76 }, [g[3], g[0]]),
  make({ id: "p12", slug: "chocolate-truffle-cake", name: "Chocolate Truffle", short: "Dense truffle layers coated in silky chocolate ganache.",
    description: "Rich chocolate sponge sandwiched with truffle cream and covered in glossy ganache.",
    category: "cakes", image: img.products.truffle, sizes: kg(700), tags: [], eggless: true, popularity: 89 }, [g[0], g[8]]),
  make({ id: "p13", slug: "photo-cake", name: "Photo Cake", short: "Your favourite photo printed on edible icing.",
    description: "Send us a photo and we print it on an edible sheet over a vanilla or chocolate cake. Share the picture on WhatsApp after ordering.",
    category: "cakes", image: img.products.photoCake, sizes: kg(900), tags: ["New"], eggless: true, popularity: 70 }, [g[2], g[5]]),
  make({ id: "p14", slug: "walnut-brownie", name: "Walnut Brownie", short: "Fudgy brownie with a crackly top and toasted walnuts.",
    description: "Dense and fudgy, with toasted walnuts for crunch.",
    category: "cupcakes", image: img.products.brownie, sizes: box(["Box of 4", "Box of 6", "Box of 9"], [299, 429, 629]), tags: [], eggless: true, popularity: 80 }, [g[6], g[0]]),
  make({ id: "p15", slug: "macaron-box", name: "Macaron Box", short: "Assorted macarons in a gift box.",
    description: "Almond shells in mixed flavours, filled with ganache or buttercream.",
    category: "cupcakes", image: img.products.macarons, sizes: box(["Box of 6", "Box of 12", "Box of 24"], [499, 949, 1799]), tags: ["New"], eggless: false, popularity: 72 }, [g[1], g[7]]),
  make({ id: "p16", slug: "pistachio-cake-tub", name: "Pistachio Cake Tub", short: "Nutty pistachio sponge with cream and crushed nuts.",
    description: "Pistachio sponge layered with light cream and crunchy pistachio praline.",
    category: "tubs", image: img.products.pistaTub, sizes: box(["Single tub", "Pack of 2", "Pack of 4"], [369, 689, 1299]), tags: [], eggless: true, popularity: 74 }, [g[4], g[2]]),
  make({ id: "p17", slug: "plum-cake", name: "Plum Cake", short: "Spiced fruit and nut loaf.",
    description: "Dark, moist and spiced, made with soaked dried fruit. A festival favourite.",
    category: "dry", image: img.products.plum, sizes: box(["500 g", "1 kg"], [499, 949]), tags: [], eggless: true, popularity: 68 }, [g[6], g[3]]),
  make({ id: "p18", slug: "celebration-hamper", name: "Celebration Hamper", short: "A small cake, cupcakes and treats in a gift box.",
    description: "A small cake, assorted cupcakes and sweets, packed in a gift box with a handwritten note.",
    category: "hampers", image: img.products.hamper, sizes: box(["Classic", "Premium", "Luxe"], [1299, 1999, 2999]), tags: ["Bestseller"], eggless: true, popularity: 84 }, [g[1], g[6]]),
  make({ id: "p19", slug: "cupcake-gift-box", name: "Cupcake Gift Box", short: "Six assorted cupcakes in a gift box.",
    description: "Six assorted cupcakes with swirled frosting in a gift-ready box.",
    category: "hampers", image: img.products.cupcakeBox, sizes: box(["Box of 6", "Box of 12"], [599, 1149]), tags: [], eggless: true, popularity: 71 }, [g[1], g[5]]),
  make({ id: "p20", slug: "festive-sweet-hamper", name: "Festive Sweet Hamper", short: "Dry cake, brownies and macarons for festive gifting.",
    description: "Dry fruit cake, brownies and macarons in one box, for Diwali, office gifts or visiting family.",
    category: "hampers", image: img.products.festive, sizes: box(["Classic", "Premium", "Luxe"], [1499, 2299, 3499]), tags: ["New"], eggless: false, popularity: 66 }, [g[6], g[7]]),
];
