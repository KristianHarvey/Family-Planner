import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthContextProvider } from './src/context/AuthContextProvider';
import MainNavigation from './src/navigation/MainNavigation';
// import { SplashScreen } from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { useColor } from './src/hooks/useColor';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['...']);

// SplashScreen.preventAutoHideAsync();

export default function App() {
  const { colors } = useColor();
  const [fontsLoaded, fontError] = useFonts({
    'TitilliumWeb-Regular': require('./assets/fonts/TitilliumWeb-Regular.ttf'),
    'TitilliumWeb-Bold': require('./assets/fonts/TitilliumWeb-Bold.ttf'),
    'TitilliumWeb-Black': require('./assets/fonts/TitilliumWeb-Black.ttf'),
  })
  // const onLayoutRootView = React.useCallback(async () => {
  //   if (fontsLoaded || fontError) {
  //     await SplashScreen.hideAsync();
  //   }
  // }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
      <SafeAreaProvider>
            <NavigationContainer>
                <AuthContextProvider>
                {/* <View style={{ flex: 1, backgroundColor: colors.background.main }} onLayout={onLayoutRootView}> */}
                  <MainNavigation />
                {/* </View> */}
                </AuthContextProvider>
            </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
