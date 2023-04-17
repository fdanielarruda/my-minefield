import { css } from './src/assets/css/Css';

import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import Game from './src/screens/Game';

export default function App() {
  return (
    <View style={css.container}>
      <Game />
      <StatusBar style="auto" />
    </View>
  );
}