'use client'

import ComponentLoader from "@/components/loader";
import { GlobalContext } from "@/context";
import { addToCart } from "@/services/cart";
import { deleteAProduct } from "@/services/product";
import { useContext } from "react";
import { toast } from "react-toastify";


function ProductButton({ item }) {
    const { currentUpdatedProduct, setCurrentUpdatedProduct,
        setComponentLoader, componentLoader,
        router, pathName,
        user,
        showCartModal, setShowCartModal
    } = useContext(GlobalContext)

    const isAdminView = pathName.includes('adminView');

    // console.log(isAdminView, "<<<<<<<---------============----===----====--=-=-=-==-=-=")

    async function handleDeleteProduct(item) {
        setComponentLoader({ loading: true, id: item._id });

        const res = await deleteAProduct(item._id);
        console.log('-------->>>>> look right here', res);

        if (res.success) {
            setComponentLoader({ loading: false, id: "" });
            toast.success(res.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            router.refresh();
        } else {
            toast.error(res.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            setComponentLoader({ loading: false, id: "" });
        }
    }

    async function handleAddToCart(getItem) {
        console.log('This should be adding to the cart');

        setComponentLoader({ loading: true, id: getItem._id });
        const res = await addToCart({ productID: getItem._id, userID: user._id });

        if (res.success) {
            toast.success(res.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            setComponentLoader({ loading: false, id: "" });
            setShowCartModal(true);
        } else {
            toast.error(res.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            setComponentLoader({ loading: false, id: "" })
            setShowCartModal(true);
        }

        console.log(res);
    };


    return isAdminView ? (<>
        <button
            onClick={() => {
                setCurrentUpdatedProduct(item);
                router.push('/adminView/addProduct') &&
                    console.log('this should be updating the product');
            }}
            className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-whtie hover:bg-slate-800">
            update
        </button>
        <button
            onClick={() => handleDeleteProduct(item)}
            className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-whtie hover:bg-slate-800">

            {
                componentLoader &&
                    componentLoader.loading &&
                    item._id === componentLoader.id ? (
                    <ComponentLoader
                        text={"Deleting Product"}
                        color={"#ffffff"}
                        loading={componentLoader && componentLoader.loading}
                    />) : (
                    'delete'
                )
            }
        </button>
    </>
    ) : (
        <>
            <button
                onClick={() => handleAddToCart(item)}
                className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
            >
                {componentLoader &&
                    componentLoader.loading &&
                    componentLoader.id === item._id ? (
                    <ComponentLoader
                        text={"Adding to cart"}
                        color={"#ffffff"}
                        loading={componentLoader && componentLoader.loading}
                    />
                ) : (
                    "Add To Cart"
                )}
            </button>
        </>
    );
}

export default ProductButton