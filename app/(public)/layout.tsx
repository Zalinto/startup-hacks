import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <nav className="flex justify-between px-4 py-3 fixed top-0 left-0 w-full items-center">
        <h3 className="font-bold text-lg">Startup Hacks</h3>
        <div className="flex gap-4 items-center">
          <SignedIn>
            <Button asChild>
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
            <div className="w-[28px] h-[28px]">
              <UserButton />
            </div>
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal" fallbackRedirectUrl={"/dashboard"}>
              <Button>Sign In</Button>
            </SignInButton>
          </SignedOut>
        </div>
      </nav>
      <div className="h-[62px]" />
      {children}
    </>
  );
}
