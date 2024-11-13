import { Avatar, Box, Flex, Grid, Image, Text } from '@chakra-ui/react';
import React from 'react';
import Header from '../components/Layout/Header';

{/* 등록한 옷 더미데이터 */}
const registeredClothes = [
  '/images/register1.jpg',
  '/images/register2.jpg',
  '/images/register3.jpg',
  '/images/register4.jpg',
  '/images/register5.jpg',
  '/images/register6.jpg',
  
  
  
];


{/* 교환받은 옷 더미데이터 */}
const exchangedClothes = [
  '/images/exchange1.jpg',
  '/images/exchange2.jpg',
  '/images/exchange3.jpg',
  '/images/exchange4.jpg',
  '/images/exchange5.jpg',
];

function MyClothes() {
  return (
    <Flex direction="column" height="100vh" overflowY="auto" pb={100} bg="var(--background-silver, #FAF9FF)">
      {/* 상단 헤더 */}
      <Header id="MyClothes" title="내 옷장" />

      {/* 프로필 섹션 */}
      <Flex align="center" mb="33px" ml="25px">
        <Avatar size="lg" src="/images/profile.jpg" width="84px"
    height="86.4px"
    flexShrink={0}/>
        <Box ml="15px">
          <Text fontFamily="SUIT"
        color="var(--Labels-Primary, #000)"
        fontSize="24px"
        fontWeight="700">again</Text>
          <Text fontFamily="SUIT"
        color="var(--Labels-Primary, #000)"
        fontSize="16px"
        fontWeight="500" mb="10px" width="262px">
            대전 거주 중인 대학생입니다 :)<br />계절마다 옷장이 넘쳐서 정리하고 싶어요
          </Text>
          {/* 좋아요와 즐겨찾기 아이콘 */}
        <Flex align="center" gap="3px">
        <Image src="/heart_outline.svg" w="20px" h="20px" />
        <Text fontFamily="SUIT"
        color="var(--Labels-Primary, #000)"
        fontSize="14px"
        fontWeight="300" mr="16px">좋아요 한 옷</Text>
        <Image src="/star_outline.svg" w="20px" h="20px" />

        <Text fontFamily="SUIT"
        color="var(--Labels-Primary, #000)"
        fontSize="14px"
        fontWeight="300" >즐겨찾기 한 파티</Text>
      </Flex>
        </Box>
      </Flex>

      

      {/* 등록한 옷 바둑판 배열 */}
      <Text
        ml="25px"
        color="var(--Labels-Primary, #000)"
        fontFamily="SUIT"
        fontSize="24px"
        fontWeight="700"
        mb="15px"
      >
        등록한 옷
      </Text>
      <Grid
        templateColumns="repeat(auto-fill, minmax(80px, 1fr))"
        ml="25px"
        mr="25px"
        columnGap="20px"
        rowGap="20px"
        justifyItems="center"
        mb="33px"
      >
        {registeredClothes.map((src, index) => (
          <Box
            key={index}
            width="80px"
            height="80px"
            borderRadius="20px"
            overflow="hidden"
            filter="drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.1))"
          >
            <Image src={src} alt={`Clothes ${index}`} objectFit="cover" width="100%" height="100%" />
          </Box>
        ))}
      </Grid>

      {/* 교환 받은 옷 바둑판 배열 */}
      <Text
        ml="25px"
        color="var(--Labels-Primary, #000)"
        fontFamily="SUIT"
        fontSize="24px"
        fontWeight="700"
        mb="15px"
      >
        교환 받은 옷
      </Text>
      <Grid
        templateColumns="repeat(auto-fill, minmax(80px, 1fr))"
        ml="25px"
        mr="25px"
        columnGap="20px"
        rowGap="20px"
        justifyItems="center"
        mb="33px"
      >
        {exchangedClothes.map((src, index) => (
          <Box
            key={index}
            width="80px"
            height="80px"
            borderRadius="20px"
            overflow="hidden"
            filter="drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.1))"
          >
            <Image src={src} alt={`Exchanged Clothes ${index}`} objectFit="cover" width="100%" height="100%" />
          </Box>
        ))}
      </Grid>
    </Flex>
    
  );
}

export default MyClothes;
