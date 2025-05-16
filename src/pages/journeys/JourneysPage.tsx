import { Button, Drawer, Pagination } from '@mantine/core';
import { AppLayout } from '../../layouts/app-layout';
import { JourneyCard } from '../../shared/ui/JourneyCard';
import { useDisclosure } from '@mantine/hooks';
import JourneyForm from '../../features/journey-form/ui/JourneyForm/JourneyForm';
import { useJourneyModal } from '../../hooks/useJourneyModal';
import type { Journey } from '../../entities/journey/types';
import { useJourneysStore } from '../../stores/journeys';
import React from 'react';

const JourneysPage = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { setJourney, journey } = useJourneyModal();
  const { fetchJourneys, journeys, totalPage, loading } = useJourneysStore();
  const [activePage, setPage] = React.useState(1);

  React.useEffect(() => {
    fetchJourneys(activePage);
  }, [activePage])

  async function handleOpen(currentJourney?: Journey) {
    if(currentJourney) {
      setJourney(currentJourney);
    }
    open();
  }

  function handleClose() {
    setJourney(null);
    close();
  }


  return (
    <AppLayout>
      <div className='flex flex-col mt-8 ml-8 mr-8 w-[100%]'>
        <div className='flex justify-between items-center'>
          <h1 className='text-3xl font-bold mb-4'>Мои путешествия</h1>
          <Button onClick={() => handleOpen()} variant='filled'>Добавить новое</Button>
        </div>
        <div className='grid grid-cols-3 gap-3'>
          {
            journeys.map(journey => <JourneyCard onClick={() => handleOpen(journey)} key={journey.id} {...journey} loading={loading} />)
          }
        </div>

        {totalPage > 1 &&<Pagination className='mt-auto mb-4' total={totalPage} value={activePage} onChange={setPage}/>}
      </div>

      <Drawer opened={opened} onClose={handleClose} title={journey != null && journey.country !== undefined ? `Моё путешествие в ${journey?.country}, ${journey?.city}` : 'Новое путешествие'} position='right'>
        <JourneyForm close={handleClose} />
      </Drawer>
    </AppLayout>
  )
}

export default JourneysPage