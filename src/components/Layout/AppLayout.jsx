import React from 'react';
import { Box, Flex, Button, Icon, IconButton, Text } from '@chakra-ui/react';
import { Icon as IconifyIcon } from '@iconify/react';
import { FaHome, FaSearch, FaTshirt, FaUser, FaPlus } from 'react-icons/fa'; // 아이콘
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from '@/pages/Home';
import ClothingSearch from '@/pages/ClothingSearch';
import PartySearch from '@/pages/PartySearch';
import MyClothes from '@/pages/MyClothes';
import KakaoMap from '../../utils/KakaoMap';

function AppLayout() {
  return (
    <>
      <Router>
        {/* 메인 콘텐츠 */}
        <Box minH="100vh" paddingBottom="60px" bg="gray.100">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/party" element={<PartySearch />} />
            <Route path="/clothes" element={<ClothingSearch />} />
            <Route path="/my-clothes" element={<MyClothes />} />
          </Routes>
        </Box>

        {/* 하단 네비게이션 바 */}
        <Flex
          as="nav"
          position="fixed"
          bottom="0"
          left="0"
          width="100%"
          height="75px"
          bg="#FFF"
          borderTop="1px solid #E8E8E8"
          justifyContent="space-around"
          filter="drop-shadow(0px -1px 8px rgba(0, 0, 0, 0.08))"
          padding="10px"
          flexShrink={0}
        >
          <Link to="/">
            <Button
              aria-label="홈"
              display="flex" // Flexbox 사용
              flexDirection="column" // 세로 방향으로 아이콘과 텍스트 배치
              justifyContent="center" // 수직 중앙 정렬
              alignItems="center" // 수평 중앙 정렬
              width="50px" // 너비 설정
              height="51px" // 높이 설정
              gap="4px" // 아이콘과 텍스트 간격
              flexShrink={0} // 요소가 축소되지 않도록 설정
              variant="ghost" // 버튼의 스타일 variant
              _hover={{ backgroundColor: 'transparent' }}
              _active={{ backgroundColor: 'transparent', boxShadow: 'none' }}
            >
              <IconifyIcon icon="bx:home" style={{ fontSize: '30px' }} />{' '}
              {/* 아이콘 */}
              <Text
                color="#000" // 글자 색상
                textAlign="center" // 텍스트 정렬
                fontFamily="'SUIT', sans-serif" // 글꼴 패밀리 (SUIT 사용)
                fontSize="14px" // 글자 크기
                fontStyle="normal" // 글자 스타일 (일반)
                fontWeight="500" // 글자 두께
                lineHeight="normal" // 줄 높이
              >
                홈
              </Text>
            </Button>
          </Link>
          <Link to="/party">
            <Button
              aria-label="파티 찾기"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              width="50px"
              height="51px"
              gap="4px"
              flexShrink={0}
              variant="ghost"
              _hover={{ backgroundColor: 'transparent' }}
              _active={{ backgroundColor: 'transparent', boxShadow: 'none' }}
            >
              <IconifyIcon icon="bx:party" style={{ fontSize: '30px' }} />
              <Text
                color="#000" // 글자 색상
                textAlign="center" // 텍스트 정렬
                fontFamily="'SUIT', sans-serif" // 글꼴 패밀리 (SUIT 사용)
                fontSize="14px" // 글자 크기
                fontStyle="normal" // 글자 스타일 (일반)
                fontWeight="500" // 글자 두께
                lineHeight="normal" // 줄 높이
              >
                파티 찾기
              </Text>
            </Button>
          </Link>
          <Box width="70px" height="51px">
            <Box height="34px"></Box>
            <Text
              color="#000" // 글자 색상
              textAlign="center" // 텍스트 정렬
              fontFamily="'SUIT', sans-serif" // 글꼴 패밀리 (SUIT 사용)
              fontSize="14px" // 글자 크기
              fontStyle="normal" // 글자 스타일 (일반)
              fontWeight="500" // 글자 두께
              lineHeight="normal" // 줄 높이
            >
              옷 등록
            </Text>
          </Box>
          <Link to="/clothes">
            <Button
              aria-label="옷 보기"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              width="50px"
              height="51px"
              gap="1px"
              flexShrink={0}
              variant="ghost"
              _hover={{ backgroundColor: 'transparent' }}
              _active={{ backgroundColor: 'transparent', boxShadow: 'none' }}
            >
              <IconifyIcon
                icon="lsicon:clothes-outline"
                style={{ fontSize: '33px' }}
              />
              <Text
                color="#000" // 글자 색상
                textAlign="center" // 텍스트 정렬
                fontFamily="'SUIT', sans-serif" // 글꼴 패밀리 (SUIT 사용)
                fontSize="14px" // 글자 크기
                fontStyle="normal" // 글자 스타일 (일반)
                fontWeight="500" // 글자 두께
                lineHeight="normal" // 줄 높이
              >
                옷 보기
              </Text>
            </Button>
          </Link>
          <Link to="/my-clothes">
            <Button
              aria-label="내 옷장"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              width="50px"
              height="51px"
              gap="4px"
              flexShrink={0}
              variant="ghost"
              _hover={{ backgroundColor: 'transparent' }}
              _active={{ backgroundColor: 'transparent', boxShadow: 'none' }}
            >
              <IconifyIcon
                icon="streamline:closet"
                style={{ fontSize: '30px' }}
              />
              <Text
                color="#000" // 글자 색상
                textAlign="center" // 텍스트 정렬
                fontFamily="'SUIT', sans-serif" // 글꼴 패밀리 (SUIT 사용)
                fontSize="14px" // 글자 크기
                fontStyle="normal" // 글자 스타일 (일반)
                fontWeight="500" // 글자 두께
                lineHeight="normal" // 줄 높이
              >
                내 옷장
              </Text>
            </Button>
          </Link>
        </Flex>
        <Button
          aria-label="옷 등록"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          width="70px"
          height="70px"
          background="none"
          position="fixed"
          bottom="33px"
          left="50%"
          transform="translateX(-50%)"
          zIndex="20"
          _hover={{ backgroundColor: 'transparent' }}
          _active={{ backgroundColor: 'transparent', boxShadow: 'none' }}
        >
          {/* 배경 원 */}
          <Box
            width="70px"
            height="70px"
            bg="#411461"
            borderRadius="full"
            position="relative"
            filter="drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.10))" // 그림자 효과
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            {/* 옷걸이 아이콘 */}
            <IconifyIcon
              icon={'fluent:clothes-hanger-24-regular'}
              style={{
                width: '40px',
                height: '40px',
                color: 'white',
                position: 'absolute',
                top: '53%',
                left: '53%',
                transform: 'translate(-50%, -50%)',
              }}
              zIndex="25"
            />
            {/* '+' 아이콘 */}
            <IconifyIcon
              icon={'tabler:plus'}
              style={{
                width: '20px',
                height: '20px',
                color: 'white',
                position: 'absolute',
                top: '37%',
                left: '33%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          </Box>

          {/* 텍스트 */}
          {/* <Text
            color="#000" // 텍스트 색상
            textAlign="center" // 텍스트 중앙 정렬
            fontFamily="'SUIT', sans-serif" // 폰트 패밀리 설정
            fontSize="14px" // 폰트 크기
            fontWeight={500} // 폰트 두께
            lineHeight="normal" // 라인 높이
            marginTop="5px" // 아이콘과 텍스트 간격
          >
            옷 등록
          </Text> */}
        </Button>
      </Router>
    </>
  );
}

export default AppLayout;
