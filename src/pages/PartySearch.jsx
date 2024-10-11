// PartySearch.jsx
import React, { useState } from 'react';
import { useUser } from '../utils/UserContext';
import KakaoMap from '../utils/KakaoMap';
import { Box, Flex } from '@chakra-ui/react';
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
    name: '창의 의류 교환전',
    host: [2, 'Taewookim'],
    location: [36.370595893175924, 127.36279199289771],
    address: '대전광역시 유성구 대학로 291',
    distance: 11.15,
    cloth: [2, 4],
    favs: 0,
    date: ['2024-11-15T13:00:00+09:00', '2024-11-15T17:00:00+09:00'],
    image: ['party2.jpg', '0123456789abcdef'],
  },
  {
    id: 3,
    name: '기계 옷장 파티',
    host: [3, 'Ihchaeryu'],
    location: [36.37231967587628, 127.3589666366722],
    address: '대전광역시 유성구 대학로 291',
    distance: 11.15,
    cloth: [5],
    favs: 0,
    date: ['2024-11-15T13:00:00+09:00', '2024-11-15T17:00:00+09:00'],
    image: ['party3.jpg', '0123456789abcdef'],
  },
  {
    id: 4,
    name: '자연의 재입기 마켓',
    host: [1, 'admin'],
    location: [36.36977915010141, 127.36466024588023],
    address: '대전광역시 유성구 대학로 291',
    distance: 11.15,
    cloth: [],
    favs: 0,
    date: ['2024-11-16T13:00:00+09:00', '2024-11-16T17:00:00+09:00'],
    image: ['party4.jpg', '0123456789abcdef'],
  },
  {
    id: 5,
    name: '파스쿠찌 리사이클링',
    host: [2, 'Taewookim'],
    location: [36.36855384484363, 127.36456538416813],
    address: '대전광역시 유성구 대학로 291',
    distance: 11.15,
    cloth: [6, 7],
    favs: 0,
    date: ['2024-11-15T13:00:00+09:00', '2024-11-15T17:00:00+09:00'],
    image: ['party5.jpg', '0123456789abcdef'],
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
    image: ['party6.jpg', '0123456789abcdef'],
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
    image: ['party7.jpg', '0123456789abcdef'],
  },
];

function PartySearch() {
  const { user } = useUser();
  const [isExpanded, setIsExpanded] = useState(false); // BottomSheet의 확장 상태 관리
  const [selectedParty, setSelectedParty] = useState(null);

  // handlePartyClick 함수 정의
  const handlePartyClick = (party) => {
    setSelectedParty(party);
    setIsExpanded(true); // BottomSheet를 확장 상태로 설정
  };

  // clearSelection 함수 정의
  const clearSelection = () => {
    setSelectedParty(null); // 선택된 파티 초기화
    setIsExpanded(false); // BottomSheet를 축소 상태로 설정
  };

  return (
    <Flex direction="column" height="100vh" position="relative">
      {/* 헤더 - BottomSheet가 확장되지 않았을 때만 표시 */}
      {!isExpanded && (
        <Header
          user={user}
          title="파티 찾기"
          subtitle={`Welcome, ${user ? user.name : 'Guest'}!`}
        />
      )}

      {/* 카카오맵 */}
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
        />
      </Box>

      {/* BottomSheet */}
      <Box position="relative" zIndex="2">
        <PartyListBottomSheet
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
          partyListData={partyListData}
          selectedParty={selectedParty}
          handlePartyClick={handlePartyClick}
          clearSelection={clearSelection} // clearSelection을 전달
        />
      </Box>
    </Flex>
  );
}

export default PartySearch;
