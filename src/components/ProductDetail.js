
import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { required } from '../utils/Validation'
import { MAKEIT_PRODUCT_DEAIL_LOAD, MAKEIT_PRODUCT_DEAIL_REMOVE_LIVE, MAKEIT_PRODUCT_DEAIL_ADD_LIVE, MAKEIT_PRODUCT_DEAIL_CLEAR, MAKEIT_PRODUCT_DEAIL_EDIT_COUNT } from '../constants/actionTypes';
import AxiosRequest from '../AxiosRequest';
import {
    Button, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import { MAKEIT_PRODUCT_ADD_QUANTITY } from '../utils/constant';
import renderInputField from './renderInputField'
import {isFoodCycle,isDaysCycle} from "../utils/ConstantFunction"

function EditQuantity(props) {
    if (props.isLiveList) {
        if (!props.isEdit) {
            return (
                <Row className="mr-t-10 font-weight-bold">
                    <Col lg='8'>Live Quantity</Col>
                    <Col lg='2' style={{display:"flex",alignItems:"center"}}>{props.quantity}</Col>
                    <Col lg='2' className='pd-0'>
                        <Button onClick={props.action}>Edit</Button>
                    </Col>
                </Row>
            );
        } else if (props.isEdit) {
            return (
                <Row className="mr-t-10 font-weight-bold">
                    <Col lg='8'>Live Quantity</Col>
                    <Col lg='2'  style={{display:"flex",alignItems:"center"}}>
                        <input type="number" value={props.quantity} style={{ "width": "60px","height": "40px",}} onChange={props.onChangeQuantity}/>
                    </Col>
                    <Col lg='2' className='pd-0'>
                        <Button disabled={!props.quantity} onClick={props.action}>Done</Button>
                    </Col>
                </Row>
            );
        }
    }

    return (
        <Row className="mr-t-10 font-weight-bold">
            <Col lg='8'>Live Quantity</Col>
            <Col lg='4'>{props.quantity}</Col>
        </Row>
    );
}

const mapStateToProps = state => ({
    ...state.productdetail,
});

const mapDispatchToProps = dispatch => ({
    onGetProduct: (id) =>
        dispatch({ type: MAKEIT_PRODUCT_DEAIL_LOAD, payload: AxiosRequest.MakeitProcess.getsingleProdcut(id) }),
    onRemoveToLive: (data) =>
        dispatch({ type: MAKEIT_PRODUCT_DEAIL_REMOVE_LIVE, payload: AxiosRequest.MakeitProcess.movetolive(data) }),
    onAddProductQuantity: (data) =>
        dispatch({ type: MAKEIT_PRODUCT_DEAIL_ADD_LIVE, payload: AxiosRequest.MakeitProcess.movetolive(data) }),
    onEditProductQuantity: (data) =>
        dispatch({ type: MAKEIT_PRODUCT_DEAIL_EDIT_COUNT, payload: AxiosRequest.MakeitProcess.editQuantity(data) }),
    onClear: () =>
        dispatch({ type: MAKEIT_PRODUCT_DEAIL_CLEAR }),
});

function CardRowCol(props) {
    var lg = props.lg ? props.lg : '12';
    var lable = props.lable ? props.lable : '';
    if (props.value) {
        return (
            <Row className="list-text">
                <Col lg={lg} className="font-weight-bold">{lable}</Col>
                <Col lg='4' className='txt-align-center'>{props.value}</Col>
            </Row>
        );
    }
    return (<div></div>);
}

function LiveButton(props) {
    if (props.status === 0) {
        return (
            <Button onClick={props.action}> Move to Live</Button>
        );
    } else if (props.status === 1) {
        return (
            <Button onClick={props.action}> Remove from Live</Button>
        );
    }
    return (<div></div>);
}

var userId, productId;
class ProductDetail extends React.Component {
    componentWillMount() {
        userId = this.props.userId;
        productId = this.props.productId;

        this.props.onGetProduct(productId);
        this.removeToLive = this.removeToLive.bind(this);
        this.toggleLive = this.toggleLive.bind(this);
        this.toggleRemoveAll = this.toggleRemoveAll.bind(this);
        this.addCount = this.addCount.bind(this);
        this.onAction=this.onAction.bind(this);
        this.setState({ liveModal: false, countModal: false, isEdit: false,quantity:0,lastliveQuantity:0 })
    }
    componentDidUpdate(nextProps, nextState) {
        if (this.props.productMoveToLive) {
            this.props.onClear();
            this.toggleRemoveAll();
            this.props.update();
        }

        if (this.props.productRemoveToLive) {
            this.props.onClear();
            this.toggleRemoveAll();
            this.props.update();
        }

        if (this.props.productEdittQuantity) {
            this.props.onClear();
            console.log("this.state.lastliveQuantity-->",this.state.lastliveQuantity);
            if(!this.props.productEditQuantityStatus){
                this.setState({
                    quantity: this.state.lastliveQuantity
                }); 
            }else{
                this.props.update();
                this.setState({
                    lastliveQuantity: this.state.quantity
                });
            }
        }

        if(this.props.productDetailLoad){
            this.props.onClear();
            
            this.setState({
                quantity: this.props.productdetail.quantity
            });
        }
    }

    removeToLive = () => {
        this.props.onRemoveToLive({
            productid: productId,
            active_status: 0,
            makeit_userid: userId,
            quantity: 1,
        })
    }

    addCount(value) {
        this.setState({
            lastliveQuantity: this.props.productdetail.quantity
        });
        this.props.onAddProductQuantity({
            productid: productId,
            quantity: value.quantity,
            active_status: 1,
            makeit_userid: userId
        })
    }

    toggleCount = () => {
        this.setState(prevState => ({
            countModal: !prevState.countModal,
            liveModal: false,
        }));
    }

    toggleRemoveAll() {
        this.setState({
            countModal: false,
            liveModal: false,
        });
    }
    toggleLive = () => {
        this.setState(prevState => ({
            liveModal: !prevState.liveModal,
            countModal: false,
        }));
    }
    onAction(){
        if (this.state.isEdit) {
            var liveq=this.state.lastliveQuantity;
            this.setState({
                lastliveQuantity: liveq?liveq:this.props.productdetail.quantity
            });
            this.props.onEditProductQuantity({
                productid: productId,
                quantity: this.state.quantity,
                makeit_userid: userId,
            });
        }
        this.setState(prevState => ({
            isEdit: !prevState.isEdit
        }));
    }

    onChangeQuantity = e => {
        this.setState({
            quantity:e.target.value
        });
      }

    //   isFoodCycle = (item) => {
    //     var foodcycle = ''
    //     if (item.breakfast) foodcycle = foodcycle + 'Breakfast';
    //     if (item.lunch) foodcycle = foodcycle.length !== 0 ?foodcycle + ', ' + 'Lunch':foodcycle;
    //     if (item.dinner) foodcycle = foodcycle.length !== 0 ?foodcycle + ', ' + 'Dinner':foodcycle;
    //     return foodcycle;
    // }

    // isDaysCycle = (item) => {
    //     var dayscycle = ''
    //     if (item.monday) dayscycle = dayscycle + 'Mon';
    //     if (item.tuesday) dayscycle = dayscycle.length === 0 ? '' : dayscycle + ', ' + 'Tus';
    //     if (item.wednesday) dayscycle = dayscycle.length === 0 ? '' : dayscycle + ', ' + 'Wed';
    //     if (item.thrusday) dayscycle = dayscycle.length === 0 ? '' : dayscycle + ', ' + 'Thr';
    //     if (item.friday) dayscycle = dayscycle.length === 0 ? '' : dayscycle + ', ' + 'Fri';
    //     if (item.saturday) dayscycle = dayscycle.length === 0 ? '' : dayscycle + ', ' + 'Sat';
    //     if (item.sunday) dayscycle = dayscycle.length === 0 ? '' : dayscycle + ', ' + 'Sun';
    //     return dayscycle;
    // }

    render() {
        const pristine = this.props.pristine;
        const submitting = this.props.submitting;
        const handleSubmit = this.props.handleSubmit;
        const productdetail = this.props.productdetail;
        const items = productdetail.items || [];
        const packageItems= productdetail.packageItems || [];
        const isLiveList = this.props.isLiveList;
        return (
            <div>
                <img src={productdetail.image} className="product_detail_image" alt='product_image'></img>
                <div className="product_detail_content">
                    <Row className="font-weight-bold" style={{ color: "black" }}>
                        <Col lg='8'>{productdetail.product_name}</Col>
                        <Col lg='4'><i className="fas fa-rupee-sign"></i> {productdetail.price}</Col>
                    </Row>
                    <hr></hr>
                    <Row className="mr-t-10 font-weight-bold">
                        <Col lg='8'>Type</Col>
                        <Col lg='1'><div className="square-food"></div></Col>
                        <Col lg='3'>{productdetail.vegtype === '0' ? 'Veg' : 'Non Veg'}</Col>
                    </Row>
                    <hr></hr>
                    <EditQuantity action={this.onAction} quantity={this.state.quantity} isEdit={this.state.isEdit} isLiveList={isLiveList}  onChangeQuantity={this.onChangeQuantity}/>
                    <hr></hr>

                    <Row className="font-weight-bold" style={{ color: "black" }}>
                        <Col lg='8'>Food Cycle</Col>
                        <Col lg='4'>{isFoodCycle(productdetail)}</Col>
                    </Row>
                    <hr></hr>

                    <Row className="font-weight-bold" style={{ color: "black" }}>
                        <Col lg='8'>Days</Col>
                        <Col lg='4'>{isDaysCycle(productdetail)}</Col>
                    </Row>
                    <hr></hr>

                    <div>
                        <Row className="mr-t-10 font-weight-bold">
                            <Col lg='12' className='txt-align-center'> Product Items</Col>
                            {/* <Col lg='4' className='txt-align-left'> Quantity</Col> */}
                        </Row>
                        <div className="mr-t-10 font-weight-bold">
                            {items.map((item, index) => (
                                <CardRowCol lg='8' key={index} lable={item.menuitem_name} value={item.quantity}></CardRowCol>
                            ))
                            }
                        </div>
                    </div>

                    {/* <div hidden={packageItems.length===0}>
                    <hr></hr>
                        <Row className="mr-t-10 font-weight-bold">
                            <Col lg='12' className='txt-align-center'> Package Detail</Col>
                        </Row>
                        <div className="mr-t-10 font-weight-bold">
                            {packageItems.map((item, index) => (
                                <CardRowCol lg='8' key={index} lable={item.name} value={item.count}></CardRowCol>
                            ))
                            }
                        </div>
                    </div> */}
                    <hr></hr>
                    <Row className="mr-t-10 txt-align-center">
                        <Col className="mr-t-10"><LiveButton status={productdetail.active_status} action={productdetail.active_status === 0 ? this.toggleLive : this.removeToLive} /></Col>
                    </Row>

                </div>
                <Modal isOpen={this.state.liveModal} toggle={this.toggleLive} >
                    <ModalBody>ADD TO LIVE PRODUCT LIST</ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggleCount}>Yes</Button>{' '}
                        <Button color="secondary" onClick={this.toggleLive}>NO</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.countModal} toggle={this.toggleCount}>
                    <ModalHeader>ENTER QUANTITY</ModalHeader>
                    <ModalBody>
                        <form onSubmit={handleSubmit(this.addCount)} className='product_form'>
                            <Field name="quantity" type="number" component={renderInputField} label="Enter the quantity for live" validate={[required]} />
                            <div className='float-right'>
                                <Button type="submit" disabled={pristine || submitting}>Submit</Button>
                            </div>
                        </form>
                    </ModalBody>
                </Modal>
            </div >
        )
    }
}
ProductDetail = reduxForm({
    form: MAKEIT_PRODUCT_ADD_QUANTITY // a unique identifier for this form
})(ProductDetail)

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
