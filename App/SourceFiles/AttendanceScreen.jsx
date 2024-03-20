import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList,ImageBackground } from 'react-native';
import styles from '../SourceFiles/styles';

const AttendanceScreen = ({ route }) => {
    const { attendanceData } = route.params;
    const [searchRollNumber, setSearchRollNumber] = useState('');
    const [filteredAttendance, setFilteredAttendance] = useState([]);
    const [attendancePercentage, setAttendancePercentage] = useState(null);
  
    const searchAttendance = () => {
      // Filter attendance data based on the entered roll number
      const filteredData = attendanceData.filter(
        (item) => item.rollNumber === searchRollNumber
      );
      setFilteredAttendance(filteredData);
  
      // Calculate attendance percentage for the roll number
      const totalDays = attendanceData.length;
      const presentDays = filteredData.filter((item) => item.status === 'Present').length;
      const percentage = (presentDays / totalDays) * 100;
      setAttendancePercentage(percentage.toFixed(2));
    };
  
    return (


      <ImageBackground source={require('../assets/Background.png')} // Replace with the path to your background image
      style={styles.loginBackground}
      resizeMode="cover">

        <Text style={styles.ttheading}>Attendance Overview</Text>
        <TextInput
          style={styles.loginInput}
          placeholder="Enter Roll Number"
          value={searchRollNumber}
          onChangeText={(text) => setSearchRollNumber(text)}
        />
        <TouchableOpacity style={styles.Homebutton} onPress={searchAttendance}>
          <Text style={styles.buttonText}>Search Attendance</Text>
        </TouchableOpacity>
        {filteredAttendance.length > 0 && (
          <FlatList
            data={filteredAttendance}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.attendanceItem}>
                <Text>{`Roll Number: ${item.rollNumber}`}</Text>
                <Text>{`Date: ${item.date}`}</Text>
                <Text>{`Status: ${item.status}`}</Text>
              </View>
            )}
          />
        )}
        {attendancePercentage !== null && (
          <Text style={styles.attendancePercentage}>{`Attendance Percentage: ${attendancePercentage}%`}</Text>
        )}
      
      </ImageBackground>
      
    );
};

export default AttendanceScreen;
