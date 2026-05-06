import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage, DashboardPage } from './pages';
import { useAuthStore } from './stores/authStore';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { token } = useAuthStore();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export function Router() {
  const { token } = useAuthStore();

  return (
    <BrowserRouter>
      <Routes>
        {!token ? (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        ) : (
          <>
            <Route path="/" element={<DashboardPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}
