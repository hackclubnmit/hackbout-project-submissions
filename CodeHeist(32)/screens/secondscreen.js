"use strict";
// import React from 'react';
import React, { Component } from "react";
import {
  StyleSheet,
  Image,
  Text,
  View,
  TextInput,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Dimensions,
  UIManager,
  findNodeHandle,
  TouchableOpacity,
  ScrollView,
  Icon,
  TouchableHighlight
} from "react-native";

//import DropDown from "./DropDown";

//import firebase from './dbConfig';

// import { createAppContainer } from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack';

//import Scanner from './Scanner';

const DEVICE_HEIGHT = Dimensions.get("window").height;

class SecondScreen extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      items: "",
      data: "",
      product: "",
      price: ""
    };
  }

  // showDropDown = () => {
  //   if (this.button) {
  //     // use the uimanager to measure the button's position in the window
  //     UIManager.measure(
  //       findNodeHandle(this.button),
  //       (x, y, width, height, pageX, pageY) => {
  //         const position = {
  //           left: pageX,
  //           top: pageY,
  //           width: width,
  //           height: height
  //         };
  //         // setState, which updates the props that are passed to the DropDown component
  //         this.setState({
  //           show: true,
  //           position: { x: pageX + width / 2, y: pageY + (2 * height) / 3 }
  //         });
  //       }
  //     );
  //   }
  // };

  // // hide the dropdown
  // hideDropDown = item => {
  //   alert(item);
  //   this.setState({ show: false, position: {} });
  // };

  render() {
    return (
      <>
        <View style={styles.BackGround}>
          <View style={styles.Box}>
            <View style={styles.SectionStyle}>
              <Image
                source={require("./search.png")} //Change your icon image here
                style={styles.ImageStyle}
              />

              <TextInput
                style={{
                  flex: 1,
                  justifyContent: "center",
                  textAlign: "center",
                  fontSize: 12
                }}
                placeholder="Search for Restaurant"
                underlineColorAndroid="transparent"
                //onChangeText={(text) => this.setState({data: text})}
                onChangeText={text => this.setState({ data: text })}
                value={this.state.data}
                onSubmitEditing={this.componentWillMount}
                // onSubmitEditing={()=>this._search}
                //onSubmitEditing={()=>this.componentWillMount}
              />
              <View>
                <TouchableOpacity onPress={() => this.showDropDown}>
                  <Image
                    source={require("./mic.png")} //Change your icon image here
                    style={styles.ImageStyle2}
                  />
                </TouchableOpacity>
                {/* <DropDown
                  show={this.state.show}
                  position={this.state.position}
                  hide={this.hideDropDown}
                /> */}
              </View>
            </View>
          </View>

          {/* <CameraKitCameraScreen >
        <BarcodeMask />
    </CameraKitCameraScreen> */}
          {/*   */}

          <View>
            <ScrollView
              style={styles.scrollview}
              contentContainerStyle={styles.innerview}
            >
              {/* <TouchableHighlight > */}
              <Text
                style={{ textAlign: "center", color: "#fff", fontSize: 20 }}
                onPress={() =>
                  this.props.navigation.navigate("Details", {
                    JSON_ListView_Clicked_Item: this.state.data
                  })
                }
              >
                {this.state.items}
              </Text>
              <View
                style={{
                  width: DEVICE_WIDTH,
                  flexDirection: "row",
                  justifyContent: "space-around"
                }}
              >
                <Text
                  style={{ color: "#fff", fontSize: 18 }}
                  onPress={() =>
                    this.props.navigation.navigate("Details", {
                      JSON_ListView_Clicked_Item: this.state.data
                    })
                  }
                >
                  {this.state.product}
                </Text>
                <Text
                  style={{ color: "#fff", fontSize: 18 }}
                  onPress={() =>
                    this.props.navigation.navigate("Details", {
                      JSON_ListView_Clicked_Item: this.state.data
                    })
                  }
                >
                  {this.state.price}
                </Text>
              </View>

              {/* {DATA} */}
            </ScrollView>
            {/* </TouchableHighlight> */}
          </View>
          {/* <ScrollView style={styles.scrollView}> */}
          <View //for slider
            style={{
              width: "100%",
              top: -53,
              height: 220,
              backgroundColor: "#000"
            }}
          >
            <Text style={{ color: "#fff" }}>Carousel</Text>
          </View>

          <View
            style={{
              //for cards
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              //elevation: 100,

              position: "absolute",
              top: 350,
              left: 0,
              right: 0
            }}
          >
            <View style={styles.rest}>
              <Image
                style={{
                  height: 100,
                  flex: 1,
                  elevation: 10,
                  width: "90%",
                  margin: 10,
                  alignSelf: "center"
                }}
                source={{
                  uri:
                    "https://img.traveltriangle.com/blog/wp-content/uploads/2018/01/FotoJetdjgfurei687497.jpg"
                }}
              />
              <Text style={styles.navText}>Explore</Text>
            </View>

            <View style={styles.rest}>
              <Image
                style={{
                  height: 100,
                  flex: 1,
                  width: "90%",
                  margin: 10,
                  alignSelf: "center"
                }}
                source={{
                  uri:
                    "https://img.traveltriangle.com/blog/wp-content/uploads/2018/01/FotoJetdjgfurei687497.jpg"
                }}
              />
              <Text
                style={styles.Name}
                onPress={() => alert("Please Search/Scan a Product")}
              >
                Amrita Cafe
              </Text>
            </View>

            <View style={styles.rest}>
              <Image
                style={{
                  height: 100,
                  flex: 1,
                  width: "90%",
                  margin: 10,
                  alignSelf: "center"
                }}
                source={{
                  uri:
                    "https://img.traveltriangle.com/blog/wp-content/uploads/2018/01/FotoJetdjgfurei687497.jpg"
                }}
              />
              <Text style={styles.Name}>Kannan Cafe</Text>
            </View>

            <View style={styles.rest}>
              <Image
                style={{
                  height: 100,
                  flex: 1,
                  width: "90%",
                  margin: 10,
                  alignSelf: "center",
                  borderRadius: 15
                }}
                source={{
                  uri:
                    "https://img.traveltriangle.com/blog/wp-content/uploads/2018/01/FotoJetdjgfurei687497.jpg"
                }}
              />
              <Text
                style={styles.Name}
                onPress={() => alert("Please Search/Scan a Product")}
              >
                Amrita Cafe
              </Text>
            </View>

            <View style={styles.rest}>
              <Image
                style={{
                  height: 100,
                  flex: 1,
                  width: "90%",
                  margin: 10,
                  alignSelf: "center",
                  borderRadius: 15
                }}
                source={{
                  uri:
                    "https://img.traveltriangle.com/blog/wp-content/uploads/2018/01/FotoJetdjgfurei687497.jpg"
                }}
              />
              <Text style={styles.Name}>Kannan Cafe</Text>
            </View>

            <View style={styles.rest}>
              <Image
                style={{
                  height: 100,
                  flex: 1,
                  width: "90%",
                  margin: 10,
                  alignSelf: "center"
                }}
                source={{
                  uri:
                    "https://img.traveltriangle.com/blog/wp-content/uploads/2018/01/FotoJetdjgfurei687497.jpg"
                }}
              />
              <Text
                style={styles.Name}
                onPress={() => alert("Please Search/Scan a Product")}
              >
                Amrita Cafe
              </Text>
            </View>

            <View style={styles.rest}>
              <Image
                style={{
                  height: 100,
                  flex: 1,
                  width: "90%",
                  margin: 10,
                  alignSelf: "center",
                  borderRadius: 20
                }}
                source={{
                  uri:
                    "https://img.traveltriangle.com/blog/wp-content/uploads/2018/01/FotoJetdjgfurei687497.jpg"
                }}
              />
              <Text style={styles.Name}>Kannan Cafe</Text>
            </View>

            <View style={styles.rest}>
              <Image
                style={{
                  height: 150,
                  flex: 1,
                  width: "90%",
                  margin: 10,
                  alignSelf: "center"
                }}
                source={{
                  uri:
                    "https://img.traveltriangle.com/blog/wp-content/uploads/2018/01/FotoJetdjgfurei687497.jpg"
                }}
              />
              <Text style={styles.navText}>Saved</Text>
            </View>
          </View>
          {/* </ScrollView> */}

          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",

              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0
            }}
          >
            <View style={styles.navBar_out_l}>
              <Image
                source={require("./explb.png")} //Change your icon image here
                style={styles.icon_bottom_1_2_4}
              />
              <Text
                style={{
                  justifyContent: "center",
                  textAlign: "center",
                  marginTop: 0,
                  fontFamily: "Roboto",
                  fontSize: 12,
                  marginBottom: 8,

                  color: "#508dea",
                  // position: 'absolute',
                  fontWeight: "900"
                }}
              >
                Explore
              </Text>
            </View>

            <View style={styles.navBar_in}>
              <Image
                source={require("./heart.png")} //Change your icon image here
                style={styles.icon_bottom_1_2_4}
              />
              <Text
                style={styles.navText}
                onPress={() => alert("Please Search/Scan a Product")}
              >
                Saved
              </Text>
            </View>

            <View style={styles.navBar_in}>
              <TouchableHighlight
                onPress={() => this.props.navigation.navigate("Scan")}
              >
                <Image
                  source={require("./cart.png")} //Change your icon image here
                  style={styles.icon_bottom_1_2_4}
                />
              </TouchableHighlight>
              <Text
                style={styles.navText}
                onPress={() => this.props.navigation.navigate("Scan")}
              >
                Bookings
              </Text>
            </View>

            <View style={styles.navBar_in}>
              {/* <View style={{opacity: 0.3, color: '#fff', height: 100, width: 100}} > */}
              <Image
                source={require("./admin.png")} //Change your icon image here
                style={styles.icon_bottom_1_2_4}
              />
              {/* </View> */}

              <Text style={styles.navText}>Account</Text>
            </View>

            {/* <View style={styles.navBar_out_r}>
              <Image
                source={require("./mic.png")} //Change your icon image here
                style={styles.icon_bottom_5}
              />
              <Text style={styles.navText}>Photo Update</Text>
            </View> */}
          </View>
        </View>
      </>
    );
  }

  // componentWillMount= async()=>{

  //   var ref = firebase.database().ref('/');

  //   ref.child(this.state.data).on("value", snapshot =>{

  //  // alert(snapshot.val().UPC);
  // //if(snapshot.val().Price == this.state.data){

  //  this.setState({product : snapshot.val().info.Product});
  // this.setState({price : snapshot.val().info.Price});
  // this.setState({items: snapshot.val().UPC});
  // //}
  // //else{
  // //alert('there is problem');
  // //}
  //   }, function (error) {
  //     console.log("Error: " + error.code);
  //  });
  // }
}

