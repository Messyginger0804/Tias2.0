'use client'

import InputComponent from "@/components/FormElements/Input"
import ComponentLoader from "@/components/loader"
// import Loader from "@/components/loader"
import Notification from "@/components/notification"
import { GlobalContext } from "@/context"
import { login } from "@/services/login"
import { loginFormControls } from "@/utils"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"
import { toast } from "react-toastify"

const initialFormData = {
    email: '',
    password: '',

}

export default function Login() {
    const [formData, setFormData] = useState(initialFormData)
    const {
        componentLoader, setComponentLoader,
        isAuthUser, setIsAuthUser,
        user, setUser, pageLoader
    } = useContext(GlobalContext)

    const router = useRouter();

    // console.log(formData)

    const handleLogin = async () => {
        setComponentLoader({ loading: true, id: '' });
        const data = await login(formData);
        // console.log('hey aidyn its working ------->>', data);

        // change the state of the user here
        if (data.success) {
            toast.success(data.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            setIsAuthUser(true);
            setUser(data?.finalData?.user);
            setFormData(initialFormData);
            Cookies.set("token", data?.finalData?.token);
            localStorage.setItem("user", JSON.stringify(data?.finalData?.user));
            setComponentLoader({ loading: false, id: "" });
        } else {
            console.log(data.message);
            toast.error(data.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            setIsAuthUser(false);
            setComponentLoader({ loading: false, id: "" });
        }
    }

    const isFormValid = () => {
        return formData &&
            formData.email &&
            formData.email.trim() !== "" &&
            formData.password &&
            formData.password.trim() !== ""
            ? true
            : false;
    }

    // console.log('the isAuthUser------>', isAuthUser, 'the user-------->', user)

    useEffect(() => {
        if (isAuthUser) router.push("/");
    }, [isAuthUser, router]);

    return (

        <div className="bg-white relative text-gray-900 mt-2">
            <div className="flex flex-col items-center justify-between py-0 px-10 mt-8 mr-auto xl:px-5 lg:flex-row">
                <div className="flex flex-col justify-center items-center w-full pr-10 pl-10 lg:flex-row">
                    <div className="w-full mt-10 mx-0 mb-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
                        <div className="flex flex-col items-center justify-start p-10 bg-white shadow-2xl rounded-xl relative z-10">
                            <p className="w-full text-4xl font-medium text-center font-serif">
                                Login
                            </p>


                            <div className="w-full mx-0 mt-6 mb-0 relative space-y-8">
                                {
                                    loginFormControls.map(controlItem =>
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

                                            : null
                                    )}
                                <button
                                    onClick={handleLogin}
                                    disabled={!isFormValid()}
                                    className={`inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out focus:shadow-md uppercase tracking-wide ${componentLoader && componentLoader.loading ? "opacity-50 cursor-not-allowed" : ""
                                        }`}
                                >
                                    {componentLoader && componentLoader.loading ? (
                                        <ComponentLoader
                                            text={"Logging in..."}
                                            color={"#ffffff"}
                                            loading={componentLoader && componentLoader.loading}
                                        />
                                    ) : (
                                        "Login"
                                    )}
                                </button>

                                <div className="flex flex-col gap-2">
                                    <p className="text-gray-600">New to Tias?</p>
                                </div>
                                <button
                                    onClick={() => router.push("/register")}
                                    className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out focus:shadow-md uppercase tracking-wide">
                                    register

                                </button>
                            </div>


                        </div>

                    </div>

                </div>
            </div>
            <Notification

            />
        </div>
    )
}