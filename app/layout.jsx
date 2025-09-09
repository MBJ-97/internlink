import { DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const dm_sans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "InternLink - Trouvez Votre Stage Idéal",
  description: "InternLink est une plateforme qui connecte les étudiants avec des opportunités de stage.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${dm_sans.variable} antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
