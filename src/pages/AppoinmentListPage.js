import React from "react";
import {
  APPOINTMENT_LIST_FILTER,
  APPOINTMENT_LIST_SET_FILTER,
  SALES_APPOINTMENT_RESCHEDULE,
  SALES_APPOINTMENT_CANCEL
} from "../constants/actionTypes";
import { connect } from "react-redux";
import DateRangePicker from "react-bootstrap-daterangepicker";
import { Field, reduxForm } from "redux-form";
import {
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Card,
  CardBody,
  CardHeader,
  Button,
  ButtonGroup,
  DropdownToggle,
  DropdownItem,
  ButtonDropdown,
  DropdownMenu,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CardFooter,
} from "reactstrap";
import PaginationComponent from "react-reactstrap-pagination";
import AxiosRequest from "../AxiosRequest";
import Moment from "moment";
import MessageView from "../components/MessageView";
import { AppoinmentStatus } from "../utils/constant";
import { APPOINTMENT_CANCEL_REASON } from "../utils/constant";
import { required, minLength5, maxLength160 } from "../utils/Validation";
import InputTextArea from "../components/InputTextArea";
import SearchInput from "../components/SearchInput";
const dropDownAppoinment = [
  { id: 0, status: "All" },
  { id: 2, status: "Info" },
  { id: 3, status: "Info Reschedule" },
  { id: 4, status: "Appointment" },
  { id: 5, status: "Appointment Reschedule" },
  { id: 1, status: "Completed" },
  { id: 6, status: "Canceled" }
];
const pagelimit=20;
const mapStateToProps = state => ({ ...state.appointmentlist });

const mapDispatchToProps = dispatch => ({
  onGetAppoinment: data =>
    dispatch({
      type: APPOINTMENT_LIST_FILTER,
      payload: AxiosRequest.Sales.getAllAppointmentsFilter(data)
    }),
  onAppointmentReschedule: data =>
    dispatch({
      type: SALES_APPOINTMENT_RESCHEDULE,
      payload: AxiosRequest.Sales.appointmentReschedule(data)
    }),
    onAppointmentCancel: data =>
    dispatch({
      type: SALES_APPOINTMENT_CANCEL,
      payload: AxiosRequest.Sales.appointmentCancel(data)
    }),
  onSetAppoinmentFilter: (
    appointmentstatusName,
    appointmentstatus,
    page,
    date,
    search,
    dateid
  ) =>
    dispatch({
      type: APPOINTMENT_LIST_SET_FILTER,
      appointmentstatusName,
      appointmentstatus,
      page,
      date,
      search,
      dateid
    }) //data.appointment
});

