import { Link } from "react-router-dom";
import { ShoppingBag, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => (
    <footer className="bg-foreground text-primary-foreground">
        <div className="container py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
                <div className="flex items-center gap-2 mb-4">
                    <ShoppingBag className="h-5 w-5 text-primary" />
                    <span className="font-display text-lg font-bold">CashewCraft</span>
                </div>
                <p className="text-sm opacity-70 leading-relaxed">
                    Premium quality cashew nuts sourced directly from the finest farms. Freshness and taste in every bite.
                </p>
            </div>
            <div>
                <h4 className="font-display font-semibold mb-4">Quick Links</h4>
                <div className="flex flex-col gap-2 text-sm opacity-70">
                    <Link to="/products" className="hover:opacity-100 transition">Products</Link>
                    <Link to="/order" className="hover:opacity-100 transition">Order Now</Link>
                    <Link to="/about" className="hover:opacity-100 transition">About Us</Link>
                </div>
            </div>
            <div>
                <h4 className="font-display font-semibold mb-4">Contact</h4>
                <div className="flex flex-col gap-2 text-sm opacity-70">
                    <div className="flex items-center gap-2"><Mail className="h-4 w-4" /> mathiyazhagan907@gmail.com</div>
                    <div className="flex items-center gap-2"><Phone className="h-4 w-4" /> +91 78128 71582</div>
                    <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Coimbatore, India</div>
                </div>
            </div>
        </div>
        <div className="border-t border-primary-foreground/10">
            <div className="container py-4 text-center text-xs opacity-50">
                © 2026 CashewCraft. All rights reserved.
            </div>
        </div>
    </footer>
);

export default Footer;
