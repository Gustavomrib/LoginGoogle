'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader, Code2, Zap, Target, Users as UsersIcon, CheckCircle, Globe, Database } from 'lucide-react';

const TEAM_MEMBERS = [
  {
    name: 'Seu Nome Aqui',
    role: 'Desenvolvedor Full-Stack',
    description: 'Apaixonado por tecnologia e desenvolvimento de aplicações web modernas.',
    habilidades: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Firebase'],
    interesses: 'Web Development, Cloud Computing, UI/UX Design',
  },
  {
    name: 'Marco antonio',
    role: 'Desenvolvedor Full-Stack',
    description: 'Especialista em soluções escaláveis e arquitetura de software.',
    habilidades: ['React', 'TypeScript', 'Database Design', 'DevOps', 'Testing'],
    interesses: 'Backend Development, System Design, API Development',
  },
];

export default function Apresentacao() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="w-14 h-14 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen pt-20 pb-12">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-6 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-black text-white leading-tight">
            Conheça Nossa
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Equipe de Desenvolvimento
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Uma dupla de desenvolvedores Full-Stack apaixonados por criar soluções modernas e escaláveis
          </p>
        </div>

        {/* Team Members Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {TEAM_MEMBERS.map((member, index) => (
            <div key={index} className="group animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="card h-full relative overflow-hidden">
                {/* Gradient Header */}
                <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-300" />

                {/* Content */}
                <div className="relative z-10 space-y-6">
                  {/* Avatar Section */}
                  <div className="flex items-end gap-4 pt-4">
                    <div className="pt-2">
                      <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-2xl ring-2 ring-slate-700 group-hover:ring-blue-500/50 transition-all duration-300">
                        👤
                      </div>
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl md:text-2xl font-bold text-white">
                        {member.name}
                      </h2>
                      <p className="text-blue-400 font-semibold text-sm">{member.role}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-400 leading-relaxed">
                    {member.description}
                  </p>

                  {/* Skills */}
                  <div>
                    <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                      <Code2 className="w-4 h-4 text-blue-400" />
                      Habilidades
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {member.habilidades.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 border border-blue-500/30 text-blue-300 rounded-full text-xs font-semibold transition-all duration-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Interests */}
                  <div>
                    <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-400" />
                      Interesses
                    </h3>
                    <p className="text-slate-400 text-sm">{member.interesses}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Info Section */}
        <div className="card-glass space-y-8 mb-16">
          <div className="text-center space-y-2 mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Sobre o Projeto</h2>
            <p className="text-slate-400">Uma visão geral do que desenvolvemos</p>
          </div>

          {/* Objective & Tech Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Objective */}
            <div className="space-y-4 p-6 rounded-xl bg-slate-400/5 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/20">
                  <Target className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-lg font-bold text-white">Objetivo</h3>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Desenvolver uma aplicação web completa com autenticação via Google, demonstrando expertise em React, Next.js, Firebase e boas práticas de desenvolvimento.
              </p>
            </div>

            {/* Technologies */}
            <div className="space-y-4 p-6 rounded-xl bg-slate-400/5 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/20">
                  <Globe className="w-5 h-5 text-purple-400" />
                </div>
                <h3 className="text-lg font-bold text-white">Stack Tecnológico</h3>
              </div>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Next.js 16+ (React Framework)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  TypeScript para type safety
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Tailwind CSS moderno
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Firebase Authentication
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  Context API para estado
                </li>
              </ul>
            </div>
          </div>

          {/* Features List */}
          <div className="space-y-4 p-6 rounded-xl bg-slate-400/5 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-cyan-500/20">
                <Database className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-lg font-bold text-white">Features Implementadas</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4 text-slate-400 text-sm">
              {[
                '✅ Autenticação com Google OAuth',
                '✅ Proteção de rotas (Private Routes)',
                '✅ Context API para estado global',
                '✅ Cadastro completo de usuário',
                '✅ Apresentação animada da dupla',
                '✅ Geração automática de JSON',
                '✅ Design 100% responsivo',
                '✅ Animações e microinterações',
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { label: 'Horas de Dev', value: '40+', icon: '⚡' },
            { label: 'Componentes', value: '12+', icon: '🎨' },
            { label: 'Funcionalidades', value: '8+', icon: '✨' }
          ].map((stat, idx) => (
            <div key={idx} className="card text-center group">
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-2">
                {stat.value}
              </p>
              <p className="text-slate-400 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
