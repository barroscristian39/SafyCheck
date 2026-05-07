import { useState } from 'react';
import { Building2, MapPin, ClipboardList } from 'lucide-react';
import { Button } from '../Button';

interface SelectionStepProps {
  state: any;
  onStateChange: (updates: any) => void;
  onNext: () => void;
}

// Mock data
const COMPANIES = [
  { id: '1', name: 'Construção Silva & Cia' },
  { id: '2', name: 'Empreiteira Brasil' },
  { id: '3', name: 'Obras & Projetos' },
];

const UNITS: Record<string, Array<{ id: string; name: string }>> = {
  '1': [
    { id: '1-1', name: 'Obra Central - Torre A' },
    { id: '1-2', name: 'Obra Central - Torre B' },
    { id: '1-3', name: 'Canteiro de Obras' },
  ],
  '2': [
    { id: '2-1', name: 'Unidade 01 - Refeitório' },
    { id: '2-2', name: 'Unidade 02 - Almoxarifado' },
  ],
  '3': [
    { id: '3-1', name: 'Obra Centro - Fase 1' },
    { id: '3-2', name: 'Obra Centro - Fase 2' },
  ],
};

const TEMPLATES: Record<string, Array<{ id: string; name: string; items: number }>> = {
  '1': [
    { id: 't1', name: 'NR-18 – Condições de Trabalho', items: 24 },
    { id: 't2', name: 'NR-35 – Trabalho em Altura', items: 15 },
    { id: 't3', name: 'EPI e Equipamentos', items: 12 },
  ],
  '2': [
    { id: 't4', name: 'Cozinha Industrial', items: 18 },
    { id: 't5', name: 'Armazenagem', items: 22 },
  ],
  '3': [
    { id: 't6', name: 'Obras em Andamento', items: 30 },
    { id: 't7', name: 'Segurança Geral', items: 20 },
  ],
} as const;

const CHECKLIST_ITEMS: Record<string, Array<{ id: string; description: string }>> = {
  't1': [
    { id: 'i1', description: 'Verificar sinalização de segurança' },
    { id: 'i2', description: 'Inspeção de andaimes e escadas' },
    { id: 'i3', description: 'Validar uso correto de EPI' },
    { id: 'i4', description: 'Verificar equipamentos de proteção' },
  ],
  't2': [
    { id: 'i5', description: 'Cintos de segurança adequados' },
    { id: 'i6', description: 'Pontos de ancoragem certificados' },
    { id: 'i7', description: 'Treinamento dos colaboradores' },
  ],
};

export function SelectionStep({ state, onStateChange, onNext }: SelectionStepProps) {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(state.company?.id || null);
  const [selectedUnit, setSelectedUnit] = useState<string | null>(state.unit?.id || null);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(state.template?.id || null);

  const availableUnits = selectedCompany ? UNITS[selectedCompany as keyof typeof UNITS] : [];
  const availableTemplates = selectedUnit && selectedCompany ? TEMPLATES[selectedCompany as keyof typeof TEMPLATES] : [];

  const canProceed = selectedCompany && selectedUnit && selectedTemplate;

  const handleProceed = () => {
    if (!canProceed) return;

    const company = COMPANIES.find((c) => c.id === selectedCompany)!;
    const unit = availableUnits.find((u) => u.id === selectedUnit)!;
    const template = availableTemplates.find((t) => t.id === selectedTemplate)!;

    // Get mock checklist items
    const items = CHECKLIST_ITEMS[selectedTemplate] || [];

    onStateChange({
      company,
      unit,
      template,
      items: items.map((item) => ({
        ...item,
        status: undefined,
        notes: '',
        photos: [],
      })),
    });

    onNext();
  };

  return (
    <div className="space-y-8">
      {/* Company Selection */}
      <div>
        <label className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
          <Building2 size={20} className="text-primary" />
          Selecione a Empresa
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {COMPANIES.map((company) => (
            <button
              key={company.id}
              onClick={() => {
                setSelectedCompany(company.id);
                setSelectedUnit(null);
                setSelectedTemplate(null);
              }}
              className={`p-4 rounded-lg border-2 transition-all text-left font-medium ${
                selectedCompany === company.id
                  ? 'border-primary bg-primary bg-opacity-5 text-primary'
                  : 'border-gray-200 text-gray-900 hover:border-primary'
              }`}
            >
              {company.name}
            </button>
          ))}
        </div>
      </div>

      {/* Unit Selection */}
      {selectedCompany && (
        <div>
          <label className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
            <MapPin size={20} className="text-primary" />
            Selecione a Unidade
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {availableUnits.map((unit) => (
              <button
                key={unit.id}
                onClick={() => {
                  setSelectedUnit(unit.id);
                  setSelectedTemplate(null);
                }}
                className={`p-4 rounded-lg border-2 transition-all text-left font-medium ${
                  selectedUnit === unit.id
                    ? 'border-primary bg-primary bg-opacity-5 text-primary'
                    : 'border-gray-200 text-gray-900 hover:border-primary'
                }`}
              >
                {unit.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Template Selection */}
      {selectedUnit && (
        <div>
          <label className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
            <ClipboardList size={20} className="text-primary" />
            Selecione o Checklist
          </label>
          <div className="space-y-3">
            {availableTemplates.map((template: { id: string; name: string; items: number }) => (
              <button
                key={template.id}
                onClick={() => setSelectedTemplate(template.id)}
                className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                  selectedTemplate === template.id
                    ? 'border-primary bg-primary bg-opacity-5'
                    : 'border-gray-200 hover:border-primary'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-gray-900">{template.name}</p>
                    <p className="text-sm text-gray-600 mt-1">{template.items} itens</p>
                  </div>
                  {selectedTemplate === template.id && (
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Proceed Button */}
      {canProceed && (
        <div className="pt-6 border-t border-gray-200">
          <Button
            onClick={handleProceed}
            className="w-full"
          >
            Confirmar Seleção
          </Button>
        </div>
      )}
    </div>
  );
}
