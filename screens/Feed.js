import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image, FlatList
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import Pick from "./Pick";

import AppLoading from "expo-app-loading";
import * as Font from "expo-font";

let Picks = require("./PostPick.json");

let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};

export default class CreateStory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false
    };
  }
  componentDidMount() {
    this._loadFontsAsync();
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts)
    this.setState({ fontsLoaded: true })
  }

  keyExtractor = (item, index) => index.toString();


  renderItem = ({ item: myPick }) => {
    return <Pick story={myPick} navigation={this.props.navigation}/>;
  }

  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    }
    else {

      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
            <Image
                            source={require("../assets/logo1.png")}
                            style={styles.iconImage} />
            </View>
            <View style={styles.appTitleTextContainer}>
              <Text style={styles.appTitleText}> Spectagram  </Text>
            </View>
          </View>

          <View style={styles.cardContainer}>
            <FlatList
              keyExtractor={this.keyExtractor}
              data={Picks}
              renderItem={this.renderItem}
            />
          </View>


        </View>


      );
    }
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black"
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
  },
  appTitle: {
    flex: 0.07, 
    flexDirection: "row"
  },
  appIcon: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center"
  },
  iconImage: {
    width: "200%",
    height: "200%",
    resizeMode: "contain"
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: "center",
    alignSelf:'center'
  },
  appTitleText: {
    color: "white",
    fontSize: RFValue(28),
    fontFamily: "Bubblegum-Sans"
  },
  cardContainer: {
    flex: 0.85
  }
});

