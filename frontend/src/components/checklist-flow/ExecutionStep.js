import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import { Camera, CheckCircle, XCircle, Circle } from 'lucide-react';
export function ExecutionStep({ state, onStateChange }) {
    const [currentItemIndex, setCurrentItemIndex] = useState(0);
    const [itemStatuses, setItemStatuses] = useState(state.items.reduce((acc, item, idx) => {
        acc[idx] = item.status;
        return acc;
    }, {}));
    const [itemNotes, setItemNotes] = useState(state.items.reduce((acc, item, idx) => {
        acc[idx] = item.notes || '';
        return acc;
    }, {}));
    const currentItem = state.items[currentItemIndex];
    const currentStatus = itemStatuses[currentItemIndex];
    const handleStatusChange = (status) => {
        setItemStatuses((prev) => ({
            ...prev,
            [currentItemIndex]: status,
        }));
    };
    const handleNoteChange = (note) => {
        setItemNotes((prev) => ({
            ...prev,
            [currentItemIndex]: note,
        }));
    };
    const handleNext = () => {
        if (currentItemIndex < state.items.length - 1) {
            setCurrentItemIndex(currentItemIndex + 1);
        }
    };
    const handlePrevious = () => {
        if (currentItemIndex > 0) {
            setCurrentItemIndex(currentItemIndex - 1);
        }
    };
    const handleFinish = () => {
        const updatedItems = state.items.map((item, idx) => ({
            ...item,
            status: itemStatuses[idx],
            notes: itemNotes[idx],
        }));
        onStateChange({ items: updatedItems });
    };
    const completedCount = Object.values(itemStatuses).filter((s) => s !== undefined).length;
    const progressPercentage = Math.round((completedCount / state.items.length) * 100);
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex justify-between items-center mb-2", children: [_jsxs("span", { className: "text-sm font-medium text-gray-600", children: ["Item ", currentItemIndex + 1, " de ", state.items.length] }), _jsxs("span", { className: "text-sm font-semibold text-primary", children: [progressPercentage, "%"] })] }), _jsx("div", { className: "w-full bg-gray-200 rounded-full h-3", children: _jsx("div", { className: "bg-primary rounded-full h-3 transition-all duration-300", style: { width: `${progressPercentage}%` } }) })] }), _jsxs("div", { className: "bg-gray-50 p-6 rounded-lg border border-gray-200", children: [_jsxs("p", { className: "text-sm text-gray-600 mb-2", children: ["Item ", currentItemIndex + 1] }), _jsx("h3", { className: "text-xl font-semibold text-gray-900", children: currentItem.description })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-lg font-semibold text-gray-900 mb-4", children: "Status" }), _jsxs("div", { className: "grid grid-cols-3 gap-3", children: [_jsxs("button", { onClick: () => handleStatusChange('conforme'), className: `p-4 rounded-lg border-2 transition-all flex flex-col items-center gap-2 ${currentStatus === 'conforme'
                                    ? 'border-green-500 bg-green-50'
                                    : 'border-gray-200 hover:border-green-500'}`, children: [_jsx(CheckCircle, { size: 24, className: currentStatus === 'conforme' ? 'text-green-600' : 'text-gray-400' }), _jsx("span", { className: "text-sm font-medium", children: "Conforme" })] }), _jsxs("button", { onClick: () => handleStatusChange('nao-conforme'), className: `p-4 rounded-lg border-2 transition-all flex flex-col items-center gap-2 ${currentStatus === 'nao-conforme'
                                    ? 'border-red-500 bg-red-50'
                                    : 'border-gray-200 hover:border-red-500'}`, children: [_jsx(XCircle, { size: 24, className: currentStatus === 'nao-conforme' ? 'text-red-600' : 'text-gray-400' }), _jsx("span", { className: "text-sm font-medium", children: "N\u00E3o conforme" })] }), _jsxs("button", { onClick: () => handleStatusChange('nao-aplicavel'), className: `p-4 rounded-lg border-2 transition-all flex flex-col items-center gap-2 ${currentStatus === 'nao-aplicavel'
                                    ? 'border-gray-500 bg-gray-100'
                                    : 'border-gray-200 hover:border-gray-500'}`, children: [_jsx(Circle, { size: 24, className: currentStatus === 'nao-aplicavel' ? 'text-gray-600' : 'text-gray-400' }), _jsx("span", { className: "text-sm font-medium", children: "N/A" })] })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-gray-900 mb-2", children: "Observa\u00E7\u00F5es" }), _jsx("textarea", { value: itemNotes[currentItemIndex], onChange: (e) => handleNoteChange(e.target.value), placeholder: "Adicione observa\u00E7\u00F5es, detalhes ou evid\u00EAncias...", className: "w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-10 resize-none", rows: 3 })] }), _jsx("div", { children: _jsxs("button", { className: "w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary hover:bg-primary hover:bg-opacity-5 transition-colors flex flex-col items-center gap-2 text-gray-600 hover:text-primary", children: [_jsx(Camera, { size: 24 }), _jsx("span", { className: "font-medium", children: "Adicionar foto" }), _jsx("span", { className: "text-sm", children: "Clique para capturar ou selecionar imagens" })] }) }), _jsxs("div", { className: "flex gap-3 pt-6 border-t border-gray-200", children: [_jsx("button", { onClick: handlePrevious, disabled: currentItemIndex === 0, className: `flex-1 py-3 rounded-lg font-medium transition-colors ${currentItemIndex === 0
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-gray-200 text-gray-900 hover:bg-gray-300'}`, children: "Anterior" }), currentItemIndex < state.items.length - 1 ? (_jsx("button", { onClick: handleNext, disabled: !currentStatus, className: `flex-1 py-3 rounded-lg font-medium transition-colors ${!currentStatus
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-primary text-white hover:bg-green-700'}`, children: "Pr\u00F3ximo" })) : (_jsx("button", { onClick: handleFinish, disabled: !currentStatus, className: `flex-1 py-3 rounded-lg font-medium transition-colors ${!currentStatus
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-primary text-white hover:bg-green-700'}`, children: "Finalizar Inspe\u00E7\u00E3o" }))] })] }));
}
