import React from "react";
import { StyleSheet, Text, View, } from "react-native";
import tw from "tailwind-react-native-classnames";
import Map from "../components/Map";
import NavigateCard from "../components/NavigateCard";
import RideOptionsCard from "../components/RideOptionsCard";
import { createStackNavigator } from "@react-navigation/stack";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";




const MapScreen = () => {
  const Stack = createStackNavigator();

  return (
    <View>
      <Text>Here will be Anna's Uber map stuff...</Text>

      <View style={tw`h-1/2`}>
      <Map />
      </View>

      <View style={tw`h-1/2`}>
        <Stack.Navigator>
          <Stack.Screen
            name="NavigateCard"
            component={NavigateCard}
            options= {{
              headerShown: false,
            }}
            />
             <Stack.Screen
            name="RideOptionsCard"
            component={RideOptionsCard}
            options= {{
              headerShown: false,
            }}
            />
        </Stack.Navigator>
      </View>
          </View>
  );
};

export default gestureHandlerRootHOC(MapScreen);

const styles = StyleSheet.create({});
