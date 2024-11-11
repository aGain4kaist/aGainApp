import '@/styles/Home.scss';
import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import 'swiper/css'; // Swiper 기본 스타일
import ClothingSwiper from '../components/ClothingSwiper';
import Header from '../components/Layout/Header';
import PartyListItem from '../components/PartyListItem';
import { clothingItems } from '../data/clothingItems';
import { partyListData } from '../data/partyListData';



function Home() {
  return (
    <Flex direction="column" height="100vh" position="relative">
      <Header
        id="Home"
        title="안녕하세요, again님!"
        subtitle="21%와 함께 지금까지 물 2,000L를 절약했어요."
      />
      {/* <Box className="home-page" bg="gray.100" minH="260vh" p="25px"> */}
      <Flex direction="column" bg="var(--background-silver, #FAF9FF)" p="25px">
        
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
        <Box h="100px" />{' '}
        {/* 하단의 navigation bar로 인해 내용이 잘려서 빈 공백을 추가함 */}
      </Flex>
    </Flex>
  );
}

export default Home;
