import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/api";

const Products = () => {
    const [active, setActive] = useState("All");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (error) {
                console.error("Error loading products");
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];
    const filtered = active === "All" ? products : products.filter((p) => p.category === active);

    if (loading) {
        return <div className="pt-24 pb-20 text-center">Loading products...</div>;
    }

    return (
        <div className="pt-24 pb-20">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground">
                        Our <span className="gold-text">Products</span>
                    </h1>
                    <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
                        Explore our complete range of premium cashew nut varieties.
                    </p>
                </motion.div>

                {/* Filters */}
                <div className="flex flex-wrap justify-center gap-3 mb-10">
                    {categories.map((c) => (
                        <button
                            key={c}
                            onClick={() => setActive(c)}
                            className={`px-5 py-2 rounded-full text-sm font-medium transition ${active === c
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-secondary text-secondary-foreground hover:bg-primary/10"
                                }`}
                        >
                            {c}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filtered.map((p, i) => (
                        <ProductCard key={p._id || Math.random()} product={p} index={i} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Products;
