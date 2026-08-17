import React from 'react';

import CutomTabs from '@/components/custom-tab';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      tabBar={(props) => <CutomTabs {...props} />}
      screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }} />
      <Tabs.Screen
        name="transaction"
        options={{
          title: "Transaction",
        }} />
      <Tabs.Screen
        name="stock-idx"
        options={{
          title: "Stock IDX",
        }} />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
        }} />
    </Tabs>
  )
}
