import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-stone-950 text-stone-100 min-h-screen`}
        >
          {/* Tribal Pattern Header */}
          <div className="h-1 bg-gradient-to-r from-orange-600 via-yellow-500 to-orange-600" />
          
          <nav className="bg-stone-900/95 backdrop-blur border-b border-stone-800 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16 items-center">
                <Link href="/" className="flex items-center space-x-3 group">
                  {/* Torch Icon */}
                  <div className="relative">
                    <div className="w-8 h-10 bg-gradient-to-t from-orange-700 via-orange-500 to-yellow-400 rounded-full animate-pulse" />
                    <div className="absolute inset-0 w-8 h-10 bg-gradient-to-t from-orange-600 via-orange-400 to-yellow-300 rounded-full blur-sm" />
                  </div>
                  <div>
                    <span className="text-xl font-black tracking-wider text-orange-500 group-hover:text-orange-400 transition">
                      SURVIVOR
                    </span>
                    <span className="text-sm font-bold text-stone-400 ml-2">50 FANTASY</span>
                  </div>
                </Link>
                
                <div className="flex items-center space-x-4">
                  <SignedOut>
                    <SignInButton mode="modal">
                      <button className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-600 px-5 py-2 rounded-lg font-bold tracking-wide transition shadow-lg shadow-orange-900/50">
                        SIGN IN
                      </button>
                    </SignInButton>
                  </SignedOut>
                  <SignedIn>
                    <Link href="/dashboard" className="text-stone-300 hover:text-orange-400 transition font-medium">
                      DASHBOARD
                    </Link>
                    <UserButton afterSignOutUrl="/" />
                  </SignedIn>
                </div>
              </div>
            </div>
          </nav>
          
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          
          {/* Footer with tribal pattern */}
          <footer className="bg-stone-900 border-t border-stone-800 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-stone-500 text-sm">
                  Survivor 50 Fantasy League • Not affiliated with CBS or Survivor
                </p>
                <div className="flex items-center gap-2 mt-4 md:mt-0">
                  <span className="text-stone-600 text-xs tracking-widest">OUTWIT • OUTPLAY • OUTLAST</span>
                </div>
              </div>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
