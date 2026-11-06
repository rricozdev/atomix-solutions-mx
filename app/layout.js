import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SiteFooter from "./components/site-footer";
import SiteHeader from "./components/site-header";
import WhatsAppFloat from "./components/whatsapp-float";
import GsapAnimations from "./components/gsap-animations";
import QuoteCart from "./components/quote-cart";
import { QuoteCartProvider } from "./components/quote-cart-context";
import { createPageMetadata } from "../data/seo";
import { SITE_URL } from "../data/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const homeMetadata = createPageMetadata({
  title: "Tapas y complementos para envasado",
  description:
    "Tapas, atomizadores, triggers y bombas dosificadoras para envases. Encuentra la solución ideal para tu producto con envíos a todo México.",
  path: "/",
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Atomix Solutions | Tapas y complementos para envasado",
    template: "%s | Atomix Solutions",
  },
  description: homeMetadata.description,
  alternates: homeMetadata.alternates,
  applicationName: "Atomix Solutions",
  publisher: "Atomix Solutions",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: homeMetadata.openGraph,
  twitter: homeMetadata.twitter,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="es-MX"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <QuoteCartProvider>
          <a className="skip-link" href="#main">Saltar al contenido</a>
          <SiteHeader />
          <GsapAnimations>
            {children}
            <SiteFooter />
          </GsapAnimations>
          <WhatsAppFloat />
          <QuoteCart />
        </QuoteCartProvider>
      </body>
    </html>
  );
}
