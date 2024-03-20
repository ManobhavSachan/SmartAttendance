


import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import EnrollStudentScreen from '../App/SourceFiles/EnrollStudent';
import LoginScreen from '../App/SourceFiles/LoginScreen'
import AttendanceScreen from '../App/SourceFiles/AttendanceScreen';
import HomeScreen from '../App/SourceFiles/HomeScreen';
import TeacherScreen from '../App/SourceFiles/TeacherScreen';
import StudentScreen from '../App/SourceFiles/StudentScreen';
import TimeTableScreen from '../App/SourceFiles/TimeTableScreen';
import TimeTableDayScreen from '../App/SourceFiles/TimeTableDayScreen';
import MailScreen from '../App/SourceFiles/MailScreen';
import SnapAttendance from './SourceFiles/SnapAttendance';


const Stack = createStackNavigator();


const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Teacher" component={TeacherScreen} />
        <Stack.Screen name="Student" component={StudentScreen} />
        <Stack.Screen name="Attendance" component={AttendanceScreen} />
        <Stack.Screen name="EnrollStudent" component={EnrollStudentScreen} />
        <Stack.Screen name="TimeTable" component={TimeTableScreen} />
        <Stack.Screen name="TimeTableDay" component={TimeTableDayScreen} />
        <Stack.Screen name="Mail" component={MailScreen} />
        <Stack.Screen name="SnapAttendance" component={SnapAttendance} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;