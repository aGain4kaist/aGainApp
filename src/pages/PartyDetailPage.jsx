import React, { useState, useEffect } from 'react';
import { Text, Flex, Box, Image, Button, Grid } from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import { Icon as IconifyIcon } from '@iconify/react/dist/iconify.js';
import axios from 'axios';

// 옷 더미 데이터
const registeredClothes = [
  '../../images/1.jpg',
  '../../images/2.jpg',
  '../../images/3.jpg',
  '../../images/4.jpg',
  '../../images/1.jpg',
  '../../images/2.jpg',
  '../../images/3.jpg',
  '../../images/4.jpg',
  '../../images/1.jpg',
  '../../images/2.jpg',
];

function PartyDetailPage() {
  const { partyId } = useParams();
  const [partyDetails, setPartyDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false); // 파티의 좋아요 상태 가져와야됨
  // 랜더링 상태 변화 ('info', 'all-clothes', 'register-mine')
  const [currentView, setCurrentView] = useState('info'); // Default view

  const navigate = useNavigate();

  const fetchPartyDetail = async (id) => {
    try {
      const response = await axios.get(
        `http://68.183.225.136:3000/party/${id}`
      );
      console.log(response.data); // got the data
      setPartyDetails(response.data); // Save the data to state
      setIsLoading(false); // Update loading state
    } catch (error) {
      console.error('파티 정보를 불러오는데 실패했습니다:', error);
      setIsLoading(false); // Even on error, stop the loading state
    }
  };

  // Fetch party details on mount
  useEffect(() => {
    fetchPartyDetail(partyId);
  }, [partyId]);

  if (isLoading) {
    return (
      <Flex
        justify="center"
        align="center"
        height="100vh"
        bg="var(--background-silver, #FAF9FF)"
      >
        <Text fontSize="xl" color="gray.600">
          Loading...
        </Text>
      </Flex>
    );
  }

  if (!partyDetails) {
    return (
      <Flex
        justify="center"
        align="center"
        height="100vh"
        bg="var(--background-silver, #FAF9FF)"
      >
        <Text fontSize="xl" color="red.600">
          파티 정보를 불러올 수 없습니다.
        </Text>
      </Flex>
    );
  }

  const { name, image, date } = partyDetails;
  const startDate = new Date(date[0]);
  const endDate = new Date(date[1]);
  const formatTime = (date) => `${date.getHours()}시 ~ ${endDate.getHours()}시`;

  const renderContent = () => {
    switch (currentView) {
      case 'info':
        return (
          <Flex
            direction="column"
            justifyContent="center"
            alignItems="center"
            gap="70px"
          >
            <Flex
              direction="column"
              alignItems="flex-start"
              gap="20px"
              alignSelf="stretch"
            >
              {/* Party Image or Placeholder */}
              <Box
                width="100%"
                height="270px"
                bg="gray.200"
                borderRadius="20px"
                overflow="hidden" // Ensure the image doesn't overflow the box
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                {image ? (
                  <Image
                    src={image} // Party image URL
                    alt={`${name} 이미지`}
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
              <Flex
                direction="column"
                justifyContent="center"
                alignItems="flex-start"
                gap="15px"
                alignSelf="stretch"
              >
                <Flex
                  direction="column"
                  alignItems="flex-start"
                  gap="2px"
                  alignSelf="stretch"
                >
                  <Text
                    alignSelf="stretch"
                    color="var(--21-purple-dark, #411461)"
                    fontSize="16px"
                    fontWeight="600"
                    lineHeight="normal"
                  >
                    {partyDetails.distance !== null &&
                    partyDetails.distance !== undefined
                      ? partyDetails.distance < 1
                        ? `내 위치로부터 ・ ${(partyDetails.distance * 1000).toFixed(0)}m`
                        : `내 위치로부터 ・ ${partyDetails.distance.toFixed(2)}km`
                      : '거리 정보를 확인할 수 없습니다'}
                  </Text>
                  <Text
                    alignSelf="stretch"
                    fontSize="32px"
                    fontWeight="800"
                    lineHeight="normal"
                  >
                    {name}
                  </Text>
                  <Flex direction="row" alignItems="center" gap="2px">
                    <IconifyIcon
                      icon={
                        isFavorite
                          ? 'ant-design:star-filled'
                          : 'ant-design:star-outlined'
                      }
                      style={{ width: '25px', height: '25px', color: 'black' }}
                      onClick={() => {}}
                    />
                    <Text
                      color="black"
                      textAlign="center"
                      fontSize="18px"
                      fontStyle="normal"
                      fontWeight="500"
                      lineHeight="normal"
                    >
                      {partyDetails.likes}
                    </Text>
                  </Flex>
                </Flex>
                <Flex
                  direction="column"
                  alignItems="flex-start"
                  gap="5px"
                  alignSelf="stretch"
                >
                  <Flex direction="row" alignItems="center" gap="10px">
                    <IconifyIcon
                      icon="uis:calender"
                      style={{
                        color: '#7D7D7D',
                        fontSize: '18px',
                      }}
                    />
                    <Text
                      color="#7D7D7D"
                      fontWeight="500"
                      fontSize="16px"
                      fontStyle="normal"
                      lineHeight="normal"
                    >
                      {`${startDate.getMonth() + 1}월 ${startDate.getDate()}일 (${['일', '월', '화', '수', '목', '금', '토'][startDate.getDay()]})`}
                    </Text>
                  </Flex>
                  <Flex direction="row" alignItems="center" gap="10px">
                    <IconifyIcon
                      icon="mdi:clock"
                      style={{
                        color: '#7D7D7D',
                        fontSize: '18px',
                      }}
                    />
                    <Text
                      color="#7D7D7D"
                      fontWeight="500"
                      fontSize="16px"
                      fontStyle="normal"
                      lineHeight="normal"
                    >
                      {formatTime(startDate)}
                    </Text>
                  </Flex>
                  <Flex direction="row" alignItems="center" gap="10px">
                    <IconifyIcon
                      icon="ic:round-location-on"
                      style={{
                        color: '#7D7D7D',
                        fontSize: '18px',
                      }}
                    />
                    <Text
                      color="#7D7D7D"
                      fontWeight="500"
                      fontSize="16px"
                      fontStyle="normal"
                      lineHeight="normal"
                    >
                      {partyDetails.address}
                    </Text>
                  </Flex>
                  <Flex direction="row" alignItems="center" gap="10px">
                    <IconifyIcon
                      icon="jam:crown-f"
                      style={{
                        color: '#7D7D7D',
                        fontSize: '18px',
                      }}
                    />
                    <Text
                      color="#7D7D7D"
                      fontWeight="500"
                      fontSize="16px"
                      fontStyle="normal"
                      lineHeight="normal"
                    >
                      {partyDetails.host[1]}님이 호스트
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
            <Flex direction="column" alignItems="flex-start" gap="12px">
              <Button
                w="200px"
                h="fit-content"
                py="13px"
                px="25px"
                justifyContent="center"
                alignItems="center"
                borderRadius="25px"
                backgroundColor="var(--lightlight-Gray, #E8E8E8)"
                boxShadow="0px 2px 4px 2px rgba(0, 0, 0, 0.25)"
                backdropFilter="blur(25px)"
                onClick={() => {
                  setCurrentView('all-clothes');
                }}
              >
                <Text
                  h="fit-content"
                  color="black"
                  fontSize="20px"
                  fontStyle="normal"
                  fontWeight="500"
                  lineHeight="normal"
                >
                  등록된 옷 확인하기
                </Text>
              </Button>
              <Button
                w="200px"
                h="fit-content"
                py="13px"
                px="25px"
                justifyContent="center"
                alignItems="center"
                borderRadius="25px"
                backgroundColor="var(--21-purple, #7C31B4)"
                boxShadow="0px 2px 4px 2px rgba(0, 0, 0, 0.25)"
                backdropFilter="blur(25px)"
                onClick={() => {
                  setCurrentView('register-mine');
                }}
              >
                <Text
                  h="fit-content"
                  color="white"
                  fontSize="20px"
                  fontStyle="normal"
                  fontWeight="700"
                  lineHeight="normal"
                >
                  내 옷 등록하기
                </Text>
              </Button>
            </Flex>
          </Flex>
        );
      case 'all-clothes':
        return (
          <Flex direction="column" gap="12px" overflow="visible">
            <Text
              color="black"
              fontFamily="SUIT"
              fontSize="32px"
              fontWeight="800"
            >
              {name}
            </Text>
            {/* 등록된 모든 옷 바둑판 배열 */}
            <Text
              color="var(--21-purple-dark, #411461)"
              fontFamily="SUIT"
              fontSize="20px"
              fontWeight="700"
            >
              파티에 등록된 옷
            </Text>
            <Flex direction="column" overflowY="auto" m="-10px">
              <Grid
                templateColumns="repeat(3, 1fr)"
                //   columnGap="20px"
                rowGap="20px"
                justifyItems="center"
                mb="50px"
                mt="12px"
              >
                {registeredClothes.map((src, index) => (
                  <Box
                    key={index}
                    width="100px"
                    height="100px"
                    borderRadius="20px"
                    overflow="hidden"
                    filter="drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.1))"
                  >
                    <Image
                      src={src}
                      alt={`Clothes ${index}`}
                      objectFit="cover"
                      width="100%"
                      height="100%"
                    />
                  </Box>
                ))}
              </Grid>
            </Flex>
          </Flex>
        );
      case 'register-mine':
        return (
          <Flex direction="column" gap="12px" overflow="visible">
            <Text
              color="black"
              fontFamily="SUIT"
              fontSize="32px"
              fontWeight="800"
            >
              {name}
            </Text>
            {/* 내 옷 바둑판 배열 */}
            <Text
              color="var(--21-purple-dark, #411461)"
              fontFamily="SUIT"
              fontSize="20px"
              fontWeight="700"
            >
              내 옷 등록하기
            </Text>
            <Flex direction="column" overflowY="auto" m="-10px">
              <Grid
                templateColumns="repeat(3, 1fr)"
                //   columnGap="20px"
                rowGap="20px"
                justifyItems="center"
                mb="50px"
                mt="12px"
              >
                {registeredClothes.map((src, index) => (
                  <Box
                    key={index}
                    width="100px"
                    height="100px"
                    borderRadius="20px"
                    overflow="hidden"
                    filter="drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.1))"
                  >
                    <Image
                      src={src}
                      alt={`Clothes ${index}`}
                      objectFit="cover"
                      width="100%"
                      height="100%"
                    />
                  </Box>
                ))}
              </Grid>
            </Flex>
          </Flex>
        );
      default:
        return null;
    }
  };

  return (
    <Flex
      direction="column"
      height="100vh"
      bg="var(--background-silver, #FAF9FF)"
      p="36px"
      overflow="visible" // for the sake of grid item shadows (패딩 때문에 안 잘리도록)
    >
      {/* chevron-left: go back header */}
      <Flex w="100%" pb="20px">
        <IconifyIcon
          icon="icon-park-outline:left"
          style={{
            color: '#000',
            fontSize: '40px',
            marginLeft: '-15px',
          }}
          onClick={() => {
            if (currentView === 'info') {
              navigate(-1);
            } else {
              setCurrentView('info');
            }
          }}
        />
      </Flex>

      {/* Conditionally render view */}
      {renderContent()}
    </Flex>
  );
}

export default PartyDetailPage;
