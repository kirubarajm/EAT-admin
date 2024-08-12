import React from 'react';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
} from 'reactstrap';

import AxiosRequest from '../AxiosRequest';
import { connect } from 'react-redux';
import {
  UPDATE_FIELD_AUTH,
  LOGIN,
  LOGIN_PAGE_UNLOADED,
  HOME_REDIRECT
} from '../constants/actionTypes';

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onChangeEmail: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'email', value }),
  onChangePassword: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value }),
  // onSubmit: (email, login_type,makeithub_id,redirectToURL) =>
  //   dispatch({ type: LOGIN, payload:'Success',email,login_type,makeithub_id,redirectToURL}),
  onSubmit: (data) =>
  dispatch({ type: LOGIN,payload: AxiosRequest.Admin.login(data)}),
  onRedirect: (redirectTo) =>
  dispatch({ type: HOME_REDIRECT,redirectTo}),
  onUnload: () =>
    dispatch({ type: LOGIN_PAGE_UNLOADED }),
});

//let myColor = { background: '#314911', text: "#FFFFFF" };
class Signup extends React.Component {

  constructor() {
    super();
    // this.submitForm = (email, password) => ev => {
    //   ev.preventDefault();
    //   var login_type=0;
    //   var makeithub_id=0;
    //   if(email==='admin@tovogroup.com' && password==='tovo2020'){
    //     login_type=1;
    //     makeithub_id=1;
    //   }else if(email==='guindy@tovogroup.com' && password==='guindy2020'){
    //     login_type=2;
    //     makeithub_id=1;
    //   }else if(email==='omr@tovogroup.com' && password==='omr2020'){
    //     login_type=3;
    //     makeithub_id=2;
    //   }else if(email==='tnagar@tovogroup.com' && password==='tnagar2020'){
    //     login_type=4;
    //     makeithub_id=3;
    //   }else{
    //     login_type=0;
    //     notify.show('Sorry! invalid login credentials, Please Enter correct login',"custom", 3000,myColor);
    //   }
    //   if(login_type){
    //     let loginName=getLoginTypeName(login_type);
    //     let Url=login_type===1?'/':'makeit-vorders/'+loginName+'/'+login_type;
    //     this.props.onSubmit(email,login_type,makeithub_id,Url);
    //     notify.show('Login Success',"custom", 1000,myColor);
    //   }
      
    // };
    this.submitForm = (email, password) => ev => {
      ev.preventDefault();
      const push_token = window.localStorage.getItem("push_token");
      console.log("push_token-->"+push_token);
      this.props.onSubmit({email:email,password:password,push_token:push_token});
    };

    this.state = {
      isDisabled: true
    }
  }


  validateEmail(email) {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // const pattern = /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
    const result = pattern.test(email);
    if (result === true) {
      this.setState({
        emailError: false,
        email: email
      })
    } else {
      this.setState({
        emailError: true
      })
    }

    return result;
  }
  handleChange(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
    if (e.target.name === 'email' && this.validateEmail(e.target.value)) {
      this.props.onChangeEmail(e.target.value);
    }
    if (e.target.name === 'password') {
      if (e.target.value === '' || e.target.value === null) {
        this.setState({
          passwordError: true
        })
      } else {
        this.setState({
          passwordError: false,
          password: e.target.value
        })
        this.props.onChangePassword(e.target.value);
      }
    }
    if (this.state.emailError === false && this.state.passwordError === false) {
      this.setState({
        isDisabled: false
      })
    }

    
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  componentDidUpdate(nextProps, nextState) {
    if (this.props.loginsuccess&&this.props.isRedirect) {
      this.props.onRedirect('/')
    }
  }

  render() {
    const email = this.props.email;
    const password = this.props.password;
    return (
      <div className="pd-8 signup-bg" >
        <Row
          style={{
            height: '100vh',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Col md={6} lg={4}>
            <Card>
              <CardHeader>Login</CardHeader>
              <CardBody>
                <form id="signup-form" onSubmit={this.submitForm(email, password)}>
                  <div className="form-group">
                    <div className="form-label-group">
                      <input type="email"  name="email" className="form-control" placeholder="Enter your email" onChange={(e) => this.handleChange(e)} autoComplete="off"/>
                      {this.state.emailError ? <span style={{ color: "red" }}>Please Enter valid email address</span> : ''}
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="form-label-group">
                      <input type="password"  name="password" className="form-control" placeholder="Password" onChange={(e) => this.handleChange(e)} autoComplete="off"/>
                      {this.state.passwordError ? <span style={{ color: "red" }}>Please enter some value</span> : ''}
                    </div>
                  </div>
                  <button className="btn secondary" type="submit" disabled={this.state.isDisabled}>Signin</button>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Signup);