import { React, useState, useEffect } from 'react';
import { Box, Flex, Text, Button, Image } from '@chakra-ui/react';
import { Icon as IconifyIcon } from '@iconify/react';

function PartyDetail({ party, onBack }) {
  // 파티 시작 및 종료 시간 포맷
  const startTime = new Date(party.date[0]);
  const endTime = new Date(party.date[1]);
  const formatTime = (date) => `${date.getHours()}시 ~ ${endTime.getHours()}시`;
  const imageUrl = party.image ? party.image : null;
  const [isFavorite, setIsFavorite] = useState(false); // 파티의 좋아요 상태 가져와야됨
  const handleFavClick = (e) => {
    e.stopPropagation(); // Prevent triggering the onPartyClick
    setIsFavorite(!isFavorite);
  };
  useEffect(() => {
    console.log(party, 'party');
  }, []);
  return (
    <Box px="35px" pt="52px" position="relative" zIndex="20">
      {/* 파티 이미지 또는 기본 박스 */}
      <Box
        width="100%"
        height="200px"
        bg="gray.200"
        mx="auto"
        mb={4}
        borderRadius="lg"
        overflow="hidden" // 이미지가 박스 경계를 넘지 않도록 설정
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {imageUrl ? (
          <Image
            src={imageUrl} // 이미지 URL
            alt={`${party.name} 이미지`}
            objectFit="cover"
            width="100%"
            height="100%"
          />
        ) : (
          <Text color="gray.500" fontSize="lg">
            이미지 없음
          </Text>
        )}
      </Box>

      {/* 파티 정보 */}
      <Box>
        <Text color="#411461" fontWeight="semibold">
          {party.distance !== null && party.distance !== undefined
            ? party.distance < 1
              ? `내 위치로부터 ・ ${(party.distance * 1000).toFixed(0)}m`
              : `내 위치로부터 ・ ${party.distance.toFixed(2)}km`
            : '거리 정보를 확인할 수 없습니다'}
        </Text>

        <Text fontSize="32px" fontWeight={800}>
          {party.name}
        </Text>
        <Flex alignItems="center">
          <IconifyIcon
            icon={
              isFavorite ? 'ant-design:star-filled' : 'ant-design:star-outlined'
            }
            style={{ color: 'black', fontSize: '25px', marginRight: '10px' }}
            onClick={handleFavClick}
          />
          <Text fontSize="lg" fontWeight={500}>
            {party.likes}
          </Text>
        </Flex>
        <Box height="15px"></Box>

        <Flex direction="column" gap="5px">
          <Flex alignItems="center">
            <IconifyIcon
              icon="uis:calender"
              style={{
                color: '#7D7D7D',
                fontSize: '18px',
                marginRight: '10px',
              }}
            />
            <Text color="#7D7D7D" fontWeight={500}>
              {`${startTime.getMonth() + 1}월 ${startTime.getDate()}일 (${['일', '월', '화', '수', '목', '금', '토'][startTime.getDay()]})`}
            </Text>
          </Flex>
          <Flex alignItems="center">
            <IconifyIcon
              icon="mdi:clock"
              style={{
                color: '#7D7D7D',
                fontSize: '18px',
                marginRight: '10px',
              }}
            />
            <Text color="#7D7D7D" fontWeight={500}>
              {formatTime(startTime)}
            </Text>
          </Flex>
          <Flex alignItems="center">
            <IconifyIcon
              icon="ic:round-location-on"
              style={{
                color: '#7D7D7D',
                fontSize: '18px',
                marginRight: '10px',
              }}
            />
            <Text color="#7D7D7D" fontWeight={500}>
              {party.address}
            </Text>
          </Flex>
          <Flex alignItems="center">
            <IconifyIcon
              icon="jam:crown-f"
              style={{
                color: '#7D7D7D',
                fontSize: '18px',
                marginRight: '10px',
              }}
            />
            <Text color="#7D7D7D" fontWeight={500}>
              {party.host[1]}님이 호스트
            </Text>
          </Flex>
        </Flex>
      </Box>

      <Box height="71px"></Box>

      {/* 버튼 */}
      <Flex
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap="12px"
      >
        <Button
          width="200px"
          height="51px"
          gap="10px"
          borderRadius="25px"
          backgroundColor="#7C31B4"
          boxShadow="0px 2px 4px 2px rgba(0, 0, 0, 0.25)"
          _hover={{ backdropFilter: 'blur(25px)' }}
          color="white"
          fontSize="lg"
          fontWeight={700}
        >
          내 옷 등록하기
        </Button>
        <Button
          width="200px"
          height="51px"
          gap="10px"
          borderRadius="25px"
          backgroundColor="#E8E8E8"
          boxShadow="0px 2px 4px 2px rgba(0, 0, 0, 0.25)"
          _hover={{ backdropFilter: 'blur(25px)' }}
          color="black"
          fontSize="lg"
          fontWeight={700}
        >
          등록된 옷 확인하기
        </Button>
      </Flex>
    </Box>
  );
}

export default PartyDetail;
