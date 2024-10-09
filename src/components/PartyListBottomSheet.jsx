// PartyListBottomSheet.js
import React, { useState } from 'react';
import { Box, Flex, IconButton } from '@chakra-ui/react';
import {
  ChevronUpIcon,
  ChevronDownIcon,
  ArrowBackIcon,
} from '@chakra-ui/icons';
import PartyList from './PartyList';
import PartyDetail from './PartyDetail';

const partyListData = [
  {
    id: 1,
    name: '테스트1',
    host: [1, 'admin'],
    location: [36.365679109284, 127.36395917051],
    address: '대전광역시 유성구 대학로 291',
    distance: 11.15,
    cloth: [1, 3],
    favs: 0,
    date: ['2024-11-15T13:00:00+09:00', '2024-11-15T17:00:00+09:00'],
    image: ['party1.jpg', '0123456789abcdef'],
    __note1__: 'host: 호스트 아이디, 호스트 닉네임',
    __note2__: 'location: 위도, 경도',
    __note3__: 'distance는 km단위',
    __note4__: 'cloth는 파티에 등록된 옷 id의 리스트',
    __note5__: 'favs는 즐찾 수, date는 시작 시각/종료 시각',
    __note6__: 'image는 url/액세스 코드',
  },
  {
    id: 2,
    name: '테스트2',
    host: [2, 'Taewookim'],
    location: [36.365679109284, 127.36395917051],
    address: '대전광역시 유성구 대학로 291',
    distance: 11.15,
    cloth: [2, 4],
    favs: 0,
    date: ['2024-11-15T13:00:00+09:00', '2024-11-15T17:00:00+09:00'],
    image: ['party2.jpg', '0123456789abcdef'],
  },
  {
    id: 3,
    name: '테스트3',
    host: [3, 'Ihchaeryu'],
    location: [36.365679109284, 127.36395917051],
    address: '대전광역시 유성구 대학로 291',
    distance: 11.15,
    cloth: [5],
    favs: 0,
    date: ['2024-11-15T13:00:00+09:00', '2024-11-15T17:00:00+09:00'],
    image: ['party3.jpg', '0123456789abcdef'],
  },
  {
    id: 4,
    name: '테스트4',
    host: [1, 'admin'],
    location: [36.365679109284, 127.36395917051],
    address: '대전광역시 유성구 대학로 291',
    distance: 11.15,
    cloth: [],
    favs: 0,
    date: ['2024-11-16T13:00:00+09:00', '2024-11-16T17:00:00+09:00'],
    image: ['party4.jpg', '0123456789abcdef'],
  },
  {
    id: 5,
    name: '테스트5',
    host: [2, 'Taewookim'],
    location: [36.365679109284, 127.36395917051],
    address: '대전광역시 유성구 대학로 291',
    distance: 11.15,
    cloth: [6, 7],
    favs: 0,
    date: ['2024-11-15T13:00:00+09:00', '2024-11-15T17:00:00+09:00'],
    image: ['party5.jpg', '0123456789abcdef'],
  },
  {
    id: 6,
    name: '테스트6',
    host: [3, 'Ihchaeryu'],
    location: [36.365679109284, 127.36395917051],
    address: '대전광역시 유성구 대학로 291',
    distance: 11.15,
    cloth: [8, 9],
    favs: 0,
    date: ['2024-11-15T13:00:00+09:00', '2024-11-15T17:00:00+09:00'],
    image: ['party6.jpg', '0123456789abcdef'],
  },
  {
    id: 7,
    name: '테스트7',
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

function PartyListBottomSheet({ isExpanded, setIsExpanded }) {
  const [selectedParty, setSelectedParty] = useState(null);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handlePartyClick = (party) => {
    setSelectedParty(party);
    setIsExpanded(true);
  };

  const clearSelection = () => {
    setSelectedParty(null);
    setIsExpanded(false);
  };

  return (
    <>
      {/* 뒤로가기 버튼 */}
      {selectedParty && (
        <IconButton
          icon={<ArrowBackIcon boxSize={6} />}
          aria-label="Back"
          position="absolute"
          bottom="calc(80vh + 70px)"
          left="10px"
          onClick={clearSelection}
          variant="solid"
          size="md"
          borderRadius="full"
          bg="white"
          color="purple.500"
          boxShadow="md"
          zIndex="25"
          _hover={{ bg: 'purple.100' }}
        />
      )}
      <Box
        position="absolute"
        bottom="60px"
        left="0"
        width="100%"
        bg="white"
        borderTopRadius="2xl"
        boxShadow="0px -2px 10px rgba(0, 0, 0, 0.1)"
        transition="height 0.3s ease"
        height={isExpanded ? '80vh' : '35vh'}
        zIndex="20"
        overflow="hidden"
      >
        <Flex
          justifyContent="center"
          py={0}
          position="relative"
          onClick={() => !selectedParty && toggleExpand()}
        >
          <IconButton
            icon={
              isExpanded ? (
                <ChevronDownIcon boxSize={8} />
              ) : (
                <ChevronUpIcon boxSize={8} />
              )
            }
            aria-label="Toggle PartyListBottomSheet"
            variant="ghost"
            size="lg"
            display={selectedParty ? 'none' : 'block'}
          />
        </Flex>

        {selectedParty ? (
          <PartyDetail party={selectedParty} onBack={clearSelection} />
        ) : (
          <PartyList
            onPartyClick={handlePartyClick}
            isExpanded={isExpanded}
            partyListData={partyListData}
          />
        )}
      </Box>
    </>
  );
}

export default PartyListBottomSheet;
