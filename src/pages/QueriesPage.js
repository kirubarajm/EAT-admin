import React from "react";
import {
  QUERIES_QUESTIONS_LIST,
  QUERIES_REPLIES_LIST,
  QUERIES_REPLIES,
  QUERIES_PAGE_USER_SELECT,
  QUERIES_SELETED_QUESTIONS,
  QUERIES_CLEAR,
  QUERIES_READ,
  QUERIES_READ_CLEAR,
  QUERIES_USER_DETAIL
} from "../constants/actionTypes";
import { Link } from 'react-router-dom';
import AxiosRequest from "../AxiosRequest";
import { connect } from "react-redux";
import Moment from "moment";
import {
  Row,
  Col,
  Card,
  Button,
  CardHeader,
  CardBody,
  CardFooter,
  ButtonDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem
} from "reactstrap";
import { history } from "../store";
import { reset } from "redux-form";
import { ADMIN_TYPE } from "../utils/constant";
import { QUERIESREPLIES } from "../utils/constant";
import { Field, reduxForm } from "redux-form";
import { required } from "../utils/Validation";
import { IoMdSend } from "react-icons/io";

const Replies = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
  ...custom
  // 
}) => {
  return (<div style={{ border: touched && error ? "1px solid red" : "none" }}
       className="replies_field">
      <textarea {...input} placeholder={label} type={type} autoComplete="off" cols={custom.cols} rows={custom.rows}/>
      <span style={{flex:"0",WebkitFlex:"0",height:"20px"}}>{touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}</span>
  </div>);
}
// const Replies = ({ input, meta: { touched, error } }) => (
//   <div
//     style={{ border: touched && error ? "1px solid red" : "none" }}
//     className="replies_field"
//   >
//     <input type="text" {...input} />
//   </div>
// );
function CardRowColOrderid(props) {
  if (props.value) {
    return (
      <div className="list-text mr-b-10"> 
      <span className="font-size-14 txt-align-left txt-color-black font-weight-bold pd-0">
      {props.lable}
      </span>
      <span className="font-size-14 txt-align-left font-weight-bold pd-0">
      <Link to={`/vieworder/${props.value}`} className="txt-color-black font-weight-bold text-decoration-underline">{props.value}</Link>
      </span>
      </div>
    );
  }
  return <div />;
}

function CardRowCol(props) {
  var lg = props.lg ? props.lg : "12";
  var lable = props.lable ? props.lable : "";
  if (props.value) {
    return (
      <Row className="list-text">
        <Col lg={lg} className="font-size-14 font-weight-bold txt-color-blue">
          {lable}
        </Col>
        <Col lg="1" className="font-size-12 txt-align-right color-green">
          <div className="circle-bg" hidden={!props.count}>
            {" "}
            {props.count}
          </div>
        </Col>
        <Col lg="4" className="font-size-12 txt-align-right color-grey">
          {props.value}
        </Col>
      </Row>
    );
  }
  return <div />;
}

