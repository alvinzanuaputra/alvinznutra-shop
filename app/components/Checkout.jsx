import React, { useState } from "react";
import { product } from "../libs/product";
import Link from "next/link";

const Checkout = () => {
  const [quantity, setQuantity] = useState(1);
  const [paymentUrl, setPaymentUrl] = useState("")

  const decreaseQuantity = () => {
    setQuantity((prevState) => (quantity > 1 ? prevState - 1 : null));
  };

  const increaseQuantity = () => {
    setQuantity((prevState) => prevState + 1);
  };

  const handleQuantityChange = (event) => {
    // Ensure the quantity is a positive integer
    const newQuantity = parseInt(event.target.value, 10) || 1;
    setQuantity(newQuantity);
  };

  const checkout = async () => {
    // alert("Checkout SNAP! 🌟")
    const data = {
      id: product.id,
      productName: product.name,
      price: product.price,
      quantity: quantity
    };

    const response = await fetch("/api/tokenizer", {
      method: "POST",
      body: JSON.stringify(data)
    });

    const requestData = await response.json()
    window.snap.pay(requestData.token)
  };



  const generatePaymentLink = async () => {
    // alert("Checkout Payment Link! 🔥");
    const secret = process.env.NEXT_PUBLIC_SECRET
    const encodedSecret = Buffer.from(secret).toString('base64')
    const basicAuth = `Basic ${encodedSecret}`

    let data2 = {
      item_details: [
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: quantity
        }
      ],
      transaction_details: {
        order_id: product.id,
        gross_amount: product.price * quantity
      }
    }


    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/v1/payment-links`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": basicAuth
      },
      body: JSON.stringify(data2)
    }
    )

    const paymentLink = await response.json(); setPaymentUrl(paymentLink.payment_url)

  };

  return (
    <>
      <p className="text-xs mb-2 text-black font-semibold">Number of products :</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center sm:gap-8">
          <button
            className="transition-all hover:opacity-75 mr-2"
            onClick={decreaseQuantity}
          >
            ➖
          </button>

          <input
            type="number"
            id="quantity"
            value={quantity}
            className="rounded-xl border border-black h-6 w-14 pl-3 text-black text-center"
            onChange={handleQuantityChange}
          />
          <button
            className="transition-all hover:opacity-75 ml-2"
            onClick={increaseQuantity}
          >
            ➕
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="ml-2 rounded bg-blue-400 py-2 px-2 text-sm font-medium transition hover:scale-105"
            onClick={checkout}
          >
            Checkout
          </button>
          <p className="text-black"></p>
          <button
            className="rounded bg-blue-400 py-2 px-2  text-sm font-medium transition hover:scale-105"
            onClick={generatePaymentLink}
          >
            Generate Link
          </button>

        </div>
      </div>

      <div className="mt-6 bg-zinc-300 rounded-md px-1 py-2 text-xs text-blue-900 transition underline hover: italic hover:scale-105 duration-500">
        <Link href={paymentUrl} target="_blank" className="relative mx-1">
          {paymentUrl}
        </Link>

        <p></p>
      </div>

    </>
  );
};

export default Checkout;
