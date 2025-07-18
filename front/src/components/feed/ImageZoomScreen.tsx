import React from 'react';
import {StyleSheet, View} from 'react-native';
import ImageCarousel from '../common/ImageCarousel';
import useDetailStore from '@/store/useDetailPostStore';
import {StackScreenProps} from '@react-navigation/stack';
import {FeedStackParamList} from '@/navigations/stack/FeedStackNavigator';
import {feedNavigations} from '@/constants';

type ImageZoomScreenProps = StackScreenProps<
  FeedStackParamList,
  typeof feedNavigations.IMAGE_ZOOM
>;

const ImageZoomScreen = ({route}: ImageZoomScreenProps) => {
  const {index} = route.params;

  const {detailPost} = useDetailStore();

  return <ImageCarousel images={detailPost?.images ?? []} />;
};

export default ImageZoomScreen;
