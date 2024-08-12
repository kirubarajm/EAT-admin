import Moment from "moment";
import React from "react";
import DateRangePicker from "react-bootstrap-daterangepicker";
import { CSVLink } from "react-csv";
import { connect } from "react-redux";
import { Button, Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import AxiosRequest from "../AxiosRequest";
import { ACCOUNT_REPORTS_CASH, ACCOUNT_REPORTS_ONLINE, CANCELLED_ORDERS_FOLLOW_UP, COUPON_USED_ORDERS, CUSTOMER_EXPERIENCE, DRIVER_COD_REPORT, FUNNEL_ORDERED_REPORT, ITEM_WISE_REPORT_FINANCIAL, KITCHEN_WISE_REPORT, LIVE_PRODUCT_HISTORY_REPORT, LOST_CUSTOMER_REPORT, MAKEIT_MASTER_REPORT_FINANCIAL, MAKEIT_TIME_LOG_REPORT, MILE_MOVEIT_AVERAGE_DELIVERY, MILE_MOVEIT_ORDERS_DELIVERY, MOVEIT_MASTER_REPORT_FINANCIAL, MOVEIT_ORDERS_DELIVERY, MOVEIT_TIME_LOG_REPORT, NEW_USERS_ORDER_REPORT, NEW_USERS_REPORT, ONLINE_REFUNDED_ORDERS, ORDERS_CANCELED_REPORT, ORDERS_COST_REPORT, ORDERS_DEATIL_REPORT_FINANCIAL, ORDERS_DELIVERED_VIA_ADMIN_REPORT, ORDERS_MOVEIT_REPORT, ORDERS_TURNORUND_REPORT_MAKEIT, ORDERS_TURNORUND_REPORT_MOVEIT, ORIGINAL_KITCHEN_PREPARED_AFTER_CANCEL_REPORT, ORIGINAL_KITCHEN_PREPARED_BEFORE_CANCEL_REPORT, ORIGINAL_KITCHEN_WISE_REPORT, ORIGINAL_PRODUCT_WISE_REPORT, PRODUCT_REPORT, REAL_KITCHEN_ORDERS_CANCELED_REPORT, REAL_KITCHEN_SUCCESSIONRATE_REPORT, REPORTS_CLEAR, RETAINED_CUSTOMER_REPORT, TOTAL_ORDERS_REPORT, TOTAL_ORIGINAL_ORDERS_REPORT, TOTAL_VIRTUAL_ORDERS_REPORT, UNCLOSED_ORDERS, USER_GROWTH_REPORT, USER_ORDER_HISTORY_REPORT, VIRTUAL_KITCHEN_PREPARED_AFTER_CANCEL_REPORT, VIRTUAL_KITCHEN_PREPARED_BEFORE_CANCEL_REPORT, VIRTUAL_KITCHEN_SUCCESSIONRATE_REPORT, VIRTUAL_KITCHEN_WISE_REPORT, VIRTUAL_ORDERS_PURCHASED, VIRTUAL_PRODUCT_WISE_REPORT, XFACTOR_ORDERED_REPORT, ZONE_LEVEL_PERFORMANCE } from "../constants/actionTypes";
import { history } from "../store";
import { MOVEIT_LOGIN } from "../utils/constant";
import { isLoggedInUser } from "../utils/ConstantFunction";
const mapStateToProps = state => ({ ...state.reports });
const mapDispatchToProps = dispatch => ({
  onClearList: () =>
    dispatch({
      type: REPORTS_CLEAR
    }),
  onGetMoveitOrdersReport: data =>
    dispatch({
      type: ORDERS_MOVEIT_REPORT,
      payload: AxiosRequest.Orders.getOrdersMoveitReport(data)
    }),
  onGetTurnaroundMakeitOrdersReport: data =>
    dispatch({
      type: ORDERS_TURNORUND_REPORT_MAKEIT,
      payload: AxiosRequest.Orders.getOrdersTurnaroundtimeMakeitReport(data)
    }),
  onGetTurnaroundMoveitOrdersReport: data =>
    dispatch({
      type: ORDERS_TURNORUND_REPORT_MOVEIT,
      payload: AxiosRequest.Orders.getOrdersTurnaroundtimeMoveitReport(data)
    }),
  onGetOrdersCanceledReport: data =>
    dispatch({
      type: ORDERS_CANCELED_REPORT,
      payload: AxiosRequest.Orders.getOrdersCanceledReport(data)
    }),
    onGetRealkitchenOrdersCanceledReport: data =>
    dispatch({
      type: REAL_KITCHEN_ORDERS_CANCELED_REPORT,
      payload: AxiosRequest.Orders.getRealkitchenOrdersCanceledReport(data)
    }),
  onGetOrdersCostReport: data =>
    dispatch({
      type: ORDERS_COST_REPORT,
      payload: AxiosRequest.Orders.getOrdersCostReport(data)
    }),
    onGetOrdersAdminDeliveryReport: data =>
    dispatch({
      type: ORDERS_DELIVERED_VIA_ADMIN_REPORT,
      payload: AxiosRequest.Orders.getOrdersAdminDeliveryReport(data)
    }),
    onGetNewUserReport: data =>
    dispatch({
      type: NEW_USERS_REPORT,
      payload: AxiosRequest.Orders.getnewUserReport(data)
    }),
    onGetNewUserOrderReport: data =>
    dispatch({
      type: NEW_USERS_ORDER_REPORT,
      payload: AxiosRequest.Orders.getnewUserOrderReport(data)
    }),
    onGetRetainedCustomerReport: data =>
    dispatch({
      type: RETAINED_CUSTOMER_REPORT,
      payload: AxiosRequest.Orders.getretainedCustomerReport(data)
    }),
    onGetOrdersReport: data =>
    dispatch({
      type: TOTAL_ORDERS_REPORT,
      payload: AxiosRequest.Orders.getOrderReport(data)
    }),

    onGetVirtualOrdersReport: data =>
    dispatch({
      type: TOTAL_VIRTUAL_ORDERS_REPORT,
      payload: AxiosRequest.Orders.getVirtualOrderReport(data)
    }),

    onGetOriginalOrdersReport: data =>
    dispatch({
      type: TOTAL_ORIGINAL_ORDERS_REPORT,
      payload: AxiosRequest.Orders.getOriginalOrderReport(data)
    }),


    onGetUserOrderHistoryReport: data =>
    dispatch({
      type: USER_ORDER_HISTORY_REPORT,
      payload: AxiosRequest.Orders.getUserOrderhistoryReport(data)
    }),
    onGetProdcutWiseReport: data =>
    dispatch({
      type: PRODUCT_REPORT,
      payload: AxiosRequest.Orders.getProducteport(data)
    }),
    onGetDriverCOD: data =>
    dispatch({
      type: DRIVER_COD_REPORT,
      payload: AxiosRequest.Orders.getDriverCODReport(data)
    }),
    onGetAccountsOnline: data =>
    dispatch({
      type: ACCOUNT_REPORTS_ONLINE,
      payload: AxiosRequest.Orders.getAccountsReport(data)
    }),
    onGetAccountsCash: data =>
    dispatch({
      type: ACCOUNT_REPORTS_CASH,
      payload: AxiosRequest.Orders.getAccountsReport(data)
    }),
    onGetKitchenWishReport: data =>
    dispatch({
      type: KITCHEN_WISE_REPORT,
      payload: AxiosRequest.Orders.getKitchenReport(data)
    }),
    onGetVirtualKitchenWishReport: data =>
    dispatch({
      type: VIRTUAL_KITCHEN_WISE_REPORT,
      payload: AxiosRequest.Orders.getVirtualKitchenReport(data)
    }),
    onGetOriginalKitchenWishReport: data =>
    dispatch({
      type: ORIGINAL_KITCHEN_WISE_REPORT,
      payload: AxiosRequest.Orders.getOriginalKitchenReport(data)
    }),

    onGetVirtualProdcutWiseReport: data =>
    dispatch({
      type: VIRTUAL_PRODUCT_WISE_REPORT,
      payload: AxiosRequest.Orders.getVirtualProducteport(data)
    }),

    onGetOriginalProdcutWiseReport: data =>
    dispatch({
      type: ORIGINAL_PRODUCT_WISE_REPORT,
      payload: AxiosRequest.Orders.getOriginalProducteport(data)
    }),
    onGetVirtualKitchenPreparedAfterCancel: data =>
    dispatch({
      type: VIRTUAL_KITCHEN_PREPARED_AFTER_CANCEL_REPORT,
      payload: AxiosRequest.Orders.getVirtualKitchenPreparedAfterCancelreport(data)
    }),
    onGetRealKitchenPreparedAfterCancel: data =>
    dispatch({
      type: ORIGINAL_KITCHEN_PREPARED_AFTER_CANCEL_REPORT,
      payload: AxiosRequest.Orders.getOriginalKitchenPreparedAfterCancelreport(data)
    }),
    onGetVirtualKitchenPreparedBeforeCancel: data =>
    dispatch({
      type: VIRTUAL_KITCHEN_PREPARED_BEFORE_CANCEL_REPORT,
      payload: AxiosRequest.Orders.getVirtualKitchenPreparedBeforeCancelreport(data)
    }),
    onGetRealKitchenPreparedBeforeCancel: data =>
    dispatch({
      type: ORIGINAL_KITCHEN_PREPARED_BEFORE_CANCEL_REPORT,
      payload: AxiosRequest.Orders.getOriginalKitchenPreparedBeforeCancelreport(data)
    }),
    onGetVirtualKitchenWiseSuccessionrate : data =>
    dispatch({
      type: VIRTUAL_KITCHEN_SUCCESSIONRATE_REPORT,
      payload: AxiosRequest.Orders.getKitchenWiseSuccessionRatereport(data)
    }),
    onGetRealKitchenWiseSuccessionrate : data =>
    dispatch({
      type: REAL_KITCHEN_SUCCESSIONRATE_REPORT,
      payload: AxiosRequest.Orders.getKitchenWiseSuccessionRatereport(data)
    }),
    onGetVirtualOrdersPurchased : data =>
    dispatch({
      type: VIRTUAL_ORDERS_PURCHASED,
      payload: AxiosRequest.Orders.getVirtualordersPurchased(data)
    }),
    onGetLostCustomerReport : data =>
    dispatch({
      type: LOST_CUSTOMER_REPORT,
      payload: AxiosRequest.Orders.getLostCustomerReport(data)
    }),
    onGetFunnelOrdersReport : data =>
    dispatch({
      type: FUNNEL_ORDERED_REPORT,
      payload: AxiosRequest.Orders.getFunnelOrdersReport(data)
    }),
    onGetXFactorsOrdersReport : data =>
    dispatch({
      type: XFACTOR_ORDERED_REPORT,
      payload: AxiosRequest.Orders.getXFatorsOrdersReport(data)
    }),
    onGetMoveitOrdersDeliveryReport : data =>
    dispatch({
      type: MOVEIT_ORDERS_DELIVERY,
      payload: AxiosRequest.Orders.getMoveitOrdersDeliveryReport(data)
    }),
    onGetMileBasedMoveitOrdersDeliveryReport : data =>
    dispatch({
      type: MILE_MOVEIT_ORDERS_DELIVERY,
      payload: AxiosRequest.Orders.getMileBasedMoveitOrdersDeliveryReport(data)
    }),
    onGetMileBasedMoveitAverageDeliveryReport : data =>
    dispatch({
      type: MILE_MOVEIT_AVERAGE_DELIVERY,
      payload: AxiosRequest.Orders.getMileBasedMoveitAverageDeliveryReport(data)
    }),
    onGetOnlineRefundedOrders : data =>
    dispatch({
      type: ONLINE_REFUNDED_ORDERS,
      payload: AxiosRequest.Orders.getOnlineRefundedOrdersReport(data)
    }),
    onGetCouponUsedOrders : data =>
    dispatch({
      type: COUPON_USED_ORDERS,
      payload: AxiosRequest.Orders.getCouponUsedOrdersReport(data)
    }),

    onGetOrdersFinancialReport : data =>
    dispatch({
      type: ORDERS_DEATIL_REPORT_FINANCIAL,
      payload: AxiosRequest.Orders.getOrdersFinancialReport(data)
    }),

    onGetItemsWiseFinancialReport : data =>
    dispatch({
      type: ITEM_WISE_REPORT_FINANCIAL,
      payload: AxiosRequest.Orders.getItemsWiseFinancialReport(data)
    }),

    onGetMoveitMasterReport : data =>
    dispatch({
      type: MOVEIT_MASTER_REPORT_FINANCIAL,
      payload: AxiosRequest.Orders.getMoveitMasterReport(data)
    }),

    onGetMakeitMasterReport : data =>
    dispatch({
      type: MAKEIT_MASTER_REPORT_FINANCIAL,
      payload: AxiosRequest.Orders.getMakeitMasterReport(data)
    }),

    onGetCancelOrdersFollowUpReport : data =>
    dispatch({
      type: CANCELLED_ORDERS_FOLLOW_UP,
      payload: AxiosRequest.Orders.getCancelOrdersFollowUpReport(data)
    }),

    onGetUnclosedOrdersReport : data =>
    dispatch({
      type: UNCLOSED_ORDERS,
      payload: AxiosRequest.Orders.getUnclosedOrdersReport(data)
    }),
    onGetCustomerExperienceReport : data =>
    dispatch({
      type: CUSTOMER_EXPERIENCE,
      payload: AxiosRequest.Orders.getCustomerExperienceReport(data)
    }),
    onGetZoneLevelPerformanceReport : () =>
    dispatch({
      type: ZONE_LEVEL_PERFORMANCE,
      payload: AxiosRequest.Orders.getZoneLevelPerformance()
    }),
    onGetUserGrowth: data =>
    dispatch({
      type: USER_GROWTH_REPORT,
      payload: AxiosRequest.Orders.getUserGrowth(data)
    }),

    onGetRawDataForLiveProduct: data =>
    dispatch({
      type: LIVE_PRODUCT_HISTORY_REPORT,
      payload: AxiosRequest.Orders.onGetRawDataForLiveProduct(data)
    }),
    onGetRawDataForMakeitTimeLog: data =>
    dispatch({
      type: MAKEIT_TIME_LOG_REPORT,
      payload: AxiosRequest.Orders.onGetRawDataForMakeitTimeLog(data)
    }),
    onGetRawDataForMoveitTimeLog: data =>
    dispatch({
      type: MOVEIT_TIME_LOG_REPORT,
      payload: AxiosRequest.Orders.onGetRawDataForMoveitTimeLog(data)
    }),
});

var data;
var singledata;
var startDate;
var endDate;

var startDateforRaw;
var endDateforRaw;

var today = "0";
var last7days = "0";
var reportType = 0;
var reportTypeName = "";

class ReportPage extends React.Component {
  constructor() {
    super();
  }
  componentWillMount() {
    today = Moment(new Date()).format("YYYY-MM-DD");
    var date = new Date(today);
    date.setDate(date.getDate()-6);
    last7days = date;
    this.setState({ startdate: today,enddate:today,startdateraw: today,enddateraw:today,singledate:today,startDateUsergrowth:today});
    this.props.onClearList();
    this.getData = this.getData.bind(this);
    this.getDateUserGrowth=this.getDateUserGrowth.bind(this);
    this.daterangSelect = this.daterangSelect.bind(this);
    this.daterangSelectforraw=this.daterangSelectforraw.bind(this);
    this.getAuth =this.getAuth.bind(this);
    this.singleDateSelect=this.singleDateSelect.bind(this);
    this.singleDateSelectUserGrowth =this.singleDateSelectUserGrowth.bind(this);
  }

 
  getAuth(){

    if(isLoggedInUser()===MOVEIT_LOGIN){
    }
    return false;
  }
  getData(type) {
    reportType = type;
    data = {
      fromdate: this.state.startdate,
      todate:this.state.enddate
    };
    
    if (reportType === ORDERS_MOVEIT_REPORT) this.props.onGetMoveitOrdersReport(data);
    if (reportType === ORDERS_TURNORUND_REPORT_MOVEIT) this.props.onGetTurnaroundMoveitOrdersReport(data);
    if (reportType === ORDERS_TURNORUND_REPORT_MAKEIT) this.props.onGetTurnaroundMakeitOrdersReport(data);
    if (reportType === ORDERS_CANCELED_REPORT) this.props.onGetOrdersCanceledReport(data);
    if (reportType === REAL_KITCHEN_ORDERS_CANCELED_REPORT) this.props.onGetRealkitchenOrdersCanceledReport(data);
    if (reportType === ORDERS_COST_REPORT) this.props.onGetOrdersCostReport(data);
    if (reportType === ORDERS_DELIVERED_VIA_ADMIN_REPORT) this.props.onGetOrdersAdminDeliveryReport(data);
    if (reportType === NEW_USERS_REPORT) this.props.onGetNewUserReport(data);
    if (reportType === NEW_USERS_ORDER_REPORT) this.props.onGetNewUserOrderReport(data);
    if (reportType === RETAINED_CUSTOMER_REPORT) this.props.onGetRetainedCustomerReport(data);
    if (reportType === USER_ORDER_HISTORY_REPORT) this.props.onGetUserOrderHistoryReport(data);
    if (reportType === TOTAL_ORDERS_REPORT) this.props.onGetOrdersReport(data);
    if (reportType === PRODUCT_REPORT) this.props.onGetProdcutWiseReport(data);
    if (reportType === DRIVER_COD_REPORT) this.props.onGetDriverCOD(data);
    if (reportType === VIRTUAL_ORDERS_PURCHASED) this.props.onGetVirtualOrdersPurchased(data);
    if (reportType === LOST_CUSTOMER_REPORT) this.props.onGetLostCustomerReport({"max":15,"min":7});
    if (reportType === FUNNEL_ORDERED_REPORT) this.props.onGetFunnelOrdersReport(data);
    if (reportType === XFACTOR_ORDERED_REPORT) this.props.onGetXFactorsOrdersReport(data);
    if (reportType === MOVEIT_ORDERS_DELIVERY) this.props.onGetMoveitOrdersDeliveryReport(data);
    if (reportType === MILE_MOVEIT_ORDERS_DELIVERY) this.props.onGetMileBasedMoveitOrdersDeliveryReport(data);
    if (reportType === MILE_MOVEIT_AVERAGE_DELIVERY) this.props.onGetMileBasedMoveitAverageDeliveryReport(data);
    if (reportType === ONLINE_REFUNDED_ORDERS) this.props.onGetOnlineRefundedOrders(data);
    if (reportType === COUPON_USED_ORDERS) this.props.onGetCouponUsedOrders(data);

    if (reportType === ORDERS_DEATIL_REPORT_FINANCIAL) this.props.onGetOrdersFinancialReport(data);
    if (reportType === ITEM_WISE_REPORT_FINANCIAL) this.props.onGetItemsWiseFinancialReport(data);
    if (reportType === MOVEIT_MASTER_REPORT_FINANCIAL) this.props.onGetMoveitMasterReport(data);
    if (reportType === MAKEIT_MASTER_REPORT_FINANCIAL) this.props.onGetMakeitMasterReport(data);

    if (reportType === CANCELLED_ORDERS_FOLLOW_UP) this.props.onGetCancelOrdersFollowUpReport(data);
    if (reportType === UNCLOSED_ORDERS) this.props.onGetUnclosedOrdersReport(data);
    if (reportType === CUSTOMER_EXPERIENCE) this.props.onGetCustomerExperienceReport(data);
    if (reportType === ZONE_LEVEL_PERFORMANCE) this.props.onGetZoneLevelPerformanceReport();
    
    if (reportType === ACCOUNT_REPORTS_ONLINE){
      data.payment_type=1;
      data.ordertype=0;
      this.props.onGetAccountsOnline(data);
    }
    if (reportType === ACCOUNT_REPORTS_CASH){
      data.payment_type=0;
      data.ordertype=0;
      this.props.onGetAccountsCash(data);
    }

    if (reportType === KITCHEN_WISE_REPORT) {
      this.props.onGetKitchenWishReport(data);
    }
    if (reportType === VIRTUAL_KITCHEN_WISE_REPORT){
      this.props.onGetVirtualKitchenWishReport(data);
    }
    if (reportType === ORIGINAL_KITCHEN_WISE_REPORT){
      this.props.onGetOriginalKitchenWishReport(data);
    }

    if (reportType === VIRTUAL_PRODUCT_WISE_REPORT){
      this.props.onGetVirtualProdcutWiseReport(data);
    }
    if (reportType === ORIGINAL_PRODUCT_WISE_REPORT){
      this.props.onGetOriginalProdcutWiseReport(data);
    }

    if (reportType === TOTAL_VIRTUAL_ORDERS_REPORT){
      this.props.onGetVirtualOrdersReport(data);
    }

    if (reportType === TOTAL_ORIGINAL_ORDERS_REPORT){
      this.props.onGetOriginalOrdersReport(data);
    }

    if (reportType === VIRTUAL_KITCHEN_PREPARED_AFTER_CANCEL_REPORT){
      this.props.onGetVirtualKitchenPreparedAfterCancel(data);
    }
    if (reportType === ORIGINAL_KITCHEN_PREPARED_AFTER_CANCEL_REPORT){
      this.props.onGetRealKitchenPreparedAfterCancel(data);
    }
    if (reportType === VIRTUAL_KITCHEN_PREPARED_BEFORE_CANCEL_REPORT){
      this.props.onGetVirtualKitchenPreparedBeforeCancel(data);
    }
    if (reportType === ORIGINAL_KITCHEN_PREPARED_BEFORE_CANCEL_REPORT){
      this.props.onGetRealKitchenPreparedBeforeCancel(data);
    }
    if (reportType === VIRTUAL_KITCHEN_SUCCESSIONRATE_REPORT){
      singledata = {
        date: this.state.singledate,
        virtualkey:1,
        active_status:1
      };
      this.props.onGetVirtualKitchenWiseSuccessionrate(singledata);
    }
    if (reportType === REAL_KITCHEN_SUCCESSIONRATE_REPORT){
      singledata = {
        date: this.state.singledate,
        virtualkey:0,
        active_status:1
      };
      this.props.onGetRealKitchenWiseSuccessionrate(singledata);
    }
  }

  getDateUserGrowth(reportType){
    var data={
      date:this.state.startDateUsergrowth
    }
    if (reportType === USER_GROWTH_REPORT) this.props.onGetUserGrowth(data);
  }

  getRawData(reportType){
    var data = {
      fromdate: this.state.startdateraw,
      todate:this.state.enddateraw
    };
    if (reportType === LIVE_PRODUCT_HISTORY_REPORT) this.props.onGetRawDataForLiveProduct(data);
    if (reportType === MAKEIT_TIME_LOG_REPORT) this.props.onGetRawDataForMakeitTimeLog(data);
    if (reportType === MOVEIT_TIME_LOG_REPORT) this.props.onGetRawDataForMoveitTimeLog(data);
  }

  componentWillUnmount() {}

  daterangSelect(event, picker) {
    startDate = picker.startDate.format("YYYY-MM-DD");
    endDate = picker.endDate.format("YYYY-MM-DD");
    this.props.onClearList();
    this.setState({ startdate: startDate,enddate:endDate });
  }

  daterangSelectforraw(event, picker) {
    startDateforRaw = picker.startDate.format("YYYY-MM-DD");
    var date = new Date(startDateforRaw);
    date.setDate(date.getDate() + 6);
    endDateforRaw = date;//.format("YYYY-MM-DD");
    this.props.onClearList();
    this.setState({ startdateraw: startDateforRaw,enddateraw:endDateforRaw });
  }

  singleDateSelect(event, picker) {
    var startDate = picker.startDate.format("YYYY-MM-DD");
    this.setState({ singledate: startDate});
  }

  singleDateSelectUserGrowth(event, picker) {
    var startDateUsergrowth = picker.startDate.format("YYYY-MM-DD");
    this.setState({ startDateUsergrowth: startDateUsergrowth});
  }
  

  dateConvert(date) {
    return date ? Moment(date).format("DD-MMM-YYYY") : "";
  }
  //{"success":true,"status":true,"result":[{"orderid":1292,"ordertime":"2019-09-24 16:36:38","Accep_time":"00:00:47","Preparation_time":"00:00:03","Totaltime":"00:00:50"}]}
  genratePdf(order_data) {
    let newOrderList = [];
    if (!order_data) return newOrderList;
    if (order_data.length < 0) return newOrderList;
    if (reportType === ORDERS_MOVEIT_REPORT) {
      newOrderList = order_data.map(item => ({
        userid: item.userid,
        name: item.name,
        no_of_orders: item.no_of_orders
      }));
    } else if (reportType === ORDERS_TURNORUND_REPORT_MOVEIT) {
      newOrderList = order_data.map(item => ({
        orderid: item.orderid,
        ordertime: item.ordertime,
        Moveit_Accept_time: item.Moveit_Accept_time,
        Moveit_delivered_time: item.Moveit_delivered_time,
        Totaltime: item.Totaltime,
        moveit_Assigned_time: item.moveitAssignedtime,
        moveit_accept_time:item.moveitaccepttime,
        moveit_pickup_time:item.moveitpickuptime,
        moveit_deliverd_time:item.moveitdeliverdtime,
        kitchen_type: item.kitchen,
      }));
    } else if (reportType === ORDERS_TURNORUND_REPORT_MAKEIT) {
      newOrderList = order_data.map(item => ({
        orderid: item.orderid,
        ordertime: item.ordertime,
        Accep_time: item.Accep_time,
        Preparation_time: item.Preparation_time,
        Totaltime: item.Totaltime
      }));
    } else if (reportType === ORDERS_CANCELED_REPORT) {
      newOrderList = order_data.map(item => ({
        orderid: item.orderid,
        ordertime: item.ordertime,
        kitchen_name:item.brandname,
        gst: item.gst,
        original_price: item.original_price,
        refund_amount:item.refund_amount,
        discount_amount: item.discount_amount,
        Total_amount_paid:item.price,
        order_type:item.ordertype===1?'Virtual':'Real',
        cancel_charge:item.cancel_charge,
        canceled_by: item.canceled_by,
        cancel_reason: item.cancel_reason,
        hub_id:item.makeithub_id,
        hub_name:item.makeithub_name,
        hub_address:item.address,
      }));
    }else if (reportType === REAL_KITCHEN_ORDERS_CANCELED_REPORT) {
      newOrderList = order_data.map(item => ({
        orderid: item.orderid,
        ordertime: item.ordertime,
        kitchen_name:item.brandname,
        gst: item.gst,
        original_price: item.original_price,
        refund_amount:item.refund_amount,
        discount_amount: item.discount_amount,
        Total_amount_paid:item.price,
        order_type:item.ordertype===1?'Virtual':'Real',
        cancel_charge:item.cancel_charge,
        canceled_by: item.canceled_by,
        cancel_reason: item.cancel_reason,
      }));
    } else if (reportType === ORDERS_COST_REPORT) {
      newOrderList = order_data.map(item => ({
        orderid: item.orderid,
        ordertime: item.ordertime,
        original_price: item.original_price,
        discount_amount: item.discount_amount
      }));
    }else if (reportType === ORDERS_DELIVERED_VIA_ADMIN_REPORT) {
      newOrderList = order_data.map(item => ({
        orderid: item.orderid,
        ordertime: item.created_at,
        who: item.who,
        reason: item.reason
      }));
    }else if (reportType === NEW_USERS_REPORT) {
      newOrderList = order_data.map(item => ({
        userid: item.userid,
        name: item.name,
        //phoneno: item.phoneno,
        registered_at: item.created_at,
      }));
    }else if (reportType === NEW_USERS_ORDER_REPORT) {
      newOrderList = order_data.map(item => ({
        userid: item.userid,
        name: item.name,
       // phoneno: item.phoneno,
        order_count: item.Total_orders,
      }));
    }else if (reportType === RETAINED_CUSTOMER_REPORT) {
      newOrderList = order_data.map(item => ({
        userid: item.userid,
        name: item.name,
       // phoneno: item.phoneno,
        order_count: item.Total_orders,
      }));
    }else if (reportType === USER_ORDER_HISTORY_REPORT) {
      newOrderList = order_data.map(item => ({
        userid: item.userid,
        name: item.name,
        //phoneno: item.phoneno,
        order_count: item.Total_orders,
      }));
    }else if (reportType === TOTAL_ORDERS_REPORT) {
      newOrderList = order_data.map(item => ({
        orderid: item.orderid,
        Kitchen_name: item.brandname,
        original_price: item.original_price,
        refund_amount: item.refund_amount,
        discount_amount: item.discount_amount,
        payment_type: item.payment_type,
        ordertime:item.created_at,
        makeit_accept_time:item.makeit_accept_time,
        assign_time:item.order_assigned_time,
        moveit_accept_time:item.moveit_accept_time,
        preparing_time:item.makeit_actual_preparing_time,
        pickup_time:item.moveit_pickup_time,
        delivered_time:item.moveit_actual_delivered_time,
        product:item.product
      }));
    }else if (reportType === PRODUCT_REPORT) {
      newOrderList = order_data.map(item => ({
        productname: item.productname,
        makeit_userid: item.makeit_userid,
        productid: item.productid,
        quantity: item.quan,
        kitchen_name:item.brandname,
        hub_id:item.makeithub_id,
        hub_name:item.makeithub_name,
        hub_address:item.address,
      }));
    }else if (reportType === DRIVER_COD_REPORT) {
      newOrderList = order_data.map(item => ({
        userid: item.userid,
        name: item.name,
        //phoneno: item.phoneno,
        order_count: item.ordercount,
        totalamount:item.totalamount,
        hub_id:item.hub_id,
        hubname:item.hubname,
        zone_id:item.zone_id,
        zonename:item.zonename,
      }));
    }else if (reportType === ACCOUNT_REPORTS_ONLINE || reportType === ACCOUNT_REPORTS_CASH) {
      newOrderList = order_data.map(item => ({
        OrderDate: item.todaysdate,
        Delivered_Orders: item.Delivered_Orders,
        Totalmoney_received: item.Totalmoney_received,
        gst : item.gst,
        Totalmoney_without_discount:item.Totalmoney_without_discount,
        refund_coupon_amount:item.refund_coupon_amount,
        discount_amount:item.discount_amount,
        refund_online:item.refund_online,
        cancellation_charges:item.cancellation_charges,
        delivery_charge:item.delivery_charge,
        payment_type:item.payment_type,
      }));
    }else if (reportType === KITCHEN_WISE_REPORT) {
      newOrderList = order_data.map(item => ({
        OrderDate: item.Date,
        kitchen_name: item.brandname,
        MakeitEarnings: item.MakeitEarnings,
        Sellingprice : item.Sellingprice,
        ordercount:item.ordercount,
      }));
    }else if (reportType === VIRTUAL_KITCHEN_WISE_REPORT) {
      newOrderList = order_data.map(item => ({
        OrderDate: item.Todaysdate,
        Kitchen_id: item.kitchen_id,
        kitchen_name: item.brandname,
        MakeitEarnings: item.MakeitEarnings,
        Sellingprice : item.Sellingprice,
        commission:item.commission,
        hub_location:item.hub_location
      }));
    }else if (reportType === ORIGINAL_KITCHEN_WISE_REPORT) {
      newOrderList = order_data.map(item => ({
        OrderDate: item.Todaysdate,
        Kitchen_id: item.kitchen_id,
        kitchen_name: item.brandname,
        MakeitEarnings: item.MakeitEarnings,
        Sellingprice : item.Sellingprice,
        commission:item.commission,
      }));
    }else if (reportType === VIRTUAL_PRODUCT_WISE_REPORT) {
      newOrderList = order_data.map(item => ({
        productname: item.productname,
        makeit_userid: item.makeit_userid,
        productid: item.productid,
        quantity: item.quan,
        kitchen_name:item.brandname,
        hub_name:item.makeithub_name,
        hub_location:item.hub_location,
      }));
    }else if (reportType === ORIGINAL_PRODUCT_WISE_REPORT) {
      newOrderList = order_data.map(item => ({
        productname: item.productname,
        makeit_userid: item.makeit_userid,
        productid: item.productid,
        quantity: item.quan,
        kitchen_name:item.brandname,
      }));
    }
    else if (reportType === TOTAL_VIRTUAL_ORDERS_REPORT) {
      newOrderList = order_data.map(item => ({
        orderid: item.orderid,
        Kitchen_name: item.brandname,
        gst: item.gst,
        original_price: item.original_price,
        refund_amount: item.refund_amount,
        discount_amount: item.discount_amount,
        Total_amount_paid:item.price,
        payment_type: item.payment_type,
        order_date:item.orderdate,
        order_time:item.ordertime,
        makeit_accept_date:item.makeitacceptdate,
        makeit_accept_time:item.makeitaccepttime,
        makeit_actual_preparing_date:item.makeitactualpreparingdate,
        makeit_actual_preparingtime:item.makeitactualpreparingtime,
        moveit_assigned_date:item.moveitassigneddate,
        moveit_assigned_time:item.moveitassignedtime,
        moveit_assign_lat: item.moveit_assign_lat,
        moveit_assign_long: item.moveit_assign_long,
        moveit_accept_date:item.moveitacceptdate,
        moveit_accept_time:item.moveitaccepttime,
        moveit_accept_lat: item.moveit_accept_lat,
        moveit_accept_long: item.moveit_accept_long,
        moveit_pickup_date:item.moveitpickupdate,
        moveit_pickup_time:item.moveitpickuptime,
        moveit_Pickup_lat: item.moveit_Pickup_lat,
        moveit_Pickup_long: item.moveit_Pickup_long,
        moveit_actual_delivered_date:item.moveitactualdelivereddate,
        moveit_actual_delivered_time:item.moveitactualdeliveredtime,
        moveit_delivery_lat: item.moveit_delivery_lat,
        moveit_delivery_long: item.moveit_delivery_long,
        product:item.product,
        hub_location:item.hub_location,
        MakeitEarnings:item.MakeitEarnings,
        delivered_by:item.delivered_by
      }));
    }
    else if (reportType === TOTAL_ORIGINAL_ORDERS_REPORT) {
      newOrderList = order_data.map(item => ({
        orderid: item.orderid,
        Kitchen_name: item.brandname,
        gst: item.gst,
        original_price: item.original_price,
        refund_amount: item.refund_amount,
        discount_amount: item.discount_amount,
        Total_amount_paid:item.price,
        payment_type: item.payment_type,
        order_date:item.orderdate,
        order_time:item.ordertime,
        makeit_accept_date:item.makeitacceptdate,
        makeit_accept_time:item.makeitaccepttime,
        makeit_actual_preparing_date:item.makeitactualpreparingdate,
        makeit_actual_preparingtime:item.makeitactualpreparingtime,
        moveit_assigned_date:item.moveitassigneddate,
        moveit_assigned_time:item.moveitassignedtime,
        moveit_assign_lat: item.moveit_assign_lat,
        moveit_assign_long: item.moveit_assign_long,
        moveit_accept_date:item.moveitacceptdate,
        moveit_accept_time:item.moveitaccepttime,
        moveit_accept_lat: item.moveit_accept_lat,
        moveit_accept_long: item.moveit_accept_long,
        moveit_pickup_date:item.moveitpickupdate,
        moveit_pickup_time:item.moveitpickuptime,
        moveit_Pickup_lat: item.moveit_Pickup_lat,
        moveit_Pickup_long: item.moveit_Pickup_long,
        moveit_actual_delivered_date:item.moveitactualdelivereddate,
        moveit_actual_delivered_time:item.moveitactualdeliveredtime,
        moveit_delivery_lat: item.moveit_delivery_lat,
        moveit_delivery_long: item.moveit_delivery_long,
        product:item.product,
        MakeitEarnings:item.MakeitEarnings,
        delivered_by:item.delivered_by,
        packaging_cost:item.packaging_cost
      }));
    }else if (reportType === VIRTUAL_KITCHEN_PREPARED_AFTER_CANCEL_REPORT){
      newOrderList = order_data.map(item => ({
        Date: item.Todaysdate,
        Kitchen_id: item.kitchen_id,
        kitchen_name:item.brandname,
        MakeitEarnings: item.MakeitEarnings,
        AfterCancelAmount: item.AfterCancelAmount,
        Sellingprice: item.Sellingprice,
        Commission: item.commission,
      }));
    }else if (reportType === ORIGINAL_KITCHEN_PREPARED_AFTER_CANCEL_REPORT){
      newOrderList = order_data.map(item => ({
        Date: item.Todaysdate,
        Kitchen_id: item.kitchen_id,
        kitchen_name:item.brandname,
        MakeitEarnings: item.MakeitEarnings,
        AfterCancelAmount: item.AfterCancelAmount,
        Sellingprice: item.Sellingprice,
        Commission: item.commission,
      }));
    }else if (reportType === VIRTUAL_KITCHEN_PREPARED_BEFORE_CANCEL_REPORT){
      newOrderList = order_data.map(item => ({
        Date: item.Todaysdate,
        Kitchen_id: item.kitchen_id,
        kitchen_name:item.brandname,
        MakeitEarnings: item.MakeitEarnings,
        BeforeCancelAmount: item.BeforeCancelAmount,
        Sellingprice: item.Sellingprice,
        Commission: item.commission,
      }));
    }else if (reportType === ORIGINAL_KITCHEN_PREPARED_BEFORE_CANCEL_REPORT){
      newOrderList = order_data.map(item => ({
        Date: item.Todaysdate,
        Kitchen_id: item.kitchen_id,
        kitchen_name:item.brandname,
        MakeitEarnings: item.MakeitEarnings,
        BeforeCancelAmount: item.BeforeCancelAmount,
        Sellingprice: item.Sellingprice,
        Commission: item.commission,
      }));
    }else if (reportType === VIRTUAL_KITCHEN_SUCCESSIONRATE_REPORT ||reportType === REAL_KITCHEN_SUCCESSIONRATE_REPORT){
      newOrderList = order_data.map(item => ({
        Id: item.makeit_id,
        Date: item.date,
        Owner_name: item.name,
        Kitchen_name:item.brandname,
        Kitchen_percentage: item.kitchen_percentage,
      }));
    }else if (reportType === LOST_CUSTOMER_REPORT) {
      newOrderList = order_data.map(item => ({
        userid: item.userid,
        orderid: item.orderid,
        name: item.name,
        email: item.email,
        phoneno:item.phoneno,
      }));
    }
    //let newOrderList = order_data.map(({cus_address, ...rest}) => rest);
    return newOrderList;
  }

  render() {
    var pdfstartdate = Moment(this.state.startdate).format("DD-MM-YYYY");
    var pdfenddate = Moment(this.state.enddate).format("DD-MM-YYYY");
    var singelDate = Moment(this.state.singledate).format("DD-MM-YYYY");
    var moveitOrderCountData = this.genratePdf(this.props.moveit_count_data);
    var turnarountMoveitData = this.genratePdf(this.props.turnarount_moveit_data);
    var turnarountMakeitData = this.genratePdf(this.props.turnarount_makeit_data);
    var orderCanceledData = this.genratePdf(this.props.order_canceled_data);
    var realKitchenorderCanceledData = this.genratePdf(this.props.real_kitchen_order_canceled_data);
    var orderCostData = this.genratePdf(this.props.order_cost_data);
    var orderDeliveryViaAdmin = this.genratePdf(this.props.order_delivery_via_admin);
    var newUserReports = this.genratePdf(this.props.new_user_reports);
    var newUserOrdersReports = this.genratePdf(this.props.new_user_orders_reports);
    var retainedCustomerUsers = this.genratePdf(this.props.retained_customer_reports);
    var userOrdersHistory = this.genratePdf(this.props.user_order_history);
    var productWiseReport = this.genratePdf(this.props.product_wise_report);
    var driverViaCOD = this.genratePdf(this.props.driver_wise_cod);
    var totalOrdersReport = this.genratePdf(this.props.orders_report);
    var accountsOnlineReports = this.genratePdf(this.props.accounts_reports_online);
    var accountsCashReports = this.genratePdf(this.props.accounts_reports_cash);
    var kitchenWiseReports = this.genratePdf(this.props.kitchen_wise_reports);
    var VirtualkitchenWiseReports = this.genratePdf(this.props.virtual_kitchen_wise_reports);
    var OriginalkitchenWiseReports = this.genratePdf(this.props.original_kitchen_wise_reports);
    var VirtualProductWiseReports = this.genratePdf(this.props.virtual_product_wise_report);
    var OriginalProductWiseReports = this.genratePdf(this.props.original_product_wise_report);
    var VirtualOrderReports = this.genratePdf(this.props.virtual_orders_report);
    var OriginalOrderReports = this.genratePdf(this.props.original_orders_report);
    var VirtualKitchenPreparedAfterCancelReports = this.genratePdf(this.props.virtual_kitchen_prepared_canceled_report);
    var OriginalKitchenPreparedAfterCancelReports = this.genratePdf(this.props.original_kitchen_prepared_canceled_report);
    var VirtualKitchenPreparedBeforeCancelReports = this.genratePdf(this.props.virtual_kitchen_prepared_before_canceled_report);
    var OriginalKitchenPreparedBeforeCancelReports = this.genratePdf(this.props.original_kitchen_prepared_before_canceled_report);
    var VirtualKitchenSuccessionRateReports = this.genratePdf(this.props.virtual_kitchen_succession_rate_report);
    var RealKitchenSuccessionRateReports = this.genratePdf(this.props.real_kitchen_succession_rate_report);
    var VirtualOrdersPurchasedReports = this.props.virtual_orders_purchased_report || [];
    var LostCustomerReport = this.genratePdf(this.props.lost_customer_report);
    var FunnelOrdersReport = this.props.funnel_orders_report || [];
    var XFactorOrdersReport = this.props.xfactors_orders_report || [];
    var moveit_orders_delivery = this.props.moveit_orders_delivery || [];
    var maile_moveit_order_delivery = this.props.maile_moveit_order_delivery || [];
    var maile_moveit_average_delivery = this.props.maile_moveit_average_delivery || [];
    var refunded_oline_orders = this.props.refunded_oline_orders || [];
    var coupon_used_orders = this.props.coupon_used_orders || [];

    var Orders_detail_financial = this.props.orders_detail_financial || [];
    var Item_wise_financial = this.props.Item_wise_financial || [];
    var Moveit_master_financial = this.props.Moveit_master_financial || [];
    var Makeit_master_financial = this.props.Makeit_master_financial || [];

    var cancelled_orders_reports = this.props.cancelled_orders_reports || [];
    var unclosed_orders_reports = this.props.unclosed_orders_reports || [];
    var customer_experience_reports = this.props.customer_experience_reports || [];

    var user_growth_reports =this.props.user_growth_reports || [];

    var live_product_history_reports =this.props.live_product_history_reports || [];
    var makeit_time_log_reports =this.props.makeit_time_log_reports || [];
    var moveit_time_log_reports =this.props.moveit_time_log_reports || [];
    var makeitmetrix =this.props.makeitmetrix || [];
    var moveitmetrix =this.props.moveitmetrix || [];
    var ordermetrix =this.props.ordermetrix || [];
    var kitchenshutdownmetrix =this.props.kitchenshutdownmetrix || [];
    var logisticsshutdownmetrix =this.props.logisticsshutdownmetrix || [];

    return (
      <div className="pd-8">
        <Card>
          <CardHeader>
            <Row>
              <Col lg="3">Report </Col>
              <Col lg="6" className="font-size-12 txt-align-center color-grey">
                  <div style={{ textTransform: "capitalize" }}>
                    Start Date :{" "}
                    {Moment(this.state.startdate).format("DD-MMM-YYYY")}{" "}
                  </div>
                  <div style={{ textTransform: "capitalize" }}>
                    End Date :{" "}
                    {Moment(this.state.enddate).format("DD-MMM-YYYY")}{" "}
                  </div>
              </Col>
              
              <Col className="txt-align-right" lg="3">
                <DateRangePicker
                  opens="left"
                  maxDate={today}
                  onApply={this.daterangSelect}
                >
                  <Button className="mr-r-10">
                    <i className="far fa-calendar-alt"></i>
                  </Button>
                </DateRangePicker>
                <Button className="mr-r-10" onClick={history.goBack}>Back</Button>
              </Col>
            </Row>
          </CardHeader>
          <CardBody className="card-body-with-scroll pd-10">
          
              <div>
              <Row className="mr-t-10 txt-align-center">
              <Col lg="11"><strong>Zone Level Reports</strong> 
              </Col>
              </Row>
              <hr></hr>
              <Row className="mr-t-10">
                <Col>
                  <Button  color="primary" onClick={() => this.getData(ZONE_LEVEL_PERFORMANCE)}>
                   Zone Level Performance report
                  </Button>{" "}
                  {makeitmetrix.length > 0 && (
                  <CSVLink
                    data={makeitmetrix}
                    filename={"makeitmetrix.csv"}
                    target="_blank"
                    className="mr-l-10"> Makeit 
                    DownLoad
                  </CSVLink> 
                )}
                {moveitmetrix.length > 0 && (
                  <span> <span>{" | "}</span>
                  <CSVLink
                    data={moveitmetrix}
                    filename={"moveitmetrix.csv"}
                    target="_blank"
                    className="mr-l-10"> Moveit 
                    DownLoad
                  </CSVLink>  </span>
                ) }

                {ordermetrix.length > 0 && (
                  <span> <span>{" | "}</span>
                  <CSVLink
                    data={ordermetrix}
                    filename={"ordermetrix.csv"}
                    target="_blank"
                    className="mr-l-10"> Orders 
                    DownLoad
                  </CSVLink>  </span>
                )}



{kitchenshutdownmetrix.length > 0 && (
  <span> <span>{" | "}</span>
  <CSVLink
    data={kitchenshutdownmetrix}
    filename={"kitchen_shutdown_metrix.csv"}
    target="_blank"
    className="mr-l-10"> Kitchen Shutdown 
    DownLoad
  </CSVLink>  </span>
)}


{logisticsshutdownmetrix.length > 0 && (
  <span> <span>{" | "}</span>
  <CSVLink
    data={logisticsshutdownmetrix}
    filename={"logistics_shutdown_metrix.csv"}
    target="_blank"
    className="mr-l-10">Logistics Shutdown 
    DownLoad
  </CSVLink> </span>
)}

                </Col>
              </Row>
              </div>
            <div>
            <hr></hr>
              <Row className="mr-t-10 txt-align-center"><Col lg="11"><strong>Admin</strong></Col>
              <Col lg="1"></Col></Row>
              <hr></hr>
              <Row className="mr-t-10">
                <Col>
                  <Button  color="primary" onClick={() => this.getData(ORDERS_DELIVERED_VIA_ADMIN_REPORT)}>
                    Order delivery via admin
                  </Button>{" "}
                  {orderDeliveryViaAdmin.length > 0 && (
                  <CSVLink
                    data={orderDeliveryViaAdmin}
                    filename={"ORDERS_DELIVERY_VIA_ADMIN" + pdfstartdate +"_"+pdfenddate+ ".csv"}
                    target="_blank"
                    className="mr-l-10">
                    DownLoad
                  </CSVLink>
                )}
                </Col>
              </Row>
              <hr></hr> 
              </div>
              <div>
              <Row className="mr-t-10 txt-align-center"><Col lg="11"><strong>Business development</strong></Col>
              <Col lg="1"></Col></Row>
              <hr></hr>
             
              <Row className="mr-t-10">
                <Col>
                  <Button  color="primary" onClick={() => this.getData(NEW_USERS_REPORT)}>
                    Total new user
                  </Button>{" "}
                  {newUserReports.length > 0 && (
                  <CSVLink
                    data={newUserReports}
                    filename={"NEW_USERS_" + pdfstartdate +"_"+pdfenddate+ ".csv"}
                    target="_blank"
                    className="mr-l-10">
                    DownLoad
                  </CSVLink>
                )}
                </Col>
              </Row>

              <Row className="mr-t-10">
                <Col>
                  <Button  color="primary" onClick={() => this.getData(NEW_USERS_ORDER_REPORT)}>
                    Total new user orders
                  </Button>{" "}
                  {newUserOrdersReports.length > 0 && (
                  <CSVLink
                    data={newUserOrdersReports}
                    filename={"NEW_USERS_ORDERS_" + pdfstartdate +"_"+pdfenddate+ ".csv"}
                    target="_blank"
                    className="mr-l-10">
                    DownLoad
                  </CSVLink>
                )}
                </Col>
              </Row>

              <Row className="mr-t-10">
                <Col>
                  <Button  color="primary" onClick={() => this.getData(RETAINED_CUSTOMER_REPORT)}>
                    Total retained customer
                  </Button>{" "}
                  {retainedCustomerUsers.length > 0 && (
                  <CSVLink
                    data={retainedCustomerUsers}
                    filename={"RETAINED_CUSTOMER_" + pdfstartdate +"_"+pdfenddate+ ".csv"}
                    target="_blank"
                    className="mr-l-10">
                    DownLoad
                  </CSVLink>
                )}
                </Col>
              </Row>

              <Row className="mr-t-10">
                <Col>
                  <Button  color="primary" onClick={() => this.getData(USER_ORDER_HISTORY_REPORT)}>
                    User wise order history
                  </Button>{" "}
                  {userOrdersHistory.length > 0 && (
                  <CSVLink
                    data={userOrdersHistory}
                    filename={"USER_WISE_ORDER_HISTORY_" + pdfstartdate +"_"+pdfenddate+ ".csv"}
                    target="_blank"
                    className="mr-l-10">
                    DownLoad
                  </CSVLink>
                )}
                </Col>
              </Row>

              <Row className="mr-t-10">
                <Col>
                  <Button  color="primary" onClick={() => this.getData(LOST_CUSTOMER_REPORT)}>
                  Lost Customer Report
                  </Button>{" "}
                  {LostCustomerReport.length > 0 && (
                  <CSVLink
                    data={LostCustomerReport}
                    filename={"LOST_CUSTOMER_REPORT.csv"}
                    target="_blank"
                    className="mr-l-10">
                    DownLoad
                  </CSVLink>
                )}
                </Col>
              </Row>

              <Row className="mr-t-10">
                <Col>
                  <Button  color="primary" onClick={() => this.getData(FUNNEL_ORDERED_REPORT)}>
                  Funnel Report
                  </Button>{" "}
                  {FunnelOrdersReport.length > 0 && (
                  <CSVLink
                    data={FunnelOrdersReport}
                    filename={"FUNNEL_ORDERS_REPORT_" + pdfstartdate +"_"+pdfenddate+ ".csv"}
                    target="_blank"
                    className="mr-l-10">
                    DownLoad
                  </CSVLink>
                )}
                </Col>
              </Row>

              <Row className="mr-t-10">
                <Col>
                  <Button  color="primary" onClick={() => this.getData(XFACTOR_ORDERED_REPORT)}>
                    XFactors Report
                  </Button>{" "}
                  {XFactorOrdersReport.length > 0 && (
                  <CSVLink
                    data={XFactorOrdersReport}
                    filename={"XFACTOR_ORDERS_REPORT_" + pdfstartdate +"_"+pdfenddate+ ".csv"}
                    target="_blank"
                    className="mr-l-10">
                    DownLoad
                  </CSVLink>
                )}
                </Col>
              </Row>


              <Row className="mr-t-10">
                <Col>
                <DateRangePicker singleDatePicker
                  opens="right"
                  maxDate={today}
                  onApply={this.singleDateSelectUserGrowth}>
                  <Button className="mr-r-10">
                    <i className="far fa-calendar-alt"></i>
                  </Button>
                </DateRangePicker>
                  <span className="mr-r-10">{this.state.startDateUsergrowth}</span>
                  <Button  color="primary" onClick={() => this.getDateUserGrowth(USER_GROWTH_REPORT)} className="mr-r-10">
                    User Growth
                  </Button>{" "}
                  {user_growth_reports.length > 0 && (
                  <CSVLink
                    data={user_growth_reports}
                    filename={"USER_GROWTH_REPORTS_" +this.state.startDateUsergrowth+ ".csv"}
                    target="_blank"
                    className="mr-l-10">
                    DownLoad
                  </CSVLink>
                )}
                </Col>
              </Row>
             
              <hr></hr>
              </div>
              <div>
              <Row className="mr-t-10 txt-align-center"><Col lg="11"><strong>Operations and Finance</strong></Col>
              <Col lg="1"></Col></Row>
              <hr></hr>

              {/* <Row className="mr-t-10">
                <Col>
                  <Button  color="primary" onClick={() => this.getData(TOTAL_ORDERS_REPORT)}>
                    Orders
                  </Button>{" "}
                  {totalOrdersReport.length > 0 && (
                  <CSVLink
                    data={totalOrdersReport}
                    filename={"ORDERS_DETAILS_" + pdfstartdate +"_"+pdfenddate+ ".csv"}
                    target="_blank"
                    className="mr-l-10">
                    DownLoad
                  </CSVLink>
                )}
                </Col>
              </Row> */}

              <Row className="mr-t-10">
                <Col>
                  <Button  color="primary" onClick={() => this.getData(TOTAL_VIRTUAL_ORDERS_REPORT)}>
                    Virtual Kitchen Orders
                  </Button>{" "}
                  {VirtualOrderReports.length > 0 && (
                  <CSVLink
                    data={VirtualOrderReports}
                    filename={"VITRUAL_KITCHEN_ORDERS_DETAILS_" + pdfstartdate +"_"+pdfenddate+ ".csv"}
                    target="_blank"
                    className="mr-l-10">
                    DownLoad
                  </CSVLink>
                )}
                </Col>
              </Row>

              <Row className="mr-t-10">
                <Col>
                  <Button  color="primary" onClick={() => this.getData(TOTAL_ORIGINAL_ORDERS_REPORT)}>
                    Real Kitchen Orders
                  </Button>{" "}
                  {OriginalOrderReports.length > 0 && (
                  <CSVLink
                    data={OriginalOrderReports}
                    filename={"REAL_KITCHEN_ORDERS_DETAILS_" + pdfstartdate +"_"+pdfenddate+ ".csv"}
                    target="_blank"
                    className="mr-l-10">
                    DownLoad
                  </CSVLink>
                )}
                </Col>
              </Row>

              {/* <Row className="mr-t-10">
                <Col>
                  <Button color="info" onClick={() => this.getData(ORDERS_COST_REPORT)}>
                    Orders Cost
                  </Button>{" "}
                  {orderCostData.length > 0 && (
                  <CSVLink
                    data={orderCostData}
                    filename={"ORDERS_COST_REPORT_" + pdfstartdate +"_"+pdfenddate+ ".csv"}
                    target="_blank"
                    className="mr-l-10">
                    DownLoad
                  </CSVLink>
                )}
                </Col>
              </Row> */}
              {/* <Row className="mr-t-10">
                <Col>
                  <Button  color="primary" onClick={() => this.getData(KITCHEN_WISE_REPORT
                    )}>
                      Kitchen wise report 
                  </Button>{" "}
                  {kitchenWiseReports.length > 0 && (
                  <CSVLink
                    data={kitchenWiseReports}
                    filename={"KITCHEN_WISE_REPORT_" + pdfstartdate +"_"+pdfenddate+ ".csv"}
                    target="_blank"
                    className="mr-l-10">
                    DownLoad
                  </CSVLink>
                )}
                </Col>
              </Row> */}

              <Row className="mr-t-10">
                <Col>
                  <Button  color="primary" onClick={() => this.getData(VIRTUAL_KITCHEN_WISE_REPORT)}>
                      Virtual Kitchen wise report 
                  </Button>{" "}
                  {VirtualkitchenWiseReports.length > 0 && (
                  <CSVLink
                    data={VirtualkitchenWiseReports}
                    filename={"VIRTUAL_KITCHEN_WISE_REPORT_" + pdfstartdate +"_"+pdfenddate+ ".csv"}
                    target="_blank"
                    className="mr-l-10">
                    DownLoad
                  </CSVLink>
                )}
                </Col>
              </Row>

              <Row className="mr-t-10">
                <Col>
                  <Button  color="primary" onClick={() => this.getData(ORIGINAL_KITCHEN_WISE_REPORT)}>
                      Real Kitchen wise report 
                  </Button>{" "}
                  {OriginalkitchenWiseReports.length > 0 && (
                  <CSVLink
                    data={OriginalkitchenWiseReports}
                    filename={"REAL_KITCHEN_WISE_REPORT_" + pdfstartdate +"_"+pdfenddate+ ".csv"}
                    target="_blank"
                    className="mr-l-10">
                    DownLoad
                  </CSVLink>
                )}
                </Col>
              </Row>

              {/* <Row className="mr-t-10">
                <Col>
                  <Button  color="primary" onClick={() => this.getData(PRODUCT_REPORT)}>
                      Product wise report
                  </Button>{" "}
                  {productWiseReport.length > 0 && (
                  <CSVLink
                    data={productWiseReport}
                    filename={"PRODUCT_WISE_REPORT_" + pdfstartdate +"_"+pdfenddate+ ".csv"}
                    target="_blank"
                    className="mr-l-10">
                    DownLoad
                  </CSVLink>
                )}
                </Col>
              </Row> */}

              <Row className="mr-t-10">
                <Col>
                  <Button  color="primary" onClick={() => this.getData(VIRTUAL_PRODUCT_WISE_REPORT)}>
                      Virtual Kitchen Product wise report
                  </Button>{" "}
                  {VirtualProductWiseReports.length > 0 && (
                  <CSVLink
                    data={VirtualProductWiseReports}
                    filename={"VIRTUAL_KITCHEN_PRODUCT_WISE_REPORT_" + pdfstartdate +"_"+pdfenddate+ ".csv"}
                    target="_blank"
                    className="mr-l-10">
                    DownLoad
                  </CSVLink>
                )}
                </Col>
              </Row>

              <Row className="mr-t-10">
                <Col>
                  <Button  color="primary" onClick={() => this.getData(ORIGINAL_PRODUCT_WISE_REPORT)}>
                      Real Kitchen Product wise report
                  </Button>{" "}
                  {OriginalProductWiseReports.length > 0 && (
                  <CSVLink
                    data={OriginalProductWiseReports}
                    filename={"REAL_KITCHEN_PRODUCT_WISE_REPORT_" + pdfstartdate +"_"+pdfenddate+ ".csv"}
                    target="_blank"
                    className="mr-l-10">
                    DownLoad
                  </CSVLink>
                )}
                </Col>
              </Row>

              <Row className="mr-t-10">
                <Col>
                  <Button color="primary" onClick={() => this.getData(ORDERS_CANCELED_REPORT)}>
                    Virtual Kitchen Order Canceled report
                  </Button>{" "}
                  {orderCanceledData.length > 0 && (
                  <CSVLink
                    data={orderCanceledData}
                    filename={"VIRTUAL_KITCHEN_ORDERS_CANCELED_REPORT_" + pdfstartdate +"_"+pdfenddate+ ".csv"}
                    target="_blank"
                    className="mr-l-10">
                    DownLoad
                  </CSVLink>
                )}
                </Col>
              </Row>{" "}
              <Row className="mr-t-10">
                <Col>
                  <Button color="primary" onClick={() => this.getData(REAL_KITCHEN_ORDERS_CANCELED_REPORT)}>
                    Real Kitchen Order Canceled report
                  </Button>{" "}
                  {realKitchenorderCanceledData.length > 0 && (
                  <CSVLink
                    data={realKitchenorderCanceledData}
                    filename={"REAL_KITCHEN_ORDERS_CANCELED_REPORT_" + pdfstartdate +"_"+pdfenddate+ ".csv"}
                    target="_blank"
                    className="mr-l-10">
                    DownLoad
                  </CSVLink>
                )}
                </Col>
              </Row>{" "}


              <Row className="mr-t-10">
              <Col>
                <Button color="primary" onClick={() => this.getData(ORDERS_MOVEIT_REPORT)}>
                  Moveit Orders Count
                </Button> {" "}
                {moveitOrderCountData.length > 0 && (
                  <CSVLink
                    data={moveitOrderCountData}
                    filename={"MOVEIT_NO_OF_ORDERS_" + pdfstartdate +"_"+pdfenddate+ ".csv"}
                    target="_blank"
                    className="mr-l-10">
                    DownLoad
                  </CSVLink>
                )}
              </Col>
              </Row>
              <Row className="mr-t-10">
                <Col>
                  <Button color="primary" onClick={() => this.getData(ORDERS_TURNORUND_REPORT_MOVEIT)}>
                    Turnaround Moveit
                  </Button>{" "}
                  {turnarountMoveitData.length > 0 && (
                  <CSVLink
                    data={turnarountMoveitData}
                    filename={"TURNORUND_REPORT_MOVEIT_" + pdfstartdate +"_"+pdfenddate+ ".csv"}
                    target="_blank"
                    className="mr-l-10">
                    DownLoad
                  </CSVLink>
                )}
                </Col>
              </Row>
              <Row className="mr-t-10">
                <Col>
                  <Button color="primary" onClick={() => this.getData(ORDERS_TURNORUND_REPORT_MAKEIT)}>
                    Turnaround Makeit
                  </Button>{" "}
                  {turnarountMakeitData.length > 0 && (
                  <CSVLink
                    data={turnarountMakeitData}
                    filename={"TURNORUND_REPORT_MAKEIT_" + pdfstartdate +"_"+pdfenddate+ ".csv"}
                    target="_blank"
                    className="mr-l-10">
                    DownLoad
                  </CSVLink>
                )}
                </Col>
              </Row>
              
              
              <Row className="mr-t-10">
                <Col>
                  <Button  color="primary" onClick={() => this.getData(DRIVER_COD_REPORT)}>
                  Driver wise COD report
                  </Button>{" "}
                  {driverViaCOD.length > 0 && (
                  <CSVLink
                    data={driverViaCOD}
                    filename={"DRIVER_WISE_COD_" + pdfstartdate +"_"+pdfenddate+ ".csv"}
                    target="_blank"
                    className="mr-l-10">
                    DownLoad
                  </CSVLink>
                )}
                </Col>
              </Row>

              <Row className="mr-t-10">
                <Col>
                  <Button  color="primary" onClick={() => this.getData(VIRTUAL_ORDERS_PURCHASED)}>
                    Virtual orders purchased
                  </Button>{" "}
                  {VirtualOrdersPurchasedReports.length > 0 && (
                  <CSVLink
                    data={VirtualOrdersPurchasedReports}
                    filename={"Virtual_ORDERS_PURCHASED_" + pdfstartdate +"_"+pdfenddate+ ".csv"}
                    target="_blank"
                    className="mr-l-10">
                    DownLoad
                  </CSVLink>
                )}
                </Col>
              </Row>

              
              <hr></hr>
              </div>
              <div>
              <Row className="mr-t-10 txt-align-center"><Col lg="11"><strong>Financial reports</strong></Col>
              <Col lg="1"></Col></Row>
              <hr></hr>
              <Row className="mr-t-10">
                <Col>
                  <Button  color="primary" onClick={() => this.getData(ONLINE_REFUNDED_ORDERS)}>
                    Online Refunded Report
                  </Button>{" "}
                  {refunded_oline_orders.length > 0 && (
                  <CSVLink
                    data={refunded_oline_orders}
                    filename={"REFUNDED_ONLINE_ORDERS_" + pdfstartdate +"_"+pdfenddate+ ".csv"}
                    target="_blank"
                    className="mr-l-10">
                    DownLoad
                  </CSVLink>
                )}
                </Col>
              </Row>
              <Row className="mr-t-10">
                <Col>
                  <Button  color="primary" onClick={() => this.getData(COUPON_USED_ORDERS)}>
                    Refunded coupon Report
                  </Button>{" "}
                  {coupon_used_orders.length > 0 && (
                  <CSVLink
                    data={coupon_used_orders}
                    filename={"COUPON_USED_ORDERS_" + pdfstartdate +"_"+pdfenddate+ ".csv"}
                    target="_blank"
                    className="mr-l-10">
                    DownLoad
                  </CSVLink>
                )}
                </Col>
              </Row>

              <Row className="mr-t-10">
                <Col>
                  <Button  color="primary" onClick={() => this.getData(ORDERS_DEATIL_REPORT_FINANCIAL)}>
                    Orders Detail
                  </Button>{" "}
                  {Orders_detail_financial.length > 0 && (
                  <CSVLink
                    data={Orders_detail_financial}
                    filename={"ORDERS_DETAIL_REPORT_" + pdfstartdate +"_"+pdfenddate+ ".csv"}
                    target="_blank"
                    className="mr-l-10">
                    DownLoad
                  </CSVLink>
                )}
                </Col>
              </Row>

              <Row className="mr-t-10">
                <Col>
                  <Button  color="primary" onClick={() => this.getData(ITEM_WISE_REPORT_FINANCIAL)}>
                    Item Wise Report
                  </Button>{" "}
                  {Item_wise_financial.length > 0 && (
                  <CSVLink
                    data={Item_wise_financial}
                    filename={"ITEM_WISE_REPORT_" + pdfstartdate +"_"+pdfenddate+ ".csv"}
                    target="_blank"
                    className="mr-l-10">
                    DownLoad
                  </CSVLink>
                )}
                </Col>
              </Row>

              <Row className="mr-t-10">
                <Col>
                  <Button  color="primary" onClick={() => this.getData(MOVEIT_MASTER_REPORT_FINANCIAL)}>
                    Moveit Master Report
                  </Button>{" "}
                  {Moveit_master_financial.length > 0 && (
                  <CSVLink
                    data={Moveit_master_financial}
                    filename={"MOVEIT_MASTER_REPORT.csv"}
                    target="_blank"
                    className="mr-l-10">
                    DownLoad
                  </CSVLink>
                )}
                </Col>
              </Row>


              <Row className="mr-t-10">
                <Col>
                  <Button  color="primary" onClick={() => this.getData(MAKEIT_MASTER_REPORT_FINANCIAL)}>
                    Makeit Master Report
                  </Button>{" "}
                  {Makeit_master_financial.length > 0 && (
                  <CSVLink
                    data={Makeit_master_financial}
                    filename={"MAKEIT_MASTER_REPORT.csv"}
                    target="_blank"
                    className="mr-l-10">
                    DownLoad
                  </CSVLink>
                )}
                </Col>
              </Row>

              <hr></hr>
              </div>

              <div>
              <Row className="mr-t-10 txt-align-center"><Col lg="11"><strong>Customer Support</strong></Col>
              <Col lg="1"></Col></Row>
              <hr></hr>
              <Row className="mr-t-10">
                <Col>
                  <Button  color="primary" onClick={() => this.getData(CANCELLED_ORDERS_FOLLOW_UP)}>
                  Outbound - Cancelled Orders
                  </Button>{" "}
                  {cancelled_orders_reports.length > 0 && (
                  <CSVLink
                    data={cancelled_orders_reports}
                    filename={"CANCELLED_ORDERS_" + pdfstartdate +"_"+pdfenddate+ ".csv"}
                    target="_blank"
                    className="mr-l-10">
                    DownLoad
                  </CSVLink>
                )}
                </Col>
              </Row>
              <Row className="mr-t-10">
                <Col>
                  <Button  color="primary" onClick={() => this.getData(CUSTOMER_EXPERIENCE)}>
                  Outbound - Customer experience
                  </Button>{" "}
                  {customer_experience_reports.length > 0 && (
                  <CSVLink
                    data={customer_experience_reports}
                    filename={"CUSTOMER_EXPERIENCE_" + pdfstartdate +"_"+pdfenddate+ ".csv"}
                    target="_blank"
                    className="mr-l-10">
                    DownLoad
                  </CSVLink>
                )}
                </Col>
              </Row>
              <Row className="mr-t-10">
                <Col>
                  <Button  color="primary" onClick={() => this.getData(UNCLOSED_ORDERS)}>
                  Outbound - Unclosed Orders
                  </Button>{" "}
                  {unclosed_orders_reports.length > 0 && (
                  <CSVLink
                    data={unclosed_orders_reports}
                    filename={"UNCLOSED_ORDERS_" + pdfstartdate +"_"+pdfenddate+ ".csv"}
                    target="_blank"
                    className="mr-l-10">
                    DownLoad
                  </CSVLink>
                )}
                </Col>
              </Row>
              <hr></hr>
              </div>

              <div>
              <Row className="mr-t-10 txt-align-center"><Col lg="11"><strong>Accounts</strong></Col>
              <Col lg="1"></Col></Row>
              <hr></hr>
              <Row className="mr-t-10">
                <Col>
                  <Button  color="primary" onClick={() => this.getData(ACCOUNT_REPORTS_ONLINE)}>
                  Accounts Online
                  </Button>{" "}
                  {accountsOnlineReports.length > 0 && (
                  <CSVLink
                    data={accountsOnlineReports}
                    filename={"ACCOUNT_REPORT_PAYMENT_ONLINE_" + pdfstartdate +"_"+pdfenddate+ ".csv"}
                    target="_blank"
                    className="mr-l-10">
                    DownLoad
                  </CSVLink>
                )}
                </Col>
              </Row>

              <Row className="mr-t-10">
                <Col>
                  <Button  color="primary" onClick={() => this.getData(ACCOUNT_REPORTS_CASH)}>
                  Accounts Cash
                  </Button>{" "}
                  {accountsCashReports.length > 0 && (
                  <CSVLink
                    data={accountsCashReports}
                    filename={"ACCOUNT_REPORT_PAYMENT_CASH_" + pdfstartdate +"_"+pdfenddate+ ".csv"}
                    target="_blank"
                    className="mr-l-10">
                    DownLoad
                  </CSVLink>
                )}
                </Col>
              </Row>
              <hr></hr>
              </div>


              <div>
              <Row className="mr-t-10 txt-align-center"><Col lg="11"><strong>Make-IT</strong></Col>
              <Col lg="1"></Col></Row>
              <hr></hr>
              <Row className="mr-t-10">
                <Col>
                  <Button  color="primary" onClick={() => this.getData(VIRTUAL_KITCHEN_PREPARED_AFTER_CANCEL_REPORT)}>
                  Virtual Kitchen Canceled After Prepared  
                  </Button>{" "}
                  {VirtualKitchenPreparedAfterCancelReports.length > 0 && (
                  <CSVLink
                    data={VirtualKitchenPreparedAfterCancelReports}
                    filename={"Virtual_Kitchen_Prepared_After_CancelReports_" + pdfstartdate +"_"+pdfenddate+ ".csv"}
                    target="_blank"
                    className="mr-l-10">
                    DownLoad
                  </CSVLink>
                )}
                </Col>
              </Row>
              <Row className="mr-t-10">
                <Col>
                  <Button  color="primary" onClick={() => this.getData(ORIGINAL_KITCHEN_PREPARED_AFTER_CANCEL_REPORT)}>
                  Real Kitchen Canceled After Prepared  
                  </Button>{" "}
                  {OriginalKitchenPreparedAfterCancelReports.length > 0 && (
                  <CSVLink
                    data={OriginalKitchenPreparedAfterCancelReports}
                    filename={"Real_Kitchen_Prepared_After_CancelReports_" + pdfstartdate +"_"+pdfenddate+ ".csv"}
                    target="_blank"
                    className="mr-l-10">
                    DownLoad
                  </CSVLink>
                )}
                </Col>
              </Row>
              <Row className="mr-t-10">
                <Col>
                  <Button  color="primary" onClick={() => this.getData(VIRTUAL_KITCHEN_PREPARED_BEFORE_CANCEL_REPORT)}>
                  Virtual Kitchen Canceled Before Prepared  
                  </Button>{" "}
                  {VirtualKitchenPreparedBeforeCancelReports.length > 0 && (
                  <CSVLink
                    data={VirtualKitchenPreparedBeforeCancelReports}
                    filename={"Virtual_Kitchen_Prepared_Before_CancelReports_" + pdfstartdate +"_"+pdfenddate+ ".csv"}
                    target="_blank"
                    className="mr-l-10">
                    DownLoad
                  </CSVLink>
                )}
                </Col>
              </Row>
              <Row className="mr-t-10">
                <Col>
                  <Button  color="primary" onClick={() => this.getData(ORIGINAL_KITCHEN_PREPARED_BEFORE_CANCEL_REPORT)}>
                  Real Kitchen Canceled Before Prepared  
                  </Button>{" "}
                  {OriginalKitchenPreparedBeforeCancelReports.length > 0 && (
                  <CSVLink
                    data={OriginalKitchenPreparedBeforeCancelReports}
                    filename={"Real_Kitchen_Prepared_Before_CancelReports_" + pdfstartdate +"_"+pdfenddate+ ".csv"}
                    target="_blank"
                    className="mr-l-10">
                    DownLoad
                  </CSVLink>
                )}
                </Col>
              </Row>
              </div>
              <hr></hr>
              <div>
                              <Row className="mr-t-10 txt-align-center"><Col lg="11"><strong>Moveit Performance Report</strong></Col>
              <Col lg="1"></Col></Row>
              <hr></hr>
              <Row className="mr-t-10">
                <Col>
                  <Button  color="primary" onClick={() => this.getData(MOVEIT_ORDERS_DELIVERY)}>
                  Moveit Orders Delivery Report
                  </Button>{" "}
                  {moveit_orders_delivery.length > 0 && (
                  <CSVLink
                    data={moveit_orders_delivery}
                    filename={"MOVEIT_ORDERS_DELIVERY_" + pdfstartdate +"_"+pdfenddate+ ".csv"}
                    target="_blank"
                    className="mr-l-10">
                    DownLoad
                  </CSVLink>
                )}
                </Col>
              </Row>

              <Row className="mr-t-10">
                <Col>
                  <Button  color="primary" onClick={() => this.getData(MILE_MOVEIT_ORDERS_DELIVERY)}>
                  Mile Based Moveit Orders Delivery Report
                  </Button>{" "}
                  {maile_moveit_order_delivery.length > 0 && (
                  <CSVLink
                    data={maile_moveit_order_delivery}
                    filename={"MILE_BASED_MOVEIT_ORDERS_DELIVERY_" + pdfstartdate +"_"+pdfenddate+ ".csv"}
                    target="_blank"
                    className="mr-l-10">
                    DownLoad
                  </CSVLink>
                )}
                </Col>
              </Row>

              <Row className="mr-t-10">
                <Col>
                  <Button  color="primary" onClick={() => this.getData(MILE_MOVEIT_AVERAGE_DELIVERY)}>
                  Mile Based Moveit Average Delivery Report
                  </Button>{" "}
                  {maile_moveit_average_delivery.length > 0 && (
                  <CSVLink
                    data={maile_moveit_average_delivery}
                    filename={"MILE_BASED_MOVEIT_AVERAGE_DELIVERY_" + pdfstartdate +"_"+pdfenddate+ ".csv"}
                    target="_blank"
                    className="mr-l-10">
                    DownLoad
                  </CSVLink>
                )}
                </Col>
              </Row>
              <hr></hr>
              </div>
              <div>
              <Row className="mr-t-10 txt-align-center">
              <Col lg="11"><strong>Succession Rate Report</strong> <div style={{ textTransform: "capitalize",fontSize:"12px"}} className='color-grey'>
                    {Moment(this.state.singledate).format("DD-MMM-YYYY")}{" "}
                  </div></Col>
              <Col lg="1">
              <DateRangePicker singleDatePicker
                  opens="left"
                  maxDate={today}
                  drops="up"
                  onApply={this.singleDateSelect}
                >
                  <Button className="mr-r-10">
                    <i className="far fa-calendar-alt"></i>
                  </Button>
                </DateRangePicker>
              </Col>
              </Row>
              <hr></hr>
              <Row className="mr-t-10">
                <Col>
                  <Button  color="primary" onClick={() => this.getData(VIRTUAL_KITCHEN_SUCCESSIONRATE_REPORT)}>
                  Virtual Kitchen Succession Rate  
                  </Button>{" "}
                  {VirtualKitchenSuccessionRateReports.length > 0 && (
                  <CSVLink
                    data={VirtualKitchenSuccessionRateReports}
                    filename={"Virtual_Kitchen_Succession_Rate_Reports_" + singelDate + ".csv"}
                    target="_blank"
                    className="mr-l-10">
                    DownLoad
                  </CSVLink>
                )}
                </Col>
              </Row>
              <Row className="mr-t-10">
                <Col>
                  <Button  color="primary" onClick={() => this.getData(REAL_KITCHEN_SUCCESSIONRATE_REPORT)}>
                  Real Kitchen Succession Rate  
                  </Button>{" "}
                  {RealKitchenSuccessionRateReports.length > 0 && (
                  <CSVLink
                    data={RealKitchenSuccessionRateReports}
                    filename={"Real_Kitchen_Succession_Rate_Reports_" + singelDate + ".csv"}
                    target="_blank"
                    className="mr-l-10">
                    DownLoad
                  </CSVLink>
                )}
                </Col>
              </Row>
              </div>

              <hr></hr>
              <div>
              <Row className="mr-t-10 txt-align-center">
              <Col lg="11"><strong>Raw Data Reports</strong> 
                 <div style={{ textTransform: "capitalize",fontSize:"12px"}} className='color-grey'>
                    {Moment(this.state.startdateraw).format("DD-MMM-YYYY")}{" - "} {Moment(this.state.enddateraw).format("DD-MMM-YYYY")}
                  </div></Col>
              <Col lg="1">
              <DateRangePicker singleDatePicker
                  opens="left"
                  maxDate={last7days}
                  drops="up"
                  onApply={this.daterangSelectforraw}>
                  <Button className="mr-r-10">
                    <i className="far fa-calendar-alt"></i>
                  </Button>
                </DateRangePicker>
              </Col>
              </Row>
              <hr></hr>
              <Row className="mr-t-10">
                <Col>
                  <Button  color="primary" onClick={() => this.getRawData(LIVE_PRODUCT_HISTORY_REPORT)}>
                   LIVE PRODUCT HISTORY
                  </Button>{" "}
                  {live_product_history_reports.length > 0 && (
                  <CSVLink
                    data={live_product_history_reports}
                    filename={"live_product_history_reports_"  + startDateforRaw +"_"+endDateforRaw + ".csv"}
                    target="_blank"
                    className="mr-l-10">
                    DownLoad
                  </CSVLink>
                )}
                </Col>
              </Row>
              <Row className="mr-t-10">
                <Col>
                  <Button  color="primary" onClick={() => this.getRawData(MAKEIT_TIME_LOG_REPORT)}>
                  MAKEIT TIME LOG
                  </Button>{" "}
                  {makeit_time_log_reports.length > 0 && (
                  <CSVLink
                    data={makeit_time_log_reports}
                    filename={"makeit_time_log_reports_" + startDateforRaw +"_"+endDateforRaw +".csv"}
                    target="_blank"
                    className="mr-l-10">
                    DownLoad
                  </CSVLink>
                )}
                </Col>
              </Row>
              <Row className="mr-t-10">
                <Col>
                  <Button  color="primary" onClick={() => this.getRawData(MOVEIT_TIME_LOG_REPORT)}>
                  MOVEIT TIME LOG   
                  </Button>{" "}
                  {moveit_time_log_reports.length > 0 && (
                  <CSVLink
                    data={moveit_time_log_reports}
                    filename={"moveit_time_log_reports_"  + startDateforRaw +"_"+endDateforRaw + ".csv"}
                    target="_blank"
                    className="mr-l-10">
                    DownLoad
                  </CSVLink>
                )}
                </Col>
              </Row>
              </div>
              

          </CardBody>
        </Card>
      </div>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReportPage);
