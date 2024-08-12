import React from "react";
import AxiosRequest from "../AxiosRequest";
import Moment from 'moment';
import {
    ORDER_UNACCPETED_LIST,
} from "../constants/actionTypes";
import { connect } from "react-redux";
import {
  Card,
  CardBody,
  CardHeader,
  Table,
} from "reactstrap";

const mapStateToProps = state => ({ ...state.unacceptedorders });

const mapDispatchToProps = dispatch => ({
  onGetUser: () =>
    dispatch({
      type: ORDER_UNACCPETED_LIST,
      payload: AxiosRequest.Eat.getWaitingOrders()
    })
});

class UnAcceptedOrders extends React.Component {
  componentWillMount() {
    this.props.onGetUser();
  }
  render() {
    const orderunaccptedlist = this.props.orderunaccptedlist||[];
    return (
      <div className="pd-8">
        <Card>
          <CardHeader>
            MAKEIT Waiting Orders
          </CardHeader>
          <CardBody className="scrollbar pd-0">
            <Table>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Order Id</th>
                  <th>Order Date/Time</th>
                  <th>Owner Name</th>
                  <th>Brand Name</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                {orderunaccptedlist.map((item, i) => (
                  <tr key={i}>
                    <th scope="row">{i + 1}</th>
                    <th scope="row">{item.orderid}</th>
                    <td>{Moment(item.ordertime).format('DD-MMM-YYYY/hh:mm a')}</td>
                    <td>{item.makeitdetail.name}</td>
                    <td>{item.makeitdetail.brandName}</td>
                    <td>{item.makeitdetail.phoneno}</td>
                    
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
)(UnAcceptedOrders);
