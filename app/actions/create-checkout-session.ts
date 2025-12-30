'use server'

import Stripe from 'stripe';
import { redirect } from 'next/navigation';

export async function createCheckoutSession() {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

    if (!stripeSecretKey) {
        console.error('STRIPE_SECRET_KEY is missing');
        throw new Error('STRIPE_SECRET_KEY is not configured');
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
                    unit_amount: 1000,
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
