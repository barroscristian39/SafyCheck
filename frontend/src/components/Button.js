import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
export function Button({ variant = 'primary', size = 'md', fullWidth = false, loading = false, children, disabled, className = '', ...props }) {
    const baseClasses = 'font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center gap-2';
    const variantClasses = {
        primary: 'bg-primary text-white hover:bg-green-700 disabled:bg-gray-400',
        secondary: 'bg-secondary text-white hover:bg-emerald-600 disabled:bg-gray-400',
        outline: 'border-2 border-primary text-primary hover:bg-green-50 disabled:border-gray-400 disabled:text-gray-400',
        danger: 'bg-red-600 text-white hover:bg-red-700 disabled:bg-gray-400',
    };
    const sizeClasses = {
        sm: 'px-3 py-2 text-sm',
        md: 'px-4 py-2.5 text-base',
        lg: 'px-6 py-3 text-lg',
    };
    const widthClass = fullWidth ? 'w-full' : '';
    return (_jsx("button", { className: `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`, disabled: disabled || loading, ...props, children: loading ? (_jsxs(_Fragment, { children: [_jsx("span", { className: "animate-spin", children: "\u23F3" }), _jsx("span", { children: children })] })) : (children) }));
}
