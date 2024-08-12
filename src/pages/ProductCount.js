import React from "react";
import {
  Card,
  CardBody,
  Row,
  Col,
  CardHeader,
  Button,
  Table,
  ButtonGroup
} from "reactstrap";
import { ORDERS_PRODUCT_COUNT } from "../constants/actionTypes";
import { connect } from "react-redux";
import moment from "moment";
import Moment from "moment";
import AxiosRequest from "../AxiosRequest";
import { Link } from "react-router-dom";
import DateRangePicker from "react-bootstrap-daterangepicker";
import { CSVLink, CSVDownload } from "react-csv";
import { history } from "../store";
import { FaFileExcel } from "react-icons/fa";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink
} from "@react-pdf/renderer";
import { PdfDocument } from "../components/PdfDocument"
const mapStateToProps = state => ({ ...state.productcount });
const mapDispatchToProps = dispatch => ({
  onGetOrders: (data,date) =>
    dispatch({
      type: ORDERS_PRODUCT_COUNT,
      date,
      payload: AxiosRequest.Orders.getOrdersProductCount(data)
    })
});

var data;
var date;

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4"
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: { margin: "auto", flexDirection: "row" },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  },
  tableCell: { margin: "auto", marginTop: 5, fontSize: 10 }
});


// Create Document Component
function MyDocument(){
  return(
  
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.table}>
        {/* TableHeader */}
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Product</Text>
          </View>
          <View style={styles.tableCol}>
            
            <Text style={styles.tableCell}>Type</Text>
          </View>
          <View style={styles.tableCol}>
            
            <Text style={styles.tableCell}>Period</Text>
          </View>
          <View style={styles.tableCol}>
            
            <Text style={styles.tableCell}>Price</Text>
          </View>
        </View>
        {/* TableContent */}
        <View style={styles.tableRow}>
         
          <View style={styles.tableCol}>
            
            <Text style={styles.tableCell}>React-PDF</Text>
          </View>
          <View style={styles.tableCol}>
           
            <Text style={styles.tableCell}>3 User </Text>
          </View>
          <View style={styles.tableCol}>
            
            <Text style={styles.tableCell}>2019-02-20 - 2020-02-19</Text>
          </View>
          <View style={styles.tableCol}>
            
            <Text style={styles.tableCell}>5€</Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);
  }

class ProductCount extends React.Component {
  componentWillMount() {
    date = Moment(new Date()).format("YYYY-MM-DD");
    this.getData = this.getData.bind(this);
    this.daterangSelect = this.daterangSelect.bind(this);
    this.filterPaymentType = this.filterPaymentType.bind(this);
    this.genratePdf = this.genratePdf.bind(this);
   // this.dateConvert = this.dateConvert.bind(this);
    this.getData();
  }
  getData() {
    data = {
      date: date,
    };
    this.props.onGetOrders(startDate, endDate, paymentType, data);
  }

  componentWillUnmount() {}

  daterangSelect(event, picker) {
    startDate = picker.startDate.format("YYYY-MM-DD HH:MM:SS");
    endDate = picker.endDate.format("YYYY-MM-DD HH:MM:SS");
    console.log(
      "picker---startDate--" + startDate + "---- endDate---" + endDate
    );
    this.getData();
  }
  filterPaymentType(type) {
    paymentType = type;
    console.log("type" + type);
    this.getData();
  }
  dateConvert(date){
    return date?Moment(date).format("DD-MMM-YYYY / hh:mm a"):""
  }

  genratePdf(order_data) {
    let newOrderList = order_data.map(item => ({ 
      orderid:item.orderid,
      created_at:this.dateConvert(item.created_at),
      ordertime:this.dateConvert(item.ordertime),
      delivery_charge: item.delivery_charge,
      gst: item.gst,
      original_price:item.original_price,
      discount_amount:item.discount_amount,
      refund_amount:item.refund_amount,
      Paid_price:item.price,
      payment_type:item.payment_type==="0"?"Cash":"Online",
      makeit_accept_time: this.dateConvert(item.makeit_accept_time),
      makeit_actual_preparing_time:this.dateConvert(item.makeit_actual_preparing_time),
      makeit_expected_preparing_time:this.dateConvert(item.makeit_expected_preparing_time), 
      order_assigned_time:this.dateConvert(item.order_assigned_time),
      moveit_accept_time: this.dateConvert(item.moveit_accept_time),
      moveit_actual_delivered_time:this.dateConvert(item.moveit_actual_delivered_time),
      moveit_expected_delivered_time:this.dateConvert(item.moveit_expected_delivered_time),
      moveit_reached_time:this.dateConvert(item.moveit_reached_time),
      moveit_remarks_order: item.moveit_remarks_order,
      cancel_by: item.cancel_by===0?"":item.cancel_by===1?"EAT":"Kitchen",
      cancel_charge: item.cancel_charge,
      cancel_reason:item.cancel_reason,
      cancel_time:this.dateConvert(item.cancel_time),
      item_missing: item.item_missing===0?"":"True",
      item_missing_reason: item.item_missing_reason,
  }));
    //let newOrderList = order_data.map(({cus_address, ...rest}) => rest);
    return newOrderList;
  }

