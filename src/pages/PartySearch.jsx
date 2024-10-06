import React from 'react';
import { useUser } from '../utils/UserContext';
import KakaoMap from '../utils/KakaoMap';
import { Box, Flex } from '@chakra-ui/react';
import Header from '../components/Layout/Header'; // Header 컴포넌트 불러오기

function PartySearch() {
  const { user, setUser } = useUser();
  return (
    <Flex direction="column" height="100vh">
      {/* 헤더 */}
      <Header
        title={`Welcome, ${user ? user.name : 'Guest'}!`}
        subtitle="내 주변의 파티를 찾아보세요"
      />

      {/* 카카오맵이 가운데 공간을 채움 */}
      <Box flex="1" width="100%">
        {/* 남은 공간을 채움 */}
        <KakaoMap />
      </Box>
    </Flex>
  );
}

export default PartySearch;
