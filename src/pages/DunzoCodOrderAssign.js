import React from "react";
import AxiosRequest from "../AxiosRequest";
import SearchInput from "../components/SearchInput";
//import DateRangePicker from 'react-bootstrap-daterangepicker';
//import moment from "moment";
import PaginationComponent from "react-reactstrap-pagination";
import MessageView from "../components/MessageView";

import {
  DUNZO_COD_ORDERS_ALL_LIST,
  DUNZO_COD_ORDERS_FILTER_LIST,
  DUNZO_ORDERS_ASSIGN,
  ORDER_DELIVED_BY_ADMIN,
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
  ButtonGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { Link } from "react-router-dom";
import { MasterOrderStatus } from "../utils/constant";
import {
  getOrderStatus,
  getOrderStatusColor,
  getpaymentTypeColor,
  getpaymentStatusColor,
  getAdminId,
} from "../utils/ConstantFunction";
import Moment from "moment";

const defultPage = 1;
const pagelimit = 20;
const moveitFilterlist = [
  { id: -1, name: "ALL" },
  { id: 0, name: "Eat" },
  { id: 1, name: "Dunzo" },
];
const moveitName = { "-1": "ALL", 0: "Eat", 1: "Dunzo" };
const mapStateToProps = (state) => ({ ...state.dunzocodorders });

const mapDispatchToProps = (dispatch) => ({
  onGetOrders: (data) =>
    dispatch({
      type: DUNZO_COD_ORDERS_ALL_LIST,
      payload: AxiosRequest.Moveit.getDunzocodOrders(data),
    }),
  onSetFilter: (orderType, search, selectedPage, moveitfilter) =>
    dispatch({
      type: DUNZO_COD_ORDERS_FILTER_LIST,
      orderType,
      search,
      selectedPage,
      moveitfilter,
    }),
  onDunzoorderassign: (allocationData) =>
    dispatch({
      type: DUNZO_ORDERS_ASSIGN,
      payload: AxiosRequest.Moveit.dunzoassignOrder(allocationData),
    }),
    onDunzoorderremove: (allocationData) =>
    dispatch({
      type: DUNZO_ORDERS_ASSIGN,
      payload: AxiosRequest.Moveit.orderunassigntoDunzo(allocationData),
    }),
  onOrderDelived: (data) =>
    dispatch({
      type: ORDER_DELIVED_BY_ADMIN,
      payload: AxiosRequest.Orders.ordersDelivedByAdmin(data),
    }),

  // onSelectedOrdersTabs: filter_id =>
  // dispatch({ type: ORDERS_TABS_CLICK, selectedtab: filter_id }),
});

function CardRowCol(props) {
  var lg = props.lg ? props.lg : "12";
  var value_color = props.color ? props.color : "black";
  var lable = props.lable ? props.lable : "";
  if (props.value) {
    return (
      <Row className="list-text">
        <Col lg={lg} className="lable" style={{ color: "gray" }}>
          {lable}
        </Col>
        <Col lg="8" style={{ color: value_color }}>
          {props.value}
        </Col>
      </Row>
    );
  }
  return <div></div>;
}

function ActionButton(props) {
  var item = props.item;
  if (item.orderstatus < 5) {
    return (
      <Row className="float-right">
        <Col>
          <Button
            color="primary"
            className="txt-align-right"
            onClick={props.removeOrder}
            size="sm"
          >
            Remove
          </Button>
        </Col>
        <Col>
          <Button
            color="primary"
            className="txt-align-right"
            onClick={props.assignOrder}
            size="sm"
          >
            Pickup
          </Button>
        </Col>
      </Row>
    );
  } else if (item.orderstatus === 5) {
    return (
      <Row className="float-right">
        <Col>
          <Button
            color="primary"
            className="txt-align-right"
            onClick={props.removeOrder}
            size="sm"
          >
            Remove
          </Button>
        </Col>
        <Col>
          <Button onClick={props.orderDelived} size="sm">
            Delivered
          </Button>
        </Col>
      </Row>
    );
  }
  return <div></div>;
}

class DunzoCodOrderAssign extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPage: 1,
      dropdownOpen: false,
      dropdownname: moveitName[this.props.moveitfilter],
    };
   
  }

  toggleDropDown() {
    this.setState((prevState) => ({
      dropdownOpen: !prevState.dropdownOpen,
    }));
  }

  handleSelected(selectedPage) {
    this.props.onSetFilter(
      this.props.orderType,
      this.props.search,
      selectedPage,
      this.props.moveitfilter
    );
    this.onFiltersApply(
      this.props.orderType,
      this.props.search,
      selectedPage,
      this.props.moveitfilter
    );
  }

  componentWillMount() {
    //this.props.onLoad();
    this.onFiltersApply(
      this.props.orderType,
      this.props.search,
      this.props.selectedPage,
      this.props.moveitfilter
    );
    this.props.onSetFilter(
      this.props.orderType,
      this.props.search,
      defultPage,
      this.props.moveitfilter
    );

    this.assignOrder = this.assignOrder.bind(this);
    this.handleSelected = this.handleSelected.bind(this);
    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.removeOrder = this.removeOrder.bind(this);
    
    this.onConfrimTodunzo = this.onConfrimTodunzo.bind(this);
    this.toggleDunzoPopup = this.toggleDunzoPopup.bind(this);
    this.onDelivery = this.onDelivery.bind(this);
    this.onSearch = (e) => {
      this.props.onSetFilter(
        this.props.orderType,
        e.target.value,
        defultPage,
        this.props.moveitfilter
      );
      this.onFiltersApply(
        this.props.orderType,
        e.target.value,
        defultPage,
        this.props.moveitfilter
      );
      //}
    };

    this.filter = (id) => (ev) => {
      ev.preventDefault();
      this.props.onSetFilter(
        id,
        this.props.search,
        defultPage,
        this.props.moveitfilter
      );
      this.onFiltersApply(
        id,
        this.props.search,
        defultPage,
        this.props.moveitfilter
      );
    };

    this.filterMoveit = (item) => (ev) => {
      ev.preventDefault();
      this.setState({ dropdownname: item.name });
      this.props.onSetFilter(
        this.props.orderType,
        this.props.search,
        defultPage,
        item.id
      );
      this.onFiltersApply(
        this.props.orderType,
        this.props.search,
        defultPage,
        item.id
      );
    };
  }

  componentDidUpdate(nextProps, nextState) {
    if (this.props.orderupdatestatus) {
      this.onFiltersApply(
        this.props.orderType,
        this.props.search,
        this.props.selectedPage,
        this.props.moveitfilter
      );
      if (this.state.orderAssignDunzo) {
        this.toggleDunzoPopup();
      }
      //this.props.onGetOrders(this.props.selectedtab);
    }
  }

  onFiltersApply(vId, search, page, moveitfilter) {
    var orderstatus = vId === -1 ? "all" : vId;
    var filter = { order_status: orderstatus};
    this.props.onGetOrders(filter);
  }

  getOrderStatus(item) {
    var orderstatus = item.orderstatus || 0;
    orderstatus = orderstatus > 6 ? 0 : orderstatus;
    var morder = MasterOrderStatus[orderstatus];
    return morder;
  }

  assignOrder = (item) => {
    var data = {};
    data.orderid = item.orderid;
    if (item.delivery_vendor === 0) {
      data.order_status = 1; //duzo order assign
    } else if (item.delivery_vendor === 1 && item.orderstatus < 5) {
      data.order_status = 2; //dunzo orderstatus move to pickup
    }

    this.props.onDunzoorderassign(data);
  };

  onConfrimTodunzo=()=> {
    var data = {};
    data.orderid = this.state.unAssignItem.orderid;
    data.removetodunzo = 1;
    this.props.onDunzoorderremove(data);
  }

  toggleDunzoPopup=()=>{
    this.setState((prevState) => ({
      orderAssignDunzo: !prevState.orderAssignDunzo,
    }));
  }

  removeOrder = (item) => {
    this.setState((prevState) => ({
      unAssignItem: item,
    }));
    this.toggleDunzoPopup();
  };

  onDelivery = (item) => {
    var data = {
      orderid: item.orderid,
      reason: "Dunzo Delivered",
      admin_id: getAdminId(),
      moveit_user_id: 0,
    };
    this.props.onOrderDelived(data);
  };


  render() {
    const orderslist = this.props.orderslist || [];
    const filterTabs = this.props.orderType;
    return (
      <div className="pd-8">
        <div>
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  ORDERS
                  <Row className="float-right">
                    <Col>
                      <ButtonGroup size="sm">
                        <Button
                          color="primary"
                          onClick={this.filter(1)}
                          active={filterTabs === 1}
                        >
                          Move to pickup
                        </Button>
                        <Button
                          color="primary"
                          onClick={this.filter(5)}
                          active={filterTabs === 5}
                        >
                          Move to Delivery
                        </Button>
                        {/* <Button
                              color="primary"
                              onClick={() => this.filterOrders(3)}
                              active={filterTabs === 3}
                            >
                              Accepted
                            </Button> */}
                        {/* <Button
                              color="danger"
                              onClick={() => this.filterOrders(4)}
                              active={filterTabs === 4}
                            >
                              Above 45 min
                            </Button> */}
                      </ButtonGroup>
                    </Col>
                    <Col>
                      {/* <Button
                        className="mr-r-10"
                        onClick={() =>
                          this.filter(this.props.selectedtab)
                        }
                      >
                        Refresh
                          </Button> */}
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody className="scrollbar pd-0">
                  <ListGroup
                    flush
                    hidden={!orderslist || orderslist.length === 0}
                  >
                    {orderslist.map((item, i) => (
                      <ListGroupItem key={i} className="list-text">
                        <Row>
                          <Col lg="12">
                            <Row>
                              <Col lg="9">
                                <h5> Order ID # {item.orderid}</h5>
                              </Col>
                              <Col lg="3">
                              <ActionButton
                                  item={item}
                                  assignOrder={() => this.assignOrder(item)}
                                  removeOrder={() => this.removeOrder(item)}
                                  orderDelived={() => this.onDelivery(item)}
                                />
                              </Col>
                            </Row>

                            <CardRowCol
                              lg="4"
                              lable={"Name:"}
                              value={item.name}
                            ></CardRowCol>
                            <CardRowCol
                              lg="4"
                              lable={"PRICE:"}
                              value={item.price}
                            ></CardRowCol>
                            <CardRowCol
                              lg="4"
                              lable={""}
                              value={item.address}
                            ></CardRowCol>
                            <CardRowCol
                              lg="4"
                              lable={"Order Time:"}
                              value={Moment(item.ordertime).format(
                                "DD-MMM-YYYY hh:mm a"
                              )}
                            ></CardRowCol>

                            <CardRowCol
                              lg="4"
                              lable={"Kitchen name:"}
                              value={item.brandname}
                            ></CardRowCol>

                            <CardRowCol
                              lg="4"
                              lable={"Kitchen Type:"}
                              value={item.virtualkey ? "Virtual" : "Real"}
                              color={item.virtualkey ? "blue" : "red"}
                            ></CardRowCol>
                            <Row hidden={!item.moveit_user_id}>
                              <Col lg="12">
                                <hr class="style-moveit" />
                                <CardRowCol
                                  lg="4"
                                  lable={"Moveit ID:"}
                                  value={"# " + item.moveit_user_id}
                                ></CardRowCol>
                                <CardRowCol
                                  lg="4"
                                  lable={"Moveit Name:"}
                                  value={item.moveit_name}
                                ></CardRowCol>
                                <CardRowCol
                                  lg="4"
                                  lable={"Moveit Phone:"}
                                  value={item.moveit_phoneno}
                                ></CardRowCol>
                              </Col>
                            </Row>
                          </Col>
                          <Col className="float-right">
                            <div>
                              {item.status === "Active" ? (
                                <span style={{ color: "blue" }}>
                                  {item.status}
                                </span>
                              ) : (
                                <span style={{ color: "red" }}>
                                  {item.status}
                                </span>
                              )}
                            </div>
                          </Col>
                        </Row>
                      </ListGroupItem>
                    ))}
                  </ListGroup>
                  <div hidden={orderslist.length !== 0}>
                    <MessageView message="Sorry!!,Orders not available"></MessageView>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          {/* <Row style={{ marginTop: "10px" }} hidden={selectedIndex === -1}>
                <Col>
                  <Card>
                    <CardHeader>
                      <Row>
                        <Col>{selectedItem.name}</Col>
                        <Col>=></Col>
                        <Col>{selectedMoveitItem.name}</Col>
                        <Col>
                          <Button
                            onClick={this.toAssignOrder()}
                            disabled={selectedMoveitndex === -1}
                          >
                            {filterTabs === 1 ? "Assign" : "ReAssign"}
                          </Button>
                        </Col>
                      </Row>
                    </CardHeader>
                  </Card>
                </Col>
              </Row> */}
        </div>
        <Modal
          isOpen={this.state.orderAssignDunzo}
          toggle={this.toggleDunzoPopup}
          className={this.props.className}
          backdrop={true}
        >
          <ModalHeader toggle={this.toggleDunzoPopup}>
            Confirm message
          </ModalHeader>
          <ModalBody>Are you sure you want to remove the order?</ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.onConfrimTodunzo}>
              Yes
            </Button>{" "}
            <Button color="secondary" onClick={this.toggleDunzoPopup}>
              NO
            </Button>
          </ModalFooter>
        </Modal>
        {/* <Modal
              isOpen={this.state.reorderAssignModal}
              toggle={this.toggleReorderPopup}
              className={this.props.className}
              backdrop={true}
            >
              <ModalHeader toggle={this.toggleReorderPopup}>
                Reason
              </ModalHeader>
              <ModalBody>
                <form
                  onSubmit={handleSubmit(this.reorederAssignConfirm)}
                  className="product_form"
                >
                  <Field
                    name="reason"
                    type="text"
                    component={InputField}
                    validate={[required, minLength5, maxLength160]}
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
            </Modal> */}
      </div>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DunzoCodOrderAssign);
