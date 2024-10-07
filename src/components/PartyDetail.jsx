// PartyDetail.js
import React from 'react';
import { Box, Flex, Text, IconButton, Button } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';

function PartyDetail({ party, onBack }) {
  return (
    <Box px={4} pt={10} position="relative">
      <IconButton
        icon={<ArrowBackIcon />}
        aria-label="Back"
        position="absolute"
        top="2"
        left="4"
        onClick={onBack}
        variant="ghost"
        size="lg"
        borderRadius="full"
        color="purple.500"
        _hover={{ bg: 'purple.100' }}
      />
      <Box mb={4}>
        <Text fontSize="sm" color="gray.500" mb="1">
          내 위치로부터 21km
        </Text>
        <Text fontSize="2xl" fontWeight="bold" mb="2">
          {party.name}
        </Text>
        <Text mb="2">⭐ 120</Text>
        <Text mb="1">10월 27일 (금)</Text>
        <Text mb="1">오후 3시 ~ 오후 7시</Text>
        <Text mb="2">대전광역시 유성구 대학로 291</Text>
        <Text color="gray.500">aGain123님이 호스트</Text>
      </Box>
      <Flex direction="column" gap={2} mt="4">
        <Button colorScheme="purple">내 옷 등록하기</Button>
        <Button colorScheme="purple" variant="outline">
          등록된 옷 확인하기
        </Button>
      </Flex>
    </Box>
  );
}

export default PartyDetail;
