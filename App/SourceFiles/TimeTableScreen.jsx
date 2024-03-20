// TimeTableScreen.js

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

const TimeTableScreen = ({ route }) => {
  const { timetableData = [] } = route.params;
  const navigation = useNavigation();
  const [selectedDay, setSelectedDay] = useState(null);
  const [filteredTimetable, setFilteredTimetable] = useState([]);

  const selectDay = (day) => {
    const filteredData = timetableData.filter((item) => item.day === day);
    setFilteredTimetable(filteredData);
    setSelectedDay(day);

    // Navigate to the new screen with selectedDay and filteredTimetable as parameters
    navigation.navigate('TimeTableDay', { selectedDay: day, filteredTimetable });
  };

  return (

    <ImageBackground source={require('../assets/Background.png')} // Replace with the path to your background image
      style={styles.loginBackground}
      resizeMode="cover">
      <Text style={styles.ttheading}>Select a Day</Text>
      <FlatList
        data={['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.dayButton,
              selectedDay === item && styles.selectedDayButton,
            ]}
            onPress={() => selectDay(item)}
          >
            <Text style={styles.ttbuttonText}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </ImageBackground>
  );
};

export default TimeTableScreen;
