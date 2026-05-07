import { jsx as _jsx } from "react/jsx-runtime";
export function Card({ children, padding = 'md', shadow = true, className = '', ...props }) {
    const paddingClasses = {
        sm: 'p-3',
        md: 'p-6',
        lg: 'p-8',
    };
    return (_jsx("div", { className: `
        bg-white rounded-lg
        ${shadow ? 'shadow-md' : ''}
        ${paddingClasses[padding]}
        ${className}
      `, ...props, children: children }));
}
