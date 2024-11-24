import {
  Button,
  Flex,
  Icon,
  Image,
  Input,
  Select,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  Textarea,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 커스텀 BackIcon
const BackIcon = (props) => (
  <Icon
    width="11px"
    height="20px"
    viewBox="0 0 11 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M10 19L1 10L10 1"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Icon>
);

function PutClothes() {
  const navigate = useNavigate();
  const [story, setStory] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [nickname, setNickname] = useState('');

  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  //키워드 (추후 AI 사용) 더미데이터
  const dummyKeywords = ['따뜻한', '부드러운', '베이지 색', '니트', '남성복'];

  //프로필 키, 몸무게의 더미데이터
  const handleProfileSizeClick = () => {
    setHeight('180');
    setWeight('70');
  };

  // 키워드 추출 버튼 동작
  const handleExtractKeywords = () => {
    setKeywords(dummyKeywords);
  };

  // 태그 클릭 시 "내 옷의 이야기"에 추가
  const handleTagClick = (keyword) => {
    // 중복 키워드 추가 방지
    if (!story.includes(keyword)) {
      setStory((prev) => (prev ? `${prev} ${keyword}` : keyword));
    }
  };

  return (
    <Flex
      direction="column"
      align="center"
      bg="var(--background-silver, #FAF9FF)"
      minHeight="100vh"
      width="100%"
    >
      {/* 상단 헤더 */}
      <Flex align="center" width="100%" mb="55px" mt="50px" ml="30px">
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
          옷 넣어두기
        </Text>
      </Flex>

      {/* 이미지 업로드 */}
      <Flex
        justify="center"
        align="center"
        bg="#FFFFFF"
        borderRadius="20px"
        height="180px"
        width="180px"
        mb="55px"
        flexShrink={0}
        boxShadow="0px 2px 4px 1px rgba(0, 0, 0, 0.10)"
        style={{ backdropFilter: 'blur(25px)' }}
      >
        <Image
          src="/camera.png"
          alt="Camera Icon"
          boxSize="60px"
          objectFit="cover"
        />
      </Flex>

      {/* 스크롤 가능한 메인 콘텐츠 */}
      <Flex
        direction="column"
        px="32px"
        flex="1"
        width="100%"
        maxWidth="600px"
        overflowY="auto"
        paddingBottom="20px"
      >
        {/* 옷 별명 */}
        <Flex
          mb="50px"
          flexDirection={{ base: 'column', sm: 'row' }}
          alignItems="center"
          width="100%"
          minHeight="72px" // 최소 높이 설정
        >
          <Text
            fontFamily="SUIT"
            fontSize="20px"
            fontWeight="700"
            color="var(--21-purple-dark, #411461)"
            mb={{ base: '10px', sm: '0' }}
            mr={{ base: '0', sm: '30px' }} // 'sm' 이상에서 30px 간격
            width={{ base: '100%', sm: 'auto' }}
          >
            옷 별명
          </Text>
          <Input
            placeholder="내 옷만의 별명을 지어주세요"
            borderRadius="12px"
            bg="#FFFFFF"
            fontSize="14px"
            height="32px"
            width={{ base: '100%', sm: 'auto' }}
            flex="1"
            boxShadow="0px 2px 4px 1px rgba(0, 0, 0, 0.10)"
            backdropFilter="blur(25px)"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </Flex>

        {/* 내 옷의 이야기 */}
        <Text
          fontFamily="SUIT"
          fontSize="20px"
          fontWeight="700"
          color="var(--21-purple-dark, #411461)"
          mb="10px"
        >
          내 옷의 이야기
        </Text>
        <Textarea
          placeholder="이 옷은 어떤 추억을 담고 있나요?"
          mb="31px"
          bg="#FFFFFF"
          borderRadius="25px"
          fontSize="14px"
          border="none"
          resize="none"
          boxShadow="0px 2px 4px 1px rgba(0, 0, 0, 0.10)"
          backdropFilter="blur(25px)"
          value={story}
          onChange={(e) => setStory(e.target.value)}
        />
        <Button
          variant="outline"
          color="var(--21-purple, #7C31B4)"
          borderColor="var(--21-purple, #7C31B4)"
          mb="31px"
          bg="#FFFFFF"
          borderRadius="25px"
          fontSize="14px"
          onClick={handleExtractKeywords}
        >
          키워드 추출하기
        </Button>

        {/* 키워드 태그 */}
        {keywords.length > 0 && (
          <Flex
            padding="15px"
            alignItems="flex-start"
            alignContent="flex-start"
            gap="10px"
            flexWrap="wrap"
            borderRadius="25px"
            border="1px solid var(--21-purple, #7C31B4)"
            bg="#FFFFFF"
            boxShadow="0px 2px 4px 1px rgba(0, 0, 0, 0.10)"
            backdropFilter="blur(25px)"
            mb="31px"
          >
            {keywords.map((keyword, index) => (
              <Tag
                size="sm"
                key={index}
                borderRadius="15px"
                variant="solid"
                colorScheme="purple"
                bg="var(--lightlight-Gray, #f0f0f0)"
                display="flex"
                padding="5px 8px"
                alignItems="center"
                gap="10px"
                color="#000000"
                cursor="pointer"
                onClick={() => handleTagClick(keyword)}
              >
                <TagLabel>{keyword}</TagLabel>
                <TagCloseButton
                  onClick={(e) => {
                    e.stopPropagation();
                    setKeywords(keywords.filter((_, i) => i !== index));
                  }}
                />
              </Tag>
            ))}
          </Flex>
        )}

        {/* 카테고리 */}
        <Flex
          mb="24px"
          flexDirection={{ base: 'column', sm: 'row' }}
          alignItems="center"
          width="100%"
        >
          <Text
            fontFamily="SUIT"
            fontSize="20px"
            fontWeight="700"
            color="var(--21-purple-dark, #411461)"
            mb={{ base: '10px', sm: '0' }}
            mr={{ base: '0', sm: '30px' }}
            width={{ base: '100%', sm: 'auto' }}
          >
            카테고리
          </Text>
          <Select
            placeholder="카테고리를 선택하세요"
            borderRadius="25px"
            fontSize="14px"
            height="32px"
            width={{ base: '100%', sm: 'auto' }}
            flex="1"
            bg="#FFFFFF"
            boxShadow="0px 2px 4px 1px rgba(0, 0, 0, 0.10)"
            backdropFilter="blur(25px)"
          >
            <option value="top">상의</option>
            <option value="bottom">하의</option>
            <option value="outer">아우터</option>
            <option value="accessory">액세서리</option>
          </Select>
        </Flex>

        {/* 옷 사이즈 */}
        <Flex
          mb="24px"
          flexDirection={{ base: 'column', sm: 'row' }}
          alignItems="center"
          width="100%"
        >
          <Text
            fontFamily="SUIT"
            fontSize="20px"
            fontWeight="700"
            color="var(--21-purple-dark, #411461)"
            mb={{ base: '10px', sm: '0' }}
            mr={{ base: '0', sm: '30px' }}
            width={{ base: '100%', sm: 'auto' }}
          >
            옷 사이즈
          </Text>
          <Select
            placeholder="사이즈를 선택하세요"
            borderRadius="25px"
            fontSize="14px"
            height="32px"
            width={{ base: '100%', sm: 'auto' }}
            flex="1"
            bg="#FFFFFF"
            boxShadow="0px 2px 4px 1px rgba(0, 0, 0, 0.10)"
            backdropFilter="blur(25px)"
          >
            <option value="small">S</option>
            <option value="medium">M</option>
            <option value="large">L</option>
            <option value="extra-large">XL</option>
          </Select>
        </Flex>

        {/* 사이즈 리뷰 */}
        <Flex
          mb="15px"
          flexDirection={{ base: 'column', sm: 'row' }}
          alignItems="flex-start"
          width="100%"
        >
          {/* 라벨 */}
          <Text
            fontFamily="SUIT"
            fontSize="20px"
            fontWeight="700"
            color="var(--21-purple-dark, #411461)"
            mb={{ base: '10px', sm: '0' }}
            mr={{ base: '0', sm: '30px' }} // 'sm' 이상에서 30px 간격
            width={{ base: '100%', sm: 'auto' }}
          >
            사이즈 리뷰
          </Text>

          {/* 입력 필드 컨테이너 */}
          <Flex
            direction="column"
            width={{ base: '100%', sm: 'auto' }}
            flex="1"
          >
            {/* '키' 입력 필드 */}
            <Flex
              alignItems="center"
              borderRadius="25px"
              bg="#FFF"
              mb="10px"
              boxShadow="0px 2px 4px 1px rgba(0, 0, 0, 0.10)"
              backdropFilter="blur(25px)"
              width="100%"
            >
              <Text
                fontFamily="SUIT"
                fontSize="14px"
                fontWeight="700"
                color="#411461"
                ml="16px"
                mr="5px"
                width="70px" // 라벨 너비를 동일하게 설정
              >
                키:
              </Text>
              <Input
                type="number"
                placeholder="키를 입력하세요 (단위: cm)"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                borderRadius="25px"
                bg="#FFF"
                fontSize="14px"
                height="32px"
                border="none"
                flex="1"
                _focus={{
                  outline: 'none',
                  boxShadow: '0px 2px 4px 1px rgba(0, 0, 0, 0.15)',
                }}
              />
            </Flex>

            {/* '몸무게' 입력 필드 */}
            <Flex
              alignItems="center"
              borderRadius="25px"
              bg="#FFF"
              boxShadow="0px 2px 4px 1px rgba(0, 0, 0, 0.10)"
              backdropFilter="blur(25px)"
              width="100%"
            >
              <Text
                fontFamily="SUIT"
                fontSize="14px"
                fontWeight="700"
                color="#411461"
                ml="16px"
                mr="5px"
                width="70px" // 동일한 라벨 너비
              >
                몸무게:
              </Text>
              <Input
                type="number"
                placeholder="몸무게를 입력하세요 (단위: kg)"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                borderRadius="25px"
                bg="#FFF"
                fontSize="14px"
                height="32px"
                border="none"
                flex="1"
                _focus={{
                  outline: 'none',
                  boxShadow: '0px 2px 4px 1px rgba(0, 0, 0, 0.15)',
                }}
              />
            </Flex>
          </Flex>
        </Flex>

        <Text
          mb="31px"
          color="var(--subtitle-Gray, #7D7D7D)"
          textAlign="right"
          fontFamily="SUIT"
          fontSize="12px"
          fontWeight="700"
          textDecoration="underline"
          cursor="pointer"
          onClick={handleProfileSizeClick}
        >
          프로필 사이즈 가져오기
        </Text>

        {/* 체감 사이즈 */}
        <Flex
          mb="24px"
          flexDirection={{ base: 'column', sm: 'row' }}
          alignItems="center"
          width="100%"
        >
          <Text
            fontFamily="SUIT"
            fontSize="20px"
            fontWeight="700"
            color="var(--21-purple-dark, #411461)"
            mb={{ base: '10px', sm: '0' }}
            mr={{ base: '0', sm: '30px' }}
            width={{ base: '100%', sm: 'auto' }}
          >
            체감 사이즈
          </Text>
          <Select
            placeholder="체감 사이즈를 선택하세요"
            borderRadius="25px"
            fontSize="14px"
            height="32px"
            width={{ base: '100%', sm: 'auto' }}
            flex="1"
            bg="#FFFFFF"
            boxShadow="0px 2px 4px 1px rgba(0, 0, 0, 0.10)"
            backdropFilter="blur(25px)"
          >
            <option value="small">작음</option>
            <option value="fit">딱 맞음</option>
            <option value="large">큼</option>
          </Select>
        </Flex>

        {/* 하단 버튼 */}
        <Flex justify="flex-end" width="100%" mt="55px" mb="100px" gap="15px">
          <Button
            onClick={() => navigate(-1)}
            width="124px"
            height="50px"
            flexShrink={0}
            borderRadius="25px"
            bg="var(--lightlight-Gray, #E8E8E8)"
            color="#000000"
            fontSize="20px"
            fontWeight="700"
            boxShadow="0px 2px 4px 1px rgba(0, 0, 0, 0.25)"
            backdropFilter="blur(25px)"
          >
            취소하기
          </Button>

          <Button
            width="124px"
            height="50px"
            flexShrink={0}
            borderRadius="25px"
            bg="var(--21-purple, #7C31B4)"
            color="#FFFFFF"
            fontSize="20px"
            fontWeight="700"
            boxShadow="0px 2px 4px 1px rgba(0, 0, 0, 0.25)"
            backdropFilter="blur(25px)"
          >
            완료하기
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default PutClothes;
