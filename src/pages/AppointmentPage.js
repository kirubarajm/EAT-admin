import React from "react";
import {
  APPOINTMENT_LIST,
  APPOINTMENT_ITEM_CLICK,
  SALESMAN_LIST,
  SALESMAN_ITEM_CLICK,
  SALES_APPOINTMENT_ASSIGN,
  SALES_APPOINTMENT_CANCEL,
  SALES_APPOINTMENT_RESCHEDULE
} from "../constants/actionTypes";
import { connect } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Card,
  CardBody,
  CardHeader,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import { Field, reduxForm } from "redux-form";
import AxiosRequest from "../AxiosRequest";
import Moment from "moment";
import MessageView from "../components/MessageView";
import SearchInput from "../components/SearchInput";
import { APPOINTMENT_CANCEL_REASON } from "../utils/constant";
import { required, minLength5, maxLength160 } from "../utils/Validation";
//import DateRangePicker from "react-bootstrap-daterangepicker";
import InputTextArea from "../components/InputTextArea";


const mapStateToProps = state => ({ ...state.appointment });

const mapDispatchToProps = dispatch => ({
  onGetAppoinment: () =>
    dispatch({
      type: APPOINTMENT_LIST,
      payload: AxiosRequest.Sales.getAppointments()
    }), //data.appointment
  onGetSalesman: data =>
    dispatch({ type: SALESMAN_LIST, payload: AxiosRequest.Sales.getAll(data) }), //salesman.salesmanList
  onSelectedAppointment: index =>
    dispatch({ type: APPOINTMENT_ITEM_CLICK, selectedIndex: index }),
  onSelectedSalesMan: index =>
    dispatch({ type: SALESMAN_ITEM_CLICK, selectedSalesIndex: index }),
  onAssignAppointment: allocationData =>
    dispatch({
      type: SALES_APPOINTMENT_ASSIGN,
      payload: AxiosRequest.Sales.setAppointment(allocationData)
    }),
  onAppointmentCancel: data =>
    dispatch({
      type: SALES_APPOINTMENT_CANCEL,
      payload: AxiosRequest.Sales.appointmentCancel(data)
    }),
    onAppointmentReschedule: data =>
    dispatch({
      type: SALES_APPOINTMENT_RESCHEDULE,
      payload: AxiosRequest.Sales.appointmentReschedule(data)
    })
});

var filterSalesman = { search: "" };
var appointment_id = 0;
var startDate;

class AppointmentPage extends React.Component {
  componentWillMount() {
    this.props.onGetAppoinment();
    this.getSalesMans();
    this.selectedAppointment = id => ev => {
      ev.preventDefault();
      this.props.onSelectedAppointment(id);
    };

    this.selectedSalesMan = id => ev => {
      ev.preventDefault();
      this.props.onSelectedSalesMan(id);
    };

    this.toAssignAppoinment = () => ev => {
      ev.preventDefault();
      var status = this.props.selectedItem.status || 0;
      var allocationData = {
        makeit_userid: this.props.selectedItem.userid,
        sales_emp_id: this.props.selectedSalesItem.id,
        assignedby: 1,
        status: status === 0 ? 2 : 4,
        aid: this.props.selectedItem.aid
      };
      //console.log(new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(today)); //, hour: '2-digit', minute: '2-digit', second: '2-digit'
      //console.log("allocations--------->"+allocationData.date);
      this.props.onAssignAppointment(allocationData);
    };

    this.onSearch = e => {
      if (e.keyCode === 13 && e.shiftKey === false) {
        e.preventDefault();
        filterSalesman = { search: e.target.value };
        this.getSalesMans();
      }
    };
    this.toggleCancelPopup = this.toggleCancelPopup.bind(this);
    this.appointmentCancelConfirm = this.appointmentCancelConfirm.bind(this);
    this.daterangSelect = this.daterangSelect.bind(this);
    this.onReschedule = this.onReschedule.bind(this);
    this.UpdateReschedule=this.UpdateReschedule.bind(this);
    this.toggleReschedule=this.toggleReschedule.bind(this);
    this.setState({ appointmentCancelModal: false,selecteddate: 0,rescheduleModal:false });
  }

