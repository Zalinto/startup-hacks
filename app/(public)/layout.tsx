import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
  variable: "--font-dmSans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <nav className="fixed w-screen z-20">
        <div className="max-w-7xl mx-auto px-4 w-full flex justify-between h-[64px] items-center">
          <a href="/" className="font-bold text-2xl flex items-center gap-4">
            <img src="/favicon.png" className="h-8 w-8" />
            Zeroto
          </a>
          <div className="flex gap-4 items-center">
            <SignedIn>
              <Button asChild>
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
              <div className="w-[28px] h-[28px] hover:cursor-pointer">
                <UserButton />
              </div>
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal" fallbackRedirectUrl={"/dashboard"}>
                <Button className="cursor-pointer">Sign In</Button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </nav>
      {children}
    </>
  );
}
