import React from 'react';
import { MAKEIT_ADD_USER, MAKEIT_DELETE_USER, MAKEIT_FORM_CLEAR, MAKEIT_ZONE_AREA } from '../constants/actionTypes'
import { connect } from 'react-redux'
import AxiosRequest from '../AxiosRequest';
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
} from 'reactstrap';
import { reset } from 'redux-form';
import AddMakeitVirtualForm from '../components/AddMakeitVirtualForm';
import { MAKEIT_REGISTRATION_FORM } from '../utils/constant';

const mapStateToProps = state => ({ ...state.makeituser });

const mapDispatchToProps = dispatch => ({
  onSubmit: (formData) =>
    dispatch({ type: MAKEIT_ADD_USER,payload: AxiosRequest.Makeit.virtualUserAdd(formData) }),
  onFromClear: () =>
    dispatch(reset(MAKEIT_REGISTRATION_FORM)),
  onClearSuccess: () =>
    dispatch({ type: MAKEIT_FORM_CLEAR }),
  onDelete: (id) =>
    dispatch({ type: MAKEIT_DELETE_USER, index: id }),
    onGetZone: data =>
    dispatch({
      type: MAKEIT_ZONE_AREA,
      payload: AxiosRequest.Zone.getAllZone(data)
    }),
});
class MakeitUserForm extends React.Component {
  componentWillMount() {
    this.props.onGetZone({ boundaries: 1 });
  }
  componentDidUpdate(nextProps, nextState) {
    if (this.props.userAddSuccess) {
      this.props.onClearSuccess();
      this.props.onFromClear();
    }
  }

  submit = values => {
    values.virtualkey = 1;
    values.appointment_status = 3;
    values.verified_status = "0";
    this.props.onSubmit(values);

  }

  render() {
    return (
      <div className="pd-8">
        <Row>
          <Col lg="12" md="12" sm="12" xs="12">
            <Card>
              <CardHeader>ADD MAKEIT VIRTUAL USER
              </CardHeader>
              <CardBody>
                <AddMakeitVirtualForm onSubmit={this.submit} ZoneData={this.props.ZoneData}/>
              </CardBody>
            </Card>
          </Col>
        </Row>

      </div>
    );
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(MakeitUserForm);