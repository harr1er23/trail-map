import YandexMap from '../../../../shared/ui/YandexMap/YandexMap';
import { Placemark } from '@pbe/react-yandex-maps';
import { Button, Image, Textarea, TextInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useJourneyModalStore } from '../../../../stores/journey-modal';
import { Eye, Send } from 'lucide-react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const JourneyInfoModal = () => {
    const navigate = useNavigate();
    const { journey, updateJourney, publicJourney } = useJourneyModalStore();  

    async function onClickShare() {
        try {
            if(!journey) return;
            const publicId = await publicJourney(journey);
            await updateJourney({
                ...journey,
                publicLink: `/journey/${publicId}/public`
            });
            toast.success('Ваше путешествие опубликовано!');
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <div className='flex flex-col gap-3 w-full'>
            <div className='w-[400px] h-[20vh] rounded-2xl'>
                <YandexMap
                    width="400px"
                    height="20vh"
                    center={journey?.coords}
                >
                    <Placemark
                    geometry={journey?.coords}
                    properties={{
                        iconCaption: journey?.country + ", " + journey?.city,
                    }}
                    />
                </YandexMap>
            </div>

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

            <DatePicker value={journey?.date} type="range" unselectable='on' minDate={journey?.date[0] ?? ''} maxDate={journey?.date[1] ?? ''}/>

            <Image src={journey?.image} />

            <Textarea
                readOnly
                value={journey?.description}
                variant="filled"
                label="Описание поездки"
                autosize
            />

            <div className='flex justify-start gap-3'>
                <Button onClick={journey && journey.publicLink ? undefined : onClickShare} variant='light'>{journey && journey.publicLink ? 'Shared' : 'Share'} <Send className='self-center ml-2' size={15}/></Button>
                {journey && journey.publicLink && <Button onClick={() => navigate(journey.publicLink)} variant='light'>Check <Eye size={15}/></Button>}
            </div>
            {/* <Carousel
                withIndicators
                emblaOptions={{ loop: true }}
                classNames={{
                    root: classes.carousel,
                    controls: classes.carouselControls,
                    indicator: classes.carouselIndicator,
                }}
            >
                {slides}
            </Carousel> */}
        </div>
    )
}

export default JourneyInfoModal