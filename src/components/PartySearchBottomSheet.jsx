import { React, useEffect, useState } from 'react';
import { Box, IconButton, Image, Button } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import PartySearchBottomSheetHeader from './PartySearchBottomSheetHeader';
import PartyListItem from '../components/PartyListItem';
import { partyListData } from '../data/partyListData';
import PartyDetail from './PartyDetail';
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
  setSelectedParty,
  handlePartyClick,
  clearSelection,
  goToCurrentLocation,
}) {
  const { sheetRef, contentRef } = useBottomSheet(setIsExpanded, selectedParty);

  //const [internalSelectedParty, setInternalSelectedParty] = useState(null);

  useEffect(() => {
    setSelectedParty(selectedParty);
  }, [selectedParty, setSelectedParty]);

  useEffect(() => {
    if (isExpanded) {
      // Move sheet to expanded position
      sheetRef.current.style.setProperty(
        'transform',
        `translateY(${MIN_Y - MAX_Y}px)`
      );
    } else {
      // Move sheet to collapsed position
      sheetRef.current.style.setProperty('transform', 'translateY(0)');
    }
  }, [sheetRef, isExpanded]); // Run whenever isExpanded changes

  return (
    <>
      {selectedParty && (
        <Button
          w="50px"
          h="50px"
          alignContent="center"
          justifyContent="center"
          position="absolute"
          bottom="calc(80vh + 70px)"
          left="10px"
          onClick={clearSelection}
          borderRadius="full"
          bg="white"
          boxShadow="md"
          zIndex="10"
          aria-label="뒤로 가기"
          m="10px"
          p="0px"
        >
          <IconifyIcon
            icon={'material-symbols:arrow-back'}
            style={{ color: '#7C31B4' }}
            width="30px"
            height="30px"
          />
        </Button>
      )}
      {!isExpanded && (
        <Button
          w="50px"
          h="50px"
          alignContent="center"
          justifyContent="center"
          position="absolute"
          bottom="calc(40vh + 21px)"
          zIndex="8"
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
        zIndex="9"
        top={MAX_Y}
        left="0"
        right="0"
        borderTopRadius="30px"
        bg="white"
        boxShadow="0px -10px 70px 0px rgba(0, 0, 0, 0.25)"
        h={`${BOTTOM_SHEET_HEIGHT}px`}
        // transition="transform 5s ease-out"
      >
        {selectedParty ? (
          <PartyDetail party={selectedParty} onBack={clearSelection} />
        ) : (
          <>
            <PartySearchBottomSheetHeader />
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
                  onPartyClick={handlePartyClick}
                  party={party}
                />
              ))}
            </Box>
          </>
        )}
      </MotionBox>
    </>
  );
}

export default PartySearchBottomSheet;
