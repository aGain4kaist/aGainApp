// PartyList.js
import React from 'react';
import { Box, Text, Flex } from '@chakra-ui/react';

const partyListData = [
  { id: 1, name: '파티 A' },
  { id: 2, name: '파티 B' },
  { id: 3, name: '파티 C' },
  { id: 4, name: '파티 D' },
  { id: 5, name: '파티 E' },
  { id: 6, name: '파티 F' },
  { id: 7, name: '파티 G' },
];

function PartyList({ onPartyClick, isExpanded }) {
  return (
    <Box px={4} pt={2}>
      {/* 상단 타이틀 및 정렬 옵션 */}
      <Flex justifyContent="space-between" alignItems="center" mb={4} px={2}>
        <Text fontSize="lg" fontWeight="bold">
          내게 가까운 파티들
        </Text>
        <Text fontSize="sm" color="purple.500">
          날짜순 ▼
        </Text>
      </Flex>
      {/* 파티 목록 */}
      <Box
        overflowY="auto"
        maxHeight={isExpanded ? 'calc(70vh - 100px)' : 'calc(30vh - 100px)'}
        px={2}
      >
        {partyListData.map((party) => (
          <Box
            key={party.id}
            bg="gray.100"
            borderRadius="md"
            p={4}
            mb={4}
            boxShadow="md"
            onClick={() => onPartyClick(party)}
            cursor="pointer"
          >
            <Text>{party.name}</Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default PartyList;
