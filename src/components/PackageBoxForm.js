import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import {
  MAKEIT_ITEM_CLEAR,
  PACKAGE_SINGLE_BOX_DETAIL,
  MAKEIT_ITEM_ADD,
  PACKAGE_BOX_ADD,
  PACKAGE_BOX_EDIT,
  PACKAGE_BOX_FROM_CLEAR
} from "../constants/actionTypes";
import AxiosRequest from "../AxiosRequest";
import { Button } from "reactstrap";
import renderInputField from "./renderInputField";
import { reset } from "redux-form";
import {
  required,
  maxLength15,
  minLength2,
  alphaNumeric,
  number
} from "../utils/Validation";
import { PACKAGE_BOX_ADD_FORM } from "../utils/constant";

const mapStateToProps = state => ({ ...state.packageadddetail });

const mapDispatchToProps = dispatch => ({
  onGetSinglePackage: packageId =>
    dispatch({
      type: PACKAGE_SINGLE_BOX_DETAIL,
      payload: AxiosRequest.PackageBox.getSingleTypeofPackage(packageId)
    }),
  onSubmit: formData =>
    dispatch({
      type: PACKAGE_BOX_ADD,
      payload: AxiosRequest.PackageBox.addTypeOfPackage(formData)
    }),
  onUpdate: formData =>
    dispatch({
      type: PACKAGE_BOX_ADD,
      payload: AxiosRequest.PackageBox.editTypeOfPackage(formData)
    }),
  onFromClear: () => dispatch(reset(PACKAGE_BOX_ADD_FORM)),
  onClearSuccess: () => dispatch({ type: PACKAGE_BOX_FROM_CLEAR })
});
const InputField = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
  ...custom
  //
}) => {
  return (
    <div>
      <label>
        {label}{" "}
        <span className="must" hidden={!custom.required}>
          *
        </span>
      </label>
      <div>
        {" "}
        <input
          {...input}
          placeholder={label}
          type={type}
          autoComplete="off"
          onWheel={event => {
            event.preventDefault();
          }}
          style={{ width: "250px" }}
        />
        {touched &&
          ((error && <span>{error}</span>) ||
            (warning && <span>{warning}</span>))}
      </div>
    </div>
  );
};

var packageId, isEdit;
class PackageBoxForm extends React.Component {
  componentWillMount() {
    packageId = this.props.packageId;
    isEdit = this.props.isEdit;
    if (isEdit) this.props.onGetSinglePackage(packageId);
  }
  componentDidUpdate(nextProps, nextState) {
    if (this.props.packageAddSuccess) {
      this.props.onFromClear();
      this.props.onClearSuccess();
      this.props.update();
    }

    if (this.props.packagePrefillSuccess) {
      var packageData = this.props.packagesingleBox;
      var initData = {
        id: packageData.id,
        name: packageData.name,
        price: packageData.price
      };
      this.props.initialize(initData);
      this.props.onClearSuccess();
    }
  }

  submit = values => {
    console.log(values);
    if (isEdit) {
      values.id = packageId;
      this.props.onUpdate(values);
    } else this.props.onSubmit(values);
  };
  render() {
    const pristine = this.props.pristine;
    const submitting = this.props.submitting;
    const handleSubmit = this.props.handleSubmit;
    return (
      <form onSubmit={handleSubmit(this.submit)}>
        <Field
          name="name"
          type="text"
          component={InputField}
          label="Name"
          validate={[required, minLength2]}
        />
        <Field
          name="price"
          type="number"
          component={InputField}
          label="Price"
          validate={[required]}
          warn={number}
        />
        <div className="float-right">
          <Button type="submit" disabled={pristine || submitting}>
            Submit
          </Button>
          <Button
            type="button"
            disabled={pristine || submitting}
            onClick={reset}
            className="mr-l-10"
            hidden={isEdit}
          >
            Clear
          </Button>
        </div>
      </form>
    );
  }
}

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
PackageBoxForm = reduxForm({
  form: PACKAGE_BOX_ADD_FORM // a unique identifier for this form
})(PackageBoxForm);
export default connect(mapStateToProps, mapDispatchToProps)(PackageBoxForm);
