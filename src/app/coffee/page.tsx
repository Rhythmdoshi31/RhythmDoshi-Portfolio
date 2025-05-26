import React from 'react'
import { BackgroundLines } from '../components/ui/background-lines'
import Navbar from '../components/Navbar'
import Image from 'next/image'

const page = () => {
  return (
    <div className="flex min-h-[100dvh] w-full flex-col overflow-x-hidden">
      <Navbar />
      <BackgroundLines className="flex flex-1 flex-col items-center justify-center px-4 py-8">
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-sagite">
              Buy Me A Coffee
            </p>
            <Image 
              src="/converted/coffee.webp" 
              alt="coffee" 
              width={48} 
              height={48} 
              priority
              className="w-10 h-10"
            />
          </div>

          <h4 className="text-white text-lg sm:text-xl">
            You can support me by sending a contribution to my PhonePe Id:
          </h4>

          <h5 className="text-white text-lg sm:text-xl font-bold">
            PhonePe Id: <span className="text-blue-500 break-all">9981603789@ibl</span>
          </h5>

          <Image 
            src="/converted/qr.webp" 
            alt="QR" 
            width={160} 
            height={160}
            priority
            className="w-40 h-40"
          />
        </div>
      </BackgroundLines>
    </div>
  )
}

export default page
