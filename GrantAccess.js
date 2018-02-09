import React from 'react';
import {
    AsyncStorage,
    Text,
    View,
    Button,
    TextInput,
} from 'react-native';

const axios = require('axios');
import TodoList from './SharedToDoList';

import styles from './Styles';

export default class Grant extends React.Component {
    state = {
        grantemail: '',
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

    handleEmailChange = grantemail => {
        this.setState({ grantemail });
    };

    grantUser = () => {
        console.log('email', this.state.grantemail);
        const grantUser = {
            grantemail: this.state.grantemail,
        };
        axios
            .post('https://honey-server.herokuapp.com/todo', grantUser)
            .then(res => {
                const token = res.data.token;
                console.log(res.data.token);
                if (token) {
                    AsyncStorage.setItem('token', token)
                        .then(AsyncRes => {
                            // route to Todos
                            this.props.navigation.navigate('SharedToDoList');
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
                    <Text style={styles.signupHeader}>Share your Honey Do List</Text>
                </View>
                <Text style={styles.buttonText}>Enter the person's email that you would like to share your list with</Text>
                <TextInput
                    style={styles.inputStyles}
                    onSubmitEditing={this.addTodo}
                    onChangeText={this.handleEmailGrant}
                    value={this.state.text}
                    placeholder="Grant access to email"
                />
                <Button
                    onPress={() => this.grantUser(this.state.grantemail)}
                    title="Grant"
                />
            </View>
        );
    }
}
