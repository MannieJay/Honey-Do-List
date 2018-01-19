import React, { Component } from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  TextInput,
  TouchableOpacity,
  Form,
  Image
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import SignUp from './SignUp';
import styles from './Styles';
import TodoList from './TodoList';

const axios = require('axios');

class Home extends Component {
  state = {
    usernames: [],
    email: '',
    password: '',
    error: '',
  };

  componentDidMount() {
    const myToken = AsyncStorage.getItem('token')
      .then(response => {
        console.log('Token', response);
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentWillUnmount() {
    const usernames = this.state.usernames.slice();
    AsyncStorage.setItem('usernames', JSON.stringify(usernames));
  }

  handleEmailChange = email => {
    this.setState({ email });
  };

  handlePasswordChange = password => {
    this.setState({ password });
  };

  signinUser = () => {
    const newUser = {
      email: this.state.email,
      password: this.state.password,
    };
    axios
      .post('https://honey-server.herokuapp.com/signin', newUser)
      .then(res => {
        const token = res.data.token;
        if (token) {
          AsyncStorage.setItem('token', token)
            .then(AsyncRes => {
              this.props.navigation.navigate('TodoList');
            })
            .catch(err => {
              throw new Error(err);
            });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Image
          source={require('./imgs/honeydew.jpg')}
          style={styles.backgroundImage}
        />
        <View style={styles.headerImage}>
          <Image style={{
            flex: 1,
            alignSelf: 'stretch',
          }} source={require('./imgs/logo.png')} />
        </View>
        <View style={styles.containerAll}>
          {/* <View style={styles.container}> */}
          <View style={{ width: 50, height: 50 }} />
          <Text style={styles.buttonText}>Email</Text>
          <TextInput
            style={styles.inputStyles}
            onSubmitEditing={this.signinUser}
            onChangeText={this.handleEmailChange}
            value={this.state.text}
            placeholder="Email"
          />
          <Text style={styles.buttonText}>Password</Text>
          <TextInput
            style={styles.inputStyles}
            onSubmitEditing={this.signinUser}
            onChangeText={this.handlePasswordChange}
            value={this.state.text}
            placeholder="Password"
          />
          <Button
            onPress={() => this.signinUser(this.state.email, this.state.password)}
            title="Sign In"
          />
          <View style={{ width: 20, height: 20 }} />
          <TouchableOpacity onPress={() => {
            this.props.navigation.navigate('SignUp');
          }}>
            <Text style={styles.linkText}>Create a new account</Text>
          </TouchableOpacity>
        </View>
      </View>
      // </View>
    );
  }
}

const Routes = StackNavigator({
  Home: { screen: Home },
  TodoList: { screen: TodoList },
  SignUp: { screen: SignUp },
});

export default Routes;
