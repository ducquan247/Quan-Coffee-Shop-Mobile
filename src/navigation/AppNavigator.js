import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import CartPreviewScreen from '../screens/CartPreviewScreen';
import DeliveryScreen from '../screens/DeliveryScreen';
import DetailScreen from '../screens/DetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import HomeScreen from '../screens/HomeScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import OrderScreen from '../screens/OrderScreen';
import { COLORS, SHADOW } from '../constants/theme';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: COLORS.background,
    card: COLORS.surface
  }
};

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: '#A1A1A1',
        tabBarLabelStyle: {
          display: 'none'
        },
        tabBarStyle: {
          backgroundColor: COLORS.surface,
          borderTopWidth: 0,
          borderRadius: 28,
          height: 86,
          left: 16,
          paddingTop: 10,
          paddingBottom: 12,
          position: 'absolute',
          right: 16,
          ...SHADOW
        },
        tabBarIcon: ({ color, focused }) => {
          const icons = {
            Home: focused ? 'home' : 'home-outline',
            Favorites: focused ? 'heart' : 'heart-outline',
            Cart: focused ? 'bag' : 'bag-outline',
            Notifications: focused ? 'notifications' : 'notifications-outline'
          };

          return <Ionicons color={color} name={icons[route.name]} size={28} />;
        }
      })}
    >
      <Tab.Screen component={HomeScreen} name="Home" />
      <Tab.Screen component={FavoritesScreen} name="Favorites" />
      <Tab.Screen component={CartPreviewScreen} name="Cart" />
      <Tab.Screen component={NotificationsScreen} name="Notifications" />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen component={OnboardingScreen} name="Onboarding" />
        <Stack.Screen component={MainTabs} name="MainTabs" />
        <Stack.Screen component={DetailScreen} name="Detail" />
        <Stack.Screen component={OrderScreen} name="Order" />
        <Stack.Screen component={DeliveryScreen} name="Delivery" />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
