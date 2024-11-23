import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
<Tabs.Screen
  name="Messenger"
  options={{
    title: 'Messenger',
    tabBarIcon: ({ color, focused }) => (
      <Ionicons 
        name={focused ? 'chatbubble' : 'chatbubble-outline'} 
        size={24} 
        color={color} 
      />
    ),
  }}
/>

      <Tabs.Screen
  name="Profile"
  options={{
    title: 'Profile',
    tabBarIcon: ({ color, focused }) => (
      <TabBarIcon name={focused ? 'person' : 'person-outline'} color={color} />
    ),
  }}
/>

    </Tabs>
  );
}
