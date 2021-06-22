import type { RefObject } from 'react';
import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import RootNavigator from './navigators/RootNavigator';
import { StatusBar } from 'react-native';

export default function App() {
  const navigationContainerRef: RefObject<NavigationContainerRef> =
    React.createRef<NavigationContainerRef>();

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={'light-content'} />
      <NavigationContainer ref={navigationContainerRef}>
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
