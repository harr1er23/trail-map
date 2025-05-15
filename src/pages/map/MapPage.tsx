import { Placemark } from '@pbe/react-yandex-maps';
import { AppLayout } from '../../layouts/app-layout'
import YandexMap from '../../shared/ui/YandexMap/YandexMap';
import { Drawer} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useJourneyModal } from '../../hooks/useJourneyModal';
import type { Journey } from '../../entities/journey/types';
import JourneyInfoModal from '../../features/journey-form/ui/JourneyInfoModal/JourneyInfoModal';
import { useJourneysStore } from '../../stores/journeys';
import React from 'react';

const MapPage = () => {
  const [infoOpened, { open, close }] = useDisclosure(false);
  const { setJourney, journey } = useJourneyModal();
  const { journeys, fetchJourneys } = useJourneysStore();

  React.useEffect(() => {
    fetchJourneys();
  }, [])

  async function handleClose() {
    close();
    setJourney(null);
  }

  function handlePointClick(data: Journey) {
    open();
    setJourney(data);
  }

return (
  <AppLayout>
    <YandexMap
    >
      {journeys.map((journey) => (
        <Placemark
          onClick={() => handlePointClick(journey)}
          key={journey.id}
          geometry={journey.coords}
          properties={{
            iconCaption: journey.country + ", " + journey.city,
          }}
        />
      ))}
    </YandexMap>

    <Drawer opened={infoOpened} onClose={handleClose} title={`Моё путешествие в ${journey?.country}, ${journey?.city}`} position='right'>
      <JourneyInfoModal />
    </Drawer>

  </AppLayout>
)
}

export default MapPage