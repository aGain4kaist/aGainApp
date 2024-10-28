import React from 'react';
import { Box, Text, Flex, Image } from '@chakra-ui/react';
import PartyListItem from './PartyListItem';

function PartyList({ onPartyClick, isExpanded, partyListData }) {
  return (
    <Box px={4} pt={0}>
      {/* 상단 타이틀 및 정렬 옵션 */}
      <Flex justifyContent="space-between" alignItems="center" mb={4} px={2}>
        <Text fontSize="2xl" fontWeight="bold">
          내게 가까운 파티들
        </Text>
        <Text fontSize="md" color="purple.500">
          거리순 ▼
        </Text>
      </Flex>

      {/* 파티 목록 */}
      <Box
        overflowY="auto"
        maxHeight={isExpanded ? 'calc(80vh - 120px)' : 'calc(35vh - 120px)'}
        px={2}
      >
        {partyListData.map((party) => (
          <PartyListItem
            key={party.id}
            onPartyClick={onPartyClick}
            party={party}
          />
        ))}
      </Box>
    </Box>
  );
}

export default PartyList;
