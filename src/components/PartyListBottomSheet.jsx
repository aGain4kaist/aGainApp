import React, { useState } from 'react';
import { Box, Flex, Text, IconButton } from '@chakra-ui/react';
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';

function BottomSheet() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Box
      position="absolute" // absolute로 변경
      bottom="60px" // 네비게이션 바 위에 위치
      left="0"
      width="100%"
      bg="white"
      borderTopRadius="2xl"
      boxShadow="0px -2px 10px rgba(0, 0, 0, 0.1)"
      transition="height 0.3s ease"
      height={isExpanded ? '60vh' : '20vh'} // 확장 여부에 따라 높이 설정
      zIndex="20"
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
          size="lg" // 버튼 크기 조정
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

      {/* 파티 목록 내용 */}
      <Box flex="1" p={4} overflowY="auto">
        <Text>파티 목록이 여기에 표시됩니다.</Text>
      </Box>
    </Box>
  );
}

export default BottomSheet;
