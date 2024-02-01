import { NextRequest } from 'next/server'
import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(request: Request) {
    const { lineItems, checkoutMetadata } = await request.json()

    if (!lineItems) {
        return new Response(JSON.stringify({ error: "lineItems is required" }), {
            headers: { "Content-Type": "application/json" },
            status: 400
        })
    }
    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        metadata: checkoutMetadata,
        mode: 'payment',
        success_url: `${request.headers.get('Origin')}/${request.headers.get('lang')}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${request.headers.get('Origin')}/${request.headers.get('lang')}`,          
    })

    // If the session is not created, return an error
    if (!session) {
        return new Response(JSON.stringify({ error: "Session could not be created" }), {
            headers: { "Content-Type": "application/json" },
            status: 500
        })
    }

    // When the session is created, return the session object
    return new Response(JSON.stringify({ session }), {
        headers: { "Content-Type": "application/json" },
    })
}

export async function GET(request: NextRequest ) {

    const searchParams = request.nextUrl.searchParams
    const sessionId = searchParams.get('session_id')

    if (!sessionId?.startsWith("cs_")) {
        return new Response(JSON.stringify({ error: "session_id is required" }), {
            headers: { "Content-Type": "application/json" },
            status: 400
        })
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ['payment_intent', 'line_items.data.price.product'] // 'line_items.data.price.product.metadata'
    })

    if (!session) {
        return new Response(JSON.stringify({ error: "Session could not be retrieved" }), {
            headers: { "Content-Type": "application/json" },
            status: 500
        })
    }

    return new Response(JSON.stringify({ session }), {
        headers: { "Content-Type": "application/json" },
    })
}