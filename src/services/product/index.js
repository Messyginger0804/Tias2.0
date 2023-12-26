




/// add new product service

export const addNewProduct = async (formData) => {
    try {
        const response = await fetch('/api/admin/addProduct'{
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${Cookies.get('token')}`
            },
            body: JSON.stringify(formData)
        }),

        const data = await response.json();

        console.log(data)
        return data
    } catch (error) {
        console.error(error, 'error in adding new product in the services/product/index');
    }
}