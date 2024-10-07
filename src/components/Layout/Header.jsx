import React from 'react';
import { Box, Text, Flex, Input, Icon } from '@chakra-ui/react';
import { FaTicketAlt } from 'react-icons/fa';
import { SearchIcon } from '@chakra-ui/icons';

function Header({ title, subtitle, user }) {
  return (
    <Box
      bg="white"
      boxShadow="md"
      padding="16px"
      borderBottomRadius="xl"
      position="relative"
    >
      {/* 티켓 아이콘과 숫자 */}
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Text fontSize="2xl" fontWeight="bold" color="purple.600">
          {title}
        </Text>

        <Flex alignItems="center" gap="4px">
          <Icon as={FaTicketAlt} boxSize="6" color="gray.500" />
          <Text fontSize="lg" color="gray.500">
            {user ? user.ticketCount : 0}
          </Text>
        </Flex>
      </Flex>

      {/* 서브타이틀 */}
      {subtitle && (
        <Text fontSize="md" color="gray.500" mb={4}>
          {subtitle}
        </Text>
      )}

      {/* 검색 바 */}
      <Flex
        alignItems="center"
        borderRadius="full"
        boxShadow="sm"
        bg="gray.100"
        paddingX="4"
        paddingY="2"
      >
        <Input
          variant="unstyled"
          placeholder="파티 찾기"
          _placeholder={{ color: 'gray.400' }}
          fontSize="md"
        />
        <Icon as={SearchIcon} color="purple.500" />
      </Flex>
    </Box>
  );
}

export default Header;
