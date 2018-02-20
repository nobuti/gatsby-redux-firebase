import React, { Component } from 'react';
import * as firebase from 'firebase';
import { connect } from 'react-redux';

const provider = new firebase.auth.GithubAuthProvider();

class Login extends Component {
  logIn() {
    const { history } = this.props;
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => history.push('/'))
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return <button onClick={e => this.logIn()}>Login with GitHub</button>;
  }
}

export default Login;
