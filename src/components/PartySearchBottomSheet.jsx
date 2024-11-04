import React, { useRef } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { BottomSheet } from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css';
//import '../styles/customBottomSheet.css';

function PartySearchBottomSheet({ isExpanded, setIsExpanded }) {
  const sheetRef = useRef();

  return (
    <BottomSheet
      ref={sheetRef}
      open
      blocking={false}
      header={
        <Flex justifyContent="space-between" alignItems="center" mt={6} px={2}>
          <Text fontSize="2xl" fontWeight="bold">
            내게 가까운 파티들
          </Text>
          <Text fontSize="md" color="purple.500">
            거리순 ▼
          </Text>
        </Flex>
      }
      snapPoints={({ minHeight, maxHeight }) => [
        maxHeight / 3,
        maxHeight * 0.9,
      ]}
      onSpringStart={(event) => {
        if (event.type === 'SNAP') {
          const currentHeight = sheetRef.current.height;
          if (currentHeight < 400) {
            setIsExpanded(true); // Hide header immediately when starting transition to top
          } else if (currentHeight >= 800) {
            setIsExpanded(false); // Show header immediately when starting transition to bottom
          }
        }
      }}
    >
      My awesome content here
    </BottomSheet>
  );
}

export default PartySearchBottomSheet;
