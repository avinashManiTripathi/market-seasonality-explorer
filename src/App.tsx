
import React, { useEffect } from 'react';
import { Box, Flex, Heading } from '@chakra-ui/react';
import DarkModeToggle from './components/DarkModeToggle';
import { useSetRecoilState } from 'recoil';
import { volatilityDataAtom } from './store/calendarState';
import CalendarView from './components/Calendar/CalendarView';
import { format, eachDayOfInterval, subMonths, endOfMonth } from 'date-fns';

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
    <Box p={4}>
      <Flex justify="space-between" align="center">
        <Heading size="md">Market Seasonality Explorer</Heading>
        <DarkModeToggle />
      </Flex>
      <CalendarView />
    </Box>
  );
};

export default App;