  onReschedule= () => ev =>{
    ev.stopPropagation();
  }
  daterangSelect(event, picker) {
    event.stopPropagation();
    startDate = picker.startDate.format("YYYY-MM-DD HH:mm:ss");
    this.setState({ selecteddate: startDate });
    this.toggleReschedule();
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
      cancel_reason: value.reason,
      status:6
    });
  }

  appointmentCancel = (appointmentid) => ev => {
    ev.stopPropagation();
    appointment_id = appointmentid;
    this.toggleCancelPopup();
  };

  getSalesMans = () => {
    this.props.onGetSalesman(filterSalesman);
  };
  componentDidUpdate(nextProps, nextState) {
    if (this.props.appointmentstatus) {
      this.props.onGetAppoinment();
    }
    
    if(this.props.appointmentReschedule){
        if(this.state.rescheduleModal){
          this.setState(prevState => ({
            rescheduleModal: !prevState.rescheduleModal
          }));
          this.props.onGetAppoinment();
  
        }
      }
  
      if(this.props.appointmentCancel){
        if(this.state.appointmentCancelModal){
          this.setState(prevState => ({
            appointmentCancelModal: !prevState.appointmentCancelModal
          }));
          this.props.onGetAppoinment();
  
        }
      }
  }

  render() {
    const handleSubmit = this.props.handleSubmit;
    const pristine = this.props.pristine;
    const submitting = this.props.submitting;

    const appointmentlist = this.props.appointmentlist;
    const selectedItem = this.props.selectedItem;
    const selectedIndex = this.props.selectedIndex;

    const salesmanlist = this.props.salesmanlist;
    const selectedSalesIndex = this.props.selectedSalesIndex;
    const selectedSalesItem = this.props.selectedSalesItem;
    return (
      <div className="pd-8">
        <div hidden={!appointmentlist || appointmentlist.length === 0}>
          <Row>
            <Col lg="6" md="6" sm="6" xs="6">
              <Card>
                <CardHeader>
                  APPOINTMENT
                  <Row className="float-right">
                    <Col>
                      <Button
                        className="mr-r-10"
                        onClick={this.props.onGetAppoinment}
                      >
                        Refresh
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <ListGroup flush className="scrollbar-assign">
                    {appointmentlist.map((item, i) => (
                      <ListGroupItem
                        key={i}
                        className="list-text"
                        style={
                          selectedIndex === i
                            ? { backgroundColor: "#95f08c" }
                            : { backgroundColor: "#FFF" }
                        }
                        onClick={this.selectedAppointment(i)}
                      >
                        <Row>
                          <Col lg="8" md="8" sm="8" xs="8">
                            <h5>{item.name}</h5>
                          </Col>
                          {/* <Col lg="4" md="4" sm="4" xs="4">
                            <Button
                              color="link"
                              onClick={this.appointmentCancel(item.aid)}
                            >
                              Cancel
                            </Button>
                          </Col> */}
                        </Row>
                        <Row>
                          <Col lg="8" md="8" sm="8" xs="8">
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
                              )}{" "}
                              {/* <DateRangePicker
                                singleDatePicker
                                opens="right"
                                minDate={item.booking_date_time}
                                onApply={this.daterangSelect}
                                timePicker={true}
                              >
                                <Button color="link"  onClick={this.onReschedule()}>Reschedule</Button>
                              </DateRangePicker> */}
                            </div>
                            <div style={{ color: "gray", fontSize: "14px" }}>
                              {" "}
                              <span style={{ color: "black" }}>
                                Contact:{" "}
                              </span>{" "}
                              {item.email} | {item.phoneno}
                            </div>
                          </Col>
                        </Row>
                      </ListGroupItem>
                    ))}
                  </ListGroup>
                </CardBody>
              </Card>
            </Col>

            <Col hidden={selectedIndex === -1}>
              <Card>
                <CardHeader>
                  Sales Man
                  <Row className="float-right">
                    <SearchInput onSearch={this.onSearch} />
                    <Button className="mr-l-10" onClick={this.getSalesMans}>
                      Refresh
                    </Button>
                  </Row>
                </CardHeader>
                <CardBody>
                  <ListGroup flush className="scrollbar-assign">
                    {salesmanlist.map((item, i) => (
                      <ListGroupItem
                        key={i}
                        className="list-text"
                        style={
                          selectedSalesIndex === i
                            ? { backgroundColor: "#95f08c" }
                            : { backgroundColor: "#FFF" }
                        }
                        onClick={this.selectedSalesMan(i)}
                      >
                        <Row>
                          <Col lg="8" md="8" sm="8" xs="8">
                            <h5> {item.name}</h5>
                            <div style={{ color: "gray", fontSize: "14px" }}>
                              {" "}
                              {item.address}
                            </div>
                            <div style={{ color: "gray", fontSize: "14px" }}>
                              {" "}
                              <span style={{ color: "black" }}>
                                Contact:{" "}
                              </span>{" "}
                              {item.email} | {item.phoneno}
                            </div>
                          </Col>

                          <Col
                            lg="4"
                            md="4"
                            sm="4"
                            xs="4"
                            className="txt-align-right"
                            hidden={item.totalassigned === 0}
                          >
                            <div className="circle-bg">
                              {" "}
                              {item.totalassigned}
                            </div>
                          </Col>
                        </Row>
                      </ListGroupItem>
                    ))}
                  </ListGroup>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row style={{ marginTop: "10px" }} hidden={selectedIndex === -1}>
            <Col lg="12" md="12" sm="12" xs="12">
              <Card>
                <CardHeader>
                  <Row>
                    <Col>{selectedItem.name}</Col>
                    <Col>=></Col>
                    <Col>{selectedSalesItem.name}</Col>
                    <Col>
                      <Button
                        onClick={this.toAssignAppoinment()}
                        disabled={selectedSalesIndex === -1}
                      >
                        Assign
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
              </Card>
            </Col>
          </Row>
        </div>
        <div hidden={appointmentlist && appointmentlist.length !== 0}>
          <MessageView message="Sorry!!,Appointments not available" />
        </div>

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

        <Modal isOpen={this.state.rescheduleModal} toggle={this.toggleReschedule} className={this.props.className} backdrop={false}>
          <ModalHeader toggle={this.toggleReschedule}>Confirm to Reschedule</ModalHeader>
          <ModalBody>
                Are you sure you want to reschedule the appointment to {this.state.selecteddate}?
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
      </div>
    );
  }
}

AppointmentPage = reduxForm({
  form: APPOINTMENT_CANCEL_REASON // a unique identifier for this form
})(AppointmentPage);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppointmentPage);
