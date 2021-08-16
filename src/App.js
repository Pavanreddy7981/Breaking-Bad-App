import React from 'react'
import { StatusBar, Text, View } from 'react-native';

//navigation imports
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//screens
import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import FavouriteScreen from './screens/FavouriteScreen';
import SearchScreen from './screens/SearchScreen';

const Stack = createNativeStackNavigator();


const App = () => {
  return (
    <NavigationContainer>
    <StatusBar barStyle="auto" backgroundColor="black"/>
      <Stack.Navigator initialRouteName="Home" screenOptions={{
        header : () => null
      }}>

        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Search" component={SearchScreen}/>
        <Stack.Screen name="Details" component={DetailsScreen}/>
        <Stack.Screen name="Favourite" component={FavouriteScreen}/>

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App


