import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ProductCard = ({ product, index = 0 }) => {
    const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group bg-card rounded-xl overflow-hidden border product-card-hover"
        >
            <div className="relative overflow-hidden aspect-square">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {product.featured && (
                    <span className="absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full gold-gradient text-primary-foreground">
                        Featured
                    </span>
                )}
            </div>
            <div className="p-5">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {product.category}
                </span>
                <h3 className="font-display font-semibold text-lg mt-1 text-card-foreground">
                    {product.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                    {product.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                    {product.variants.map((v) => (
                        <button
                            key={v._id || v.id}
                            onClick={() => setSelectedVariant(v)}
                            className={`px-3 py-1 text-xs rounded-full border transition-all ${(selectedVariant._id || selectedVariant.id) === (v._id || v.id)
                                    ? "bg-primary text-primary-foreground border-primary"
                                    : "bg-secondary text-secondary-foreground border-transparent hover:border-primary/30"
                                }`}
                        >
                            {v.weight}
                        </button>
                    ))}
                </div>

                <div className="flex items-center justify-between mt-4">
                    <span className="text-xl font-bold text-primary">₹{selectedVariant.price}</span>
                    <Link
                        to={`/order?product=${product._id || product.id}&variant=${selectedVariant._id || selectedVariant.id}`}
                        className="px-4 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition"
                    >
                        Order Now
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
