import { useJourneyModalStore } from "../stores/journey-modal"

export const useJourneyModal = () => {
    const journeyModalState = useJourneyModalStore(state => state);

    return journeyModalState;
}