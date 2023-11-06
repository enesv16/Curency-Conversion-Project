import * as React from 'react';
import { NativeBaseProvider, Box } from 'native-base';
import { Text, View, SafeAreaView, Image, TouchableOpacity, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import {HomeScreen,CurrencyScreen, HomeScreenDetail, SettingsScreen, SettingsScreenDetail} from './src/tab'
import {NotificationsScreen} from './src/drawer'
import {RegisterScreen, LoginScreen, SignOutScreen ,Push} from './src/auth'
import {IMAGE} from './src/constants/Image'



const StackHome = createStackNavigator()
function HomeStack() {
  return (
    <StackHome.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <StackHome.Screen name="Home" component={HomeScreen} />
      <StackHome.Screen name="HomeDetail" component={HomeScreenDetail} />
      <StackHome.Screen name="Currency" component={CurrencyScreen} />
    </StackHome.Navigator>
  )
}


const StackSetting = createStackNavigator()
function SettingStack() {
  return (
    <StackSetting.Navigator initialRouteName="Setting" screenOptions={{ headerShown: false }}>
      <StackSetting.Screen name="Setting" component={SettingsScreen} />
      <StackSetting.Screen name="SettingDetail" component={SettingsScreenDetail} />
    </StackSetting.Navigator>
  )
}


const StackCurrency = createStackNavigator()
function CurrencyStack() {
  return(
    <StackCurrency.Navigator initialRouteName='Currency' screenOptions={{headerShown: false}}>
      <StackCurrency.Screen name="Home" component={HomeScreen} />
    </StackCurrency.Navigator>
  )
}



const Tab = createBottomTabNavigator();
function TabNavigator() {
  return (
    <Tab.Navigator 
    
    screenOptions={{ headerShown: false }}
     initialRouteName="Feed"
     activeColor="#e91e63"
     labelStyle={{ fontSize: 12 }}
     style={{ backgroundColor: 'tomato'}}
   >
     <Tab.Screen
       name="HomeStack"
       component={HomeStack}
       options={{
         tabBarLabel: 'Ana Sayfa',
         tabBarIcon: ({ color }) => (
           <MaterialCommunityIcons name="home" color={color} size={26} />
         ),
       }}
     />
     <Tab.Screen
       name="Settings"
       component={SettingStack}
       options={{
         tabBarLabel: 'Hazırlayanlar',
         tabBarIcon: ({ color }) => (
           <MaterialCommunityIcons name="cog" color={color} size={26} />
         ),
       }}
     />
   </Tab.Navigator>
  )
}

const Drawer = createDrawerNavigator();
function DrawerNavigator() {
    
  return (
    <Drawer.Navigator initialRouteName="MenuTab"  screenOptions={{ headerShown: false }}>
         
        <Drawer.Screen name="Ana Sayfa" component={TabNavigator} />
        <Drawer.Screen name="Hatırlatıcı Kur / Hatırlatıcılar" component={NotificationsScreen} />
        <Drawer.Screen name="Çıkış" component={SignOutScreen} />
    </Drawer.Navigator>
  )
}


const StackApp = createStackNavigator()
export default function App() {
  return (
    <SafeAreaView style={{flex: 1}}>
    <NativeBaseProvider>

    <NavigationContainer>
        <StackApp.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <StackApp.Screen name="HomeApp" component={DrawerNavigator}/>
          <StackApp.Screen name="Login" component={LoginScreen}/>
          <StackApp.Screen name="Register" component={RegisterScreen}/>
        </StackApp.Navigator>
    </NavigationContainer>
    </NativeBaseProvider>
  </SafeAreaView>
    
  );
}