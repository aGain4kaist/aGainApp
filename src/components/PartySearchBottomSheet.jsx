import { React, useEffect, useState } from 'react';
import { Box, IconButton, Image, Button } from '@chakra-ui/react';
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
import { Icon as IconifyIcon } from '@iconify/react';

const MotionBox = motion.create(Box);

function PartySearchBottomSheet({
  isExpanded,
  setIsExpanded,
  selectedParty,
  handlePartyClick,
  clearSelection,
  goToCurrentLocation,
}) {
  const { sheetRef, contentRef } = useBottomSheet(isExpanded, setIsExpanded);

  const [internalSelectedParty, setInternalSelectedParty] = useState(null);

  useEffect(() => {
    setInternalSelectedParty(selectedParty);
  }, [selectedParty]);

  return (
    <>
      {!isExpanded && (
        <Button
          w="50px"
          h="50px"
          alignContent="center"
          justifyContent="center"
          position="absolute"
          bottom="calc(40vh + 21px)"
          zIndex="25"
          borderRadius="full"
          boxShadow="md"
          onClick={goToCurrentLocation}
          bg="white"
          aria-label="현재 위치로 이동"
          m="20px"
          p="0px"
        >
          <IconifyIcon
            icon={'lsicon:map-location-filled'}
            style={{ color: '#7C31B4' }}
            width="30px"
            height="30px"
          />
        </Button>
      )}
      <MotionBox
        ref={sheetRef}
        display="flex"
        flexDirection="column"
        position="fixed"
        zIndex="30"
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
    </>
  );
}

export default PartySearchBottomSheet;
