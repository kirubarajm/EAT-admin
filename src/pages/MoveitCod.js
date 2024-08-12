import React from "react";
import { Card, CardBody, Row, Col,CardHeader,Button,Table } from "reactstrap";
import { MOVEIT_COD_LIST } from "../constants/actionTypes";
import { connect } from "react-redux";
import moment from "moment";
import Moment from 'moment';
import AxiosRequest from "../AxiosRequest";
import { Link } from "react-router-dom";
import DateRangePicker from 'react-bootstrap-daterangepicker';
import { history } from "../store";
const mapStateToProps = state => ({ ...state.moveitcod });
const mapDispatchToProps = dispatch => ({
  onGetOrders: (data) =>
    dispatch({
      type: MOVEIT_COD_LIST,
      payload: AxiosRequest.Moveit.getcod(data)
    })
});

var data;
var startDate;
var endDate;
var userid;
var today;
const ranges = {
  'Today': [moment(new Date()), moment(new Date())],
  'Yesterday': [moment(new Date()).subtract(1, 'days'), moment(new Date()).subtract(1, 'days')],
  'Last 7 Days': [moment(new Date()).subtract(6, 'days'), moment(new Date())],
  'Last 30 Days': [moment(new Date()).subtract(29, 'days'), moment(new Date())],
  'This Month': [moment(new Date()).startOf('month'), moment(new Date()).endOf('month')],
  'Last Month': [moment(new Date()).subtract(1, 'month').startOf('month'), moment(new Date()).subtract(1, 'month').endOf('month')],
}
class MoveitCod extends React.Component {
  componentWillMount() {
    userid=this.props.match.params.userid;
    startDate=endDate=today=Moment(new Date()).format("YYYY-MM-DD");
    this.getData=this.getData.bind(this);
    this.daterangSelect=this.daterangSelect.bind(this);
    this.getData();
  }
  getData(){
    data={userid:userid,startdate:startDate,enddate:endDate}
    this.props.onGetOrders(data);
  }
  
  componentWillUnmount() {
  }

  daterangSelect(event, picker) {
    startDate = picker.startDate.format('YYYY-MM-DD');
    endDate = picker.endDate.format('YYYY-MM-DD');
    console.log("picker---startDate--" + startDate + "---- endDate---" + endDate);
    this.getData();
}

  render() {
    var order_data = this.props.order_data||[];
    var cod_amount= this.props.cod_amount || 0;
    return (
      <div className="pd-8">
          <Card>
              <CardHeader>
                  <Row >
                    <Col lg="1">COD </Col>
                    <Col lg="3">
                    <Row className='font-size-12 txt-align-center color-grey'><div  style={{textTransform:"capitalize"}}>Start Date : {Moment(startDate).format('DD-MMM-YYYY')} </div></Row>
                    <Row className='font-size-12 txt-align-center color-grey' style={{textTransform:"capitalize"}}>End Date : {Moment(endDate).format('DD-MMM-YYYY')}</Row>
                    </Col>
                    <Col lg="6">Total Amount :- {cod_amount}</Col>
                    
                      <Col className="txt-align-right" lg="1">
                          <DateRangePicker opens='left' maxDate={today} onApply={this.daterangSelect} ranges={ranges}>
                              <Button><i className="far fa-calendar-alt"></i></Button>
                          </DateRangePicker>
                      </Col >
                    <Col lg="1"> <Button className="mr-r-10" onClick={history.goBack}>
              Back
            </Button></Col>
                      
                  </Row>
              </CardHeader>
              <CardBody className="card-body-with-scroll pd-0">
                  <Table>
                      <thead>
                          <tr>
                              <th>No</th>
                              <th>Orderid</th>
                              <th>Order Date/Time</th>
                              <th>Amount</th>
                              <th>Order Type</th>
                              <th>Payment Status</th>
                              <th>Action</th>
                          </tr>
                      </thead>
                      <tbody>
                          {order_data.map((item, i) => (
                              <tr key={i}>
                                  <th scope="row">{i + 1}</th>
                                  <th>{item.orderid}</th>
                                  <td>{Moment(item.ordertime).format('DD-MMM-YYYY/hh:mm a')}</td>
                                  <td>{item.price}</td>
                                  <td>{item.ordertype === 1 ? 'Virtual' : 'Mobile'}</td>
                                  {/* <td style={{color:getOrderStatusColor(item.orderstatus)}}>{getOrderStatus(item.orderstatus)}</td> */}
                                  <td>{item.payment_status === 1 ? 'Success' : item.payment_status === 2?'Failed':'Unsuccess'}</td>
                                  <td><Link to={`/vieworder/${item.orderid}`} className="preview-link"><i className="fa fa-external-link-alt"></i></Link></td>
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MoveitCod);
