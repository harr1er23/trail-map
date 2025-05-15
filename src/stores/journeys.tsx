import { create } from "zustand";
import { client } from "../shared/api/client";
import type { Journey } from "../entities/journey/types";

interface JourneysState {
    journeys: Journey[];
    error: boolean;
    loading: boolean;
    fetchJourneys: () => Promise<void>;
    addJourney: (journey: Journey) => void;
    removeJourney: (id: number) => void;
}

export const useJourneysStore = create<JourneysState>((set) => ({
    journeys: [],
    error: false,
    loading: true,
    fetchJourneys: async () => {
        try {
            set({ loading: true, error: false });
            const { data } = await client.get('/journeys');
            set({journeys: data});
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