import React, {ReactNode} from 'react';
import {
  StyleSheet,
  Pressable,
  Text,
  PressableProps,
  Dimensions,
  View,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {colors} from '../constants';

interface CustomButtonProps extends PressableProps {
  label: string;
  variant?: 'filled' | 'outlined';
  size?: 'large' | 'medium';
  inValid?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  icon?: ReactNode;
}

const deviceHeight = Dimensions.get('screen').height;

const CustomButton = ({
  label,
  variant = 'filled',
  size = 'large',
  inValid = false,
  style = null,
  textStyle = null,
  icon = null,
  ...props
}: CustomButtonProps) => {
  console.log(Dimensions.get('screen').height);
  console.log(Dimensions.get('window').height);

  return (
    <Pressable
      disabled={inValid}
      style={({pressed}) => [
        styles.container,
        styles[variant],
        styles[size],
        pressed ? styles[`${variant}Pressed`] : styles[variant],
        inValid && styles.inValid,
        style,
      ]}
      {...props}>
      <View style={styles[size]}>
        {icon}
        <Text style={[styles.text, styles[`${variant}Text`], textStyle]}>
          {' '}
          {label}{' '}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  inValid: {
    opacity: 0.5,
  },
  container: {
    borderRadius: 3,
    justifyContnet: 'center',
    flexDirection: 'row',
  },
  filled: {
    backgroundColor: colors.PINK_700,
  },
  outlined: {
    borderColor: colors.PINK_700,
    borderWidth: 1,
  },
  filledPressed: {
    backgroundColor: colors.PINK_500,
  },
  outlinedPrssed: {
    backgroundColor: colors.PINK_700,
    borderWidth: 1,
    opacity: 0.5,
  },
  large: {
    width: '100%',
    paddingVertical: deviceHeight > 700 ? 15 : 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 5,
  },
  medium: {
    width: '50%',
    paddingVertical: deviceHeight > 700 ? 12 : 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 5,
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
  },
  filledText: {
    color: colors.WHITE,
  },
  outlinedText: {
    color: '#C63B64',
  },
});

export default CustomButton;
