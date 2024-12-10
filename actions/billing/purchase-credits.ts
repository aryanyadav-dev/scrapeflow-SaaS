'use server';

import { auth } from '@clerk/nextjs/server';

import { getCreditsPack, PackId } from '@/types/billing';
import { stripe } from '@/lib/stripe/stripe';
import { getAppUrl } from '@/lib/helper/app-url';
import { redirect } from 'next/navigation';

export async function purchaseCredits(packId: PackId) {
  const { userId } = auth();

  if (!userId) {
    throw new Error('Unautheticated');
  }

  const selectedPack = getCreditsPack(packId);
  if (!selectedPack) {
    throw new Error('Invalid pack');
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    invoice_creation: {
      enabled: true,
    },
    success_url: getAppUrl('billing'),
    cancel_url: getAppUrl('billing'),
    metadata: {
      userId,
      packId,
    },
    line_items: [
      {
        quantity: 1,
        price: selectedPack.priceId,
      },
    ],
  });

  if (!session.url) {
    throw new Error('Cannot create stripe session');
  }

  redirect(session.url);
}
