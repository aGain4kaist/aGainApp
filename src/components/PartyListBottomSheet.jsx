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
  { id: 1, name: '파티 A' },
  { id: 2, name: '파티 B' },
  { id: 3, name: '파티 C' },
  { id: 4, name: '파티 D' },
  { id: 5, name: '파티 E' },
  { id: 6, name: '파티 F' },
  { id: 7, name: '파티 G' },
];

function PartyListBottomSheet() {
  const [isExpanded, setIsExpanded] = useState(false);
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
    setIsExpanded(false); // 선택 해제 시 자동 축소
  };

  return (
    <>
      {/* 뒤로가기 버튼 */}
      {selectedParty && (
        <IconButton
          icon={<ArrowBackIcon boxSize={6} />} // 아이콘 크기 조정
          aria-label="Back"
          position="absolute"
          bottom="calc(70vh + 70px)"
          left="10px"
          onClick={clearSelection}
          variant="solid"
          size="md" // 버튼 크기 줄이기
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
        height={isExpanded ? '70vh' : '30vh'}
        zIndex="20"
        overflow="hidden"
      >
        <Flex
          justifyContent="center"
          py={2}
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
