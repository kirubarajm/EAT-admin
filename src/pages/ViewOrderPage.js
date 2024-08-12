import React from "react";
import {
  ORDER_VIEW_DETAIL,
  ORDER_CALL_NEXT_API,
  ORDER_VIEW_QUALITY,
  ORDER_STATUS_UPDATE,
  ORDER_STATUS_CANCEL,
  ORDER_ITEM_MISSING,
  ORDER_DELIVED_BY_ADMIN,
  ORDER_PAYMENT_SUCCESS,
  ORDER_STATUS_PICKEDUP_CANCEL,
  ORDER_STATUS_PREPARED_CANCEL,
  ORDER_CREATE_TICKET,
  GET_ZENDESK_ISSUES
} from "../constants/actionTypes";
import Select from "react-dropdown-select";
import { connect } from "react-redux";
import { getAdminId } from "../utils/ConstantFunction";
import { Field, reduxForm,reset } from "redux-form";
import { required, minLength5,maxLength160} from "../utils/Validation";
import AxiosRequest from "../AxiosRequest";
import ViewOrder from "../components/ViewOrder";
import { getOrderNextStatus } from "../utils/ConstantFunction";
import { Button, Modal, ModalHeader, ModalBody,ModalFooter } from "reactstrap";
import { ORDER_REFUND_REASON } from "../utils/constant";
import {notify} from 'react-notify-toast';
let myColor = { background: '#314911', text: "#FFFFFF" };
let notifyTime =2000;
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

const InputSearchDropDown = ({
  onSelection,
  options,
  label,
  labelField,
  searchable,
  searchBy,
  values,
  disabled,
  clearable,
  noDataLabel,
  valueField
}) => {
  return (
    <div>
    <label>
      {label}{" "}
      <span className="must">
        *
      </span>
    </label>
    <div>
    <Select
      multi
      options={options}
      labelField={labelField}
      searchable={searchable}
      searchBy={searchBy}
      values={[...values]}
      noDataLabel={noDataLabel}
      valueField={valueField}
      dropdownHeight={'300px'}
      disabled={disabled}
      onChange={(value) => {
        onSelection(value);
      }}
    /></div>
    </div>
  );
};

const mapStateToProps = state => ({ ...state.vieworder });

const mapDispatchToProps = dispatch => ({
  onGetOrders: id =>
    dispatch({
      type: ORDER_VIEW_DETAIL,
      payload: AxiosRequest.Eat.getOrder(id)
    }),
  onOrderQualityCheck: data =>
    dispatch({
      type: ORDER_VIEW_QUALITY,
      payload: AxiosRequest.Eat.OrderQualityCheck(data)
    }),
  onOrderChangeStatus: data =>
    dispatch({
      type: ORDER_STATUS_UPDATE,
      payload: AxiosRequest.MakeitProcess.orderStatusUpdate(data)
    }),
  onOrderCancel: data =>
    dispatch({
      type: ORDER_STATUS_CANCEL,
      payload: AxiosRequest.MakeitProcess.orderCancel(data)
    }),
    onPreparedOrderCancel: data =>
    dispatch({
      type: ORDER_STATUS_PREPARED_CANCEL,
      payload: AxiosRequest.MakeitProcess.preparedOrderCancel(data)
    }),
    onPickedUpOrderCancel: data =>
    dispatch({
      type: ORDER_STATUS_PICKEDUP_CANCEL,
      payload: AxiosRequest.MakeitProcess.pickedupOrderCancel(data)
    }),
    onOrderPaymentSuccess: data =>
    dispatch({
      type: ORDER_PAYMENT_SUCCESS,
      payload: AxiosRequest.Orders.ordersPaymentSuccess(data)
    }),
    onOrderDelived: data =>
    dispatch({
      type: ORDER_DELIVED_BY_ADMIN,
      payload: AxiosRequest.Orders.ordersDelivedByAdmin(data)
    }),
  onItemMissing: data =>
    dispatch({
      type: ORDER_ITEM_MISSING,
      payload: AxiosRequest.MakeitProcess.orderItemMissing(data)
    }),
    onOrderTicketCreate: data =>
    dispatch({
      type: ORDER_CREATE_TICKET,
      payload: AxiosRequest.Orders.ordersCreateTicket(data)
    }),
    onGetZendeskIssues: data =>
    dispatch({
      type: GET_ZENDESK_ISSUES,
      payload: AxiosRequest.Orders.getZendeskIssues(data)
    }),
  onClearNextApi: () => dispatch({ type: ORDER_CALL_NEXT_API })
});
var cancel_order_id=0;
var value_issues_id=[];
class ViewOrderPage extends React.Component {
  componentWillMount() {
    const orderId = this.props.match.params.id;
    this.props.onGetOrders(orderId);
    this.setState({ isOrderQuality: false, itemMissingModal: false,orderCancelModal: false,orderDelivedModal:false,ticketCreate:false,issuearray:[] });
    this.orderStatusUpdate = this.orderStatusUpdate.bind(this);
    this.toggleItemMissingPopup = this.toggleItemMissingPopup.bind(this);
    this.toggleTicketCreate = this.toggleTicketCreate.bind(this);
    this.toggleDelivedPopup= this.toggleDelivedPopup.bind(this);
    this.itemMissingConfirm = this.itemMissingConfirm.bind(this);
    this.onDelivedConfirm = this.onDelivedConfirm.bind(this);
    this.toggleCancelPopup = this.toggleCancelPopup.bind(this);
    this.orederCancelConfirm = this.orederCancelConfirm.bind(this);
    this.onCreateTicketConfirm=this.onCreateTicketConfirm.bind(this);
    this.selectedIssuesItem=this.selectedIssuesItem.bind(this);
    this.paymentSuccess=this.paymentSuccess.bind(this);
  }

