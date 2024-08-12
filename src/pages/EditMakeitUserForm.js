import React from "react";
import {
  MAKEIT_ADD_USER,
  MAKEIT_DELETE_USER,
  MAKEIT_USER_DETAIL,
  MAKEIT_FORM_CLEAR,
  MAKEIT_GET_CUISINE,
  MAKEIT_UPDATE_FIELD,
  MAKEIT_GET_HOMETOWN,
  MAKEIT_GET_HUB,
  MAKEIT_UPDATE_MENU_IMAGES,
  MAKEIT_DELETE_MENU_IMAGES,
  MAKEIT_ZONE_AREA
} from "../constants/actionTypes";
import { connect } from "react-redux";
import Select from "react-dropdown-select";
import AxiosRequest from "../AxiosRequest";
import { Field, reduxForm } from "redux-form";
import MapContainer from "../components/MapContainer";
import renderInputField from "../components/renderInputField";
import {
  required,
  maxLength160,
  minLength2,
  alphaNumeric,
  minLength5,
  maxLength4,
  minLength50,
  rating,
  commission,
  maxLength6
} from "../utils/Validation";
import { Row, Col, Card, CardHeader, CardBody, Button } from "reactstrap";
import { reset } from "redux-form";
import { history } from "../store";
import { MAKEIT_USER_EIDT_FORM } from "../utils/constant";
import SelectOption from "../components/SelectOption";
import DropzoneFieldMultiple from "../components/dropzoneFieldMultiple";
import DropZoneField from "../components/dropzoneField"
import RatingText from "../components/RatingText";
import {
  MAKEIT_ADMIN_APPROVEL,
  Kitchen_Info_Type,
  Kitchen_Menu_Type,
  Kitchen_Signature_Type,
  Kitchen_Specialitie_Type
} from "../constants/updateStatus";
import SwitchButtonCommon from "../components/SwitchButtonCommon";

var kitchenSignatureImg = [1];
var kitchenMenuImg = [1, 1, 1, 1];
var kitchenInfoImg = [1, 1, 1, 1];
var kitchenSpecialitiesImg = [1, 1, 1, 1, 1, 1, 1, 1];

const renderSelect = ({
  input,
  label,
  type,
  meta: { touched, error },
  children
}) => (
  <div>
    <label>
      {label} <span className="must">*</span>
    </label>
    <div>
      <select {...input}>{children}</select>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);


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

const InputTextField = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
  ...custom
  // 
}) => {
  return (<div>
    <label hidden={custom.labeldisable}>{label} <span className='must' hidden={!custom.required}>*</span></label>
    <div>
      <textarea {...input} placeholder={label} type={type} autoComplete="off" cols={custom.cols} rows={custom.rows}/>
      <span style={{flex:"0",WebkitFlex:"0",height:"20px"}}>{touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}</span>
    </div>
  </div>);
}

function HubFieldView(props) {
  //if (props.virtualkey === 1) {
    return (
      <Field
        name="makeithub_id"
        component={renderSelect}
        label="Hub"
        validate={[required]}
      >
        {props.makeithub.map(item => (
          <option value={item.makeithub_id} key={item.makeithub_id}>
            {item.makeithub_name}
            {", "}
            {item.address}
          </option>
        ))}
      </Field>
    );
  //}
  //return <div />;
}

const mapStateToProps = state => ({
  ...state.makeituser,
  cusinieList: state.common.cusinieList,
  hometownList: state.common.hometownList,
  makeithub: state.common.makeithub
});

