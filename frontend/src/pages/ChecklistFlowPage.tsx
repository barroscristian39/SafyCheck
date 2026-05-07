import { useState } from 'react';
import { Layout } from '../components';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SelectionStep } from '../components/checklist-flow/SelectionStep';
import { ChecklistStep } from '../components/checklist-flow/ChecklistStep';
import { ExecutionStep } from '../components/checklist-flow/ExecutionStep';
import { SummaryStep } from '../components/checklist-flow/SummaryStep';

type StepType = 'selection' | 'checklist' | 'execution' | 'summary';

interface FlowState {
  company: { id: string; name: string } | null;
  unit: { id: string; name: string } | null;
  template: { id: string; name: string } | null;
  items: Array<{
    id: string;
    description: string;
    status?: 'conforme' | 'nao-conforme' | 'nao-aplicavel';
    notes?: string;
    photos?: string[];
  }>;
}

const STEPS: { id: StepType; title: string; description: string }[] = [
  { id: 'selection', title: 'Seleção', description: 'Escolha a empresa, unidade e checklist' },
  { id: 'checklist', title: 'Checklist', description: 'Revise os itens a inspecionar' },
  { id: 'execution', title: 'Execução', description: 'Realize a inspeção' },
  { id: 'summary', title: 'Resumo', description: 'Revise os resultados' },
];

export function ChecklistFlowPage() {
  const [currentStep, setCurrentStep] = useState<StepType>('selection');
  const [flowState, setFlowState] = useState<FlowState>({
    company: null,
    unit: null,
    template: null,
    items: [],
  });

  const currentStepIndex = STEPS.findIndex((s) => s.id === currentStep);
  const canGoBack = currentStepIndex > 0;
  const canGoNext = currentStepIndex < STEPS.length - 1;

  const handleNext = () => {
    if (canGoNext) {
      setCurrentStep(STEPS[currentStepIndex + 1].id);
    }
  };

  const handleBack = () => {
    if (canGoBack) {
      setCurrentStep(STEPS[currentStepIndex - 1].id);
    }
  };

  const updateFlowState = (updates: Partial<FlowState>) => {
    setFlowState((prev) => ({ ...prev, ...updates }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'selection':
        return (
          <SelectionStep
            state={flowState}
            onStateChange={updateFlowState}
            onNext={handleNext}
          />
        );
      case 'checklist':
        return (
          <ChecklistStep
            state={flowState}
            onStateChange={updateFlowState}
          />
        );
      case 'execution':
        return (
          <ExecutionStep
            state={flowState}
            onStateChange={updateFlowState}
          />
        );
      case 'summary':
        return <SummaryStep state={flowState} />;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            {STEPS.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className={`flex items-center justify-center w-12 h-12 rounded-full font-semibold text-sm ${
                  index <= currentStepIndex
                    ? 'bg-primary text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {index + 1}
                </div>
                {index < STEPS.length - 1 && (
                  <div className={`flex-1 h-1 mx-2 rounded ${
                    index < currentStepIndex ? 'bg-primary' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{STEPS[currentStepIndex].title}</h1>
            <p className="text-gray-600 mt-1">{STEPS[currentStepIndex].description}</p>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          {renderStep()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={handleBack}
            disabled={!canGoBack}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              canGoBack
                ? 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <ChevronLeft size={20} />
            Voltar
          </button>

          <div className="text-sm text-gray-600">
            Passo {currentStepIndex + 1} de {STEPS.length}
          </div>

          <button
            onClick={handleNext}
            disabled={!canGoNext}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              canGoNext
                ? 'bg-primary text-white hover:bg-green-700'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            Próximo
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </Layout>
  );
}
