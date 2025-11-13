import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from './theme';
import { MaterialIcons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import ScreenWrapper from './components/ScreenWrapper';
import SplashScreen from './components/SplashScreen';

// Import screens
import HomeScreen from './screens/HomeScreen';
import ShelterScreen from './screens/ShelterScreen';
import SearchScreen from './screens/SearchScreen';
import MapScreen from './screens/MapScreen';
import AccountScreen from './screens/AccountScreen';
import LostPetFlowScreen from './screens/LostPetFlowScreen';
import VideosScreen from './screens/VideosScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Stack Navigator for Home tab
function HomeStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeMain">
        {() => (
          <ScreenWrapper>
            <HomeScreen />
          </ScreenWrapper>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

// Tab Navigator Component
function TabNavigator() {
  return (
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
          tabBarIcon: ({ color }) => <TabIcon iconName="pets" color={color} />,
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
          tabBarIcon: ({ color }) => <TabIcon iconName="home" color={color} />,
        }}
        component={HomeStackNavigator}
      />
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
  );
}

// Linking configuration for web URL support
const linking = {
  prefixes: ['/'],
  config: {
    screens: {
      Tabs: {
        screens: {
          Inicio: {
            screens: {
              HomeMain: '/',
            },
          },
          LostPetFlow: '/lost-pet-flow',
          Buscar: '/buscar',
          Albergue: '/albergue',
          Mapa: '/mapa',
          Cuenta: '/cuenta',
        },
      },
      Videos: '/videos',
    },
  },
};

// Root Stack Navigator (contains Tab Navigator and modal screens)
function RootStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Tabs" component={TabNavigator} />
      <Stack.Screen
        name="Videos"
        options={{
          presentation: 'card',
        }}
      >
        {() => <VideosScreen />}
      </Stack.Screen>
      <Stack.Screen
        name="LostPetFlow"
        options={{
          presentation: 'transparentModal',
          animation: 'fade',
        }}
      >
        {() => <LostPetFlowScreen />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  return (
    <>
      {showSplash && <SplashScreen onFinish={handleSplashFinish} />}
      <NavigationContainer
        linking={Platform.OS === 'web' ? linking : undefined}
      >
        <RootStackNavigator />
      </NavigationContainer>
    </>
  );
}

// Tab icon component using MaterialIcons
const TabIcon = ({ iconName, color, size = 24 }) => (
  <MaterialIcons name={iconName} size={size} color={color} />
);
