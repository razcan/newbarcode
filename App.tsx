import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Text, View } from 'react-native';
import AppNavigator from './AppNavigator';
import { AppRegistry } from 'react-native';
import { PaperProvider, configureFonts, MD3LightTheme } from 'react-native-paper';

export default function App() {

  const fontConfig = {
    customVariant: {
      fontFamily: Platform.select({
        web: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
        ios: 'System',
        default: 'sans-serif',
      }),
      fontWeight: '400',
      letterSpacing: 0.5,
      lineHeight: 22,
      fontSize: 20,
    }
  };

  const theme = {
    ...MD3LightTheme,
    fonts: configureFonts({ config: fontConfig }),
  };


  return (
    <PaperProvider theme={theme}>
      <AppNavigator />
    </PaperProvider>
  );
  // return <AppNavigator />;
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
