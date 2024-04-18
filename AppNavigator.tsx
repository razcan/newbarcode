// AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { HomeScreen } from './HomeScreen';
import HomeScreen from "./HomeScreen"
import DetailsScreen from "./DetailsScreen"

export type RootStackParamList = {
    Scanare: undefined;
    Administrare: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Scanare" component={HomeScreen} />
                <Stack.Screen name="Administrare" component={DetailsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
