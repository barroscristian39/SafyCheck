import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Building2, MapPin, ClipboardList } from 'lucide-react';
import { Button } from '../Button';
// Mock data
const COMPANIES = [
    { id: '1', name: 'Construção Silva & Cia' },
    { id: '2', name: 'Empreiteira Brasil' },
    { id: '3', name: 'Obras & Projetos' },
];
const UNITS = {
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
const TEMPLATES = {
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
};
const CHECKLIST_ITEMS = {
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
export function SelectionStep({ state, onStateChange, onNext }) {
    const [selectedCompany, setSelectedCompany] = useState(state.company?.id || null);
    const [selectedUnit, setSelectedUnit] = useState(state.unit?.id || null);
    const [selectedTemplate, setSelectedTemplate] = useState(state.template?.id || null);
    const availableUnits = selectedCompany ? UNITS[selectedCompany] : [];
    const availableTemplates = selectedUnit ? TEMPLATES[selectedCompany] : [];
    const canProceed = selectedCompany && selectedUnit && selectedTemplate;
    const handleProceed = () => {
        if (!canProceed)
            return;
        const company = COMPANIES.find((c) => c.id === selectedCompany);
        const unit = availableUnits.find((u) => u.id === selectedUnit);
        const template = availableTemplates.find((t) => t.id === selectedTemplate);
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
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { children: [_jsxs("label", { className: "flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4", children: [_jsx(Building2, { size: 20, className: "text-primary" }), "Selecione a Empresa"] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3", children: COMPANIES.map((company) => (_jsx("button", { onClick: () => {
                                setSelectedCompany(company.id);
                                setSelectedUnit(null);
                                setSelectedTemplate(null);
                            }, className: `p-4 rounded-lg border-2 transition-all text-left font-medium ${selectedCompany === company.id
                                ? 'border-primary bg-primary bg-opacity-5 text-primary'
                                : 'border-gray-200 text-gray-900 hover:border-primary'}`, children: company.name }, company.id))) })] }), selectedCompany && (_jsxs("div", { children: [_jsxs("label", { className: "flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4", children: [_jsx(MapPin, { size: 20, className: "text-primary" }), "Selecione a Unidade"] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3", children: availableUnits.map((unit) => (_jsx("button", { onClick: () => {
                                setSelectedUnit(unit.id);
                                setSelectedTemplate(null);
                            }, className: `p-4 rounded-lg border-2 transition-all text-left font-medium ${selectedUnit === unit.id
                                ? 'border-primary bg-primary bg-opacity-5 text-primary'
                                : 'border-gray-200 text-gray-900 hover:border-primary'}`, children: unit.name }, unit.id))) })] })), selectedUnit && (_jsxs("div", { children: [_jsxs("label", { className: "flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4", children: [_jsx(ClipboardList, { size: 20, className: "text-primary" }), "Selecione o Checklist"] }), _jsx("div", { className: "space-y-3", children: availableTemplates.map((template) => (_jsx("button", { onClick: () => setSelectedTemplate(template.id), className: `w-full p-4 rounded-lg border-2 transition-all text-left ${selectedTemplate === template.id
                                ? 'border-primary bg-primary bg-opacity-5'
                                : 'border-gray-200 hover:border-primary'}`, children: _jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { children: [_jsx("p", { className: "font-semibold text-gray-900", children: template.name }), _jsxs("p", { className: "text-sm text-gray-600 mt-1", children: [template.items, " itens"] })] }), selectedTemplate === template.id && (_jsx("div", { className: "w-6 h-6 bg-primary rounded-full flex items-center justify-center", children: _jsx("span", { className: "text-white text-sm", children: "\u2713" }) }))] }) }, template.id))) })] })), canProceed && (_jsx("div", { className: "pt-6 border-t border-gray-200", children: _jsx(Button, { onClick: handleProceed, className: "w-full", children: "Confirmar Sele\u00E7\u00E3o" }) }))] }));
}
