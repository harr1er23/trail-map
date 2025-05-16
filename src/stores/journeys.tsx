import { create } from "zustand";
import { client } from "../shared/api/client";
import type { Journey } from "../entities/journey/types";
import { useAuthStore } from "./auth";

interface JourneysState {
    journeys: Journey[];
    error: boolean;
    totalPage: number;
    loading: boolean;
    fetchJourneys: (page: number) => Promise<void>;
    addJourney: (journey: Journey) => void;
    removeJourney: (id: number) => void;
}

export const useJourneysStore = create<JourneysState>((set) => ({
    journeys: [],
    totalPage: 1,
    error: false,
    loading: false,
    fetchJourneys: async (page) => {
        try {
            set({ loading: true, error: false });
            const { user } = useAuthStore.getState();
            
            if(!user) {
                throw new Error("User not authenticated");
            }
            const pageUrl = page ? `&page=${page}&limit=15` : '&page=1';
            const { data } = await client.get(`/journeys?user_id=${user.id}${pageUrl}`);
            set({journeys: data.items, totalPage: data.meta.total_pages});
        } catch (err) {
            console.error(err);
            set({ error: true })
        } finally {
            set({ loading: false })
        }
    },
    addJourney: (journey) => {
        set((state) => {
            const foundJourneyIndex = state.journeys.findIndex(j => j.id == journey.id);

            if(foundJourneyIndex != -1) {
                const updatedJourneys = [...state.journeys];
                updatedJourneys[foundJourneyIndex] = journey;
                return { 
                    journeys: updatedJourneys
                }
            }

            return { 
                journeys: [...state.journeys, journey]
            }
        });
    },
    removeJourney: (id) => {
        set((state) => ({ 
            journeys: state.journeys.filter(journey => journey.id !== id)
        }));
    }
}))