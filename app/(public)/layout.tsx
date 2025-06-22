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
      <nav className="fixed w-screen">
        <div className="max-w-7xl mx-auto px-4 w-full flex justify-between h-[64px] items-center">
          <a href="/" className="font-bold text-2xl">
            Zeroto
          </a>
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
        </div>
      </nav>
      {children}
    </>
  );
}
