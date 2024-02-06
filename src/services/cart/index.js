import Cookies from "js-cookie";


export const addToCart = async (formData) => {
    try {
        const res = await fetch('/api/cart/addToCart', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${Cookies.get('token')}`,
            },
            body: JSON.stringify(formData)
        });

        const data = await res.json();

        return data;

    } catch (error) {
        console.error(error);
    }
};

export const getAllCartItems = async (id) => {
    try {
        const res = await fetch(`/api/cart/allCartItems?id=${id}`, {
            // const res = await fetch(`/api/cart/allCartItems?=${id}`, {
            // const res = await fetch(`http://localhost:3000/api/cart/allCartItems?=${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
            },
        });

        const data = await res.json();

        return data;
    } catch (e) {
        console.error(e, 'I feel the heart beat to the beat of the drum in getAllCartItems');
    }
};

export const deleteFromCart = async (id) => {
    try {
        const res = await fetch(`/api/cart/deleteFromCart?=${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${Cookies.get('token')}`,
            },
            body: JSON.stringify(formadata)
        });

        const data = await res.json();

        return data;

    } catch (error) {
        console.error(error);
    }
};