const mapDispatchToProps = dispatch => ({
  onGetUser: id =>
    dispatch({
      type: MAKEIT_USER_DETAIL,
      payload: AxiosRequest.Makeit.getsingle(id)
    }),
  onGetCuisine: () =>
    dispatch({
      type: MAKEIT_GET_CUISINE,
      payload: AxiosRequest.Master.getCuisine()
    }),
  onGetHomeDown: () =>
    dispatch({
      type: MAKEIT_GET_HOMETOWN,
      payload: AxiosRequest.Master.getHomeDown()
    }),
  onGetMovieitHub: () =>
    dispatch({
      type: MAKEIT_GET_HUB,
      payload: AxiosRequest.Master.getMovieitHub()
    }),
  onChangeInput: (key,data,isloading) =>
    dispatch({
      type: MAKEIT_UPDATE_FIELD,
      key,
      isloading,
      payload: AxiosRequest.Makeit.fileUpload(data)
    }),
    onChangeUpdate: (key,image,isloading) =>
    dispatch({
      type: MAKEIT_UPDATE_FIELD,
      key,
      isloading,
      image,
    }),
  onUpdateMenuImages: (imgType, data) =>
    dispatch({
      type: MAKEIT_UPDATE_MENU_IMAGES,
      imgType,
      payload: AxiosRequest.Makeit.fileUpload(data)
    }),

  onDeleteMenuImages: (imgType, index) =>
    dispatch({
      type: MAKEIT_DELETE_MENU_IMAGES,
      imgType,
      index
    }),
  onSubmit: formData =>
    dispatch({
      type: MAKEIT_ADD_USER,
      payload: AxiosRequest.Makeit.userEdit(formData)
    }),
  onFromClear: () => dispatch(reset(MAKEIT_USER_EIDT_FORM)),
  onClearSuccess: () => dispatch({ type: MAKEIT_FORM_CLEAR }),
  onDelete: id => dispatch({ type: MAKEIT_DELETE_USER, index: id }),
  onGetZone: data =>
    dispatch({
      type: MAKEIT_ZONE_AREA,
      payload: AxiosRequest.Zone.getAllZone(data)
    }),
});
var userid;
var cuisinePrevalue = [];
class EditMakeitUserForm extends React.Component {
  handleLatlng = (lat1, lng1) => {
    this.props.change("lat", lat1);
    this.props.change("lon", lng1);
  };
  componentWillMount() {
    userid = this.props.match.params.userid;
    this.setState({
      mapRefresh: false,
      lat: 0,
      lng: 0,
      cuisineId: [],
      isCuisine: true,
      home_checked:false,
      kitchenImage: [],
      kitchenImage2: [],
      kitchenImage3: [],
      kitchenImage4: [],
      removeimages: [],
      hometown_values:[]
    });
    this.props.onGetUser(userid);
    this.props.onGetZone({ boundaries: 1 });
    if (!this.props.cusinieList || this.props.cusinieList.length === 0)
      this.props.onGetCuisine();
    if (!this.props.hometownList || this.props.hometownList.length === 0)
      this.props.onGetHomeDown();
    if (!this.props.makeithub || this.props.makeithub.length === 0)
      this.props.onGetMovieitHub();
    this.handleLatlng = this.handleLatlng.bind(this);
    this.selectedItem = this.selectedItem.bind(this);
    this.selectedHomeDownItem=this.selectedHomeDownItem.bind(this);
    this.handleHomeChange =this.handleHomeChange.bind(this);
    this.submit = this.submit.bind(this);
    cuisinePrevalue = [];
  }
  componentDidUpdate(nextProps, nextState) {
    if (this.props.userAddSuccess) {
      this.props.onFromClear();
      this.props.onClearSuccess();
      history.goBack();
    }
    if (this.props.userPrefillSuccess) {
      var hometownid =
        this.props.hometownList && this.props.hometownList.length > 0
          ? this.props.hometownList[0].hometownid
          : 0;
      var userData = this.props.viewmakeituser;
      var initData = {
        userid: userData.userid,
        name: userData.name,
        brandname: userData.brandname ? userData.brandname : "",
        costfortwo: userData.costfortwo,
        bank_account_no: userData.bank_account_no,
        bank_name: userData.bank_name,
        branch_name: userData.branch_name,
        bank_holder_name: userData.bank_holder_name,
        branch: userData.branch,
        ifsc: userData.ifsc,
        address: userData.address,
        lat: userData.lat,
        lon: userData.lon,
        hometownid: userData.hometownid || hometownid,
        rating: userData.rating || 0,
        makeithub_id: userData.makeithub_id || 1,
        about:userData.about,
        virutal_rating_count:userData.virutal_rating_count,
        commission :userData.commission,
        member_type:userData.member_type,
        pincode:userData.pincode,
      };
      this.setState({ home_checked: userData.makeit_type?true:false});
      var cuisine = [];
      if (userData.cuisines) {
        for (var i = 0; i < userData.cuisines.length; i++) {
          cuisine.push(userData.cuisines[i].cuisineid);
          cuisinePrevalue.push(userData.cuisines[i].cuisinename);
        }
      }
      if(userData.img1){
        this.setState({ kitchenImage: [{name: "",preview: userData.img1,size: 0,type: "image/jpeg"} ]});
        this.props.onChangeUpdate("kitchen_image",userData.img1,false);
      }else{
        this.props.onChangeUpdate("kitchen_image",'',false);
      }
      var hometown_values=[];
      if(userData.hometownid) hometown_values=[{hometownid:userData.hometownid,hometownname:userData.hometownname}]
      this.setState({ cuisineId: cuisine,hometown_values:hometown_values});
      this.props.initialize(initData);
      this.setState(prevState => ({
        mapRefresh: !prevState.mapRefresh,
        lat: this.props.viewmakeituser.lat,
        lng: this.props.viewmakeituser.lon
      }));
      this.props.onClearSuccess();
    }
  }

