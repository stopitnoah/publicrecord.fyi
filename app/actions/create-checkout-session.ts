'use server'

import Stripe from 'stripe';
import { redirect } from 'next/navigation';

export async function createCheckoutSession(formData: FormData) {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

    if (!stripeSecretKey) {
        console.error('STRIPE_SECRET_KEY is missing');
        throw new Error('STRIPE_SECRET_KEY is not configured');
    }

    const amountRaw = formData.get('amount');
    const amount = amountRaw ? parseFloat(amountRaw.toString()) : 10;

    // Ensure minimum donation is $1
    if (isNaN(amount) || amount < 1) {
        throw new Error('Invalid donation amount');
    }

    const stripe = new Stripe(stripeSecretKey);

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'PublicRecord.fyi Mission Support',
                        description: 'Help us maintain decentralized, seizure-proof infrastructure for public records.',
                    },
                    unit_amount: Math.round(amount * 100), // Convert to cents
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/support?success=true`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/support?canceled=true`,
    });

    if (!session.url) {
        throw new Error('Failed to create checkout session');
    }

    redirect(session.url);
}
