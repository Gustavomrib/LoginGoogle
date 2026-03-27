import type { Metadata } from 'next';
import { AuthProvider } from '@/context/AuthContext';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'Auth Pro - Autenticação Google Segura',
  description: 'Aplicação web moderna com autenticação via Google e cadastro de usuários. Design SaaS profissional.',
  keywords: 'autenticação, google, react, next.js, firebase, oauth2, segurança',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen flex flex-col">
            <div className="flex-1">
              {children}
            </div>
            <Footer />
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