  selectedHomeDownItem = values => {
    var hometownid = values[0].hometownid;
    this.setState({hometownid: hometownid});
  };

  selectedItem = Id => {
    this.setState({ isCuisine: true });
    const values = this.state.cuisineId;
    const index = values.indexOf(Id);

    if (index === -1) {
      values.push(Id);
    } else {
      values.splice(index, 1);
    }
    this.setState({ cuisineId: values });
  };

  submit = values => {
    if (this.state.cuisineId.length === 0) {
      this.setState({ isCuisine: false });
      return;
    } else {
      var userData = this.props.viewmakeituser;
      var initData = {
        userid: userData.userid,
        name: values.name,
        brandname: values.brandname ? values.brandname : "",
        costfortwo: values.costfortwo,
        bank_account_no: values.bank_account_no,
        bank_name: values.bank_name,
        branch_name: values.branch_name,
        bank_holder_name: values.bank_holder_name,
        branch: values.branch,
        ifsc: values.ifsc,
        address: values.address,
        pincode:values.pincode,
        lat: values.lat,
        lon: values.lon,
        //hometownid: parseInt(values.hometownid),
        about:values.about,
        virutal_rating_count:values.virutal_rating_count,
        member_type:parseInt(values.member_type),
        commission :parseInt(values.commission),
      };

      if(this.state.hometownid) initData.hometownid= parseInt(this.state.hometownid)
      
      if (this.props.kitchen_image) initData.img1 = this.props.kitchen_image;
      
     initData.makeithub_id = parseInt(values.makeithub_id);

      if (userData.virtualkey === 1) { 
        
        initData.verified_status = "1";
        initData.ka_status = MAKEIT_ADMIN_APPROVEL;
      } else {
        initData.makeit_type = this.state.home_checked?1:0;
        initData.verified_status = "1";
        initData.ka_status = MAKEIT_ADMIN_APPROVEL;
      }
      initData.cuisines = [];
      var cid = this.state.cuisineId;
      for (var i = 0; i < cid.length; i++) {
        initData.cuisines.push({ cuisineid: cid[i] });
      }

      var removecuisines = [];
      if (userData.cuisines) {
        for (var j = 0; j < userData.cuisines.length; j++) {
          const index = cid.indexOf(userData.cuisines[j].cuisineid);
          if (index === -1)
            removecuisines.push({ cid: userData.cuisines[j].cid });
        }
        if (removecuisines.length > 0) initData.removecuisines = removecuisines;
      }

      if (values.rating) initData.rating = parseFloat(values.rating).toFixed(1);

      if (this.state.removeimages.length > 0)
        initData.removeimages = this.state.removeimages;

      var k = 0;
      var kitchenmenuimage = [];
      for (k = 0; k < this.props.kitchenmenuimage.length; k++) {
        if (!this.props.kitchenmenuimage[k].img_id)
          kitchenmenuimage.push(this.props.kitchenmenuimage[k]);
      }
      if (kitchenmenuimage.length > 0)
        initData.kitchenmenuimage = kitchenmenuimage;

      var kitcheninfoimage = [];
      for (k = 0; k < this.props.kitcheninfoimage.length; k++) {
        if (!this.props.kitcheninfoimage[k].img_id)
          kitcheninfoimage.push(this.props.kitcheninfoimage[k]);
      }
      if (kitcheninfoimage.length > 0)
        initData.kitcheninfoimage = kitcheninfoimage;

      var Specialitiesfood = [];
      for (k = 0; k < this.props.Specialitiesfood.length; k++) {
        if (!this.props.Specialitiesfood[k].img_id)
          Specialitiesfood.push(this.props.Specialitiesfood[k]);
      }
      if (Specialitiesfood.length > 0)
        initData.Specialitiesfood = Specialitiesfood;

      var Signature = [];
      for (k = 0; k < this.props.Signature.length; k++) {
        if (!this.props.Signature[k].img_id)
          Signature.push(this.props.Signature[k]);
      }
      if (Signature.length > 0) initData.Signature = Signature;
      this.props.onSubmit(initData);
    }
  };

