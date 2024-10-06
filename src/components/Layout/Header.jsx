import React from 'react';
import { Box, Text } from '@chakra-ui/react';

function Header({ title, subtitle }) {
  return (
    <Box bg="gray.100" padding="20px" textAlign="center">
      <Text fontSize="2xl" fontWeight="bold">
        {title}
      </Text>
      {subtitle && <Text fontSize="md">{subtitle}</Text>}{' '}
      {/* 서브 타이틀 표시 */}
    </Box>
  );
}

export default Header;
