import React from 'react';
import { Table, Card, CardBody, CardHeader, Row, Col,CardFooter } from 'reactstrap';
import { Link } from 'react-router-dom';
import SearchInput from './SearchInput';
import PaginationComponent from "react-reactstrap-pagination";
import {getOrderStatus,getOrderStatusColor, getpaymentTypeColor, getpaymentStatusColor} from "../utils/ConstantFunction"
import Moment from 'moment';
const pagelimit=20;
class OrdersHistoryTable extends React.Component {
    render() {
        const propsData=this.props.propsData;
        const orderslist = propsData.orderslist || [];
        const totalcount= propsData.totalcount;
        //const orderstatus = this.props.orderstatus;
       // const currentpage=this.props.currentpage;
        const {onSearch,handleSelected,title}=this.props;
        return (
            <div className="pd-8">
                <Card>
                    <CardHeader>
                        {title}
                        <Row className="float-right">
                        {/* <Col><HubDropDown dropdownOpen={dropdownOpen}  visible={dropdownvisible}
                            dropdowntoggle={dropdowntoggle} selectedHub={selectedHub} selectHub={selectHub} makeithub={makeithub}>
                            </HubDropDown></Col>
                            <Col><ButtonGroup size="sm" hidden={currentpage!=='today'}>
                                <Button  color="primary" onClick={filterOrders(0)} active={orderstatus === 0}>Posted</Button>
                                <Button  color="primary" onClick={filterOrders(1)} active={orderstatus === 1}>Accepted</Button>
                                <Button  color="primary" onClick={filterOrders(3)} active={orderstatus === 3}>Prepared</Button>
                                <Button  color="primary" onClick={filterOrders(5)} active={orderstatus === 5}>PickedUp</Button>
                            </ButtonGroup></Col> */}
                              
                            
                            {/* <DropdownToggle caret size="sm">
                                {selectedHub.makeithub_name}{', '}                                      {selectedHub.address}
                                </DropdownToggle>
                                <DropdownMenu>
                                {makeithub.map((item, index) => (
                                    <DropdownItem onClick={()=>selectHub(item)}  key={index}>{item.address}</DropdownItem>
                                ))}
                                </DropdownMenu>
                                */}
                           
                            <Col><SearchInput onSearch={onSearch} value={this.props.searchvalue}/></Col>
                        </Row>
                    </CardHeader>
                    <CardBody className="card-footer-with-scroll pd-0">
                        <Table>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Orderid</th>
                                    <th>Order Date/time</th>
                                    {/* <th>Name</th>
                                    <th>Mobile no</th> */}
                                    <th>Kitchan name</th>
                                    <th>Total Amount</th>
                                    <th>Order Status</th>
                                    {/* <th>Payment Type</th>
                                    <th>Payment Status</th> */}
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderslist.map((item, i) => (
                                    <tr key={i}>
                                        <th scope="row">{i + 1}</th>
                                        <th>{item.orderid}</th>
                                        <td>{Moment(item.ordertime).format('DD-MMM-YYYY/hh:mm a')}</td>
                                        {/* <td>{item.name}</td>
                                        <td>{item.phoneno}</td> */}
                                        <td>{item.makeit_brandname||item.makeit_name}</td>
                                        <td>{item.price}</td>
                                        <td style={{color:getOrderStatusColor(item.orderstatus)}}>{getOrderStatus(item.orderstatus)}</td>
                                        <td style={{color:getpaymentTypeColor(item.payment_type)}}>{item.payment_type == 0 ? "Cash" : "Online"}</td>
                                        <td style={{color:getpaymentStatusColor(item.payment_status)}}>{item.payment_status === 1 ? 'Success' : item.payment_status === 2?'Failed':'Unsuccess'}</td>
                                        {/* <td>{item.payment_type == 0 ? "Cash" : "Online"}</td>
                                        <td>{item.payment_status === 1 ? 'Success' : item.payment_status === 2?'Failed':'Unsuccess'}</td> */}
                                        <td><Link to={`/vieworder/${item.orderid}`} className="preview-link"><i className="fa fa-external-link-alt"></i></Link></td>
                                    </tr>
                                ))}
                            </tbody>

                        </Table>
                    </CardBody>
                    <CardFooter hidden={totalcount<pagelimit}>
                    <div className="float-right">
                        <PaginationComponent
                            totalItems={totalcount}
                            pageSize={pagelimit}
                            onSelect={handleSelected}
                            activePage={1}/>
                        </div>
                    </CardFooter>
                </Card>

            </div>
        );
    };
}
export default OrdersHistoryTable