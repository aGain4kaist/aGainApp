import React from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

function KakaoMap({ partyListData, handlePartyClick }) {
  console.log('hello');
  return (
    <Map
      center={{ lat: 36.370379109284, lng: 127.36265917051 }}
      style={{ width: '100%', height: '100%' }}
      level={4}
    >
      {partyListData.map((party) => (
        <MapMarker
          key={party.id}
          position={{ lat: party.location[0], lng: party.location[1] }}
          image={{
            src: 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png',
            size: { width: 24, height: 35 },
          }}
          title={party.name}
          onClick={() => handlePartyClick(party)}
        />
      ))}
    </Map>
  );
}

export default KakaoMap;
