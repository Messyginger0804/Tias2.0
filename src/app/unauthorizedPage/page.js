"use client";

import Image from "next/image";
import img from "../../../public/not-allowed.png";

export default function Unauthorized() {
    return (
        <section className="h-screen bg-gray-200 text-black text-center">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mx-auto mt-8 max-w-screen-xl px-4 sm:px-6 lg:px-8 ">
                    <div className="bg-white shadow">
                        <div className="px-4 py-6 sm:px-8 sm:py-10 flex flex-col gap-5">
                            <div className="flex justify-center">
                                <Image
                                    width={600}
                                    height={600}
                                    src={img}
                                />
                            </div>
                            <h1 className="font-bold text-xl md:text-3xl lg:text-5xl">
                                You don't have access to view this page!
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}