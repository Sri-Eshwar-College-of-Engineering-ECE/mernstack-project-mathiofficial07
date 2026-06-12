import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Truck, Shield, Leaf, Award } from "lucide-react";
import HeroSlider from "@/components/HeroSlider";
import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/api";

const benefits = [
    { icon: Leaf, title: "100% Natural", desc: "No preservatives or artificial flavors" },
    { icon: Shield, title: "Quality Assured", desc: "Rigorous quality checks at every stage" },
    { icon: Truck, title: "Fast Delivery", desc: "Delivered fresh to your doorstep" },
    { icon: Award, title: "Premium Grade", desc: "Only the finest W240 & W320 cashews" },
];

const Index = () => {
    const [featured, setFeatured] = useState([]);

    useEffect(() => {
        const fetchFeaturedProducts = async () => {
            try {
                const data = await getProducts();
                setFeatured(data.filter((p) => p.featured));
            } catch (error) {
                console.error("Error loading featured products:", error);
            }
        };
        fetchFeaturedProducts();
    }, []);

    return (
        <div>
            <HeroSlider />

            {/* Benefits */}
            <section className="py-20 bg-secondary">
                <div className="container">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {benefits.map((b, i) => (
                            <motion.div
                                key={b.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="text-center p-6"
                            >
                                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-4">
                                    <b.icon className="h-6 w-6" />
                                </div>
                                <h3 className="font-display font-semibold text-foreground">{b.title}</h3>
                                <p className="text-sm text-muted-foreground mt-1">{b.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-20">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl font-display font-bold text-foreground">
                            Our <span className="gold-text">Featured</span> Products
                        </h2>
                        <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
                            Handpicked selections of our finest cashew varieties, crafted for the perfect taste experience.
                        </p>
                    </motion.div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {featured.map((p, i) => (
                            <ProductCard key={p._id || p.id} product={p} index={i} />
                        ))}
                    </div>
                    <div className="text-center mt-10">
                        <Link
                            to="/products"
                            className="inline-flex px-8 py-3 rounded-lg border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition"
                        >
                            View All Products
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 gold-gradient">
                <div className="container text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-display font-bold text-primary-foreground mb-4">
                            Ready to Taste the Best Cashews?
                        </h2>
                        <p className="text-primary-foreground/80 mb-8 max-w-md mx-auto">
                            Order now and get farm-fresh premium cashew nuts delivered straight to your doorstep.
                        </p>
                        <Link
                            to="/products"
                            className="inline-flex px-8 py-4 rounded-lg bg-foreground text-primary-foreground font-semibold text-lg hover:opacity-90 transition"
                        >
                            Place Your Order
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Index;
