import React from "react";
import {
  QUERIES_USER_LIST,
  QUERIES_SELETED_USER
} from "../constants/actionTypes";
import AxiosRequest from "../AxiosRequest";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  ButtonDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem
} from "reactstrap";
import { Link } from "react-router-dom";

function CardRowCol(props) {
  var lable = props.lable ? props.lable : "";
  if (props.value) {
    return (
      <Row className="list-text">
        <Col lg="3" className="font-weight-bold  color-grey">
          {lable}
        </Col>
        <Col lg="7" className={
              (props.valuecolor
                ? props.valuecolor
                : "txt-color-blue") + " font-size-16 txt-align-left"
            }>
          {props.value}
        </Col>
        <Col lg="2" className="font-size-12 txt-align-right color-green">
          <div className="circle-bg" hidden={!props.count}>
            {" "}
            {props.count}
          </div>
        </Col>
      </Row>
    );
  }
  return <div />;
}

const mapStateToProps = state => ({ ...state.queriesUsers });

const mapDispatchToProps = dispatch => ({
  getAllUsers: appType =>
    dispatch({
      type: QUERIES_USER_LIST,
      payload: AxiosRequest.Queries.getAllQueriesUsers(appType)
    }),
  questionSelect: item => dispatch({ type: QUERIES_SELETED_USER, item })
});

class QueriesUserPage extends React.Component {
  componentWillMount() {
    this.props.getAllUsers(this.props.selectedUserType);
    this.setState({ dropdownOpen: false });
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  selectUser(item) {
    this.props.questionSelect(item);
    this.props.getAllUsers(item.typeid);
  }
  componentDidUpdate(nextProps, nextState) {}

  render() {
    const UserList = this.props.queriesUserList
      ? this.props.queriesUserList
      : [];
    const appuserstype = this.props.appuserstype;
    return (
      <div className="pd-8">
        <Card>
          <CardHeader>
            QUERIES USERS
            <Row className="float-right">
              <Col>
                <ButtonDropdown
                  isOpen={this.state.dropdownOpen}
                  toggle={this.toggle}
                >
                  <DropdownToggle caret size="sm">
                    {this.props.selectedUserRole}
                  </DropdownToggle>
                  <DropdownMenu>
                    {appuserstype.map((item, index) => (
                      <DropdownItem
                        onClick={() => this.selectUser(item)}
                        key={index}
                      >
                        {item.role}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </ButtonDropdown>
              </Col>
            </Row>
          </CardHeader>
        </Card>
            <Card>
              <CardBody className="pd-8 scrollbar-queries-users">
                {UserList.map((item, index) => (
                    <Link to={`/queries/${item.userid || item.id}`}>
                      <Card>
                        <CardBody>
                          <CardRowCol
                            lable="Name : "
                            value={item.name || "-"}
                            count={item.count}
                          />
                          <CardRowCol
                            lable="Phone No : "
                            value={item.phoneno || "-"}
                          />
                          <CardRowCol
                            lable="Email : "
                            value={item.email || "-"}
                          />

                          <CardRowCol hidden={!item.last_orderids} valuecolor="color-yellow"
                            lable="Last Order IDs : "
                            value={item.last_orderids || "-"}
                          />
                          
                        </CardBody>
                      </Card>
                    </Link>
                ))}
              </CardBody>
            </Card>
        
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QueriesUserPage);
