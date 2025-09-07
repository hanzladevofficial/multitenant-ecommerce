import { Footer } from "@/modules/tenants/ui/components/footer";
import { Navbar } from "@/modules/tenants/ui/components/navbar";

type Props = {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
};

export default async function layout({ children, params }: Props) {
  const { slug } = await params;
  return (
    <div className="min-h-screen bg-[#F4F4F0] flex flex-col">
      <Navbar tenantName={slug} />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </div>
  );
}
