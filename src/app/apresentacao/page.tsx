'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Image from 'next/image';
import { Loader, Code2, Zap, Target, Users as UsersIcon, CheckCircle, Globe, Database } from 'lucide-react';

const TEAM_MEMBERS = [
  {
    name: 'Gustavo Marques Lopes Ribeiro',
    role: 'Desenvolvedor Full-Stack',
    photo: '/gustavo.jpg',  // Coloque a foto em public/gustavo.jpg
    description: 'Apaixonado por tecnologia e desenvolvimento de aplicações web modernas.',
    habilidades: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Firebase'],
    interesses: 'Web Development, Cloud Computing, UI/UX Design',
  },
  {
    name: 'Marco Antonio Brito Prado',
    role: 'Desenvolvedor Full-Stack',
    photo: '/marco.jpg',  // Coloque a foto em public/marco.jpg
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
        <Loader className="w-10 h-10 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm font-medium mb-2">
            <UsersIcon className="w-3.5 h-3.5" />
            Nossa Equipe
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-[1.1] tracking-tight">
            Conheça Nossa
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
              Equipe de Desenvolvimento
            </span>
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto text-base">
            Uma dupla de desenvolvedores Full-Stack apaixonados por soluções modernas e escaláveis
          </p>
        </div>

        {/* Team Members Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {TEAM_MEMBERS.map((member, index) => (
            <div
              key={index}
              className="group card overflow-hidden animate-slide-up"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              {/* Gradient Header */}
              <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-br from-blue-500/10 to-violet-500/5 group-hover:from-blue-500/15 group-hover:to-violet-500/10 transition-all duration-300" />

              <div className="relative z-10 space-y-5">
                {/* Avatar + Name */}
                <div className="flex items-center gap-4 pt-2">
                  {member.photo ? (
                    <Image
                      src={member.photo}
                      alt={member.name}
                      width={56}
                      height={56}
                      className="w-14 h-14 rounded-xl object-cover flex-shrink-0 shadow-lg shadow-blue-500/20 ring-2 ring-blue-500/30"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-xl flex-shrink-0 shadow-lg shadow-blue-500/20">
                      {member.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h2 className="text-xl font-bold text-white">{member.name}</h2>
                    <p className="text-blue-400 text-sm font-medium">{member.role}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-400 text-sm leading-relaxed">{member.description}</p>

                {/* Skills */}
                <div>
                  <h3 className="font-semibold text-white mb-2.5 flex items-center gap-2 text-sm">
                    <Code2 className="w-4 h-4 text-blue-400" />
                    Habilidades
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {member.habilidades.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-300 rounded-md text-xs font-medium hover:bg-blue-500/15 transition-colors duration-150"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Interests */}
                <div>
                  <h3 className="font-semibold text-white mb-1.5 flex items-center gap-2 text-sm">
                    <Zap className="w-4 h-4 text-amber-400" />
                    Interesses
                  </h3>
                  <p className="text-slate-500 text-sm">{member.interesses}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Info Section */}
        <div className="card-glass space-y-6 mb-12">
          <div className="text-center space-y-1.5 pb-2">
            <h2 className="text-2xl md:text-3xl font-bold text-white">Sobre o Projeto</h2>
            <p className="text-slate-500 text-sm">Uma visão geral do que desenvolvemos</p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {/* Objective */}
            <div className="p-5 rounded-xl bg-white/[0.02] border border-blue-500/15 hover:border-blue-500/30 transition-colors duration-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Target className="w-4 h-4 text-blue-400" />
                </div>
                <h3 className="font-semibold text-white">Objetivo</h3>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Desenvolver uma aplicação web completa com autenticação via Google, demonstrando expertise em React, Next.js, Firebase e boas práticas de desenvolvimento.
              </p>
            </div>

            {/* Technologies */}
            <div className="p-5 rounded-xl bg-white/[0.02] border border-violet-500/15 hover:border-violet-500/30 transition-colors duration-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-violet-500/10">
                  <Globe className="w-4 h-4 text-violet-400" />
                </div>
                <h3 className="font-semibold text-white">Stack Tecnológico</h3>
              </div>
              <ul className="space-y-1.5 text-slate-400 text-sm">
                {[
                  'Next.js 16+ (React Framework)',
                  'TypeScript para type safety',
                  'Tailwind CSS moderno',
                  'Firebase Authentication',
                  'Context API para estado',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Features List */}
          <div className="p-5 rounded-xl bg-white/[0.02] border border-cyan-500/15 hover:border-cyan-500/30 transition-colors duration-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-cyan-500/10">
                <Database className="w-4 h-4 text-cyan-400" />
              </div>
              <h3 className="font-semibold text-white">Features Implementadas</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-2 text-slate-400 text-sm">
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
                <div key={idx}>{feature}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-5">
          {[
            { label: 'Horas de Dev', value: '40+', icon: '⚡' },
            { label: 'Componentes', value: '12+', icon: '🎨' },
            { label: 'Funcionalidades', value: '8+', icon: '✨' }
          ].map((stat, idx) => (
            <div key={idx} className="card text-center group">
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-200">
                {stat.icon}
              </div>
              <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400 mb-1">
                {stat.value}
              </p>
              <p className="text-slate-500 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
