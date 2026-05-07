import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-primary via-primary to-secondary flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        backgroundImage: 'linear-gradient(to bottom, #1e7e34, #1e7e34, #059669)',
      }}
    >
      {/* Background Construction Worker - positioned right bottom */}
      <div className="absolute bottom-0 right-0 opacity-10 pointer-events-none text-[400px] md:text-[600px] leading-none">
        👷
      </div>

      {/* Main Content */}
      <div className="w-full max-w-sm relative z-10">
        {/* Top Header Section */}
        <div className="text-center mb-12">
          {/* Logo Shield */}
          <div className="w-24 h-24 bg-gradient-to-br from-primary to-green-800 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg relative">
            {/* Shield icon SVG */}
            <svg viewBox="0 0 24 24" className="w-14 h-14 text-white" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 1L3 5v7c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" fill="white" stroke="none"/>
              <path d="M10 13l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {/* Brand Text */}
          <h1 className="text-5xl font-black text-gray-900 mb-2">SafeCheck</h1>
          <p className="text-gray-700 text-lg font-medium">Checklists e Relatórios</p>
          <p className="text-gray-600 text-sm mt-3">Mais segurança, mais eficiência.</p>
          <p className="text-gray-600 text-sm">Gerencie inspeções, gere relatórios</p>
          <p className="text-gray-600 text-sm">e garanta conformidade.</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Card Header */}
          <div className="px-6 sm:px-8 pt-8 pb-6 text-center border-b border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Bem-vindo de volta!</h2>
            <p className="text-gray-500 text-sm">Faça login para continuar</p>
          </div>

          {/* Card Content */}
          <div className="px-6 sm:px-8 py-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">E-mail</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={18} />
                  <input
                    type="email"
                    placeholder="E-mail ou usuário"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary transition-colors text-base"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Senha</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={18} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary transition-colors text-base"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Remember & Forgot Password */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-2 border-gray-300 accent-primary cursor-pointer"
                  />
                  <span className="text-gray-600">Lembrar-me</span>
                </label>
                <button type="button" className="text-primary hover:text-green-700 font-semibold transition-colors">
                  Esqueci minha senha
                </button>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-green-700 text-white font-bold py-3.5 rounded-xl transition-colors duration-200 disabled:bg-gray-400 mt-6"
              >
                {loading ? '⏳ Entrando...' : 'Entrar'}
              </button>
            </form>

            {/* Divider */}
            <div className="my-7 flex items-center gap-3">
              <div className="flex-1 border-t border-gray-200"></div>
              <span className="text-gray-500 text-xs font-medium">ou continue com</span>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 py-3 px-4 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-gray-50 transition-all font-medium text-gray-700">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </button>
              <button className="flex items-center justify-center gap-2 py-3 px-4 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-gray-50 transition-all font-medium text-gray-700">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M11.4 24H0V11.6h11.4V24zM5.7 4.8c1.9 0 3.4-1.5 3.4-3.4S7.6 0 5.7 0 2.3 1.5 2.3 3.4 3.8 4.8 5.7 4.8zM23.8 24h-11V17.3c0-1.6-.6-2.7-2-2.7-1.1 0-1.7.7-2 1.4-.1.2-.1.5-.1.7V24H0V11.6h11v1.5c1.2-1.9 3.4-4.6 8.3-4.6 6 0 10.5 4 10.5 12.6V24z"/>
                </svg>
                Microsoft
              </button>
            </div>

            {/* Sign Up Link */}
            <p className="text-center text-gray-600 text-sm font-medium mt-6">
              Não tem uma conta?{' '}
              <button type="button" className="text-primary hover:text-green-700 font-bold transition-colors">
                Cadastre-se
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
