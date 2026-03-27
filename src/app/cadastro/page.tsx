'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Loader, Copy, Download, Check, FileJson, Shield, Zap } from 'lucide-react';

interface FormData {
  nome: string;
  email: string;
  telefone: string;
  cidade: string;
  profissao: string;
  bio: string;
}

export default function Cadastro() {
  const { user, loading, updateUserData } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    telefone: '',
    cidade: '',
    profissao: '',
    bio: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showJSON, setShowJSON] = useState(false);
  const [jsonData, setJsonData] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }

    if (user && !formData.nome) {
      setFormData(prev => ({
        ...prev,
        nome: user.name || '',
        email: user.email || '',
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const userData = {
        timestamp: new Date().toISOString(),
        usuario: {
          nome: formData.nome,
          email: formData.email,
          telefone: formData.telefone || 'Não informado',
          cidade: formData.cidade || 'Não informado',
          profissao: formData.profissao || 'Não informado',
          bio: formData.bio || 'Não informado',
        },
        autenticacao: {
          provider: 'Google',
          uid: user?.uid,
          fotoURL: user?.photoURL,
        },
        metadata: {
          navegador: typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown',
          idioma: typeof navigator !== 'undefined' ? navigator.language : 'Unknown',
        },
      };

      const formattedJSON = JSON.stringify(userData, null, 2);
      setJsonData(formattedJSON);
      setShowJSON(true);

      console.log('📊 Dados do Cadastro:', userData);

      updateUserData({
        telefone: formData.telefone,
      });

      setSubmitMessage('✅ Cadastro realizado com sucesso!');

      setTimeout(() => {
        setSubmitMessage('');
      }, 3000);
    } catch (error) {
      console.error('Erro ao processar cadastro:', error);
      setSubmitMessage('❌ Erro ao processar cadastro');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyJSON = async () => {
    try {
      await navigator.clipboard.writeText(jsonData);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Erro ao copiar:', error);
    }
  };

  const handleDownloadJSON = () => {
    const element = document.createElement('a');
    element.setAttribute?.(
      'href',
      `data:text/json;charset=utf-8,${encodeURIComponent(jsonData)}`
    );
    element.setAttribute('download', `cadastro-${new Date().getTime()}.json`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="w-10 h-10 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 space-y-4 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-medium mb-2">
            <FileJson className="w-3.5 h-3.5" />
            Formulário de Cadastro
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-[1.1] tracking-tight">
            Complete Seu
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
              Perfil de Usuário
            </span>
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto text-base">
            Preencha os dados e receba um arquivo JSON formatado automaticamente
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Form Section */}
          <div className="lg:col-span-2 animate-slide-up">
            <div className="card-glass">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nome */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-white">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    required
                    className="input-field"
                    placeholder="Seu nome"
                  />
                </div>

                {/* Email */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-white">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="input-field"
                    placeholder="seu.email@gmail.com"
                  />
                </div>

                {/* Telefone */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-slate-300">
                    Telefone (Opcional)
                  </label>
                  <input
                    type="tel"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="(11) 99999-9999"
                  />
                </div>

                {/* Cidade */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-slate-300">
                      Cidade (Opcional)
                    </label>
                    <input
                      type="text"
                      name="cidade"
                      value={formData.cidade}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder="São Paulo"
                    />
                  </div>

                  {/* Profissão */}
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-slate-300">
                      Profissão (Opcional)
                    </label>
                    <input
                      type="text"
                      name="profissao"
                      value={formData.profissao}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder="Desenvolvedor"
                    />
                  </div>
                </div>

                {/* Bio */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-slate-300">
                    Biografia (Opcional)
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows={4}
                    className="input-field resize-none"
                    placeholder="Conte-nos um pouco sobre você..."
                  />
                </div>

                {/* Submit Message */}
                {submitMessage && (
                  <div className={`p-4 rounded-lg text-sm font-semibold flex items-center gap-2 ${
                    submitMessage.includes('✅')
                      ? 'bg-green-500/20 text-green-300 border border-green-500/50'
                      : 'bg-red-500/20 text-red-300 border border-red-500/50'
                  }`}>
                    {submitMessage.includes('✅') ? (
                      <Check className="w-4 h-4" />
                    ) : null}
                    {submitMessage}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || !formData.nome || !formData.email}
                  className="btn-primary w-full py-3 text-base disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      <span>Processando...</span>
                    </>
                  ) : (
                    <>
                      <FileJson className="w-5 h-5" />
                      <span>Gerar Cadastro</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6 animate-slide-down">
            {/* Info Card */}
            <div className="card space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/20">
                  <Zap className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="font-bold text-white text-lg">Dicas Úteis</h3>
              </div>
              <ul className="space-y-3 text-sm text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 font-bold mt-1">•</span>
                  <span>Dados do Google aparecem automaticamente</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 font-bold mt-1">•</span>
                  <span>Campos opcionais podem ser deixados em branco</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 font-bold mt-1">•</span>
                  <span>JSON será gerado ao submeter</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 font-bold mt-1">•</span>
                  <span>Você pode copiar ou baixar o JSON</span>
                </li>
              </ul>
            </div>

            {/* Privacy Card */}
            <div className="card space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/20">
                  <Shield className="w-5 h-5 text-green-400" />
                </div>
                <h3 className="font-bold text-white text-lg">Segurança</h3>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Seus dados não são armazenados em servidores. O JSON é processado localmente no seu navegador.
              </p>
            </div>
          </div>
        </div>

        {/* JSON Output Section */}
        {showJSON && (
          <div className="card-glass mt-12 space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/20">
                  <FileJson className="w-6 h-6 text-green-400" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">Seu JSON Gerado</h2>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleCopyJSON}
                className="btn-secondary flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copiar</span>
                  </>
                )}
              </button>
              <button
                onClick={handleDownloadJSON}
                className="btn-primary flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
            </div>

            {/* JSON Display */}
            <div className="overflow-x-auto rounded-lg border border-slate-700">
              <pre className="bg-slate-900 text-green-400 p-6 font-mono text-sm leading-relaxed">
                {jsonData}
              </pre>
            </div>

            {/* Console Tip */}
            <div className="p-4 rounded-lg bg-slate-400/5 border border-slate-700">
              <p className="text-sm text-slate-400">
                💡 <strong className="text-slate-300">Dica:</strong> Abra o console do navegador (F12) para ver os dados formatados também.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
