import React from 'react';
import { View, Text, Button, TouchableOpacity, Image,ImageBackground } from 'react-native';
import styles from '../SourceFiles/styles';

const StudentScreen = ({ navigation }) => {
    // ... Existing code for StudentScreen ...
  
  
    const checkAttendance = () => {
      // Placeholder for checking attendance functionality
      alert('Check Attendance');
      const dummyAttendanceData = [
        { rollNumber: '20ECE1031', date: '2024-01-20', status: 'Present' },
        { rollNumber: '20ECE1032', date: '2024-01-20', status: 'Absent' },
        { rollNumber: '20ECE1031', date: '2024-01-21', status: 'Present' },
        { rollNumber: '20ECE1032', date: '2024-01-21', status: 'Absent' },
        { rollNumber: '20ECE1032', date: '2024-01-22', status: 'Present' },
        { rollNumber: '20ECE1031', date: '2024-01-22', status: 'Absent' },
  
        // Add more entries as needed
      ];
      navigation.navigate('Attendance', { attendanceData: dummyAttendanceData });
    };
  
    const viewTimeTable = () => {
      // Placeholder for viewing time table functionality
      alert('View Time Table');
    };
  
    return (

      <ImageBackground source={require('../assets/Background.png')} // Replace with the path to your background image
      style={styles.loginBackground}
      resizeMode="cover">

    <Image
      source={require('../assets/studentScreen.png')} // Replace with the path to your teacher illustration
      style={{
        ...styles.teacherIllustration,
        width: '100%', // Set the width to 25% of the container width
        height: undefined, // Let height be calculated automatically to maintain aspect ratio
        aspectRatio: 1, // Maintain the original aspect ratio of the image
      }}

      resizeMode="contain"
    />
        <TouchableOpacity style={styles.Homebutton} onPress={checkAttendance}>
          <Text style={styles.buttonText}>Check Attendance</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.Homebutton} onPress={viewTimeTable}>
          <Text style={styles.buttonText}>Time Table</Text>
        </TouchableOpacity>


        <Button
          title="Logout"
          onPress={() => navigation.navigate('Login')}
          style={{ marginTop: 20 }}
        />
      </ImageBackground>
      
    );
  
  };

  export default StudentScreen;