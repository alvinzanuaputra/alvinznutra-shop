import Midtrans from "midtrans-client";
import { NextResponse } from "next/server";

let snap = new Midtrans.Snap({
    isProduction: false,
    serverKey: process.env.NEXT_PUBLIC_SECRET,
    clientKey: process.env.NEXT_PUBLIC_CLIENT
})

export async function POST (request){
    const {id, productName, price, quantity} = await request.json()
    let parameter = {
        item_details: {
            name: productName,
            price: price,
            quantity: quantity,

        },
        transaction_details:{
            order_id: id,
            gross_amount: price * quantity
        }
    }

// try {
    const token = await snap.createTransactionToken(parameter)
    console.log(token);
    return NextResponse.json({token})
}
// catch (error){
//     console.log(token);
//     return NextResponse.error("Aplikasi Server Error. Silahkan coba lagi !", 500);
// }
// }