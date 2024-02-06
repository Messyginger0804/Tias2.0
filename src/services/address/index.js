import Cookies from "js-cookie";

export const addNewAddress = async (formData) => {
    try {
        const res = await fetch("/api/address/addNewAddress", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Cookies.get("token")}`,
            },
            body: JSON.stringify(formData),
        });

        const data = await res.json();

        return data;
    } catch (e) {
        console.log(e);
    }
};

export const fetchAllAddresses = async (id) => {
    try {
        const res = await fetch(`/api/address/getAllAddress?id=${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
            },
        });

        const data = await res.json();

        return data;
    } catch (e) {
        console.log(e);
    }
};

export const updateAddress = async (formData) => {
    try {
        const res = await fetch("/api/address/updateAddress", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Cookies.get("token")}`,
            },
            body: JSON.stringify(formData),
        });

        const data = await res.json();

        return data;
    } catch (e) {
        console.log(e);
    }
};

export const deleteAddress = async (id) => {
    try {
        const res = await fetch(`/api/address/deleteAddress?id=${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
            },
        });

        const data = await res.json();

        return data;
    } catch (e) {
        console.log(e);
    }
};