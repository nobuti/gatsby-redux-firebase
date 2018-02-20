import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import * as firebase from 'firebase';
import { connect } from 'react-redux';

const HOC = Base => {
  class WithAuthorization extends Component {
    render() {
      const { authUser } = this.props;
      return authUser ? <Base {...this.props} /> : null;
    }
  }

  const mapStateToProps = state => {
    return {
      authUser: state.authUser
    };
  };

  return connect(mapStateToProps)(WithAuthorization);
};

export default HOC;
