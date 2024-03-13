"use client";
import { product } from "./libs/product";
import Checkout from "./components/Checkout";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js"
    const clientKey = process.env.NEXT_PUBLIC_CLIENT
    const script = document.createElement('script')
    script.src = snapScript
    script.setAttribute('data-client-key', clientKey)
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, []);

  return (
    <>
      <main className="max-w-xl mx-auto sm:p-16">

        <div className="flex items-center justify-between px-8 bg-blue-500 py-4 border-b-2 border-white">
          <a href="/" className="">
            <h1 className="font-bold italic ">ALVIN SHOP</h1>
          </a>
          <button><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#fff" viewBox="0 0 256 256"><path d="M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z"></path></svg></button>
        </div>
        {/* <hr className="bg-black"/> */}
        <div className="flex flex-col">
          <img
            src="./img.jpg"
            alt="PRODUCT IMAGE"
            width={250}
            height={250}
            className="w-full object-cover"
          />
          <div className="border border-gray-100 bg-white p-6">
            <h3 className="mt-4 text-lg font-bold text-gray-900">
              {product.name}
            </h3>
            <p className="mt-1.5 text-sm font-semibold text-blue-900">Rp.{product.price}</p>
            <p className="py-4 text-sm text-gray-700 text-justify">
              {product.description}
            </p>
            <h1 className="py-4 text-sm text-gray-700 ">
              <p className="text-black mb-2 font-semibold">
                Choose hijab's color :
              </p>
              <ul>
                {product.colors.map((color, index) => (
                  <li key={index} className="flex items-center mb-2">
                    <input
                      type="radio"
                      id={`colorRadio_${index}`}
                      name="selectedColor"
                      value={color.value}
                      className="mr-2"
                    />
                    <label htmlFor={`colorRadio_${index}`} className="flex items-center">
                      <span className="ml-2">{color.label}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </h1>


            <Checkout />
          </div>
        </div>
      </main>
    </>
  );
}
