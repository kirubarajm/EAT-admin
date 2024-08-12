import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Row,
  Col
} from "reactstrap";
import Moment from "moment";
import { history } from "../store";
import {
  getOrderStatus,
  getOrderStatusColor
} from "../utils/ConstantFunction";
import { Link } from 'react-router-dom';

function CardRowCol(props) {
  var lg = props.lg ? props.lg : "12";
  var lable = props.lable ? props.lable : "";
  var color = props.color ? props.color : "Black";
  if (props.value !== null) {
    return (
      <Row className="list-text cart-item">
        <Col lg={lg} className="lable">
          {lable}
        </Col>
        <Col lg="7" style={{ color: color }}>
          {props.value}
        </Col>
      </Row>
    );
  }

  return <div />;
}

function lessThanOneDay(date) {
  if (!date) return false;
  const startDate = Moment(date);
  const timeEnd = Moment(new Date());
  const diff = timeEnd.diff(startDate);
  const diffDuration = Moment.duration(diff);
  console.log("Days:", diffDuration.days());
  console.log("Hours:", diffDuration.hours());
  return diffDuration.days() > 0 || diffDuration.hours() > 23;
  //return Moment.unix(date).isAfter(Moment().subtract(24, 'hours'));
}


function OnDelivered(props) {
  if (props.orderstatus<6&&props.payment_status!=2) {
    return (
      <Row className="float-right">
        <Col>
          <Button hidden={props.payment_type == 1||props.payment_status==1} onClick={props.paymentSuccess}>Payment Success</Button>
        </Col>
        <Col>
          <Button disabled={props.payment_status!=1} onClick={props.orderDelived}>Delivered</Button>
        </Col>
      </Row>
    );
  }
  return <div />;
}

function OnCancel(props) {
  if (props.orderstatus<6 && props.payment_status<2) {
    var canceltime=props.orderstatus<3?'Order ':props.orderstatus==3?'Prepared Order ':'Picked Order '
    return (
      <Row className="float-right">
        <Col>
          <Button onClick={props.orderCancel}>{canceltime} Cancel</Button>
        </Col>
      </Row>
    );
  }
  return <div />;
}

function ItemMissing(props) {
  if (props.orderstatus === 6 && !props.item_missing) {
    if (lessThanOneDay(props.delivereddate)) return <div />;
    else
      return (
        <Row className="float-right">
          <Col>
            <Button onClick={props.itemMissingAction}>Item Missing</Button>
          </Col>
        </Row>
      );
  } else if (props.orderstatus === 6 && props.item_missing === 1) {
    return (
      <Row className="float-right">
        <Col>
          <div>Already post</div>
        </Col>
      </Row>
    );
  }
  return <div />;
}

function Zendeskticket_Create(props) {
  if (props.zendesk_ticketid) {
    return (<Row className="float-right">
        <Col className="pd-t-10">
            <a className="text-decoration-underline" href={`https://tovogroup.zendesk.com/agent/tickets/${props.zendesk_ticketid}`} target="_blank">Zendesk Ticket Id: #{props.zendesk_ticketid}</a>
        </Col>
    </Row>)
  } else {
    return (
      <Row className="float-right">
        <Col>
         <Button onClick={props.clicktorequestzendesk}>Raise ticket</Button>
        </Col>
      </Row>
    );
  }
  return <div />;
}

function CardRowColCheck(props) {
  var lg = props.lg ? props.lg : "12";
  var lable = props.lable ? props.lable : "";
  if (props.value !== null) {
    return (
      <div>
        <Row className="list-text cart-item">
          <Col lg={lg} className="lable">
            {lable}
          </Col>
          <Col lg="2">{props.value ? "Yes" : "No"}</Col>
        </Row>
        <hr style={{ margin: "4px" }} />
      </div>
    );
  }

  return <div />;
}

//var OrderStatus={0:"Order Post",1:"Order Accept",2:"Order Preparing",3:"Order Prepared",5:"Order Pickedup",6:"Order Delivered"};

class ViewOrder extends React.Component {
  componentWillMount() {
    this.setState({ isOrderQuality: false, checkDetail: [] });
  }
  componentDidUpdate(nextProps, nextState) {
    if (
      this.props.checkDetail &&
      this.props.checkDetail.length > 0 &&
      !this.state.isOrderQuality
    )
      this.setState({
        isOrderQuality: true,
        checkDetail: this.props.checkDetail
      });
  }

