// PartyListBottomSheet.js
import React, { useState, useEffect } from 'react';
import { Box, Flex, IconButton } from '@chakra-ui/react';
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
}) {
  const [internalSelectedParty, setInternalSelectedParty] = useState(null);
  useEffect(() => {
    setInternalSelectedParty(selectedParty);
  }, [selectedParty]);
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const clearSelection = () => {
    setInternalSelectedParty(null);
    setIsExpanded(false);
  };

  return (
    <>
      {/* 뒤로가기 버튼 */}
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