  handleKitchenimage = newImageFile => {
    var data = new FormData();
    data.append("lic", newImageFile[0]);
    this.props.onChangeInput("kitchen_image",data,true);
    this.setState({ kitchenImage: newImageFile });
  };

  handleonRemove = (imgid, imgType, index) => {
    const { removeimages } = this.state;
    console.log("---imgid--" + imgid + "---index--" + index);
    this.props.onDeleteMenuImages(imgType, index);
    if (imgid) {
      removeimages.push(imgid);
      this.setState({
        removeimages
      });
    }
  };

  handleHomeChange = () => {
    this.setState(prevState => ({
      home_checked: !prevState.home_checked,
    }));
  }

  handleKitchenMenuimages = newImageFile => {
    var data = new FormData();
    data.append("lic", newImageFile[0]);
    this.props.onUpdateMenuImages(Kitchen_Menu_Type, data);
  };

  handleKitchenInfoimages = newImageFile => {
    var data = new FormData();
    data.append("lic", newImageFile[0]);
    this.props.onUpdateMenuImages(Kitchen_Info_Type, data);
  };

  handleKitchenSpecialitieimages = newImageFile => {
    var data = new FormData();
    data.append("lic", newImageFile[0]);
    this.props.onUpdateMenuImages(Kitchen_Specialitie_Type, data);
  };

  handleKitchenSignatureimages = newImageFile => {
    var data = new FormData();
    data.append("lic", newImageFile[0]);
    this.props.onUpdateMenuImages(Kitchen_Signature_Type, data);
  };
 

 

  // {
  //   'kitchenmembertype': [{
  //           "kitchenmembertypeid": 1,
  //           "kitchenmembertype": "Gold"
  //       },
  //       {
  //           "kitchenmembertypeid": 2,
  //           "kitchenmembertype": "Silver"
  //       },
  //       {
  //           "kitchenmembertypeid": 3,
  //           "kitchenmembertype": "bronze"
  //       }
  //   ]

