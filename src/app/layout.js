import { Inter } from 'next/font/google'
import './globals.css'
import GlobalState from '@/context'
import Navbar from '@/components/navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Tias2.0 Shop',
  description: 'Ecomerce site',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalState>
          <Navbar />
          <main className='flex min-h-screen flex-col'>
            {children}
          </main>
        </GlobalState>
      </body>
    </html>
  )
}
