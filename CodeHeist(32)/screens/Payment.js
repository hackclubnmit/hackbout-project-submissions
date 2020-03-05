import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  Linking,
  Dimensions,
  Image
} from "react-native";
import { Constants } from "expo";

export default class App extends Component {
  render() {
    return (
      <View>
        <View style={{ alignContent: "center", justifyContent: "center" }}>
          <Image
            style={{
              width: "50%",
              height: 100,
              top: screenHeight / 3,
              alignSelf: "center",
              alignContent: "center",
              justifyContent: "center"
            }}
            source={require("./Paytm.png")}
          />
        </View>

        <View style={styles.container}>
          <Button
            title="Pay Now"
            onPress={() => {
              Linking.openURL("https://p-y.tm/v-OAdvt");
            }}
          />
        </View>
      </View>
    );
  }
}

const screenHeight = Math.round(Dimensions.get("window").height);
const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    // justifyContent: 'center',
    top: screenHeight - 120,
    width: "100%",
    backgroundColor: "#ecf0f1"
  }
});
