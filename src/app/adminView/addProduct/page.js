'use client'

import Select from "@/components/FormElements/Select"
import Tile from "@/components/FormElements/Tile"
import { AvailableSizes, adminAddProductformControls, firebaseConfig, firebaseStroageURL } from "@/utils"
import InputComponent from "@/components/FormElements/Input"
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { useContext, useState } from "react"
import { addNewProduct } from "@/services/product"
import { GlobalContext } from "@/context"
import { toast } from "react-toastify"
import Notification from "@/components/notification"
import ComponentLoader from "@/components/loader"

const app = initializeApp(firebaseConfig);
const storage = getStorage(app, firebaseStroageURL)

const createFileName = (getFile) => {
    const timeStamp = Date.now()
    const randomStringValue = Math.random().toString(36).substring(2, 12)

    return `${getFile.name} - ${timeStamp}- ${randomStringValue}`
}

async function helperUploadImage(file) {
    const getFileName = createFileName(file)
    const storageRef = ref(storage, `ecommerce/${getFileName}`)
    const uploadImage = uploadBytesResumable(storageRef, file)

    return new Promise((resolve, reject) => {
        uploadImage.on(
            "state_changed",
            (snapshot) => { },
            (error) => {
                console.log(error);
                reject(error);
            },
            () => {
                getDownloadURL(uploadImage.snapshot.ref)
                    .then((downloadUrl) => resolve(downloadUrl))
                    .catch((error) => reject(error));
            }
        );
    });
}

const initialFormData = {
    name: "",
    price: 0,
    description: "",
    category: "men",
    sizes: [],
    deliveryInfo: "",
    onSale: "no",
    imageUrl: "",
    priceDrop: 0,
};


export default function AdminAddProduct() {

    const [formData, setFormData] = useState(initialFormData)
    const {
        componentLoader, setComponentLoader,
    } = useContext(GlobalContext)

    const handleImage = async (e) => {
        // console.log('let me know that this is working' + e.target.files)
        const extractImageURL = await helperUploadImage(e.target.files[0])

        // console.log(extractImageURL)

        if (extractImageURL !== "") {
            setFormData({
                ...formData,
                imageUrl: extractImageURL,
            });
        }
    }

    const handleTileClick = (getCurrentItem) => {
        console.log(getCurrentItem)

        let copySizes = [...formData.sizes]
        const index = copySizes.findIndex(item => item.id === getCurrentItem.id);

        if (index === -1) {
            copySizes.push(getCurrentItem)
        } else {
            copySizes = copySizes.filter(item => item.id !== getCurrentItem.id);
        }

        setFormData({
            ...formData,
            sizes: copySizes,
        });
    }

    // console.log(formData)



    const handleAddProduct = async (formData) => {
        console.log('this should be adding the product', formData);
        const res = await addNewProduct(formData)

        console.log(res);
    };


    return (
        <div className="w-full mx-0 mt-5 mb-0 relative">
            <div className="flex flex-col items-start justify-start p-10 bg-white shadow-2xl rounded-xl relative text-black">
                <div className="w-full mt-6 mb-0 mx-0 space-y-8">
                    <input
                        // key={image.id}
                        accept="image/*"
                        max={1000000}
                        type="file"
                        onChange={handleImage}
                    />

                    <div className="flex gap-2 flex-col">
                        <label>Available sizes</label>
                        <Tile
                            selected={formData.sizes}
                            onClick={handleTileClick}
                            data={AvailableSizes}

                        />
                    </div>
                    {adminAddProductformControls.map((controlItem) =>
                        controlItem.componentType === "input" ? (
                            <InputComponent
                                type={controlItem.type}
                                placeholder={controlItem.placeholder}
                                label={controlItem.label}
                                value={formData[controlItem.id]}
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        [controlItem.id]: e.target.value,
                                    });
                                }}
                            />
                        ) : controlItem.componentType === "select" ? (
                            <Select
                                label={controlItem.label}
                                options={controlItem.options}
                                value={formData[controlItem.id]}
                                onChange={(e) => {
                                    setFormData({
                                        ...formData,
                                        [controlItem.id]: e.target.value,
                                    });
                                }}
                            />
                        ) : null
                    )}
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            handleAddProduct(formData);
                        }}
                        className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white font-medium uppercase tracking-wide"
                    >

                        {/* <button
    onClick={(e) => {
        e.preventDefault();
        handleAddProduct(formData);
    }}
    className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white font-medium uppercase tracking-wide"
>
    {
        componentLoader && componentLoader.loading ?
            <ComponentLoader
                text={"Adding Product..."}
                color={"#ffffff"}
                loading={componentLoader && componentLoader.loading}
            /> : 'Add Product'
    }
</button>
*/}
                        {
                            componentLoader && componentLoader.loading ?
                                <ComponentLoader
                                    text={"Adding Product..."}
                                    color={"#ffffff"}
                                    loading={componentLoader && componentLoader.loading}
                                /> : 'Add Product'
                        }
                        {/* Add Product */}
                    </button>

                </div>
            </div>
            <Notification />
        </div>
    )
}