'use client'

export default function AdminAddProduct() {
    const handleImage = () => {
        console.log('wtf dude')
    }
    return (
        <div className="w-full mx-0 mt-5 mb-0 relative">
            <div className="flex flex-col items-start justify-start p-10 bg-white shadow-2xl rounded-xl relative">

                <div className="w-full mt-6 mb-0 mx-0 space-y-8">
                    <input
                        accept="image/*"
                        max={1000000}
                        type="file"
                        onChange={handleImage}
                    />

                </div>

            </div>
        </div>
    )
}