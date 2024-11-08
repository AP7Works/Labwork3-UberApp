import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import React, { useEffect } from "react";
import tw from 'tailwind-react-native-classnames';
import NavOptions from "../components/NavOptions";
import NavFavourites from "../components/NavFavourites";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { Platform } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { setDestination, setOrigin } from "../slices/navSlice"; 

const HomeScreen = () => {
  const dispatch = useDispatch();
  
  // Optionally, get the user's information from Redux if available
  const user = useSelector(state => state.user);  // Assuming you have a user slice in Redux

  useEffect(() => {
    // Additional logic on component mount (e.g., check user state)
    if (user) {
      console.log('User is logged in:', user);
    }
  }, [user]);

  return (
    <SafeAreaView style={[tw`bg-white`, { flex: 1 }]}>
      <View style={tw `p-5`}>
        <Image
          style={{
            width: 100, 
            height: 100, 
            resizeMode: "contain",
          }}
          source={{
            uri: "https://links.papareact.com/gzs",
          }}
        />
        
     
        {user && (
          <Text style={tw`text-xl font-bold`}>
            Welcome, {user.name || "User"}!
          </Text>
        )}

        <GooglePlacesAutocomplete
          placeholder="Where From?"
          styles={{
            container: {
              flex: 0,
              zIndex: 1,
            },
            textInputContainer: {
              backgroundColor: '#f0f0f0',
              borderRadius: 5,
              padding: 5,
              borderWidth: 2,
              borderColor: '#dcdcdc',
            },
            textInput: {
              height: 40,
              color: '#5d5d5d',
              fontSize: 18,
              fontWeight: 'normal',
            },
          }}
          onPress={(data, details = null) => {
            if (details && details.geometry && details.geometry.location) {
              dispatch(setOrigin({
                location: details.geometry.location, 
                description: data.description
              }));
              dispatch(setDestination(null));
            } else {
              console.warn("Location details not available"); // Logs a warning if details are missing
            }
          }}
          fetchDetails={true}
          returnKeyType={"search"}
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
          enablePoweredByContainer={false}
          minLength={2}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: 'en',
          }}
          {...(Platform.OS === 'web' && {
            requestUrl: {
              useOnPlatform: 'all',
              url: 'https://maps.googleapis.com/maps/api/js',
            },
          })}
        />

        <NavOptions />
        <NavFavourites />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
