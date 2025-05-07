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
        const resp = await client.post(`/auth`, data);
        return resp.data;
    },

    registartion: async (data: RegisterRequest): Promise<AuthResponse> => {
        const resp = await client.post(`/register`, data);
        return resp.data;
    }
}