import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

function ClothingSwiper({ items }) {
  return (
    <Box mt={6}>
      <Text fontSize="lg" fontWeight="bold" mb={2}>
        주변에 이런 옷이 등록됐어!
      </Text>
      <Swiper spaceBetween={20} slidesPerView="auto">
        {items.map((item) => (
          <SwiperSlide key={item.id} style={{ width: '150px' }}>
            <Box
              bg="white"
              borderRadius="20px"
              boxShadow="0px 0px 10px 1px rgba(0, 0, 0, 0.10)"
              overflow="hidden"
              textAlign="center"
            >
              <Box
                bg={`url(${`/images/${item.image}`}) lightgray`}
                backgroundPosition="center"
                backgroundSize="cover"
                backgroundRepeat="no-repeat"
                width="100%"
                height="150px"
                borderRadius="20px 20px 0px 0px"
              />
                <Box mt={1}></Box>
              <Text fontSize="md" fontWeight="bold" color="purple.700" mb={-1.5}>
                {item.name}
              </Text>
              <Text fontSize="sm" fontWeight="light" color="gray.600">
                {' '}
                {item.brand}
              </Text>
              <Text fontSize="xs" fontWeight="bold" color="gray.600" mb={2}>
                {item.size}
              </Text>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}

export default ClothingSwiper;
