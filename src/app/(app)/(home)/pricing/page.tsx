import Link from "next/link";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for new sellers just getting started.",
    features: ["1 storefront", "Up to 10 products", "Stripe payouts", "Basic analytics", "Community support"],
    cta: "Get Started",
    href: "/sign-up",
    highlight: false,
  },
  {
    name: "Pro",
    price: "PKR 2,500",
    per: "/ month",
    description: "For growing sellers who need more power.",
    features: ["1 storefront", "Unlimited products", "Priority payouts", "Advanced analytics", "Email support", "Custom refund policies", "Featured listings"],
    cta: "Start Selling",
    href: "/sign-up",
    highlight: true,
  },
  {
    name: "Business",
    price: "PKR 7,500",
    per: "/ month",
    description: "For established businesses scaling up.",
    features: ["Multiple storefronts", "Unlimited products", "Instant payouts", "Full analytics suite", "Dedicated support", "API access", "Custom branding"],
    cta: "Contact Sales",
    href: "/sign-up",
    highlight: false,
  },
];

export default function PricingPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-4">Pricing</h1>
      <p className="text-lg text-muted-foreground mb-12">
        Simple, transparent pricing. No hidden fees. Cancel anytime.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-xl border p-8 flex flex-col gap-6 ${
              plan.highlight ? "bg-black text-white border-black" : "bg-white"
            }`}
          >
            <div>
              <h2 className="text-xl font-semibold mb-1">{plan.name}</h2>
              <p className={`text-sm mb-4 ${plan.highlight ? "text-gray-300" : "text-muted-foreground"}`}>
                {plan.description}
              </p>
              <div className="flex items-end gap-1">
                <span className="text-3xl font-bold">{plan.price}</span>
                {plan.per && (
                  <span className={`text-sm mb-1 ${plan.highlight ? "text-gray-300" : "text-muted-foreground"}`}>
                    {plan.per}
                  </span>
                )}
              </div>
            </div>

            <ul className="space-y-2 flex-1">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm">
                  <span className={`size-1.5 rounded-full shrink-0 ${plan.highlight ? "bg-white" : "bg-black"}`} />
                  {f}
                </li>
              ))}
            </ul>

            <Button
              asChild
              className={
                plan.highlight
                  ? "bg-white text-black hover:bg-pink-400 hover:text-black transition-colors"
                  : "bg-black text-white hover:bg-pink-400 hover:text-black transition-colors"
              }
            >
              <Link href={plan.href}>{plan.cta}</Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
