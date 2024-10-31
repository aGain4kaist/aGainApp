import '@/styles/Home.scss';
import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import 'swiper/css'; // Swiper 기본 스타일
import ClothingSwiper from '../components/ClothingSwiper';
import PartyListItem from '../components/PartyListItem';
import { clothingItems } from '../data/clothingItems';
import { partyListData } from '../data/partyListData';

function Home() {
  return (
    <Box className="home-page" bg="gray.100" minH="100vh" p="25px">
      {/* 상단 헤더 */}
      <Box bg="purple.400" borderRadius="md" p={4} color="white">
        <Text fontSize="2xl" fontWeight="bold">
          안녕 aGAIN! 👕
        </Text>
        <Text fontSize="sm">지금까지 6번의 교환으로 총 99L를 절약했어! :)</Text>
      </Box>

      {/* 옷 등록 영역 */}
      <ClothingSwiper items={clothingItems} />

      {/* 곧 열리는 파티들 */}
      <Box mt={6}>
        <Text fontSize="2xl" fontWeight="bold">
          곧 열리는 파티들
        </Text>
        <Flex direction="column">
          {partyListData.map((party) => (
            <PartyListItem
              key={party.id}
              onPartyClick={() => {}} // temporary empty function
              party={party}
            />
          ))}
        </Flex>
      </Box>
    </Box>
  );
}

export default Home;
