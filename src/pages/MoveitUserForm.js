import React from "react";
import AxiosRequest from "../AxiosRequest";
import AddMoveitUserForm from "../components/AddMoveitUserForm";
import {
  MOVEIT_ADD_USER,
  MOVEIT_UPDATE_FIELD,
  MOVEIT_FORM_CLEAR,
  MOVEIT_CLEAR_IMAGE_FIELD,
  TOAST_SHOW
} from "../constants/actionTypes";
import { connect } from "react-redux";
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
import { reset } from "redux-form";
import { MOVEIT_REGISTRATION_FORM } from "../utils/constant";
import MobileVerifyForm from "../components/MobileVerifyForm";

const mapStateToProps = state => ({ ...state.moveituser });

const mapDispatchToProps = dispatch => ({
  onSubmit: formData =>
    dispatch({
      type: MOVEIT_ADD_USER,
      local: formData,
      payload: AxiosRequest.Moveit.userAdd(formData)
    }),
  onChangeInput: (key, data) =>
    dispatch({
      type: MOVEIT_UPDATE_FIELD,
      key,
      payload: AxiosRequest.Moveit.fileUpload(data)
    }),
  onFromClear: () => dispatch(reset(MOVEIT_REGISTRATION_FORM)),
  onClearImage: () => dispatch({ type: MOVEIT_CLEAR_IMAGE_FIELD }),
  onClearSuccess: () => dispatch({ type: MOVEIT_FORM_CLEAR }),
  ShowToast: message => dispatch({ type: TOAST_SHOW, message: message })
});
class MoveitUserForm extends React.Component {
  state = {
    driverLicenceFile: [],
    vehicleInsuranceFile: [],
    rcBookFile: [],
    photoFile: [],
    legalDocumentFile: [],
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
      this.props.onFromClear();
      this.props.onClearSuccess();
      this.setState({
        driverLicenceFile: [],
        vehicleInsuranceFile: [],
        rcBookFile: [],
        photoFile: [],
        legalDocumentFile: [],
        mobileVerifyStatus: false
      });
      this.props.onClearImage();
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

  submit = value => {
    value.job_type = 0;
    var initData = {
      name: value.name,
      email: value.email,
      phoneno: value.phoneno,
      password: value.password,
      address: value.address,

      driver_lic: this.props.driver_lic
      // vech_insurance: this.props.vech_insurance,
      // vech_rcbook: this.props.vech_rcbook,
      // photo: this.props.photo,
      // legal_document: this.props.legal_document,
    };
    
    if (this.props.vech_insurance)
      initData.vech_insurance = this.props.vech_insurance;
    if (this.props.vech_rcbook)
      initData.vech_rcbook = this.props.vech_rcbook;
    if (this.props.photo) 
      initData.photo = this.props.photo;
    if (this.props.legal_document)
      initData.legal_document = this.props.legal_document;

    if (this.state.mobileVerifyStatus) this.props.onSubmit(initData);
    else this.props.ShowToast("Please verify the mobile number and try again");
  };
  //state = { driverLicenceFile: [] ,vehicleInsuranceFile:[],rcBookFile:[]};
  handleDriverLicence = newImageFile => {
    var data = new FormData();
    data.append("lic", newImageFile[0]);
    this.props.onChangeInput("driver_lic", data);
    this.setState({ driverLicenceFile: newImageFile });
  };
  handleVehicleInsurance = newImageFile => {
    var data = new FormData();
    data.append("lic", newImageFile[0]);
    this.props.onChangeInput("vech_insurance", data);
    this.setState({ vehicleInsuranceFile: newImageFile });
  };
  handleVechicleRcbook = newImageFile => {
    var data = new FormData();
    data.append("lic", newImageFile[0]);
    this.props.onChangeInput("vech_rcbook", data);
    this.setState({ rcBookFile: newImageFile });
  };

  handlePhoto = newImageFile => {
    var data = new FormData();
    data.append("lic", newImageFile[0]);
    this.props.onChangeInput("photo", data);
    this.setState({ photoFile: newImageFile });
  };
  handleLegalDocument = newImageFile => {
    var data = new FormData();
    data.append("lic", newImageFile[0]);
    this.props.onChangeInput("legal_document", data);
    this.setState({ legalDocumentFile: newImageFile });
  };

  resetForm = () => {
    this.setState({
      driverLicenceFile: [],
      vehicleInsuranceFile: [],
      rcBookFile: [],
      photoFile: [],
      legalDocumentFile: []
    });
    this.props.onFromClear();
    this.props.onClearImage();
  };

  render() {
    return (
      <div className="pd-8">
        <Row>
          <Col lg="12" md="12" sm="12" xs="12">
            <Card>
              <CardHeader>ADD MOVEIT USER</CardHeader>
              <CardBody className="scrollbar pd-0">
                <AddMoveitUserForm
                  onSubmit={this.submit}
                  resetForm={this.resetForm}
                  handleDriverLicence={this.handleDriverLicence}
                  handleVehicleInsurance={this.handleVehicleInsurance}
                  handleVechicleRcbook={this.handleVechicleRcbook}
                  handlePhoto={this.handlePhoto}
                  handleLegalDocument={this.handleLegalDocument}
                  driverLicenceFile={this.state.driverLicenceFile}
                  vehicleInsuranceFile={this.state.vehicleInsuranceFile}
                  rcBookFile={this.state.rcBookFile}
                  photoFile={this.state.photoFile}
                  legalDocumentFile={this.state.legalDocumentFile}
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
              roleType={2}
            />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoveitUserForm);
