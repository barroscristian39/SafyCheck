import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage, DashboardPage, ChecklistFlowPage } from './pages';
import { useAuthStore } from './stores/authStore';
function PrivateRoute({ children }) {
    const { token } = useAuthStore();
    if (!token) {
        return _jsx(Navigate, { to: "/login", replace: true });
    }
    return _jsx(_Fragment, { children: children });
}
export function Router() {
    const { token } = useAuthStore();
    return (_jsx(BrowserRouter, { children: _jsx(Routes, { children: !token ? (_jsxs(_Fragment, { children: [_jsx(Route, { path: "/login", element: _jsx(LoginPage, {}) }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/login", replace: true }) })] })) : (_jsxs(_Fragment, { children: [_jsx(Route, { path: "/", element: _jsx(DashboardPage, {}) }), _jsx(Route, { path: "/checklists/new", element: _jsx(ChecklistFlowPage, {}) }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/", replace: true }) })] })) }) }));
}
