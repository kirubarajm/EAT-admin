import React from "react";
import AxiosRequest from "../AxiosRequest";
import Moment from "moment";
import MessageView from "../components/MessageView";
import { getAdminId } from "../utils/ConstantFunction";
import {
  ORDERS_LIST,
  ORDERS_ITEM_CLICK,
  MOVEIT_LIST,
  MOVEIT_ITEM_CLICK,
  MOVEIT_ORDERS_ASSIGN,
  ORDERS_MOVETO_DUNZO,
  ORDERS_TABS_CLICK,
  MOVEIT_ORDERS_UN_ASSIGN,
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
import SearchInput from "../components/SearchInput";
import { ORDER_REASSIGN_REASON, ORDER_AUTO_ASSIGN } from "../utils/constant";
import { Field, reduxForm, change } from "redux-form";
import { required, minLength5, maxLength160 } from "../utils/Validation";

const mapStateToProps = (state) => ({ ...state.ordersassign });

const mapDispatchToProps = (dispatch) => ({
  onGetOrders: (filter_id) =>
    dispatch({
      type: ORDERS_LIST,
      payload: AxiosRequest.Moveit.getOrders(filter_id),
    }), //data.appointment
  onGetMoveitman: (data) =>
    dispatch({
      type: MOVEIT_LIST,
      payload: AxiosRequest.Moveit.getNearByMoveit(data),
    }), //salesman.salesmanList
  onSelectedOrders: (index) =>
    dispatch({ type: ORDERS_ITEM_CLICK, selectedIndex: index }),
  onSelectedOrdersTabs: (filter_id) =>
    dispatch({ type: ORDERS_TABS_CLICK, selectedtab: filter_id }),
  onSelectedMovieitMan: (index) =>
    dispatch({ type: MOVEIT_ITEM_CLICK, selectedMoveitndex: index }),
  onAssignOrder: (allocationData) =>
    dispatch({
      type: MOVEIT_ORDERS_ASSIGN,
      payload: AxiosRequest.Moveit.assignOrder(allocationData),
    }),
  onReAssignOrder: (allocationData) =>
    dispatch({
      type: MOVEIT_ORDERS_ASSIGN,
      payload: AxiosRequest.Moveit.reassignOrder(allocationData),
    }),
  onOrdersUnAssign: (data) =>
    dispatch({
      type: MOVEIT_ORDERS_UN_ASSIGN,
      payload: AxiosRequest.Moveit.orderUnassign(data),
    }),
    onOrderMovetoDunzo: (data) =>
    dispatch({
      type: ORDERS_MOVETO_DUNZO,
      payload: AxiosRequest.Moveit.ordermovetoDunzo(data),
    }),
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

class OrderAssignPage extends React.Component {
  componentWillMount() {
    this.toggleReorderPopup = this.toggleReorderPopup.bind(this);
    this.reorederAssignConfirm = this.reorederAssignConfirm.bind(this);
    this.orderUnAssign = this.orderUnAssign.bind(this);
    this.toggleDunzoPopup=this.toggleDunzoPopup.bind(this);
    this.orderDunAssign=this.orderDunAssign.bind(this);
    this.onConfrimTodunzo=this.onConfrimTodunzo.bind(this);
    this.setState({
      reorderAssignModal: false,
      orderUnAssign: false,
      unAssignItem: false,
      orderAssignDunzo: false,
    });
    this.props.onGetOrders(this.props.selectedtab);
    //this.getMoveitMans();

    this.selectedOrders = (id, item) => (ev) => {
      ev.preventDefault();
      this.getMoveitMans("", item.makeit_lat, item.makeit_lon, item.zone);
      this.props.onSelectedOrders(id);
    };

    this.selectedMovieitMan = (id) => (ev) => {
      ev.preventDefault();
      this.props.onSelectedMovieitMan(id);
    };

    this.toAssignOrder = () => (ev) => {
      ev.preventDefault();
      if (this.props.selectedItem && this.props.selectedItem.moveit_user_id) {
        this.toggleReorderPopup();
      } else {
        var adminId = getAdminId();
        var allocationData = {
          orderid: this.props.selectedItem.orderid,
          moveit_user_id: this.props.selectedMoveitItem.userid,
          assignedby: adminId,
          status: 1,
          admin_id: adminId,
        };
        this.props.onAssignOrder(allocationData);
      }
    };

    this.onSearch = (e) => {
      if (e.keyCode === 13 && e.shiftKey === false) {
        e.preventDefault();
        this.getMoveitMans(
          e.target.value,
          this.props.selectedItem.makeit_lat,
          this.props.selectedItem.makeit_lon,
          this.props.selectedItem.zone
        );
      }
    };

    this.onMoveitRefresh = () => {
      this.getMoveitMans(
        "",
        this.props.selectedItem.makeit_lat,
        this.props.selectedItem.makeit_lon,
        this.props.selectedItem.zone
      );
    };

    this.filterOrders = this.filterOrders.bind(this);
  }

  toggleReorderPopup() {
    this.setState((prevState) => ({
      reorderAssignModal: !prevState.reorderAssignModal,
    }));
  }

  reorederAssignConfirm(value) {
    if (this.state.orderUnAssign) {
      this.props.onOrdersUnAssign({
        orderid: this.state.unAssignItem.orderid,
        moveit_user_id: this.state.unAssignItem.moveit_user_id,
        reason: value.reason,
        admin_id: getAdminId(),
      });
    } else {
      this.props.onReAssignOrder({
        orderid: this.props.selectedItem.orderid,
        moveit_user_id: this.props.selectedMoveitItem.userid,
        reason: value.reason,
        admin_id: getAdminId(),
      });
    }
  }

  orderUnAssign = (Item) => (ev) => {
    ev.stopPropagation();
    this.setState((prevState) => ({
      orderUnAssign: !prevState.orderUnAssign,
      unAssignItem: Item,
    }));
    this.toggleReorderPopup();
  };

  filterOrders(filterid) {
    this.props.onGetOrders(filterid);
    this.props.onSelectedOrdersTabs(filterid);
  }
  getMoveitMans = (search, lat, lon, zone) => {
    var param = {};
    param.geoLocation = [lat, lon];
    param.zone = zone;
    if (search) param.search = search;
    this.props.onGetMoveitman(param);
  };
  componentDidUpdate(nextProps, nextState) {
    if (this.props.orderstatus) {
      this.props.onGetOrders(this.props.selectedtab);
      if (this.state.reorderAssignModal) {
        this.props.dispatch(change(ORDER_REASSIGN_REASON, "reason", " "));
        this.setState((prevState) => ({
          reorderAssignModal: !prevState.reorderAssignModal,
          orderUnAssign: false,
        }));
      }

      if(this.state.orderAssignDunzo){
        this.toggleDunzoPopup();
      }
    }
  }

  orderDunAssign = (Item) => (ev) => {
    ev.stopPropagation();
    this.setState(({
      unAssignItem: Item,
    }));
    this.toggleDunzoPopup();
  };

  toggleDunzoPopup() {
    this.setState((prevState) => ({
      orderAssignDunzo: !prevState.orderAssignDunzo,
    }));
  }
  onConfrimTodunzo() {
    this.props.onOrderMovetoDunzo({
      orderid: this.state.unAssignItem.orderid,
      order_status:1,
      admin_id: getAdminId(),
    });
  }

  render() {
    const handleSubmit = this.props.handleSubmit;
    const pristine = this.props.pristine;
    const submitting = this.props.submitting;

    const orderslist = this.props.orderslist || [];
    const selectedItem = this.props.selectedItem;
    const selectedIndex = this.props.selectedIndex;

    const moveitmanlist = this.props.moveitmanlist || [];
    const selectedMoveitndex = this.props.selectedMoveitndex;
    const selectedMoveitItem = this.props.selectedMoveitItem;
    const filterTabs = this.props.selectedtab;
    return (
      <div className="pd-8">
        <div>
          <Row>
            <Col lg="6" md="12" sm="12" xs="12">
              <Card>
                <CardHeader>
                  ORDERS
                  <Row className="float-right">
                    <Col>
                      <ButtonGroup size="sm">
                        <Button
                          color="primary"
                          onClick={() => this.filterOrders(1)}
                          active={filterTabs === 1}
                        >
                          UnAssign
                        </Button>
                        <Button
                          color="primary"
                          onClick={() => this.filterOrders(2)}
                          active={filterTabs === 2}
                        >
                          UnAccepted
                        </Button>
                        <Button
                          color="primary"
                          onClick={() => this.filterOrders(3)}
                          active={filterTabs === 3}
                        >
                          Accepted
                        </Button>
                        <Button
                          color="danger"
                          onClick={() => this.filterOrders(4)}
                          active={filterTabs === 4}
                        >
                          Above 45 min
                        </Button>
                      </ButtonGroup>
                    </Col>
                    <Col>
                      <Button
                        size="sm"
                        className="mr-r-10"
                        onClick={() =>
                          this.filterOrders(this.props.selectedtab)
                        }
                      >
                        Refresh
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody className="scrollbar-assign">
                  <ListGroup
                    flush
                    hidden={!orderslist || orderslist.length === 0}
                  >
                    {orderslist.map((item, i) => (
                      <ListGroupItem
                        key={i}
                        className="list-text"
                        style={
                          selectedIndex === i
                            ? { backgroundColor: "#95f08c" }
                            : { backgroundColor: "#FFF" }
                        }
                        onClick={this.selectedOrders(i, item)}
                      >
                        <Row>
                          <Col lg="12">
                            <Row>
                              <Col lg="6" className="font-size-14">
                                <div> Order ID # {item.orderid}</div>
                              </Col>
                              <Col lg="6">
                                <Button
                                  size="sm"
                                  color="info"
                                  hidden={item.moveit_user_id!==undefined}
                                  onClick={this.orderDunAssign(item)}
                                >
                                  Dunzo
                                </Button>
                                <Button
                                  size="sm"
                                  color="info"
                                  hidden={item.moveit_user_id==null}
                                  color="info"
                                  className="txt-align-right mr-l-10"
                                  onClick={this.orderUnAssign(item)}
                                >
                                  UnAssign
                                </Button>
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
                            >
                              &#8377;
                            </CardRowCol>
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
                            {/*
                                                        <div style={{ color: "black", fontSize: "14px" }}><span style={{ color: "gray" }}>Name :  </span>{item.name}</div>
                                                        <div style={{ color: "black", fontSize: "14px" }}><span style={{ color: "gray" }}>PRICE : &#8377; </span>{item.price}</div>
                                                        <div style={{ color: "black", fontSize: "14px" }}><span style={{ color: "gray" }}>GST : &#8377; </span>{item.gst}</div>
                                                        <div style={{ color: "black", fontSize: "14px" }}><span style={{ color: "gray" }}>Delivery Charge : &#8377; </span>{item.delivery_charge}</div> 
                                                        <div style={{ color: "black", fontSize: "14px" }}> {item.address}</div>
                                                        <br></br>
                                                        <div style={{ color: "black", fontSize: "14px" }}> <span style={{ color: "gray" }}>Order Time: </span>{Moment(item.ordertime).format('DD-MMM-YYYY hh:mm a')} </div>
                                                    */}
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

            <Col hidden={selectedIndex === -1}>
              <Card>
                <CardHeader>
                  Moveit Man
                  <Row className="float-right">
                    <SearchInput onSearch={this.onSearch} />
                    <Button
                      size="sm"
                      className="mr-l-10"
                      onClick={this.onMoveitRefresh}
                    >
                      Refresh
                    </Button>
                  </Row>
                </CardHeader>
                <CardBody>
                  <ListGroup flush className="scrollbar-assign">
                    {moveitmanlist.map((item, i) => (
                      <ListGroupItem
                        key={i}
                        className="list-text"
                        style={
                          selectedMoveitndex === i
                            ? { backgroundColor: "#95f08c" }
                            : { backgroundColor: "#FFF" }
                        }
                        onClick={this.selectedMovieitMan(i)}
                      >
                        <Row>
                          <Col>
                            <h5 style={{ textTransform: "capitalize" }}>
                              {" "}
                              {item.name}
                            </h5>
                            {/* <div style={{ color: "gray", fontSize: "14px" }}> {item.address}</div> */}
                            <CardRowCol
                              lg="4"
                              lable={"Distance:"}
                              value={item.distance + " km"}
                            ></CardRowCol>
                            {/* <CardRowCol lg='4' lable={'Address:'} value={item.address}></CardRowCol>
                                                        <CardRowCol lg='4' lable={'Email:'} value={item.email}></CardRowCol> */}
                            <CardRowCol
                              lg="4"
                              lable={"Mobile No:"}
                              value={item.phoneno}
                            ></CardRowCol>

                            <CardRowCol
                              lg="4"
                              lable={"Hub ID:"}
                              value={item.moveit_hub || ""}
                            ></CardRowCol>

                            <CardRowCol
                              lg="4"
                              lable={"Zone ID:"}
                              value={item.zone}
                            ></CardRowCol>

                            <CardRowCol
                              lg="4"
                              lable={"Zone Name:"}
                              value={item.Zonename}
                            ></CardRowCol>
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
            <Col>
              <Card>
                <CardHeader>
                  <Row>
                    <Col>{selectedItem.name}</Col>
                    <Col>{"=>"}</Col>
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
          </Row>
        </div>
        <Modal
          isOpen={this.state.reorderAssignModal}
          toggle={this.toggleReorderPopup}
          className={this.props.className}
          backdrop={true}
        >
          <ModalHeader toggle={this.toggleReorderPopup}>Reason</ModalHeader>
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
        </Modal>


        <Modal
          isOpen={this.state.orderAssignDunzo}
          toggle={this.toggleDunzoPopup}
          className={this.props.className}
          backdrop={true}
        >
          <ModalHeader toggle={this.toggleDunzoPopup}>Confirm message</ModalHeader>
          <ModalBody>
           Are you sure you want to assign to dunzo?
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.onConfrimTodunzo}>
              Yes
            </Button>{" "}
            <Button color="secondary" onClick={this.toggleDunzoPopup}>
              NO
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
OrderAssignPage = reduxForm({
  form: ORDER_REASSIGN_REASON, // a unique identifier for this form
})(OrderAssignPage);
export default connect(mapStateToProps, mapDispatchToProps)(OrderAssignPage);
