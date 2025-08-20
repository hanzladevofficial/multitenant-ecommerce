import { getPayload } from "payload";
import config from "@payload-config";
const categories = [
  {
    name: "Electronics",
    slug: "electronics",
    color: "#4285f4",
    subcategories: [
      { name: "Mobile Phones", slug: "mobile-phones" },
      { name: "Laptops", slug: "laptops" },
      { name: "Tablets", slug: "tablets" },
      { name: "Cameras", slug: "cameras" },
    ],
  },
  {
    name: "Fashion",
    slug: "fashion",
    color: "#e91e63",
    subcategories: [
      { name: "Men's Clothing", slug: "mens-clothing" },
      { name: "Women's Clothing", slug: "womens-clothing" },
      { name: "Shoes", slug: "shoes" },
      { name: "Accessories", slug: "accessories" },
    ],
  },
  {
    name: "Home & Kitchen",
    slug: "home-kitchen",
    color: "#ff9800",
    subcategories: [
      { name: "Furniture", slug: "furniture" },
      { name: "Appliances", slug: "appliances" },
      { name: "Cookware", slug: "cookware" },
      { name: "Home Decor", slug: "home-decor" },
    ],
  },
  {
    name: "Beauty & Personal Care",
    slug: "beauty-personal-care",
    color: "#9c27b0",
    subcategories: [
      { name: "Makeup", slug: "makeup" },
      { name: "Skincare", slug: "skincare" },
      { name: "Haircare", slug: "haircare" },
      { name: "Fragrances", slug: "fragrances" },
    ],
  },
  {
    name: "Sports & Outdoors",
    slug: "sports-outdoors",
    color: "#4caf50",
    subcategories: [
      { name: "Fitness Equipment", slug: "fitness-equipment" },
      { name: "Outdoor Gear", slug: "outdoor-gear" },
      { name: "Team Sports", slug: "team-sports" },
      { name: "Cycling", slug: "cycling" },
    ],
  },
  {
    name: "Toys & Games",
    slug: "toys-games",
    color: "#f44336",
    subcategories: [
      { name: "Action Figures", slug: "action-figures" },
      { name: "Puzzles", slug: "puzzles" },
      { name: "Board Games", slug: "board-games" },
      { name: "Dolls", slug: "dolls" },
    ],
  },
  {
    name: "Books & Stationery",
    slug: "books-stationery",
    color: "#3f51b5",
    subcategories: [
      { name: "Fiction", slug: "fiction" },
      { name: "Non-Fiction", slug: "non-fiction" },
      { name: "School Supplies", slug: "school-supplies" },
      { name: "Office Supplies", slug: "office-supplies" },
    ],
  },
  {
    name: "Automotive",
    slug: "automotive",
    color: "#607d8b",
    subcategories: [
      { name: "Car Accessories", slug: "car-accessories" },
      { name: "Motorbike Accessories", slug: "motorbike-accessories" },
      { name: "Tools & Equipment", slug: "tools-equipment" },
      { name: "Tires & Wheels", slug: "tires-wheels" },
    ],
  },
  {
    name: "Groceries",
    slug: "groceries",
    color: "#795548",
    subcategories: [
      { name: "Beverages", slug: "beverages" },
      { name: "Snacks", slug: "snacks" },
      { name: "Dairy Products", slug: "dairy-products" },
      { name: "Fresh Produce", slug: "fresh-produce" },
    ],
  },
  {
    name: "Health & Wellness",
    slug: "health-wellness",
    color: "#009688",
    subcategories: [
      { name: "Vitamins", slug: "vitamins" },
      { name: "Medical Supplies", slug: "medical-supplies" },
      { name: "Fitness Nutrition", slug: "fitness-nutrition" },
      { name: "Personal Care", slug: "personal-care" },
    ],
  },
  {
    name: "Pet Supplies",
    slug: "pet-supplies",
    color: "#ff6f00",
    subcategories: [
      { name: "Dog Supplies", slug: "dog-supplies" },
      { name: "Cat Supplies", slug: "cat-supplies" },
      { name: "Aquatic Pets", slug: "aquatic-pets" },
      { name: "Pet Food", slug: "pet-food" },
    ],
  },
  {
    name: "Baby & Kids",
    slug: "baby-kids",
    color: "#f06292",
    subcategories: [
      { name: "Baby Clothing", slug: "baby-clothing" },
      { name: "Strollers", slug: "strollers" },
      { name: "Baby Care", slug: "baby-care" },
      { name: "Toys for Kids", slug: "toys-for-kids" },
    ],
  },
  {
    name: "Jewelry & Watches",
    slug: "jewelry-watches",
    color: "#c2185b",
    subcategories: [
      { name: "Necklaces", slug: "necklaces" },
      { name: "Rings", slug: "rings" },
      { name: "Bracelets", slug: "bracelets" },
      { name: "Wristwatches", slug: "wristwatches" },
    ],
  },
  {
    name: "Music & Instruments",
    slug: "music-instruments",
    color: "#8e24aa",
    subcategories: [
      { name: "Guitars", slug: "guitars" },
      { name: "Pianos & Keyboards", slug: "pianos-keyboards" },
      { name: "Drums & Percussion", slug: "drums-percussion" },
      { name: "DJ Equipment", slug: "dj-equipment" },
    ],
  },
  {
    name: "Art & Crafts",
    slug: "art-crafts",
    color: "#ff7043",
    subcategories: [
      { name: "Painting Supplies", slug: "painting-supplies" },
      { name: "Craft Materials", slug: "craft-materials" },
      { name: "Drawing Tools", slug: "drawing-tools" },
      { name: "Handmade Items", slug: "handmade-items" },
    ],
  },
  {
    name: "Garden & Outdoors",
    slug: "garden-outdoors",
    color: "#388e3c",
    subcategories: [
      { name: "Plants & Seeds", slug: "plants-seeds" },
      { name: "Gardening Tools", slug: "gardening-tools" },
      { name: "Outdoor Furniture", slug: "outdoor-furniture" },
      { name: "Grills & BBQ", slug: "grills-bbq" },
    ],
  },
  {
    name: "Travel & Luggage",
    slug: "travel-luggage",
    color: "#1976d2",
    subcategories: [
      { name: "Suitcases", slug: "suitcases" },
      { name: "Backpacks", slug: "backpacks" },
      { name: "Travel Accessories", slug: "travel-accessories" },
      { name: "Camping Gear", slug: "camping-gear" },
    ],
  },
  {
    name: "Office & Business",
    slug: "office-business",
    color: "#455a64",
    subcategories: [
      { name: "Office Furniture", slug: "office-furniture" },
      { name: "Printers & Scanners", slug: "printers-scanners" },
      { name: "Stationery", slug: "stationery" },
      { name: "Work Essentials", slug: "work-essentials" },
    ],
  },
  {
    name: "Gaming",
    slug: "gaming",
    color: "#d81b60",
    subcategories: [
      { name: "Consoles", slug: "consoles" },
      { name: "PC Gaming", slug: "pc-gaming" },
      { name: "Gaming Accessories", slug: "gaming-accessories" },
      { name: "VR & AR", slug: "vr-ar" },
    ],
  },
  {
    name: "Industrial & Tools",
    slug: "industrial-tools",
    color: "#5d4037",
    subcategories: [
      { name: "Power Tools", slug: "power-tools" },
      { name: "Hand Tools", slug: "hand-tools" },
      { name: "Safety Equipment", slug: "safety-equipment" },
      { name: "Construction Supplies", slug: "construction-supplies" },
    ],
  },
];
const seed = async () => {
  const payload = await getPayload({ config });
  for (const category of categories) {
    const parentCategory = await payload.create({
      collection: "Categories",
      data: {
        name: category.name,
        slug: category.slug,
        color: category.color,
        parent: null,
      },
    });
    for (const subcategory of category.subcategories) {
      await payload.create({
        collection: "Categories",
        data: {
          name: subcategory.name,
          slug: subcategory.slug,
          color: category.color,
          parent: parentCategory.id,
        },
      });
    }
  }
};
try {
  await seed();
  console.log("Seed completed successfully");
  process.exit(0);
} catch (error) {
  console.log("Seed failed:", error);
  process.exit(1);
}
