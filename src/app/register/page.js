'use client'

import InputComponent from "@/components/FormElements/Input"
import Select from "@/components/FormElements/Select"
import Loader from "@/components/loader"
import Notification from "@/components/notification"
import { GlobalContext } from "@/context"
import { registerNewUser } from "@/services/register"
import { isFormValid, registrationFormControls } from "@/utils"
import { useState, useEffect, useContext } from "react"
import { toast } from "react-toastify";


// const isRegistered = false
// const isRegistered = true

const initialFormData = {
    name: '',
    email: '',
    password: '',
    role: 'customer'
}

export default function Register() {

    const [formData, setFormData] = useState(initialFormData);
    const [isRegistered, setIsRegistered] = useState(false);
    const { pageLoader, setpageLoader, isAuthUser } = useContext(GlobalContext);


    console.log('is this going through------->', isAuthUser)

    const isFormValid = () => {
        return formData &&
            formData.name &&
            formData.name.trim() !== "" &&
            formData.email &&
            formData.email.trim() !== "" &&
            formData.password &&
            formData.password.trim() !== ""
            ? true
            : false;
    }

    console.log(isFormValid())

    const handleRegister = async () => {
        setpageLoader(true);
        const data = await registerNewUser(formData);

        if (data.success) {
            toast.success(data.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            setIsRegistered(true);
            setpageLoader(false);
            setFormData(initialFormData);
        } else {
            toast.error(data.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            setpageLoader(false);
            setFormData(initialFormData);
        }

        console.log(data);
    }

    useEffect(() => {
        if (isAuthUser) router.push("/");
    }, [isAuthUser]);

    return (

        <div className="bg-white relative text-gray-900">
            <div className="flex flex-col items-center justify-between py-0 px-10 mt-8 mr-auto xl:px-5 lg:flex-row">
                <div className="flex flex-col justify-center items-center w-full pr-10 pl-10 lg:flex-row">
                    <div className="w-full mt-10 mx-0 mb-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
                        <div className="flex flex-col items-center justify-start p-10 bg-white shadow-2xl rounded-xl relative z-10">
                            <p className="w-full text-4xl font-medium text-center font-serif">
                                {
                                    isRegistered ? "Registration Successful !" : "Sign up for an account"
                                }
                            </p>
                            {
                                isRegistered ? (<button className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out focus:shadow-md uppercase tracking-wide">

                                    Login
                                </button>
                                ) :
                                    <div className="w-full mx-0 mt-6 mb-0 relative space-y-8">
                                        {
                                            registrationFormControls.map(controlItem =>
                                                controlItem.componentType === 'input' ?
                                                    <InputComponent
                                                        key={controlItem.id}
                                                        type={controlItem.type}
                                                        placeholder={controlItem.placeholder}
                                                        label={controlItem.label}
                                                        onChange={(event) => {
                                                            setFormData({
                                                                ...formData,
                                                                [controlItem.id]: event.target.value,
                                                            });
                                                        }}
                                                        value={formData[controlItem.id]}
                                                    />
                                                    :
                                                    controlItem.componentType === 'select' ?
                                                        <Select
                                                            options={controlItem.options}
                                                            label={controlItem.label}
                                                            onChange={(event) => {
                                                                setFormData({
                                                                    ...formData,
                                                                    [controlItem.id]: event.target.value,
                                                                });
                                                            }}
                                                            value={formData[controlItem.id]}
                                                        />
                                                        : null
                                            )}
                                        <button
                                            className="disabled:opacity-50 inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out focus:shadow-md uppercase tracking-wide"
                                            disabled={!isFormValid()}
                                            onClick={handleRegister}
                                        >
                                            {pageLoader ? (
                                                <Loader
                                                    text={"Registering"}
                                                    color={"#ffffff"}
                                                    loading={pageLoader}
                                                />
                                            ) : (
                                                "Register"
                                            )}
                                        </button>
                                    </div>
                            }

                        </div>

                    </div>

                </div>
            </div>
            <Notification
            />
        </div>
    )
}