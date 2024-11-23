import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Text,
  IconButton,
  Image,
  Heading,
  VStack,
  HStack,
  Button,
  Spinner,
  useToast,
} from '@chakra-ui/react';
import { FaHeart } from 'react-icons/fa';
import UserProfile from './UserProfile';
import axios from 'axios';

const dummyUser = {
  id: 'admin',
  username: 'admin',
  profile_picture: '/images/profile.jpg',
};

function getPartyName(id) {
  return '카이스트 본원 파티';
}

function ClothingPost({ id, post: initialPost, hasLikeButton }) {
  const [post, setPost] = useState(initialPost || null);
  const [likes, setLikes] = useState(post?.likes || 0);
  const [isLoading, setIsLoading] = useState(!initialPost);
  const toast = useToast();

  useEffect(() => {
    if (!initialPost && id) {
      // Fetch post data from the API if not provided directly
      setIsLoading(true);
      console.log('asdf');
      const fetchPost = async () => {
        try {
          const response = await axios.get('http://localhost:3000/cloth/${id}'); // API 호출
          setPost(response.data);
          setLikes(response.data.likes);
          setIsLoading(false);
        } catch (error) {
          console.error('Error fetching post:', error); // 에러 상세 출력
          toast({
            title: 'Failed to load post',
            description: `Error: ${error.message}`,
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
          setIsLoading(false);
        }
      };
      fetchPost();
    }
  }, [id, initialPost, toast]);

  if (isLoading) {
    return (
      <Box textAlign="center" py={10}>
        <Spinner size="xl" />
      </Box>
    );
  }

  if (!post) {
    return (
      <Box textAlign="center" py={10}>
        <Text>Post not found</Text>
      </Box>
    );
  }

  return (
    <Flex
      borderRadius="20px 20px 20px 20px"
      overflow="hidden"
      flexDirection="column"
      position="relative"
      boxShadow="0px 0px 10px 1px rgba(0, 0, 0, 0.10)" // box-shadow 추가
      bg="var(--background-silver, #FFFFFF)"
    >
      {/* 사용자 프로필 */}

      <Box mt="10px" ml="16px">
        <UserProfile user={dummyUser} />
      </Box>

      {/* 옷 사진 */}
      <Image
        src={post.image}
        alt={post.name}
        maxH="240px"
        objectFit="cover"
        borderRadius="md"
      />

      <Flex direction="column" mt="11px" mb="11px" ml="13px" mr="13px">
        {/* 좋아요 버튼 */}
        {hasLikeButton && (
          <Flex direction="row" justifyContent="space-between" width="100%">
            <HStack spacing={2} align="center">
              <IconButton
                w="22px"
                h="24px"
                minW="0"
                aria-label="Like"
                icon={<FaHeart />}
                variant="ghost"
                colorScheme={likes > 0 ? 'red' : 'gray'}
                onClick={() => {
                  setLikes((prevLikes) => (prevLikes > 0 ? 0 : 1));
                }}
                _hover={{ bg: 'transparent' }}
                _focus={{ bg: 'transparent' }}
                _active={{ bg: 'transparent' }}
              />
              <Text>{likes}</Text>
            </HStack>
            <Text
              color="var(--subtitle-Gray, #7D7D7D)"
              textAlign="right"
              fontFamily="SUIT"
              fontSize="12px"
              fontStyle="normal"
              fontWeight="700"
              lineHeight="normal"
            >
              {post.size}
            </Text>
          </Flex>
        )}

        {hasLikeButton && (
          <Flex direction="row" alignItems="center">
            <Text
              color="var(--21-purple-dark, #411461)"
              fontFamily="SUIT"
              fontSize="20px"
              fontStyle="normal"
              fontWeight="700"
              lineHeight="normal"
              mr="8px"
            >
              {post.name}
            </Text>
            <Text
              color="var(--subtitle-Gray, #7D7D7D)"
              textAlign="center"
              fontFamily="SUIT"
              fontSize="14px"
              fontStyle="normal"
              fontWeight="500"
              lineHeight="normal"
            >
              {getPartyName(post.party)}
            </Text>
          </Flex>
        )}

        {!hasLikeButton && (
          <Flex
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <Text
              color="var(--21-purple-dark, #411461)"
              fontFamily="SUIT"
              fontSize="20px"
              fontStyle="normal"
              fontWeight="700"
              lineHeight="normal"
              mr="8px"
            >
              {post.name}
            </Text>
            <Text
              color="var(--subtitle-Gray, #7D7D7D)"
              textAlign="right"
              fontFamily="SUIT"
              fontSize="12px"
              fontStyle="normal"
              fontWeight="700"
              lineHeight="normal"
            >
              {post.size}
            </Text>
          </Flex>
        )}

        <Text
          color="#000"
          fontFamily="SUIT"
          fontSize="14px"
          fontStyle="normal"
          fontWeight="400"
          lineHeight="normal"
          mt="3px"
        >
          {post.description}
        </Text>
        <Text
          color="var(--21-purple, #7C31B4)"
          fontFamily="SUIT"
          fontSize="11px"
          fontStyle="normal"
          fontWeight="700"
          lineHeight="normal"
          mt="3px"
        >
          {new Date(post.upload_date).getFullYear()}년{' '}
          {new Date(post.upload_date).getMonth()}월{' '}
          {new Date(post.upload_date).getDate()}일
        </Text>
      </Flex>
    </Flex>
  );
}

export default ClothingPost;
