const features = [
  {
    title: "Multitenant Storefronts",
    desc: "Every seller gets their own branded storefront at a unique URL. Fully isolated, fully yours.",
  },
  {
    title: "Stripe Payments",
    desc: "Accept payments globally with Stripe Connect. Funds go directly to your account after each sale.",
  },
  {
    title: "Digital Product Delivery",
    desc: "Sell files, courses, software, or any digital good. Funroad handles secure delivery automatically.",
  },
  {
    title: "Product Categories & Tags",
    desc: "Organize your catalog with categories and tags so customers can find exactly what they need.",
  },
  {
    title: "Flexible Refund Policies",
    desc: "Choose from 1-day to 30-day refund windows — or offer no-refund on specific products.",
  },
  {
    title: "Admin Dashboard",
    desc: "Manage your products, orders, and store settings from a powerful built-in dashboard.",
  },
  {
    title: "Star Ratings & Reviews",
    desc: "Build trust with customers through verified ratings on every product you sell.",
  },
  {
    title: "Mobile Friendly",
    desc: "Storefronts look great on every screen — desktop, tablet, and mobile out of the box.",
  },
];

export default function FeaturesPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-4">Features</h1>
      <p className="text-lg text-muted-foreground mb-12">
        Everything you need to sell online — built into one simple platform.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f) => (
          <div key={f.title} className="border rounded-xl p-6 bg-white hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
            <p className="text-muted-foreground text-sm">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
