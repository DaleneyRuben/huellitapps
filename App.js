import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from './theme';
import { MaterialIcons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import ScreenWrapper from './components/ScreenWrapper';

// Import screens
import HomeScreen from './screens/HomeScreen';
import ShelterScreen from './screens/ShelterScreen';
import SearchScreen from './screens/SearchScreen';
import MapScreen from './screens/MapScreen';
import AccountScreen from './screens/AccountScreen';

const Tab = createBottomTabNavigator();

// Linking configuration for web URL support
const linking = {
  prefixes: ['/'],
  config: {
    screens: {
      Inicio: '/',
      Buscar: '/buscar',
      Albergue: '/albergue',
      Mapa: '/mapa',
      Cuenta: '/cuenta',
    },
  },
};

export default function App() {
  return (
    <NavigationContainer linking={Platform.OS === 'web' ? linking : undefined}>
      <Tab.Navigator
        initialRouteName="Inicio"
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: colors.surface,
            borderTopColor: colors.border,
            borderTopWidth: 1,
            paddingBottom: 20,
            paddingTop: 2,
            height: 80,
          },
          tabBarActiveTintColor: colors.orange,
          tabBarInactiveTintColor: colors.textSecondary,
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: '600',
            marginTop: 4,
          },
          tabBarIconStyle: {
            marginTop: 4,
          },
        }}
      >
        <Tab.Screen
          name="Buscar"
          options={{
            tabBarIcon: ({ color }) => (
              <TabIcon iconName="search" color={color} />
            ),
          }}
        >
          {() => (
            <ScreenWrapper>
              <SearchScreen />
            </ScreenWrapper>
          )}
        </Tab.Screen>
        <Tab.Screen
          name="Albergue"
          options={{
            tabBarIcon: ({ color }) => (
              <TabIcon iconName="pets" color={color} />
            ),
          }}
        >
          {() => (
            <ScreenWrapper>
              <ShelterScreen />
            </ScreenWrapper>
          )}
        </Tab.Screen>
        <Tab.Screen
          name="Inicio"
          options={{
            tabBarIcon: ({ color }) => (
              <TabIcon iconName="home" color={color} />
            ),
          }}
        >
          {() => (
            <ScreenWrapper>
              <HomeScreen />
            </ScreenWrapper>
          )}
        </Tab.Screen>
        <Tab.Screen
          name="Mapa"
          options={{
            tabBarIcon: ({ color }) => <TabIcon iconName="map" color={color} />,
          }}
        >
          {() => (
            <ScreenWrapper>
              <MapScreen />
            </ScreenWrapper>
          )}
        </Tab.Screen>
        <Tab.Screen
          name="Cuenta"
          options={{
            tabBarIcon: ({ color }) => (
              <TabIcon iconName="person" color={color} />
            ),
          }}
        >
          {() => (
            <ScreenWrapper>
              <AccountScreen />
            </ScreenWrapper>
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// Tab icon component using MaterialIcons
const TabIcon = ({ iconName, color, size = 24 }) => (
  <MaterialIcons name={iconName} size={size} color={color} />
);