var today, Tomorrow;
var appointment_id=0;
class AppoinmentListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
      rescheduleModal:false,
      appointmentCancelModal:false,
      selecteddate:0
    };
    this.filterappoinemnt = this.filterappoinemnt.bind(this);
    this.filterDate = this.filterDate.bind(this);
    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.daterangSelect = this.daterangSelect.bind(this);
    this.daterangSelectAppointment = this.daterangSelectAppointment.bind(this);
    this.UpdateReschedule=this.UpdateReschedule.bind(this);
    this.onReschedule=this.onReschedule.bind(this);
    this.toggleReschedule=this.toggleReschedule.bind(this);
    this.toggleCancelPopup = this.toggleCancelPopup.bind(this);
    this.appointmentCancel=this.appointmentCancel.bind(this);
    this.appointmentCancelConfirm = this.appointmentCancelConfirm.bind(this);
    this.handleSelected = this.handleSelected.bind(this);
    this.dropDownAppoinment = Object.keys(AppoinmentStatus).map(function(i) {
      return AppoinmentStatus[i];
    });
    today = Moment(new Date()).format("YYYY-MM-DD");
    Tomorrow = Moment(new Date())
      .add(1, "days")
      .format("YYYY-MM-DD");
  }
  componentWillMount() {
    this.getAppoinment();
    this.onSearch = e => {
         this.props.onSetAppoinmentFilter(this.props.appointmentstatusName,
          this.props.appointmentstatus,
          this.props.page,
          this.props.date,e.target.value,this.props.appointmentDateStatus);
          this.props.onGetAppoinment({
            appointmentstatus: this.props.appointmentstatus,
            date: this.props.date,
            page: this.props.page,
            search:e.target.value
          });
     }
  }

  handleSelected(selectedPage) {
    this.props.onGetAppoinment({
      appointmentstatus: this.props.appointmentstatus,
      date: this.props.date,
      page: selectedPage,
      search:this.props.search
    });
    this.props.onSetAppoinmentFilter(
      this.props.appointmentstatusName,
      this.props.appointmentstatus,
      selectedPage,
      this.props.date,
      this.props.search,
      this.props.appointmentDateStatus
    );
  }

  getAppoinment = () => {
    this.props.onGetAppoinment({
      appointmentstatus: this.props.appointmentstatus,
      page: this.props.page,
      date: this.props.appointmentDate,
      search:this.props.search
    });
  };

  getAppoinmentStatus(id) {
    var status = AppoinmentStatus[id];
    return status;
  }

  componentDidUpdate(nextProps, nextState) {
    if(this.props.appointmentReschedule){
      if(this.state.rescheduleModal){
        this.setState(prevState => ({
          rescheduleModal: !prevState.rescheduleModal
        }));
        this.props.onGetAppoinment({
          appointmentstatus: this.props.appointmentstatus,
          date: this.props.appointmentDate,
          page: this.props.page,
          search:this.props.search
        });

      }
    }

    if(this.props.appointmentCancel){
      if(this.state.appointmentCancelModal){
        this.setState(prevState => ({
          appointmentCancelModal: !prevState.appointmentCancelModal
        }));
        this.props.onGetAppoinment({
          appointmentstatus: this.props.appointmentstatus,
          date: this.props.appointmentDate,
          page: this.props.page,
          search:this.props.search
        });

      }
    }
  }
  toggleDropDown() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }
  filterappoinemnt(item) {
    this.props.onGetAppoinment({
      appointmentstatus: item.id,
      page: this.props.page,
      date: this.props.appointmentDate,
      search:this.props.search
    });
    this.props.onSetAppoinmentFilter(
      item.status,
      item.id,
      this.props.page,
      this.props.appointmentDate,
      this.props.search,
      this.props.appointmentDateStatus
    );
  }

  daterangSelect(event, picker) {
    var startDate = picker.startDate.format("YYYY-MM-DD");
    this.props.onGetAppoinment({
      appointmentstatus: this.props.appointmentstatus,
      date: startDate,
      page: this.props.page,
      search:this.props.search
    });
    this.props.onSetAppoinmentFilter(
      this.props.appointmentstatusName,
      this.props.appointmentstatus,
      this.props.page,
      startDate,
      this.props.search,
      3
    );
  }
  daterangSelectAppointment(event, picker) {
    event.stopPropagation();
    var startDate = picker.startDate.format("YYYY-MM-DD HH:mm:ss");
    this.setState({ selecteddate: startDate });
    this.toggleReschedule();
  }
  onReschedule= (aid) => ev =>{
    ev.stopPropagation();
    appointment_id=aid;
  }
  toggleReschedule() {
    this.setState(prevState => ({
        rescheduleModal: !prevState.rescheduleModal
    }));
  }

  UpdateReschedule(){
    this.props.onAppointmentReschedule({
        aid: appointment_id,
        booking_date_time: this.state.selecteddate
      });
  }

  toggleCancelPopup() {
    this.setState(prevState => ({
      appointmentCancelModal: !prevState.appointmentCancelModal
    }));
  }
  appointmentCancelConfirm(value) {
    this.props.onAppointmentCancel({
      aid: appointment_id,
      cancelled_reason: value.reason,
      status:6
    });
  }

  appointmentCancel = (appointmentid) => ev => {
    ev.stopPropagation();
    appointment_id = appointmentid;
    this.toggleCancelPopup();
  };

  filterDate(id) {
    var date = 0;
    if (id === 1) date = today;
    if (id === 2) date = Tomorrow;
    this.props.onGetAppoinment({
      appointmentstatus: this.props.appointmentstatus,
      date: date,
      page: this.props.page,
      search:this.props.search
    });
    this.props.onSetAppoinmentFilter(
      this.props.appointmentstatusName,
      this.props.appointmentstatus,
      this.props.page,
      date,
      this.props.search,
      id
    );
  }

  render() {
    const handleSubmit = this.props.handleSubmit;
    const pristine = this.props.pristine;
    const submitting = this.props.submitting;

    const appointmentlist = this.props.appointmentlist || [];
    //const appointmentstatus = this.props.appointmentstatus;
    const appointmentstatusName = this.props.appointmentstatusName;
    const appointmentDateStatus = this.props.appointmentDateStatus;
    const appointmentDate = this.props.appointmentDate;
    const totalPagecount =this.props.appointmentcount||0;

    return (
      <div className="pd-8">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                APPOINTMENT / {appointmentDate?appointmentDate:"All"}
                <Row className="float-right">
                <Col className="mr-t-10">
                  <SearchInput onSearch={this.onSearch} value={this.props.search}/>
                 </Col>
                  <Col className="mr-t-10">
                    {/* <ButtonGroup size="sm">
                  <Button
                    color="primary"
                    onClick={()=>this.filterappoinemnt(0)}
                    active={appointmentstatus === 0}
                  >
                    All
                  </Button>
                  
                  <Button
                    color="primary"
                    onClick={()=>this.filterappoinemnt(2)}
                    active={appointmentstatus === 2}>
                    Info
                  </Button>
                  <Button
                    className="hidden_tablet hidden_mobile"
                    color="primary"
                    onClick={()=>this.filterappoinemnt(3)}
                    active={appointmentstatus === 3}
                  >
                    Info Reschedule
                  </Button>
                  <Button
                    color="primary"
                    onClick={()=>this.filterappoinemnt(4)}
                    active={appointmentstatus === 4}
                  >
                    Appointment
                  </Button>
                  <Button
                    color="primary"
                    onClick={()=>this.filterappoinemnt(5)}
                    active={appointmentstatus === 5}
                  >
                    Appointment Reschedule
                  </Button>
                  <Button
                    color="primary"
                    onClick={()=>this.filterappoinemnt(1)}
                    active={appointmentstatus === 1}
                  >
                    Completed
                  </Button>
                </ButtonGroup> */}
                  </Col>
                  <Col className="mr-t-10">
                    <ButtonGroup>
                      <Button
                      color="primary"
                        active={appointmentDateStatus === 0}
                        onClick={() => this.filterDate(0)}
                      >
                        All
                      </Button>
                      <Button
                      color="primary"
                        active={appointmentDateStatus === 1}
                        onClick={() => this.filterDate(1)}
                      >
                        Today
                      </Button>
                      <Button
                      color="primary"
                        active={appointmentDateStatus === 2}
                        onClick={() => this.filterDate(2)}
                      >
                        Tomorrow
                      </Button>
                      {/* <Button
                        size="sm"
                        color="primary"
                        className={'pd-0'}
                        active={appointmentDateStatus === 3}
                      > */}
                        <DateRangePicker singleDatePicker
                          opens="left"
                          onApply={this.daterangSelect}
                        >
                          <Button
                          color="primary"
                            active={appointmentDateStatus === 3}
                          >
                            <i className="far fa-calendar-alt"></i>
                          </Button>
                        </DateRangePicker>
                      {/* </Button> */}
                    </ButtonGroup>
                  </Col>
                  <Col className="mr-t-10">
                    <ButtonDropdown
                      isOpen={this.state.dropdownOpen}
                      toggle={this.toggleDropDown}>
                      <DropdownToggle caret>
                        {appointmentstatusName}
                      </DropdownToggle>
                      <DropdownMenu>
                        {dropDownAppoinment.map((item, index) => (
                          <DropdownItem
                            onClick={() => this.filterappoinemnt(item)}
                            key={index}>
                            {item.status}
                          </DropdownItem>
                        ))}
                      </DropdownMenu>
                    </ButtonDropdown>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody className={totalPagecount<pagelimit?"scrollbar-appointment pd-0":"scrollbar-appointment-footer pd-0"}>
                <Row className="mr-l-10 mr-t-10">
                  <Col lg="1" md="1" sm="1" xs="1">
                    <h5>#</h5>
                  </Col>
                  <Col lg="5" md="5" sm="5" xs="5">
                    <h5>User Detail</h5>
                  </Col>
                  <Col lg="5" md="5" sm="5" xs="5">
                    <h5>Salesman Detail</h5>
                  </Col>
                </Row>
                <hr className="mr-0"></hr>
                <div hidden={appointmentlist && appointmentlist.length !== 0}>
                  <MessageView message="Sorry!!,Appointments not available" />
                </div>
                <ListGroup
                  flush
                  className="pd-0"
                  hidden={!appointmentlist || appointmentlist.length === 0}
                >
                  {appointmentlist.map((item, i) => (
                    <ListGroupItem key={i} className="list-text">
                      <Row>
                        <Col lg="1" md="1" sm="1" xs="1">
                          <strong>{i + 1}</strong>
                        </Col>
                        <Col lg="5" md="5" sm="5" xs="5">
                        <Row>
                          <Col lg="8" md="8" sm="8" xs="8">
                            <h5>{item.makeit_username}</h5>
                          </Col>
                          <Col lg="4" md="4" sm="4" xs="4" hidden={item.status===6 ||item.status===1}>
                            <Button
                              color="link"
                              onClick={this.appointmentCancel(item.aid)}
                            >
                              Cancel
                            </Button>
                          </Col>
                        </Row>
                          <div style={{ color: "gray", fontSize: "14px" }}>
                            ID: #{item.makeit_userid}
                          </div>
                          {/* <div style={{ color: "gray", fontSize: "14px" }}>Kitchen name :{" "}{item.brandname?item.brandname:"-"}</div> */}
                          <div style={{ color: "gray", fontSize: "14px" }}>
                            {" "}
                            {item.address}
                          </div>
                          <br></br>
                          <div style={{ color: "gray", fontSize: "14px" }}>
                            {" "}
                            <span style={{ color: "black" }}>
                              Schedule:
                            </span>{" "}
                            {Moment(item.booking_date_time).format(
                              "DD-MMM-YYYY hh:mm a"
                            )}
                             <DateRangePicker
                                singleDatePicker
                                opens="right"
                                startDate={Moment(item.booking_date_time).format(
                                  "MM-DD-YYYY hh:mm a"
                                )}
                                onApply={this.daterangSelectAppointment}
                                timePicker={true}
                              >
                                <Button color="link"  onClick={this.onReschedule(item.aid)}  hidden={item.status===6 ||item.status===1}>Reschedule</Button>
                              </DateRangePicker>
                          </div>
                          <div style={{ color: "gray", fontSize: "14px" }}>
                            {" "}
                            <span style={{ color: "black" }}>
                              Contact:{" "}
                            </span>{" "}
                            {item.email} | {item.phoneno}
                          </div>
                          <div style={{ color: "gray", fontSize: "14px" }}>
                            <span style={{ color: "black" }}>
                            Status:{" "}
                            </span>{" "}
                            {this.getAppoinmentStatus(item.status)}
                          </div>
                        </Col>

                        <Col
                          lg="5"
                          md="5"
                          sm="5"
                          xs="5"
                          className="pd-l-20"
                          hidden={!item.sales_emp_id}
                        >
                          <h5>{item.salesname}</h5>
                          <div style={{ color: "gray", fontSize: "14px" }}>
                            ID: #{item.sales_emp_id}
                          </div>
                          
                        </Col>
                      </Row>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              </CardBody>
              <CardFooter hidden={totalPagecount<pagelimit}>
                    <div className="float-right">
                        <PaginationComponent
                            totalItems={totalPagecount}
                            pageSize={pagelimit}
                            onSelect={this.handleSelected}
                            activePage={this.props.page}/>
                        </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>

        <Modal isOpen={this.state.rescheduleModal} toggle={this.toggleReschedule} className={this.props.className} backdrop={false}>
          <ModalHeader toggle={this.toggleReschedule}>Confirm to Reschedule</ModalHeader>
          <ModalBody>
                Are you sure you want to reschedule the appointment to {Moment(this.state.selecteddate).format(
                              "DD-MMM-YYYY hh:mm a"
                            )}?
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.UpdateReschedule}>
              Yes
            </Button>{" "}
            <Button color="secondary" onClick={this.toggleReschedule}>
              NO
            </Button>
          </ModalFooter>
        </Modal>

        <Modal
          isOpen={this.state.appointmentCancelModal}
          toggle={this.toggleCancelPopup}
          className={this.props.className}
          backdrop={true}
        >
          <ModalHeader toggle={this.toggleCancelPopup}>
            Cancel Reason
          </ModalHeader>
          <ModalBody>
            <form
              onSubmit={handleSubmit(this.appointmentCancelConfirm)}
              className="product_form"
            >
              <Field
                lg={6}
                md={12}
                sm={4}
                xl={4}
                xs={12}
                name="reason"
                type="text"
                component={InputTextArea}
                validate={[required, minLength5, maxLength160]}
                cols="10"
                rows="3"
              />

              <div className="float-right">
                <Button type="submit" disabled={pristine || submitting}>
                  Submit
                </Button>
              </div>
            </form>
          </ModalBody>
        </Modal>

      </div>
    );
  }
}
AppoinmentListPage = reduxForm({
  form: APPOINTMENT_CANCEL_REASON // a unique identifier for this form
})(AppoinmentListPage);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppoinmentListPage);
