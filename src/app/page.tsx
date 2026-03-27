'use client';

import { useAuth } from '@/context/AuthContext';
import { LoginButton } from '@/components/LoginButton';
import { UserProfile } from '@/components/UserProfile';
import Link from 'next/link';
import { Loader, Lock, FileText, Users, Zap, Shield, CheckCircle } from 'lucide-react';

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <Loader className="w-14 h-14 animate-spin mx-auto text-blue-500" />
          <p className="text-slate-400 text-lg">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-6 animate-fade-in">
          <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/50">
            <p className="text-sm font-semibold text-blue-300">🚀 Autenticação Moderna</p>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">
            Autenticação
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Segura & Rápida
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Autenticação com Google OAuth 2.0 + cadastro de usuários com geração automática de dados em JSON
          </p>

          {!user && (
            <div className="pt-4">
              <LoginButton />
            </div>
          )}
        </div>

        {/* Features Grid - Before Auth */}
        {!user && (
          <div className="grid md:grid-cols-3 gap-6 mb-16 animate-slide-up">
            {[
              {
                icon: Lock,
                title: 'OAuth 2.0 Seguro',
                description: 'Autenticação segura com Firebase e Google'
              },
              {
                icon: FileText,
                title: 'Dados Estruturados',
                description: 'Geração automática de JSON com seus dados'
              },
              {
                icon: Shield,
                title: 'Protegido',
                description: 'Criptografia de ponta a ponta'
              }
            ].map((feature, idx) => (
              <div key={idx} className="card group">
                <div className="mb-4 p-3 w-fit rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-colors duration-300">
                  <feature.icon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="font-bold text-lg text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Main Content - After Auth */}
        {user && (
          <div className="space-y-12">
            {/* Welcome Card */}
            <div className="card-glass animate-fade-in">
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider">Bem-vindo de volta</p>
                    <h2 className="text-3xl md:text-4xl font-bold text-white">
                      {user.name}
                    </h2>
                  </div>
                  <div className="px-4 py-2 rounded-full bg-green-500/20 border border-green-500/50">
                    <span className="text-sm font-semibold text-green-300">✓ Autenticado</span>
                  </div>
                </div>

                <UserProfile />
              </div>
            </div>

            {/* Action Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Apresentação Card */}
              <Link href="/apresentacao" className="group card overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-300" />
                <div className="relative space-y-4">
                  <div className="p-3 w-fit rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20">
                    <Users className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Apresentação da Dupla</h3>
                  <p className="text-slate-400 text-sm mb-4">Conheça as informações e habilidades dos membros da equipe</p>
                  <div className="inline-flex items-center gap-2 text-blue-400 font-semibold text-sm group-hover:gap-3 transition-all">
                    Ver mais <span>→</span>
                  </div>
                </div>
              </Link>

              {/* Cadastro Card */}
              <Link href="/cadastro" className="group card overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-300" />
                <div className="relative space-y-4">
                  <div className="p-3 w-fit rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                    <FileText className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Cadastro de Usuário</h3>
                  <p className="text-slate-400 text-sm mb-4">Preencha o formulário e gere seu arquivo JSON automaticamente</p>
                  <div className="inline-flex items-center gap-2 text-purple-400 font-semibold text-sm group-hover:gap-3 transition-all">
                    Acessar <span>→</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        )}

        {/* How it Works Section */}
        <div className="mt-20 pt-20 border-t border-slate-700/50">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Como Funciona?</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Um processo simples em três passos para autenticação e cadastro
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                title: 'Login Seguro',
                description: 'Autentique com sua conta Google usando OAuth 2.0',
                icon: Lock
              },
              {
                step: 2,
                title: 'Visualize Perfil',
                description: 'Acesse seus dados e informações da dupla',
                icon: Users
              },
              {
                step: 3,
                title: 'Exporte Dados',
                description: 'Gere e baixe seu arquivo JSON formatado',
                icon: FileText
              }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="relative">
                  {/* Connector */}
                  {idx < 2 && (
                    <div className="hidden md:block absolute left-full top-12 w-full h-0.5 bg-gradient-to-r from-blue-500 to-transparent" />
                  )}

                  <div className="card text-center relative z-10">
                    <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
                      <span className="font-bold text-white text-lg">{item.step}</span>
                    </div>
                    <Icon className="w-8 h-8 mx-auto mb-4 text-blue-400" />
                    <h3 className="font-bold text-lg text-white mb-2">{item.title}</h3>
                    <p className="text-slate-400 text-sm">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Features Highlight */}
        <div className="mt-20 grid md:grid-cols-2 gap-8">
          <div className="card">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-green-500/20">
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
              <div>
                <h3 className="font-bold text-white mb-2">Dados Pré-preenchidos</h3>
                <p className="text-slate-400 text-sm">Suas informações do Google são carregadas automaticamente no formulário</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-cyan-500/20">
                <Zap className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h3 className="font-bold text-white mb-2">Geração Instantânea</h3>
                <p className="text-slate-400 text-sm">JSON é gerado e disponível para cópia ou download em segundos</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
