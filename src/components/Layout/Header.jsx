import React from 'react';
import { Box, Text, Flex, Input, Icon as ChakraIcon, Image, Button } from '@chakra-ui/react';
import { Icon as IconifyIcon } from '@iconify/react';
import { MdiTicketOutline } from '@iconify/icons-mdi/ticket';
import { FaTicketAlt } from 'react-icons/fa';
import { SearchIcon } from '@chakra-ui/icons';

function Header({ title, subtitle, user }) {
  return (
    <Box
      zIndex="2"
      bg="transparent"
      boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
      background="var(--background-silver, #FAF9FF)"
      //padding="px"
      borderBottomRadius="xl"
      borderRadius="0px 0px 30px 30px"
      backdropFilter="backdrop-filter: blur(25px)"
      position="relative"
    >
	  <Flex 
      flexDirection="column"
      mt='25px'
      mb='25px'
      ml='25px'
      mr='25px'
      justifyContent="space-between"
    >
		  {/* 티켓 아이콘과 숫자 */}
		  <Flex justifyContent="space-between" alignItems="center" mb="19px">
        <Image
          w='39px'
          h='26px'
          src='/images/logo.png'
          alt='logo'
        />
          
				<Flex alignItems="center" gap="4px">
          <IconifyIcon style={{color: 'gray'}} icon="mdi:ticket-outline" width="25px" height="25px"/>
				  <Text fontSize="16px" fontStyle="normal" fontFamily="suit" fontWeight="600" color="gray.500">
					  {user ? user.ticketCount : 0}
				  </Text>
				</Flex>
			</Flex>

		  <Flex justifyContent="space-between" alignItems="center">
				<Text 
          
          fontSize='32px'
          fontFamily="suit"
          fontStyle="normal"
          fontWeight="800"
          lineHeight="normal"
          color="var(--21-purple-dark, #411461)"
          >
				{title}
				</Text>
        <Button
          width="40px"
          height="40px"
          padding="5px"
          justifyContent="center"
          alignItems="center"
          gap="10px"
          flexShrink="0"
          borderRadius="12px"
          border="1px solid"
          borderColor="var(--lightlight-Gray, #E8E8E8)"
          background="var(--background-silver, #FAF9FF)"
          boxShadow="0px 0px 5px 1px rgba(0, 0, 0, 0.10)"
        >
          <IconifyIcon icon="ph:magnifying-glass-bold" width="30px" height="30px" flexShrink="0"/>
        </Button>
			</Flex>

      
			{/* 서브타이틀 */}
      {/*
			{subtitle && (
				<Text fontSize="md" color="gray.500" mb={4}>
				{subtitle}
				</Text>
			)}
        */}

			{/* 검색 바 */}
      {/*
			<Flex
				alignItems="center"
				borderRadius="full"
				boxShadow="sm"
				bg="gray.100"
				paddingX="4"
				paddingY="2"
			>
				<Input
				variant="unstyled"
				placeholder="파티 찾기"
				_placeholder={{ color: 'gray.400' }}
				fontSize="md"
				/>
			</Flex>
      */}
	  </Flex>
    </Box>
  );
}

export default Header;
