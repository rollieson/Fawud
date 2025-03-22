import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

// Import screens
import { SignIn, OnBoarding, SignUp } from './screens';

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false, 
                }}
                initialRouteName="SignIn" 
            >
                <Stack.Screen name="SignIn" component={SignIn} />
                <Stack.Screen name="OnBoarding" component={OnBoarding} />
                <Stack.Screen name="SignUp" component={SignUp} /> 
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
