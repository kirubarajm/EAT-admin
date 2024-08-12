import React from 'react';
import AxiosRequest from '../AxiosRequest';
import { connect } from 'react-redux'
import { Card, CardBody, CardHeader, Table ,Button,Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { EAT_REFUND_ORDER_LIST,REPAYMENT,PAYMENT_CLEAR} from '../constants/actionTypes';
import { REFUND_NOT_PAID } from '../utils/constant';
import { getAdminId } from "../utils/ConstantFunction";
import { Link } from 'react-router-dom';

const mapStateToProps = state => ({
    ...state.refund 
});

const mapDispatchToProps = dispatch => ({
    onGetReFundList: () =>
        dispatch({ type: EAT_REFUND_ORDER_LIST, payload: AxiosRequest.Accounts.getRefundList() }),
    onRepayment: (data) =>
        dispatch({ type: REPAYMENT, payload: AxiosRequest.Accounts.repayment(data) }),
    onClear: () =>
        dispatch({ type: PAYMENT_CLEAR}),
});

function ActionButton(props) {
    var item = props.item;
    if (item.active_status === REFUND_NOT_PAID) {
      return (
        <Button onClick={props.repayment}>Pay</Button>
      );
    }
    return (
      <div style={{ color: 'green' }}>
       Success 
      </div>
    );
  }
var reFund_data=null;
class RefundPage extends React.Component {
    componentWillMount() {
        this.props.onGetReFundList();
        this.setState({confirmModal:false})
        this.onRepayment=this.onRepayment.bind(this);
        this.toggleRefundConfirmPopup=this.toggleRefundConfirmPopup.bind(this);
        this.onPaymentConfirm=this.onPaymentConfirm.bind(this);
    }

    componentDidUpdate(nextProps, nextState) {
        if(this.props.refunded){
           reFund_data=null;
           this.props.onClear();
           this.props.onGetReFundList();
        }
      }

    onRepayment(item){
        var adminId=getAdminId();
        reFund_data={
            amount:item.original_amt,
            paymentid:item.payment_id,
            cancel_by:item.cancel_by,
            rs_id:item.rs_id,
            orderid:item.orderid,
            refunded_by:adminId,
            admin_id:adminId
            }
            this.toggleRefundConfirmPopup();
        
    }
    onPaymentConfirm(){
      this.toggleRefundConfirmPopup();
      this.props.onRepayment(reFund_data);
    }

    toggleRefundConfirmPopup(){
        this.setState(prevState => ({
            confirmModal: !prevState.confirmModal
          }));
    }

    render() {
        const reFundList = this.props.reFundList;
        return (
            <div className="pd-8">
                <Card>
                    <CardHeader>
                        Refund Orders list
                    </CardHeader>
                    <CardBody className="scrollbar pd-0">
                        <Table>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Refund Id</th>
                                    <th>Order Id</th>
                                    <th>PaymentId</th>
                                    <th>Type</th>
                                    <th>Paid Amt</th>
                                    <th>Refundable Amt</th>
                                    <th>Refunded Amt</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reFundList.map((item, i) => (
                                    <tr key={i}>
                                        <th scope="row">{i + 1}</th>
                                        <th scope="row">{item.rs_id}</th>
                                        <th scope="row"><Link to={`/vieworder/${item.orderid}`} className="preview-link">{item.orderid}</Link></th>
                                        <td >{item.payment_id}</td>
                                        <td >{item.cancel_by?item.cancel_by===1?'Cancel eat':'Cancel Kitchen':'Item Missing'}</td>
                                        <td>{item.price}</td>
                                        <td>{item.original_amt}</td>
                                        <td>{item.refund_amt}</td>
                                        <td>{item.active_status===REFUND_NOT_PAID?'Not Paid':'Paid'}</td>
                                        <td><ActionButton item={item} repayment={()=>this.onRepayment(item)}/></td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>
                <Modal
            isOpen={this.state.confirmModal}
            toggle={this.toggleRefundConfirmPopup}
            className={this.props.className}
            backdrop={true}
          >
            <ModalHeader>
              Confirm
            </ModalHeader>
            <ModalBody>
                        Are you sure you want to refund the amount in current order?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary"  onClick={this.onPaymentConfirm}>Yes</Button>{' '}
                        <Button color="secondary" onClick={this.toggleRefundConfirmPopup}>NO</Button>
                    </ModalFooter>
          </Modal>
            </div>
        );
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(RefundPage);