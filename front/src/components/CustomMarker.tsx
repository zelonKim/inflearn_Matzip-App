import {colors} from '@/constants';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {LatLng, MapMarkerProps, Marker} from 'react-native-maps';

interface CustomMarkerProps extends MapMarkerProps {
  coordinate: LatLng;
  color: string;
}

const colorHex = {
  RED: colors.PINK_400,
  BLUE: colors.BLUE_400,
  GREEN: colors.GREEN_400,
  YELLOW: colors.YELLOW_400,
  PURPLE: colors.PURPLE_400,
};

function CustomMarker({coordinate, ...props}: CustomMarkerProps) {
  return (
    <Marker coordinate={coordinate} {...props}>
      <View style={styles.container}>
        <View
          style={[styles.marker, {backgroundColor: colorHex[color]}]}></View>
      </View>
    </Marker>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 35,
    width: 32,
    alignItems: 'center',
  },
  marker: {
    transform: [{rotate: '45deg'}],
    width: 27,
    height: 27,
    borderRadius: 27,
    borderBottomRight: 1,
    borderWidth: 1,
    borderColor: colors.BLACK,
  },
});

export default CustomMarker;
