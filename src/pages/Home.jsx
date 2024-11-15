import '@/styles/Home.scss';
import { Box, Flex, Text } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'swiper/css'; // Swiper 기본 스타일
import { useNavigate } from 'react-router-dom';
import ClothingSwiper from '../components/ClothingSwiper';
import Header from '../components/Layout/Header';
import PartyListItem from '../components/PartyListItem';
import { clothingItems } from '../data/clothingItems';

function Home() {
  const [partyList, setPartyList] = useState([]); // 파티 리스트 상태
  // 파티 리스트를 불러오는 함수
  const fetchPartyList = async () => {
    try {
      const response = await axios.get('http://localhost:3000/party'); // API 호출
      setPartyList(response.data); // 응답 데이터를 상태에 저장
    } catch (error) {
      console.error('파티 목록을 불러오는데 실패했습니다:', error);
    }
  };

  const navigate = useNavigate();   // to navigate when a party is clicked

  useEffect(() => {
    fetchPartyList(); // 컴포넌트가 처음 렌더링될 때 파티 리스트 불러오기
  }, []);

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
            {partyList.map((party) => (
              // {partyListData.map((party) => (
              <PartyListItem
                key={party.id}
                onPartyClick={() => {
                  navigate("/party", {state : { ...party }})
                }} // to party page
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
