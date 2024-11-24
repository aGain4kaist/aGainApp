import { Avatar, Box, Flex, Grid, Image, Text } from '@chakra-ui/react';
import React from 'react';
import Header from '../components/Layout/Header';

{
  /* 내 옷 더미데이터 */
}
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
  '../../images/3.jpg',
  '../../images/4.jpg',
  '../../images/1.jpg',
  '../../images/2.jpg',
  '../../images/3.jpg',
  '../../images/4.jpg',
  '../../images/1.jpg',
  '../../images/2.jpg',
  '../../images/3.jpg',
  '../../images/4.jpg',
];

function UploadClothes({ party }) {
  return (
    <Box px="32px" pt="45px" position="relative">
      <Text
        color="#000000"
        fontFamily="SUIT"
        fontSize="32px"
        fontWeight="800"
        mb="20px"
      >
        {party.name}
      </Text>
      {/* 내 옷 바둑판 배열 */}
      <Text
        color="var(--21-purple-dark, #411461)"
        fontFamily="SUIT"
        fontSize="20px"
        fontWeight="700"
        mb="15px"
      >
        내 옷 등록하기
      </Text>
      <Flex direction="column" height="90vh" overflowY="auto">
        <Grid
          templateColumns="repeat(3, 1fr)"
          //   columnGap="20px"
          rowGap="20px"
          justifyItems="center"
          mb="50px"
        >
          {registeredClothes.map((src, index) => (
            <Box
              key={index}
              width="110px"
              height="110px"
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
    </Box>
  );
}

export default UploadClothes;
