"use client";

import InputComponent from "@/components/FormElements/Input";
import Notification from "@/components/notification";
import ComponentLoader from "@/components/loader";
import { GlobalContext } from "@/context";
import {
    addNewAddress,
    deleteAddress,
    fetchAllAddresses,
    updateAddress,
} from "@/services/address";
import { addNewAddressFormControls } from "@/utils";
import { useContext, useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";

export default function Account() {
    const {
        user,
        router,
        addresses,
        setAddresses,
        addressFormData,
        setAddressFormData,
        componentLoader,
        setComponentLoader,
        pageLoader,
        setPageLoader,
    } = useContext(GlobalContext);

    const [showAddressForm, setShowAddressForm] = useState(false);
    const [currentEditedAddressId, setCurrentEditedAddressId] = useState(null);

    async function extractAllAddresses() {
        setPageLoader(true);
        const res = await fetchAllAddresses(user?._id);

        if (res.success) {
            setPageLoader(false);

            setAddresses(res.data);
        }
    }

    async function handleAddOrUpdateAddress() {
        setComponentLoader({ loading: true, id: "" });
        const res =
            currentEditedAddressId !== null
                ? await updateAddress({
                    ...addressFormData,
                    _id: currentEditedAddressId,
                })
                : await addNewAddress({ ...addressFormData, userID: user?._id });

        console.log(res);

        if (res.success) {
            setComponentLoader({ loading: false, id: "" });
            toast.success(res.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            setAddressFormData({
                fullName: "",
                city: "",
                state: "",
                postalCode: "",
                address: "",
            });
            extractAllAddresses();
            setCurrentEditedAddressId(null);
        } else {
            setComponentLoader({ loading: false, id: "" });
            toast.error(res.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            setAddressFormData({
                fullName: "",
                city: "",
                state: "",
                postalCode: "",
                address: "",
            });
        }
    }

    function handleUpdateAddress(getCurrentAddress) {
        setShowAddressForm(true);
        setAddressFormData({
            fullName: getCurrentAddress.fullName,
            city: getCurrentAddress.city,
            state: getCurrentAddress.state,
            postalCode: getCurrentAddress.postalCode,
            address: getCurrentAddress.address,
        });
        setCurrentEditedAddressId(getCurrentAddress._id);
    }

    async function handleDelete(getCurrentAddressID) {
        setComponentLoader({ loading: true, id: getCurrentAddressID });

        const res = await deleteAddress(getCurrentAddressID);

        if (res.success) {
            setComponentLoader({ loading: false, id: "" });

            toast.success(res.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            extractAllAddresses();
        } else {
            setComponentLoader({ loading: false, id: "" });

            toast.error(res.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    }

    useEffect(() => {
        if (user !== null) extractAllAddresses();
    }, [user]);

    return (
        <section className="text-black mt-4">
            <div className="mx-auto bg-gray-100 px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow">
                    <div className="p-6 sm:p-12">
                        <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
                            {/* we have render random user image here */}
                        </div>
                        <div className="flex flex-col flex-1">
                            <h4 className="text-lg font-semibold text-center md:text-left">
                                {user?.name}
                            </h4>
                            <p>{user?.email}</p>
                            <p>{user?.role}</p>
                        </div>
                        <button onClick={() => router.push('/orders')} className="mt-5  inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide">
                            View Your Orders
                        </button>
                        <div className="mt-6">
                            <h1 className="font-bold text-lg">Your Addresses :</h1>
                            {pageLoader ? (
                                <PulseLoader
                                    color={"#000000"}
                                    loading={pageLoader}
                                    size={15}
                                    data-testid="loader"
                                />
                            ) : (
                                <div className="mt-4 flex flex-col gap-4">
                                    {addresses && addresses.length ? (
                                        addresses.map((item) => (
                                            <div className="border p-6" key={item._id}>
                                                <p>Name : {item.fullName}</p>
                                                <p>Address : {item.address}</p>
                                                <p>City : {item.city}</p>
                                                <p>State : {item.state}</p>
                                                {/* {console.log(item.state, '<<<<<--------')} */}
                                                <p>PostalCode : {item.postalCode}</p>
                                                <button
                                                    onClick={() => handleUpdateAddress(item)}
                                                    className="mt-5 mr-5 inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
                                                >
                                                    Update
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item._id)}
                                                    className="mt-5  inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
                                                >
                                                    {setComponentLoader &&
                                                        setComponentLoader.loading &&
                                                        setComponentLoader.id === item._id ? (
                                                        <ComponentLoader
                                                            text={"Deleting"}
                                                            color={"#ffffff"}
                                                            loading={
                                                                setComponentLoader &&
                                                                setComponentLoader.loading
                                                            }
                                                        />
                                                    ) : (
                                                        "Delete"
                                                    )}
                                                </button>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No address found ! Please add a new address below</p>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="mt-4">
                            <button
                                onClick={() => setShowAddressForm(!showAddressForm)}
                                className="mt-5  inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
                            >
                                {showAddressForm ? "Hide Address Form" : "Add New Address"}
                            </button>
                        </div>
                        {showAddressForm ? (
                            <div className="flex flex-col mt-5 justify-center pt-4 items-center">
                                <div className="w-full mt-6 mr-0 mb-0 ml-0 space-y-8">
                                    {addNewAddressFormControls.map((controlItem) => (
                                        <InputComponent
                                            key={controlItem.id}
                                            type={controlItem.type}
                                            placeholder={controlItem.placeholder}
                                            label={controlItem.label}
                                            value={addressFormData[controlItem.id]}
                                            onChange={(event) =>
                                                setAddressFormData({
                                                    ...addressFormData,
                                                    [controlItem.id]: event.target.value,
                                                })
                                            }
                                        />
                                    ))}
                                </div>
                                <button
                                    onClick={handleAddOrUpdateAddress}
                                    className="mt-5  inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
                                >
                                    {componentLoader && componentLoader.loading ? (
                                        <ComponentLoader
                                            text={"Saving"}
                                            color={"#ffffff"}
                                            loading={
                                                componentLoader && componentLoader.loading
                                            }
                                        />
                                    ) : (
                                        "Save"
                                    )}
                                </button>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
            <Notification />
        </section>
    );
}