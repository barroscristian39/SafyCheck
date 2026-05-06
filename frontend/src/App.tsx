import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-primary">SafeCheck</h1>
            <p className="text-gray-600">Checklists e Relatórios</p>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold mb-4">Bem-vindo ao SafeCheck</h2>
            <p className="text-gray-600">
              Sistema de inspeção e checklists para mais segurança e eficiência.
            </p>
          </div>
        </main>
      </div>
    </QueryClientProvider>
  )
}
