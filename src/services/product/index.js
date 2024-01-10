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

export const updateProduct = async (formData) => {
    try {
        const response = await fetch("http://localhost:3000/api/admin/updateProducts", {
            Method: "PUT",
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${Cookies.get("token")}`,
            },
            body: JSON.stringify(formData),
        })

        const data = await response.json()

        return data

    } catch (error) {
        console.error(error, 'error in getting products in the services/product/index(updateProduct)');
    }
}
