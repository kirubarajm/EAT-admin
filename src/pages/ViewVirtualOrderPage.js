import React from "react";
import {
  ORDER_VIEW_DETAIL,
  ORDER_CALL_NEXT_API,
  ORDER_VIEW_QUALITY,
  ORDER_STATUS_UPDATE,
  ORDER_STATUS_CANCEL,
  ORDER_ITEM_MISSING
} from "../constants/actionTypes";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { required, minLength5,maxLength160} from "../utils/Validation";
import AxiosRequest from "../AxiosRequest";
import ViewVirtualOrder from "../components/ViewVirtualOrder";
import { getOrderNextStatus } from "../utils/ConstantFunction";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { ORDER_REFUND_REASON } from "../utils/constant";

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
  onItemMissing: data =>
    dispatch({
      type: ORDER_ITEM_MISSING,
      payload: AxiosRequest.MakeitProcess.orderItemMissing(data)
    }),
  onClearNextApi: () => dispatch({ type: ORDER_CALL_NEXT_API })
});
class ViewVirtualOrderPage extends React.Component {
  componentWillMount() {
    const orderId = this.props.match.params.id;
    this.props.onGetOrders(orderId);
    this.setState({ isOrderQuality: false, itemMissingModal: false });
    this.orderStatusUpdate = this.orderStatusUpdate.bind(this);
    this.toggleItemMissingPopup = this.toggleItemMissingPopup.bind(this);
    this.itemMissingConfirm = this.itemMissingConfirm.bind(this);
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
      orderid: this.props.match.params.id
    });
  }

  orderCancel() {
    this.props.onOrderCancel({
      orderid: this.props.match.params.id
    });
  }

  toggleItemMissingPopup() {
    this.setState(prevState => ({
      itemMissingModal: !prevState.itemMissingModal
    }));
  }

  itemMissingConfirm(value) {
    this.props.onItemMissing({
      orderid: this.props.match.params.id,
      item_missing_reason: value.reason
    });
  }

  render() {
    const checkDetail = this.props.qualityCheck || [];
    const handleSubmit = this.props.handleSubmit;
    const pristine = this.props.pristine;
    const submitting = this.props.submitting;
    if (!this.props.vieworders.orderid) return <div className="pd-8" />;
    else
      return (
        <div className="pd-8">
          <ViewVirtualOrder
            title="Order Details"
            propdata={this.props.vieworders}
            checkDetail={checkDetail}
            orderCancel={() => this.orderCancel()}
            itemMissingAction={() => this.toggleItemMissingPopup()}
            orderStatusUpdate={() =>
              this.orderStatusUpdate(this.props.vieworders.orderstatus)
            }
          />
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
        </div>
      );
  }
}
ViewVirtualOrderPage = reduxForm({
  form: ORDER_REFUND_REASON // a unique identifier for this form
})(ViewVirtualOrderPage);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewVirtualOrderPage);