function CardRowColUser(props) {
  var lable = props.lable ? props.lable : "";
  if (props.value) {
    return (
      <Row className="list-text">
        <Col lg="3" className="font-size-12 font-weight-bold  color-grey">
          {lable}
        </Col>
        <Col lg="7" className={
              (props.valuecolor
                ? props.valuecolor
                : "txt-color-blue") + " font-size-12 txt-align-left"
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

function ReplieField(props) {
  if (props.isEnable) {
    const pristine = props.pristine;
    const submitting = props.submitting;
    return (
      <form onSubmit={props.onSubmit} className="replies_field_container">
        <Field
          name="answer"
          type="text"
          component={Replies}
          labeldisable={true} validate={[required]} cols="40" rows="3"
        />
        <Button type="submit" disabled={pristine || submitting}>
          <IoMdSend />
        </Button>
      </form>
    );
  }
  return <div className="replies_field_container" />;
}

const mapStateToProps = state => ({ ...state.queries,
    selectedType: state.queriesUsers.selectedUserType,
    selectedRole: state.queriesUsers.selectedUserRole,
 });

const mapDispatchToProps = dispatch => ({
  getQueriesUser: (data) =>
    dispatch({
      type: QUERIES_USER_DETAIL,
      payload: AxiosRequest.Queries.getQueriesUserDetail(data)
    }),
  getAllQuestion: (data, userid) =>
    dispatch({
      type: QUERIES_QUESTIONS_LIST,
      payload: AxiosRequest.Queries.getAllQueries(data),
      userid
    }),
  getAllReplies: qid =>
    dispatch({
      type: QUERIES_REPLIES_LIST,
      payload: AxiosRequest.Queries.getAllReplies(qid)
    }),
  postReplies: data =>
    dispatch({
      type: QUERIES_REPLIES,
      payload: AxiosRequest.Queries.postReplies(data)
    }),
  userSelect: item => dispatch({ type: QUERIES_PAGE_USER_SELECT, item }),
  questionSelect: QItem => dispatch({ type: QUERIES_SELETED_QUESTIONS, QItem }),
  queriesRead: qid => dispatch({ type: QUERIES_READ, payload: AxiosRequest.Queries.readReplies(qid) }),
  dateClear: () => dispatch({ type: QUERIES_CLEAR }),
  queriesReadClear: () => dispatch({ type: QUERIES_READ_CLEAR }),
  onRepliesClear: () => dispatch(reset(QUERIESREPLIES))
});
var QItem = {};
var date2;
var userid = 0;
class QueriesPage extends React.Component {
  componentWillMount() {
    userid = this.props.match.params.userid;
    if(userid){
      this.selectUser({typeid:this.props.selectedType,role:this.props.selectedRole});
      this.getUserDetail(this.props.selectedType,userid);
    }else this.getAllQueries(this.props.selectedUserType);

    this.getReplies = this.getReplies.bind(this);
    this.repliesSubmit = this.repliesSubmit.bind(this);
    this.refreshReplies = this.refreshReplies.bind(this);
    this.refreshQuestion = this.refreshQuestion.bind(this);
    this.toggle = this.toggle.bind(this);
    this.selectUser = this.selectUser.bind(this);
    this.getDateDiff = this.getDateDiff.bind(this);
    this.setState({ dropdownOpen: false, countModal: false });
  }
  componentDidUpdate(nextProps, nextState) {
    if (this.props.queriesReplies) {
      this.props.onRepliesClear();
      this.props.getAllReplies(QItem.qid);
    }
    if (this.props.messagingDate) {
      this.props.dateClear();
      date2 = "new";
    }

    if (this.props.queriesRead) {
        this.props.queriesReadClear();
      }
      if(this.props.allRepliesGet){
        this.props.queriesRead({qid:QItem.qid});
      }
  }

  getReplies(item) {
    if (QItem.qid && QItem.qid === item.qid) return;
    QItem = item;
    this.props.questionSelect(item);
    this.props.getAllReplies(QItem.qid);
  }
  getAllQueries(typeid) {
    this.props.getAllQuestion({ type: typeid, userid: userid }, userid);
  }

  getUserDetail(typeid,userid) {
    this.props.getQueriesUser({ type: typeid, userid: userid });
  }

  refreshReplies() {
    this.props.getAllReplies(QItem.qid);
  }
  refreshQuestion() {
    QItem = {};
    this.getAllQueries(this.props.selectedUserType);
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  selectUser(item) {
    QItem = {};
    this.props.userSelect(item);
    this.getAllQueries(item.typeid);
  }

  repliesSubmit = values => {
    var replie = {
      qid: QItem.qid,
      answer: values.answer,
      type: ADMIN_TYPE,
      qtype: QItem.type,
      adminid: 1,
      userid: QItem.userid
    };
    this.props.postReplies(replie);
  };

  getDateDiff = date1 => {
    var diff = false;
    var a = Moment(date1).format("MMM-DD-YYYY"); //moment(date1,'M/D/YYYY');
    if (!date2 || a !== date2) {
      date2 = a;
      diff = true;
    }
    var diffDate = Moment().diff(date2, "days");
    if (diffDate === 0) date2 = "Today";
    if (diffDate === 1) date2 = "Yesterday";
    console.log("diff--->" + diff);
    return diff;
  };

  render() {
    const questions = this.props.queriesQuestionList
      ? this.props.queriesQuestionList
      : [];
    const replies = this.props.queriesRepliesList
      ? this.props.queriesRepliesList
      : [];
    const pristine = this.props.pristine;
    const submitting = this.props.submitting;
    const handleSubmit = this.props.handleSubmit;
    const appuserstype = this.props.appuserstype;
    const userDetail = this.props.userDetail;
    const qItem = this.props.queriesSelectedQuestion;
    return (
      <div className="pd-8">
        <Card>
          <CardHeader>
            <Row>
            <Col >QUERIES</Col>
            <Col className='txt-align-right'>
                <ButtonDropdown
                  isOpen={this.state.dropdownOpen}
                  toggle={this.toggle}
                  hidden={this.props.queriesUserid}>
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
                <Button hidden={!this.props.queriesUserid} className="mr-l-10" size="sm" onClick={history.goBack}>
                  Back
                </Button>
              </Col>
            </Row>
            <div hidden={!userDetail}>
            <CardRowColUser 
                            lable="Name : "
                            value={userDetail.name || "-"}
                          />
                          <CardRowColUser
                            lable="Phone No : "
                            value={userDetail.phoneno || "-"}
                          />
                          <CardRowColUser
                            lable="Email : "
                            value={userDetail.email || "-"}
                          />

                          <CardRowColUser hidden={!userDetail.last_orderids} valuecolor="color-yellow"
                            lable="Last Order IDs : "
                            value={userDetail.last_orderids || "-"}
                          />
            </div>
          </CardHeader>
        </Card>
        <Row>
          <Col lg="6" md="6" sm="6" xs="6" style={{ paddingRight: "0px" }}>
            <Card>
              <CardHeader className={"height-62"}>
                Question{" "}
                <Row className="float-right">
                  <Col>
                    <Button className="mr-r-10" onClick={this.refreshQuestion}>
                      Refresh
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody className="pd-8 scrollbar-queries">
                {questions.map((item, index) => (
                  <Card key={index}>
                    <CardBody onClick={() => this.getReplies(item)} style={{backgroundColor:item.admin_read?'white':'#07fcce'}}>
                      <CardRowColOrderid  lable={'Order ID : '} value={item.orderid} ></CardRowColOrderid>
                      <CardRowCol
                        lg="7"
                        lable={item.question}
                        value={Moment(item.created_at).format(
                          "DD-MMM-YYYY hh:mm a"
                        )}
                        count={item.admin_un_read_count}
                      />
                    </CardBody>
                  </Card>
                ))}
              </CardBody>
            </Card>
          </Col>

          <Col lg="6" md="6" sm="6" xs="6" style={{ paddingLeft: "0px" }}>
            <Card>
              <CardHeader className={"height-62"}>
                REPLIES{" "}
                <Row className="float-right">
                  <Col>
                    <Button
                      className="mr-r-10"
                      onClick={this.refreshReplies}
                      hidden={QItem.question ? false : true}
                    >
                      Refresh
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody
                className={
                  qItem.question
                    ? "pd-8 scrollbar-replies"
                    : "pd-8 scrollbar-queries"
                }
              >
                <Card hidden={!qItem.question}>
                  {" "}
                  <CardBody>
                    <CardRowColOrderid  lable={'Order ID : '} value={qItem.orderid}></CardRowColOrderid>
                    <CardRowCol
                      lg="7"
                      lable={qItem.question}
                      value={Moment(qItem.created_at).format(
                        "DD-MMM-YYYY hh:mm a"
                      )}
                    />
                  </CardBody>
                </Card>
                {replies.map((item, index) => (
                  <div key={index}>
                    <div
                      hidden={!this.getDateDiff(item.created_at)}
                      className="txt-align-center font-size-12 color-grey mr-t-10"
                    >
                      {date2}
                    </div>
                    <CardBody
                      className={
                        item.type === 0
                          ? "replies_answer_admin"
                          : "replies_answer_user"
                      }
                    >
                      <div>{item.answer}</div>
                    </CardBody>
                    <div
                      className="font-size-12 color-grey mr-t-10"
                      style={
                        item.type === 0
                          ? { paddingLeft: "30%" }
                          : { paddingRight: "30%", textAlign: "right" }
                      }
                    >
                      {Moment(item.created_at).format("hh:mm a")}
                    </div>
                  </div>
                ))}
              </CardBody>
              <CardFooter className="pd-0">
                <ReplieField
                  isEnable={qItem.question ? true : false}
                  onSubmit={handleSubmit(this.repliesSubmit)}
                  pristine={pristine}
                  submitting={submitting}
                />
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

QueriesPage = reduxForm({
  form: QUERIESREPLIES // a unique identifier for this form
})(QueriesPage);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QueriesPage);
