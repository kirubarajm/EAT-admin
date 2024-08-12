import React from "react";
import { Card, CardBody, Row, Col } from "reactstrap";
import { DASHBOARD } from "../constants/actionTypes";
import { connect } from "react-redux";
import { LOGOUT } from "../constants/actionTypes";
import AxiosRequest from "../AxiosRequest";
import { Link } from "react-router-dom";
import { FaHouzz, FaShoppingCart,FaUserAlt,FaQuestionCircle,FaPaperPlane,FaProductHunt,FaSadTear,FaMinusCircle,FaKickstarterK} from "react-icons/fa";

const mapStateToProps = state => ({ ...state.home });
const mapDispatchToProps = dispatch => ({
  onGetDashboard: () =>
    dispatch({
      type: DASHBOARD,
      payload: AxiosRequest.Dashboard.getDashboard()
    }),
  onLogout: () => dispatch({ type: LOGOUT })
});

function CardRowCol(props) {
  if (props.value) {
    return (
      <Col lg="3">
        <Card>
          <Link to={props.link}>
            <CardBody>
              <Row className="txt-color-black">
                <Col
                  lg="2"
                  className="font-size-30 float-left font-weight-bold"
                >
                  <props.font style={{ color: props.color }} />
                </Col>
                <Col lg="7" className="align_self_center">
                  {props.value}
                </Col>
                <Col
                  lg="3"
                  className="align_self_center float-right font-weight-bold"
                >
                  {props.count}
                </Col>
              </Row>
            </CardBody>
          </Link>
        </Card>
      </Col>
    );
  }
  return <div />;
}
class DashboardPage extends React.Component {
  intervalID;
  second=20;
  componentDidMount() {
    //let token = window.localStorage.getItem("jwt");
    //if (token === null || token === "") this.props.onLogout();
    this.getData();
    this.intervalID = setInterval(this.getData.bind(this), this.second*1000);
  }
  getData(){
    this.props.onGetDashboard();
  }
  onSetData(data) {
    this.setState({ items: data });
  }
  componentWillUnmount() {
    /*
      stop getData() from continuing to run even
      after unmounting this component
    */
    clearInterval(this.intervalID);
  }
  render() {
    var dashboard_data = this.props.dashboard_data||{};
    return (
      <div className="pd-12">
        <div className="font-size-18 font-weight-600">Today</div>
        <Row className="mr-t-10">
          <CardRowCol
            value={"Orders"}
            count={dashboard_data.new_order_count || 0}
            font={FaShoppingCart}
            color={"#AB8CE4"}
            link={"/orders-assign"}
          />
          <CardRowCol
            value={"Appointments"}
            count={dashboard_data.new_sales_appointment_count || 0}
            font={FaUserAlt}
            color={"#03A9F3"}
            link={"/appointment"}
          />
          <CardRowCol
            value={"Queries"}
            count={dashboard_data.new_queries_count || 0}
            font={FaQuestionCircle}
            color={"#e83e8c"}
            link={"/queries-user"}
          />

          <CardRowCol
            value={"Replies"}
            count={dashboard_data.new_replies_count || 0}
            font={FaPaperPlane}
            color={"#6610f2"}
            link={"/queries"}
          />
        </Row>

        <Row className="mr-t-10">
          <CardRowCol
            value={"Cancel Orders"}
            count={dashboard_data.order_cancel_count || 0}
            font={FaMinusCircle}
            color={"#fa0000"}
            link={"/orders"}
          />
          <CardRowCol
            value={"Refunds"}
            count={dashboard_data.refund_user_count || 0}
            font={FaSadTear}
            color={"#fadd00"}
            link={"/order-refund"}
          />
          {/* <CardRowCol
            value={"Queries"}
            count={dashboard_data.new_queries_count}
            font={FaQuestionCircle}
            color={"#e83e8c"}
            link={"/queries-user"}
          />

          <CardRowCol
            value={"Replies"}
            count={dashboard_data.new_replies_count}
            font={FaPaperPlane}
            color={"#6610f2"}
            link={"/queries"}
          /> */}
        </Row>
        <div className="font-size-18 font-weight-600 mr-t-10">UnApproved/Accepted</div>
        <Row className="mr-t-10">
          <CardRowCol
            value={"Kitchen"}
            count={dashboard_data.admin_unapproved_kitchen_count || 0}
            font={FaHouzz}
            color={"#fc00a1"}
            link={"/kitchen-approval"}
          />
          <CardRowCol
            value={"Product"}
            count={dashboard_data.product_approved_count}
            font={FaProductHunt}
            color={"#49f803"}
            link={"/product-approved"}
          />

          <CardRowCol
            value={"Kitchen Unaccpeted Order"}
            count={dashboard_data.new_order_kitchen_un_accepted_count}
            font={FaKickstarterK}
            color={"#49f803"}
            link={"/orders"}
          />
        </Row>
        {/* <Row className="mr-t-10">
          <Col>
            <div className="font-size-18 font-weight-600">Recent Orders</div>
            <Card className="mr-t-10">
              <CardBody>

              </CardBody>
            </Card>
          </Col>

          <Col>
            <div className="font-size-18 font-weight-600">Top Orders</div>
            <Card className="mr-t-10">
              <CardBody>

              </CardBody>
            </Card>
          </Col>

          <Col>
            <div className="font-size-18 font-weight-600">Top Product</div>
            <Card className="mr-t-10">
              <CardBody>

              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
        <Col>
            <div className="font-size-18 font-weight-600"></div>
            <Card className="mr-t-10">
              <CardBody>

              </CardBody>
            </Card>
            
          </Col>
        </Row> */}
      </div>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardPage);
