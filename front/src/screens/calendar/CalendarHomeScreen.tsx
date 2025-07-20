import {colors} from '@/constants';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Calendar from './Calendar';
import {getMonthYearDetails, getNewMonthYear} from '@/utils';
import EventList from './EventList';
import useGetCalendarPosts from '@/hooks/queries/useGetCalendarPosts';

function CalendarHomeScreen() {
  const currentMonthYear = getMonthYearDetails(new Date());
  const [monthYear, setMonthYear] = useState(currentMonthYear);
  const [selectedDate, setSelectedDate] = useState(0);
  
  const {
    data: posts,
    isPending,
    isError,
  } = useGetCalendarPosts(monthYear.year, monthYear.month);

  const moveToToday = () => {
    setSelectedDate(new Date().getDate());
    setMonthYear(getMonthYearDetails(new Date()));
  };

  useEffect(() => {
    moveToToday();
  }, []);

  if (isPending || isError) {
    return <></>;
  }

  const handlePressDate = (date: number) => {
    setSelectedDate(date);
  };

  const handleUpdateMonth = (increment: number) => {
    setMonthYear(prev => getNewMonthYear(prev, increment));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Calendar
        monthYear={monthYear}
        schedules={posts}
        onChangeMonth={handleUpdateMonth}
        selectedDate={selectedDate}
        onPressDate={handlePressDate}
      />
      <EventList posts={posts[selectedDate]} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  innerContainer: {
    gap: 20,
  },
  itemContainer: {
    flexDirection: 'row',
  },
  itemHeader: {
    backgroundColor: colors.PINK_700,
    width: 6,
    height: 50,
    marginRight: 8,
    borderRadius: 20,
  },
  infoContainer: {
    justifyContent: 'space-evenly',
  },
  addressText: {
    color: colors.GRAY_500,
    fontSize: 13,
  },
  titleText: {
    color: colors.BLACK,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CalendarHomeScreen;
