import React from 'react';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Header from '../Header';

const ScreenWrapper = ({ children }) => {
  const insets = useSafeAreaInsets();

  return (
    <>
      <StatusBar style="light" />
      <SafeAreaView edges={['left', 'right', 'bottom']} style={{ flex: 1 }}>
        <Header topInset={insets.top} />
        {children}
      </SafeAreaView>
    </>
  );
};

export default ScreenWrapper;
