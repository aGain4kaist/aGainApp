import '@/styles/Home.scss';
import { Box, Flex, Text } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup';
import { useNavigate } from 'react-router-dom';
import 'swiper/css'; // Swiper 기본 스타일
import ClothingSwiper from '../components/ClothingSwiper';
import Header from '../components/Layout/Header';
import PartyListItem from '../components/PartyListItem';
import { clothingItems } from '../data/clothingItems';
import { useUser } from '../utils/UserContext';

function Home() {
  const [partyList, setPartyList] = useState([]); // 파티 리스트 상태
  const [tradeCount, setTradeCount] = useState(0); // Trade 횟수 상태
  const [savedWater, setSavedWater] = useState(0); // 절약한 물 상태

  const { user } = useUser(); // user context 정보

  const navigate = useNavigate(); // 라우팅을 위한 navigate 함수

  // 파티 리스트를 불러오는 함수
  const fetchPartyList = async () => {
    try {
      const response = await axios.get('http://68.183.225.136:3000/party'); // API 호출
      setPartyList(response.data); // 응답 데이터를 상태에 저장
    } catch (error) {
      console.error('파티 목록을 불러오는데 실패했습니다:', error);
    }
  };

  // Trade 횟수를 불러오는 함수
  const fetchTradeCount = async () => {
    const UserId = 1; // 일단 사용자 ID를 1로 지정.

    /*
    if (!user || !user.id) {
      console.error('사용자 정보가 없습니다.');
      return;
    }
    */

    try {
      const response = await axios.get(
        `http://68.183.225.136:3000/user/trade/${UserId}`
      ); // API 호출
      const count = response.data.trades || 0; // trades 필드 사용
      setTradeCount(count);
      setSavedWater(count * 291); // 절약한 물 계산
    } catch (error) {
      console.error('Trade 횟수를 불러오는데 실패했습니다:', error);
    }
  };

  useEffect(() => {
    fetchPartyList(); // 컴포넌트가 처음 렌더링될 때 파티 리스트 불러오기
    fetchTradeCount(); // Trade 횟수 불러오기
  }, [user]); // user가 변경될 때마다 Trade 횟수 업데이트

  return (
    <Flex direction="column" height="100vh" position="relative">
      <Header
        id="Home"
        title={`안녕하세요, ${user.displayName}님!`}
        subtitle={
          <Text
            fontSize="18px"
            color="var(--Backgrounds-Primary, #FFF)"
            fontFamily="suit"
            fontStyle="normal"
          >
            21%와 함께 지금까지 물{' '}
            <Text as="span" fontWeight="700">
              <CountUp end={savedWater} duration={1.5} />L
            </Text>
            를 절약했어요.
          </Text>
        }
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
              <PartyListItem
                key={party.id}
                onPartyClick={() => {
                  navigate(`/party/${party.id}`);
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
