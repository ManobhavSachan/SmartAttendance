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
      // aspect: [4, 3],
      quality: 1,
    });
    console.log(result.assets[0].uri);
    // setImage(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      
      convertToBlob(result.assets[0]);

      // const blob = await result.assets[0].uri.blob();
      setUploadImage(result);
      setAnnotatedImage(null);
    }
    // console.log(image);
  };
  const convertToBlob = (image) => {
    fetch(image.uri)
      .then(response => response.blob())
      .then(blob => {
        // 'blob' contains the image in Blob format
        // Use 'blob' for further processing (e.g., sending via Axios or other uses)
        setUploadImage(blob);
      })
      .catch(error => {
        console.error('Error converting image to blob:', error);
      });
  };
  const processImage = async () => {
    if (image) {
      let formData = new FormData();
      const match = new RegExp(/image\/(\w+)\b/).exec(image);
      // console.log('Match === ', match[1]);
      // formData.append('image', {
      //   uri: image,
      //   type: match[0],
      //   name: `image.${match[1]}`,
      // });
      console.log(uploadImage);
      formData.append('image', uploadImage);
      formData.append('upscaling', upscaling);
      formData.append('threshold', threshold);
      // console.log('working');
      console.log(formData.image);
      // console.log('working');
      
      
      // fetchData();


      try {

          const response = await axios.post('http://127.0.0.1:5000/annotate_image', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            // responseType: 'arraybuffer', // Ensure correct response type for binary data
          });
          // const base64String = Buffer.from(response.data, 'binary').toString('base64');
    // console.log(base64String);
        // console.log("response = ", response);
        // const data = await response.json();
          console.log(JSON.stringify(response.data));
        // const blob = new Blob([response.data], { type: 'image/png' });
        // console.log(blob);
        // const uri = URL.createObjectURL(response.data);
        // const base64 = `data:image/png;base64,${arrayBufferToBase64(response.data)}`;       
        // // console.log(uri);
        // console.log(base64);
        // setAnnotatedImage( {uri : base64} );
        console.log({uri: annotatedImage});
        setAnnotatedImage(`data:image/jpeg;base64,${response.data.image}`);
        // setAnnotatedImage({ uri: `data:image/png;base64,${response.data.image}` });
      } catch (error) {
        console.error('Error processing image:', JSON.stringify(error));
      }
    }
    else console.log('No image selected');
  };

  const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    console.log(bytes);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    console.log((binary));
    return btoa(binary);
  };
  const fetchData = async () => {
    try {
      const response = await axios.get('https://any-anime.p.rapidapi.com/v1/anime/gif/1', {
        headers: {
          'X-RapidAPI-Key': '05685095e9mshb620c5b10f74fb4p173370jsnbcd9556cf0be',
          'X-RapidAPI-Host': 'any-anime.p.rapidapi.com'
        }
      });
      console.log(response.data);
      setAnnotatedImage({ uri: response.data.images[0] });
      console.log(annotatedImage);
    } catch (error) {
      console.error(error);
    }
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
      {annotatedImage && <Image source={{uri : annotatedImage}} style={styles.image} />}
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
