import { create } from 'zustand';
export const useAuthStore = create((set) => ({
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    token: localStorage.getItem('token'),
    isLoading: false,
    setUser: (user) => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        }
        else {
            localStorage.removeItem('user');
        }
        set({ user });
    },
    setToken: (token) => {
        if (token) {
            localStorage.setItem('token', token);
        }
        else {
            localStorage.removeItem('token');
        }
        set({ token });
    },
    login: async (email, password) => {
        set({ isLoading: true });
        try {
            // Mock API call - será substituído por chamada real depois
            const mockUser = {
                id: '1',
                email,
                name: 'Cristian Silva',
                role: 'inspector',
                company_id: '1',
            };
            const mockToken = 'mock-jwt-token-' + Date.now();
            set({ user: mockUser, token: mockToken });
            localStorage.setItem('user', JSON.stringify(mockUser));
            localStorage.setItem('token', mockToken);
        }
        finally {
            set({ isLoading: false });
        }
    },
    logout: () => {
        set({ user: null, token: null });
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    },
}));
