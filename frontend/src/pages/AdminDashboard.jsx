import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Package, ShoppingCart, IndianRupee, Users, Plus, Pencil, Trash2, LogOut, Search } from "lucide-react";
import { getProducts, getOrders, updateOrderStatus, deleteProduct, deleteOrder, createProduct, updateProduct } from "@/lib/api";
import { toast } from "sonner";

const statusColors = {
    Pending: "bg-gold/20 text-gold-dark",
    Confirmed: "bg-primary/20 text-primary",
    Shipped: "bg-accent/20 text-accent",
    Delivered: "bg-forest/20 text-forest",
};

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [tab, setTab] = useState("overview");
    const [productsList, setProductsList] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        category: "Premium Cashews",
        description: "",
        image: "",
        featured: false,
        variants: [{ weight: "250g", price: 0, stock: 0 }]
    });
    const [orderSearchQuery, setOrderSearchQuery] = useState("");

    useEffect(() => {
        if (sessionStorage.getItem("adminAuth") !== "true") {
            navigate("/admin-login", { replace: true });
            return;
        }

        const fetchData = async () => {
            setLoading(true);
            try {
                const [fetchedProducts, fetchedOrders] = await Promise.all([
                    getProducts(),
                    getOrders()
                ]);
                setProductsList(fetchedProducts);
                setOrders(fetchedOrders);
            } catch (error) {
                toast.error("Failed to load dashboard data");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const totalRevenue = orders.reduce((s, o) => s + (o.totalPrice || 0), 0);

    const handleUpdateOrderStatus = async (id, status) => {
        try {
            await updateOrderStatus(id, status);
            setOrders(orders.map((o) => (o._id === id || o.id === id ? { ...o, status } : o)));
            toast.success("Order status updated");
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    const handleDeleteProduct = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;
        try {
            await deleteProduct(id);
            setProductsList(productsList.filter(p => p._id !== id && p.id !== id));
            toast.success("Product deleted successfully");
        } catch (error) {
            toast.error("Failed to delete product");
        }
    };

    const handleDeleteOrder = async (id) => {
        if (!window.confirm("Are you sure you want to delete this order?")) return;
        try {
            await deleteOrder(id);
            setOrders(orders.filter(o => o._id !== id && o.id !== id));
            toast.success("Order deleted successfully");
        } catch (error) {
            toast.error("Failed to delete order");
        }
    };

    const handleOpenModal = (product = null) => {
        if (product) {
            setIsEditing(true);
            setSelectedProductId(product._id || product.id);
            setFormData({
                name: product.name,
                category: product.category,
                description: product.description,
                image: product.image,
                featured: product.featured || false,
                variants: product.variants || [{ weight: "250g", price: 0, stock: 0 }]
            });
        } else {
            setIsEditing(false);
            setSelectedProductId(null);
            setFormData({
                name: "",
                category: "Premium Cashews",
                description: "",
                image: "",
                featured: false,
                variants: [{ weight: "250g", price: 0, stock: 0 }]
            });
        }
        setIsModalOpen(true);
    };

    const handleAddVariant = () => {
        setFormData({
            ...formData,
            variants: [...formData.variants, { weight: "", price: 0, stock: 0 }]
        });
    };

    const handleRemoveVariant = (index) => {
        const newVariants = [...formData.variants];
        newVariants.splice(index, 1);
        setFormData({ ...formData, variants: newVariants });
    };

    const handleVariantChange = (index, field, value) => {
        const newVariants = [...formData.variants];
        newVariants[index][field] = field === 'price' || field === 'stock' ? Number(value) : value;
        setFormData({ ...formData, variants: newVariants });
    };

    const handleSaveProduct = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await updateProduct(selectedProductId, formData);
                toast.success("Product updated successfully");
            } else {
                await createProduct(formData);
                toast.success("Product created successfully");
            }
            setIsModalOpen(false);
            // Refresh products
            const fetchedProducts = await getProducts();
            setProductsList(fetchedProducts);
        } catch (error) {
            toast.error(isEditing ? "Failed to update product" : "Failed to create product");
        }
    };

    const stats = [
        { icon: Package, label: "Products", value: productsList.length, color: "text-primary" },
        { icon: ShoppingCart, label: "Orders", value: orders.length, color: "text-accent" },
        { icon: IndianRupee, label: "Revenue", value: `₹${totalRevenue.toLocaleString()}`, color: "text-forest" },
        { icon: Users, label: "Customers", value: new Set(orders.map((o) => o.email)).size, color: "text-gold-dark" },
    ];

    const handleLogout = () => {
        sessionStorage.removeItem("adminAuth");
        toast.success("Logged out successfully");
        navigate("/admin-login");
    };

    const filteredOrders = orders.filter(o => 
        o.customerName?.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
        o.productName?.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
        (o._id || o.id)?.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
        o.phone?.includes(orderSearchQuery)
    );

    return (
        <div className="pt-24 pb-20 min-h-screen bg-secondary/50">
            <div className="container">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                        <h1 className="text-3xl font-display font-bold text-foreground mb-2">Admin Dashboard</h1>
                        <p className="text-muted-foreground">Manage your products and orders.</p>
                    </motion.div>
                    <motion.button
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground transition text-sm font-medium"
                    >
                        <LogOut className="h-4 w-4" /> Sign Out
                    </motion.button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {stats.map((s, i) => (
                        <motion.div
                            key={s.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="bg-card border rounded-xl p-5"
                        >
                            <s.icon className={`h-5 w-5 ${s.color} mb-2`} />
                            <p className="text-2xl font-bold text-foreground">{s.value}</p>
                            <p className="text-sm text-muted-foreground">{s.label}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6">
                    {["overview", "products", "orders"].map((t) => (
                        <button
                            key={t}
                            onClick={() => setTab(t)}
                            className={`px-5 py-2 rounded-lg text-sm font-medium capitalize transition ${tab === t ? "bg-primary text-primary-foreground" : "bg-card border text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            {t}
                        </button>
                    ))}
                </div>

                {/* Overview */}
                {tab === "overview" && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-card border rounded-xl p-6">
                            <h3 className="font-display font-semibold text-foreground mb-4">Recent Orders</h3>
                            <div className="space-y-3">
                                {orders.slice(0, 4).map((o) => (
                                    <div key={o._id || o.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                                        <div>
                                            <p className="text-sm font-medium text-foreground">{o.customerName}</p>
                                            <p className="text-xs text-muted-foreground">{o.productName} x{o.quantity}</p>
                                        </div>
                                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColors[o.status]}`}>
                                            {o.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-card border rounded-xl p-6">
                            <h3 className="font-display font-semibold text-foreground mb-4">Top Products</h3>
                            <div className="space-y-3">
                                {productsList.slice(0, 4).map((p) => (
                                    <div key={p._id || p.id} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                                        <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-foreground">{p.name}</p>
                                            <p className="text-xs text-muted-foreground">{p.variants?.length || 0} Weights Available</p>
                                        </div>
                                        <span className="text-sm font-bold text-primary">₹{p.variants?.[0]?.price || 0}+</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Products */}
                {tab === "products" && (
                    <div className="bg-card border rounded-xl overflow-hidden">
                        <div className="p-4 flex items-center justify-between border-b">
                            <h3 className="font-display font-semibold text-foreground">All Products</h3>
                            <button 
                                onClick={() => handleOpenModal()}
                                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition"
                            >
                                <Plus className="h-4 w-4" /> Add Product
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-secondary/50">
                                    <tr>
                                        <th className="text-left p-3 text-muted-foreground font-medium">Product</th>
                                        <th className="text-left p-3 text-muted-foreground font-medium">Category</th>
                                        <th className="text-left p-3 text-muted-foreground font-medium">Price</th>
                                        <th className="text-left p-3 text-muted-foreground font-medium">Stock</th>
                                        <th className="text-right p-3 text-muted-foreground font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {productsList.map((p) => (
                                        <tr key={p._id || p.id} className="hover:bg-secondary/30 transition">
                                            <td className="p-3">
                                                <div className="flex items-center gap-3">
                                                    <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                                                    <span className="font-medium text-foreground">{p.name}</span>
                                                </div>
                                            </td>
                                            <td className="p-3 text-muted-foreground">{p.category}</td>
                                            <td className="p-3 font-medium text-foreground">
                                                {p.variants && p.variants.length > 0 ? (
                                                    `₹${p.variants[0].price} - ₹${p.variants[p.variants.length-1].price}`
                                                ) : "N/A"}
                                            </td>
                                            <td className="p-3 text-muted-foreground">
                                                {p.variants ? p.variants.reduce((acc, v) => acc + (v.stock || 0), 0) : 0} total
                                            </td>
                                            <td className="p-3 text-right">
                                                <button 
                                                    onClick={() => handleOpenModal(p)}
                                                    className="p-1.5 rounded hover:bg-secondary transition text-muted-foreground"
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </button>
                                                <button onClick={() => handleDeleteProduct(p._id || p.id)} className="p-1.5 rounded hover:bg-destructive/10 transition text-destructive ml-1">
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Orders */}
                {tab === "orders" && (
                    <div className="bg-card border rounded-xl overflow-hidden">
                        <div className="p-4 border-b flex flex-col md:flex-row justify-between items-center gap-4">
                            <h3 className="font-display font-semibold text-foreground">All Orders</h3>
                            <div className="relative w-full md:w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <input 
                                    type="text"
                                    placeholder="Search orders..."
                                    value={orderSearchQuery}
                                    onChange={(e) => setOrderSearchQuery(e.target.value)}
                                    className="w-full pl-9 pr-4 py-2 rounded-lg border bg-background text-sm outline-none focus:ring-2 focus:ring-primary/20"
                                />
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-secondary/50">
                                    <tr>
                                        <th className="text-left p-3 text-muted-foreground font-medium">Order ID</th>
                                        <th className="text-left p-3 text-muted-foreground font-medium">Customer</th>
                                        <th className="text-left p-3 text-muted-foreground font-medium">Product</th>
                                        <th className="text-left p-3 text-muted-foreground font-medium">Qty</th>
                                        <th className="text-left p-3 text-muted-foreground font-medium">Total</th>
                                        <th className="text-left p-3 text-muted-foreground font-medium">Status</th>
                                        <th className="text-right p-3 text-muted-foreground font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {filteredOrders.map((o) => (
                                        <tr key={o._id || o.id} className="hover:bg-secondary/30 transition">
                                            <td className="p-3 font-medium text-foreground text-xs">{(o._id || o.id).slice(-6)}</td>
                                            <td className="p-3">
                                                <p className="font-semibold text-foreground">{o.customerName}</p>
                                                <div className="text-xs text-muted-foreground space-y-0.5 mt-1">
                                                    <p>📞 {o.phone}</p>
                                                    <p>✉️ {o.email}</p>
                                                    <p>📍 {o.address}</p>
                                                    {o.notes && (
                                                        <p className="italic text-amber-600 dark:text-amber-400 mt-1">
                                                            Note: "{o.notes}"
                                                        </p>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="p-3 text-muted-foreground">{o.productName} ({o.weight})</td>
                                            <td className="p-3 text-muted-foreground">{o.quantity}</td>
                                            <td className="p-3 font-medium text-foreground">₹{o.totalPrice}</td>
                                            <td className="p-3">
                                                <select
                                                    value={o.status}
                                                    onChange={(e) => handleUpdateOrderStatus(o._id || o.id, e.target.value)}
                                                    className={`text-xs px-2.5 py-1 rounded-full font-medium border-0 outline-none cursor-pointer ${statusColors[o.status]}`}
                                                >
                                                    {["Pending", "Confirmed", "Shipped", "Delivered"].map((s) => (
                                                        <option key={s} value={s}>{s}</option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td className="p-3 text-right">
                                                <button onClick={() => handleDeleteOrder(o._id || o.id)} className="p-1.5 rounded hover:bg-destructive/10 transition text-destructive ml-1">
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Product Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-card border rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                        >
                            <div className="p-6 border-b flex items-center justify-between">
                                <h2 className="text-xl font-display font-bold">{isEditing ? "Edit Product" : "Add New Product"}</h2>
                                <button onClick={() => setIsModalOpen(false)} className="text-muted-foreground hover:text-foreground">✕</button>
                            </div>
                            <form onSubmit={handleSaveProduct} className="p-6 space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium">Product Name</label>
                                        <input 
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                            className="w-full px-3 py-2 rounded-lg border bg-background text-sm outline-none focus:ring-2 focus:ring-primary/20"
                                            placeholder="e.g. Jumbo King Cashews"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium">Category</label>
                                        <input 
                                            required
                                            value={formData.category}
                                            onChange={(e) => setFormData({...formData, category: e.target.value})}
                                            className="w-full px-3 py-2 rounded-lg border bg-background text-sm outline-none focus:ring-2 focus:ring-primary/20"
                                            placeholder="e.g. Salted"
                                        />
                                    </div>
                                    <div className="md:col-span-2 space-y-1.5">
                                        <label className="text-sm font-medium">Image URL</label>
                                        <input 
                                            required
                                            value={formData.image}
                                            onChange={(e) => setFormData({...formData, image: e.target.value})}
                                            className="w-full px-3 py-2 rounded-lg border bg-background text-sm outline-none focus:ring-2 focus:ring-primary/20"
                                            placeholder="https://images.unsplash.com/..."
                                        />
                                    </div>
                                    <div className="md:col-span-2 space-y-1.5">
                                        <label className="text-sm font-medium">Description</label>
                                        <textarea 
                                            required
                                            value={formData.description}
                                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                                            className="w-full px-3 py-2 rounded-lg border bg-background text-sm outline-none focus:ring-2 focus:ring-primary/20 min-h-[100px]"
                                            placeholder="Detailed description of the product..."
                                        />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input 
                                            type="checkbox"
                                            id="featured"
                                            checked={formData.featured}
                                            onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                        />
                                        <label htmlFor="featured" className="text-sm font-medium cursor-pointer">Featured Product</label>
                                    </div>
                                </div>

                                <div className="pt-4 border-t">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Variants (Weights & Pricing)</h3>
                                        <button 
                                            type="button" 
                                            onClick={handleAddVariant}
                                            className="text-xs font-medium text-primary hover:underline flex items-center gap-1"
                                        >
                                            <Plus className="h-3 w-3" /> Add Variant
                                        </button>
                                    </div>
                                    <div className="space-y-3">
                                        {formData.variants.map((v, idx) => (
                                            <div key={idx} className="grid grid-cols-12 gap-3 items-end bg-secondary/30 p-3 rounded-lg">
                                                <div className="col-span-4 space-y-1">
                                                    <label className="text-[10px] uppercase font-bold text-muted-foreground">Weight</label>
                                                    <input 
                                                        required
                                                        value={v.weight}
                                                        onChange={(e) => handleVariantChange(idx, 'weight', e.target.value)}
                                                        className="w-full px-2 py-1.5 rounded border bg-background text-sm"
                                                        placeholder="250g"
                                                    />
                                                </div>
                                                <div className="col-span-3 space-y-1">
                                                    <label className="text-[10px] uppercase font-bold text-muted-foreground">Price (₹)</label>
                                                    <input 
                                                        required
                                                        type="number"
                                                        value={v.price}
                                                        onChange={(e) => handleVariantChange(idx, 'price', e.target.value)}
                                                        className="w-full px-2 py-1.5 rounded border bg-background text-sm"
                                                    />
                                                </div>
                                                <div className="col-span-3 space-y-1">
                                                    <label className="text-[10px] uppercase font-bold text-muted-foreground">Stock</label>
                                                    <input 
                                                        required
                                                        type="number"
                                                        value={v.stock}
                                                        onChange={(e) => handleVariantChange(idx, 'stock', e.target.value)}
                                                        className="w-full px-2 py-1.5 rounded border bg-background text-sm"
                                                    />
                                                </div>
                                                <div className="col-span-2 pb-1">
                                                    <button 
                                                        type="button"
                                                        disabled={formData.variants.length === 1}
                                                        onClick={() => handleRemoveVariant(idx)}
                                                        className="p-1.5 text-destructive hover:bg-destructive/10 rounded transition disabled:opacity-30"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-6 flex justify-end gap-3">
                                    <button 
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-6 py-2 rounded-lg border hover:bg-secondary transition font-medium"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit"
                                        className="px-10 py-2 rounded-lg bg-primary text-primary-foreground font-bold hover:opacity-90 transition shadow-lg"
                                    >
                                        {isEditing ? "Update Product" : "Save Product"}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
