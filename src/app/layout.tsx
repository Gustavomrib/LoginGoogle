import type { Metadata } from 'next';
import { AuthProvider } from '@/context/AuthContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'Auth Pro - Autenticação Google Segura',
  description: 'Aplicação web moderna com autenticação via Google e cadastro de usuários. Design SaaS profissional.',
  keywords: 'autenticação, google, react, next.js, firebase, oauth2, segurança',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-[#0f172a] min-h-screen antialiased">
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
