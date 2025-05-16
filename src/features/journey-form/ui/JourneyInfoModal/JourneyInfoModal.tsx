import YandexMap from '../../../../shared/ui/YandexMap/YandexMap';
import { Placemark } from '@pbe/react-yandex-maps';
import { Button, Image, Textarea, TextInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useJourneyModalStore } from '../../../../stores/journey-modal';
import { Send } from 'lucide-react';

const JourneyInfoModal = () => {
    const { journey } = useJourneyModalStore();
      
    async function onClickShare() {
        try {
            if(!journey) return;
            console.log('Отправка запроса на смену флага' + journey.id)
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

            <Button onClick={onClickShare} variant='light'>Share <Send className='self-center ml-2' size={15}/></Button>

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