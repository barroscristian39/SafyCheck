import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, LogOut, Bell, Home, Building2, ClipboardList, BarChart3 } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
export function Layout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const navigate = useNavigate();
    const { user, logout } = useAuthStore();
    const handleLogout = () => {
        logout();
        navigate('/login');
    };
    const navItems = [
        { icon: Home, label: 'Início', path: '/' },
        { icon: Building2, label: 'Empresas', path: '/companies' },
        { icon: ClipboardList, label: 'Checklists', path: '/checklists' },
        { icon: BarChart3, label: 'Relatórios', path: '/reports' },
    ];
    return (_jsxs("div", { className: "flex h-screen bg-gray-50", children: [_jsxs("aside", { className: `
          ${sidebarOpen ? 'w-64' : 'w-20'}
          bg-white border-r border-gray-200 transition-all duration-300
          flex flex-col
        `, children: [_jsx("div", { className: "h-16 flex items-center justify-center border-b border-gray-200 px-4", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-10 h-10 bg-primary rounded-lg flex items-center justify-center", children: _jsx("span", { className: "text-white font-bold", children: "SC" }) }), sidebarOpen && _jsx("span", { className: "font-bold text-primary", children: "SafeCheck" })] }) }), _jsx("nav", { className: "flex-1 pt-6 px-3", children: navItems.map((item) => (_jsxs("button", { onClick: () => navigate(item.path), className: "w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 hover:bg-gray-100 transition-colors text-gray-700", children: [_jsx(item.icon, { size: 20 }), sidebarOpen && _jsx("span", { className: "text-sm", children: item.label })] }, item.path))) }), _jsx("div", { className: "border-t border-gray-200 p-3", children: _jsxs("button", { onClick: handleLogout, className: "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors", children: [_jsx(LogOut, { size: 20 }), sidebarOpen && _jsx("span", { className: "text-sm", children: "Sair" })] }) })] }), _jsxs("div", { className: "flex-1 flex flex-col overflow-hidden", children: [_jsxs("header", { className: "h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between", children: [_jsx("button", { onClick: () => setSidebarOpen(!sidebarOpen), className: "p-2 hover:bg-gray-100 rounded-lg transition-colors", children: _jsx(Menu, { size: 20 }) }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("button", { className: "p-2 hover:bg-gray-100 rounded-lg transition-colors relative", children: [_jsx(Bell, { size: 20 }), _jsx("span", { className: "absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" })] }), _jsxs("div", { className: "flex items-center gap-3 pl-4 border-l border-gray-200", children: [_jsxs("div", { className: "text-right", children: [_jsx("p", { className: "text-sm font-medium", children: user?.name || 'Usuário' }), _jsx("p", { className: "text-xs text-gray-500", children: user?.role })] }), _jsx("div", { className: "w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-semibold", children: user?.name?.charAt(0) || 'U' })] })] })] }), _jsx("main", { className: "flex-1 overflow-auto", children: _jsx("div", { className: "p-6", children: children }) })] })] }));
}
