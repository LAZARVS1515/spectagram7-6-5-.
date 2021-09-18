import React, { Component } from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  Platform,
  SafeAreaView,
} from 'react-native';
import * as Google from 'expo-google-app-auth';
import firebase from 'firebase';
import db from '../config';
import { RFValue } from 'react-native-responsive-fontsize';
import AppLoading from 'expo-app-loading';
export default class LoginScreen extends Component {
  signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        behavior: 'web',
        androidClientId:
          '1078569110540-gmlitp89btl7rv2h4i4u2tbkdse4l95m.apps.googleusercontent.com',
        iosClientId:
          '1078569110540-7hkholj9ksjtp295vecobdh41j72vnf9.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        this.onSignIn(result);
        this.props.navigation.navigate('DashboardScreen');
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };
  onSignIn = (googleUser) => {
    console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!this.isUserEqual(googleUser, firebaseUser)) {
        // Build Firebase credential with the Google ID token.
        var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.idToken,
          googleUser.accessToken
        );

        // Sign in with credential from the Google user.
        firebase
          .auth()
          .signInWithCredential(credential)
          .then(function (result) {
            firebase
              .database()
              .ref('/users/' + result.user.uid)
              .set({
                gmail: result.user.email,
                profile_picture: result.additionalUserInfo.profile.picture,
                locale: result.additionalUserInfo.profile.locale,
                first_name: result.additionalUserInfo.profile.given_name,
                last_name: result.additionalUserInfo.profile.family_name,
                current_theme: 'dark',
              })
              .then(function (snapshot) {});
          })

          .catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
      } else {
        console.log('User already signed-in Firebase.');
      }
    });
  };
  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  };
  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.droidSafeArea} />
        <View styl={styles.appTitle}>
          <Image
            source={require('../assets/logo1.png')}
            style={styles.appLogo}
          />
          <Text style={styles.appTitleText}>{'SPECTAGRAM'}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => this.signInWithGoogleAsync()}
            style={styles.button}>
            <Image
              source={require('../assets/google_icon.png')}
              style={styles.googleImageStye}
            />
            <Text style={styles.googleTextstyle}>Sign-In-With-Google</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.takingPickContainer}>
          <Image
            source={require('../assets/takimg-pick.png')}
            style={styles.pick}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35),
  },
  appTitle: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleTextstyle: {
    color: 'black',
    fontSize: RFValue(20),
    fontFamily: 'Bubblegum-Sans',
  },
  googleImageStye: {
    width: RFValue(30),
    height: RFValue(30),
    resizeMode: 'contain',
  },
  button: {
    width: RFValue(250),
    height: RFValue(50),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: RFValue(30),
    backgroundColor: 'white',
  },
  appLogo: {
    width: RFValue(130),
    height: RFValue(130),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  appTitleText: {
    color: 'white',
    textAlign: 'center',
    fontSize: RFValue(40),
    fontFamily: 'Bubblegum-Sans',
  },
  buttonContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  takingPickContainer: {
    flex: 0.3,
  },
  pick: {
    width: RFValue(130),
    height: RFValue(130),
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});
