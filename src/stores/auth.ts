import { create } from "zustand";
import type { User } from "../entities/user/types";
import { authApi } from "../shared/api/authApi";

type AuthStore = {
    user: null | User;
    token: null | string;
    login: (email: string, pass: string) => Promise<void>;
    registration: (email: string, name: string, pass: string) => Promise<void>;
    logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    token: null,
    login: async (email, pass) => {
        try {
            const { token, data } = await authApi.login({ email, pass });
            localStorage.setItem('token', token);
            set({user: data, token});
        } catch(err) {
            console.error('EROR [LOGIN]', err);
            throw err;
        }

    },
    registration: async (email, name, pass) => {
        const { token, data } = await authApi.registartion({ email, name, pass });
        set({user: data, token});
        localStorage.setItem('token', token);
    },
    logout: () => {
        set({ user: null, token: null });
        localStorage.removeItem('token');
    }
}))