  componentDidUpdate(nextProps, nextState) {
    if (this.props.isCallCheckApi) {
      this.props.onClearNextApi();
      if (this.props.vieworders.makeitdetail) {
        const makeitId = this.props.vieworders.makeitdetail.userid;
        const orderId = this.props.match.params.id;
        var data = { makeit_userid: makeitId, orderid: orderId };
        this.props.onOrderQualityCheck(data);
      }
    }

    if (this.props.updateStatus) {
      this.props.onGetOrders(this.props.match.params.id);
      
      if(this.state.ticketCreate) {
        this.setState(prevState => ({
          ticketCreate: !prevState.ticketCreate
        }));
      }

      if(this.state.orderCancelModal) {
        this.props.dispatch(reset(ORDER_REFUND_REASON));
        this.setState(prevState => ({
            orderCancelModal: !prevState.orderCancelModal
        }));
        this.setState({ itemMissingModal: false });
      }

      if(this.state.orderDelivedModal) {
        this.props.dispatch(reset(ORDER_REFUND_REASON));
        this.setState(prevState => ({
          orderDelivedModal: !prevState.orderDelivedModal
        }));
      }
    }
    
    if (this.props.refund) {
      this.props.onClearNextApi();
      this.setState({ itemMissingModal: false });
      this.props.onGetOrders(this.props.match.params.id);
    }
  }

  orderStatusUpdate(orderStatus) {
    var nextStatus = getOrderNextStatus(orderStatus);
    this.props.onOrderChangeStatus({
      orderstatus: nextStatus,
      orderid: this.props.match.params.id,
      admin_id:getAdminId()
    });
  }

  toggleCancelPopup() {
    this.setState(prevState => ({
        orderCancelModal: !prevState.orderCancelModal
    }));
  }

  orederCancelConfirm(value) {
    var orders=this.props.vieworders;
    if(orders.orderstatus<3){
      this.props.onOrderCancel({
      orderid: cancel_order_id,
      cancel_reason: value.cancel_reason,
      admin_id:getAdminId()
      });
    }else if(orders.orderstatus==3){
      this.props.onPreparedOrderCancel({
      orderid: cancel_order_id,
      cancel_reason: value.cancel_reason,
      admin_id:getAdminId()
      });
    }else if(orders.orderstatus==5){
      this.props.onPickedUpOrderCancel({
      orderid: cancel_order_id,
      cancel_reason: value.cancel_reason,
      admin_id:getAdminId()
      });
    }
    
  }

  orderCancel() {
    cancel_order_id=this.props.match.params.id;
    this.toggleCancelPopup();
  }

  paymentSuccess(){
    var orders=this.props.vieworders;
    if(orders.moveit_user_id ||(orders.delivery_vendor==1&& orders.payment_type==0)) {
    var data={orderid:orders.orderid,moveit_user_id:orders.moveit_user_id,payment_status:1,admin_id:getAdminId()}
    this.props.onOrderPaymentSuccess(data);
    }else{
      notify.show('Please assign Moveit,After try again',"custom", notifyTime,myColor);
    }
  }

  onCreateTicketConfirm(){
    var orders=this.props.vieworders;
    var data={
      userid:orders.userid,
      orderid:orders.orderid,
      issues:this.state.issuearray,
      admin_id:getAdminId()
    }
    this.props.onOrderTicketCreate(data);

  }
 
  toggleDelivedPopup(){
    this.setState(prevState => ({
      orderDelivedModal: !prevState.orderDelivedModal
    }));
  }
  onDelivedConfirm(value){
    var orders=this.props.vieworders;
    if(orders.moveit_user_id ||(orders.delivery_vendor==1) ){
    var data={orderid:orders.orderid,moveit_user_id:orders.moveit_user_id,reason:value.reason,admin_id:getAdminId()}
    this.props.onOrderDelived(data);
    }else{
      notify.show('Please assign Moveit,After try again',"custom", notifyTime,myColor);
    }
  }

