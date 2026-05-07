import { CheckCircle2, AlertCircle } from 'lucide-react';

interface ChecklistStepProps {
  state: any;
  onStateChange: (updates: any) => void;
}

export function ChecklistStep({ state }: ChecklistStepProps) {
  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-gray-600">Empresa</p>
            <p className="font-semibold text-gray-900">{state.company?.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Unidade</p>
            <p className="font-semibold text-gray-900">{state.unit?.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Checklist</p>
            <p className="font-semibold text-gray-900">{state.template?.name}</p>
          </div>
        </div>
      </div>

      {/* Checklist Items */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle size={20} className="text-primary" />
          <h3 className="font-semibold text-gray-900">Itens a inspecionar ({state.items.length})</h3>
        </div>

        <div className="space-y-3">
          {state.items.map((item: any, index: number) => (
            <div
              key={item.id}
              className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary bg-opacity-10 text-primary flex-shrink-0 font-semibold">
                {index + 1}
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{item.description}</p>
              </div>
              <CheckCircle2 size={20} className="text-gray-300 flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-2">Instruções para a Execução</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>✓ Inspecione cada item conforme o checklist</li>
          <li>✓ Tire fotos como evidências (opcional)</li>
          <li>✓ Anote qualquer não conformidade ou ressalva</li>
          <li>✓ Marque o status de cada item</li>
        </ul>
      </div>
    </div>
  );
}
