import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { getProducts, createOrder } from "@/lib/api";

const OrderPage = () => {
    const [params] = useSearchParams();
    const productIdParam = params.get("product") || "";
    const variantIdParam = params.get("variant") || "";

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        productId: productIdParam,
        variantId: variantIdParam,
        quantity: 1,
        notes: "",
    });
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (error) {
                toast.error("Failed to load products");
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const selectedProduct = products.find((p) => p._id === form.productId || p.id === form.productId);
    const selectedVariant = selectedProduct?.variants.find((v) => (v._id || v.id) === form.variantId) || selectedProduct?.variants[0];

    // Sync URL search params to form state (handling cases where params load after initial render)
    useEffect(() => {
        if (productIdParam) {
            setForm((prev) => ({
                ...prev,
                productId: productIdParam,
                variantId: variantIdParam || prev.variantId,
            }));
        }
    }, [productIdParam, variantIdParam]);

    // Ensure variantId is set if productId is pre-selected but variantId isn't
    useEffect(() => {
        if (selectedProduct && !form.variantId) {
            setForm((prev) => ({ ...prev, variantId: selectedProduct.variants[0]._id || selectedProduct.variants[0].id }));
        }
    }, [selectedProduct, form.variantId]);

    const total = selectedVariant ? selectedVariant.price * form.quantity : 0;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.productId || !form.variantId) {
            toast.error("Please select a product and weight");
            return;
        }

        const orderDetails = {
            ...form,
            customerName: form.name,
            productName: selectedProduct.name,
            weight: selectedVariant.weight,
            price: selectedVariant.price,
            totalPrice: total,
            orderDate: new Date().toISOString()
        };
        delete orderDetails.name;

        try {
            await createOrder(orderDetails);
            setSubmitted(true);
            toast.success("Order placed successfully!");
        } catch (error) {
            toast.error("Failed to place order. Please try again later.");
        }
    };

    if (submitted) {
        return (
            <div className="pt-24 pb-20 min-h-screen flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center p-10 bg-card rounded-2xl border max-w-md"
                >
                    <CheckCircle className="h-16 w-16 text-forest mx-auto mb-4" />
                    <h2 className="text-2xl font-display font-bold text-foreground">Order Confirmed!</h2>
                    <p className="text-muted-foreground mt-2">
                        Thank you, {form.name}! Your order for {selectedProduct?.name} ({selectedVariant?.weight}) (x{form.quantity}) has been placed. We'll send a confirmation to {form.email}.
                    </p>
                    <p className="text-lg font-bold text-primary mt-4">Total: ₹{total}</p>
                    <button
                        onClick={() => { 
                            setSubmitted(false); 
                            setForm({ name: "", email: "", phone: "", address: "", productId: "", variantId: "", quantity: 1, notes: "" }); 
                        }}
                        className="mt-6 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition"
                    >
                        Place Another Order
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="pt-24 pb-20">
            <div className="container max-w-2xl">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
                    <h1 className="text-4xl font-display font-bold text-foreground">
                        Place Your <span className="gold-text">Order</span>
                    </h1>
                    <p className="text-muted-foreground mt-2">Fill in your details and we'll deliver fresh cashews to you.</p>
                </motion.div>

                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    onSubmit={handleSubmit}
                    className="bg-card rounded-2xl border p-8 space-y-5"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="md:col-span-2">
                           <h3 className="text-lg font-display font-semibold text-foreground mb-2">Customer Details</h3>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-foreground">Full Name *</label>
                            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1 w-full px-4 py-3 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary/30 outline-none transition" />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-foreground">Email *</label>
                            <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1 w-full px-4 py-3 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary/30 outline-none transition" />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-foreground">Phone *</label>
                            <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-1 w-full px-4 py-3 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary/30 outline-none transition" />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-foreground">Delivery Address *</label>
                            <input required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="mt-1 w-full px-4 py-3 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary/30 outline-none transition" />
                        </div>
                    </div>

                    <div className="pt-4 border-t">
                        <h3 className="text-lg font-display font-semibold text-foreground mb-4">Product Selection</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="text-sm font-medium text-foreground">Cashew Type *</label>
                                <select 
                                    required 
                                    value={form.productId} 
                                    onChange={(e) => {
                                        const prod = products.find(p => (p._id || p.id) === e.target.value);
                                        setForm({ 
                                            ...form, 
                                            productId: e.target.value, 
                                            variantId: prod ? (prod.variants[0]._id || prod.variants[0].id) : "" 
                                        });
                                    }} 
                                    className="mt-1 w-full px-4 py-3 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary/30 outline-none transition"
                                >
                                    <option value="">Select a product</option>
                                    {products.map((p) => (
                                        <option key={p._id || p.id} value={p._id || p.id}>
                                            {p.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-foreground">Weight *</label>
                                <select 
                                    required 
                                    value={form.variantId} 
                                    disabled={!form.productId}
                                    onChange={(e) => setForm({ ...form, variantId: e.target.value })} 
                                    className="mt-1 w-full px-4 py-3 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary/30 outline-none transition disabled:opacity-50"
                                >
                                    <option value="">Select weight</option>
                                    {selectedProduct?.variants.map((v) => (
                                        <option key={v._id || v.id} value={v._id || v.id}>
                                            {v.weight} — ₹{v.price}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-foreground">Quantity *</label>
                                <input required type="number" min={1} max={100} value={form.quantity} onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })} className="mt-1 w-full px-4 py-3 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary/30 outline-none transition" />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-foreground">Additional Notes</label>
                                <input value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="mt-1 w-full px-4 py-3 rounded-lg border bg-background text-foreground focus:ring-2 focus:ring-primary/30 outline-none transition" placeholder="Gift wrapping, etc." />
                            </div>
                        </div>
                    </div>

                    {selectedVariant && (
                        <div className="p-4 rounded-lg bg-secondary flex items-center justify-between">
                            <span className="text-sm text-secondary-foreground">Order Total ({selectedVariant.weight})</span>
                            <span className="text-2xl font-bold text-primary">₹{total}</span>
                        </div>
                    )}

                    <button type="submit" className="w-full py-4 rounded-lg gold-gradient text-primary-foreground font-semibold text-lg hover:opacity-90 transition shadow-lg">
                        Place Order
                    </button>
                </motion.form>
            </div>
        </div>
    );
};

export default OrderPage;
