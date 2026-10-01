import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { CurtainStage } from "@/components/curtain-stage";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { site } from "@/lib/site";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | ${site.city}`, template: `%s | ${site.name}` },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: site.name,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-AR" className={`${poppins.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <CurtainStage />
        <Footer />
      </body>
    </html>
  );
}
