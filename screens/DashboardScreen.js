import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from '../navigation/DrawerNavigator';


export default class DashboardScreen extends Component {
    render() {
        return (
            <NavigationContainer>
                <DrawerNavigator />
            </NavigationContainer>
        )
    }
}
