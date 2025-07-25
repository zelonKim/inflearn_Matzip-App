import React from 'react';
import {StyleSheet} from 'react-native';
import HeaderButton from '../common/HeaderButton';

function EditCategoryHeaderRight(onSubmit: () => void) {
  return <HeaderButton labelText="저장" onPress={onSubmit} />;
}

const styles = StyleSheet.create({});

export default EditCategoryHeaderRight;
