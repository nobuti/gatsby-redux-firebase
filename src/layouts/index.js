import React, { Component } from 'react';
import Link from 'gatsby-link';
import { connect } from 'react-redux';
import * as firebase from 'firebase';

class Template extends Component {
  componentDidMount() {
    const { history, clearUser, loggedIn } = this.props;
    firebase.auth().onAuthStateChanged(authUser => {
      if (authUser) {
        loggedIn(authUser);
      } else {
        history.push('/login');
      }
    });
  }

  render() {
    const { location, children } = this.props;
    let header;

    let rootPath = `/`;
    if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
      rootPath = __PATH_PREFIX__ + `/`;
    }

    header = (
      <h1>
        <Link to={'/'}>Product Blog</Link>
      </h1>
    );

    return (
      <div>
        {header}
        {children()}
      </div>
    );
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    loggedIn: user =>
      dispatch({
        type: 'USER_LOGGED_IN',
        user
      })
  };
};

export default connect(null, mapDispatchToProps)(Template);
