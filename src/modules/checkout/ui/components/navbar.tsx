import Link from "next/link";

import { Button } from "@/components/ui/button";

type Prop = {
  slug: string;
};
export function Navbar({ slug }: Prop) {
  return (
    <nav className="h-20 border-b font-medium bg-white">
      <div className="max-w-screen-lg mx-auto flex justify-between items-center h-full px-4 lg:px-12">
        <p className="text-xl">Checkout</p>
        <Button variant={"elevated"} asChild className="border">
          <Link href={`/tenants/${slug}`}>Continue Shopping</Link>
        </Button>
      </div>
    </nav>
  );
}
// export function NavbarSkeleton() {
//   return (
//     <nav className="h-20 border-b font-medium bg-white">
//       <div className="max-w-screen-lg mx-auto flex gap-x-1 items-center h-full px-4 lg:px-12">
//         <div></div>

//         {/* // TODO :: Skeleton for checkout button */}
//       </div>
//     </nav>
//   );
// }
