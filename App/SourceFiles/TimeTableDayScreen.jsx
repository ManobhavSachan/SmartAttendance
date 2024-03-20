// TimetableDayScreen.js

import React from 'react';
import { View, Text, FlatList, ImageBackground } from 'react-native';
import styles from './styles';

const TimetableDayScreen = ({ route }) => {
  const { selectedDay, filteredTimetable } = route.params;

  return (
    <ImageBackground source={require('../assets/Background.png')} // Replace with the path to your background image
      style={styles.loginBackground}
      resizeMode="cover">
      <Text style={styles.timetableHeading}>{`${selectedDay}'s Time Table`}</Text>

      {filteredTimetable.length > 0 ? (
        <FlatList
          data={filteredTimetable}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.timetableItem}>
              <Text style={{fontFamily:'MontserratAlternates-Black',}}>{`Time: ${item.time}`}</Text>
              <Text style={{ color: '#000', fontFamily: 'Namecat', marginTop:10,textAlign:'center', }}>{`${item.subject}`}</Text>
            </View>
          )}
        />
      ) : (
        <Text>No timetable available for {selectedDay}.</Text>
      )}

    </ImageBackground>


  );
};

export default TimetableDayScreen;
