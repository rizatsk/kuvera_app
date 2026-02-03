import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Animated from 'react-native-reanimated';

export function HelloWave() {
  const [hello, setHello] = useState('hai');
  return (
    <View>
      <TouchableOpacity testID='button-hai' onPress={() => setHello('hello')}>
        <Text>Hello Wave</Text>
      </TouchableOpacity>
      <Animated.Text
        style={{
          fontSize: 28,
          lineHeight: 32,
          marginTop: -6,
          animationName: {
            '50%': { transform: [{ rotate: '25deg' }] },
          },
          animationIterationCount: 4,
          animationDuration: '300ms',
        }}>
        {hello}
      </Animated.Text>
    </View>
  );
}
