// MailScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';

const MailScreen = () => {
  const [toEmail, setToEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const sendEmail = () => {
    // Placeholder logic for sending email
    const emailContent = {
      toEmail,
      subject,
      body,
    };

    // Display an alert with the email content (for demonstration purposes)
    Alert.alert('Email Content', JSON.stringify(emailContent, null, 2));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Compose Email</Text>
      <TextInput
        style={styles.input}
        placeholder="To Email"
        value={toEmail}
        onChangeText={(text) => setToEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Subject"
        value={subject}
        onChangeText={(text) => setSubject(text)}
      />
      <TextInput
        style={[styles.input, styles.bodyInput]}
        placeholder="Body"
        value={body}
        onChangeText={(text) => setBody(text)}
        multiline
      />
      <Button title="Send Email" onPress={sendEmail} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
  bodyInput: {
    height: 100,
  },
});

export default MailScreen;
