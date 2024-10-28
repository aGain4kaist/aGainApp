import React from 'react';
import { Box, Text, Flex, Image } from '@chakra-ui/react';
import { Icon as IconifyIcon } from '@iconify/react';

function PartyList({ onPartyClick, isExpanded, partyListData, orderedBy }) {
  return (
    <Box px={4} pt={0}>
      {/* 상단 타이틀 및 정렬 옵션 */}
      <Flex justifyContent="space-between" alignItems="center" mb={4} px={2}>
        {orderedBy == 'distance' ? (
          <>
            <Text fontSize="2xl" fontWeight="bold">
              내게 가까운 파티들
            </Text>
            <Text fontSize="md" color="purple.500">
              거리순 ▼
            </Text>
          </>
        ) : (
          <>
            <Text fontSize="2xl" fontWeight="bold">
              곧 열리는 파티들
            </Text>
            <Text fontSize="md" color="purple.500">
              날짜순 ▼
            </Text>
          </>
        )}
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
            <Flex
              key={party.id}
              flexDirection="column"
              alignItems="center"
              alignSelf="stretch"
              borderRadius="lg"
              p="10px"
              gap="10px"
              onClick={() => onPartyClick(party)}
            >
              {/* 파티 이미지 */}
              <Box
                width="350px"
                height="135px"
                bg="gray.200"
                borderRadius="xl"
                overflow="hidden"
                shadow="0px 2px 4px 2px rgba(0, 0, 0, 0.25)"
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
              <Flex
                flexDirection="row"
                px="13px"
                py="0px"
                justifyContent="space-between"
                alignItems="center"
                alignSelf="stretch"
              >
                <Flex flexDirection="column" alignItems="flex-start" g="2px">
                  <Flex alignItems="center" gap="8px">
                    <Text
                      fontSize="lg"
                      fontWeight="bold"
                      color="rgba(65, 20, 97, 1)"
                    >
                      {party.name}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      {new Date(party.date[0]).toLocaleString('ko-KR', {
                        month: 'long',
                        day: 'numeric',
                      })}
                    </Text>
                  </Flex>
                  <Text fontSize="md" color="black">
                    {party.address}
                  </Text>
                </Flex>
                <Flex flexDirection="column" w="25px" alignItems="center">
                  <IconifyIcon
                    icon="ant-design:star-outlined"
                    style={{ color: 'black' }}
                    width="25px"
                    height="25px"
                  />
                  <Text textAlign="center" color="black">
                    {party.favs}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          );
        })}
      </Box>
    </Box>
  );
}

export default PartyList;