  toggleItemMissingPopup() {
    this.setState(prevState => ({
      itemMissingModal: !prevState.itemMissingModal
    }));
  }

  toggleTicketCreate() {
    if(this.props.issue_list.length==0){
      this.props.onGetZendeskIssues({type:4});
    }
    this.setState(prevState => ({
      ticketCreate: !prevState.ticketCreate
    }));
  }

  itemMissingConfirm(value) {
    var adminId=getAdminId();
    this.props.onItemMissing({
      orderid: this.props.match.params.id,
      item_missing_reason: value.reason,
      item_missing_by:adminId,
      admin_id:adminId
    });
  }
  selectedIssuesItem = values => {
    // console.log("values[0].id-->",values);
    // if(value_issues_id.includes(values[0].id)){
    //   value_issues_id = value_issues_id.filter(e => e !== values[0].id);
    // }else{
    //   value_issues_id.push(values[0].id);
    // }
    this.setState({issuearray: values});
    console.log("value_issues_id-->",values);
  };

  render() {
    const checkDetail = this.props.qualityCheck || [];
    const handleSubmit = this.props.handleSubmit;
    const pristine = this.props.pristine;
    const submitting = this.props.submitting;
    if (!this.props.vieworders.orderid) return <div className="pd-8" />;
    else
      return (
        <div className="pd-8">
          <ViewOrder
            title="Order Details"
            propdata={this.props.vieworders}
            checkDetail={checkDetail}
            orderCancel={() => this.orderCancel()}
            paymentSuccess={()=>this.paymentSuccess()}
            orderDelived={()=>this.toggleDelivedPopup()}
            itemMissingAction={() => this.toggleItemMissingPopup()}
            clicktorequestzendesk={() => this.toggleTicketCreate()}
            orderStatusUpdate={() =>
              this.orderStatusUpdate(this.props.vieworders.orderstatus)
            }
          />

          <Modal
            isOpen={this.state.ticketCreate}
            toggle={this.toggleTicketCreate}
            className={this.props.className}
            backdrop={true}
          >
            <ModalHeader toggle={this.toggleTicketCreate}>
              Zendesk Ticket Creation
            </ModalHeader>
            <ModalBody>
              {/* Are you sure you want create the zendesk support ticket for in this order? */}
              <InputSearchDropDown labelField="issues"
                    searchable={true}
                    clearable={true}
                    searchBy="issues"
                    valueField="id"
                    values={[]}
                    noDataLabel="No matches found"
                    options={this.props.issue_list}
                    onSelection={this.selectedIssuesItem}
                    label="Select Issues" />
            </ModalBody>
            <ModalFooter>
                        <Button color="primary"  onClick={this.onCreateTicketConfirm}>Submit</Button>{' '}
                        {/* <Button color="secondary" onClick={this.toggleTicketCreate}>NO</Button> */}
                    </ModalFooter>
          </Modal>

          <Modal
            isOpen={this.state.itemMissingModal}
            toggle={this.toggleItemMissingPopup}
            className={this.props.className}
            backdrop={true}
          >
            <ModalHeader toggle={this.toggleItemMissingPopup}>
              Item Missing Reason
            </ModalHeader>
            <ModalBody>
              <form
                onSubmit={handleSubmit(this.itemMissingConfirm)}
                className="product_form"
              >
                <Field
                  name="reason"
                  type="text"
                  component={InputField}
                  validate={[required, minLength5,maxLength160]}
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
            isOpen={this.state.orderDelivedModal}
            toggle={this.toggleDelivedPopup}
            className={this.props.className}
            backdrop={true}
          >
            <ModalHeader toggle={this.toggleDelivedPopup}>
              Order Delivered Reason
            </ModalHeader>
            <ModalBody>
              <form
                onSubmit={handleSubmit(this.onDelivedConfirm)}
                className="product_form"
              >
                <Field
                  name="reason"
                  type="text"
                  component={InputField}
                  validate={[required, minLength5,maxLength160]}
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
          isOpen={this.state.orderCancelModal}
          toggle={this.toggleCancelPopup}
          className={this.props.className}
          backdrop={true}
        >
          <ModalHeader toggle={this.toggleCancelPopup}>
            Cancel Reason
          </ModalHeader>
          <ModalBody>
            <form
              onSubmit={handleSubmit(this.orederCancelConfirm)}
              className="product_form"
            >
              <Field
                name="cancel_reason"
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
        </div>
      );
  }
}
ViewOrderPage = reduxForm({
  form: ORDER_REFUND_REASON // a unique identifier for this form
})(ViewOrderPage);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewOrderPage);
