// PartySearch.jsx
import React, { useState } from 'react';
import { useUser } from '../utils/UserContext';
import KakaoMap from '../utils/KakaoMap';
import { Box, Flex, Button } from '@chakra-ui/react';
import Header from '../components/Layout/Header';
import PartyListBottomSheet from '../components/PartyListBottomSheet';

const partyListData = [
  {
    id: 1,
    name: '본원 재입기 파티',
    host: [1, 'admin'],
    location: [36.37060041810503, 127.36129881931089],
    address: '대전광역시 유성구 대학로 291',
    distance: 11.15,
    cloth: [1, 3],
    favs: 0,
    date: ['2024-11-15T13:00:00+09:00', '2024-11-15T17:00:00+09:00'],
    image: ['본원파티.png', '0123456789abcdef'],
  },
  {
    id: 2,
    name: '창의 의류 교환',
    host: [2, 'Taewookim'],
    location: [36.370595893175924, 127.36279199289771],
    address: '대전광역시 유성구 대학로 291',
    distance: 11.15,
    cloth: [2, 4],
    favs: 0,
    date: ['2024-11-15T13:00:00+09:00', '2024-11-15T17:00:00+09:00'],
    image: ['창의관파티.png', '0123456789abcdef'],
  },
  {
    id: 3,
    name: '기계동 옷장 파티',
    host: [3, 'Ihchaeryu'],
    location: [36.37231967587628, 127.3589666366722],
    address: '대전광역시 유성구 대학로 291',
    distance: 11.15,
    cloth: [5],
    favs: 0,
    date: ['2024-11-15T13:00:00+09:00', '2024-11-15T17:00:00+09:00'],
    image: ['기계동파티.png', '0123456789abcdef'],
  },
  {
    id: 4,
    name: '자과동 재입기 마켓',
    host: [1, 'admin'],
    location: [36.36977915010141, 127.36466024588023],
    address: '대전광역시 유성구 대학로 291',
    distance: 11.15,
    cloth: [],
    favs: 0,
    date: ['2024-11-16T13:00:00+09:00', '2024-11-16T17:00:00+09:00'],
    image: ['자과동파티.png', '0123456789abcdef'],
  },
  {
    id: 5,
    name: '파스쿠찌 텀블러 재사용 파티',
    host: [2, 'Taewookim'],
    location: [36.36855384484363, 127.36456538416813],
    address: '대전광역시 유성구 대학로 291',
    distance: 11.15,
    cloth: [6, 7],
    favs: 0,
    date: ['2024-11-15T13:00:00+09:00', '2024-11-15T17:00:00+09:00'],
    image: ['파스쿠찌파티.png', '0123456789abcdef'],
  },
  {
    id: 6,
    name: '오리 연못 옷장',
    host: [3, 'Ihchaeryu'],
    location: [36.36776604785511, 127.36284571173304],
    address: '대전광역시 유성구 대학로 291',
    distance: 11.15,
    cloth: [8, 9],
    favs: 0,
    date: ['2024-11-15T13:00:00+09:00', '2024-11-15T17:00:00+09:00'],
    image: ['오리연못파티.png', '0123456789abcdef'],
  },
  {
    id: 7,
    name: '정문 의류 나눔',
    host: [4, 'notkim16'],
    location: [36.365679109284, 127.36395917051],
    address: '대전광역시 유성구 대학로 291',
    distance: 11.15,
    cloth: [10, 11],
    favs: 0,
    date: ['2024-11-16T13:00:00+09:00', '2024-11-16T17:00:00+09:00'],
    image: ['정문파티.png', '0123456789abcdef'],
  },
];

function PartySearch() {
  const { user } = useUser();
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedParty, setSelectedParty] = useState(null);
  const [center, setCenter] = useState({
    lat: 36.370379109284,
    lng: 127.36265917051,
  });
  const [myLocation, setMyLocation] = useState(null);

  const handlePartyClick = (party) => {
    setSelectedParty(party);
    setIsExpanded(true);
  };

  const goToCurrentLocation = async () => {
    if (navigator.geolocation) {
      try {
        // 현재 위치 가져오기
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 10000, // 10초 후 타임아웃
            maximumAge: 0,
          });
        });

        // 위치 설정
        const { latitude, longitude } = position.coords;
        const newCenter = { lat: latitude, lng: longitude };
        setCenter(newCenter);
        setMyLocation(newCenter); // 내 위치 마커 설정
      } catch (error) {
        console.error('현재 위치를 가져올 수 없습니다.', error);
        alert('현재 위치를 가져올 수 없습니다. 위치 접근 권한을 확인해주세요.');
      }
    } else {
      alert('위치 정보가 지원되지 않는 브라우저입니다.');
    }
  };

  return (
    <Flex direction="column" height="100vh" position="relative">
      {!isExpanded && (
        <Header
          user={user}
          title="파티 찾기"
          subtitle={`Welcome, ${user ? user.name : 'Guest'}!`}
        />
      )}

      <Box
        flex="1"
        width="100%"
        position="relative"
        zIndex="1"
        paddingBottom="20vh"
        top="-5vh"
      >
        <KakaoMap
          partyListData={partyListData}
          handlePartyClick={handlePartyClick}
          center={center}
          myLocation={myLocation}
        />
      </Box>

      {/* 현재 위치 버튼 */}
      <Button
        position="absolute"
        bottom="30vh"
        right="20px"
        zIndex="3"
        borderRadius="full"
        boxShadow="md"
        onClick={goToCurrentLocation}
      >
        현재 위치
      </Button>

      <Box position="relative" zIndex="2">
        <PartyListBottomSheet
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
          partyListData={partyListData}
          selectedParty={selectedParty}
          handlePartyClick={handlePartyClick}
          clearSelection={() => {
            setSelectedParty(null);
            setIsExpanded(false);
          }}
        />
      </Box>
    </Flex>
  );
}

export default PartySearch;
