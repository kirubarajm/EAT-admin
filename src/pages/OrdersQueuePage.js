import React from "react";
import AxiosRequest from "../AxiosRequest";
//import DateRangePicker from 'react-bootstrap-daterangepicker';
import { ORDERS_QUEUE_LIST, ORDERS_QUEUE_HUB, ORDERS_QUEUE_ZONE, ORDERS_QUEUE_FILTER, ORDERS_QUEUE_FILTER_ZONE, ORDERS_QUEUE_FILTER_HUB } from "../constants/actionTypes";
import { connect } from "react-redux";
import { Table, Card, CardBody, CardHeader,Row,  DropdownToggle,
    DropdownItem,
    ButtonDropdown,
    DropdownMenu,Button,
    Col, } from "reactstrap";
import { Link } from "react-router-dom";
import { getOrderStatus, getOrderStatusColor } from "../utils/ConstantFunction";
import Moment from "moment";

const mapStateToProps = state => ({ ...state.orderqueue });

const mapDispatchToProps = dispatch => ({
  onGetOrderqueue: () =>
    dispatch({
      type: ORDERS_QUEUE_LIST,
      payload: AxiosRequest.Moveit.getOrders(5)
    }),
    onGetOrderHub: () =>
    dispatch({
      type: ORDERS_QUEUE_HUB,
      payload: AxiosRequest.Master.getMovieitHub()
    }),
    onGetOrderZone: (data) =>
    dispatch({
      type: ORDERS_QUEUE_ZONE,
      payload: AxiosRequest.Zone.getAllZone(data)
    }),

    onSetZoneFilter: (id,zonename) =>
    dispatch({
      type: ORDERS_QUEUE_FILTER_ZONE,id,zonename
    }),
    onSetHubFilter: (id,hubname) =>
    dispatch({
      type: ORDERS_QUEUE_FILTER_HUB,id,hubname
    }),
});
class OrdersQueuePage extends React.Component {
  constructor(props) {
    super(props);
   
    this.state = {
      dropdownOpen: false,
      dropdownOpenhub: false,
    };
    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.toggleDropDownHub=this.toggleDropDownHub.bind(this);
    this.filterzone=this.filterzone.bind(this);
    this.filterhub=this.filterhub.bind(this);
    this.onRefresh=this.onRefresh.bind(this);
  }

  componentWillMount() {
    this.onRefresh();
  }

  onRefresh(){
    this.props.onGetOrderqueue();
    if(this.props.isZoneFilter) this.props.onGetOrderZone({ boundaries: 1 });
    else this.props.onGetOrderHub();
  }

  toggleDropDown() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }
  toggleDropDownHub() {
    this.setState(prevState => ({
        dropdownOpenhub: !prevState.dropdownOpenhub
    }));
  }

  filterzone(item) {
    this.props.onSetZoneFilter(
      item.id,item.Zonename
    );
  }

  filterhub(item) {
    this.props.onSetHubFilter(
      item.makeithub_id,item.address
    );
  }

  render() {
    const orderQueueList = this.props.orderQueueList || [];
    const zoneList =this.props.zoneList|| [];
    const hubList =this.props.hubList|| [];
    return (
      <div className="pd-8">
        <Card>
          <CardHeader>
            Queue ORDER
            <Row className="float-right">
              <Col className="mr-t-10" >
                <ButtonDropdown
                  isOpen={this.state.dropdownOpen}
                  toggle={this.toggleDropDown}
                  hidden={!this.props.isZoneFilter}
                >
                  <DropdownToggle caret>{this.props.zonename}</DropdownToggle>
                  <DropdownMenu>
                    {zoneList.map((item, index) => (
                      <DropdownItem
                        onClick={() => this.filterzone(item)}
                        key={index}
                      >
                        {item.Zonename}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </ButtonDropdown>

                <ButtonDropdown
                  isOpen={this.state.dropdownOpenhub}
                  toggle={this.toggleDropDownHub}
                  hidden={this.props.isZoneFilter}>
                  <DropdownToggle caret>{this.props.hubname}</DropdownToggle>
                  <DropdownMenu>
                    {hubList.map((item, index) => (
                      <DropdownItem
                        onClick={() => this.filterhub(item)}
                        key={index}
                      >
                        {item.address}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </ButtonDropdown>
              </Col>
              <Col className="mr-t-10"><Button onClick={() => this.onRefresh()} >Refresh</Button></Col>
            </Row>
          </CardHeader>
          <CardBody className="card-footer-with-scroll pd-0">
            <Table>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Orderid</th>
                  <th>Order Date/time</th>
                  <th>Kitchen Name</th>
                  <th>Kitchen Type</th>
                  <th>Total Amount</th>
                  {/* <th>Order Type</th> */}
                  <th>Order Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orderQueueList.map((item, i) => (
                  <tr key={i}>
                    <th scope="row">{i + 1}</th>
                    <th>{item.orderid}</th>
                    <td>
                      {Moment(item.ordertime).format("DD-MMM-YYYY/hh:mm a")}
                    </td>
                    <td>{item.brandname}</td>
                    <td>{item.virtualkey === 1 ? "Virtual" : "Real"}</td>
                    <td>{item.price}</td>
                    {/* <td>{item.ordertype === 1 ? 'Virtual' : 'Mobile'}</td> */}
                    <td
                      style={{ color: getOrderStatusColor(item.orderstatus) }}
                    >
                      {getOrderStatus(item.orderstatus)}
                    </td>
                    <td>
                      <Link
                        to={`/vieworder/${item.orderid}`}
                        className="preview-link"
                      >
                        <i className="fa fa-external-link-alt"></i>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(OrdersQueuePage);