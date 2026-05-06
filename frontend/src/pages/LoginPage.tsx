import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { Button, Input, Card } from '../components';
import { useAuthStore } from '../stores/authStore';

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-4">
      {/* Construction Worker Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute bottom-0 right-0 w-96 h-96">
          <div className="text-9xl">👷</div>
        </div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-3xl">✅</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">SafeCheck</h1>
          <p className="text-white text-opacity-90">Checklists e Relatórios</p>
        </div>

        {/* Welcome Card */}
        <Card className="mb-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Bem-vindo de volta!</h2>
            <p className="text-gray-600">Faça login para continuar</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              icon={<Mail size={18} />}
              type="email"
              placeholder="E-mail ou usuário"
              label="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              icon={<Lock size={18} />}
              type="password"
              placeholder="Senha"
              label="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4 rounded" />
                <span className="text-gray-600">Lembrar-me</span>
              </label>
              <button type="button" className="text-primary hover:underline font-medium">
                Esqueci minha senha
              </button>
            </div>

            <Button fullWidth loading={loading} type="submit">
              Entrar
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">ou continue com</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" size="md">
              <span className="text-xl">🔵</span> Google
            </Button>
            <Button variant="outline" size="md">
              <span className="text-xl">🪟</span> Microsoft
            </Button>
          </div>

          <div className="mt-6 text-center text-sm text-gray-600">
            Não tem uma conta?{' '}
            <button className="text-primary hover:underline font-medium">Cadastre-se</button>
          </div>
        </Card>

        {/* Footer */}
        <p className="text-center text-white text-opacity-80 text-sm">
          Mais segurança, mais eficiência.
        </p>
      </div>
    </div>
  );
}
