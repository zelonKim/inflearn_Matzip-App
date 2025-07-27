import Loader from '@/components/common/Loader';
import RetryErrorBoundary from '@/components/common/RetryErrorBoundary';
import FeedList from '@/components/feed/FeedList';
import React, {Suspense} from 'react';
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

function FeedHomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <RetryErrorBoundary>
        <Suspense
          fallback={
            // 데이터를 불러오는 동안, 보여줄 컴포넌트를 지정함.
            <Loader />
          }>
          <FeedList />
        </Suspense>
      </RetryErrorBoundary>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FeedHomeScreen;
