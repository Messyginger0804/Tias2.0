'use client'

import Select from "@/components/FormElements/Select"
import Tile from "@/components/FormElements/Tile"
import { AvailableSizes, adminAddProductformControls } from "@/utils"
import InputComponent from "@/components/FormElements/Input"
export default function AdminAddProduct() {


    const handleImage = () => {
        console.log('let me know that this is working')
    }

    const handleAddProduct = () => {
        console.log('this should be adding the product')
    }
    return (
        <div className="w-full mx-0 mt-5 mb-0 relative">
            <div className="flex flex-col items-start justify-start p-10 bg-white shadow-2xl rounded-xl relative text-black">
                <div className="w-full mt-6 mb-0 mx-0 space-y-8">
                    <input
                        accept="image/*"
                        max={1000000}
                        type="file"
                        onChange={handleImage}
                    />

                    <div className="flex gap-2 flex-col">
                        <label>Available sizes</label>
                        <Tile
                            data={AvailableSizes}

                        />
                    </div>
                    {adminAddProductformControls.map((controlItem) =>
                        controlItem.componentType === "input" ? (
                            <InputComponent
                                type={controlItem.type}
                                placeholder={controlItem.placeholder}
                                label={controlItem.label}
                            // value={formData[controlItem.id]}

                            />
                        ) : controlItem.componentType === "select" ? (
                            <Select
                                label={controlItem.label}
                                options={controlItem.options}
                            // value={formData[controlItem.id]}

                            />
                        ) : null
                    )}
                    <button
                        onClick={handleAddProduct}
                        className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white font-medium uppercase tracking-wide"
                    >
                        Add Product
                    </button>

                </div>
            </div>
        </div>
    )
}