const DEVICE_WIDTH = Dimensions.get("window").width;

const styles = StyleSheet.create({
  BackGround: {
    backgroundColor: "#fff",
    height: "100%"
  },

  Box: {
    height: 110,
    backgroundColor: "#508dea"
  },
  scrollView: {
    marginHorizontal: 2
  },

  SectionStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    // borderWidth: 0.8,
    // borderColor: '#000',
    shadowColor: "#176f75",

    marginTop: 50,
    height: 40,
    borderRadius: 10,
    margin: 10
  },
  ImageStyle: {
    padding: 10,
    marginLeft: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: "stretch",
    alignItems: "center"
  },
  ImageStyle2: {
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: "stretch",
    alignItems: "center"
  },

  icon_bottom_1_2_4: {
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 10,
    marginBottom: 5,

    height: 24,
    width: 24,
    resizeMode: "stretch",
    alignItems: "center"
  },
  // icon_bottom_3: {
  //   justifyContent: "center",
  //   marginLeft: "auto",
  //   marginRight: "auto",
  //   marginTop: 10,
  //   marginBottom: 8,

  //   height: 20,
  //   width: 35,
  //   resizeMode: "stretch",
  //   alignItems: "center"
  // },

  // icon_bottom_5: {
  //   justifyContent: "center",
  //   marginLeft: "auto",
  //   marginRight: "auto",
  //   marginTop: 10,
  //   marginBottom: 8,

  //   height: 20,
  //   width: 20,
  //   resizeMode: "stretch",
  //   alignItems: "center"
  // },
  navBar_out_l: {
    width: "25%",
    height: 60,
    backgroundColor: "#fff",
    borderTopColor: "#9d9d9d"
    //  opacity: 0.3,
    // borderTopLeftRadius: 10,
    // borderBottomLeftRadius: 10
  },

  navBar_out_r: {
    width: "25%",
    height: 60,
    backgroundColor: "#fff",
    borderTopColor: "#9d9d9d"
    // opacity: 0.3,
    // borderTopRightRadius: 10,
    // borderBottomRightRadius: 10
  },
  navBar_in: {
    width: "25%",
    height: 60,
    backgroundColor: "#fff",
    borderTopColor: "#9d9d9d"
    // opacity: 1,
    // position: 'relative'
  },

  rest: {
    width: "48%",
    height: 200,
    backgroundColor: "#fff",
    borderRadius: 7,
    margin: 8,
    shadowRadius: 1

    // opacity: 1,
    // position: 'relative'
  },

  navText: {
    justifyContent: "center",
    textAlign: "center",
    marginTop: 0,
    fontFamily: "Roboto",
    fontSize: 12,
    marginBottom: 8,

    color: "#9d9d9d",
    // position: 'absolute',
    fontWeight: "900"
  },
  Name: {
    justifyContent: "center",
    textAlign: "center",
    marginTop: 0,
    fontFamily: "Roboto",
    fontSize: 14,
    marginBottom: 8,

    color: "#000",
    // position: 'absolute',
    fontWeight: "900"
  }
});

export default SecondScreen;