import React, { useState } from 'react';
import { Box, Flex, Text, IconButton } from '@chakra-ui/react';
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';

function BottomSheet() {
  const [isExpanded, setIsExpanded] = useState(false);

  const partyList = [
    { id: 1, name: '파티 A' },
    { id: 2, name: '파티 B' },
    { id: 3, name: '파티 C' },
    { id: 4, name: '파티 D' },
    { id: 5, name: '파티 E' },
    { id: 6, name: '파티 F' },
    { id: 7, name: '파티 G' },
  ];

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Box
      position="absolute"
      bottom="60px" // 하단 네비게이션 바 위에 고정
      left="0"
      width="100%"
      bg="white"
      borderTopRadius="2xl"
      boxShadow="0px -2px 10px rgba(0, 0, 0, 0.1)"
      transition="height 0.3s ease"
      height={isExpanded ? '60vh' : '20vh'}
      zIndex="20"
      overflowY="auto"
    >
      {/* 토글 버튼 */}
      <Flex
        justifyContent="center"
        py={2}
        position="relative"
        onClick={toggleExpand}
      >
        <IconButton
          icon={
            isExpanded ? (
              <ChevronDownIcon boxSize={8} />
            ) : (
              <ChevronUpIcon boxSize={8} />
            )
          }
          aria-label="Toggle BottomSheet"
          variant="ghost"
          size="lg"
        />
      </Flex>

      {/* 내용 */}
      <Box px={4} pt={2}>
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontSize="lg" fontWeight="bold">
            예정된 파티들
          </Text>
          <Text fontSize="sm" color="purple.500">
            날짜순 ▼
          </Text>
        </Flex>
      </Box>

      {/* 파티 목록 */}
      <Box flex="1" p={4} overflowY="auto" height="100%">
        {partyList.map((party) => (
          <Box
            key={party.id}
            bg="gray.100"
            borderRadius="md"
            p={4}
            mb={4}
            boxShadow="md"
          >
            <Text>{party.name}</Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default BottomSheet;
