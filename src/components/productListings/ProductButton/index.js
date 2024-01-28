'use client'

import ComponentLoader from "@/components/loader";
import { GlobalContext } from "@/context";
import { deleteAProduct } from "@/services/product";
import { useContext } from "react";
import { toast } from "react-toastify";


function ProductButton({ item }) {
    const { currentUpdatedProduct, setCurrentUpdatedProduct,
        setComponentLoader, componentLoader,
        router, pathName,
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
            <button className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-whtie hover:bg-slate-800">
                add to cart
            </button>
        </>
    )
}

export default ProductButton