/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
  View  
} from 'react-native';

import { Dropdown } from 'react-native-material-dropdown';


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


const personIcon = require("./signup_person.png");
const emailIcon = require("./signup_email.png");
const genderIcon = require("./gender.png");


export default class App extends Component<{}> {

  constructor(props){
    super(props);
     this.state = {
      name: '',
      email: '',
      gender: 'male'
    }
  }

  render() {

    let data = [{
      value: 'Male',
    }, {
      value: 'Female',
    }];

    return (
     <View style={styles.container}>
        
          <View style={styles.headerContainer}>            

            <View style={styles.headerTitleView}>
              <Text style={styles.titleViewText}>Sign Up</Text>
            </View>

          </View>

          <View style={styles.inputsContainer}>

            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Image 
                  source={personIcon}
                  style={styles.inputIcon}
                  resizeMode="contain"
                />
              </View>
              <TextInput
                style={[styles.input, styles.whiteFont]}
                placeholder="Name"
                placeholderTextColor="#FFF"
                underlineColorAndroid='transparent' 
                onChangeText={(text) => this.setState({name:text})}
              />
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Image 
                  source={emailIcon} 
                  style={styles.inputIcon} 
                  resizeMode="contain"
                />
              </View>
              <TextInput
                style={[styles.input, styles.whiteFont]}
                placeholder="Email"
                placeholderTextColor="#FFF"
                underlineColorAndroid='transparent'
                onChangeText={(text) => this.setState({email:text})} 
              />
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.iconContainer}>
                <Image 
                  source={genderIcon} 
                  style={styles.inputIcon} 
                  resizeMode="contain"
                />
              </View>

              <Dropdown
                  containerStyle={styles.genderDropdown}
                  label='Gender'
                  textColor="#FFF"
                  baseColor="#FFF"
                  itemColor="#000"
                  selectedItemColor="#012"
                  data={data}
              />
            </View>
          

          <View style={styles.footerContainer}>

            <TouchableOpacity onPress={() => this.onPressButton()}>
              <View style={styles.signup}>
                <Text style={styles.whiteFont}>Sign Up</Text>
              </View>
            </TouchableOpacity>

          </View>      
      </View>
      </View>
    );
  }

  onPressButton(tag){

    const { name }  = this.state ;
    const { email }  = this.state ;
    const { gender }  = this.state ;

    if(name == '' || email == '')
    {
        alert("Please Enter All the Values.")
    }else{
        
    fetch('http://52.15.101.228/register', {  
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: this.state.name,
      email: this.state.email,
      gender: "0",
    })
    }).then(function(response){           
          alert("Server Call completed successfully!")  
          return response.json();   
    })
    }         
  }
}



const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  
  headerContainer: {
    flex: 1,
  },
  inputsContainer: {
    flex: 3,
    marginTop: 50,
  },
  footerContainer: {
    flex: 1,
    marginTop: 50
  },
  
  headerTitleView: {
    backgroundColor: 'transparent',
    marginTop: 25,
    marginLeft: 25,
  },
  titleViewText: {
    fontSize: 40,
    color: '#FFF',
  },
  inputs: {
    paddingVertical: 20,
  },
  inputContainer: {
    borderWidth: 1,
    borderBottomColor: '#CCC',
    borderColor: 'transparent',
    flexDirection: 'row',
    height: 75,
  },
  iconContainer: {
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputIcon: {
    width: 30,
    height: 30,
  },

  genderDropdown: {
    width: 270,
    height: 270,
  },

  input: {
    flex: 1,
    fontSize: 20,
  },
  signup: {
    backgroundColor: '#FF3366',
    paddingVertical: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  
  whiteFont: {
    color: '#FFF'
  }
});
