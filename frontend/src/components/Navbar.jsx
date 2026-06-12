import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingBag, Settings, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Products" },
    { to: "/order", label: "Order" },
    { to: "/about", label: "About" },
];

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const { pathname } = useLocation();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b">
            <div className="container flex items-center justify-between h-16">
                <Link to="/" className="flex items-center gap-2">
                    <ShoppingBag className="h-6 w-6 text-primary" />
                    <span className="font-display text-xl font-bold text-foreground">
                        Cashew<span className="text-primary">Craft</span>
                    </span>
                </Link>

                {/* Desktop */}
                <div className="hidden md:flex items-center gap-8">
                    {links.map((l) => (
                        <Link
                            key={l.to}
                            to={l.to}
                            className={`text-sm font-medium transition-colors hover:text-primary ${pathname === l.to ? "text-primary" : "text-muted-foreground"
                                }`}
                        >
                            {l.label}
                        </Link>
                    ))}
                </div>

                {/* Mobile toggle */}
                <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
                    {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-background border-b overflow-hidden"
                    >
                        <div className="container py-4 flex flex-col gap-3">
                            {links.map((l) => (
                                <Link
                                    key={l.to}
                                    to={l.to}
                                    onClick={() => setOpen(false)}
                                    className={`text-sm font-medium py-2 ${pathname === l.to ? "text-primary" : "text-muted-foreground"
                                        }`}
                                >
                                    {l.label}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
