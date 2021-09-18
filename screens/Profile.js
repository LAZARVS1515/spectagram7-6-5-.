import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image, FlatList,
  Switch
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import StoryCard from "./Pick";
import db from'../config'

import AppLoading from "expo-app-loading";
import * as Font from "expo-font";
import firebase from 'firebase'
import LoginScreen from "./LoginScreen";
import { values } from "lodash";



let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};


export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      isEnabled : false,
      light_Theme : true,
      profile_image: '',
      name: '' 
    };
  }
  componentDidMount() {
    this._loadFontsAsync();
    this.fetchUser();
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts)
    this.setState({ fontsLoaded: true })
  }
   async fetchUser() {
    let theme,name,image
    await firebase
    .database()
    .ref('/users/'+firebase.auth().currentUser.uid)
    .on('value',function(snapshot){
      theme = snapshot.val().current_theme
      name =`${snapshot.val().first_name} ${snapshot.val().last_name}`
      image = snapshot.val().profile_picture 
    })
     this.setState({
      light_theme : theme ==='light'?true : false,
      isEnabled: theme === 'light' ?false :true,
      name:name,
      profile_image : image
    })
   }
  toggleSwitch=()=>{
    const previous_state =this.state.isEnabled
     const theme =!this.state.isEnabled?'dark':'light'
     let myupdates = {}
     myupdates['/users/'+firebase.auth().currentUser.uid+'/current_theme']=theme
     firebase.database().ref().update(myupdates)
     this.setState({
       isEnabled:!previous_state,
       light_Theme: previous_state
     })
  }
  render(){
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    }
    else {

      return (
        <View style={ styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <View style={styles.appLogo}>
              <Image
                source={require('../assets/logo1.png')}
                style={styles.iconImage}></Image>
            </View>
            <View style={styles.appTitleTextContainer}>
              <Text style={styles.appTitleText}>
                SPECTAGRAM
                </Text>
                </View>
            </View>
            <View style={styles.screenContainer}>
              <View style={styles.profileImageContainer}>
                  <Image source={{uri:this.state.profile_image}}
                   style={styles.profileImage}/>
                   <Text style={styles.nameText}>{this.state.name}</Text>
              </View>
              <View style={styles.themesContainer}>
                <Text style={styles.themeText}>Dark Theme</Text>
                <Switch 
                style={{ 
                    transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }], }}
                    trackColor={{ false: "#767577", true:  "white" }}
                    thumbColor={this.state.isEnabled ? "#f5dd4b" : "#f4f3f4"}   
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={()=>this.toggleSwitch()}
                    value={this.state.isEnabled}
                   
                />

            </View>
            </View>
          </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  droidSafeArea: {
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  appTitle: {
    flex: 0.07,
    flexDirection: 'row',
  },
  appLogo: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: 'center',
  },
  appTitleText: {
    color: 'white',
    fontSize: RFValue(28),
    fontFamily: 'Bubblegum-Sans',
  },
  screenContainer: {
    flex: 0.85,
  },
  profileImageContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: RFValue(140),
    height: RFValue(140),
    borderRadius: RFValue(70),
  },
  nameText: {
    color: 'white',
    fontSize: RFValue(40),
    fontFamily: 'Bubblegum-Sans',
    marginTop: RFValue(10),
  },
  themesContainer: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: RFValue(20),
  },
  themeText: {
    color: 'white',
    fontSize: RFValue(30),
    fontFamily: 'Bubblegum-Sans',
    marginRight: RFValue(15),
  },
});
