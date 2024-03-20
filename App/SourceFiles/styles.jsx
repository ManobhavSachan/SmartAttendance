// styles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // ... Existing styles ...
  
    loginBackground: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
    },
  homescreentext:{
    fontSize: 24,
    marginBottom: 20,
    marginLeft:12,
    color:'#efeef3',
    fontWeight: 'bold',
    marginTop:160,
  },
  pseudo3DText: {
    fontSize: 60,
    color: '#9403fc', // White text color
   //fontWeight: 'bold',
    textShadowColor: '#000', // Dark shadow color
    textShadowOffset: { width: 1, height: 1 }, // Shadow offset
    textShadowRadius: 2, // Shadow blur radius
    marginBottom:80,
    marginTop:150,
    fontFamily:'AlegreyaSC-ExtraBold',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    //backgroundColor : '#c9d8f3',
    backgroundColor : '#fff',
  },
  ttcontainer: {
    flex : 1,
    alignItems: 'center',
    padding: 30,
    backgroundColor : '#fff',
  },
  ttheading: {
    fontSize: 34,
    color: '#9403fc',
    textAlignVertical:'center',
    fontFamily:'Namecat',
    marginBottom:90,
    marginTop:80,
  },
  ttbuttonText: {
    color: '#fff',
    fontSize: 24,
    //fontWeight: 'bold',
    fontFamily:'AlegreyaSC-Bold',
  },
  dayButton: {
    backgroundColor: '#9403fc', 
    padding: 18,
    borderRadius: 8,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  timetableHeading: {
    fontSize: 34,
    color: '#9403fc',
    textAlignVertical:'center',
    fontFamily:'Namecat',
    marginBottom:100,
    marginTop:50,
  },
  button: {
    backgroundColor: '#9403fc', 
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  Signbutton: {
    backgroundColor: '#9403fc', 
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    width: '50%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 22,
    //fontWeight: 'bold',
    fontFamily:'AlegreyaSC-Bold',
  },
  homeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    color: '#007bff', // Attendify blue color
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    color: 'crimson'
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
  // New styles for the Login page
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff', // Light gray background color
  },
  loginHeading: {
    fontSize: 25,
    marginBottom: 10,
    fontWeight: 'bold', // Bold font for heading
    color: '#333', // Dark gray text color
  },
  loginInput: {
    height: 40,
    width: '90%',
    borderColor: '#000',
    borderBottomWidth: 2,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 0, // Rounded corners
  },
  loginButton: {
    backgroundColor: 'blue', // Blue button color
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  Homebutton:{
    backgroundColor: '#7157d0', // Attendify blue color
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff', // White text color for button text
    fontSize: 16,
    fontWeight: 'bold',
  },

  signupButton: {
    backgroundColor: 'blue', // Google color
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  signupButtonText: {
    color: '#fff', // White text color for button text
    fontSize: 16,
    fontWeight: 'bold',
  },
  attendifyLogo: {
    fontSize: 60,
    //fontWeight: 'bold',
    marginBottom: 50,
    color: '#9403fc', 
    fontFamily: 'Espresso Show',
    textShadowColor: '#000', // Dark shadow color
    textShadowOffset: { width: 4, height: 4 }, // Shadow offset
    textShadowRadius: 14, // Shadow blur radius
    textTransform:'uppercase',
    textDecorationStyle:'solid',
  },

  signinwithgoogleButton: {
    backgroundColor: 'blue', // Google color
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },

  teacherIllustration: {
flex:0.7,
  },
});

export default styles;
