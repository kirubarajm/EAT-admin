import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import {
  MAKEIT_PACKAGE_BOX_LIST,
  MAKEIT_PACKAGE_INVENTORY_ADD,
  MAKEIT_PACKAGE_INVENTORY_CLEAR,
  MAKEIT_PACKAGE_INVENTORY_EDIT,
  PACKAGE_GET_ALL_MAKEIT_LIST,
  PACKAGE_GET_SINGLE_INVENTORY,
  MAKEIT_PACKAGE_BOX_FILTER
} from "../constants/actionTypes";
import AxiosRequest from "../AxiosRequest";
import { Button } from "reactstrap";
import { reset } from "redux-form";
import { required, number } from "../utils/Validation";
import { PACKAGE_INVENTORY_ADD_FORM } from "../utils/constant";
import SelectOption from "./SelectOption";
import Select from "react-dropdown-select";

const mapStateToProps = state => ({ ...state.packageinventory });

const mapDispatchToProps = dispatch => ({
  onGetAllMakeitList: () =>
    dispatch({
      type: PACKAGE_GET_ALL_MAKEIT_LIST,
      payload: AxiosRequest.Makeit.getAllPackageMakeit()
    }),
  onGetPackageBox: () =>
    dispatch({
      type: MAKEIT_PACKAGE_BOX_LIST,
      payload: AxiosRequest.PackageBox.getTypesofPackageList()
    }),
  onPackageBoxFilter: (packageid) =>
    dispatch({type: MAKEIT_PACKAGE_BOX_FILTER,packageid}),
  onGetSingleInventory: (id) =>
    dispatch({
      type: PACKAGE_GET_SINGLE_INVENTORY,
      payload: AxiosRequest.PackageInventory.getPackageInvetorysingle(id)
    }),
  onSubmit: formData =>
    dispatch({
      type: MAKEIT_PACKAGE_INVENTORY_ADD,
      payload: AxiosRequest.PackageInventory.addPackageInventory(formData)
    }),
  onUpdate: formData =>
    dispatch({
      type: MAKEIT_PACKAGE_INVENTORY_ADD,
      payload: AxiosRequest.PackageInventory.editPackageInventory(formData)
    }),
  onFromClear: () => dispatch(reset(PACKAGE_INVENTORY_ADD_FORM)),
  onClearSuccess: () => dispatch({ type: MAKEIT_PACKAGE_INVENTORY_CLEAR })
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

const InputSearchDropDown = ({
  onSelection,
  options,
  label,
  labelField,
  searchable,
  searchBy,
  values,
  disabled,
  clearable,
  noDataLabel,
  valueField
}) => {
  return (
    <div>
    <label>
      {label}{" "}
      <span className="must">
        *
      </span>
    </label>
    <div>
    <Select
      options={options}
      labelField={labelField}
      searchable={searchable}
      searchBy={searchBy}
      values={[...values]}
      noDataLabel={noDataLabel}
      valueField={valueField}
      dropdownHeight={'300px'}
      disabled={disabled}
      onChange={(value) => {
        onSelection(value);
      }}
    /></div>
    </div>
  );
};

var userid,inventoryid,isEdit;
var packageBoxValue = [];
var makeit_field = [];
class PackageInventoryForm extends React.Component {
  componentWillMount() {
    userid = this.props.userId;
    inventoryid = this.props.inventoryid;
    if(!userid){
      this.props.onGetAllMakeitList();
    }
    this.props.onGetPackageBox();
    isEdit = this.props.isEdit;
    this.setState({
      isPackageSelect: false,
      packageboxId: 0,
      kitchenId:userid||0,
      package_values:[],
      makeit_values:[],
    });
    this.selectedItem = this.selectedItem.bind(this);
    if (isEdit && inventoryid) this.props.onGetSingleInventory(inventoryid);
  }

  selectedItem = values => {
    var Packid = values[0].id;
    this.setState({ isPackageSelect: true, packageboxId: Packid});
  };

  selectedKitchenItem = values => {
    var kitchenId = values[0].userid;
    var filterid=values[0].makeit_type===1?this.props.eat_cover_id:0;
    this.props.onPackageBoxFilter(filterid);
    this.setState({ isPackageSelect: true, kitchenId: kitchenId});
  };
  componentDidUpdate(nextProps, nextState) {
    if (this.props.packageInventoryAddSuccess) {
      this.props.onFromClear();
      this.props.onClearSuccess();
      this.props.update();
    }

     if (this.props.packageInvetoryPrefillSuccess) {
       var packageData = this.props.package_inventory;
       var initData = {
        makeit_id: packageData.makeit_id,
        packageid: packageData.packageid,
        count: packageData.count
       };

       var packageitem={
         id:packageData.packageid,
         name:packageData.name
       }
       makeit_field=[];
       makeit_field.push(packageitem);
       this.setState({package_values:makeit_field,packageid:packageData.packageid})

       var kitchenitem={
        userid:packageData.makeit_id,
        brandname:packageData.brandname
      }
      makeit_field=[];
      makeit_field.push(kitchenitem);

       this.setState({makeit_values:makeit_field,kitchenId:packageData.makeit_id})
       this.props.initialize(initData);
       this.props.onClearSuccess();
     }
  }

  submit = values => {
    values.makeit_id = this.state.kitchenId;
    values.packageid = this.state.packageboxId;
    if (isEdit) {
      values.inventoryid = inventoryid;
      this.props.onUpdate(values);
    } else this.props.onSubmit(values);
  };
  render() {
    const pristine = this.props.pristine;
    const submitting = this.props.submitting;
    const handleSubmit = this.props.handleSubmit;
    const packageBox = this.props.packageBoxFiltered || [];
    const makeit_list = this.props.makeit_list || [];
    const package_values = this.state.package_values || [];
    return (
      <form onSubmit={handleSubmit(this.submit)}>
        {/* <Select options={packageBox} labelField='name' searchable={true} searchBy= "name" valueField="id" onChange={(values) =>this.selectedItem(values)}/> */}

        <Field
          hidden={userid}
          name="makeitid"
          component={InputSearchDropDown}
          options={makeit_list}
          labelField="brandname"
          searchable={true}
          clearable={true}
          searchBy="brandname"
          valueField="userid"
          noDataLabel="No matches found"
          values={this.state.makeit_values}
          disabled={this.props.isEdit}
          onSelection={this.selectedKitchenItem}
          label="Kitchen name"
        />

        <Field
          name="packageid"
          component={InputSearchDropDown}
          options={packageBox}
          labelField="name"
          searchable={true}
          searchBy="name"
          disabled={this.props.isEdit}
          valueField="id"
          clearable={true}
          noDataLabel="No matches found"
          values={package_values}
          onSelection={this.selectedItem}
          label="Package Box"
        />
        <Field
          name="count"
          type="number"
          component={InputField}
          label="Count"
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
            onClick={this.props.onFromClear}
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
PackageInventoryForm = reduxForm({
  form: PACKAGE_INVENTORY_ADD_FORM // a unique identifier for this form
})(PackageInventoryForm);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PackageInventoryForm);
