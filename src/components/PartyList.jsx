import React from 'react';
import { Box, Text, Flex, Image } from '@chakra-ui/react';

function PartyList({ onPartyClick, isExpanded, partyListData }) {
  return (
    <Box px={4} pt={0}>
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
        maxHeight={isExpanded ? 'calc(80vh - 120px)' : 'calc(35vh - 120px)'}
        px={2}
      >
        {partyListData.map((party) => {
          // 파티 이미지 경로 설정
          const imageUrl = party.image
            ? `/src/assets/images/partyImages/${party.image[0]}`
            : null;
          return (
            <Box
              key={party.id}
              bg="white"
              borderRadius="lg"
              p={4}
              mb={4}
              boxShadow="md"
              onClick={() => onPartyClick(party)}
              cursor="pointer"
              display="flex"
              alignItems="center"
            >
              {/* 파티 이미지 */}
              <Box
                width="100px"
                height="80px"
                bg="gray.200"
                borderRadius="md"
                overflow="hidden"
                mr={4}
                sx={{
                  flexShrink: 0, // Chakra UI의 `sx` prop을 사용하여 스타일 지정
                }}
              >
                {party.image ? (
                  <Image
                    src={imageUrl}
                    alt={`${party.name} 이미지`}
                    objectFit="cover"
                    width="100%"
                    height="100%"
                  />
                ) : (
                  <Text color="gray.500" textAlign="center" mt="30%">
                    이미지 없음
                  </Text>
                )}
              </Box>

              {/* 파티 정보 */}
              <Box flex="1">
                <Text fontSize="sm" color="gray.500">
                  내 위치로부터 ・ {party.distance}km
                </Text>
                <Text fontSize="lg" fontWeight="bold">
                  {party.name}
                </Text>
                <Text fontSize="sm" color="gray.500" mb="1">
                  ⭐ {party.favs}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {new Date(party.date[0]).toLocaleString('ko-KR', {
                    month: 'long',
                    day: 'numeric',
                    weekday: 'short',
                  })}{' '}
                  {new Date(party.date[0]).getHours()}시 ~{' '}
                  {new Date(party.date[1]).getHours()}시
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {party.address}
                </Text>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export default PartyList;
