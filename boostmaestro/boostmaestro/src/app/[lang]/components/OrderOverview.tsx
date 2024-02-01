"use client"

import { useSearchParams } from "next/navigation"
import useSwr from "swr"

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function CheckoutSuccessPage( { payments }: { payments: any }) {
    const searchParams = useSearchParams()
    const session_id = searchParams.get("session_id")

    const url = session_id ? `/api/stripe/sessions?session_id=${session_id}` : null
    const { data: checkoutSession, error } = useSwr(url, fetcher)

    if (error) return <div className="text-center py-10 text-xl text-red-600">{payments.failedToLoadSession}</div>

    const customer = checkoutSession?.session?.customer_details?.email
    const products = checkoutSession?.session?.line_items?.data?.map((item: any) => ({
        ...item.price.product,
        price: item.price.unit_amount,
        quantity: item.quantity,
    }))

    const payment = checkoutSession?.session?.payment_intent?.charges?.data[0]?.payment_method_details
    const subtotal = checkoutSession?.session?.amount_subtotal
    const total = checkoutSession?.session?.amount_total
    const discount = checkoutSession?.session?.total_details?.amount_discount
    const tax = checkoutSession?.session?.total_details?.amount_tax

    return (
        <div className="">
            <div className=" bg-white shadow-lg rounded-lg px-12 pb-12 pt-6">
                <h1 className="text-2xl font-bold mb-4 text-center">{payments.checkoutSuccess}</h1>
                <p className="mb-4">{payments.thankYouForYourPurchase} {customer}! {payments.orderConfirmationDescriptionEmailShortly}</p>
                
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-3">{payments.orderSummary}</h2>
                    {products?.map((product: any, index: any) => (
                        <div key={index} className="mb-2">
                            <p>{product.name} - {product.quantity} x {product.price / 100} €</p>
                        </div>
                    ))}
                </div>

                {/* <p className="mb-3">Payment Method: {payment?.card?.brand} ending in {payment?.card?.last4}</p> */}
                <p className="mb-3">Subtotal: {subtotal / 100} €</p>
                {discount > 0 && <p className="mb-3">Discount: {discount / 100} €</p>}
                {tax > 0 && <p className="mb-3">Tax: {tax / 100} €</p>}
                <p className="font-bold">Total: {total / 100} €</p>
            </div>
        </div>
    )
}
