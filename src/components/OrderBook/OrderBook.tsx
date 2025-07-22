import React, { useEffect, useState } from 'react';
import {
  Box,
  Text,
  VStack,
  HStack,
  Select,
  Divider,
  Spinner,
  useToast,
} from '@chakra-ui/react';
import { useOrderBook } from '../../hooks/useOrderBook';

const SYMBOLS = ['btcusdt', 'ethusdt', 'bnbusdt', 'solusdt'];

const OrderBook: React.FC = () => {
  const [symbol, setSymbol] = useState('btcusdt');
  const toast = useToast();
  const { bids, asks, error, loading } = useOrderBook(symbol);


//   useEffect(()=>{
//     const ws = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@depth");
//     ws.onmessage = (e) => {
//       console.log('✅ Success:', JSON.parse(e.data));
//     };
//     ws.onerror = (e) => {
//       console.error('❌ Error:', e);
//     };
//     return () => ws.close();
//   },[])

  if (error) {
    // toast({
    //   title: 'WebSocket Error',
    //   description: error,
    //   status: 'error',
    //   duration: 3000,
    //   isClosable: true,
    // });
  }

  return (
    <Box borderWidth="1px" borderRadius="lg" p={4}>
      <HStack justify="space-between" mb={4}>
        <Text fontWeight="bold">Live Order Book</Text>
        <Select value={symbol} onChange={(e) => setSymbol(e.target.value)} width="fit-content">
          {SYMBOLS.map((s) => (
            <option key={s} value={s}>
              {s.toUpperCase()}
            </option>
          ))}
        </Select>
      </HStack>

      {loading ? (
        <Spinner />
      ) : (
        <HStack spacing={8} align="start">
          <VStack align="start">
            <Text fontWeight="semibold">Bids</Text>
            {bids.map((bid, i) => (
              <Text key={i} fontSize="sm">
                {bid.price.toFixed(2)} - {bid.quantity.toFixed(4)}
              </Text>
            ))}
          </VStack>
          <VStack align="start">
            <Text fontWeight="semibold">Asks</Text>
            {asks.map((ask, i) => (
              <Text key={i} fontSize="sm">
                {ask.price.toFixed(2)} - {ask.quantity.toFixed(4)}
              </Text>
            ))}
          </VStack>
        </HStack>
      )}
    </Box>
  );
};

export default OrderBook;
