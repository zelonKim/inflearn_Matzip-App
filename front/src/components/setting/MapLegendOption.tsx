import React from 'react';
import {StyleSheet, View} from 'react-native';
import {CompoundOption} from '../common/CompoundOption';
import useLegendStorage from '@/hooks/useLegendStorage';

interface MapLegendOptionProps {}

function MapLegendOption({isVisible, hideOption}: MapLegendOptionProps) {
  const {isVisible: isVisibleLegend, set} = useLegendStorage();

  const handlePressShow = () => {
    set(true);
    hideOption();
  };
  
  return (
    <CompoundOption isVisible={isVisible} hideOption={hideOption}>
      <CompoundOption.Background>

        <CompoundOption.Container>
          <CompoundOption.Button
            onPress={handlePressShow}
            isChecked={isVisibleLegend}>
            표시하기
          </CompoundOption.Button>

          <CompoundOption.Divider />
          <CompoundOption.Button
            onPress={handlePressHide}
            isChecked={isVisibleLegend}>
            숨기기
          </CompoundOption.Button>
        </CompoundOption.Container>


        <CompoundOpiton.Conatiner>
            <CompoundOption.Button onPress={hideOption}>
                취소
            </CompoundOption.Button>
        </CompoundOpiton.Conatiner>

      </CompoundOption.Background>
    </CompoundOption>
  );
}

const styles = StyleSheet.create({});

export default MapLegendOption;
