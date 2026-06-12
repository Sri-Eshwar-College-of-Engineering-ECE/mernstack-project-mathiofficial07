import productRoasted from "@/assets/product-roasted.jpg";
import productRaw from "@/assets/product-raw.jpg";
import productHoney from "@/assets/product-honey.jpg";
import productMasala from "@/assets/product-masala.jpg";
import productSalted from "@/assets/product-salted.jpg";
import productChocolate from "@/assets/product-chocolate.jpg";

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  stock: number;
  featured?: boolean;
}

export const products: Product[] = [
  {
    id: "1-250",
    name: "Premium Roasted Cashews (250g)",
    price: 180,
    description: "Golden roasted whole cashews with a rich, buttery flavor. Perfectly crunchy and lightly seasoned.",
    image: productRoasted,
    category: "Roasted",
    stock: 150,
    featured: true,
  },
  {
    id: "1-500",
    name: "Premium Roasted Cashews (500g)",
    price: 350,
    description: "Golden roasted whole cashews with a rich, buttery flavor. Perfectly crunchy and lightly seasoned.",
    image: productRoasted,
    category: "Roasted",
    stock: 100,
    featured: true,
  },
  {
    id: "1-1000",
    name: "Premium Roasted Cashews (1kg)",
    price: 680,
    description: "Golden roasted whole cashews with a rich, buttery flavor. Perfectly crunchy and lightly seasoned.",
    image: productRoasted,
    category: "Roasted",
    stock: 80,
    featured: true,
  },
  {
    id: "2-250",
    name: "Natural Raw Cashews (250g)",
    price: 160,
    description: "Pure, unprocessed cashew nuts straight from the farm. Ideal for cooking and healthy snacking.",
    image: productRaw,
    category: "Raw",
    stock: 200,
    featured: true,
  },
  {
    id: "2-500",
    name: "Natural Raw Cashews (500g)",
    price: 310,
    description: "Pure, unprocessed cashew nuts straight from the farm. Ideal for cooking and healthy snacking.",
    image: productRaw,
    category: "Raw",
    stock: 150,
    featured: true,
  },
  {
    id: "2-1000",
    name: "Natural Raw Cashews (1kg)",
    price: 600,
    description: "Pure, unprocessed cashew nuts straight from the farm. Ideal for cooking and healthy snacking.",
    image: productRaw,
    category: "Raw",
    stock: 100,
    featured: true,
  },
  {
    id: "3-250",
    name: "Honey Glazed Cashews (250g)",
    price: 200,
    description: "Sweet honey-coated cashews with a delightful crunch. A perfect blend of natural sweetness.",
    image: productHoney,
    category: "Flavored",
    stock: 100,
    featured: true,
  },
  {
    id: "3-500",
    name: "Honey Glazed Cashews (500g)",
    price: 390,
    description: "Sweet honey-coated cashews with a delightful crunch. A perfect blend of natural sweetness.",
    image: productHoney,
    category: "Flavored",
    stock: 80,
    featured: true,
  },
  {
    id: "3-1000",
    name: "Honey Glazed Cashews (1kg)",
    price: 760,
    description: "Sweet honey-coated cashews with a delightful crunch. A perfect blend of natural sweetness.",
    image: productHoney,
    category: "Flavored",
    stock: 60,
    featured: true,
  },
  {
    id: "4-250",
    name: "Spicy Masala Cashews (250g)",
    price: 175,
    description: "Bold and zesty cashews seasoned with traditional Indian spices. A fiery snack experience.",
    image: productMasala,
    category: "Flavored",
    stock: 120,
  },
  {
    id: "4-500",
    name: "Spicy Masala Cashews (500g)",
    price: 340,
    description: "Bold and zesty cashews seasoned with traditional Indian spices. A fiery snack experience.",
    image: productMasala,
    category: "Flavored",
    stock: 90,
  },
  {
    id: "4-1000",
    name: "Spicy Masala Cashews (1kg)",
    price: 660,
    description: "Bold and zesty cashews seasoned with traditional Indian spices. A fiery snack experience.",
    image: productMasala,
    category: "Flavored",
    stock: 70,
  },
  {
    id: "5-250",
    name: "Classic Salted Cashews (250g)",
    price: 165,
    description: "Lightly salted premium cashews in a convenient resealable pouch. Perfect for any occasion.",
    image: productSalted,
    category: "Salted",
    stock: 180,
  },
  {
    id: "5-500",
    name: "Classic Salted Cashews (500g)",
    price: 320,
    description: "Lightly salted premium cashews in a convenient resealable pouch. Perfect for any occasion.",
    image: productSalted,
    category: "Salted",
    stock: 140,
  },
  {
    id: "5-1000",
    name: "Classic Salted Cashews (1kg)",
    price: 620,
    description: "Lightly salted premium cashews in a convenient resealable pouch. Perfect for any occasion.",
    image: productSalted,
    category: "Salted",
    stock: 100,
  },
  {
    id: "6-250",
    name: "Chocolate Cashews (250g)",
    price: 220,
    description: "Rich dark chocolate-coated cashews. An indulgent treat combining nutty and cocoa flavors.",
    image: productChocolate,
    category: "Premium",
    stock: 80,
    featured: true,
  },
  {
    id: "6-500",
    name: "Chocolate Cashews (500g)",
    price: 430,
    description: "Rich dark chocolate-coated cashews. An indulgent treat combining nutty and cocoa flavors.",
    image: productChocolate,
    category: "Premium",
    stock: 60,
    featured: true,
  },
  {
    id: "6-1000",
    name: "Chocolate Cashews (1kg)",
    price: 840,
    description: "Rich dark chocolate-coated cashews. An indulgent treat combining nutty and cocoa flavors.",
    image: productChocolate,
    category: "Premium",
    stock: 40,
    featured: true,
  },
];
