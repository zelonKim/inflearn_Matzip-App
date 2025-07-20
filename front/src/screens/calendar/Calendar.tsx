import {colors} from '@/constants';
import React, {useEffect} from 'react';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DayOfWeeks from './DayOfWeeks';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {getDateWithSeparator, MonthYear} from '@/utils';
import DateBox from './DateBox';
import {ResponseCalendarPost} from '@/api';
import YearSelector from './YearSelector';
import useModal from '@/hooks/useModal';
import {useNavigation} from '@react-navigation/native';
import CalendarHomeHeaderRight from './CalendarHomeHeaderRight';

interface CalendarProps<T> {
  monthYear: MonthYear;
  selectedDate: number;
  schedules: Record<number, T>;
  onPressDate: (date: number) => void;
  onChangeMonth: (increment: number) => void;
  moveToToday: () => void;
}

function Calendar<T>({
  monthYear,
  schedules,
  onPressDate,
  onChangeMonth,
  moveToToday,
}: CalendarProps<T>) {
  const {year, month, lastDate, firstDOW} = monthYear;
  const navigation = useNavigation();
  const yearSelector = useModal();

  const handleChangeYear = (selectYear: number) => {
    onChangeMonth((selectYear - year) * 12);
    yearSelector.hide();
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => CalendarHomeHeaderRight(moveToToday),
    });
  }, [moveToToday, navigation]);

  return (
    <>
      <View style={styles.headerContainer}>
        <Pressable
          onPress={() => onChangeMonth(-1)}
          style={styles.monthButtonContainer}>
          <Ionicons name="arrow-back" size={25} color={colors.BLACK} />
        </Pressable>

        <Pressable
          style={styles.monthYearContainer}
          onPress={yearSelector.show}>
          <Text style={styles.titleText}>
            {year}년 {month}월
          </Text>
          <MaterialIcons
            name="keyboard-arrow-down"
            size={20}
            color={colors.GRAY_500}
          />
        </Pressable>

        <Pressable
          onPress={() => onChangeMonth(1)}
          style={styles.monthButtonContainer}>
          <Ionicons name="arrow-forward" size={25} color={colors.BLACK} />
        </Pressable>
      </View>

      <DayOfWeeks />

      <View style={styles.bodyContainer}>
        <FlatList
          data={Array.from({length: lastDate + firstDOW}, (_, i) => ({
            id: i,
            date: i - firstDOW + 1,
          }))}
          renderItem={({item}) => (
            <DateBox
              date={item.date}
              selectedDate={selectedDate}
              onPressDate={onPressDate}
              isToday={isSameAsCurrentDate(year, month, item.date)}
              hasSchedule={schedules[item.date]}
            />
          )}
          keyExtractor={item => String(item.id)}
          numColumns={7}
        />
      </View>

      <YearSelector
        isVisible={yearSelector.isVisible}
        currentYear={year}
        onChangeYear={handleChangeYear}
        hide={yearSelector.hide}
      />
    </>
  );
}

function isSameAsCurrentDate(year: number, month: number, date: number) {
  const currentDate = getDateWithSeparator(new Date());
  const inputDate = `${year}${String(month).padStart(2, '0')}${String(
    date,
  ).padStart(2, '0')}`;
  return currentDate === inputDate;
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
  },
  yearsContainer: {
    alignItems: 'center',
    backgroundColor: colors.WHITE,
  },
  scrollContainer: {
    maxHeight: 200,
    backgroundColor: colors.WHITE,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 25,
    marginVertical: 16,
  },
  monthButtonContainer: {
    padding: 10,
  },
  monthYearContainer: {
    padding: 10,
  },
  titleText: {
    fontSize: 18,
    fontWeight: '500',
    color: colors.BLACK,
  },
  bodyContainer: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.GRAY_100,
    backgroundColor: colors.GRAY_100,
  },
  yearText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.GRAY_700,
  },
  currentYearText: {
    color: colors.WHITE,
    fontWeight: '600',
  },
  closeButton: {
    flex: 1,
    flexDrieciton: 'row',
    backgroundColor: colors.WHITE,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderbottomWidth: 1,
    borderColor: colors.GRAY_500,
  },
  closeText: {
    color: colors.BLACK,
    fontSize: 16,
    fontWeight: '600',
  },
  currentYearButton: {
    backgroundColor: colors.PINK_700,
    borderColor: colors.PINK_700,
  },
});

export default Calendar;
