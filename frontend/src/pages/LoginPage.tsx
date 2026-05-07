import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Button, Input } from '../components';
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
    <div className="min-h-screen bg-gradient-to-b from-primary via-primary to-secondary flex flex-col">
      {/* Background Image */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Ctext x="20" y="80" font-size="60"%3E👷%3C/text%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between p-4 sm:p-6 relative z-10">
        {/* Header */}
        <div className="text-center pt-6 sm:pt-12">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl transform hover:scale-105 transition-transform duration-300">
            <span className="text-3xl sm:text-4xl">✅</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-2 tracking-tight">SafeCheck</h1>
          <p className="text-white text-opacity-90 text-sm sm:text-base font-medium">Checklists e Relatórios</p>
          <p className="text-white text-opacity-70 text-xs sm:text-sm mt-2">Mais segurança, mais eficiência.</p>
        </div>

        {/* Login Card */}
        <div className="w-full max-w-sm mx-auto mb-6 sm:mb-12 sm:-mt-8">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Card Header */}
            <div className="px-6 sm:px-8 pt-8 pb-6 text-center border-b border-gray-100">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Bem-vindo de volta!</h2>
              <p className="text-gray-600 text-sm">Faça login para continuar</p>
            </div>

            {/* Card Body */}
            <div className="px-6 sm:px-8 py-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">E-mail</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-3.5 text-primary" size={20} />
                    <input
                      type="email"
                      placeholder="E-mail ou usuário"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-0 transition-colors duration-200 text-base"
                      required
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Senha</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-3.5 text-primary" size={20} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Senha"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-0 transition-colors duration-200 text-base"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-3.5 text-gray-500 hover:text-primary transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-5 h-5 rounded border-2 border-gray-300 text-primary cursor-pointer accent-primary"
                    />
                    <span className="text-gray-700 font-medium">Lembrar-me</span>
                  </label>
                  <button type="button" className="text-primary hover:text-green-700 font-semibold transition-colors">
                    Esqueci minha senha
                  </button>
                </div>

                {/* Login Button */}
                <Button
                  fullWidth
                  loading={loading}
                  type="submit"
                  className="!py-3.5 !text-base !font-bold mt-6 shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Entrar
                </Button>
              </form>

              {/* Divider */}
              <div className="relative my-7">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-3 bg-white text-gray-500 text-xs font-medium uppercase tracking-wide">ou continue com</span>
                </div>
              </div>

              {/* Social Login Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 py-3 px-4 border-2 border-gray-200 rounded-xl hover:border-primary hover:bg-gray-50 transition-all duration-200 font-medium text-gray-700">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </button>
                <button className="flex items-center justify-center gap-2 py-3 px-4 border-2 border-gray-200 rounded-xl hover:border-primary hover:bg-gray-50 transition-all duration-200 font-medium text-gray-700">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M11.4 24H0V11.6h11.4V24zM5.7 4.8c1.9 0 3.4-1.5 3.4-3.4S7.6 0 5.7 0 2.3 1.5 2.3 3.4 3.8 4.8 5.7 4.8zM23.8 24h-11V17.3c0-1.6-.6-2.7-2-2.7-1.1 0-1.7.7-2 1.4-.1.2-.1.5-.1.7V24H0V11.6h11v1.5c1.2-1.9 3.4-4.6 8.3-4.6 6 0 10.5 4 10.5 12.6V24z"/>
                  </svg>
                  Microsoft
                </button>
              </div>

              {/* Sign Up Link */}
              <p className="text-center text-gray-700 text-sm mt-6 font-medium">
                Não tem uma conta?{' '}
                <button className="text-primary hover:text-green-700 font-bold transition-colors">
                  Cadastre-se
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Footer spacer for mobile */}
        <div className="h-4 sm:h-0" />
      </div>
    </div>
  );
}
