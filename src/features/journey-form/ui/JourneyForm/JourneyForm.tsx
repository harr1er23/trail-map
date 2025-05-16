import YandexMap from '../../../../shared/ui/YandexMap/YandexMap';
import { Placemark } from '@pbe/react-yandex-maps';
import { Button, Textarea, TextInput } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useJourneyModalStore } from '../../../../stores/journey-modal';
import { fetchAddress } from '../../../../shared/helpers/fetchAddress';
import { toast } from 'react-toastify';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormJourneySchema, type TFormJourneySchema } from '../../lib/schema';
import { useJourneysStore } from '../../../../stores/journeys';
import dayjs from 'dayjs';
import React from 'react';
import type { Journey } from '../../../../entities/journey/types';

interface JourneyForm {
    close: () => void;
}

interface NewJourneyProps {
    city: string;
    country: string;
    date: [string | null, string | null];
    description: string | undefined;
    coords: [number, number];
    image: string;
}

const JourneyForm: React.FC<JourneyForm> = ({ close }) => {
    const { journey, removeJourney, updateJourney, setJourney, createJourney } = useJourneyModalStore();
    const { removeJourney: deleteJourney, addJourney } = useJourneysStore();
    const currentDate = dayjs().format('YYYY-MM-DD');
    const [date, setDate] = React.useState<[string | null, string | null]>(journey?.date ?? [currentDate, currentDate]);
    const form = useForm<TFormJourneySchema>({
        resolver: zodResolver(FormJourneySchema),
        defaultValues: {
            country: journey?.country || "",
            city: journey?.city || "",
            description: journey?.description || "",
            coords: journey?.coords,
            image: journey?.image || ''
        }
    })

    async function handleMapClick(coords: [number, number]) {
        const { country, city} = await fetchAddress(coords);
        
        form.setValue("coords", coords);
        form.setValue("country", country);
        form.setValue("city", city);
    }

    async function saveJourney(journeyObj: Journey) {
        try {
            await updateJourney(journeyObj);
            addJourney(journeyObj);
            setJourney(null);
            close();
            toast.success('Данные поездки успешно обнавлены.');
        } catch (err) {
            console.error(err);
            toast.error('Ошибка при сохранении! Попробуйте повторить позже.');   
        }
    }
    
    async function createNewJourney(journeyObj: NewJourneyProps) {
        try {
            const data: Journey = await createJourney(journeyObj);
            addJourney(data);
            setJourney(null);
            close();
            toast.success('Поездка успешно добавлена.');
        } catch (err) {
            console.error(err);
            toast.error('Ошибка при сохранении! Попробуйте повторить позже.');   
        }
    }

    async function onClickDeleteJourney() {
        try {
            if(!journey) return;
            await removeJourney(journey.id);
            deleteJourney(journey.id);
            setJourney(null);
            toast.success('Поездка успешно удалена.');
            close();
        } catch(err) {
            console.error(err);
            toast.error('Ошибка при удалении! Попробуйте повторить позже.');   
        }
    }

    const onClickSaveJourney = async () => {
        if(journey) {
            const journeyObj: Journey = {
                city: form.getValues('city'),
                country: form.getValues('country'),
                id: journey.id,
                date: date,
                publicLink: journey.publicLink,
                description: form.getValues('description'),
                coords: form.getValues('coords'),
                image: form.getValues('image'),
            }
            await saveJourney(journeyObj);
        } else {
            const journeyObj = {
                city: form.getValues('city'),
                country: form.getValues('country'),
                date: date,
                description: form.getValues('description'),
                coords: form.getValues('coords'),
                image: form.getValues('image') || '',
            }
            await createNewJourney(journeyObj);
        }
    }

    return (
        <FormProvider {...form} >
            <form 
                onSubmit={form.handleSubmit(onClickSaveJourney)} 
                className='flex flex-col gap-3 w-full'>
                <div 
                    className='w-[390px] h-[25vh] p-2'>
                    <YandexMap
                        width="390px"
                        height="25vh"
                        center={form.getValues('coords')}
                        onClick={(e) => handleMapClick(e.get('coords'))}
                    >{form.watch("coords") && (
                        <Placemark
                            geometry={form.watch("coords")}
                            properties={{
                                iconCaption: form.getValues('country') + ", " + form.getValues('city'),
                            }}
                        />
                    )}
                    </YandexMap>
                </div>
                <span className='text-sm text-red-400'>{ form.formState.errors.coords?.message }</span>
                
                <TextInput
                    {...form.register('country')}
                    variant="filled"
                    radius="md"
                    label="Страна"
                    placeholder="Норвегия"
                    error={form.formState.errors.country?.message}
                />

                <TextInput
                    {...form.register('city')}
                    variant="filled"
                    radius="md"
                    label="Город"
                    placeholder="Осло"
                    error={form.formState.errors.city?.message}
                />

                <Textarea
                    {...form.register('description')}
                    variant="filled"
                    label="Описание поездки"
                    autosize
                    minRows={3}
                    maxRows={8}
                />

                <TextInput
                    {...form.register('image')}
                    label="Фото"
                    placeholder='http://example.com'
                    variant="filled"
                    radius="md"
                />
                
                <DatePickerInput
                    type="range"
                    value={date}
                    onChange={setDate}
                    valueFormat="YYYY MMM DD"
                    label="Дата"
                    placeholder="Выберите даты"
                />

                <div className='flex justify-between'>
                    {journey != null && <Button className='bg-red-500' variant='light' onClick={onClickDeleteJourney}>Удалить</Button>}
                    <Button type='submit' loading={form.formState.isSubmitting}>{journey != null ? 'Сохранить' : 'Добавить'}</Button>
                </div>
            </form>
        </FormProvider>
  )
}

export default JourneyForm