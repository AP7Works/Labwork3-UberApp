import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'tailwind-react-native-classnames'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Icon } from "react-native-elements";
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react';

const RideOptionsCard = () => {
  const [toggle, setToggle] = useState(false);
  const navigation = useNavigation();

  const handlePress = () => {
    console.log("Navigating to NavigateCard...");
    navigation.navigate("NavigateCard");
    setToggle(!toggle);  // Toggle state to force re-render if needed
  };

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View>
        <TouchableOpacity
          onPress={() => navigation.goBack()} 
          style={tw`absolute top-3 left-5 p-3 rounded-full`}
        >
          <Icon name="chevron-left" type="fontawesome" />
        </TouchableOpacity>
        <Text style={tw`text-center py-5 text-xl`}>Select a Ride</Text>
      </View>
    </SafeAreaView>
  );
};
export default RideOptionsCard

const styles = StyleSheet.create({});