import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function Input({ label, error, icon, className = '', ...props }) {
    return (_jsxs("div", { className: "w-full", children: [label && (_jsx("label", { className: "block text-sm font-medium text-gray-700 mb-1", children: label })), _jsxs("div", { className: "relative", children: [icon && (_jsx("div", { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500", children: icon })), _jsx("input", { className: `
            w-full px-4 py-2.5 border-2 rounded-lg
            ${icon ? 'pl-10' : ''}
            border-gray-200 focus:outline-none focus:border-primary
            disabled:bg-gray-100 disabled:cursor-not-allowed
            ${error ? 'border-red-500' : ''}
            ${className}
          `, ...props })] }), error && _jsx("p", { className: "text-red-500 text-sm mt-1", children: error })] }));
}
