// EnrollStudentScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import styles from '../SourceFiles/styles';

const EnrollStudentScreen = ({ navigation }) => {
  const [rollNumber, setRollNumber] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const enrollStudent = () => {
    // ... Existing code for enrolling a student functionality ...
    const enrolledStudentDetails = {
        rollNumber,
        name,
        email,
      };
  
      alert(`Enrolled Student Details:\n${JSON.stringify(enrolledStudentDetails, null, 2)}`);
  
      // Optionally, you can navigate back to the TeacherScreen or any other screen
      navigation.goBack();
    };
  
    return (


      <ImageBackground source={require('../assets/Background.png')} // Replace with the path to your background image
      style={styles.loginBackground}
      resizeMode="cover">

        <Text style={styles.ttheading}>Enroll Student</Text>
        <TextInput
          style={styles.loginInput}
          placeholder="Roll Number"
          value={rollNumber}
          onChangeText={(text) => setRollNumber(text)}
        />
        <TextInput
          style={styles.loginInput}
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={styles.loginInput}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
        />
        <TouchableOpacity style={styles.Homebutton} onPress={enrollStudent}>
          <Text style={styles.buttonText}>Enroll Student</Text>
        </TouchableOpacity>

      </ImageBackground>
      
    );
};

export default EnrollStudentScreen;
