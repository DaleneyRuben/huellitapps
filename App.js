import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';
import { colors } from './theme';

// Import screens
import HomeScreen from './screens/HomeScreen';
import ShelterScreen from './screens/ShelterScreen';
import SearchScreen from './screens/SearchScreen';
import MapScreen from './screens/MapScreen';
import AccountScreen from './screens/AccountScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: colors.surface,
            borderTopColor: colors.border,
            borderTopWidth: 1,
            paddingBottom: 20,
            paddingTop: 8,
            height: 80,
          },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textSecondary,
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: '500',
          },
          tabBarIconStyle: {
            fontSize: 24,
          },
        }}
      >
        <Tab.Screen
          name="Inicio"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color }) => <TabIcon icon="🏠" color={color} />,
          }}
        />
        <Tab.Screen
          name="Albergue"
          component={ShelterScreen}
          options={{
            tabBarIcon: ({ color }) => <TabIcon icon="🐕" color={color} />,
          }}
        />
        <Tab.Screen
          name="Buscar"
          component={SearchScreen}
          options={{
            tabBarIcon: ({ color }) => <TabIcon icon="🔍" color={color} />,
          }}
        />
        <Tab.Screen
          name="Mapa"
          component={MapScreen}
          options={{
            tabBarIcon: ({ color }) => <TabIcon icon="📍" color={color} />,
          }}
        />
        <Tab.Screen
          name="Cuenta"
          component={AccountScreen}
          options={{
            tabBarIcon: ({ color }) => <TabIcon icon="🐱" color={color} />,
          }}
        />
      </Tab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

// Simple tab icon component
const TabIcon = ({ icon, color }) => (
  <Text style={{ color, fontSize: 24 }}>{icon}</Text>
);
