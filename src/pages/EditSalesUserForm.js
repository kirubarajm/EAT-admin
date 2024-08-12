import React from "react";
import { SALES_GET_DETAIL,ADD_SALES,UPDATE_FIELD_SALES,SALES_FORM_CLEAR,TOAST_SHOW,SALES_UPDATE_DETAIL} from "../constants/actionTypes";
import { connect } from "react-redux";
import AxiosRequest from "../AxiosRequest";
import { Field, reduxForm } from "redux-form";
import DropZoneField from "../components/dropzoneField";
import renderInputField from "../components/renderInputField";
import {
  required,
  maxLength60,
  minLength2,
  alphaNumeric,
  minLength5,
  imageIsRequired
} from "../utils/Validation";
import { Row, Col, Card, CardHeader, CardBody, Button } from "reactstrap";
import { reset } from "redux-form";
import { history } from "../store";
import { SALES_USER_EIDT_FORM } from "../utils/constant";

// const renderSelect = ({
//   input,
//   label,
//   type,
//   meta: { touched, error },
//   children
// }) => (
//   <div>
//     <label>
//       {label} <span className="must">*</span>
//     </label>
//     <div>
//       <select {...input}>{children}</select>
//       {touched && error && <span>{error}</span>}
//     </div>
//   </div>
// );

const mapStateToProps = state => ({ ...state.salesuser });
const mapDispatchToProps = dispatch => ({
  onGetUser: id =>
    dispatch({
      type: SALES_GET_DETAIL,
      payload: AxiosRequest.Sales.getsingle(id)
    }),
  onSubmit: formData =>
    dispatch({ type: ADD_SALES, payload: AxiosRequest.Sales.userUpdate(formData) }),
  onChangeInput: (key, data) =>
    dispatch({
      type: UPDATE_FIELD_SALES,
      key,
      payload: AxiosRequest.Sales.fileUpload(data)
    }),
  onProofImageLoad: (key, data) => dispatch({ type: SALES_UPDATE_DETAIL, key, data }),
  onFromClear: () => dispatch(reset(SALES_USER_EIDT_FORM)),
  onClearSuccess: id => dispatch({ type: SALES_FORM_CLEAR }),
  ShowToast: message => dispatch({ type: TOAST_SHOW, message: message })
});
var userid;
class EditSalesUserForm extends React.Component {
  state = {
    identityFile: [],
    addressFile: [],
    birthdayFile: []
  };
  componentWillMount() {
    userid = this.props.match.params.id;
    this.props.onGetUser(userid);
  }
  componentDidUpdate(nextProps, nextState) {
    if (this.props.userAddSuccess) {
      this.props.onFromClear();
      this.props.onClearSuccess();
      this.setState({ identityFile: [], addressFile: [], birthdayFile: [] });
      history.goBack();
    }
    if (this.props.userPrefillSuccess) {
      this.props.onClearSuccess();
      var userData = this.props.viewsalesuser;
      var initData = {
        id: userData.id,

        name: userData.name,
        address: userData.address,

        add_proof: userData.add_proof,
        birth_cer: userData.birth_cer,
        id_proof: userData.id_proof
      };

      if (userData.add_proof) {
        this.setState({
          addressFile: [
            {
              name: userData.name,
              preview: userData.add_proof,
              size: 0,
              type: "image/jpeg"
            }
          ]
        });
       this.props.onProofImageLoad("add_proof", userData.add_proof);
      }
      if (userData.birth_cer) {
        this.setState({
          birthdayFile: [
            {
              name: userData.name,
              preview: userData.birth_cer,
              size: 0,
              type: "image/jpeg"
            }
          ]
        });
        this.props.onProofImageLoad("birth_cer", userData.birth_cer);
      }
      if (userData.id_proof) {
        this.setState({
          identityFile: [
            {
              name: userData.name,
              preview: userData.id_proof,
              size: 0,
              type: "image/jpeg"
            }
          ]
        });
        this.props.onProofImageLoad("id_proof", userData.id_proof);
      }
      this.props.initialize(initData);
    }
  }

  handleOnDropIndentity = newImageFile => {
    var data = new FormData();
    data.append("lic", newImageFile[0]);
    this.props.onChangeInput("id_proof", data);
    this.setState({ identityFile: newImageFile });
  };
  handleOnDropAddress = newImageFile => {
    var data = new FormData();
    data.append("lic", newImageFile[0]);
    this.props.onChangeInput("add_proof", data);
    this.setState({ addressFile: newImageFile });
  };
  handleOnDropBirth = newImageFile => {
    var data = new FormData();
    data.append("lic", newImageFile[0]);
    this.props.onChangeInput("birth_cer", data);
    this.setState({ birthdayFile: newImageFile });
  };

  submit = value => {
    var initData = {
      id: value.id,

      name: value.name,
      address: value.address,

      id_proof: this.props.id_proof,
      add_proof: this.props.add_proof,
      birth_cer: this.props.birth_cer
    };
    this.props.onSubmit(initData);
  };

  render() {
    return (
      <div className="pd-8">
        <Row>
          <Col lg="12" md="12" sm="12" xs="12">
            <Card>
              <CardHeader>
                Edit SLAES USER
                <span className="float-right">
                  <Button className="mr-r-10" onClick={history.goBack}>
                    Back
                  </Button>
                </span>
              </CardHeader>
              <CardBody>
                <form
                  onSubmit={this.props.handleSubmit(this.submit)}
                  className="edit_makeit_form"
                >
                  <Field
                    name="name"
                    type="text"
                    component={renderInputField}
                    label="Username"
                    validate={[required, maxLength60, minLength2]}
                    warn={alphaNumeric}
                    required={true}
                  />
                  <Field
                    name="address"
                    type="text"
                    component={renderInputField}
                    label="Address"
                    validate={[required, minLength5]}
                    required={true}
                  />
                  <Row className="pd-0 mr-t-10 image-upload-parent">
                    <label>Proof</label>
                    <Col lg="10">
                      <Row className="pd-10 mr-t-10 image-upload-parent">
                        <Col>
                          <div className="header">
                            Identity proof <span className="must">*</span>
                          </div>
                          <Field
                            name="id_proof"
                            component={DropZoneField}
                            type="file"
                            imagefile={this.state.identityFile}
                            handleOnDrop={this.handleOnDropIndentity}
                            validate={[imageIsRequired]}
                          />
                        </Col>
                        <Col>
                          <div className="header">Address proof</div>
                          <Field
                            name="add_proof"
                            component={DropZoneField}
                            type="file"
                            imagefile={this.state.addressFile}
                            handleOnDrop={this.handleOnDropAddress}
                          />
                        </Col>
                        <Col>
                          <div className="header">Birthday Certificate</div>
                          <Field
                            name="birth_cer"
                            component={DropZoneField}
                            type="file"
                            imagefile={this.state.birthdayFile}
                            handleOnDrop={this.handleOnDropBirth}
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <div className="float-right">
                    <Button
                      type="submit"
                      disabled={this.props.pristine || this.props.submitting}
                    >
                      Submit
                    </Button>
                  </div>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
EditSalesUserForm = reduxForm({
  form: SALES_USER_EIDT_FORM // a unique identifier for this form
})(EditSalesUserForm);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditSalesUserForm);
