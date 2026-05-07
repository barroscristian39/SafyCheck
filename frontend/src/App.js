import { jsx as _jsx } from "react/jsx-runtime";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Router } from './Router';
const queryClient = new QueryClient();
export default function App() {
    return (_jsx(QueryClientProvider, { client: queryClient, children: _jsx(Router, {}) }));
}
