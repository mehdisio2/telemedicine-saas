import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MediConnect - Virtual Healthcare & Telemedicine Platform",
  description:
    "Book appointments with top healthcare professionals, access virtual consultations, and manage your health journey with MediConnect's secure telemedicine platform.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>

        {children}
      </body>
    </html>
  );
}
