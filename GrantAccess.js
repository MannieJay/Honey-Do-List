import React from 'react';
import {
    AsyncStorage,
    Text,
    View,
    Button,
    TextInput,
} from 'react-native';

const axios = require('axios');
import SharedTodoList from './SharedToDoList';

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
        if (this.state.grantemail === '') {
            this.setState({ error: `No email entered.` });
            setTimeout(() => {
                this.setState({ error: '' });
            }, 2000);
            return;
        }
        const myToken = AsyncStorage.getItem('token');
        console.log('grantemail sending', this.state.grantemail)
        myToken
            .then(token => {
                if (token !== null) {
                    axios
                        .post(
                        'http://192.168.0.200:3000/user',
                        {
                            email: this.state.grantemail,
                        },
                        {
                            headers: {
                                authorization: token,
                            },
                        }
                        )
                        .then(() => {
                            this.props.navigation.navigate('SharedToDoList');
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
            })
            .catch(err => {
                console.log('On did Mount', err);
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
                    onChangeText={this.handleEmailChange}
                    value={this.state.text}
                    placeholder="Grant access to email"
                />
                <Button
                    onPress={() => this.grantUser(this.state.grantemail)}
                    title="Grant Access"
                />
            </View>
        );
    }
}
