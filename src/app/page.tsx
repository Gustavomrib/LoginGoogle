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
          <Loader className="w-10 h-10 animate-spin mx-auto text-blue-500" />
          <p className="text-slate-500 text-sm">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Hero Section */}
        <div className="text-center mb-20 space-y-8 animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Autenticação Moderna
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tight">
            Autenticação
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400">
              Segura & Rápida
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            OAuth 2.0 com Google + cadastro de usuários com geração automática de dados em JSON
          </p>

          {!user && (
            <div className="pt-2">
              <LoginButton />
            </div>
          )}
        </div>

        {/* Features Grid - Unauthenticated */}
        {!user && (
          <div className="grid sm:grid-cols-3 gap-5 mb-20 animate-slide-up">
            {[
              {
                icon: Lock,
                title: 'OAuth 2.0 Seguro',
                description: 'Autenticação segura via Firebase e Google'
              },
              {
                icon: FileText,
                title: 'Dados Estruturados',
                description: 'Geração automática de JSON com seus dados'
              },
              {
                icon: Shield,
                title: 'Criptografia',
                description: 'Proteção de ponta a ponta em toda comunicação'
              }
            ].map((feature, idx) => (
              <div key={idx} className="card group">
                <div className="mb-4 p-2.5 w-fit rounded-lg bg-blue-500/10 group-hover:bg-blue-500/15 transition-colors duration-200">
                  <feature.icon className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="font-semibold text-white mb-1.5">{feature.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Authenticated Content */}
        {user && (
          <div className="space-y-8 mb-20">
            {/* Welcome Card */}
            <div className="card-glass animate-fade-in">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                  <p className="text-xs font-semibold text-blue-400 uppercase tracking-widest mb-1">Bem-vindo de volta</p>
                  <h2 className="text-2xl md:text-3xl font-bold text-white">{user.name}</h2>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/25 text-green-300 text-xs font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  Autenticado
                </span>
              </div>
              <UserProfile />
            </div>

            {/* Action Cards */}
            <div className="grid sm:grid-cols-2 gap-5">
              <Link href="/apresentacao" className="group card overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[inherit]" />
                <div className="relative space-y-3">
                  <div className="p-2.5 w-fit rounded-lg bg-blue-500/10">
                    <Users className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Apresentação da Dupla</h3>
                  <p className="text-slate-500 text-sm">Conheça as habilidades e informações dos membros da equipe</p>
                  <div className="inline-flex items-center gap-1.5 text-blue-400 text-sm font-medium group-hover:gap-2.5 transition-all duration-200">
                    Ver mais <span>→</span>
                  </div>
                </div>
              </Link>

              <Link href="/cadastro" className="group card overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[inherit]" />
                <div className="relative space-y-3">
                  <div className="p-2.5 w-fit rounded-lg bg-violet-500/10">
                    <FileText className="w-5 h-5 text-violet-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">Cadastro de Usuário</h3>
                  <p className="text-slate-500 text-sm">Preencha o formulário e gere seu arquivo JSON automaticamente</p>
                  <div className="inline-flex items-center gap-1.5 text-violet-400 text-sm font-medium group-hover:gap-2.5 transition-all duration-200">
                    Acessar <span>→</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        )}

        {/* How it Works */}
        <div className="pt-16 border-t border-white/[0.06] mb-16">
          <div className="text-center mb-12 space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold text-white">Como Funciona?</h2>
            <p className="text-slate-500 max-w-xl mx-auto text-sm">
              Três passos simples para autenticação e cadastro
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 relative">
            {/* Connector lines */}
            <div aria-hidden="true" className="hidden sm:block absolute top-10 left-[calc(33%+1rem)] right-[calc(33%+1rem)] h-px bg-gradient-to-r from-blue-500/40 via-violet-500/40 to-transparent" />

            {[
              { step: 1, title: 'Login Seguro', description: 'Autentique com sua conta Google usando OAuth 2.0', icon: Lock },
              { step: 2, title: 'Visualize Perfil', description: 'Acesse seus dados e informações da dupla', icon: Users },
              { step: 3, title: 'Exporte Dados', description: 'Gere e baixe seu arquivo JSON formatado', icon: FileText }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="card text-center relative z-10">
                  <div className="flex items-center justify-center w-10 h-10 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 text-white font-bold text-sm shadow-lg shadow-blue-500/20">
                    {item.step}
                  </div>
                  <Icon className="w-6 h-6 mx-auto mb-3 text-slate-400" />
                  <h3 className="font-semibold text-white mb-1.5">{item.title}</h3>
                  <p className="text-slate-500 text-sm">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="card">
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-lg bg-green-500/10 flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Dados Pré-preenchidos</h3>
                <p className="text-slate-500 text-sm leading-relaxed">Suas informações do Google são carregadas automaticamente no formulário</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-lg bg-cyan-500/10 flex-shrink-0">
                <Zap className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">Geração Instantânea</h3>
                <p className="text-slate-500 text-sm leading-relaxed">JSON gerado e disponível para cópia ou download em segundos</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
