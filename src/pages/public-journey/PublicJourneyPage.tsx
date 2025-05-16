import React from 'react'
import { useParams } from 'react-router-dom';
import YandexMap from '../../shared/ui/YandexMap/YandexMap';
import type { Journey } from '../../entities/journey/types';
import { client } from '../../shared/api/client';
import { Placemark } from '@pbe/react-yandex-maps';
import { Image, Textarea, TextInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';

const PublicJourneyPage = () => {
    const { id } = useParams();
    const [journey, setJourney] = React.useState<Journey>();

    React.useEffect(() => {
        if(!id) return;
        async function fetchJourney() {
            const resp = await client.get(`/publicJourneys?id=${id}`);
            setJourney(resp?.data[0]);
        }
        fetchJourney();
    }, [id])

    return (
        <div className='flex justify-between'>
            <YandexMap
                width={'95%'}
                center={journey?.coords}
            >
                <Placemark
                geometry={journey?.coords}
                properties={{
                    iconCaption: journey?.country + ", " + journey?.city,
                }}
                />
            </YandexMap>
            <div className='w-2/3 p-4'>
                <TextInput
                    value={journey?.country}
                    variant="filled"
                    radius="md"
                    label="Страна"
                    placeholder="Норвегия"
                    readOnly
                />

                <TextInput
                    value={journey?.city}
                    variant="filled"
                    radius="md"
                    label="Город"
                    placeholder="Осло"
                    readOnly
                />

                <DatePicker value={journey?.date} type="range" unselectable='on' minDate={journey?.date[0] ?? undefined} maxDate={journey?.date[1] ?? undefined}/>

                <Image src={journey?.image} />

                <Textarea
                    readOnly
                    value={journey?.description}
                    variant="filled"
                    label="Описание поездки"
                    autosize
                />
            </div>
        </div>
  )
}

export default PublicJourneyPage