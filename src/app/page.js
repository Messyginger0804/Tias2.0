'use client'

import { GlobalContext } from "@/context"
import { useContext } from "react"


export default function Home() {

  const { isAuthUser } = useContext(GlobalContext)
  const { user } = useContext(GlobalContext)


  console.log(isAuthUser);
  console.log(user);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Tias Shop</h1>

      {/* <h3>Welcome to the ite {user.name}</h3> */}
    </main>
  )
}
