import React, { Component } from 'react';

import { StyleSheet, View, Text, Platform } from 'react-native';

// import AppIntroSlider from 'react-native-app-intro-slider';
// //import { createAppContainer } from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack';


import secondscreen from './screens/secondscreen';
import thirdscreen from './screens/thirdscreen';
import Payment from '/.screens/Payment'

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {

      show_Main_App: false
      
    };
  }

  on_Done_all_slides = () => {
    this.setState({ show_Main_App: true });
  };

  on_Skip_slides = () => {
    this.setState({ show_Main_App: true });
  };
  render() {
    if (this.state.show_Main_App) {
      return (
        <View style={styles.MainContainer}>

          <Text style={{ textAlign: 'center', fontSize: 20, color: 'blue'}}>

            

          </Text>

        </View>
      );
    } else {
      return (
        <AppIntroSlider
          slides={slides}
          onDone={this.on_Done_all_slides}
          showSkipButton={true}
          onSkip={this.on_Skip_slides}
        />
      );
    }
  }


  // var RootStack = createStackNavigator(
  //   {
  //     Home:secondscreen,
  //     Next:thirdscreen,
  //     Payment:Payment, 
  //   },
  //   {intialRouteName:'Home'}
  // );


}
const styles = StyleSheet.create({

  MainContainer: {
    flex: 1,
    paddingTop: (Platform.OS) === 'ios' ? 20 : 0,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 26,
    color: '#2c03fc',
    fontFamily:'Roboto',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  text: {
    color: '#000000',
    fontSize: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain'
  }
});

const slides = [
  {
    key: 'k1',
    title: 'SEARCH',
    text: 'Search your restaurant',
    image: {
      uri:
        'https://i.ibb.co/CH86Mhj/man-running-hurry-send-papper-illustration-111797-145.jpg',
    },
    titleStyle: styles.title,
    textStyle: styles.text,
    imageStyle: styles.image,
    backgroundColor: '#34eba8',
  },
  {
    key: 'k2',
    title: 'BOOK',
    text: 'Book your choice',
    image: {
      uri:
        'https://i.ibb.co/XDNNPNz/154805-OUC3-T4-802-01.png',
    },
    titleStyle: styles.title,
    textStyle: styles.text,
    imageStyle: styles.image,
    backgroundColor: '#34eba8',
  },
  {
    key: 'k3',
    title: 'GROW',
    text: 'Grow your startup',
    image: {
      uri: 'https://i.ibb.co/FDHSMb0/2919218-01.png',
    },
    titleStyle: styles.title,
    textStyle: styles.text,
    imageStyle: styles.image,
    backgroundColor: '#34eba8',
  },
  // {
  //   key: 'k4',
  //   title: 'Flight Bookings',
  //   text: ' Get Best Deals on Flights',
  //   image: {
  //     uri: 'https://reactnativecode.com/wp-content/uploads/2019/04/flight.png',
  //   },
  //   titleStyle: styles.title,
  //   textStyle: styles.text,
  //   imageStyle: styles.image,
  //   backgroundColor: '#45277e',
  // },
  // {
  //   key: 'k5',
  //   title: 'Restaurant Bookings',
  //   text: 'Upto 20% off on first Restaurant booking.All4U by Shanu Mishra',
  //   image: {
  //     uri:
  //       'https://reactnativecode.com/wp-content/uploads/2019/04/restaurants.png',
  //   },
  //   titleStyle: styles.title,
  //   textStyle: styles.text,
  //   imageStyle: styles.image,
  //   backgroundColor: '#FF3D00',
  // },
];