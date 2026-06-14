import type { Metadata } from "next";
import Link from "next/link";
import { Inter } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { CommandPaletteProvider } from "@/components/CommandPaletteProvider";
import { CommandPalette } from "@/components/CommandPalette";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fpserrorcodes.co.uk"),
  title: {
    default: "FPS Error Code Reference | Payment Status Decoder",
    template: "%s | FPS Error Codes",
  },
  description:
    "Decode Faster Payments Scheme (FPS) error codes. Search UK bank transfer rejection and return codes with plain English explanations and fixes.",
  keywords: [
    "FPS error codes",
    "Faster Payments",
    "UK bank transfer",
    "payment rejection",
    "return codes",
  ],
  authors: [{ name: "Payment Status Decoder" }],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "FPS Codes",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "FPS Error Code Reference",
  },
  twitter: {
    card: "summary_large_image",
  },
  verification: {
    google: "rB4hto97qPTThq6CbsTf6yUdkAFPNuaK-KvJw3saFwc",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#0a0a0a" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body
        className={`${inter.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CommandPaletteProvider>
            <div className="relative min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <CommandPalette />
              <footer className="border-t border-border py-8 mt-auto">
              <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <nav
                  aria-label="Footer"
                  className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm"
                >
                  <Link
                    href="/what-is-fps"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    What is FPS?
                  </Link>
                  <Link
                    href="/faq"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    FAQ
                  </Link>
                  <Link
                    href="/glossary"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Glossary
                  </Link>
                  <Link
                    href="/developers"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Developers
                  </Link>
                  <Link
                    href="/references"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    References
                  </Link>
                </nav>
                <p className="mt-6 text-center text-sm text-muted-foreground">
                  FPS Error Code Reference. Data sourced from Pay.UK and UK
                  banking documentation.
                </p>
              </div>
              </footer>
            </div>
          </CommandPaletteProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
