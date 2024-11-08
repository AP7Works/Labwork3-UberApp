import { StyleSheet, Text, View, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import React from 'react';
import tw from 'tailwind-react-native-classnames';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from 'react-redux';
import { setDestination } from '../slices/navSlice';
import { useNavigation } from '@react-navigation/native';
import NavFavourites from './NavFavourites';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';

const NavigateCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
    >
      <SafeAreaView style={tw`bg-white flex-1 pb-10`}>
        <Text style={tw`text-center py-5 text-xl`}>Good Morning, Anna!</Text>
        <View style={tw`border-t border-gray-200 flex-shrink`}>
          <View>
            <GooglePlacesAutocomplete 
              placeholder="Where to?" 
              styles={{ ...toInputBoxStyles, container: { ...toInputBoxStyles.container, marginTop: -20 } }}
              fetchDetails={true}
              returnKeyType={"search"}
              minLength={2}
              onPress={(data, details = null) => {
                dispatch(
                  setDestination({
                    location: details.geometry.location,
                    description: data.description,
                  })
                );
                navigation.navigate('RideOptionsCard');
              }}
              enablePoweredByContainer={false}
              query={{
                key: GOOGLE_MAPS_APIKEY,
                language: "en",
              }}
              nearbyPlacesAPI="GooglePlacesSearch"
              debounce={400}
            />
          </View>
          <NavFavourites />
        </View>
        <View style={tw`flex-row bg-white justify-evenly mt-auto border-t border-gray-100`}>
          <TouchableOpacity 
            onPress={() => navigation.navigate("RideOptionsCard")}
            style={tw`flex flex-row bg-black w-24 px-4 py-3 rounded-full items-center justify-center`}
          >
            <Icon name="car" type="font-awesome" color="white" size={16} />
            <Text style={tw`text-white text-center ml-2`}>Rides</Text>
          </TouchableOpacity>
          <TouchableOpacity style={tw`flex flex-row bg-gray-300 w-24 px-4 py-3 rounded-full items-center justify-center`}>
            <Icon name="fast-food-outline" type="ionicon" color="black" size={16} />
            <Text style={tw`text-center ml-2`}>Eats</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default NavigateCard;

const toInputBoxStyles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: 20,
    flex: 0,
  },
  textInput: {
    backgroundColor: "#DDDDDF",
    borderRadius: 0,
    fontSize: 16,
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
});
