/* 
-------- NOT USING THIS FILE ANYMORE -----------
-------- DID NOT DELETE IT JUST IN CASE CONFLICT REFERENCE IS NEEDED -------

import React, { useState, useEffect } from 'react';
import { Box, Flex, IconButton, Image } from '@chakra-ui/react';
import {
  ChevronUpIcon,
  ChevronDownIcon,
  ArrowBackIcon,
} from '@chakra-ui/icons';
import PartyList from './PartyList';
import PartyDetail from './PartyDetail';

function PartyListBottomSheet({
  isExpanded,
  setIsExpanded,
  partyListData,
  selectedParty,
  handlePartyClick,
  clearSelection,
  goToCurrentLocation,
}) {
  const [internalSelectedParty, setInternalSelectedParty] = useState(null);

  useEffect(() => {
    setInternalSelectedParty(selectedParty);
  }, [selectedParty]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      {internalSelectedParty && (
        <IconButton
          icon={<ArrowBackIcon boxSize={6} />}
          aria-label="Back"
          position="absolute"
          bottom="calc(80vh + 70px)"
          left="10px"
          onClick={clearSelection}
          variant="solid"
          size="md"
          borderRadius="full"
          bg="white"
          color="purple.500"
          boxShadow="md"
          zIndex="25"
          _hover={{ bg: 'purple.100' }}
        />
      )}
      {!isExpanded && (
        <IconButton
          icon={
            <Image
              src="/current_focus_button.png"
              alt="현재 위치"
              boxSize="20px"
            />
          }
          position="absolute"
          bottom="calc(40vh + 21px)"
          zIndex="25"
          borderRadius="full"
          boxShadow="md"
          onClick={goToCurrentLocation}
          bg="white"
          _hover={{ bg: 'gray.200' }}
          aria-label="현재 위치로 이동"
          size="md"
          m={2}
        />
      )}
      <Box
        position="absolute"
        bottom="60px"
        left="0"
        width="100%"
        bg="white"
        borderTopRadius="2xl"
        boxShadow="0px -2px 10px rgba(0, 0, 0, 0.1)"
        transition="height 0.3s ease"
        height={isExpanded ? '80vh' : '35vh'}
        zIndex="20"
        overflow="hidden"
      >
        <Flex
          justifyContent="center"
          py={0}
          position="relative"
          onClick={() => !internalSelectedParty && toggleExpand()}
        >
          <IconButton
            icon={
              isExpanded ? (
                <ChevronDownIcon boxSize={8} />
              ) : (
                <ChevronUpIcon boxSize={8} />
              )
            }
            aria-label="Toggle PartyListBottomSheet"
            variant="ghost"
            size="lg"
            display={internalSelectedParty ? 'none' : 'block'}
          />
        </Flex>

        {internalSelectedParty ? (
          <PartyDetail party={internalSelectedParty} onBack={clearSelection} />
        ) : (
          <PartyList
            onPartyClick={handlePartyClick}
            isExpanded={isExpanded}
            partyListData={partyListData}
          />
        )}
      </Box>
    </>
  );
}

export default PartyListBottomSheet;
 */
