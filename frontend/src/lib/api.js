const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000/api";

// ---- PRODUCTS API ---- //
export const getProducts = async () => {
    try {
        const response = await fetch(`${API_URL}/products`);
        if (!response.ok) throw new Error("Failed to fetch products");
        return await response.json();
    } catch (error) {
        console.error("API Error getProducts:", error);
        return [];
    }
};

export const createProduct = async (productData) => {
    try {
        const response = await fetch(`${API_URL}/products`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(productData),
        });
        if (!response.ok) throw new Error("Failed to create product");
        return await response.json();
    } catch (error) {
        console.error("API Error createProduct:", error);
        throw error;
    }
};

export const updateProduct = async (id, productData) => {
    try {
        const response = await fetch(`${API_URL}/products/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(productData),
        });
        if (!response.ok) throw new Error("Failed to update product");
        return await response.json();
    } catch (error) {
        console.error("API Error updateProduct:", error);
        throw error;
    }
};

export const deleteProduct = async (id) => {
    try {
        const response = await fetch(`${API_URL}/products/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) throw new Error("Failed to delete product");
        return await response.json();
    } catch (error) {
        console.error("API Error deleteProduct:", error);
        throw error;
    }
};

// ---- ORDERS API ---- //
export const getOrders = async () => {
    try {
        const response = await fetch(`${API_URL}/orders`);
        if (!response.ok) throw new Error("Failed to fetch orders");
        return await response.json();
    } catch (error) {
        console.error("API Error getOrders:", error);
        return [];
    }
};

export const createOrder = async (orderData) => {
    try {
        const response = await fetch(`${API_URL}/orders`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderData),
        });
        if (!response.ok) throw new Error("Failed to create order");
        return await response.json();
    } catch (error) {
        console.error("API Error createOrder:", error);
        throw error;
    }
};

export const getOrderById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/orders/${id}`);
        if (!response.ok) throw new Error("Failed to fetch order");
        return await response.json();
    } catch (error) {
        console.error("API Error getOrderById:", error);
        throw error;
    }
};

export const updateOrderStatus = async (id, status) => {
    try {
        const response = await fetch(`${API_URL}/orders/${id}/status`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status }),
        });
        if (!response.ok) throw new Error("Failed to update order status");
        return await response.json();
    } catch (error) {
        console.error("API Error updateOrderStatus:", error);
        throw error;
    }
};

export const deleteOrder = async (id) => {
    try {
        const response = await fetch(`${API_URL}/orders/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) throw new Error("Failed to delete order");
        return await response.json();
    } catch (error) {
        console.error("API Error deleteOrder:", error);
        throw error;
    }
};
