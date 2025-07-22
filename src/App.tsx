import React from 'react';
import { Box, Flex, Heading } from '@chakra-ui/react';
import DarkModeToggle from './components/DarkModeToggle';

function App() {
  return (
    <Box p={4}>
      <Flex justify="space-between" align="center">
        <Heading size="md">Market Seasonality Explorer</Heading>
        <DarkModeToggle />
      </Flex>
      {/* Your app content here */}
    </Box>
  );
}

export default App;
