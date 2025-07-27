import {CompoundOption} from '@/components/common/CompoundOption';
import {colorHex} from '@/constants';
import useAuth from '@/hooks/queries/useAuth';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface MarkerFilterOptionProps {
  isVisible: boolean;
  hideOption: () => void;
}

function MarkerFilterOption({isVisible, hideOption}: MarkerFilterOptionProps) {
  const [filterCondition, setFilterCondition] = useState('색상');

  const {getProfileQuery} = useAuth();
  const insets = useSafeAreaInsets();
  const {categories} = getProfileQuery.data || {};

  const handleCondition = (condition: string) => {
    setFilterCondition(condition);
  };

  const handleFilter = (name: string) => {
    markerFilter.set({
      ...markerFilter.filterItems,
      [name]: !markerFilter.filterItems[name],
    });
  };

  return (
    <CompoundOption isVisible={isVisible} hideOption={hideOption}>
      <CompoundOption.Background>
        <CompoundOption.Container>
          <CoompoundOption.Title>마커 필터링</CoompoundOption.Title>
          <CompoundOption.Divider />
          <View style={styles.filterContainer}>
            {['색상', '평점'].map(condition => (
              <CompoundOption.Filter
                key={condition}
                isSelected={}
                onPress={() => handleFilter(color)}>
                {condition}
              </CompoundOption.Filter>
            ))}
          </View>
          <CompoundOption.Divider />

          {filterCondition === '색상' && (
            <>
              {categoryList.map(color => (
                <CompoundOption.CheckBox
                  key={color}
                  isChecked={markerFilter.filterItems(color)}
                  onPress={() => handleFilter(color)}
                  icon={
                    <View
                      style={[
                        styles.marker,
                        {backgroundColor: colorHex[color]},
                      ]}
                    />
                  }>
                  {categories?.[color]}
                </CompoundOption.CheckBox>
              ))}
            </>
          )}

          {filterCondition === '평점' && (
            <>
              {['1', '2', '3', '4', '5'].map(score => (
                <CompoundOption.CheckBox
                  key={score}
                  isChecked={markerFilter.filterItems(score)}
                  onPress={() => handleFilter(score)}>
                  {score} 점
                </CompoundOption.CheckBox>
              ))}
            </>
          )}

          <CompoundOption.Divider />
          <CompoundOption.Button onPress={hideOption}>
            완료
          </CompoundOption.Button>
        </CompoundOption.Container>
      </CompoundOption.Background>
    </CompoundOption>
  );
}

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    justifyContent: 'space-around',
  },
  marker: {
    width: 20,
    hegith: 20,
    borderRadius: 20,
  },
});

export default MarkerFilterOption;
