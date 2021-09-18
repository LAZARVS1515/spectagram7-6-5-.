import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
//import { ScrollView } from 'react-native-gesture-handler'
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

import DropDownPicker from 'react-native-dropdown-picker';
import { Title } from 'react-native-paper';

let customFonts = {
  'Bubblegum-Sans': require('../assets/fonts/BubblegumSans-Regular.ttf'),
};

export default class CreatePost extends Component{
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      previewImage: 'image_1',
      dropdownHeight: 40,
    };
  }
  async loadFontAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }
  componentDidMount() {
    this.loadFontAsync();
  }
  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    }

    else {
      let preview_image = {
        image_1: require('../assets/image_1.jpg'),
        image_2: require('../assets/image_2.jpg'),
        image_3: require('../assets/image_3.jpg'),
        image_4: require('../assets/image_4.jpg'),
        image_5: require('../assets/image_5.jpg'),
        image_6: require('../assets/image_6.jpg'),
        image_7: require('../assets/image_7.jpg')

      }
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require('../assets/logo1.png')}
                style={styles.iconImage}></Image>
            </View>
            <View style={styles.appTitleTextContainer}>
              <Text style={styles.appTitleText}> New Pick </Text>
            </View>
          </View>


          <View style={styles.fieldContainer}>
            <ScrollView>
              <Image
                source={preview_image[this.state.previewImage]}
                style={styles.previewImage}
              />
              <View style={{ height: RFValue(this.state.dropdownHeight) }}>
                <DropDownPicker
                  items={[
                    { label: 'Image 1', value: 'image_1' },
                    { label: 'Image 2', value: 'image_2' },
                    { label: 'Image 3', value: 'image_3' },
                    { label: 'Image 4', value: 'image_4' },
                    { label: 'Image 5', value: 'image_5' },
                    { label: 'Image 6', value: 'image_6' },
                    { label: 'Image 7', value: 'image_7' }
                  ]}
                  defaultValue={this.state.previewImage}

                  containerStyle={{
                    height: 40,
                    borderRadius: 20,
                    marginBottom: 10,
                    color:'white'
                  }}
                  onOpen={() =>{
                    this.setState({ dropdownHeight:170})
                  }}
                  onClose={() =>{
                     this.setState({ dropdownHeight:40})
                  }}

                  style={{ backgroundColor: "transparent" }}
                  itemStyle={{
                    justifyContent: "flex-start"
                  }}
                  dropDownStyle={{ backgroundColor: "black" }}
                  labelStyle={{
                    color: "white",
                    fontFamily: "Bubblegum-Sans"
                  }}
                  arrowStyle={{
                    color: "white",
                    fontFamily: "Bubblegum-Sans"
                  }}

                  onChangeItem={item =>
                    this.setState({
                      previewImage: item.value
                    })}
                />
              </View>
              <TextInput
                style={styles.inputFont}
                onChangeText={title => this.setState({
                  title
                })}
                placeholder={'Image'}
                placeholderTextColor='white'
              />
              <TextInput
                style={[styles.inputFont,
                styles.inputFontExtra,
                styles.inputTextBig]}
                onChangeText={description => this.setState({
                  description
                })}
                placeholder={'Caption'}
                placeholderTextColor='white'
                multiline={true}
                numberOfLines={4}
              />
            </ScrollView>

          </View>

        </View >

      )
   }
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
    flex: 0.07,
    flexDirection: 'row',
  },
  appIcon: {
    flex: 0.3,
    justifyContent: 'center',
    // alignItems: "center"
  },
  iconImage: {
    width: '100%',
    height: '100%',
    marginLeft: 10,
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
  fieldContainer: {
    flex: 0.85,
  },
  previewImage: {
    width: '93%',
    height: RFValue(250),
    alignSelf: 'center',
    borderRadius: RFValue(10),
    marginVertical: RFValue(10),
    resizeMode: 'contain',
  },
  inputFont: {
    height: RFValue(40),
    borderColor: 'white',
    borderWidth: RFValue(1),
    borderRadius: RFValue(10),
    paddingLeft: RFValue(10),
    color: 'white',
    fontFamily: 'Bubblegum-Sans',

  },
  inputFontExtra: {
    marginTop: RFValue(25),
  },
  inputTextBig: {
    textAlignVertical: 'top',
    padding: RFValue(5),
  },
});
