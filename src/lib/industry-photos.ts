export type IndustryPhoto = {
  src: string;
  alt: string;
  title: string;
  source: string;
};

/**
 * Stock photographs from Pexels, used to illustrate each industry and listed on /credits.
 * Avoid identifiable people and visible brands: the licence forbids implying that they endorse Minute Books.
 */
export const industryPhotos: Record<string, IndustryPhoto> = {
  restaurants: {
    src: "/industries/restaurants.webp",
    alt: "Modern restaurant with wooden tables, velvet chairs and warm pendant lights",
    title: "Modern restaurant interior with warm lighting",
    source: "https://www.pexels.com/photo/modern-restaurant-interior-with-warm-lighting-37737840/",
  },
  retail: {
    src: "/industries/retail.webp",
    alt: "Neat wooden shelves of everyday goods in a small shop",
    title: "Shop interior",
    source: "https://www.pexels.com/photo/shop-interior-3735216/",
  },
  supermarkets: {
    src: "/industries/supermarkets.webp",
    alt: "Bright supermarket with a fresh fruit display and chilled aisles",
    title: "Interior of supermarket",
    source: "https://www.pexels.com/photo/interior-of-supermarket-12340541/",
  },
  medical: {
    src: "/industries/medical.webp",
    alt: "Pharmacy shelves lined with glass medicine bottles and jars",
    title: "Pharmacy shelves and ladder",
    source: "https://www.pexels.com/photo/pharmacy-shelves-and-ladder-6074000/",
  },
  salons: {
    src: "/industries/salons.webp",
    alt: "Spacious salon with marble floors, styling chairs and ring-light mirrors",
    title: "Beauty salon interior design",
    source: "https://www.pexels.com/photo/beauty-salon-interior-design-7750099/",
  },
  wholesale: {
    src: "/industries/wholesale.webp",
    alt: "Tall warehouse racks holding wrapped cartons on pallets",
    title: "Interior of warehouse",
    source: "https://www.pexels.com/photo/interior-of-warehouse-10697106/",
  },
  manufacturing: {
    src: "/industries/manufacturing.webp",
    alt: "Row of industrial press machines on a clean factory floor",
    title: "Industrial factory floor with machinery",
    source: "https://www.pexels.com/photo/industrial-factory-floor-with-machinery-31352672/",
  },
  garments: {
    src: "/industries/garments.webp",
    alt: "Sunlit boutique with garments hanging on racks",
    title: "Fashion store interior with garments hanging on racks",
    source: "https://www.pexels.com/photo/fashion-store-interior-with-garments-hanging-on-racks-4940756/",
  },
  electronics: {
    src: "/industries/electronics.webp",
    alt: "Electronics store with phones on wooden display tables",
    title: "A set of tables and shelves with displayed cellphones",
    source: "https://www.pexels.com/photo/a-set-of-tables-and-shelves-with-displayed-cellphones-11297769/",
  },
  automobile: {
    src: "/industries/automobile.webp",
    alt: "Car raised on a lift in a tidy service workshop",
    title: "Car on lift at the auto repair shop",
    source: "https://www.pexels.com/photo/car-on-lift-at-auto-the-repair-shop-8985667/",
  },
  schools: {
    src: "/industries/schools.webp",
    alt: "Empty school classroom with wooden desks and a green chalkboard",
    title: "Empty classroom with desks and chalkboard",
    source: "https://www.pexels.com/photo/empty-classroom-with-desks-and-chalkboard-36650154/",
  },
  colleges: {
    src: "/industries/colleges.webp",
    alt: "Empty college lecture hall with rows of tiered seats",
    title: "Empty university lecture hall",
    source: "https://www.pexels.com/photo/room-chair-lot-356065/",
  },
};
