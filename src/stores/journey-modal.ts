import { create } from "zustand";
import type { Journey } from "../entities/journey/types";
import { client } from "../shared/api/client";

interface JourneyDTO {
    country: string;
    city: string;
    description?: string;
    image: string;
    date: [string | null, string | null];
    coords: [number, number];
}

interface JourneyModalStore {
    journey: Journey | null,
    error: boolean,
    loading: boolean,
    setJourney: (data: Journey | null) => void;
    createJourney: (date: JourneyDTO) => Promise<Journey>;
    updateJourney: (data: Journey) => Promise<void>;
    removeJourney: (id: number) => Promise<void>;
}

export const useJourneyModalStore = create<JourneyModalStore>((set) => ({
    journey: null,
    error: false,
    loading: true,
    setJourney: (data) => {
        set({journey: data});
    },
    createJourney: async (journey) => {
        try {
            set({ loading: true, error: false });
            const { data } = await client.post('/journeys', journey);
            console.log(data)
            set({ journey: data});
            return data;
        } catch(err) {
            console.error('EROR [CREATE_JOURNEY]', err);
            set({ error: true })
            throw err;
        } finally {
            set({ loading: false })
        }
    },
    updateJourney: async (journeyData) => {
        try {
            set({ loading: true, error: false })
            const { data } = await client.patch(`/journeys/${journeyData.id}`, journeyData);
            set({ journey: data})
        } catch(err) {
            console.error(`ERROR [SAVE_JOURNEY]`, err);
            set({ error: true });
            throw err;
        } finally {
            set({ loading: false })
        }
    },
    removeJourney: async (id) => {
        try {
            set({ loading: true, error: false });
            await client.delete(`/journeys/${id}`);
            set({ journey: null })
        } catch(err) {
            console.error('EROR [REMOVE_JOURNEY]', err);
            set({ error: true })
            throw err;
        } finally {
            set({ loading: false })
        }
    }
}))