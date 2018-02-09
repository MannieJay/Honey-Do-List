import React from 'react';
import {
  AsyncStorage,
  Text,
  View,
  FlatList,
  Button,
  TextInput,
  Image,
  TouchableOpacity
} from 'react-native';
const axios = require('axios');
import styles from './Styles';
import TodoList from './TodoList';

export default class SharedTodoList extends React.Component {
  state = {
    tasks: [],
    text: '',
    error: '',
  };

  componentDidMount() {
    const tasks = this.state.tasks;
    const myToken = AsyncStorage.getItem('token');
    myToken
      .then(token => {
        if (token !== null) {
          axios
            .get('https://honey-server.herokuapp.com/user', {
              headers: {
                Authorization: token,
              },
            })
            .then(response => {
              this.setState(prevState => {
                let { tasks } = prevState;
                return {
                  tasks: response.data.todos,
                };
              });
            })
            .catch(error => {
              console.log(error);
            });
        }
      })
      .catch(err => {
        console.log('On did Mount', err);
      });
  }

  handleTextChange = text => {
    this.setState({ text });
  };

  editTodo = index => {
    const myToken = AsyncStorage.getItem('token');
    const id = this.state.tasks[index]._id;
    console.log(id, index);
    myToken
      .then(token => {
        console.log('retrieved the token from "localStorage"');
        if (token !== null) {
          axios
            .put(
            `https://honey-server.herokuapp.com/todos/${id}`,
            {},
            {
              headers: {
                authorization: token,
              },
            }
            )
            .then(response => {
              console.log(response);
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

  addTodo = () => {
    if (this.state.text === '') {
      this.setState({ error: `No message in text field.` });
      setTimeout(() => {
        this.setState({ error: '' });
      }, 2000);
      return;
    }
    const myToken = AsyncStorage.getItem('token');
    myToken
      .then(token => {
        if (token !== null) {
          axios
            .post(
            'https://honey-server.herokuapp.com/todos',
            {
              text: this.state.text,
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

  deleteTask = index => {
    const myToken = AsyncStorage.getItem('token');
    const id = this.state.tasks[index]._id;
    myToken
      .then(token => {
        if (token !== null) {
          axios
            .delete(`https://honey-server.herokuapp.com/todos/${id}`, {
              headers: {
                authorization: token,
              },
            })
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
      <View style={{ flex: 1 }}>
        <Image
          source={require('./imgs/honeycomb1.jpg')}
          style={styles.backgroundImage}
        />
        <View style={styles.containerAll}>
          <Text style={styles.header}>
            {this.state.tasks.length > 0
              ? "Your Shared Honey Do List!"
              : "Your Shared Honey Do List is Empty!"}
          </Text>
          <View style={styles.containerLinkSharedList}>
            <TouchableOpacity onPress={() => {
              this.props.navigation.navigate('TodoList');
            }}>
              <Text style={styles.linkSwitchText}>SWITCH to personal list</Text>
            </TouchableOpacity>
            <Text>    </Text>
            <TouchableOpacity onPress={() => {
              this.props.navigation.navigate('TodoList');
            }}>
              <Text style={styles.linkGrantText}>Grant Access</Text>
            </TouchableOpacity>
          </View>
          {this.state.error !== '' ? <Text>{this.state.error}</Text> : null}
          <FlatList
            keyExtractor={item => item._id}
            style={styles.list}
            data={this.state.tasks}
            renderItem={({ item, index }) => {
              let setStatus = () => {
                if (this.state.tasks[index].completed === true) {
                  return 'Complete';
                } else {
                  return 'Incomplete';
                }
              };
              let setColor = () => {
                if (this.state.tasks[index].completed === true) {
                  return "green";
                } else {
                  return "orange";
                }
              };
              let status = setStatus();
              let color = setColor();
              let number = (index) => {
                let num = index + 1;
                return num + ". ";
              };
              return (
                <View>
                  <View style={styles.listCont}>
                    <View style={{ width: 20, height: 20 }} />
                    <Text style={styles.textItem}>{number(index)}{item.text}</Text>
                    <View style={styles.listButtons}>
                      <Button
                        color={color}
                        onPress={() => this.editTodo(index)}
                        title={status}
                      />
                      <Button
                        color="red"
                        onPress={() => this.deleteTask(index)}
                        title="Delete"
                      />
                    </View>
                  </View>
                </View>
              );
            }}
          />
          <TextInput
            style={styles.inputStyles}
            onSubmitEditing={this.addTodo}
            onChangeText={this.handleTextChange}
            value={this.state.text}
            placeholder="Add Task"
          />
        </View>
      </View>
    );
  }
}
