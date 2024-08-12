import React from "react";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Modal,
  ModalHeader,
  ModalBody
} from "reactstrap";
import {
  ADD_SALES,
  UPDATE_FIELD_SALES,
  SALES_FORM_CLEAR,
  TOAST_SHOW
} from "../constants/actionTypes";
import { connect } from "react-redux";
import AxiosRequest from "../AxiosRequest";
import AddUserForm from "../components/AddUserForm";
import { reset } from "redux-form";
import { SALES_REGISTRATION_FORM } from "../utils/constant";
import MobileVerifyForm from "../components/MobileVerifyForm";

const mapStateToProps = state => ({ ...state.salesuser });
const mapDispatchToProps = dispatch => ({
  onSubmit: formData =>
    dispatch({ type: ADD_SALES, payload: AxiosRequest.Sales.add(formData) }),
  onChangeInput: (key, data) =>
    dispatch({
      type: UPDATE_FIELD_SALES,
      key,
      payload: AxiosRequest.Sales.fileUpload(data)
    }),
  onFromClear: () => dispatch(reset(SALES_REGISTRATION_FORM)),
  onClearSuccess: id => dispatch({ type: SALES_FORM_CLEAR }),
  ShowToast: message => dispatch({ type: TOAST_SHOW, message: message })
});
class SalesUserForm extends React.Component {
  state = {
    identityFile: [],
    addressFile: [],
    birthdayFile: [],
    mobileVerifyModel: false,
    mobilenumber: 0,
    mobileVerifyStatus: false
  };
  componentWillMount() {
    this.onPhoneNoVerify = this.onPhoneNoVerify.bind(this);
    this.toggleMobileVerifyModal = this.toggleMobileVerifyModal.bind(this);
    this.otpStatus = this.otpStatus.bind(this);
  }
  componentDidUpdate(nextProps, nextState) {
    if (this.props.userAddSuccess) {
      this.setState({
        identityFile: [],
        addressFile: [],
        birthdayFile: [],
        mobileVerifyStatus: false
      });
      this.props.onFromClear();
      this.props.onClearSuccess();
    }
  }

  toggleMobileVerifyModal() {
    this.setState(prevState => ({
      mobileVerifyModel: !prevState.mobileVerifyModel
    }));
  }

  onPhoneNoVerify = values => {
    this.setState({ mobilenumber: values });
    this.toggleMobileVerifyModal();
  };
  
  otpStatus = status => {
    this.toggleMobileVerifyModal();
    if (status) this.setState({ mobileVerifyStatus: status });
  };

  submit = values => {
    values.job_type = 0;
    values.id_proof = this.props.id_proof;
    values.add_proof = this.props.add_proof;
    values.birth_cer = this.props.birth_cer;
    if (this.state.mobileVerifyStatus) this.props.onSubmit(values);
    else this.props.ShowToast("Please verify the mobile number and try again");
  };

  handleOnDropIndentity = newImageFile => {
    //console.log("event---"+e);
    var data = new FormData();
    data.append("lic", newImageFile[0]);
    this.props.onChangeInput("id_proof", data);
    //IdentityLocation=AxiosRequest.Sales.fileUpload(data).payload.data.Location;
    this.setState({ identityFile: newImageFile });
  };
  handleOnDropAddress = newImageFile => {
    //console.log("event---"+e);
    var data = new FormData();
    data.append("lic", newImageFile[0]);
    this.props.onChangeInput("add_proof", data);
    this.setState({ addressFile: newImageFile });
  };
  handleOnDropBirth = newImageFile => {
    //console.log("event---"+e);
    var data = new FormData();
    data.append("lic", newImageFile[0]);
    this.props.onChangeInput("birth_cer", data);
    this.setState({ birthdayFile: newImageFile });
  };
  resetForm = () => {
    this.setState({ identityFile: [], addressFile: [], birthdayFile: [] });
    this.props.onFromClear();
  };

  

  render() {
    return (
      <div className="pd-8">
        <Row>
          <Col lg="12" md="12" sm="12" xs="12">
            <Card>
              <CardHeader>Sales User Add</CardHeader>
              <CardBody className="scrollbar pd-0">
                <AddUserForm
                  onSubmit={this.submit}
                  resetForm={this.resetForm}
                  handleOnDropIndentity={this.handleOnDropIndentity}
                  handleOnDropAddress={this.handleOnDropAddress}
                  handleOnDropBirth={this.handleOnDropBirth}
                  imageFile={this.state.identityFile}
                  addressFile={this.state.addressFile}
                  birthdayFile={this.state.birthdayFile}
                  onPhoneNoVerify={this.onPhoneNoVerify}
                  mobileVerifyStatus={this.state.mobileVerifyStatus}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Modal
          isOpen={this.state.mobileVerifyModel}
          toggle={this.toggleMobileVerifyModal}
          className={this.props.className}
          backdrop={"static"}
        >
          <ModalHeader toggle={this.toggleMobileVerifyModal}>
            OTP Verify
          </ModalHeader>
          <ModalBody>
            <MobileVerifyForm
              mobilenumber={this.state.mobilenumber}
              update={this.otpStatus}
              roleType={1}/>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SalesUserForm);
