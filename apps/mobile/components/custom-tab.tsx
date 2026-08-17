import { Colors } from '@/constants/theme';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Octicons from '@expo/vector-icons/Octicons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenContentWrapper } from 'react-native-screens';
import CustomText from './custom-text';

export default function CutomTabs({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <SafeAreaView
      edges={['bottom']}
      style={{
        backgroundColor: 'white',
      }}
    >
      <ScreenContentWrapper style={{ backgroundColor: "white", width: '100%'}}>
        <View style={style.container}>
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                  ? options.title
                  : route.name;

            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name, route.params);
              }
            };

            const onLongPress = () => {
              navigation.emit({
                type: 'tabLongPress',
                target: route.key,
              });
            };

            const color = isFocused ? Colors.tealKuvera : Colors.grey[600];
            const IconComponent = () => {
              switch (label) {
                case 'Home':
                  return <Octicons name="home" size={20} color={color} />;
                case 'Profile':
                  return <Feather name="user" size={20} color={color} />;
                case 'Transaction':
                  return <MaterialCommunityIcons name="chart-timeline-variant" size={24} color={color} />;
                case 'Stock IDX':
                  return <MaterialIcons name="candlestick-chart" size={24} color={color} />
                default:
                  return <MaterialCommunityIcons name="react" size={20} color={color} />;
              }
            }

            return (
              <TouchableOpacity
                activeOpacity={0.6}
                key={label as string}
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarButtonTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={{ gap: 1, alignItems: 'center' }}
              >
                <IconComponent />
                <CustomText style={{ color: color, fontSize: 12, fontWeight: 700 }}>
                  {label as string}
                </CustomText>
                {isFocused ? (
                  <View style={{ backgroundColor: color, height: 3, width: "100%", borderRadius: 100 }}></View>
                ) : (
                  <View style={{ height: 3, width: "100%" }}></View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScreenContentWrapper>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    borderTopColor: Colors.grey[200],
    borderTopWidth: 0.5,
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
  }
})