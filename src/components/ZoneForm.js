import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import {
  ZONE_XFACTOR_UPDATE, ZONE_XFACTOR_UPDATE_CLEAR
} from "../constants/actionTypes";
import AxiosRequest from "../AxiosRequest";
import { Button } from "reactstrap";
import { reset } from "redux-form";
import { required, number } from "../utils/Validation";
import { ZONE_ADD_FORM } from "../utils/constant";

const mapStateToProps = state => ({ ...state.zonexfactorupdate });

const mapDispatchToProps = dispatch => ({
  onUpdate: formData =>
    dispatch({
      type: ZONE_XFACTOR_UPDATE,
      payload: AxiosRequest.Zone.updateZoneXfactors(formData)
    }),
  onFromClear: () => dispatch(reset(ZONE_ADD_FORM)),
  onClearSuccess: () => dispatch({ type: ZONE_XFACTOR_UPDATE_CLEAR })
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
          step="0.10"
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

var zoneid ,zoneitem,isEdit;
class ZoneForm extends React.Component {
  componentWillMount() {
    zoneitem =this.props.item
    zoneid = this.props.zoneid;
    isEdit = this.props.isEdit;
    var initData={xfactor:zoneitem.xfactor};
    this.props.initialize(initData);
  }
  componentDidUpdate(nextProps, nextState) {
    if(this.props.zoneupdateStatus){
      this.props.onClearSuccess();
      this.props.update();
    }
  }

  submit = values => {
      values.id = zoneid;
      this.props.onUpdate(values);
  };
  render() {
    const pristine = this.props.pristine;
    const submitting = this.props.submitting;
    const handleSubmit = this.props.handleSubmit;
    return (
      <form onSubmit={handleSubmit(this.submit)}>
        <Field
          name="xfactor"
          type="number"
          component={InputField}
          label="Xfactor"
          validate={[required]}
          warn={number}
        />
        <div className="float-right">
          <Button type="submit" disabled={pristine || submitting}>
            Submit
          </Button>
        </div>
      </form>
    );
  }
}

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
ZoneForm = reduxForm({
  form: ZONE_ADD_FORM // a unique identifier for this form
})(ZoneForm);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ZoneForm);
