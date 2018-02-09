import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'cover',
  },
  headerImage: {
    position: 'absolute',
    flex: 1,
    top: 50,
    left: 10,
    right: 20,
  },
  list: {
    width: '100%',
  },
  textItem: {
    backgroundColor: 'rgba(215,219,118, 0.7)',
    paddingLeft: 12,
    paddingRight: 12,
    fontSize: 24,
  },
  inputStyles: {
    backgroundColor: 'rgba(255,249,178, 0.6)',
    borderWidth: 1,
    borderColor: 'black',
    paddingLeft: 10,
    width: '100%',
    height: 40,
    marginBottom: 15,
    color: 'black',
  },
  listCont: {
    justifyContent: 'space-between',
    width: '100%',
  },
  listButtons: {
    flexDirection: 'row',
    paddingRight: 12,
    paddingLeft: 12,
    justifyContent: 'space-between',
  },
  header: {
    marginTop: 50,
    marginBottom: 25,
    fontSize: 25,
    fontWeight: '500'
  },
  headerLarge: {
    fontSize: 40,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 12,
    paddingLeft: 12,
  },
  containerAll: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerSignUp: {
    flex: 1,
    backgroundColor: 'rgba(255,249,178, 0.5)',
    alignItems: 'center',
  },
  containerToDoBody: {
    flex: 1,
    backgroundColor: '#faebd7',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 12,
    paddingLeft: 12,
  },
  linkText: {
    color: 'blue',
    justifyContent: 'center',
    textDecorationLine: 'underline',
  },
  linkSwitchText: {
    fontSize: 25,
    fontWeight: '500',
    color: 'green',
    justifyContent: 'center',
    textDecorationLine: 'underline',
  },
  signupHeader: {
    marginTop: 50,
    fontSize: 25,
    padding: 80,
  }
});

export default styles;
