import React from 'react';
import AxiosRequest from '../AxiosRequest'
import SearchInput from '../components/SearchInput';
//import DateRangePicker from 'react-bootstrap-daterangepicker';
//import moment from "moment";
import PaginationComponent from "react-reactstrap-pagination";

import { ORDERS_ALL_LIST, ORDERS_FILTER_LIST, ORDERS_PAGE_ONLOAD } from '../constants/actionTypes'
import { connect } from 'react-redux'
import { Table, Card, CardBody, CardHeader, Row, Col, Button, ButtonGroup, CardFooter,DropdownToggle,DropdownItem,ButtonDropdown,DropdownMenu } from 'reactstrap';
import { Link } from 'react-router-dom';
import { MasterOrderStatus } from '../utils/constant';
import {getOrderStatus,getOrderStatusColor, getpaymentTypeColor, getpaymentStatusColor} from "../utils/ConstantFunction"
import Moment from 'moment';

const defultPage=1;
const pagelimit=20;
const moveitFilterlist =[{id:-1,name:"ALL"},{id:0,name:"Eat"},{id:1,name:"Dunzo"}]
const moveitName ={"-1":"ALL","0":"Eat","1":"Dunzo"};
const mapStateToProps = state => ({ ...state.orders });

const mapDispatchToProps = dispatch => ({
    onGetOrders: (data) =>
        dispatch({ type: ORDERS_ALL_LIST, payload: AxiosRequest.Eat.getOrders(data) }),
    onSetFilter: (orderType, search,selectedPage,moveitfilter) =>
        dispatch({ type: ORDERS_FILTER_LIST, orderType, search,selectedPage,moveitfilter }),
    onLoad:()=>
        dispatch({ type: ORDERS_PAGE_ONLOAD}),
});
class OrdersPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedPage: 1,
            dropdownOpen: false,
            dropdownname:moveitName[this.props.moveitfilter]
        };
        this.handleSelected = this.handleSelected.bind(this);
        this.toggleDropDown = this.toggleDropDown.bind(this);
    }

    toggleDropDown() {
        this.setState(prevState => ({
          dropdownOpen: !prevState.dropdownOpen
        }));
    }

    handleSelected(selectedPage) {
        this.props.onSetFilter(this.props.orderType, this.props.search,selectedPage,this.props.moveitfilter);
        this.onFiltersApply(this.props.orderType, this.props.search,selectedPage,this.props.moveitfilter);
    }
    componentWillMount() {
        //this.props.onLoad();
        this.onFiltersApply(this.props.orderType, this.props.search, this.props.selectedPage,this.props.moveitfilter);
        // this.filterTable = (filterSelected) => ev => {
        //     this.props.onFilterOrders(filterSelected);
        // }

        this.onSearch = e => {
           // if (e.keyCode === 13 && e.shiftKey === false) {
               // e.preventDefault()
                this.props.onSetFilter(this.props.orderType, e.target.value,defultPage,this.props.moveitfilter);
                this.onFiltersApply(this.props.orderType, e.target.value,defultPage,this.props.moveitfilter);
            //}
        }

        this.filter = (id) => ev => {
            ev.preventDefault();
            this.props.onSetFilter(id, this.props.search,defultPage,this.props.moveitfilter);
            this.onFiltersApply(id, this.props.search,defultPage,this.props.moveitfilter);
        }

        this.filterMoveit = (item) => ev =>{
            ev.preventDefault();
            this.setState({dropdownname:item.name})
            this.props.onSetFilter(this.props.orderType, this.props.search,defultPage,item.id);
            this.onFiltersApply(this.props.orderType, this.props.search,defultPage,item.id);  
        }
        

    }

    onFiltersApply(vId, search,page,moveitfilter) {
        var virtualkey = vId === -1 ? 'all' : vId;
        var moveitfilters = moveitfilter===undefined||moveitfilter ===-1? 'all': moveitfilter;
        var filter = { virtualkey: virtualkey, search: search ,page:page,delivery_vendor:moveitfilters};
        this.props.onGetOrders(filter);
    }
    daterangSelect(event, picker) {
        let startDate = picker.startDate.format('DD-MM-YYYY');
        let endDate = picker.endDate.format('DD-MM-YYYY');
        console.log("picker---startDate--" + startDate + "---- endDate---" + endDate);
    }

    getOrderStatus(item){
        var orderstatus=item.orderstatus||0;
        orderstatus= orderstatus>6?0:orderstatus
        var morder=MasterOrderStatus[orderstatus]
        return morder;
    }
    render() {
        const orderslist = this.props.orderslist;
        //const filterList = this.props.filterlist;
        //const filterSelected = this.props.filterSelected;
        //const endDate = new Date().toLocaleDateString(); //moment().subtract(2, "year"),
        return (
            <div className="pd-8">

                <Card>
                    <CardHeader>
                        ORDERS
                        <Row className="float-right">
                            <ButtonGroup size="sm">
                                <Button color="primary" onClick={this.filter(-1)} active={this.props.orderType === -1}>All</Button>
                                <Button color="primary" onClick={this.filter(0)} active={this.props.orderType === 0}>Real Orders</Button>
                                <Button color="primary" onClick={this.filter(1)} active={this.props.orderType === 1}>Virtual Orders</Button>
                            </ButtonGroup>
                           

                            <Col><ButtonDropdown
                  isOpen={this.state.dropdownOpen}
                  toggle={this.toggleDropDown}>
                  <DropdownToggle caret>{this.state.dropdownname}</DropdownToggle>
                  <DropdownMenu>
                    {moveitFilterlist.map((item, index) => (
                      <DropdownItem
                        onClick={this.filterMoveit(item)}
                        key={index}>
                        {item.name}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </ButtonDropdown></Col>
                <Col><SearchInput onSearch={this.onSearch} value={this.props.search}/></Col>
                            {/* <Col><DropDownList filterSelected={filterSelected} filterList={filterList} filterTable={this.filterTable} /></Col> */}
                            {/* <Col>
                                <DateRangePicker opens='left' maxDate={endDate} onApply={this.daterangSelect} ranges={ranges}>
                                    <Button><i className="far fa-calendar-alt"></i></Button>
                                </DateRangePicker>
                            </Col> */}
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
                                    <th>Payment Type</th>
                                    <th>Payment Status</th>
                                    <th>Moveit</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderslist.map((item, i) => (
                                    <tr key={i}>
                                        <th scope="row">{i + 1}</th>
                                        <th>{item.orderid}</th>
                                        <td>{Moment(item.ordertime).format('DD-MMM-YYYY/hh:mm a')}</td>
                                        <td>{item.brandname}</td>
                                        <td>{item.kitchentype === 1 ? 'Virtual' : 'Real'}</td>
                                        <td>{item.price}</td>
                                        {/* <td>{item.ordertype === 1 ? 'Virtual' : 'Mobile'}</td> */}
                                        <td style={{color:getOrderStatusColor(item.orderstatus)}}>{getOrderStatus(item.orderstatus)}</td>
                                        <td style={{color:getpaymentTypeColor(item.payment_type)}}>{item.payment_type == 0 ? "Cash" : "Online"}</td>
                                        <td style={{color:getpaymentStatusColor(item.payment_status)}}>{item.payment_status === 1 ? 'Success' : item.payment_status === 2?'Failed':'Unsuccess'}</td>
                                        <td>{item.delivery_vendor===1?'Dunzo':'Eat'}</td>
                                        <td><Link to={`/vieworder/${item.orderid}`} className="preview-link"><i className="fa fa-external-link-alt"></i></Link></td>
                                    </tr>
                                ))}
                            </tbody>

                        </Table>
                    </CardBody>
                    <CardFooter hidden={this.props.totalcount<pagelimit}>
                    <div className="float-right">
                        <PaginationComponent
                            totalItems={this.props.totalcount}
                            pageSize={pagelimit}
                            onSelect={this.handleSelected}
                            activePage={this.props.selectedPage}/>
                        </div>
                    </CardFooter>
                </Card>

            </div>
        );
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(OrdersPage);