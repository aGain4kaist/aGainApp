import React from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

function KakaoMap({ info, setInfo }) {
  const positions = [
    {
      title: '카이스트 정문',
      latlng: { lat: 36.365679109284, lng: 127.36395917051 },
    },
    {
      title: '창의학습관',
      latlng: { lat: 36.370379109284, lng: 127.36265917051 },
    },
    {
      title: 'KI 빌딩',
      latlng: { lat: 36.367979109284, lng: 127.36395917051 },
    },
  ];
  return (
    <Map
      center={{ lat: 36.370379109284, lng: 127.36265917051 }}
      style={{ width: '100%', height: '100%' }} // 유동형 크기 설정
      level={4}
    >
      {positions.map((position, index) => (
        <MapMarker
          key={`${position.title}-${position.latlng}`}
          position={position.latlng}
          image={{
            src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
            size: {
              width: 24,
              height: 35,
            },
          }}
          title={position.title}
          onClick={(marker) => {
            setInfo({ name: marker.Gb });
          }}
        />
      ))}
    </Map>
  );
}

export default KakaoMap;
