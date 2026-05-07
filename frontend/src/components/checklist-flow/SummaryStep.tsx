import { useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, Circle } from 'lucide-react';
import { Button } from '../Button';

interface SummarySummaryStepProps {
  state: any;
}

export function SummaryStep({ state }: SummarySummaryStepProps) {
  const navigate = useNavigate();

  const conformeCount = state.items.filter((i: any) => i.status === 'conforme').length;
  const naoConformeCount = state.items.filter((i: any) => i.status === 'nao-conforme').length;
  const naoAplicavelCount = state.items.filter((i: any) => i.status === 'nao-aplicavel').length;
  const totalItems = state.items.length;
  const conformePercentage = Math.round((conformeCount / totalItems) * 100);

  const statusColor = {
    conforme: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-900' },
    'nao-conforme': { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-900' },
    'nao-aplicavel': { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-900' },
  };

  const getStatusColor = (status: string) => statusColor[status as keyof typeof statusColor] || statusColor.conforme;

  return (
    <div className="space-y-8">
      {/* Overall Result */}
      <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-lg p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="6" />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#16a34a"
                strokeWidth="6"
                strokeDasharray={`${conformePercentage * 2.83} ${100 * 2.83}`}
                strokeDashoffset="0"
                strokeLinecap="round"
              />
              <text
                x="50"
                y="55"
                textAnchor="middle"
                fontSize="28"
                fontWeight="bold"
                fill="#16a34a"
              >
                {conformePercentage}%
              </text>
            </svg>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-green-900 mb-2">Inspeção Concluída</h2>
        <p className="text-green-800">
          {conformeCount} de {totalItems} itens em conformidade
        </p>
      </div>

      {/* Inspection Details */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Empresa</p>
          <p className="font-semibold text-gray-900 text-sm mt-1">{state.company?.name}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Unidade</p>
          <p className="font-semibold text-gray-900 text-sm mt-1">{state.unit?.name}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Checklist</p>
          <p className="font-semibold text-gray-900 text-sm mt-1">{state.template?.name}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Data</p>
          <p className="font-semibold text-gray-900 text-sm mt-1">{new Date().toLocaleDateString()}</p>
        </div>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle size={20} className="text-green-600" />
            <span className="text-sm font-medium text-green-900">Conforme</span>
          </div>
          <p className="text-3xl font-bold text-green-600">{conformeCount}</p>
        </div>

        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <XCircle size={20} className="text-red-600" />
            <span className="text-sm font-medium text-red-900">Não conforme</span>
          </div>
          <p className="text-3xl font-bold text-red-600">{naoConformeCount}</p>
        </div>

        <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Circle size={20} className="text-gray-600" />
            <span className="text-sm font-medium text-gray-900">N/A</span>
          </div>
          <p className="text-3xl font-bold text-gray-600">{naoAplicavelCount}</p>
        </div>
      </div>

      {/* Items List */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Detalhes da Inspeção</h3>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {state.items.map((item: any) => (
            <div
              key={item.id}
              className={`p-4 rounded-lg border-2 ${
                item.status
                  ? getStatusColor(item.status).bg + ' ' + getStatusColor(item.status).border
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="flex items-start gap-3">
                {item.status === 'conforme' && <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-1" />}
                {item.status === 'nao-conforme' && <XCircle size={20} className="text-red-600 flex-shrink-0 mt-1" />}
                {item.status === 'nao-aplicavel' && <Circle size={20} className="text-gray-600 flex-shrink-0 mt-1" />}
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{item.description}</p>
                  {item.notes && <p className="text-sm text-gray-600 mt-1">{item.notes}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-6 border-t border-gray-200">
        <button
          onClick={() => navigate('/')}
          className="flex-1 py-3 rounded-lg font-medium bg-gray-200 text-gray-900 hover:bg-gray-300 transition-colors"
        >
          Voltar ao Dashboard
        </button>
        <Button className="flex-1">
          📊 Gerar Relatório
        </Button>
      </div>
    </div>
  );
}
