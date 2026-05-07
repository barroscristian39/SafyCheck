import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Layout } from '../components';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SelectionStep } from '../components/checklist-flow/SelectionStep';
import { ChecklistStep } from '../components/checklist-flow/ChecklistStep';
import { ExecutionStep } from '../components/checklist-flow/ExecutionStep';
import { SummaryStep } from '../components/checklist-flow/SummaryStep';
const STEPS = [
    { id: 'selection', title: 'Seleção', description: 'Escolha a empresa, unidade e checklist' },
    { id: 'checklist', title: 'Checklist', description: 'Revise os itens a inspecionar' },
    { id: 'execution', title: 'Execução', description: 'Realize a inspeção' },
    { id: 'summary', title: 'Resumo', description: 'Revise os resultados' },
];
export function ChecklistFlowPage() {
    const [currentStep, setCurrentStep] = useState('selection');
    const [flowState, setFlowState] = useState({
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
    const updateFlowState = (updates) => {
        setFlowState((prev) => ({ ...prev, ...updates }));
    };
    const renderStep = () => {
        switch (currentStep) {
            case 'selection':
                return (_jsx(SelectionStep, { state: flowState, onStateChange: updateFlowState, onNext: handleNext }));
            case 'checklist':
                return (_jsx(ChecklistStep, { state: flowState, onStateChange: updateFlowState }));
            case 'execution':
                return (_jsx(ExecutionStep, { state: flowState, onStateChange: updateFlowState }));
            case 'summary':
                return _jsx(SummaryStep, { state: flowState });
            default:
                return null;
        }
    };
    return (_jsx(Layout, { children: _jsxs("div", { className: "max-w-4xl mx-auto", children: [_jsxs("div", { className: "mb-8", children: [_jsx("div", { className: "flex items-center justify-between mb-6", children: STEPS.map((step, index) => (_jsxs("div", { className: "flex items-center flex-1", children: [_jsx("div", { className: `flex items-center justify-center w-12 h-12 rounded-full font-semibold text-sm ${index <= currentStepIndex
                                            ? 'bg-primary text-white'
                                            : 'bg-gray-200 text-gray-600'}`, children: index + 1 }), index < STEPS.length - 1 && (_jsx("div", { className: `flex-1 h-1 mx-2 rounded ${index < currentStepIndex ? 'bg-primary' : 'bg-gray-200'}` }))] }, step.id))) }), _jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900", children: STEPS[currentStepIndex].title }), _jsx("p", { className: "text-gray-600 mt-1", children: STEPS[currentStepIndex].description })] })] }), _jsx("div", { className: "bg-white rounded-2xl shadow-lg p-8 mb-8", children: renderStep() }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("button", { onClick: handleBack, disabled: !canGoBack, className: `flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${canGoBack
                                ? 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`, children: [_jsx(ChevronLeft, { size: 20 }), "Voltar"] }), _jsxs("div", { className: "text-sm text-gray-600", children: ["Passo ", currentStepIndex + 1, " de ", STEPS.length] }), _jsxs("button", { onClick: handleNext, disabled: !canGoNext, className: `flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${canGoNext
                                ? 'bg-primary text-white hover:bg-green-700'
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`, children: ["Pr\u00F3ximo", _jsx(ChevronRight, { size: 20 })] })] })] }) }));
}
