import productRoasted from "@/assets/product-roasted.jpg";
import productRaw from "@/assets/product-raw.jpg";
import productHoney from "@/assets/product-honey.jpg";
import productMasala from "@/assets/product-masala.jpg";
import productSalted from "@/assets/product-salted.jpg";
import productChocolate from "@/assets/product-chocolate.jpg";

export const products = [
    {
        id: "1",
        name: "Premium Roasted Cashews",
        description: "Golden roasted whole cashews with a rich, buttery flavor. Perfectly crunchy and lightly seasoned.",
        image: productRoasted,
        category: "Roasted",
        featured: true,
        variants: [
            { id: "1-250", weight: "250g", price: 180, stock: 150 },
            { id: "1-500", weight: "500g", price: 350, stock: 100 },
            { id: "1-1000", weight: "1kg", price: 680, stock: 80 },
        ]
    },
    {
        id: "2",
        name: "Natural Raw Cashews",
        description: "Pure, unprocessed cashew nuts straight from the farm. Ideal for cooking and healthy snacking.",
        image: productRaw,
        category: "Raw",
        featured: true,
        variants: [
            { id: "2-250", weight: "250g", price: 160, stock: 200 },
            { id: "2-500", weight: "500g", price: 310, stock: 150 },
            { id: "2-1000", weight: "1kg", price: 600, stock: 100 },
        ]
    },
    {
        id: "3",
        name: "Honey Glazed Cashews",
        description: "Sweet honey-coated cashews with a delightful crunch. A perfect blend of natural sweetness.",
        image: productHoney,
        category: "Flavored",
        featured: true,
        variants: [
            { id: "3-250", weight: "250g", price: 200, stock: 100 },
            { id: "3-500", weight: "500g", price: 390, stock: 80 },
            { id: "3-1000", weight: "1kg", price: 760, stock: 60 },
        ]
    },
    {
        id: "4",
        name: "Spicy Masala Cashews",
        description: "Bold and zesty cashews seasoned with traditional Indian spices. A fiery snack experience.",
        image: productMasala,
        category: "Flavored",
        variants: [
            { id: "4-250", weight: "250g", price: 175, stock: 120 },
            { id: "4-500", weight: "500g", price: 340, stock: 90 },
            { id: "4-1000", weight: "1kg", price: 660, stock: 70 },
        ]
    },
    {
        id: "5",
        name: "Classic Salted Cashews",
        description: "Lightly salted premium cashews in a convenient resealable pouch. Perfect for any occasion.",
        image: productSalted,
        category: "Salted",
        variants: [
            { id: "5-250", weight: "250g", price: 165, stock: 180 },
            { id: "5-500", weight: "500g", price: 320, stock: 140 },
            { id: "5-1000", weight: "1kg", price: 620, stock: 100 },
        ]
    },
    {
        id: "6",
        name: "Chocolate Cashews",
        description: "Rich dark chocolate-coated cashews. An indulgent treat combining nutty and cocoa flavors.",
        image: productChocolate,
        category: "Premium",
        featured: true,
        variants: [
            { id: "6-250", weight: "250g", price: 220, stock: 80 },
            { id: "6-500", weight: "500g", price: 430, stock: 60 },
            { id: "6-1000", weight: "1kg", price: 840, stock: 40 },
        ]
    },
];
