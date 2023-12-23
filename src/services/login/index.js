


export const login = async (formData) => {

    // just  copy over from register just alittle different
    try {
        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(formData),

        });
        console.log(formData)

        // console.log(respformData)

        const data = await response.json();

        return data;
    } catch (error) {
        console.log(error);
    }
};