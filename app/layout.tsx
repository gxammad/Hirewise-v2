import "./globals.css";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Hirewise",
  description: "AI-powered hiring platform",
  keywords: "AI, hiring, recruitment, job postings, candidate management",
  icons: {
    icon: "/favicon.ico", // Reference favicon
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={true}>
          <Navbar />
          {children}
          <Footer />
          <Toaster position="top-center" />
          <ToastContainer />
        </ThemeProvider>
      </body>
    </html>
  );
}