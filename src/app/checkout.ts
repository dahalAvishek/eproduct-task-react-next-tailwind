import { Stripe, loadStripe } from "@stripe/stripe-js";
import { LineItem } from "./page";

export async function checkout({ lineItems }: { lineItems: LineItem[] }) {
  let stripePromise: Promise<Stripe | null> | null = null;

  const getStripe = () => {
    if (!stripePromise) {
      if (process.env.NEXT_PUBLIC_API_KEY) {
        stripePromise = loadStripe(process.env.NEXT_PUBLIC_API_KEY);
      }
    }
    return stripePromise;
  };

  const stripe = await getStripe();

  if (stripe != null) {
    await stripe.redirectToCheckout({
      mode: "payment",
      lineItems,
      successUrl: `${window.location.origin}?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: window.location.origin,
    });
  }
}
