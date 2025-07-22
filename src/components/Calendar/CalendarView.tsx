import React from 'react';
import {
  Box,
  Text,
  SimpleGrid,
  Flex,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  format,
  isToday,
  isSameDay,
} from 'date-fns';
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  selectedDateAtom,
  volatilityDataAtom,
  viewModeAtom,
} from '../../store/calendarState';

const CalendarView: React.FC = () => {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateAtom);
  const viewMode = useRecoilValue(viewModeAtom);
  const volatilityData = useRecoilValue(volatilityDataAtom);

  const today = new Date();
  const bgDefault = useColorModeValue('gray.100', 'gray.700');

  const startDate = startOfWeek(startOfMonth(currentDate), { weekStartsOn: 0 });
  const endDate = endOfWeek(endOfMonth(currentDate), { weekStartsOn: 0 });

  const getCellColor = (date: Date) => {
    const key = format(date, 'yyyy-MM-dd');
    const vol = volatilityData[key];

    if (vol == null) return bgDefault;
    if (vol < 0.3) return 'green.200';
    if (vol < 0.7) return 'orange.300';
    return 'red.300';
  };

  const renderDays = () => {
    const rows = [];
    let day = startDate;

    while (day <= endDate) {
      const week = [];

      for (let i = 0; i < 7; i++) {
        const isCurrentDay = isToday(day);
        const isSelected = selectedDate && isSameDay(day, selectedDate);
        const cellBg = isSelected
          ? 'blue.500'
          : isCurrentDay
          ? 'green.300'
          : getCellColor(day);

        week.push(
          <Box
            key={day.toISOString()}
            p={2}
            borderRadius="md"
            bg={cellBg}
            border="1px solid"
            borderColor="gray.300"
            cursor="pointer"
            textAlign="center"
            onClick={() => setSelectedDate(day)}
          >
            <Text fontSize="sm">{format(day, 'd')}</Text>
          </Box>
        );

        day = addDays(day, 1);
      }

      rows.push(
        <SimpleGrid columns={7} spacing={1} key={day.toISOString()}>
          {week}
        </SimpleGrid>
      );
    }

    return rows;
  };

  return (
    <Box p={4}>
      <Flex justify="space-between" align="center" mb={4}>
        <IconButton
          aria-label="Previous"
          icon={<ArrowLeftIcon />}
          onClick={() => setCurrentDate((prev) => subMonths(prev, 1))}
        />
        <Text fontSize="lg" fontWeight="bold">
          {format(currentDate, 'MMMM yyyy')}
        </Text>
        <IconButton
          aria-label="Next"
          icon={<ArrowRightIcon />}
          onClick={() => setCurrentDate((prev) => addMonths(prev, 1))}
        />
      </Flex>

      <SimpleGrid columns={7} spacing={1} mb={2}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
          <Text key={d} fontWeight="bold" textAlign="center">
            {d}
          </Text>
        ))}
      </SimpleGrid>

      {renderDays()}
    </Box>
  );
};

export default CalendarView;
