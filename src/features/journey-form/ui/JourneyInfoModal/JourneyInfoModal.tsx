import YandexMap from '../../../../shared/ui/YandexMap/YandexMap';
import { Placemark } from '@pbe/react-yandex-maps';
import { Textarea, TextInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useJourneyModalStore } from '../../../../stores/journey-modal';

const JourneyInfoModal = () => {
    const { journey } = useJourneyModalStore();
    
    // const slides = journey?.images && journey?.images.map((url) => (
    //     <Carousel.Slide key={url}>
    //       <Image src={url} height={220} />
    //     </Carousel.Slide>
    // ));
      
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


            <Textarea
                readOnly
                value={journey?.description}
                variant="filled"
                label="Описание поездки"
                autosize
            />

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