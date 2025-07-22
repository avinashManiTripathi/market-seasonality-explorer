
import React, { useEffect } from 'react';
import { Box, Flex, Heading } from '@chakra-ui/react';
import DarkModeToggle from './components/DarkModeToggle';
import { useSetRecoilState } from 'recoil';
import { volatilityDataAtom } from './store/calendarState';
import CalendarView from './components/Calendar/CalendarView';
import { format, eachDayOfInterval, subMonths, endOfMonth } from 'date-fns';
import OrderBook from './components/OrderBook/OrderBook';
import { Link, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';

const App = () => {
  const setVolatility = useSetRecoilState(volatilityDataAtom);

  useEffect(() => {
    const start = subMonths(new Date(), 1);
    const end = endOfMonth(new Date());

    const days = eachDayOfInterval({ start, end });

    const mockVol = days.reduce((acc, date) => {
      const key = format(date, 'yyyy-MM-dd');
      acc[key] = Math.random(); // random volatility
      return acc;
    }, {} as Record<string, number>);

    setVolatility(mockVol);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Box p={4}>
        <Flex justify="space-between" align="center">
          <Heading size="md">Market Seasonality Explorer</Heading>
          <DarkModeToggle />
         
        </Flex>
        <Link to="/dashboard">Go to Order Book</Link>
        <CalendarView />
        <OrderBook />
      </Box>} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>


  );
};

export default App;
