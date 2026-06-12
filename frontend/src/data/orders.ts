export interface Order {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  productId: string;
  productName: string;
  quantity: number;
  totalPrice: number;
  notes: string;
  status: "Pending" | "Confirmed" | "Shipped" | "Delivered";
  createdAt: string;
}

// Demo orders for admin dashboard
export const demoOrders: Order[] = [
  {
    id: "ORD-001",
    customerName: "Rahul Sharma",
    email: "rahul@example.com",
    phone: "+91 78128 71582",
    address: "42 MG Road, Bangalore, Karnataka 560001",
    productId: "1-500",
    productName: "Premium Roasted Cashews (500g)",
    quantity: 2,
    totalPrice: 700,
    notes: "Gift wrapping please",
    status: "Delivered",
    createdAt: "2026-03-08",
  },
  {
    id: "ORD-002",
    customerName: "Priya Patel",
    email: "priya@example.com",
    phone: "+91 78128 71582",
    address: "15 Marine Drive, Mumbai, Maharashtra 400020",
    productId: "3-250",
    productName: "Honey Glazed Cashews (250g)",
    quantity: 3,
    totalPrice: 600,
    notes: "",
    status: "Shipped",
    createdAt: "2026-03-09",
  },
  {
    id: "ORD-003",
    customerName: "Amit Kumar",
    email: "amit@example.com",
    phone: "+91 78128 71582",
    address: "8 Connaught Place, New Delhi 110001",
    productId: "6-1000",
    productName: "Chocolate Cashews (1kg)",
    quantity: 2,
    totalPrice: 1680,
    notes: "Corporate order",
    status: "Confirmed",
    createdAt: "2026-03-10",
  },
  {
    id: "ORD-004",
    customerName: "Sneha Reddy",
    email: "sneha@example.com",
    phone: "+91 78128 71582",
    address: "22 Jubilee Hills, Hyderabad, Telangana 500033",
    productId: "2-250",
    productName: "Natural Raw Cashews (250g)",
    quantity: 2,
    totalPrice: 320,
    notes: "",
    status: "Pending",
    createdAt: "2026-03-11",
  },
];
