import type { Metadata } from "next";
import { Cairo, El_Messiri } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const elMessiri = El_Messiri({
  subsets: ["arabic", "latin"],
  weight: ["600", "700"],
  display: "swap",
  variable: "--font-logo-face",
});

export const metadata: Metadata = {
  title: "بيسكويك — لحظات حلوة تبدأ من هنا",
  description:
    "اكتشف المزيج المثالي من المذاق والطزاجة مع مخبوزاتنا المحضرة يدوياً يومياً — كيك، كرواسون، كب كيك، تارت والمزيد.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.className} ${elMessiri.variable} bg-surface text-ink antialiased`}>
        {children}
      </body>
    </html>
  );
}
