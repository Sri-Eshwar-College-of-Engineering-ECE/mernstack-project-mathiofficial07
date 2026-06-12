import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";

const slides = [
    {
        image: hero1,
        title: "Premium Cashew Nuts",
        subtitle: "Farm Fresh & Handpicked",
        description: "Experience the rich, buttery taste of our golden roasted cashews — sourced from the finest plantations.",
        cta: "Shop Now",
        link: "/products",
    },
    {
        image: hero2,
        title: "From Farm to Your Table",
        subtitle: "100% Natural & Organic",
        description: "Our cashews are grown in sustainable farms with care, ensuring every nut is packed with nutrition and flavor.",
        cta: "Learn More",
        link: "/about",
    },
    {
        image: hero3,
        title: "Crafted for Perfection",
        subtitle: "Taste the Difference",
        description: "From honey-glazed to spicy masala — discover our premium range of artisan cashew varieties.",
        cta: "Order Now",
        link: "/order",
    },
];

const HeroSlider = () => {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(1);

    const goTo = useCallback((index) => {
        setDirection(index > current ? 1 : -1);
        setCurrent(index);
    }, [current]);

    const next = useCallback(() => {
        setDirection(1);
        setCurrent((p) => (p + 1) % slides.length);
    }, []);

    const prev = useCallback(() => {
        setDirection(-1);
        setCurrent((p) => (p - 1 + slides.length) % slides.length);
    }, []);

    useEffect(() => {
        const timer = setInterval(next, 6000);
        return () => clearInterval(timer);
    }, [next]);

    const slide = slides[current];

    const imageVariants = {
        enter: (d) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
        center: { x: 0, opacity: 1 },
        exit: (d) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0 }),
    };

    return (
        <section className="relative h-screen w-full overflow-hidden">
            {/* Background images */}
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                    key={current}
                    custom={direction}
                    variants={imageVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="absolute inset-0"
                >
                    <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover"
                    />
                </motion.div>
            </AnimatePresence>

            {/* Overlay */}
            <div className="absolute inset-0 hero-overlay" />

            {/* Content */}
            <div className="relative z-10 h-full container flex items-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={current}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="max-w-2xl"
                    >
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-primary/20 text-primary border border-primary/30 mb-6"
                        >
                            {slide.subtitle}
                        </motion.span>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="text-5xl md:text-7xl font-display font-bold text-primary-foreground mb-6 leading-tight"
                        >
                            {slide.title}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="text-lg text-primary-foreground/80 mb-8 max-w-lg leading-relaxed"
                        >
                            {slide.description}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                        >
                            <Link
                                to={slide.link}
                                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg gold-gradient text-primary-foreground font-semibold text-lg hover:opacity-90 transition shadow-lg"
                            >
                                {slide.cta}
                                <ChevronRight className="h-5 w-5" />
                            </Link>
                        </motion.div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation arrows */}
            <button
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-primary-foreground/10 backdrop-blur-sm text-primary-foreground hover:bg-primary-foreground/20 transition"
            >
                <ChevronLeft className="h-6 w-6" />
            </button>
            <button
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-primary-foreground/10 backdrop-blur-sm text-primary-foreground hover:bg-primary-foreground/20 transition"
            >
                <ChevronRight className="h-6 w-6" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => goTo(i)}
                        className={`h-2.5 rounded-full transition-all duration-500 ${i === current ? "w-10 bg-primary" : "w-2.5 bg-primary-foreground/40"
                            }`}
                    />
                ))}
            </div>
        </section>
    );
};

export default HeroSlider;
