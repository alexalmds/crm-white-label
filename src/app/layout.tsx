import QueryClientProvider from '@/components/Provider';
import type { Metadata } from "next";
import { QueryClient } from '@tanstack/react-query';
import { UserContextProvider } from '@/context/UserContext';
import { Inter } from "next/font/google";
import { NextUIProvider } from '@nextui-org/react';  // Importando o NextUIProvider
import "./globals.css";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { CompanyContextProvider } from '@/context/CompanyContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FinSolve CRM",
  description: "A plataforma de CRM completa para gestão de cobranças recorrentes e renegociações financeiras.",
  keywords: "crm, crm financeiro, crm cobrança recorrente, chatbot de cobrança, whatsapp cobrança, finsolve crm",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();

  return (
    <html lang="pt-Br">
      <body className={inter.className}>
        <QueryClientProvider>
          <NextUIProvider> {/* Envolvendo com NextUIProvider */}
            <NextThemesProvider attribute="class" defaultTheme="light">
              <CompanyContextProvider>
                <UserContextProvider>{children}</UserContextProvider>
              </CompanyContextProvider>
            </NextThemesProvider>
          </NextUIProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
