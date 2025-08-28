"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";

interface NavbarItemProps {
  href: string;
  children: React.ReactNode;
}
interface Props {
  items: NavbarItemProps[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
export const NavbarSidebar = ({ items, open, onOpenChange }: Props) => {
  const trpc = useTRPC();
  const session = useQuery(trpc.auth.session.queryOptions());

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="p-0 transition-none">
        <SheetHeader className="p-4 border-b">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-full overflow-y-auto pb-2">
          <div className="flex flex-col ">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => onOpenChange(false)}
                className="w-full text-left p-4 hover:bg-black hover:text-white text-base font-medium"
              >
                {item.children}
              </Link>
            ))}

            {!session.data?.user ? (
              <div className="border-t flex flex-col">
                <Link
                  onClick={() => onOpenChange(false)}
                  href="sign-in"
                  className="w-full text-left p-4 hover:bg-black hover:text-white text-base font-medium"
                >
                  Sign in
                </Link>
                <Link
                  onClick={() => onOpenChange(false)}
                  href="sign-up"
                  className="w-full text-left p-4 hover:bg-black hover:text-white text-base font-medium"
                >
                  Start Selling
                </Link>
              </div>
            ) : (
              <div className="border-t flex flex-col">
                <Link
                  onClick={() => onOpenChange(false)}
                  href="/admin"
                  className="w-full text-left p-4 hover:bg-black hover:text-white text-base font-medium"
                >
                  Dashboard
                </Link>
              </div>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
