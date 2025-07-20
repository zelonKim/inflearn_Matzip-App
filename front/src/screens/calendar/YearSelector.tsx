import { colors, numbers } from '@/constants';
import React, { useEffect, useState } from 'react';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

interface YearSelectorProps {
  isVisible: boolean;
  currentYear: number;
  onChangeYear: (year: number) => void;
  hide: () => void;
}

function YearSelector({
  isVisible,
  currentYear,
  onChangeYear,
  hide,
}: YearSelectorProps) {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const yearIndex = currentYear - numbers.MIN_CALENDAR_YEAR

        const currentRow = Math.floor(
            yearIndex / numbers.CALENDAR_YEAR_SELECTOR_COLUMN,
        );

        const scrollToY = currentRow * 50
        
        setScrollY(scrollToY);
    }, [isVisible, currentYear])


  return (
  <>
  {isVisible && (
  <View style={styles.container}>
    <View style={styles.yearsContainer}>
        <FlatList
        style={styles.scrollContainer} 
        showsVerticalScrollIndicator={false} 
        contentOffset={x:0, y:scrollY,}
        initialNumToRender={currentYear - numbers.MIN_CALENDAR_YEAR} 
        data={Array.from({
            length: numbers.MAX_CALENDAR_YEAR - numbers.MIN_CALENDAR_YEAR + 1,
        }, (_, index)=> ({
            id: index,
            num: index + numbers.MIN_CALENDAR_YEAR
        }),
    )}
        renderItem={({item}) => (
            <Pressable 
                key={item.num}
                onPress={() => onChangeYear(item.num)}
                style={styles.yearButton, currentYear === item.num && styles.currentYearButton,}
                >
                <Text style={[
                    styles.yearText,
                    currentYear === item.num && styles.currentYearText
                ]}>{item.num}</Text>
            </Pressable>
        )}
       keyExtractor={item => String(item.num)}
       numColumns={numbers.CALEDAR_YEAR_SELECTOR_COLUMN}
        />
    </View>
    <Pressable style={styles.closeButton} onPress={hide}>
        <Text style={styles.closeText}> 닫기 </Text>
        <MaterialIcons
         name="keyboard-arrow-down"
         size={20}
         color={colors.BLACK}
         />
    </Pressable>
  </View>;
  )}
  </>)
}

const styles = StyleSheet.create({});

export default YearSelector;
