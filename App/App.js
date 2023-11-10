import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, StyleSheet, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const App = () => {
  const [image, setImage] = useState(null);
  const [uploadImage, setUploadImage] = useState(null); // [image, setImage
  const [annotatedImage, setAnnotatedImage] = useState(null);
  const [upscaling, setUpScaling] = useState('1');
  const [threshold, setThreshold] = useState('0.6');

  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    // console.log(result.assets[0].uri);
    // setImage(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      
     
      // const blob = await result.assets[0].uri.blob();
      setUploadImage(result);
      setAnnotatedImage(null);
    }
    // console.log(image);
  };

  const processImage = async () => {
    if (image) {
      let formData = new FormData();
      const match = new RegExp(/image\/(\w+)\b/).exec(image);
      // formData.append('image', {
      //   uri: image,
      //   type: `image/${match[1]}`,
      //   name: `image.${match[1]}`,
      // });
      formData.append('image', uploadImage);
      formData.append('upscaling', upscaling);
      formData.append('threshold', threshold);
      console.log(formData);
      try {
        const response = await axios.post('http://48ac-35-202-194-47.ngrok-free.app/annotate_image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log("response = ", response);

        setAnnotatedImage(response.data);
      } catch (error) {
        console.error('Error processing image:', error);
      }
    }
    else console.log('No image selected');
  };

  return (
    <View style={styles.container}>

      <Button title="Select Image" onPress={selectImage} />
      <Button title="Process Image" onPress={() => processImage()} />
      <TextInput
        style={styles.input}
        placeholder="Upscaling Factor"
        onChangeText={(text) => setUpScaling(text)}
        value={upscaling}
      />
      <TextInput
        style={styles.input}
        placeholder="Threshold Factor"
        onChangeText={(text) => setThreshold(text)}
        value={threshold}
      />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      {annotatedImage && <Image source={{ uri: `data:image/png;base64,${annotatedImage}` }} style={styles.image} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginVertical: 10,
    paddingLeft: 10,
  },
  image: {
    width: 300,
    height: 300,
    marginVertical: 20,
  },
});

export default App;
