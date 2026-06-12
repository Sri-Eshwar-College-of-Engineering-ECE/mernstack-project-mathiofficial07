import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag, Lock } from "lucide-react";
import { toast } from "sonner";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    // Redirect if already authenticated
    useEffect(() => {
        if (sessionStorage.getItem("adminAuth") === "true") {
            navigate("/admin", { replace: true });
        }
    }, [navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email === "mathiyazhagan907@gmail.com" && password === "123456") {
            sessionStorage.setItem("adminAuth", "true");
            toast.success("Login successful!");

            // Redirect to the page they were trying to access, or default to admin dashboard
            const from = location.state?.from?.pathname || "/admin";
            navigate(from, { replace: true });
        } else {
            toast.error("Invalid credentials");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-secondary/50 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-card border rounded-2xl shadow-xl p-8"
            >
                <div className="flex flex-col items-center mb-8">
                    <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                        <ShoppingBag className="h-8 w-8 text-primary" />
                    </div>
                    <h1 className="text-2xl font-display font-bold text-foreground">Admin Portal</h1>
                    <p className="text-muted-foreground mt-1">Please sign in to continue</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Email Address</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@example.com"
                            className="w-full px-4 py-3 rounded-xl border bg-background text-foreground focus:ring-2 focus:ring-primary/20 outline-none transition"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Password</label>
                        <div className="relative">
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full px-4 py-3 rounded-xl border bg-background text-foreground focus:ring-2 focus:ring-primary/20 outline-none transition"
                            />
                            <Lock className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/50" />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 rounded-xl gold-gradient text-primary-foreground font-semibold text-lg hover:opacity-90 transition shadow-lg"
                    >
                        Sign In
                    </button>
                </form>

                <p className="mt-8 text-center text-xs text-muted-foreground">
                    Secure Area. Unauthorized access is prohibited.
                </p>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
