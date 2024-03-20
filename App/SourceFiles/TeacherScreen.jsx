import React from 'react';
import { View, Text, Button, TouchableOpacity, Image, ImageBackground } from 'react-native';
import styles from '../SourceFiles/styles';


const TeacherScreen = ({ navigation }) => {

  const viewTimeTable = () => {


    const dummyTimeTable = [
      { day: 'Monday', subject: 'Science', time: '10:00 AM - 11:50 AM' },
      { day: 'Tuesday', subject: 'Physics', time: '11:00 AM - 11:50 AM' },
      { day: 'Wednesday', subject: 'Chemistry', time: '1:00 PM - 1:50 PM' },
      { day: 'Thursday', subject: 'Biology', time: '1:00 PM - 1:50 PM' },
      { day: 'Friday', subject: 'Computer Science', time: '2:00 PM - 5:00 PM' },
      // Add more entries as needed
    ];


    navigation.navigate('TimeTable', { timetableData: dummyTimeTable });

  };

  const viewStudentAttendance = () => {

    const dummyAttendanceData = [
      { rollNumber: '20ECE1031', date: '2024-01-20', status: 'Present' },
      { rollNumber: '20ECE1032', date: '2024-01-20', status: 'Absent' },
      { rollNumber: '20ECE1031', date: '2024-01-21', status: 'Present' },
      { rollNumber: '20ECE1032', date: '2024-01-21', status: 'Absent' },
      { rollNumber: '20ECE1032', date: '2024-01-22', status: 'Present' },
      { rollNumber: '20ECE1031', date: '2024-01-22', status: 'Absent' },

      // Add more entries as needed
    ];
    alert('View Student Attendance');

    // Navigate to the AttendanceScreen and pass the dummy attendance data
    navigation.navigate('Attendance', { attendanceData: dummyAttendanceData });

  };

  const takeAttendance = () => {
    // Placeholder for taking attendance functionality
    alert('Take Attendance');
   // navigation.navigate('CameraScreen');
  };

  const enrollStudent = () => {
    // Placeholder for enrolling a student functionality
    navigation.navigate('EnrollStudent');
    alert('Enroll Student');
  };

  return (

    <ImageBackground source={require('../assets/Background.png')} // Replace with the path to your background image
      style={styles.loginBackground}
      resizeMode="cover">

      <Image
        source={require('../assets/TeacherScreen.png')} // Replace with the path to your teacher illustration
        style={{
          ...styles.teacherIllustration,
          width: '90%', // Set the width to 25% of the container width
          height: undefined, // Let height be calculated automatically to maintain aspect ratio
          aspectRatio: 1, // Maintain the original aspect ratio of the image
        }}

        resizeMode="contain"
      />

      <TouchableOpacity style={styles.Homebutton} onPress={viewTimeTable}>
        <Text style={styles.buttonText}>Time Table</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.Homebutton} onPress={viewStudentAttendance}>
        <Text style={styles.buttonText}>Check Attendance</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.Homebutton} onPress={() => navigation.navigate('SnapAttendance')}>
        <Text style={styles.buttonText}>Snap Attendance</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.Homebutton} onPress={enrollStudent}>
        <Text style={styles.buttonText}>Enroll Student</Text>
      </TouchableOpacity>

      <Button
        title="Logout"
        onPress={() => navigation.navigate('Login')}
        style={styles.button}
      />
    </ImageBackground>

  );


};

export default TeacherScreen;