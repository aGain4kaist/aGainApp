import React from 'react';
import { Box, Flex, IconButton } from '@chakra-ui/react';
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
        {/* 전체 레이아웃을 Flex로 */}
        <Flex direction="column" height="100vh">
          {/* 상단 헤더 영역 */}
          <Box bg="gray.100" padding="20px" textAlign="center" zIndex="10">
            <h1>My Header</h1>
          </Box>

          {/* Body 내용물: 남은 공간을 모두 차지 */}
          <Box flex="1" overflow="auto">
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
            bg="white"
            borderTop="1px solid #ccc"
            justifyContent="space-around"
            padding="10px"
            zIndex="10"
          >
            <Link to="/">
              <IconButton
                aria-label="홈"
                icon={<FaHome />}
                variant="ghost"
                size="lg"
              />
            </Link>
            <Link to="/party">
              <IconButton
                aria-label="파티 찾기"
                icon={<FaSearch />}
                variant="ghost"
                size="lg"
              />
            </Link>
            <Link to="/clothes">
              <IconButton
                aria-label="옷 찾기"
                icon={<FaTshirt />}
                variant="ghost"
                size="lg"
              />
            </Link>
            <Link to="/my-clothes">
              <IconButton
                aria-label="내 옷"
                icon={<FaUser />}
                variant="ghost"
                size="lg"
              />
            </Link>
          </Flex>

          {/* 중앙에 고정된 등록 버튼 */}
          <IconButton
            aria-label="등록"
            icon={<FaPlus />}
            colorScheme="teal"
            position="fixed"
            bottom="80px" // 네비게이션 바 바로 위에
            left="50%"
            transform="translateX(-50%)"
            borderRadius="full"
            width="60px"
            height="60px"
            zIndex="20"
          />
        </Flex>
      </Router>
    </>
  );
}

export default AppLayout;
