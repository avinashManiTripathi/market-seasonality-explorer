import React, { useState } from 'react';
import OrderBookChart from '../components/OrderBook/OrderBookChart';
import { Select, Box, Heading } from '@chakra-ui/react';

const Dashboard = () => {
  const [symbol, setSymbol] = useState('btcusdt');

  return (
    <Box p={4}>
      <Heading mb={4}>Live Order Book Depth</Heading>

      <Select
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        width="200px"
        mb={6}
      >
        <option value="btcusdt">BTC/USDT</option>
        <option value="ethusdt">ETH/USDT</option>
        <option value="solusdt">SOL/USDT</option>
      </Select>

      <OrderBookChart symbol={symbol} />
    </Box>
  );
};

export default Dashboard;
