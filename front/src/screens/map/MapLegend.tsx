import {colorHex, colors} from '@/constants';
import useAuth from '@/hooks/queries/useAuth';
import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types/common';
import React, {Fragment} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface MapLegendProps {
  RED;
  YELLOW;
  GREEN;
  BLUE;
  PURPLE;
}

function MapLegend({}: MapLegendProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  const {getProfileQuery} = useAuth();
  const insets = useSafeAreaInsets();
  const {categories} = getProfileQuery.data || {};

  return (
    <>
      {Object.values(categories).join('') !== '' && (
        <View style={[styles.container, {top: insets.top || 20}]}>
          {categoryList.map((color, i) => {
            return (
              <Fragment key={i}>
                {categories?.[color] !== '' && (
                  <View style={styles.column}>
                    <View
                      style={[
                        styles.legendColor,
                        {backgroundColor: colorHex[color]},
                      ]}>
                      <Text style={styles.legendText}>
                        {categories?.[color]}
                      </Text>
                    </View>
                  </View>
                )}
              </Fragment>
            );
          })}
        </View>
      )}
    </>
  );
}

const styling = (theme: ThemeMode) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      right: 15,
      backgroundColor: 'rgba(0,0,0,0.5)',
      padding: 10,
      borderRadius: 10,
      gap: 3,
    },
    column: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },
    legendColor: {
      color: colors[theme].UNCHANGE_BLACK,
      fontWeight: '500',
      fontSize: 13,
    },
    legendText: {
      color: colors[theme].UNCHANGE_WHITE,
      fontWeight: '500',
      fontSize: 13,
    },
  });

export default MapLegend;
