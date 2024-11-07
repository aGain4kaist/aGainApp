import React from 'react';
import { Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import PartySearchBottomSheetHeader from './PartySearchBottomSheetHeader';
import PartyListItem from '../components/PartyListItem';
import { partyListData } from '../data/partyListData';
import {
  useBottomSheet,
  MAX_Y,
  MIN_Y,
  BOTTOM_SHEET_HEIGHT,
} from '../hooks/useBottomSheet';

const MotionBox = motion.create(Box);

function PartySearchBottomSheet() {
  const { sheetRef, contentRef } = useBottomSheet();

  return (
    <MotionBox
      ref={sheetRef}
      display="flex"
      flexDirection="column"
      position="fixed"
      zIndex="1"
      top={MAX_Y}
      left="0"
      right="0"
      borderTopRadius="30px"
      bg="white"
      boxShadow="0px -10px 70px 0px rgba(0, 0, 0, 0.25)"
      h={`${BOTTOM_SHEET_HEIGHT}px`}
      // transition="transform 5s ease-out"
    >
      <PartySearchBottomSheetHeader />
      {/* Content Section */}
      <Box
        ref={contentRef}
        overflow="auto"
        sx={{
          WebkitOverflowScrolling: 'touch', // For smooth scrolling on iOS
          padding: '0 32px', // Optional padding for inner content
        }}
        flex="1" // To take up remaining space within the MotionBox
      >
        {partyListData.map((party) => (
          <PartyListItem
            key={party.id}
            onPartyClick={() => {}} // temporary empty function
            party={party}
          />
        ))}
      </Box>
    </MotionBox>
  );
}

export default PartySearchBottomSheet;
