import React from 'react';
import { Tabs } from 'expo-router';
import { MaterialIcons, FontAwesome6 } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

export default function TabLayout() {
  return (
    <>
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "blue",
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }) => <MaterialIcons size={24} name="dashboard" color={color} />,
        }}
        
      />
      <Tabs.Screen
        name="add-meal"
        options={{
          title: 'Add Meal',
          tabBarIcon: ({ color }) => <FontAwesome6 size={24} name="bowl-food" color={color} />,
        }}
      />
      <Tabs.Screen
        name="grocery"
        options={{
          title: 'Grocery',
          tabBarIcon: ({ color }) => <FontAwesome6 size={24} name="cart-shopping" color={color} />,
        }}
      />
      
    </Tabs>
    <Toast />
    </>
  );
}
