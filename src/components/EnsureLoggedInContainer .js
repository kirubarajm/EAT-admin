import React from 'react';
import { connect } from 'react-redux';
import { LOGOUT } from '../constants/actionTypes'
var isLoggedIn=false
const mapStateToProps = state => ({ ...state.common });
const mapDispatchToProps = dispatch => ({
  onLogout: () =>
    dispatch({ type: LOGOUT })
});
class EnsureLoggedInContainer extends React.Component {

    componentDidMount() {
      isLoggedIn = window.localStorage.getItem('jwt');
      if (!isLoggedIn) {
        this.props.onLogout();
      }
    }
  
    render() {
      if (isLoggedIn) {
        return (
          this.props.children
        )
      } else {
        return null
      }
    }
  }
  
  
  export default connect(mapStateToProps,mapDispatchToProps)(EnsureLoggedInContainer)