  render() {
    const propdata = this.props.propdata;
    const delivery_charge =propdata.delivery_charge?parseInt(propdata.delivery_charge):0
    const convenience_charge =propdata.convenience_charge || 0
    const cancelby =
      propdata.cancel_by === 0
        ? ""
        : propdata.cancel_by === 1
        ? " - Eat"
        : " - Kitchen";
    if (!propdata) return <div />;
    const orderid = propdata.orderid;
    const ordertime = Moment(propdata.ordertime).format("DD-MMM-YYYY hh:mm a");
    const custmerdetail = propdata.userdetail;
    const makeitdetail = propdata.makeitdetail;
    const moveitdetail = propdata.moveitdetail;
    const cus_address = propdata.cus_address;
    const cartItems = propdata.items;

    return (
      <div className="pd-8">
        
          
          <Row >
          <Col lg={7}>
          <div>
          <b>Order ID # {orderid} </b>{" "}
          <span className="mr-l-10">{ordertime}</span>
          </div>
          </Col>
          <Col lg={5} className="float-right">
          <Row>
            <Col>
          <Zendeskticket_Create
                  zendesk_ticketid={propdata.zendesk_ticketid}
                  clicktorequestzendesk={this.props.clicktorequestzendesk}
                ></Zendeskticket_Create>
                </Col>
                <Col lg={2}><Button className="mr-r-10" onClick={history.goBack}>
              Back
          </Button></Col>
          </Row>
          </Col>
          </Row>
        <Row className="mr-t-20">
          <Col lg="6">
            <Card>
              <CardHeader>
                Order Detail
                <ItemMissing
                  delivereddate={propdata.moveit_actual_delivered_time}
                  itemMissingAction={this.props.itemMissingAction}
                  orderstatus={propdata.orderstatus}
                  item_missing={propdata.item_missing}
                ></ItemMissing>
              </CardHeader>
              <CardBody className="order-v-cb-item">
                {cartItems.map((item, i) => (
                  <Row className="list-text cart-item" key={i}>
                    <Col>
                      <div className="font-size-16"> {item.product_name}</div>
                    </Col>
                    {/* <span className=''> (Price * Quantity) </span>  */}
                    <Col className="txt-align-right">
                      <div className="font-size-16">
                        {item.price} * {item.quantity}{" "}
                      </div>
                    </Col>
                    <Col className="txt-align-right">
                      <div className="font-size-14">
                        <i className="fas fa-rupee-sign font-size-12" />{" "}
                        {item.quantity * item.price}
                      </div>
                    </Col>
                  </Row>
                ))}
                <hr />

                <Row className="list-text cart-item">
                  <Col>
                    <div className="font-size-16">Othre Charges</div>
                  </Col>
                  <Col className="txt-align-right" />
                  <Col className="txt-align-right">
                    <div className="font-size-14">
                      <i className="fas fa-rupee-sign font-size-12" />{" "}
                      {delivery_charge+convenience_charge}
                    </div>
                  </Col>
                </Row>

                <Row className="list-text cart-item">
                  <Col>
                    <div className="font-size-16">Gst</div>
                  </Col>
                  <Col className="txt-align-right" />
                  <Col className="txt-align-right">
                    <div className="font-size-14">
                      <i className="fas fa-rupee-sign font-size-12" />{" "}
                      {propdata.gst}
                    </div>
                  </Col>
                </Row>
                <hr />
                <Row className="list-text cart-item">
                  <Col>
                    <div className="font-size-16">Total amount</div>
                  </Col>
                  <Col className="txt-align-right" />
                  <Col className="txt-align-right">
                    <div className="font-size-14">
                      <i className="fas fa-rupee-sign font-size-12" />{" "}
                      {propdata.original_price}
                    </div>
                  </Col>
                </Row>
                <hr />

                <Row
                  className="list-text cart-item"
                  hidden={propdata.discount_amount === 0}
                >
                  <Col>
                    <div className="font-size-16">Discount</div>
                  </Col>
                  <Col className="txt-align-right" />
                  <Col className="txt-align-right">
                    <div className="font-size-14">
                      {" "}
                      - <i className="fas fa-rupee-sign font-size-12" />{" "}
                      {propdata.discount_amount}
                    </div>
                  </Col>
                </Row>
                <Row
                  className="list-text cart-item"
                  hidden={propdata.refund_amount === 0}
                >
                  <Col>
                    <div className="font-size-16">Refund Coupon</div>
                  </Col>
                  <Col className="txt-align-right" />
                  <Col className="txt-align-right">
                    <div className="font-size-14">
                      {" "}
                      - <i className="fas fa-rupee-sign font-size-12" />{" "}
                      {propdata.refund_amount}
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <Row className="list-text cart-item">
                  <Col>
                    <div className="font-size-16" />
                  </Col>
                  <Col className="txt-align-right">
                    <div className="font-size-16"> Total Paid</div>
                  </Col>
                  <Col className="txt-align-right">
                    <div className="font-size-14">
                      {" "}
                      <i className="fas fa-rupee-sign font-size-12" />{" "}
                      {propdata.price}
                    </div>
                  </Col>
                </Row>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="6">
            <Card>
              <CardHeader>
                Order Delivery Status
                {/* <ToggleOrderStatus
                  virtualkey={makeitdetail.virtualkey}
                  orderStatusUpdate={this.props.orderStatusUpdate}
                  orderCancel={this.props.orderCancel}
                  orderstatus={propdata.orderstatus}
                  payment_status={propdata.payment_status}
                  orderstatusValue={getOrderNextStatusValue(
                    propdata.orderstatus
                  )}
                /> */}
                
                <OnDelivered  orderstatus={propdata.orderstatus} 
                payment_type={propdata.payment_type} 
                payment_status={propdata.payment_status}
                orderDelived={this.props.orderDelived} 
                paymentSuccess={this.props.paymentSuccess}/>

                

              </CardHeader>
              <CardBody className="order-v-status">
                <CardRowCol
                  lg="4"
                  lable="Order Type"
                  value={propdata.ordertype === 0 ? "Normal" : "Virtual"}
                />
                <CardRowCol
                  lg="4"
                  lable="Order Status"
                  value={getOrderStatus(propdata.orderstatus) + cancelby}
                  color={getOrderStatusColor(propdata.orderstatus)}
                />
                <CardRowCol
                  lg="4"
                  lable="Order Delivery Time"
                  value={
                    propdata.moveit_actual_delivered_time
                      ? Moment(propdata.moveit_actual_delivered_time).format(
                          "DD-MMM-YYYY hh:mm a"
                        )
                      : "Pending"
                  }
                />
                <hr />

                <CardRowCol
                  lg="4"
                  lable="Payment Type"
                  value={propdata.payment_type == 0 ? "Cash" : "Online"}
                />
                <CardRowCol
                  lg="4"
                  lable="Payment Status"
                  value={
                    propdata.payment_status === 1
                      ? "Paid"
                      : propdata.payment_status === 2
                      ? "Falied"
                      : "Pending"
                  }
                />

                <div hidden={propdata.cancel_by === 0}>
                  <hr />
                  
                  <CardRowCol
                    lg="4"
                    lable="Cancel Time"
                    value={
                      propdata.cancel_time ? Moment(propdata.cancel_time).format(
                        "DD-MMM-YYYY hh:mm a"
                      ) : "-"
                    }
                  />
                  <CardRowCol
                    lg="4"
                    lable="Cancel by"
                    value={
                      cancelby ? cancelby.replace('-',"") : "-"
                    }
                  />
                  <CardRowCol
                    lg="4"
                    lable="Cancel reason"
                    value={
                      propdata.cancel_reason ? propdata.cancel_reason : "-"
                    }
                  />
                  <Row className="list-text cart-item">
                    <Col lg="4" className="lable">
                      Cancel charge
                    </Col>
                    <Col lg="7" style={{ color: "black" }}>
                      <i
                        className="fas fa-rupee-sign font-size-12"
                        hidden={!propdata.cancel_charge}
                      />
                      {propdata.cancel_charge ? propdata.cancel_charge : "-"}
                    </Col>
                  </Row>
                 
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row className="mr-t-20">
          <Col>
            <Card>
              <CardHeader>Customer Detail
              <OnCancel orderstatus={propdata.orderstatus} orderCancel={this.props.orderCancel} payment_status={propdata.payment_status}/>
              </CardHeader>
              <CardBody className="order-v-cb-user">
              <CardRowCol
                  lg="4"
                  lable="ID "
                  value={"# " + custmerdetail.userid}
                />
                <CardRowCol lg="4" lable="Name" value={custmerdetail.name} />
                <CardRowCol lg="4" lable="Email" value={custmerdetail.email} />
                <CardRowCol
                  lg="4"
                  lable="Phone"
                  value={custmerdetail.phoneno}
                />
                <CardRowCol
                  lg="4"
                  lable="Flat No"
                  value={propdata.flatno ? propdata.flatno : "-"}
                />
                <CardRowCol
                  lg="4"
                  lable="Delivery Address"
                  value={cus_address}
                />
                <CardRowCol
                  lg="4"
                  lable="Landmark"
                  value={propdata.landmark ? propdata.landmark : "-"}
                />
                <CardRowCol
                  lg="4"
                  lable="Order Time"
                  value={
                    propdata.ordertime
                      ? Moment(propdata.ordertime).format("DD-MMM-YYYY hh:mm a")
                      : "-"
                  }
                />
              </CardBody>
            </Card>
          </Col>
          <Col>
            <Card>
              <CardHeader>Makeit Detail</CardHeader>
              <CardBody className="order-v-cb-user">
                <CardRowCol
                  lg="4"
                  lable="ID "
                  value={"# " + makeitdetail.userid}
                />
                <CardRowCol
                  lg="4"
                  lable="Brand "
                  value={makeitdetail.brandName || "-"}
                />
                <CardRowCol lg="4" lable="Name " value={makeitdetail.name} />
                <CardRowCol lg="4" lable="Email" value={makeitdetail.email} />
                <CardRowCol lg="4" lable="Phone" value={makeitdetail.phoneno} />
                <CardRowCol
                  lg="4"
                  lable="Address"
                  value={makeitdetail.address}
                />
                <CardRowCol
                  lg="4"
                  lable="User Type"
                  value={makeitdetail.virtualkey === 0 ? "Normal" : "Virtual"}
                />
                <CardRowCol
                  lg="4"
                  lable="Accepted time"
                  value={
                    propdata.makeit_accept_time
                      ? Moment(propdata.makeit_accept_time).format(
                          "DD-MMM-YYYY hh:mm a"
                        )
                      : "-"
                  }
                />
                <CardRowCol
                  lg="4"
                  lable="Expected preparing time"
                  value={
                    propdata.makeit_expected_preparing_time
                      ? Moment(propdata.makeit_expected_preparing_time).format(
                          "DD-MMM-YYYY hh:mm a"
                        )
                      : "-"
                  }
                />

                <CardRowCol
                  lg="4"
                  lable="Actual preparing time"
                  value={
                    propdata.makeit_actual_preparing_time
                      ? Moment(propdata.makeit_actual_preparing_time).format(
                          "DD-MMM-YYYY hh:mm a"
                        )
                      : "-"
                  }
                />
              </CardBody>
            </Card>
          </Col>

          <Col hidden={!moveitdetail.userid}>
            <Card>
              <CardHeader>Moveit Detail</CardHeader>
              <CardBody className="order-v-cb-user">
                <CardRowCol
                  lg="4"
                  lable="ID "
                  value={"# " + moveitdetail.userid}
                />
                <CardRowCol lg="4" lable="Name " value={moveitdetail.name} />
                <CardRowCol lg="4" lable="Email" value={moveitdetail.email} />
                <CardRowCol lg="4" lable="Phone" value={moveitdetail.phoneno} />
                <CardRowCol
                  lg="4"
                  lable="Vehicle No:"
                  value={moveitdetail.Vehicle_no}
                />
                <CardRowCol
                  lg="4"
                  lable="Assigned time"
                  value={
                    propdata.order_assigned_time
                      ? Moment(propdata.order_assigned_time).format(
                          "DD-MMM-YYYY hh:mm a"
                        )
                      : "-"
                  }
                />
                <CardRowCol
                  lg="4"
                  lable="Notification time"
                  value={
                    propdata.moveit_notification_time
                      ? Moment(propdata.moveit_notification_time).format(
                          "DD-MMM-YYYY hh:mm a"
                        )
                      : "-"
                  }
                />
                <CardRowCol
                  lg="4"
                  lable="Accepted time"
                  value={
                    propdata.moveit_accept_time
                      ? Moment(propdata.moveit_accept_time).format(
                          "DD-MMM-YYYY hh:mm a"
                        )
                      : "-"
                  }
                />

                <CardRowCol
                  lg="4"
                  lable="Kitchen Reached time"
                  value={
                    propdata.moveit_reached_time
                      ? Moment(propdata.moveit_reached_time).format(
                          "DD-MMM-YYYY hh:mm a"
                        )
                      : "-"
                  }
                />

                <CardRowCol
                  lg="4"
                  lable="Pickedup time"
                  value={
                    propdata.moveit_pickup_time
                      ? Moment(propdata.moveit_pickup_time).format(
                          "DD-MMM-YYYY hh:mm a"
                        )
                      : "-"
                  }
                />

                <CardRowCol
                  lg="4"
                  lable="Customer Location Reached time"
                  value={
                    propdata.moveit_customerlocation_reached_time
                      ? Moment(
                          propdata.moveit_customerlocation_reached_time
                        ).format("DD-MMM-YYYY hh:mm a")
                      : "-"
                  }
                />

                <CardRowCol
                  lg="4"
                  lable="Expected delivered time"
                  value={
                    propdata.moveit_expected_delivered_time
                      ? Moment(propdata.moveit_expected_delivered_time).format(
                          "DD-MMM-YYYY hh:mm a"
                        )
                      : "-"
                  }
                />

                <CardRowCol
                  lg="4"
                  lable="Actual Delivered time"
                  value={
                    propdata.moveit_actual_delivered_time
                      ? Moment(propdata.moveit_actual_delivered_time).format(
                          "DD-MMM-YYYY hh:mm a"
                        )
                      : "-"
                  }
                />
              </CardBody>
            </Card>
          </Col>

          <Col hidden={!propdata.delivery_vendor}>
            <Card>
              <CardHeader>Dunzo Detail</CardHeader>
              <CardBody className="order-v-cb-user">
               <CardRowCol lg="4" lable="Task ID " value={propdata.dunzo_taskid || "-"}/>
                <CardRowCol lg="4" lable="Name " value={propdata.runner_name || "-"} />
                <CardRowCol lg="4" lable="Phone" value={propdata.runner_phone_number || "-"} />
                <CardRowCol
                  lg="4"
                  lable="Runner States:"
                  value={propdata.runner_state || "-"}
                />

                <CardRowCol
                  lg="4"
                  lable="Pickup eta:"
                  value={propdata.runner_eta_pickup_min || "-"}
                />

                <CardRowCol
                  lg="4"
                  lable="Dropoff eta:"
                  value={propdata.runner_eta_dropoff_min || "-"}
                />

                <CardRowCol
                  lg="4"
                  lable="Assigned time"
                  value={
                    propdata.order_assigned_time
                      ? Moment(propdata.order_assigned_time).format(
                          "DD-MMM-YYYY hh:mm a"
                        )
                      : "-"
                  }
                />
                <CardRowCol
                  lg="4"
                  lable="Notification time"
                  value={
                    propdata.moveit_notification_time
                      ? Moment(propdata.moveit_notification_time).format(
                          "DD-MMM-YYYY hh:mm a"
                        )
                      : "-"
                  }
                />
                <CardRowCol
                  lg="4"
                  lable="Accepted time"
                  value={
                    propdata.moveit_accept_time
                      ? Moment(propdata.moveit_accept_time).format(
                          "DD-MMM-YYYY hh:mm a"
                        )
                      : "-"
                  }
                />

                <CardRowCol
                  lg="4"
                  lable="Kitchen Reached time"
                  value={
                    propdata.moveit_reached_time
                      ? Moment(propdata.moveit_reached_time).format(
                          "DD-MMM-YYYY hh:mm a"
                        )
                      : "-"
                  }
                />

                <CardRowCol
                  lg="4"
                  lable="Pickedup time"
                  value={
                    propdata.moveit_pickup_time
                      ? Moment(propdata.moveit_pickup_time).format(
                          "DD-MMM-YYYY hh:mm a"
                        )
                      : "-"
                  }
                />

                <CardRowCol
                  lg="4"
                  lable="Customer Location Reached time"
                  value={
                    propdata.moveit_customerlocation_reached_time
                      ? Moment(
                          propdata.moveit_customerlocation_reached_time
                        ).format("DD-MMM-YYYY hh:mm a")
                      : "-"
                  }
                />

                <CardRowCol
                  lg="4"
                  lable="Expected delivered time"
                  value={
                    propdata.moveit_expected_delivered_time
                      ? Moment(propdata.moveit_expected_delivered_time).format(
                          "DD-MMM-YYYY hh:mm a"
                        )
                      : "-"
                  }
                />

                <CardRowCol
                  lg="4"
                  lable="Actual Delivered time"
                  value={
                    propdata.moveit_actual_delivered_time
                      ? Moment(propdata.moveit_actual_delivered_time).format(
                          "DD-MMM-YYYY hh:mm a"
                        )
                      : "-"
                  }
                />
              </CardBody>
            </Card>
          </Col>

        </Row>

        <Row className="mr-t-20">
          <Col
            lg="4"
            hidden={
              !(moveitdetail.userid && this.state.checkDetail.length !== 0)
            }
          >
            <Card>
              <CardHeader>Quality Check</CardHeader>
              <CardBody className="order-v-cb-user">
                {this.state.checkDetail.map((item, index) => (
                  <CardRowColCheck
                    lg="8"
                    lable={item.description}
                    value={item.enabled}
                  />
                ))}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ViewOrder;
