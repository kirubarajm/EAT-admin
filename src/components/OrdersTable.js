import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Row,
  Col,
  ButtonGroup,
  Button,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  CardFooter
} from "reactstrap";

import SearchInput from "./SearchInput";
import PaginationComponent from "react-reactstrap-pagination";
import {
  getOrderNextStatusValueV
} from "../utils/ConstantFunction";

function HubDropDown(props) {
  if (props.visible) {
    return (
      <ButtonDropdown
        isOpen={props.dropdownOpen}
        toggle={props.dropdowntoggle}
        size="sm"
      >
        <DropdownToggle caret>
          {props.selectedHub.makeithub_name}
          {", "} {props.selectedHub.address}
        </DropdownToggle>
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

function ProductCard(props) {
  if (props.items) {
    return (
      <CardBody className="order-virtual-list-item pd-4">
        <Row className="list-text cart-item">
          <Col sm={8} md={8} lg={8} xl={8} xs={8}>
            <div className="font-size-12">Name</div>
          </Col>
          <Col className="txt-align-center" sm={4} md={4} lg={4} xl={4} xs={4}>
            <div className="font-size-12">Quantity</div>
          </Col >
        </Row>
        <hr className="mr-2" />
        {props.items.productitem.map((prod, i) => (
          <Row className="list-text cart-item" key={i}>
            <Col sm={8} md={8} lg={8} xl={8} xs={8}>
              <div className="font-size-14 font-weight-bold">
                {" "}
                {prod.product_name}
              </div>
              <div className="font-size-12">
                {" "}
                {prod.prod_desc}
              </div>
            </Col>
            {/* <span className=''> (Price * Quantity) </span>  */}
            <Col className="txt-align-center" sm={4} md={4} lg={4} xl={4} xs={4}>
              <div className="font-size-14 font-weight-bold">
                {prod.quantity}{" "}
              </div>
            </Col>
            {/* <Col className="txt-align-left pd-l-30" lg='3'>
                            <div className="font-size-12">{prod.price}</div>
                          </Col>
                          <Col className="txt-align-left pd-l-30" lg='3'>
                            <div className="font-size-12">
                              <i className="fas fa-rupee-sign font-size-12" />{" "}
                              {prod.quantity * prod.price}
                            </div>
                          </Col> */}
          </Row>
        ))}
      </CardBody>
    );
  } else {
    return <div></div>;
  }
}
function ToggleOrderStatus(props) {
  if (props.orderstatus < 3) {
    return (
      <Row className="float-right">
        <Col>
          <Button
            onClick={() =>
              props.orderStatusUpdate(props.orderstatus, props.orderid)
            }
            color="success"
          >
            {props.orderstatusValue}
          </Button>
        </Col>
        <Col>
          <Button
            onClick={() => props.orderCancel(props.orderid)}
            color="danger"
          >
            Cancel
          </Button>
        </Col>
      </Row>
    );
  } else if (props.orderstatus == 7) {
    return (
      <Row className="float-right txt-transform-cap font-size-10">
        <div className="color-grey">
          Canceled by{" "}
          <span className="txt-color-red">
            {props.cancel_by === 1 ? " eat" : " kitchen"}
          </span>
        </div>
      </Row>
    );
  }
  return <div />;
}

// className="float-right"
const pagelimit = 20;
class OrdersTable extends React.Component {
  render() {
    const propsData = this.props.propsData;
    const orderslist = propsData.orderslist || [];
    const totalcount = propsData.totalcount;
    const orderstatus = this.props.orderstatus;
    const currentpage = this.props.currentpage;
    const {
      makeithub,
      onSearch,
      handleSelected,
      title,
      dropdowntoggle,
      dropdownOpen,
      selectedHub,
      selectHub,
      dropdownvisible,
      filterOrders,
      orderStatusUpdate,
      orderCancel,
      isPlayingSound,
      onPasue
    } = this.props;

    return (
      <div className="pd-8">
        <Card>
          <CardHeader>
            <Row>
              <Col sm={12} md={12} lg={2} xl={2} xs={12} className="mr-t-10">
                {title}
              </Col>
              <Col
                sm={12}
                md={12}
                lg={1}
                xl={1}
                xs={12}
                className="mr-t-10"
                hidden={!isPlayingSound}
              >
                <Button
                  hidden={!isPlayingSound}
                  color="primary"
                  onClick={onPasue}
                >
                  Stop
                </Button>
              </Col>
              <Col sm={12} md={12} lg={2} xl={2} xs={12} className="mr-t-10">
                <HubDropDown
                  dropdownOpen={dropdownOpen}
                  visible={dropdownvisible}
                  dropdowntoggle={dropdowntoggle}
                  selectedHub={selectedHub}
                  selectHub={selectHub}
                  makeithub={makeithub}
                />
              </Col>
              <Col sm={12} md={12} lg={5} xl={5} xs={12} className="mr-t-10">
                <ButtonGroup size="sm" hidden={currentpage !== "today"}>
                  <Button
                    color="primary"
                    onClick={filterOrders(0)}
                    active={orderstatus === 0}
                  >
                    Posted
                  </Button>
                  <Button
                    color="primary"
                    onClick={filterOrders(1)}
                    active={orderstatus === 1}
                  >
                    Accepted
                  </Button>
                  <Button
                    color="primary"
                    onClick={filterOrders(3)}
                    active={orderstatus === 3}
                  >
                    Prepared
                  </Button>
                  <Button
                    className="hidden_tablet hidden_mobile"
                    color="primary"
                    onClick={filterOrders(5)}
                    active={orderstatus === 5}
                  >
                    PickedUp
                  </Button>
                  <Button
                    color="primary"
                    onClick={filterOrders(7)}
                    active={orderstatus === 7}
                  >
                    Cancel
                  </Button>
                </ButtonGroup>
              </Col>
              <Col sm={12} md={2} lg={4} xl={1} xs={12} className="mr-t-10">
                <SearchInput onSearch={onSearch} value={this.props.searchvalue}/>
              </Col>
            </Row>
          </CardHeader>
          <CardBody
            hidden={totalcount === 0}
            className={
              (totalcount < pagelimit
                ? "card-body-with-scroll"
                : "card-footer-with-scroll") + " pd-12 bg-color-black margin-bottom-mobile margin-bottom-tablet"
            }
          >
            <Row>
              {orderslist.map((item, i) => (
                <Col
                  sm={12}
                  md={12}
                  lg={4}
                  xl={4}
                  xs={12}
                  className="mr-t-10"
                  key={i}
                >
                  <Card
                    className={
                      item.isAlert == "1" ? "card-alert" : "card-alert-non"
                    }
                  >
                    <CardHeader>
                      {" "}
                      #{item.orderid}
                      <ToggleOrderStatus
                        orderStatusUpdate={orderStatusUpdate}
                        orderid={item.orderid}
                        cancel_by={item.cancel_by}
                        orderCancel={orderCancel}
                        orderstatus={item.orderstatus}
                        payment_status={item.payment_status}
                        orderstatusValue={getOrderNextStatusValueV(
                          item.orderstatus
                        )}
                      />
                    </CardHeader>
                    {/* <CardTitle className="txt-align-center font-weight-bold mr-t-10">
                      #{item.orderid}
                    </CardTitle> */}

                    <ProductCard items={item.items} />
                  </Card>
                </Col>
              ))}
            </Row>
          </CardBody>
          <CardFooter hidden={totalcount < pagelimit}>
            <div className="float-right">
              <PaginationComponent
                totalItems={totalcount}
                pageSize={pagelimit}
                onSelect={handleSelected}
                activePage={1}
              />
            </div>
          </CardFooter>
        </Card>
      </div>
    );
  }
}
export default OrdersTable;
