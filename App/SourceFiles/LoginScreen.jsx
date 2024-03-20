import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ImageBackground } from 'react-native';
import styles from '../SourceFiles/styles';
import Icon from 'react-native-vector-icons/FontAwesome';


const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const validateLogin = () => {
    // Replace these with your actual credentials
    const correctUsername = 'Sir';
    const correctPassword = '1234';

    if (username === correctUsername && password === correctPassword) {
      setLoginError('Login successful..! Let us snap the attendance');
      navigation.navigate('Home');
    } else {
      setLoginError('Invalid username or password. Please try again.');
    }
  };

  // Function for handling Google signup
  const handleGoogleSignup = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // Handle signup with userInfo (e.g., send to your server for verification)
      alert(`Google Signup Successful:\n${JSON.stringify(userInfo, null, 2)}`);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // User cancelled the sign-in process
        console.log('Google Sign-in cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // Sign-in is in progress already
        console.log('Google Sign-in in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // Play services not available or outdated on the device
        console.log('Play services not available');
      } else {
        // Other errors
        console.error('Google Sign-in error:', error);
      }
    }
  };

  return (
<ImageBackground source={require('../assets/Background.png')} // Replace with the path to your background image
      style={styles.loginBackground}
      resizeMode="cover">
      <Text style={styles.attendifyLogo}>ATTENDIFY</Text>
      <Text style={styles.loginHeading}>Login</Text>
      <TextInput
        style={styles.loginInput}
        placeholder="Username"
        value={username}
        onChangeText={text => setUsername(text)}
      />

      <TextInput
        style={styles.loginInput}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <TouchableOpacity onPress={handleGoogleSignup}>
        <Text style={{ color: 'purple', fontWeight: '700', textAlign: 'left', marginRight: 210, marginBottom: 10, }}>Forgot Password?</Text>
      </TouchableOpacity>


      <TouchableOpacity style={styles.Signbutton} onPress={validateLogin}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', }}>
        <Text style={{ color: '#000', }}>New to the app? </Text>
        <TouchableOpacity onPress={handleGoogleSignup}>
          <Text style={{ color: 'purple', fontWeight: '700', }}>Register</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.errorText}>{loginError}</Text>


      <View style={styles.teacherIllustrationContainer}>
        <Image
          source={require('../assets/LoginScreen.png')} // Replace with the path to your teacher illustration
          style={{
            ...styles.teacherIllustration,
            width: '100%',
            aspectRatio: 1,
            position: 'absolute', //Here is the trick
            bottom: -275, //Here is the trick
          }}

          resizeMode="contain"
        />
      </View>
      </ImageBackground>

    
  );
};


export default LoginScreen;