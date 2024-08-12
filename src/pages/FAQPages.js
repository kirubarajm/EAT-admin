import React from 'react';
import {FAQ_DELETE, FAQ_LIST, FAQ_POST, FAQ_PAGE_USER_SELECT, FAQ_SELETED, FAQ_CLEAR } from '../constants/actionTypes'
import AxiosRequest from '../AxiosRequest';
import { connect } from 'react-redux'
import Moment from 'moment';
import {
    Row,
    Col,
    Card,
    Button,
    CardHeader,
    CardBody,
    ButtonDropdown,
    DropdownMenu,
    DropdownToggle,
    DropdownItem,
    Collapse,
    Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import { reset } from 'redux-form';
import { FAQ_FORM } from '../utils/constant';
import { Field, reduxForm } from 'redux-form'
import { required } from '../utils/Validation'
import { FaChevronDown,FaChevronUp,FaTrashAlt } from "react-icons/fa";


function CardRowCol(props) {
    var lg = props.lg ? props.lg : '12';
    var lable = props.lable ? props.lable : '';
    if (props.value) {
        return (
            <Row className="list-text">
                <Col lg={lg} className="font-weight-bold txt-color-blue">{lable}</Col>
                <Col lg='4' className='font-size-12 txt-align-right color-grey'>{props.value}</Col>
                <Col lg='1' className='font-size-12 txt-align-right'> <FaTrashAlt color="blue" onClick={props.onDelete} size={14}/>
                </Col>
                <Col lg='1' className='font-size-12 txt-align-right'> 
                {props.sIndex === props.Index?<FaChevronDown color="blue" size={14}/>:<FaChevronUp color="blue" size={14}/>}
                </Col>
            </Row>
        );
    }
    return (<div></div>);
}

const InputField = ({
    input,
    label,
    type,
    meta: { touched, error, warning },
    ...custom
    // 
  }) => {
    return (<div>
      <label hidden={custom.labeldisable}>{label} <span className='must' hidden={!custom.required}>*</span></label>
      <div>
        <textarea {...input} placeholder={label} type={type} autoComplete="off" cols={custom.cols} rows={custom.rows}/>
        <span style={{flex:"0",WebkitFlex:"0",height:"20px"}}>{touched &&
          ((error && <span>{error}</span>) ||
            (warning && <span>{warning}</span>))}</span>
      </div>
    </div>);
  }


var removeFaqid;
const mapStateToProps = state => ({ ...state.faq });

const mapDispatchToProps = dispatch => ({
    getAllFAQ: (id) =>
        dispatch({ type: FAQ_LIST, payload: AxiosRequest.FAQ.getAllFAQ(id)}),
    deleteFaq: (qid) =>
        dispatch({ type: FAQ_DELETE, payload: AxiosRequest.FAQ.deleteFAQ(qid) }),
    postFaq: (data) =>
        dispatch({ type: FAQ_POST, payload: AxiosRequest.FAQ.postFAQ(data) }),
    userSelect: (item) =>
        dispatch({ type: FAQ_PAGE_USER_SELECT, item}),
    faqSelect: (faqItem) =>
        dispatch({ type: FAQ_SELETED, faqItem}),
    faqLocalClear: () =>
        dispatch({ type: FAQ_CLEAR}),
    faqClear: () =>
        dispatch(reset(FAQ_FORM)),

});
class FAQPage extends React.Component {

    componentWillMount() {
        this.props.getAllFAQ(this.props.selectedUserType);
        this.faqSubmit = this.faqSubmit.bind(this);
        this.selectUser=this.selectUser.bind(this);
        this.toggle = this.toggle.bind(this);
        this.getOpen =this.getOpen.bind(this);
        this.getClose =this.getClose.bind(this);
        this.toggleRemove =this.toggleRemove.bind(this);
        this.onFaqDelete=this.onFaqDelete.bind(this);
        this.onFaqDeletePost=this.onFaqDeletePost.bind(this);
        this.setState({ dropdownOpen: false, toggleindex:-1,removeModal:false})
    }
    componentDidUpdate(nextProps, nextState) {
        if (this.props.faqPost) {
            this.props.faqLocalClear();
            this.props.faqClear();
            this.props.getAllFAQ(this.props.selectedUserType);
            this.setState({toggleindex:-1});
        }
    }
    toggle() {
        this.setState({
          dropdownOpen: !this.state.dropdownOpen
        });
      }
      toggleRemove(){
        this.setState({
            removeModal: !this.state.removeModal
          });
      }
    
      selectUser(item){
        this.setState({
            toggleindex:-1
          });
        this.props.userSelect(item);
        this.props.getAllFAQ(item.typeid);
      }
      getOpen= (index) => ev =>{
        this.setState({
            toggleindex:index
          });
      }
      getClose = () => ev =>{
        this.setState({
            toggleindex:-1
          });
      }
      onFaqDelete=(faqid,index) => ev =>{
        ev.stopPropagation();
        removeFaqid=faqid;
        this.toggleRemove();
        console.log("faqid-->"+faqid+"--index--"+index);
      }

      onFaqDeletePost=()=>{
        this.toggleRemove();
          this.props.deleteFaq(removeFaqid);
      }

      faqSubmit = values => {
        var replie = {
            question: values.question,
            answer: values.answer,
            type: this.props.selectedUserType        
        }
        this.props.postFaq(replie);
    }

    render() {
        const faqList = this.props.faqList ? this.props.faqList : [];
        const pristine = this.props.pristine;
        const submitting = this.props.submitting;
        const handleSubmit = this.props.handleSubmit;
        const appuserstype = this.props.appuserstype;
        return (
            <div className="pd-8">
                <Card>
                    <CardHeader>
                        FAQ's
                        <Row className="float-right">
                            <Col><ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                <DropdownToggle caret size="sm">
                                    {this.props.selectedUserRole}
                                </DropdownToggle>
                                <DropdownMenu>
                                {appuserstype.map((item, index) => (
                                    <DropdownItem onClick={()=>this.selectUser(item)}  key={index}>{item.role}</DropdownItem>
                                ))}
                                </DropdownMenu>
                            </ButtonDropdown></Col>
                        </Row>
                    </CardHeader>

                </Card>
                <Row>
                    <Col lg="6" md="6" sm="6" xs="6" style={{paddingRight:"0px"}}>
                        <Card >
                            <CardHeader className={'height-62'}>FAQ List</CardHeader>
                            <CardBody className="pd-8 scrollbar-queries">
                                {faqList.map((item, index) => (
                                    <Card key={index} className='faq-question'>
                                        <CardBody onClick={this.state.toggleindex === index?this.getClose():this.getOpen(index)} >
                                            <CardRowCol lg='6' lable={item.question} value={Moment(item.created_at).format('DD-MMM-YYYY hh:mm a')} sIndex={this.state.toggleindex} Index={index}  onDelete={this.onFaqDelete(item.faqid,index)}></CardRowCol>
                                            <Collapse  isOpen={this.state.toggleindex === index} className={"faq-collapse"}>{item.answer}</Collapse>
                                        </CardBody>
                                    </Card>
                                ))}
                            </CardBody>
                        </Card>
                    </Col>

                    <Col lg="6" md="6" sm="6" xs="6" style={{paddingLeft:"0px"}}>
                        <Card>
                            <CardHeader className={'height-62'}>FAQ Form</CardHeader>
                            <CardBody className="pd-8 scrollbar-queries">
                            <form onSubmit={handleSubmit(this.faqSubmit)} className='product_form'>
                            <div><label>Question <span className='must'>*</span> </label></div>
                            <Field name="question" type="text" component={InputField} label="Question" labeldisable={true} validate={[required]} cols="40" rows="3" />
                            <div><label>Answer <span className='must'>*</span> </label></div>
                            <Field name="answer" type="text" component={InputField} label="Answer" labeldisable={true} validate={[required]} cols="40" rows="10"/>
                            <div className='float-right'>
                                <Button type="submit" disabled={pristine || submitting}>Submit</Button>
                            </div>
                        </form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Modal isOpen={this.state.removeModal} toggle={this.toggleRemove} className='add_live_modal' backdrop={'static'}>
                    <ModalHeader>Confirm Message</ModalHeader>
                    <ModalBody>
                        Are you sure you want to delete this FAQ Item?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary"  onClick={this.onFaqDeletePost}>Yes</Button>{' '}
                        <Button color="secondary" onClick={this.toggleRemove}>NO</Button>
                    </ModalFooter>
                </Modal>
            </div >
        );
    };
}

FAQPage = reduxForm({
    form: FAQ_FORM // a unique identifier for this form
})(FAQPage)
export default connect(mapStateToProps, mapDispatchToProps)(FAQPage);