import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
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
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "FPS Error Code Reference",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <footer className="border-t border-border py-6 mt-auto">
              <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <p className="text-center text-sm text-muted-foreground">
                  FPS Error Code Reference. Data sourced from Pay.UK and UK
                  banking documentation.
                </p>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
