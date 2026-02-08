import type { Metadata } from "next";
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import "./globals.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Survivor 50 Fantasy League | Outwit, Outplay, Outlast",
  description: "Draft survivors, predict eliminations, and compete to be the Sole Survivor in the ultimate fantasy league experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="min-h-screen" style={{ backgroundColor: "#1a3d3f", fontFamily: "'Inter', sans-serif" }}>
          {/* Top accent bar */}
          <div className="h-1 bg-gradient-to-r from-[#d97839] via-[#f5c542] to-[#d97839]" />

          {/* Navigation */}
          <nav className="bg-[#2c3e3f] border-b-2 border-[#8b6f47] sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex items-center justify-between h-14">
                <Link href="/" className="flex items-center gap-3 group">
                  <div className="relative">
                    <div className="bg-[#2c3e3f] border-4 border-[#d97839] rounded-full w-10 h-10 flex items-center justify-center shadow-lg">
                      <span className="text-lg font-bold text-[#f5f1e8]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                        50
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="text-lg font-bold text-[#d97839] group-hover:text-[#f5c542] transition tracking-wider" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                      SURVIVOR
                    </span>
                    <span className="text-xs font-semibold text-[#c4b59a] ml-2 tracking-widest" style={{ fontFamily: "'Teko', sans-serif" }}>
                      FANTASY
                    </span>
                  </div>
                </Link>

                <div className="flex items-center gap-4">
                  <Link href="/dashboard" className="text-[#f5f1e8] hover:text-[#d97839] font-bold transition-colors hidden sm:block" style={{ fontFamily: "'Teko', sans-serif", fontSize: "18px" }}>
                    DASHBOARD
                  </Link>
                  <Link href="/vote" className="text-[#f5f1e8] hover:text-[#d97839] font-bold transition-colors hidden sm:block" style={{ fontFamily: "'Teko', sans-serif", fontSize: "18px" }}>
                    VOTE
                  </Link>
                  <Link href="/rank" className="text-[#f5f1e8] hover:text-[#d97839] font-bold transition-colors hidden sm:block" style={{ fontFamily: "'Teko', sans-serif", fontSize: "18px" }}>
                    STANDINGS
                  </Link>

                  <SignedOut>
                    <SignInButton mode="modal">
                      <button className="bg-[#d97839] hover:bg-[#c26830] text-white px-5 py-2 font-bold shadow-lg border-2 border-[#8b3a1a] transition" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.05em" }}>
                        SIGN IN
                      </button>
                    </SignInButton>
                  </SignedOut>
                  <SignedIn>
                    <UserButton afterSignOutUrl="/" />
                  </SignedIn>
                </div>
              </div>
            </div>
          </nav>

          {children}

          {/* Footer */}
          <footer className="bg-[#2c3e3f] border-t-4 border-[#8b6f47] mt-12 py-8">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <p className="text-[#c4b59a] text-sm">SURVIVOR 50 FANTASY LEAGUE &copy; 2026</p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
