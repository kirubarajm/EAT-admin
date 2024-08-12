import React from "react";
import { Field, reduxForm } from "redux-form";
import { Button, Row, Col } from "reactstrap";
import renderInputField from "./renderInputField";
import InputForMobile from "./InputForMobile";
import DropZoneField from "./dropzoneField";
import {
  required,
  maxLength60,
  minLength2,
  phoneNumber,
  alphaNumeric,
  aol,
  email,
  passwordValidate,
  minLength5,
  imageIsRequired
} from "../utils/Validation";
import { SALES_REGISTRATION_FORM } from "../utils/constant";

const AddUserForm = props => {
  const {
    handleSubmit,
    pristine,
    submitting,
    resetForm,
    imageFile,
    addressFile,
    birthdayFile,
    handleOnDropIndentity,
    handleOnDropAddress,
    handleOnDropBirth,
    onPhoneNoVerify,
    mobileVerifyStatus
  } = props;
  return (
    <form onSubmit={handleSubmit}>
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
        name="email"
        type="email"
        component={renderInputField}
        label="Email"
        validate={[required, email]}
        warn={aol}
        required={true}
      />
      <Field
        name="phoneno"
        type="number"
        component={InputForMobile}
        label="Phone Number"
        validate={[required, phoneNumber]}
        required={true}
        maxLength={10}
        disabled={mobileVerifyStatus}
        onPhoneNoVerify={onPhoneNoVerify}
      />
      <Field
        name="password"
        type="password"
        component={renderInputField}
        label="Password"
        validate={[required, passwordValidate]}
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
                name="identityProof"
                component={DropZoneField}
                type="file"
                imagefile={imageFile}
                handleOnDrop={handleOnDropIndentity}
                validate={[imageIsRequired]}
              />
            </Col>
            <Col>
              <div className="header">Address proof</div>
              <Field
                name="addressProof"
                component={DropZoneField}
                type="file"
                imagefile={addressFile}
                handleOnDrop={handleOnDropAddress}
              />
            </Col>
            <Col>
              <div className="header">Birthday Certificate</div>
              <Field
                name="bitthdayProof"
                component={DropZoneField}
                type="file"
                imagefile={birthdayFile}
                handleOnDrop={handleOnDropBirth}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <div className="float-right">
        <Button type="submit" disabled={pristine || submitting}>
          Submit
        </Button>
        <Button
          type="button"
          disabled={pristine || submitting}
          onClick={resetForm}
          className="mr-l-10"
        >
          Clear
        </Button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: SALES_REGISTRATION_FORM // a unique identifier for this form
})(AddUserForm);
