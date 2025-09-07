import Link from "next/link";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});

export function Footer() {
  return (
    <footer className="border-t font-medium bg-white">
      <div className="max-w-screen-lg mx-auto flex gap-x-2 items-center h-full px-4 py-6 lg:px-12">
        <p>Powered by </p>
        <Link href="/">
          <span className={cn("text-2xl font-semibold", poppins.className)}>
            funroad
          </span>
        </Link>
      </div>
    </footer>
  );
}
