export const dynamic = "force-dynamic";
import SignInView from "@/modules/auth/ui/views/sign-in-views";
import { caller } from "@/trpc/server";
import { redirect } from "next/navigation";


export default async function page() {
  const session = await caller.auth.session();
  if (session.user) redirect("/");
  return <SignInView />;
}
