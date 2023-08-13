import './globals.css'
import type { Metadata } from 'next'
import {Urbanist} from 'next/font/google'
import Footer from "@/components/ui/footer";
import Navbar from "@/components/navbar/navbar";
import ToastProvider from "@/providers/toas-provider";
import ModalProvider from "@/providers/modal-provider";
import LoginModal from "@/components/modals/login-modal";
import RegisterModal from "@/components/modals/register-modal";

const urbanist = Urbanist({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'A-Store',
  description: 'The best e-commerce project',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={urbanist.className}>
        <ToastProvider />
        <LoginModal />
        <RegisterModal />
        <ModalProvider />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}