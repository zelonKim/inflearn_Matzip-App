import {colors} from '@/constants';
import {ImageUri} from '@/types/domain';
import React from 'react';
import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface PreviewImageListProps {
  imageUris: ImageUri[];
  onDelete?: (uri: string) => void;
  onChangeOrder?: (fromIndex: number, toIndex: number) => void;
}

const PreviewImageList = ({
  imageUris,
  onDelete,
  onChangeOrder,
}: PreviewImageListProps) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        {imageUris.map(({uri}, index) => {
          return (
            <Pressable style={styles.imageContainer}>
              <Image
                key={index}
                resizeMode="cover"
                source={{
                  uri: `${
                    Platform.OS === 'ios'
                      ? 'http://localhost:3030'
                      : 'http://10.0.2.2:3030'
                  }/${uri}`,
                }}
                style={styles.image}
              />
              <Pressable
                style={[styles.imageButton, styles.deleteButton]}
                onPress={() => onDelete && onDelete(uri)}>
                <Ionicons name="close" size={16} color={colors.WHITE} />
              </Pressable>

              {index > 0 && (
                <Pressable
                  style={[styles.imageButton, styles.moveLeftButton]}
                  onPress={() =>
                    onChangeOrder && onChangeOrder(index, index - 1)
                  }>
                  <Ionicons
                    name="arrow-back-outline"
                    size={16}
                    color={colors.WHITE}
                  />
                </Pressable>
              )}

              {index < imageUris.length - 1 && (
                <Pressable
                  style={[styles.imageButton, styles.moveRightButton]}
                  onPress={() =>
                    onChangeOrder && onChangeOrder(index, index + 1)
                  }>
                  <Ionicons
                    name="arrow-forward-outline"
                    size={16}
                    color={colors.WHITE}
                  />
                </Pressable>
              )}
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    gap: 15,
    width: 70,
    height: 70,
  },
  imageContainer: {
    width: 70,
    height: 70,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageButton: {
    position: 'absolute',
    backgroundColor: colors.BLACK,
    zIndex: 1,
  },
  deleteButton: {
    top: 0,
    right: 0,
  },
  moveLeftButton: {
    bottom: 0,
    left: 0,
  },
  moveRightButton: {
    bottom: 0,
    right: 0,
  },
});

export default PreviewImageList;
