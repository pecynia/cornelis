import Stripe from 'stripe'
import { AdditionalRegistrationFormProps, EventProps, RegistrationFormProps } from '@../../../typings'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
import { addRegistration } from '@/lib/utils/db'
import { Locale } from '@../../../i18n.config'
import { sendRegistrationConfirmationEmail, sendRegistrationEmail } from '@/app/_actions'

// Helper function to safely parse JSON strings in metadata
function safelyParseJSON(jsonString: string | undefined) {
    try {
        return jsonString ? JSON.parse(jsonString) : null
    } catch (e) {
        console.error('Error parsing JSON string:', e)
        return null
    }
}

// Webhook for receiving events from Stripe, in case of succesful payment
export async function POST(request: Request) {
    const payload = await request.text()
    const sig = request.headers.get('stripe-signature')!
    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(payload, sig, process.env.STRIPE_WEBHOOK_SECRET!)
    } catch (err: any) {
        console.error(err)
        return new Response(JSON.stringify({ error: err.message }), {
            headers: { "Content-Type": "application/json" },
            status: 400
        })
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object as Stripe.Checkout.Session
            
            // Extract and parse fields from session metadata
            const {
                _id,
                eventTitel,
                eventDate,
                lang,
                companyName,
                companyWebsite,
                address,
                country,
                nameParticipant,
                phone,
                email,
                position,
                vatNumber,
                poNumber
            } = session.metadata || {}

            const additionalParticipants = safelyParseJSON(session.metadata?.additionalParticipants) as AdditionalRegistrationFormProps[]
            const selectedEvent = safelyParseJSON(session.metadata?.selectedEvent) as EventProps

            // Construct the RegistrationFormProps object
            const registrationForm: RegistrationFormProps = { 
                _id: _id,
                eventTitel: eventTitel,
                eventDate: new Date(eventDate),
                lang: lang as Locale,
                companyName,
                companyWebsite,
                address,
                country,
                nameParticipant,
                phone,
                email,
                position,
                vatNumber,
                poNumber,
                additionalParticipants,
                selectedEvent
            }
            
            // Add registration to event in database
            const result = await addRegistration(registrationForm)

            // Send admin email
            const adminEmailResult = await sendRegistrationEmail(registrationForm, registrationForm.selectedEvent)

            // Send confirmation email to customer
            const emailResult = await sendRegistrationConfirmationEmail(registrationForm, session.amount_total!)
            
            if (result.acknowledged && emailResult.success && adminEmailResult.success) {
                console.log('Registration and confirmation email sent successfully')
                return new Response(JSON.stringify({ received: true }), {
                    headers: { "Content-Type": "application/json" },
                })
            } else {
                console.error('Error sending admin email:', adminEmailResult.error)
                console.error('Error sending confirmation email:', emailResult.error)
            }
            break
        default:
            console.warn(`Unhandled event type ${event.type}`)
    }

    return new Response(JSON.stringify({ received: true }), {
        headers: { "Content-Type": "application/json" },
    })

}











