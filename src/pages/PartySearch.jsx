import React from 'react';
import { useUser } from '../utils/UserContext';
import KakaoMap from '../utils/KakaoMap';
import { Box, Flex } from '@chakra-ui/react';

function PartySearch() {
  const { user, setUser } = useUser();
  return (
    <Flex direction="column" height="100vh">
      {/* 헤더 */}
      <Box bg="gray.100" padding="20px" textAlign="center">
        <h1>Welcome, {user ? user.name : 'Guest'}!</h1>
        <button onClick={() => setUser({ name: 'John Doe' })}>Set User</button>
      </Box>

      {/* 카카오맵이 가운데 공간을 채움 */}
      <Box flex="1" width="100%">
        {/* 남은 공간을 채움 */}
        <KakaoMap />
      </Box>
    </Flex>
  );
}

export default PartySearch;
