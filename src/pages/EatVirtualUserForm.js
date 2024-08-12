import React from 'react';
import { EAT_ADD_USER, EAT_UPDATE_FIELD, EAT_FORM_CLEAR, EAT_DELETE_USER } from '../constants/actionTypes'
import { connect } from 'react-redux'
import AxiosRequest from '../AxiosRequest';
import AddVirtualForm from '../components/AddVirtualForm';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
} from 'reactstrap';
import {reset} from 'redux-form';
import { EAT_REGISTRATION_FORM } from '../utils/constant';
const mapStateToProps = state => ({ ...state.eatvirtualuser });


const mapDispatchToProps = dispatch => ({
  onSubmit: (formData) =>
    dispatch({ type: EAT_ADD_USER,payload:AxiosRequest.Eat.virtualUserAdd(formData)}),
  onChangeInput: (keyV, value) =>
    dispatch({ type: EAT_UPDATE_FIELD, key: keyV, value }),
  onFromClear: () =>
  dispatch(reset(EAT_REGISTRATION_FORM)),
  onClearSuccess: () =>
    dispatch({ type: EAT_FORM_CLEAR }),
  onDelete: (id) =>
    dispatch({ type: EAT_DELETE_USER, index: id }),
});
class EatVirtualUserForm extends React.Component {
  componentWillMount() {
    // var formData = {
    //   name: name,
    //   phoneno: phonenumber,
    //   email: emailid,
    //   password: password,
    //   address:address,
    //   virutal: 1
    // }
  }
  componentDidUpdate(nextProps, nextState) {
    if(this.props.userAddSuccess){
      this.props.onFromClear();
      this.props.onClearSuccess();
    }
  }

  submit = values => {
    values.virtualkey=1;
    values.regionid=1;
    this.props.onSubmit(values);
    
  }

  render() {
    return (
      <div className="pd-8">
        <Row>
          <Col lg="12" md="12" sm="12" xs="12">
            <Card>
              <CardHeader>ADD EAT VIRTUAL USER
              </CardHeader>
              <CardBody>
                <AddVirtualForm onSubmit={this.submit} />
              </CardBody>
            </Card>
          </Col>
        </Row>

      </div>
    );
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EatVirtualUserForm);