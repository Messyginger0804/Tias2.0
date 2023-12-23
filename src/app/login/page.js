'use client'

import InputComponent from "@/components/FormElements/Input"
import { login } from "@/services/login"
import { loginFormControls } from "@/utils"
import { useRouter } from "next/navigation"
import { useState } from "react"

const intiialFormData = {
    email: '',
    password: '',

}

export default function Login() {
    const [formData, setFormData] = useState(intiialFormData)

    const router = useRouter();

    console.log(formData)

    const handleLogin = async () => {

        const data = await login(formData);
        console.log('hey aidyn its working ------->>', data);

    }

    return (

        <div className="bg-white relative text-gray-900">
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
                                <button onClick={handleLogin}
                                    className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out focus:shadow-md uppercase tracking-wide">
                                    Login
                                </button>
                                <div className="flex flex-col gap-2">
                                    <p className="text-gray-600">New to Tias?</p>
                                </div>
                                <button onClick={() => router.push("/register")}
                                    className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white transition-all duration-200 ease-in-out focus:shadow-md uppercase tracking-wide">
                                    register
                                </button>
                            </div>


                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}