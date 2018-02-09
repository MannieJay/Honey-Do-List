import React from 'react';
import {
  AsyncStorage,
  Text,
  View,
  Button,
  TextInput,
} from 'react-native';

const axios = require('axios');
import TodoList from './TodoList';

import styles from './Styles';

export default class SignUp extends React.Component {
  state = {
    usernames: [],
    email: '',
    password: '',
    error: '',
  };

  componentDidMount() {
    console.log('is Mounted');
    const myToken = AsyncStorage.getItem('token')
      .then(response => {
        console.log('Token', response);
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentWillUnmount() {
    console.log('is Un Mounted');
    const usernames = this.state.usernames.slice();
    AsyncStorage.setItem('usernames', JSON.stringify(usernames));
  }

  handleEmailChange = email => {
    this.setState({ email });
  };

  handlePasswordChange = password => {
    this.setState({ password });
  };

  createUser = () => {
    console.log('user created');
    console.log('email', this.state.email);
    console.log('pw', this.state.password);
    const newUser = {
      email: this.state.email,
      password: this.state.password,
    };
    axios
      .post('https://honey-server.herokuapp.com/users', newUser)
      .then(res => {
        const token = res.data.token;
        console.log(res.data.token);
        if (token) {
          AsyncStorage.setItem('token', token)
            .then(AsyncRes => {
              // route to Todos
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
      <View style={styles.containerSignUp}>
        <View>
          <Text style={styles.signupHeader}>Sign up to create a new account.</Text>
        </View>
        <Text style={styles.buttonText}>Email</Text>
        <TextInput
          style={styles.inputStyles}
          onSubmitEditing={this.addTodo}
          onChangeText={this.handleEmailChange}
          value={this.state.text}
          placeholder="Email"
        />
        <Text style={styles.buttonText}>Password</Text>
        <TextInput
          style={styles.inputStyles}
          onSubmitEditing={this.addTodo}
          onChangeText={this.handlePasswordChange}
          value={this.state.text}
          placeholder="Password"
        />
        <Button
          onPress={() => this.createUser(this.state.email, this.state.password)}
          title="Sign Up"
        />
      </View>
    );
  }
}
