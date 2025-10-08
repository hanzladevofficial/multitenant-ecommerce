import Stripe from "stripe";

export type ProductMetaData = {
  stripAccountId: string;
  id: string;
  name: string;
  price: string;
};

export type CheckoutMetaData = {
  userId: string;
};
export type ExpandedLineItem = Stripe.LineItem & {
  price: Stripe.Price & {
    product: Stripe.Product & {
      metadata: ProductMetaData;
    };
  };
};
