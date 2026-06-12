import { motion } from "framer-motion";
import { Heart, Globe, Users, TreePine } from "lucide-react";
import hero2 from "@/assets/hero-2.jpg";

const values = [
    { icon: Heart, title: "Passion for Quality", desc: "Every cashew is hand-selected to ensure the highest grade and freshest taste." },
    { icon: Globe, title: "Sustainably Sourced", desc: "We partner with eco-conscious farms that practice sustainable agriculture." },
    { icon: Users, title: "Community First", desc: "Supporting local farming communities with fair trade practices." },
    { icon: TreePine, title: "Farm to Table", desc: "Minimal processing to preserve natural nutrients and authentic flavor." },
];

const About = () => (
    <div className="pt-24 pb-20">
        <div className="container">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground">
                    About <span className="gold-text">CashewCraft</span>
                </h1>
                <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
                    We are passionate about bringing you the finest cashew nuts, directly sourced from premium plantations across India.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
                <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                    <img src={hero2} alt="Cashew plantation" className="rounded-2xl shadow-xl w-full" />
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                    <h2 className="text-3xl font-display font-bold text-foreground mb-4">Our Story</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                        Founded in the heart of Goa, CashewCraft started with a simple mission — to deliver the purest, most flavorful cashew nuts to homes across India. Our journey began with local farms and a deep respect for traditional harvesting methods.
                    </p>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                        Today, we work with over 50 farming families, ensuring every batch meets our stringent quality standards. From the moment the cashew apple is harvested to the final packaging, we oversee every step of the process.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                        Our W240 and W320 grade cashews are known for their superior size, creamy texture, and rich taste — making CashewCraft a trusted name among cashew lovers nationwide.
                    </p>
                </motion.div>
            </div>

            {/* Values */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {values.map((v, i) => (
                    <motion.div
                        key={v.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-card border rounded-xl p-6 text-center"
                    >
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                            <v.icon className="h-5 w-5" />
                        </div>
                        <h3 className="font-display font-semibold text-foreground">{v.title}</h3>
                        <p className="text-sm text-muted-foreground mt-2">{v.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    </div>
);

export default About;
