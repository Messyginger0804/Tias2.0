export const registerNewUser = async (formData) => {
    try {
        const response = await fetch("/api/register", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        // console.log(response)

        // const finalData = await response.json();
        const finalData = await response.json();

        // const finalData = response

        return finalData;
    } catch (e) {
        console.log("error", e);
    }
};