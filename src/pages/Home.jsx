import '@/styles/Home.scss';
import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import 'swiper/css'; // Swiper 기본 스타일
import { Swiper, SwiperSlide } from 'swiper/react';
import Header from '../components/Layout/Header';
import PartyListItem from '../components/PartyListItem';
import { partyListData } from '../data/partyListData';

// dummy items
const clothingItems = ['글 1', '글 2', '글 3', '글 4'];

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
        <Box mt={6}>
          <Text fontSize="lg" fontWeight="bold" mb={4}>
            주변에 이런 옷이 등록 됐어!
          </Text>
          {/* 수평 슬라이더 */}
          <Flex overflowX="auto" whiteSpace="nowrap" paddingBottom="10px">
            {clothingItems.map((item, index) => (
              <Box
                key={index}
                className="clothing-card"
                bg="blue.300"
                minWidth="150px"
                h="100px"
                borderRadius="md"
                textAlign="center"
                lineHeight="100px"
                fontWeight="bold"
                mr={4} // 박스 간격
              >
                {item}
              </Box>
            ))}
          </Flex>
        </Box>
        {/* Swiper 슬라이더 */}
        <Box mt={6}>
          <Text fontSize="lg" fontWeight="bold" mb={4}>
            주변에 이런 옷이 등록 됐어!
          </Text>
          <Swiper spaceBetween={20} slidesPerView="auto" freeMode={true}>
            {clothingItems.map((item, index) => (
              <SwiperSlide key={index} style={{ width: '150px' }}>
                <Box
                  className="clothing-card"
                  bg="blue.300"
                  h="100px"
                  borderRadius="md"
                  textAlign="center"
                  lineHeight="100px"
                  fontWeight="bold"
                >
                  {item}
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
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
