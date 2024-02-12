import Cookies from "js-cookie";

export const createNewOrder = async (formData) => {
    try {
        const res = await fetch("/api/order/createOrder", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Cookies.get("token")}`,
            },
            body: JSON.stringify(formData),
        });
        console.log('look right here you fucking dumbass this is the data. Please figure this out i am tired of dealing with this error', res);
        const data = await res.json();
        console.log('look right here you fucking dumbass this is the data. Please figure this out i am tired of dealing with this error', data);

        return data;
    } catch (error) {
        console.error(error);
    }
};

export const getAllOrdersForUser = async (id) => {
    try {
        const res = await fetch(`/api/order/getAllOrders?id=${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
            },
        });

        const data = await res.json();

        return data;
    } catch (error) {
        console.error(error);
    }
};

export const getOrderDetails = async (id) => {
    try {
        const res = await fetch(`/api/order/orderDetails?id=${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
            },
        });

        const data = await res.json();

        return data;
    } catch (error) {
        console.error(error);
    }
};

export const getAllOrdersForAllUsers = async () => {
    try {
        const res = await fetch(`/api/admin/orders/getAllOrders`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
            },
        });

        const data = await res.json();

        return data;
    } catch (error) {
        console.error(error);
    }
};

export const updateStatusOfOrder = async (formData) => {
    try {
        const res = await fetch(`/api/admin/orders/updateOrder`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Cookies.get("token")}`,
            },
            body: JSON.stringify(formData),
        });

        const data = await res.json();

        return data;
    } catch (error) {
        console.error(error);
    }
};