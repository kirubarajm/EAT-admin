import React from "react";
import AxiosRequest from "../AxiosRequest";
import SearchInput from "../components/SearchInput";
import { Field, reduxForm } from "redux-form";
import Select from "react-dropdown-select";
import {
  PUSH_NOTIFICATION_USER_LIST,
  PUSH_NOTIFICATION_USER_LIST_FILTER,
  MAKEIT_GET_HUB,
  PUSH_NOTIFICATION_SEND,
  PUSH_NOTIFICATION_CLEAR,
  EAT_COUPON_LIST
} from "../constants/actionTypes";
import { connect } from "react-redux";
import { required, minLength5,is_url } from "../utils/Validation";
import { PUSH_NOTIFICATION_FROM } from "../utils/constant";
import {
  Card,
  CardBody,
  CardHeader,
  Table,
  Row,
  Col,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  Modal,
  ButtonGroup,
  ModalHeader,
  ModalBody
} from "reactstrap";

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
    
    <div>
    <Select
      options={options}
      labelField={labelField}
      searchable={searchable}
      searchBy={searchBy}
      values={[...values]}
      clearable={clearable}
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

function HubDropDown(props) {
  if (props.visible && props.selectedHub) {
    return (
      <ButtonDropdown
        isOpen={props.dropdownOpen}
        toggle={props.dropdowntoggle}
        size="sm"
      >
        <DropdownToggle caret  disabled={props.disabled}>{props.selectedHub.address}</DropdownToggle>
        <DropdownMenu>
          {props.makeithub.map((item, index) => (
            <DropdownItem onClick={() => props.selectHub(item)} key={index}>
              {item.address}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </ButtonDropdown>
    );
  } else {
    return <div />;
  }
}



const InputFieldTextArea = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
  ...custom
  //
}) => {
  return (
    <div>
      <div>
        <textarea
          {...input}
          placeholder={label}
          type={type}
          autoComplete="off"
          cols={custom.cols}
          rows={custom.rows}
        />
        <span style={{ flex: "0", WebkitFlex: "0", height: "20px" }}>
          {touched &&
            ((error && <span>{error}</span>) ||
              (warning && <span>{warning}</span>))}
        </span>
      </div>
    </div>
  );
};

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
          style={{ width: "auto" }}
        />
        {touched &&
          ((error && <span>{error}</span>) ||
            (warning && <span>{warning}</span>))}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({ ...state.pushnotificationlist });

const mapDispatchToProps = dispatch => ({
  onGetAllPushUserList: data =>
    dispatch({
      type: PUSH_NOTIFICATION_USER_LIST,
      payload: AxiosRequest.PushNotification.getPushUserList(data)
    }),
  onGetMovieitHub: () =>
    dispatch({
      type: MAKEIT_GET_HUB,
      payload: AxiosRequest.Master.getMovieitHub()
    }),

 onGetCoupon: () =>
    dispatch({
      type: EAT_COUPON_LIST,
      payload: AxiosRequest.PushNotification.getCoupon()
    }),
  onSendNotification: data =>
    dispatch({
      type: PUSH_NOTIFICATION_SEND,
      payload: AxiosRequest.PushNotification.sendPushNotification(data)
    }),
  onClear: () =>
    dispatch({
      type: PUSH_NOTIFICATION_CLEAR
    }),
  onSetFilter: (search, page, hubitem,usertype,eatuserlisttype) =>
    dispatch({
      type: PUSH_NOTIFICATION_USER_LIST_FILTER,
      search,
      page,
      hubitem,
      usertype,
      eatuserlisttype
    })
});

const defultPage = 1;
class Pushnotification extends React.Component {

 
  constructor() {
    super();
  }
  componentWillMount() {
    this.selectHub = this.selectHub.bind(this);
    this.dropdowntoggle = this.dropdowntoggle.bind(this);
    this.onFiltersApply = this.onFiltersApply.bind(this);
    this.onSendPushNotification =this.onSendPushNotification.bind(this);
    this.filter=this.filter.bind(this);
    this.filterUsers=this.filterUsers.bind(this);
    this.onNotificationPopUp = this.onNotificationPopUp.bind(this);
    this.setState({ dropdownOpen: false, notificationPopUp: false, coupon_values:[]});

    if (!this.props.makeithub || this.props.makeithub.length === 0)
      this.props.onGetMovieitHub();

    if (this.props.hubItem) {
      this.props.onSetFilter(
        this.props.search,
        this.props.page,
        this.props.hubItem,
        this.props.usertype,
        this.props.eatuserlisttype
      );
      this.onFiltersApply(
        this.props.search,
        this.props.page,
        this.props.hubItem,
        this.props.usertype,
        this.props.eatuserlisttype
      );
    }

    this.onSearch = e => {
      this.props.onSetFilter(e.target.value, defultPage, this.props.hubItem,this.props.usertype,this.props.eatuserlisttype);
      this.onFiltersApply(e.target.value, defultPage, this.props.hubItem,this.props.usertype,this.props.eatuserlisttype);
    };

    if (this.props.couponlist.length == 0) this.props.onGetCoupon();
   
  
  }

  componentDidUpdate(nextProps, nextState) {
    if (this.props.makeithub &&this.props.makeithub.length !== 0 &&!this.props.hubItem) {
      this.selectHub(this.props.makeithub[0]);
      console.log("hubtype DidUpdate-->");
      this.onFiltersApply(
        this.props.search,
        this.props.page,
        this.props.hubItem,this.props.usertype,this.props.eatuserlisttype
      );
    }

    if (this.props.sendpush) {
      this.onNotificationPopUp();
      this.props.onClear();
    }

     if (this.props.couponlist.length !=0 && this.state.coupon_values.length==0) {
      this.setState({coupon_values:[this.props.couponlist[0]]})
    }
  }
  selectHub(hubitem) {
    this.props.onSetFilter(this.props.search, defultPage, hubitem,this.props.usertype,this.props.eatuserlisttype);
    this.onFiltersApply(this.props.search, defultPage, hubitem,this.props.usertype,this.props.eatuserlisttype);
  }

  dropdowntoggle() {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  }
  onNotificationPopUp() {
    this.setState({ notificationPopUp: !this.state.notificationPopUp });
  }

  onSendPushNotification(value) {
    console.log(this.props.eatuserlisttype);
    var data = {};
    data.makeithub_id = this.props.hubItem.makeithub_id;
    data.type = this.props.eatuserlisttype===1?this.props.usertype:this.props.eatuserlisttype;
    data.title = value.notification_titel;
    data.user_message = value.notification_message;
    if (this.props.eatuserlisttype === 3) {
      data.coupon = this.state.coupon_values[0];
    }
  
    if(value.notification_image) data.image = value.notification_image;
    console.log("data-->",data);
   this.props.onSendNotification(data);
  }

  

  onFiltersApply(search, page, hubtype,usertype,eatuserlisttype) {
    if (!hubtype) return;
    var filter = {
      search: search,
      page: page,
      type:usertype,
      makeithub_id: hubtype.makeithub_id
    };
    this.props.onGetAllPushUserList(filter);
  }
  filter = (usertype) =>{
    this.props.onSetFilter(this.props.search, defultPage, this.props.hubItem,usertype,this.props.eatuserlisttype);
    this.onFiltersApply(this.props.search, defultPage, this.props.hubItem,usertype,this.props.eatuserlisttype);
  }

  filterUsers = (eatuserlisttype) =>{
    this.props.onSetFilter(this.props.search, defultPage, this.props.hubItem,this.props.usertype,eatuserlisttype);
    this.onFiltersApply(this.props.search, defultPage, this.props.hubItem,this.props.usertype,eatuserlisttype);
  }

  // filterUsers = (couponuserlisttype) =>{
  //   this.props.onSetFilter(this.props.search, defultPage, this.props.hubItem,this.props.usertype,couponuserlisttype);
  //   this.onFiltersApply(this.props.search, defultPage, this.props.hubItem,this.props.usertype,couponuserlisttype);
  // }

  selectedCoupon= values => {
    if(!values || values.length==0) return;
    this.props.change("Coupon", values[0].cid);
   
    this.setState({coupon_values: values});
  };

  render() {
    const pushUserList = this.props.pushUserList;
    const submitting = this.props.submitting;
    const pristine = this.props.pristine;
    const handleSubmit = this.props.handleSubmit;
    const couponlist = this.props.couponlist;
    // if (this.props.CouponList.length !== 0)
    // this.props.change("CouponList", this.props.CouponList[0].cid);
    return (
      <div className="pd-8">
        <Card>
          <CardHeader>
            Push Notification
            <Row className="float-right">
              {/* <Col><div className='font-size-12'>last 7 days user</div></Col> */}
              <Col>
                <ButtonGroup size="sm">
                  <Button color="primary" onClick={()=>this.filterUsers(1)} active={this.props.eatuserlisttype === 1}>
                    Last 7 days user
                  </Button>

                  <Button color="primary" onClick={()=>this.filterUsers(0)} active={this.props.eatuserlisttype === 0}>
                     All user
                  </Button>
                  <Button color="primary" onClick={()=>this.filterUsers(2)} active={this.props.couponuserlisttype === 2} hidden={true}>
                     Coupon user
                  </Button>
                </ButtonGroup>
              </Col>
              <Col >

                <ButtonGroup size="sm" >
                  <Button color="primary" disabled={this.props.eatuserlisttype===0} onClick={()=>this.filter(1)} active={this.props.usertype === 1}>
                    With Out Orders
                  </Button>

                  <Button color="primary" disabled={this.props.eatuserlisttype===0} onClick={()=>this.filter(2)} active={this.props.usertype === 2}>
                    With Orders
                  </Button>
                </ButtonGroup>
              </Col>

              <Col >
                <HubDropDown
                disabled={this.props.eatuserlisttype!==1}
                  dropdownOpen={this.state.dropdownOpen}
                  visible={true}
                  dropdowntoggle={this.dropdowntoggle}
                  selectedHub={this.props.hubItem}
                  selectHub={this.selectHub}
                  makeithub={this.props.makeithub}
                />
              </Col>

              {/* <Col>
                <Button onClick={this.onNotificationPopUp} size="sm">Send Message</Button>
              </Col> */}

            </Row>
          </CardHeader>
          <CardBody className="scrollbar pd-0">
            {/* <Table>
              <thead>
                <tr>
                  <th>No</th>
                  <th>User ID</th>
                  <th>User Name</th>
                  <th>Phone No</th>
                </tr>
              </thead>
              <tbody>
                {pushUserList.map((item, i) => (
                  <tr key={i}>
                    <th scope="row">{i + 1}</th>
                    <th scope="row">{item.userid}</th>
                    <th scope="row">{item.name}</th>
                    <td>{item.phoneno}</td>
                  </tr>
                ))}
              </tbody>
            </Table> */}


                <form onSubmit={handleSubmit(this.onSendPushNotification)} className="product_form">
                <div>
                  <label>
                    Coupon
                  </label>
                </div>
                <Field
                      name="Coupon"
                      component={InputSearchDropDown}
                      options={this.props.couponlist}
                      labelField="coupon_name"
                      searchable={true}
                      clearable={true}
                      searchBy="coupon_name"
                      valueField="cid"
                      noDataLabel="No matches found"
                      values={this.state.coupon_values}
                      onSelection={this.selectedCoupon}
                      disabled={this.props.eatuserlisttype !==3}
                      label="Coupon Name"
              />

                      <div>
                        <label>
                          TITLE <span className="must">*</span>{" "}
                        </label>
                      </div>
                    <Field
                      name="notification_titel"
                      type="text"
                      component={InputField}
                      validate={[required, minLength5]}
                      cols="40"
                      rows="3"
                    />
                    <div>
                  <label>
                    Message <span className="must">*</span>{" "}
                  </label>
                   </div>
                  <Field
                    name="notification_message"
                    type="text"
                    component={InputFieldTextArea}
                    validate={[required, minLength5]}
                    cols="40"
                    rows="3"
                  />
                <div>
                  <label>
                    Image URL
                  </label>
                </div>
                    <Field
                      name="notification_image"
                      type="text"
                      component={InputFieldTextArea}
                      validate={[is_url]}
                      cols="40"
                      rows="3"
                    />

                    <div className="float-right">
                      <Button type="submit" disabled={pristine || submitting}>
                        Submit
                      </Button>
                    </div>
                    </form>
            
          </CardBody>
        </Card>

          {/*<Modal isOpen={this.state.notificationPopUp} toggle={this.onNotificationPopUp}className={this.props.className} backdrop={true}>
          <ModalHeader toggle={this.onNotificationPopUp}>Notification</ModalHeader>
          <ModalBody>
            {/* <form onSubmit={handleSubmit(this.onSendPushNotification)} className="product_form">


           

              <div>
                <label>
                  TITLE <span className="must">*</span>{" "}
                </label>
              </div>
              <Field
                name="notification_titel"
                type="text"
                component={InputField}
                validate={[required, minLength5]}
                cols="40"
                rows="3"
              />
              <div>
                <label>
                  Message <span className="must">*</span>{" "}
                </label>
              </div>
              <Field
                name="notification_message"
                type="text"
                component={InputFieldTextArea}
                validate={[required, minLength5]}
                cols="40"
                rows="3"
              />

              <div>
                <label>
                  Image URL
                </label>
              </div>
              <Field
                name="notification_image"
                type="text"
                component={InputFieldTextArea}
                validate={[is_url]}
                cols="40"
                rows="3"
              />

              <div className="float-right">
                <Button type="submit" disabled={pristine || submitting}>
                  Submit
                </Button>
              </div>
            </form> 
          </ModalBody>
        </Modal>*/}
      </div>
    );
  }
}

Pushnotification = reduxForm({
  form: PUSH_NOTIFICATION_FROM // a unique identifier for this form
})(Pushnotification);

export default connect(mapStateToProps, mapDispatchToProps)(Pushnotification);
