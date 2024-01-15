import Cookies from "js-cookie";

/// add new product service 

export const addNewProduct = async (formData) => {
    try {
        const response = await fetch("/api/admin/addProduct", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${Cookies.get("token")}`,
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        console.log(data)
        return data
    } catch (error) {
        console.error(error, 'error in adding new product in the services/product/index(addNewProduct)');
    }
}

export const getAllAdminProducts = async () => {
    try {
        // const response = await fetch("/api/admin/allProducts", {
        const response = await fetch("http://localhost:3000/api/admin/allProducts", {
            method: "GET",
            cache: 'reload'
        });

        if (!response.ok) {
            console.error(`Error: ${response.statusText}`);
            return;
        }

        const data = await response.json();

        console.log(data)
        return data
    } catch (error) {
        console.error(error, 'error in getting products in the services/product/index(getAllProducts)');
    }
}

export const updateAProduct = async (formData) => {
    try {
        const res = await fetch("/api/admin/updateProduct", {
            method: "PUT",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${Cookies.get("token")}`,
            },
            cache: "no-store",
            body: JSON.stringify(formData),
        });

        const data = await res.json();

        return data;
    } catch (e) {
        console.error(e, "Error in the services/product/index.js");
    }
};

export const deleteAProduct = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/api/admin/delteProduct?id=${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        });

        const data = await res.json();

        console.log(data, '-----------><<<< This is from the delete product in services');

        return data;

    } catch (error) {
        console.error(error);
    }
}