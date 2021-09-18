import React, { Component } from 'react';
import { Text, View,ActivityIndicator,StyleSheet} from 'react-native';
import firebase from 'firebase';

export default class LoadingScreen extends Component {
        componentDidMount() {
            this.checkIfLoggedIn();
        }
    
        checkIfLoggedIn = () => {
            //returns user that has logged in
         firebase.auth().onAuthStateChanged((user) =>{
           if(user){
             this.props.navigation.navigate('DashboardScreen')
           }
           else{
            this.props.navigation.navigate('LoginScreen');
           }     
         })
        }

    render() {
        return (
            <View
                style={Styles.container}>
                    <ActivityIndicator size='large' color='white'/>
                <Text>LoadingScreen</Text>
            </View>
        )
    }
}

const Styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: 'black',
},
})
