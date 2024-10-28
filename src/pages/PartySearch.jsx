// PartySearch.jsx
import React, { useState } from 'react';
import { useUser } from '../utils/UserContext';
import KakaoMap from '../utils/KakaoMap';
import { Box, Flex } from '@chakra-ui/react';
import Header from '../components/Layout/Header';
import PartyListBottomSheet from '../components/PartyListBottomSheet';
import { partyListData } from '../data/partyListData';

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
