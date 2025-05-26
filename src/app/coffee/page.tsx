import React from 'react'
import { BackgroundLines } from '../components/ui/background-lines'
import Navbar from '../components/Navbar'
import Image from 'next/image'

const page = () => {
  return (
    <div className="h-screen w-full">
        <Navbar />
        <BackgroundLines className='flex items-center justify-center'>
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center">
              <p className="relative py-8 font-bold text-5xl text-white whitespace-nowrap font-sagite">
                Buy Me A Coffee
              </p>
              <Image 
                src="/converted/coffee.webp" 
                alt="coffee" 
                width={48} 
                height={48} 
                priority
                className="h-[3rem] w-[3rem]"
              />
            </div>
            <h4 className="text-white text-center text-xl mb-8">You can support me by sending a contribution to my PhonePe Id:</h4>
            <h5 className="text-white text-center text-xl font-bold mb-4">PhonePe Id: <span className="text-blue-500">9981603789@ibl</span></h5>
            <Image 
              src="/converted/qr.webp" 
              alt="QR" 
              width={160} 
              height={160}
              priority
              className="h-[10rem] w-[10rem]"
            />
          </div>
        </BackgroundLines>
    </div>
  )
}

export default page