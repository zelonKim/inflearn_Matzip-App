import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet, Text} from 'react-native';
import {colors} from '@/constants';
import FeedFavoriteList from './FeedFavoriteList';
import {Suspense} from 'react';
import Loader from '@/components/common/Loader';
import RetryErrorBoundary from '@/components/common/RetryErrorBoundary';

function FeedFavoriteScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <RetryErrorBoundary>
        <Suspense fallback={<Loader />}>
          <FeedFavoriteList />
        </Suspense>
      </RetryErrorBoundary>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
});

export default FeedFavoriteScreen;
