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
import { getOrderStatus, getOrderStatusColor ,getOrderNextStatusValue} from "../utils/ConstantFunction";

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

function ToggleOrderStatus(props) {
  if (props.virtualkey === 1&&props.orderstatus<3 &&props.payment_status!==2) {
    return (
      <Row className="float-right">
        <Col>
          <Button onClick={props.orderStatusUpdate}>{props.orderstatusValue}</Button>
        </Col>
        <Col>
          <Button onClick={props.orderCancel}>Order Cancel</Button>
        </Col>
      </Row>
    );
  }
  return <div />;
}

function ItemMissing(props) {
  if (props.orderstatus === 6&&!props.item_missing) {
    return (
      <Row className="float-right">
        <Col>
          <Button onClick={props.itemMissingAction}>Item Missing</Button>
        </Col>
      </Row>
    );
  }else if (props.orderstatus === 6&&props.item_missing===1) {
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



//var OrderStatus={0:"Order Post",1:"Order Accept",2:"Order Preparing",3:"Order Prepared",5:"Order Pickedup",6:"Order Delivered"};

class ViewVirtualOrder extends React.Component {
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
    if (!propdata) return <div />;
    const orderid = propdata.orderid;
    const ordertime = Moment(propdata.ordertime).format("DD-MMM-YYYY hh:mm a");
    const makeitdetail = propdata.makeitdetail;
    const cartItems = propdata.items;

    return (
      <div className="pd-8">
        <div>
          <b>Order ID # {orderid} </b>{" "}
          <span className="mr-l-10">{ordertime}</span>
          <span className="float-right">
            <Button className="mr-r-10" onClick={history.goBack}>
              Back
            </Button>
          </span>
        </div>

        <Row className="mr-t-20">
          <Col lg="6">
            <Card>
              <CardHeader>Order Detail
                {/* <ItemMissing itemMissingAction={this.props.itemMissingAction} orderstatus={propdata.orderstatus} item_missing={propdata.item_missing}></ItemMissing> */}
              </CardHeader>
              <CardBody className="order-virtual-cb-item">
              <Row className="list-text cart-item">
                    <Col>
                      <div className="font-size-12">Product Name</div>
                    </Col>
                    {/* <span className=''> (Price * Quantity) </span>  */}
                    <Col className="txt-align-right">
                      <div className="font-size-12 txt-align-center">
                         Quantity
                      </div>
                    </Col>
                    <Col>
                      <div className="font-size-12">
                       {" "}
                      </div>
                    </Col>
                    <Col className="txt-align-right">
                      <div className="font-size-12">
                        Price
                      </div>
                    </Col>
                  </Row>
                  <hr />
                {cartItems.map((item, i) => (
                  <Row className="list-text cart-item" key={i}>
                    <Col>
                      <div className="font-size-16"> {item.product_name}</div>
                    </Col>
                    {/* <span className=''> (Price * Quantity) </span>  */}
                    <Col className="txt-align-right">
                      <div className="font-size-16 txt-align-center">
                        {item.quantity}
                      </div>
                    </Col>
                    <Col>
                      <div className="font-size-16 ">
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
                    <div className="font-size-16">Delivery Charges</div>
                  </Col>
                  <Col className="txt-align-right" />
                  <Col className="txt-align-right">
                    <div className="font-size-14">
                      <i className="fas fa-rupee-sign font-size-12" />
                      {propdata.delivery_charge}
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
                      <i className="fas fa-rupee-sign font-size-12" />
                      {propdata.gst}
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
                    <div className="font-size-16"> Total </div>
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
                  orderstatusValue={getOrderNextStatusValue(propdata.orderstatus)}
                /> */}
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
                  value={getOrderStatus(propdata.orderstatus)}
                  color={getOrderStatusColor(propdata.orderstatus)}
                />
                <CardRowCol
                  lg="4"
                  lable="Order Delivery Time"
                  value={
                    propdata.orderstatus === 0
                      ? "Pending"
                      : Moment(propdata.moveit_actual_delivered_time).format(
                          "DD-MMM-YYYY hh:mm a"
                        )
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
                  value={propdata.payment_status === 1 ? "Paid" : propdata.payment_status === 2?"Falied":"Pending"}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ViewVirtualOrder;
