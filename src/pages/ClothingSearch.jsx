import React, { useState } from 'react';
import { Box, Text, IconButton, Image, Heading, VStack, HStack, useColorModeValue } from '@chakra-ui/react';
import { FaHeart } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';

const CATEGORIES = ['Type1', 'Type2', 'Type3', 'Type4', ];

const CLOTHING_ITEMS = {
	Type1: [
		{ id: 1, name: '옷 1', image: '/images/sample_image.png', description: '옷 설명 1', likes: 0 },
		{ id: 2, name: '옷 2', image: '/images/sample_image.png', description: '옷 설명 2', likes: 0 },
	],
	Type2: [
		{ id: 3, name: '옷 3', image: '/images/sample_image.png', description: '옷 설명 3', likes: 0 },
		{ id: 4, name: '옷 4', image: '/images/sample_image.png', description: '옷 설명 4', likes: 0 },
	],
	Type3: [
		{ id: 5, name: '옷 5', image: '/images/sample_image.png', description: '옷 설명 5', likes: 0 },
	],
	Type4: [
		{ id: 6, name: '옷 6', image: '/images/sample_image.png', description: '옷 설명 6', likes: 0 },
	],
  };

function ClothingSearch() {
	const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0]);
	const [likes, setLikes] = useState({});
  return (<>
  <Box p={4}>
	<Box bg="purple.500" p={4} borderRadius="md" mb={4}>
        <Heading as="h1" size="lg" color="white" textAlign="center">
          옷 카테고리로 찾기
        </Heading>
      </Box>
      <Box overflowX="auto" whiteSpace="nowrap" mb={4} p={2}>
        <HStack spacing={4}>
          {CATEGORIES.map((category) => (
            <Box
              key={category}
              minW="100px"
              p={2}
              bg={category === selectedCategory ? 'purple.300' : 'gray.200'}
              borderRadius="md"
              cursor="pointer"
              onClick={() => setSelectedCategory(category)}
              textAlign="center"
            >
              <Text fontSize="lg" fontWeight="bold">{category}</Text>
            </Box>
          ))}
        </HStack>
      </Box>
	  <Swiper
        direction="vertical"
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        style={{ height: '400px' }}
      >
        {CLOTHING_ITEMS[selectedCategory].map((item, index) => (
          <SwiperSlide key={item.id}>
              <Text fontSize="xl" fontWeight="bold">{item.name}</Text>
            <VStack spacing={4} align="left">
              <Image
                src={item.image}
                alt={item.name}
                boxSize="250px"
                objectFit="cover"
                borderRadius="md"
              />
              <Text>{item.description}</Text>

              <HStack spacing={2} 
				justifyContent="flex-start"
					align="center">
                <IconButton
                  aria-label="Like"
                  icon={<FaHeart />}
                  colorScheme={likes[item.id] ? 'red' : 'gray'}
				  
				  onClick={() => {
					setLikes((prevLikes) => ({
					  ...prevLikes,
					  [item.id]: prevLikes[item.id] ?0:1,
					}));
				  }}
                />
                <Text>{likes[item.id] ? 1 : 0}</Text>
              </HStack>
            </VStack>
          </SwiperSlide>
        ))}
      </Swiper>

      <Box mt={6} p={4} textAlign="center" position="fixed" bottom="0">
        <Text fontSize="sm">원하는 옷을 찾아보세요!</Text>
      </Box>
    </Box></>
  );
}

export default ClothingSearch;
