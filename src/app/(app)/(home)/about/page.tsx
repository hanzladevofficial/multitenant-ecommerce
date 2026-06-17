export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-6">About Funroad</h1>
      <p className="text-lg text-muted-foreground mb-10">
        Funroad is a multitenant marketplace platform that empowers creators, makers, and digital sellers to launch their own storefront — without the hassle.
      </p>

      <div className="grid md:grid-cols-2 gap-10 mb-16">
        <div>
          <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
          <p className="text-muted-foreground">
            We believe everyone deserves a fair shot at selling online. Funroad removes technical barriers so you can focus on what matters — your products and your customers.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-3">Who We Serve</h2>
          <p className="text-muted-foreground">
            From indie developers selling software to artists offering digital downloads — Funroad is built for creators of all kinds who want a fast, reliable storefront.
          </p>
        </div>
      </div>

      <div className="border rounded-xl p-8 bg-white">
        <h2 className="text-2xl font-semibold mb-6">Why Funroad?</h2>
        <ul className="space-y-4">
          {[
            { title: "Built for speed", desc: "Launch your store in minutes with zero configuration required." },
            { title: "Secure payments", desc: "Stripe-powered checkout with automatic payout to your account." },
            { title: "Your brand, your store", desc: "Each seller gets a dedicated storefront with a unique URL." },
            { title: "No hidden fees", desc: "Transparent pricing with no surprise charges on your sales." },
          ].map((item) => (
            <li key={item.title} className="flex gap-3">
              <span className="mt-1 size-2 rounded-full bg-black shrink-0" />
              <div>
                <span className="font-medium">{item.title}</span>
                <span className="text-muted-foreground"> — {item.desc}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
