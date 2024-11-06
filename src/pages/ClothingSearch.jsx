import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import 'swiper/css'; // Swiper 기본 스타일
import CategorySwiper from '../components/CategorySwiper';
import Header from '../components/Layout/Header';
import { catagoryData } from '../data/categoryData';

function ClothingSearch() {
  return (
    <Flex direction="column" height="100vh" position="relative">
      <Header id="Clothing-Search" title="옷 보기" />

      <Flex direction="column" bg="var(--background-silver, #FAF9FF)" p="25px">
        {/* 카테고리 선택 */}
        <CategorySwiper items={catagoryData} />
        {/* 옷 스토리 게시판 */}
        <Box mt={6}>
          <Text
            color="var(--Labels-Primary, #000)"
            fontFamily="SUIT"
            fontSize="24px"
            fontStyle="normal"
            fontWeight="700"
            lineHeight="normal"
          >
            옷 스토리 게시판
          </Text>
          <Text
            color="var(--subtitle-Gray, #7D7D7D)"
            fontFamily="SUIT"
            fontSize="14px"
            fontStyle="normal"
            fontWeight="500"
            lineHeight="normal"
          >
            새 주인 찾아요, 내 이야기를 들어봐!
          </Text>

          {/* 옷 스토리 게시글이 완성되면, 종스크롤 형태로 이곳에 배치 */}
        </Box>
        <Box h="100px" />{' '}
        {/* 하단의 navigation bar로 인해 내용이 잘려서 빈 공백을 추가함 */}
      </Flex>
    </Flex>
  );
}

export default ClothingSearch;
