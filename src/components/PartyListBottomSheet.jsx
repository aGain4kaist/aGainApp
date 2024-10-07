// BottomSheet.js
import React, { useState } from 'react';
import { Box, Flex, IconButton } from '@chakra-ui/react';
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';
import PartyList from './PartyList';
import PartyDetail from './PartyDetail';

function PartyListBottomSheet() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedParty, setSelectedParty] = useState(null);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handlePartyClick = (party) => {
    setSelectedParty(party);
    setIsExpanded(true);
  };

  const clearSelection = () => {
    setSelectedParty(null);
  };

  return (
    <Box
      position="absolute"
      bottom="60px"
      left="0"
      width="100%"
      bg="white"
      borderTopRadius="2xl"
      boxShadow="0px -2px 10px rgba(0, 0, 0, 0.1)"
      transition="height 0.3s ease"
      height={isExpanded ? '70vh' : '30vh'}
      zIndex="20"
      overflow="hidden"
    >
      <Flex
        justifyContent="center"
        py={2}
        position="relative"
        onClick={() => !selectedParty && toggleExpand()}
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
          display={selectedParty ? 'none' : 'block'}
        />
      </Flex>

      {selectedParty ? (
        <PartyDetail party={selectedParty} onBack={clearSelection} />
      ) : (
        <PartyList onPartyClick={handlePartyClick} isExpanded={isExpanded} />
      )}
    </Box>
  );
}

export default BottomSheet;
