import { useNavigate } from 'react-router-dom';
import { Layout, Card, Button } from '../components';
import { Building2, MapPin, ClipboardList, AlertTriangle, PieChart, ArrowRight } from 'lucide-react';

export function DashboardPage() {
  const navigate = useNavigate();

  // Mock data
  const stats = {
    companies: 12,
    units: 25,
    checklists: 18,
    non_conformities: 8,
    conformity_percentage: 78,
  };

  const recentChecklists = [
    {
      id: '1',
      name: 'NR-18 – Condições de Trabalho',
      unit: 'Obra Central - Torre A',
      date: '20/05/2025 08:30',
      status: 'Conforme',
      color: 'bg-green-100 text-green-800',
    },
    {
      id: '2',
      name: 'NR-35 – Trabalho em Altura',
      unit: 'Obra Central - Torre B',
      date: '19/05/2025 14:15',
      status: 'Não conforme',
      color: 'bg-red-100 text-red-800',
    },
    {
      id: '3',
      name: 'Cozinha Industrial',
      unit: 'Unidade 01 - Refeitório',
      date: '18/05/2025 10:20',
      status: 'Conforme com ressalvas',
      color: 'bg-yellow-100 text-yellow-800',
    },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Olá, Cristian! 👋</h1>
            <p className="text-gray-600">Bem-vindo ao SafeCheck</p>
          </div>
          <Button onClick={() => navigate('/checklists/new')}>
            <span>➕</span> Novo Checklist
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Empresas cadastradas</p>
                <p className="text-3xl font-bold text-primary mt-2">{stats.companies}</p>
              </div>
              <div className="p-3 bg-primary rounded-lg">
                <Building2 size={24} className="text-white" />
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Unidades cadastradas</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">{stats.units}</p>
              </div>
              <div className="p-3 bg-blue-500 rounded-lg">
                <MapPin size={24} className="text-white" />
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-amber-50 to-amber-100">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Checklists realizados</p>
                <p className="text-3xl font-bold text-amber-600 mt-2">{stats.checklists}</p>
              </div>
              <div className="p-3 bg-amber-500 rounded-lg">
                <ClipboardList size={24} className="text-white" />
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-red-50 to-red-100">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Não conformidades</p>
                <p className="text-3xl font-bold text-red-600 mt-2">{stats.non_conformities}</p>
              </div>
              <div className="p-3 bg-red-500 rounded-lg">
                <AlertTriangle size={24} className="text-white" />
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Conformidade média</p>
                <p className="text-3xl font-bold text-purple-600 mt-2">{stats.conformity_percentage}%</p>
              </div>
              <div className="p-3 bg-purple-500 rounded-lg">
                <PieChart size={24} className="text-white" />
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Conformidade Geral */}
          <Card className="lg:col-span-2">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Conformidade geral</h2>

            <div className="flex items-center gap-6">
              <div className="flex-shrink-0">
                <svg className="w-32 h-32" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#1e7e34"
                    strokeWidth="8"
                    strokeDasharray={`${78 * 2.83} ${100 * 2.83}`}
                    strokeDashoffset="0"
                    strokeLinecap="round"
                  />
                  <text x="50" y="55" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#1e7e34">
                    78%
                  </text>
                </svg>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                  <span className="text-gray-600">Conformes</span>
                  <span className="font-semibold">78% (140)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span className="text-gray-600">Não conformes</span>
                  <span className="font-semibold">15% (27)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-gray-600">Não aplicáveis</span>
                  <span className="font-semibold">7% (13)</span>
                </div>
              </div>
            </div>
          </Card>

          {/* CTA */}
          <Card className="bg-gradient-to-br from-primary to-secondary text-white flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-2">Começar inspeção</h3>
              <p className="text-white text-opacity-90 text-sm">
                Inicie uma nova inspeção selecionando a empresa, unidade e checklist
              </p>
            </div>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:bg-opacity-10 mt-4"
              onClick={() => navigate('/checklists/new')}
            >
              Iniciar <ArrowRight size={16} />
            </Button>
          </Card>
        </div>

        {/* Últimos Checklists */}
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Últimos checklists realizados</h2>
            <button className="text-primary hover:underline text-sm font-medium">Ver todos</button>
          </div>

          <div className="space-y-3">
            {recentChecklists.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div>
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-600">{item.unit}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    📅 {item.date}
                  </p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${item.color}`}>
                  {item.status}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Layout>
  );
}
