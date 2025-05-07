import type { User } from "../../entities/user/types";
import { client } from "./client";

type AuthResponse = {
    token: string,
    data: User 
}

type LoginRequest = {
    email: string;
    pass: string;
};

type RegisterRequest = {
    email: string;
    name: string;
    pass: string;
}

export const authApi = {
    login: async (data: LoginRequest): Promise<AuthResponse> => {
        const resp = await client.post(`/auth`, {
            email: data.email,
            password: data.pass
        });
        return resp.data;
    },
    registartion: async (data: RegisterRequest): Promise<AuthResponse> => {
        const resp = await client.post(`/register`, {
            password: data.pass,
            name: data.name,
            email: data.email,
        });
        return resp.data;
    },
    checkAuth: async (): Promise<AuthResponse> => {
        const response = await client.get('/auth_me');
        return response.data;
    }
}