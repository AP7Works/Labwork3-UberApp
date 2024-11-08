import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import auth0 from '../config/auth0Config';  // Correct import path
import { useNavigation } from '@react-navigation/native';  // Importing navigation hook

const AuthScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const navigation = useNavigation();  // Using navigation hook to navigate between screens

  const handleAuth = async () => {
    try {
      if (isSignUp) {
        // Sign-up with Auth0 using the connection parameter
        const credentials = await auth0.auth.createUser({
          email,
          password,
          connection: 'Username-Password-Authentication',  // Add the connection parameter for sign-up
        });
        console.log('User created successfully:', credentials);

        // After successful sign-up, switch to Sign In screen
        setIsSignUp(false);  // This will switch the form to Sign In mode
        alert('Sign Up Successful! Please Sign In.');
      } else {
        // Sign-in with Auth0 using the connection parameter
        const credentials = await auth0.auth.passwordRealm({
          username: email,
          password,
          realm: 'Username-Password-Authentication',  // This should match your Auth0 connection name
          connection: 'Username-Password-Authentication',  // Add the connection parameter for sign-in
        });
        console.log('User logged in successfully:', credentials);

        // Redirect user to the Home screen after successful login
        navigation.navigate('HomeScreen');  // This will navigate to the HomeScreen
      }
    } catch (error) {
      console.error("Error with authentication", error);
      alert('Authentication failed. Please try again.');
    }
  };

  return (
    <SafeAreaView style={[tw`bg-white`, { flex: 1 }]}>
      <View style={tw`p-5`}>
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
        <Text style={styles.title}>{isSignUp ? 'Sign Up' : 'Sign In'}</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleAuth}>
          <Text style={styles.buttonText}>{isSignUp ? 'Sign Up' : 'Sign In'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
          <Text style={styles.switchText}>
            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 20,
  },
  input: {
    height: 40,
    borderColor: '#dcdcdc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    backgroundColor: '#f0f0f0',
    color: '#5d5d5d',
  },
  button: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  switchText: {
    color: '#5d5d5d',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
});

export default AuthScreen;
