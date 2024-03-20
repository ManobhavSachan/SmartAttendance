import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Image } from 'react-native';
import styles from '../SourceFiles/styles';


const HomeScreen = ({ navigation }) => {
    // ... Existing code for HomeScreen ...
  
  return (

    <ImageBackground source={require('../assets/Background.png')} // Replace with the path to your background image
      style={styles.loginBackground}
      resizeMode="cover">

      <Text style={styles.pseudo3DText}>Welcome..!</Text>

      <TouchableOpacity style={styles.Homebutton} onPress={() => navigation.navigate('Teacher')}>
        <Text style={styles.buttonText}>TEACHER</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.Homebutton} onPress={() => navigation.navigate('Student')}>
        <Text style={styles.buttonText}>STUDENT</Text>
      </TouchableOpacity>

      <View style={styles.teacherIllustrationContainer}>
      <Image
      source={require('../assets/AttendanceIllustartion_1.png')} // Replace with the path to your teacher illustration
      style={{
        ...styles.teacherIllustration,
        width: '100%', // Set the width to 25% of the container width
        height: undefined, // Let height be calculated automatically to maintain aspect ratio
        aspectRatio: 1, // Maintain the original aspect ratio of the image
    
      }}

      resizeMode="contain"
    />
  </View>
      </ImageBackground>
    
  );
  
  };

  export default HomeScreen;