  render() {
    var order_data = this.props.order_data || [];
    var totalamount = this.props.totalamount || 0;
    var startDate = this.props.startDate || currentDate;
    var endDate = this.props.endDate || currentDate;
    var pdfstartdate=Moment(startDate).format("DD-MM-YYYY")
    var pdfenddate=Moment(endDate).format("DD-MM-YYYY")
    var newOrderList=this.genratePdf(order_data);
    return (
      <div className="pd-8">
        <Card>
          <CardHeader>
            <Row>
              <Col lg="2">COD/Online Amount </Col>
              <Col lg="3">
                <Row className="font-size-12 txt-align-center color-grey">
                  <div style={{ textTransform: "capitalize" }}>
                    Start Date :{" "}
                    {Moment(startDate).format("DD-MMM-YYYY / hh:mm a")}{" "}
                  </div>
                </Row>
                <Row
                  className="font-size-12 txt-align-center color-grey"
                  style={{ textTransform: "capitalize" }}
                >
                  End Date : {Moment(endDate).format("DD-MMM-YYYY / hh:mm a")}
                </Row>
              </Col>
              <Col lg="3" className="txt-color-blue">
                Total Amount : {totalamount}
              </Col>
              <Col lg="2" className="txt-align-right">{order_data.length>0&&<CSVLink filename={this.props.paymentType === 0?"cod_"+pdfstartdate+"_"+pdfenddate+".csv":"online_"+pdfstartdate+"_"+pdfenddate+".csv"} data={newOrderList} target="_blank"><FaFileExcel color={"green"} size={"2em"}/></CSVLink>
      //         (<PDFDownloadLink 
      //   document={<PdfDocument paymentType={this.props.paymentType === 0?"COD":"ONLINE"} data={order_data} startdate={pdfstartdate} enddate={pdfenddate}/>}
      //   fileName={this.props.paymentType === 0?"cod_"+pdfstartdate+"_"+pdfenddate+".pdf":"online_"+pdfstartdate+"_"+pdfenddate+".pdf"}
      //   style={{
      //     textDecoration: "none",
      //     padding: "10px",
      //     color: "#4a4a4a",
      //     backgroundColor: "#f2f2f2",
      //     border: "1px solid #4a4a4a"
      //   }}
      // >
      //   {({ blob, url, loading, error }) =>
      //     loading ? "Loading document..." : "Download Pdf"
      //   }
      // </PDFDownloadLink>)
              }</Col>
              <Col lg="1">
                <ButtonGroup size="sm">
                  <Button
                    color="primary"
                    onClick={() => this.filterPaymentType(0)}
                    active={this.props.paymentType === 0}
                  >
                    COD
                  </Button>
                  <Button
                    color="primary"
                    onClick={() => this.filterPaymentType(1)}
                    active={this.props.paymentType === 1}
                  >
                    Online
                  </Button>
                </ButtonGroup>
              </Col>
              {/* <Col><DropDownList  "timePicker": true,
    "timePickerSeconds": true,filterSelected={filterSelected} filterList={filterList} filterTable={this.filterTable} /></Col> */}
              <Col className="txt-align-right" lg="1">
                <DateRangePicker
                  opens="left"
                  maxDate={today}
                  onApply={this.daterangSelect}
                  timePicker={true}
                >
                  <Button>
                    <i className="far fa-calendar-alt"></i>
                  </Button>
                </DateRangePicker>
              </Col>
              {/* <Col lg="1"> <Button className="mr-r-10" onClick={history.goBack}>
              Back
            </Button></Col> */}
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
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {order_data.map((item, i) => (
                  <tr key={i}>
                    <th scope="row">{i + 1}</th>
                    <th>{item.orderid}</th>
                    <td>
                      {Moment(item.ordertime).format("DD-MMM-YYYY/hh:mm a")}
                    </td>
                    <td>{item.price}</td>
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductCount);