  render() {
    const cusinieList = this.props.cusinieList;
    const virtualkey = this.props.viewmakeituser
      ? this.props.viewmakeituser.virtualkey
      : 0;
    // const verified_status = this.props.viewmakeituser
    //   ? this.props.viewmakeituser.verified_status
    //   : 0;

    const kitchen_status = this.props.viewmakeituser
      ? this.props.viewmakeituser.ka_status
      : 0;
    return (
      <div className="pd-8">
        <Row>
          <Col lg="12" md="12" sm="12" xs="12">
            <Card>
              <CardHeader>
                Edit MAKEIT USER
                <Row className="float-right">
                  <Col className="mr-t-10" hidden={virtualkey===1}>
                  <div>Caters</div>
                  </Col>
                  <Col className="mr-t-10 pd-0" hidden={virtualkey===1}>
                  <SwitchButtonCommon  handleSwitchChange={this.handleHomeChange}
                      checked={this.state.home_checked}>Caters</SwitchButtonCommon>
                  </Col>
                  <Col>
                  <Button className="mr-r-10" onClick={history.goBack}>
                    Back
                  </Button>
                  </Col>
                </Row>
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
                    validate={[required, maxLength160, minLength2]}
                    warn={alphaNumeric}
                    required={true}
                  />
                  <div>
                    <label className="color-grey">Kitchen Details :</label>
                  </div>
                  <Field
                    name="brandname"
                    type="text"
                    component={renderInputField}
                    label="Brand Name"
                    validate={[required, minLength2]}
                    required={true}
                  />
                  <Field
                    name="about"
                    type="text"
                    component={InputTextField}
                    label="About"
                    validate={[required,minLength50]}
                    required={true}
                  />
                  <Row className="pd-0 mr-t-10 image-upload-parent">
                    <label>Info Image </label>
                    <Col lg="10">
                      <Row className="pd-10 mr-t-10 image-upload-parent">
                        {kitchenInfoImg.map((item, i) => (
                          <Col key={i}>
                            <Field
                              name={"KI" + i}
                              index={i}
                              component={DropzoneFieldMultiple}
                              type="file"
                              imgPrefillDetail={
                                this.props.kitcheninfoimage[i]
                                  ? this.props.kitcheninfoimage[i]
                                  : ""
                              }
                              handleonRemove={this.handleonRemove}
                              handleOnDrop={()=>this.handleKitchenInfoimages}
                            />
                          </Col>
                        ))}
                      </Row>
                    </Col>
                  </Row>
                  <Row className="pd-0 mr-t-10 image-upload-parent">
                    <label>Menu Image </label>
                    <Col lg="10">
                      <Row className="pd-10 mr-t-10 image-upload-parent">
                        {kitchenMenuImg.map((item, i) => (
                          <Col key={i}>
                            <Field
                              name={"KM" + i}
                              index={i}
                              component={DropzoneFieldMultiple}
                              type="file"
                              imgPrefillDetail={
                                this.props.kitchenmenuimage[i]
                                  ? this.props.kitchenmenuimage[i]
                                  : ""
                              }
                              handleonRemove={this.handleonRemove}
                              handleOnDrop={()=>this.handleKitchenMenuimages}
                            />
                          </Col>
                        ))}
                      </Row>
                    </Col>
                  </Row>

                  <Row className="pd-0 mr-t-10 image-upload-parent">
                    <label>Specialties  Food </label>
                    <Col lg="10">
                      <Row className="pd-10 mr-t-10 image-upload-parent">
                        {kitchenSpecialitiesImg.map((item, i) => (
                          <Col key={i} className="mr-t-10">
                            <Field
                              name={"KSF" + i}
                              index={i}
                              component={DropzoneFieldMultiple}
                              type="file"
                              imgPrefillDetail={
                                this.props.Specialitiesfood[i]
                                  ? this.props.Specialitiesfood[i]
                                  : ""
                              }
                              handleonRemove={this.handleonRemove}
                              handleOnDrop={()=>this.handleKitchenSpecialitieimages}
                            />
                          </Col>
                        ))}
                      </Row>
                    </Col>
                  </Row>

                  <Row className="pd-0 mr-t-10 image-upload-parent">
                    <label>Signature Image </label>
                    <Col lg="10">
                      <Row className="pd-10 mr-t-10 image-upload-parent">
                        {kitchenSignatureImg.map((item, i) => (
                          <Col key={i}>
                            <Field
                              name={"KSI" + i}
                              index={i}
                              component={DropzoneFieldMultiple}
                              type="file"
                              imgPrefillDetail={
                                this.props.Signature[i]
                                  ? this.props.Signature[i]
                                  : ""
                              }
                              handleonRemove={this.handleonRemove}
                              handleOnDrop={()=>this.handleKitchenSignatureimages}
                            />
                          </Col>
                        ))}
                      </Row>
                    </Col>
                  </Row>

                  <Row className="pd-0 mr-t-10 image-upload-parent">
                    <label>Kitchen Thumb</label>
                    <Col  lg="10"> <Row className="pd-10 mr-t-10 image-upload-parent">
                                                    <Field
                                                        name="img1"
                                                        component={DropZoneField}
                                                        type="file"
                                                        imagefile={this.state.kitchenImage}
                                                        handleOnDrop={this.handleKitchenimage}
                                                    /></Row></Col>
                    {/* <Col lg="10">
                      <Row className="pd-10 mr-t-10 image-upload-parent">
                        {kitchenThumb.map((item, i) => (
                          <Col key={i}>
                            <Field
                              name={"KT" + i}
                              index={i}
                              component={DropzoneFieldMultiple}
                              type="file"
                              imgPrefillDetail={
                                this.state.kitchenImage
                                  ? this.state.kitchenImage
                                  : ""
                              }
                              handleOnDrop={this.handleKitchenimage}
                            />
                          </Col>
                        ))}
                      </Row>
                    </Col> */}
                  </Row>

                  <Field
                    name="rating"
                    type="number"
                    component={RatingText}
                    label="Rating"
                    validate={[required, rating]}
                    required={true}
                  />

                  <Field
                    name="virutal_rating_count"
                    type="number"
                    component={RatingText}
                    label="Virtual Rating Count"
                    validate={[required,maxLength4]}
                    required={true}
                  />
                  <Field
                    name="costfortwo"
                    type="number"
                    component={renderInputField}
                    label="Cost Of Two"
                    validate={[required, minLength2]}
                    required={true}
                  />
                  <Field
                    name="cuisine"
                    component={SelectOption}
                    label="Cuisine"
                    values={cuisinePrevalue}
                    cids={this.state.cuisineId}
                    placeholder="Cuisine"
                    options={cusinieList}
                    required={true}
                    multiple
                    selectedItem={this.selectedItem}
                    isError={this.state.isCuisine}
                  />
                  <Field
                    name="hometownid"
                    component={InputSearchDropDown}
                    options={this.props.hometownList}
                    labelField="hometownname"
                    searchable={true}
                    clearable={true}
                    searchBy="hometownname"
                    valueField="hometownid"
                    noDataLabel="No matches found"
                    values={this.state.hometown_values}
                    onSelection={this.selectedHomeDownItem}
                    label="Hometown Name"
                  />
                  {/* <Field
                    name="hometownid"
                    component={renderSelect}
                    label="Home Town"
                    validate={[required]}>
                    {this.props.hometownList.map(item => (
                      <option value={item.hometownid} key={item.hometownid}>
                        {item.hometownname}
                      </option>
                    ))}
                  </Field> */}
                  <HubFieldView
                    virtualkey={virtualkey}
                    makeithub={this.props.makeithub}/>

                  <Field
                    name="member_type"
                    component={renderSelect}
                    label="Member Type"
                    validate={[required]}>
                    {this.props.MemberType.map(item => (
                      <option value={item.id} key={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </Field>

                  <Field
                    name="commission"
                    type="number"
                    component={RatingText}
                    label="Commission"
                    validate={[required, commission]}
                    required={true}
                  />
                  {/* <Field
                    name="makeithub_id"
                    component={renderSelect}
                    label="Hub"
                    validate={[required]}
                  hidden={virtualkey===0}>
                    {this.props.makeithub.map(item => (
                      <option value={item.makeithub_id} key={item.makeithub_id}>
                        {item.makeithub_name}
                        {", "}
                        {item.address}
                      </option>
                    ))}
                  </Field> */}

                  <div>
                    <label className="color-grey">Bank Account Details :</label>
                  </div>
                  <Field
                    name="bank_holder_name"
                    type="text"
                    component={renderInputField}
                    label="Holder Name"
                    validate={[required, minLength2]}
                    required={true}
                  />
                  <Field
                    name="bank_account_no"
                    type="number"
                    component={renderInputField}
                    label="Account No"
                    validate={[required, minLength5]}
                    required={true}
                  />
                  <Field
                    name="bank_name"
                    type="text"
                    component={renderInputField}
                    label="Bank Name"
                    validate={[required, minLength2]}
                    required={true}
                  />
                  <Field
                    name="branch_name"
                    type="text"
                    component={renderInputField}
                    label="Branch Name"
                    validate={[required, minLength2]}
                    required={true}
                  />
                  <Field
                    name="ifsc"
                    type="text"
                    component={renderInputField}
                    label="IFSC Code"
                    validate={[required, minLength2]}
                    required={true}
                  />

                  <div>
                    <label className="color-grey">Address Details :</label>
                  </div>
                  <Field
                    name="address"
                    type="text"
                    component={renderInputField}
                    label="Address"
                    validate={[required, minLength5]}
                    required={true}
                  />
                  <Field
                    name="pincode"
                    type="number"
                    component={renderInputField}
                    label="Pincode"
                    validate={[required, maxLength6]}
                    required={true}
                  />
                  <Field
                    name="lat"
                    type="number"
                    component={renderInputField}
                    label="Latitude"
                    validate={[required, minLength5]}
                    required={true}
                  />
                  <Field
                    name="lon"
                    type="number"
                    component={renderInputField}
                    label="Longitude"
                    validate={[required, minLength5]}
                    required={true}
                  />

                  <MapContainer
                    className="mr-t-10"
                    handleLatlng={this.handleLatlng}
                    editMap={true}
                    address={"You"}
                    clocation={false}
                    zonearea={this.props.ZoneData}
                    lat={this.state.lat}
                    lng={this.state.lng}
                    refresh={this.state.mapRefresh}
                  />

                  <div className="float-right">
                    <Button type="submit">
                      {kitchen_status === MAKEIT_ADMIN_APPROVEL
                        ? "Submit"
                        : "Approved"}
                    </Button>
                    {/* disabled={this.props.pristine || this.props.submitting} */}
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
EditMakeitUserForm = reduxForm({
  form: MAKEIT_USER_EIDT_FORM // a unique identifier for this form
})(EditMakeitUserForm);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditMakeitUserForm);
