import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    return (_jsx(Layout, { children: _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-bold text-gray-900", children: "Ol\u00E1, Cristian! \uD83D\uDC4B" }), _jsx("p", { className: "text-gray-600", children: "Bem-vindo ao SafeCheck" })] }), _jsxs(Button, { onClick: () => navigate('/checklists/new'), children: [_jsx("span", { children: "\u2795" }), " Novo Checklist"] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4", children: [_jsx(Card, { className: "bg-gradient-to-br from-emerald-50 to-emerald-100", children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-gray-600 text-sm font-medium", children: "Empresas cadastradas" }), _jsx("p", { className: "text-3xl font-bold text-primary mt-2", children: stats.companies })] }), _jsx("div", { className: "p-3 bg-primary rounded-lg", children: _jsx(Building2, { size: 24, className: "text-white" }) })] }) }), _jsx(Card, { className: "bg-gradient-to-br from-blue-50 to-blue-100", children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-gray-600 text-sm font-medium", children: "Unidades cadastradas" }), _jsx("p", { className: "text-3xl font-bold text-blue-600 mt-2", children: stats.units })] }), _jsx("div", { className: "p-3 bg-blue-500 rounded-lg", children: _jsx(MapPin, { size: 24, className: "text-white" }) })] }) }), _jsx(Card, { className: "bg-gradient-to-br from-amber-50 to-amber-100", children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-gray-600 text-sm font-medium", children: "Checklists realizados" }), _jsx("p", { className: "text-3xl font-bold text-amber-600 mt-2", children: stats.checklists })] }), _jsx("div", { className: "p-3 bg-amber-500 rounded-lg", children: _jsx(ClipboardList, { size: 24, className: "text-white" }) })] }) }), _jsx(Card, { className: "bg-gradient-to-br from-red-50 to-red-100", children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-gray-600 text-sm font-medium", children: "N\u00E3o conformidades" }), _jsx("p", { className: "text-3xl font-bold text-red-600 mt-2", children: stats.non_conformities })] }), _jsx("div", { className: "p-3 bg-red-500 rounded-lg", children: _jsx(AlertTriangle, { size: 24, className: "text-white" }) })] }) }), _jsx(Card, { className: "bg-gradient-to-br from-purple-50 to-purple-100", children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-gray-600 text-sm font-medium", children: "Conformidade m\u00E9dia" }), _jsxs("p", { className: "text-3xl font-bold text-purple-600 mt-2", children: [stats.conformity_percentage, "%"] })] }), _jsx("div", { className: "p-3 bg-purple-500 rounded-lg", children: _jsx(PieChart, { size: 24, className: "text-white" }) })] }) })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [_jsxs(Card, { className: "lg:col-span-2", children: [_jsx("h2", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Conformidade geral" }), _jsxs("div", { className: "flex items-center gap-6", children: [_jsx("div", { className: "flex-shrink-0", children: _jsxs("svg", { className: "w-32 h-32", viewBox: "0 0 100 100", children: [_jsx("circle", { cx: "50", cy: "50", r: "45", fill: "none", stroke: "#e5e7eb", strokeWidth: "8" }), _jsx("circle", { cx: "50", cy: "50", r: "45", fill: "none", stroke: "#1e7e34", strokeWidth: "8", strokeDasharray: `${78 * 2.83} ${100 * 2.83}`, strokeDashoffset: "0", strokeLinecap: "round" }), _jsx("text", { x: "50", y: "55", textAnchor: "middle", fontSize: "24", fontWeight: "bold", fill: "#1e7e34", children: "78%" })] }) }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-3 h-3 rounded-full bg-primary" }), _jsx("span", { className: "text-gray-600", children: "Conformes" }), _jsx("span", { className: "font-semibold", children: "78% (140)" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-3 h-3 rounded-full bg-yellow-500" }), _jsx("span", { className: "text-gray-600", children: "N\u00E3o conformes" }), _jsx("span", { className: "font-semibold", children: "15% (27)" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-3 h-3 rounded-full bg-red-500" }), _jsx("span", { className: "text-gray-600", children: "N\u00E3o aplic\u00E1veis" }), _jsx("span", { className: "font-semibold", children: "7% (13)" })] })] })] })] }), _jsxs(Card, { className: "bg-gradient-to-br from-primary to-secondary text-white flex flex-col justify-between", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold mb-2", children: "Come\u00E7ar inspe\u00E7\u00E3o" }), _jsx("p", { className: "text-white text-opacity-90 text-sm", children: "Inicie uma nova inspe\u00E7\u00E3o selecionando a empresa, unidade e checklist" })] }), _jsxs(Button, { variant: "outline", className: "border-white text-white hover:bg-white hover:bg-opacity-10 mt-4", onClick: () => navigate('/checklists/new'), children: ["Iniciar ", _jsx(ArrowRight, { size: 16 })] })] })] }), _jsxs(Card, { children: [_jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsx("h2", { className: "text-lg font-semibold text-gray-900", children: "\u00DAltimos checklists realizados" }), _jsx("button", { className: "text-primary hover:underline text-sm font-medium", children: "Ver todos" })] }), _jsx("div", { className: "space-y-3", children: recentChecklists.map((item) => (_jsxs("div", { className: "flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer", children: [_jsxs("div", { children: [_jsx("p", { className: "font-medium text-gray-900", children: item.name }), _jsx("p", { className: "text-sm text-gray-600", children: item.unit }), _jsxs("p", { className: "text-xs text-gray-500 mt-1", children: ["\uD83D\uDCC5 ", item.date] })] }), _jsx("div", { className: `px-3 py-1 rounded-full text-sm font-medium ${item.color}`, children: item.status })] }, item.id))) })] })] }) }));
}
