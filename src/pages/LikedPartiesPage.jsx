// src/pages/LikedPartiesPage.jsx

import PartyListItem from '@/components/PartyListItem';
import { Box, Button, Flex, Grid, Text } from '@chakra-ui/react';
import { Icon as IconifyIcon } from '@iconify/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 커스텀 BackIcon 컴포넌트 정의
const BackIcon = (props) => (
  <IconifyIcon
    icon="bx:arrow-back"
    style={{ fontSize: '24px' }}
    {...props}
  />
);

function LikedPartiesPage() {
  const [likedParties, setLikedParties] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLikedParties = async () => {
      try {
        const userId = '1'; // 실제 사용자 ID로 대체 필요

        // 사용자 데이터 가져오기
        const userResponse = await axios.get(`http://68.183.225.136:3000/user/${userId}`);
        const likedPartyIds = userResponse.data.liked_parties;

        if (likedPartyIds && likedPartyIds.length > 0) {
          // 파티 데이터 병렬로 가져오기
          const partyPromises = likedPartyIds.map((partyId) =>
            axios.get(`http://68.183.225.136:3000/party/${partyId}`)
          );

          const partiesResponses = await Promise.all(partyPromises);
          const parties = partiesResponses.map((res) => res.data);
          setLikedParties(parties);
        } else {
          setLikedParties([]);
        }
      } catch (error) {
        console.error('즐겨찾기한 파티를 가져오는 중 오류 발생:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLikedParties();
  }, []);

  // 즐겨찾기 토글 함수 (추후 구현 가능)
  const handleToggleFavorite = (partyId) => {
    // 여기에 즐겨찾기 토글 로직 추가
    console.log(`즐겨찾기 토글: 파티 ID ${partyId}`);
  };

  // 파티 아이템 클릭 시 상세 페이지로 이동
  const handlePartyClick = (party) => {
    navigate('/party', { state: { ...party } });
  };

  // 커스텀 헤더 컴포넌트
  const CustomHeader = () => (
    <Flex align="center" width="100%" mb="10px" mt="50px" ml="30px">
      <Button
        onClick={() => navigate(-1)}
        variant="ghost"
        color="#000000"
        left="0"
        padding="0"
      >
        <BackIcon />
      </Button>

      <Text textAlign="center" fontSize="24px" fontWeight="700">
        즐겨찾기한 파티
      </Text>
    </Flex>
  );

  return (
    <Flex
      direction="column"
      height="100vh"
      bg="var(--background-silver, #FAF9FF)"
    >
      {/* 상단 커스텀 헤더 */}
      <CustomHeader />

      {/* 메인 콘텐츠 */}
      <Flex
        direction="column"
        px="32px"
        flex="1"
        width="100%"
        maxWidth="800px"
        mx="auto"
        overflowY="auto"
        py="20px"
      >
        {loading ? (
          <Text textAlign="center" fontSize="18px" color="gray.500">
            로딩 중...
          </Text>
        ) : likedParties.length > 0 ? (
          <Grid
            templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
            gap="20px"
          >
            {likedParties.map((party) => (
              <PartyListItem
                key={party.id}
                party={party}
                onPartyClick={() => handlePartyClick(party)}
                onToggleFavorite={handleToggleFavorite}
                isFavorite={true} // 즐겨찾기 페이지이므로 기본적으로 즐겨찾기 상태
              />
            ))}
          </Grid>
        ) : (
          <Box textAlign="center" mt="50px">
            <Text fontSize="18px" color="gray.500">
              즐겨찾기한 파티가 없습니다.
            </Text>
          </Box>
        )}
      </Flex>
    </Flex>
  );
}

export default LikedPartiesPage;
