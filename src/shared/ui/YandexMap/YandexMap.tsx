import { YMaps, Map } from '@pbe/react-yandex-maps';
import type { ReactNode } from 'react';

interface YandexMapProps {
    center?: [number, number];
    zoom?: number;
    children?: ReactNode;
    width?: string | number;
    height?: string | number;
    onClick?: (e: ymaps.IEvent<MouseEvent, ymaps.Map>) => void;
}

const YandexMap = ({ onClick, center = [55.75, 37.57], zoom = 3, children, width = "100%", height="100vh" }: YandexMapProps) => {
  return (
    <YMaps>
      <Map
        defaultState={{ center, zoom }}
        width={width}
        height={height}
        onClick={(e: ymaps.IEvent<MouseEvent, ymaps.Map>) => onClick?.(e)}
      >
        {children}
      </Map>
    </YMaps>
  );
};

export default YandexMap;