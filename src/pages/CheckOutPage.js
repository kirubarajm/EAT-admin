import React from 'react';
import { CHECKOUT_USERS_LIST, CHECKOUT_USERS_SELECTED, CHECKOUT_ORDER_POST, CHECKOUT_ORDER_SUCCESS, CHECKOUT_PAGE_UNLOADED, CHECKOUT_USERS_PLACE, CHECKOUT_PAGE_LOADED, ADMIN_EAT_ADDRESS } from '../constants/actionTypes'
import { connect } from 'react-redux'
import AxiosRequest from '../AxiosRequest';
import { Card, CardBody, CardHeader, ListGroup, ListGroupItem, Row, Col, CardFooter, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { history } from '../store';
import { getAdminId } from "../utils/ConstantFunction";

const mapStateToProps = state => ({
    ...state.checkout,
    selectedRestaurant: state.restaurants.selectedRestaurant,
    orderdata: state.liveproduct.cartItems,
    total: state.liveproduct.subTotal,
    eataddress:state.common.eataddress,
    //selectedRestaurant:state.restautants.selectedRestaurant
});

const mapDispatchToProps = dispatch => ({
    onLoad: () => dispatch({ type: CHECKOUT_PAGE_LOADED }),
    onGetUser: (filter) =>
        dispatch({ type: CHECKOUT_USERS_LIST, payload: AxiosRequest.Eat.getAll(filter) }),
    onGetEatAddress: () =>
        dispatch({ type: ADMIN_EAT_ADDRESS, payload: AxiosRequest.Eat.getAddress()}),
    onSelectedVirtualUser: (index) =>
        dispatch({ type: CHECKOUT_USERS_SELECTED, Index: index }),
    onSelectedPlace: (item,Index) =>
        dispatch({ type: CHECKOUT_USERS_PLACE,Index,item}),
    onOrderNow: (data) =>
        dispatch({ type: CHECKOUT_ORDER_POST, payload: AxiosRequest.Eat.postOrder(data) }),
    onRedirect: (cartlist) => dispatch({ type: CHECKOUT_ORDER_SUCCESS, cartlist }),
    onUnload: () => dispatch({ type: CHECKOUT_PAGE_UNLOADED }),
});

function CardRowCol(props) {
    var lg = props.lg ? props.lg : '12';
    var lable = props.lable ? props.lable : '';
    if (props.value) {
      return (
        <Row className="list-text">
          <Col lg={lg} className="lable" style={{ color: "gray" }}>{lable}</Col>
          <Col lg='6'>{props.value}</Col>
        </Row>
      );
    }
    return (<div></div>);
  }


var tempData;
class CheckOutPage extends React.Component {
    componentWillMount() {
        tempData = this.props.orderdata;
        if (tempData && tempData.length === 0) {
            this.props.history.push('/live-product')
        }
        var filter = { virtualkey: 1 }
        this.props.onGetUser(filter);
        if(!this.props.eataddress)this.props.onGetEatAddress();
        this.selectedVirtualUser = (id) => ev => {
            this.props.onSelectedVirtualUser(id);
        }
        this.selectedPlace = (item,id) => ev => {
            this.props.onSelectedPlace(item,id);
        }

        this.orderNow = ev => {
            this.toggle();
            var user = this.props.selectedVUser;
            var orderdat = {
                userid: user.userid,
                payment_type: 1,
                makeit_user_id: this.props.selectedRestaurant.userid,
                payment_status: 1,
                ordertype: 1,
                orderitems: this.props.orderdata,
                aid:this.props.selectedPlaceItem.aid,
                admin_id:getAdminId()
            };
            this.props.onOrderNow(orderdat);
        }
        this.setState({ modal: false })
        this.toggle = this.toggle.bind(this);
    }
    componentDidUpdate(nextProps, nextState) {
        if (this.props.orderstatus) {
            this.props.onRedirect([]);
            this.props.history.push('/live-product')
        }
    }

    componentWillUnmount() {
        this.props.onUnload();
    }
    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    render() {
        const eatvuserlist = this.props.eatvuserlist;
        const selectedVUserIndex = this.props.selectedVUserIndex;
        const selectedPlaceIndex = this.props.selectedPlaceIndex;
        const listOfAddress = this.props.eataddress||[];
        return (
            <div className="pd-8">
                <Card>
                    <CardHeader>
                        EAT VIRTUAL USERS
                        <span className="float-right">
                            <Button className="mr-r-10" onClick={history.goBack}>Back</Button>
                        </span>
                    </CardHeader>
                    <CardBody className="card-footer-with-scroll pd-0">
                        <ListGroup>
                            {eatvuserlist.map((item, i) => (
                                <ListGroupItem key={i} className="list-text" style={selectedVUserIndex === i ? { backgroundColor: "#95f08c" } : { backgroundColor: "#FFF" }} onClick={this.selectedVirtualUser(i)}>
                                    <Row>
                                        <Col lg='12'>
                                            <h5> {item.name}</h5>
                                            <CardRowCol lg='1' lable={'Phone:'} value={item.phoneno}></CardRowCol>
                                            <CardRowCol lg='1' lable={'Email:'} value={item.email}></CardRowCol>
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                            ))}
                        </ListGroup>
                    </CardBody>
                    <CardFooter>
                        <span className="float-right"><Button onClick={this.toggle} disabled={selectedVUserIndex === -1}>Order now</Button></span>
                    </CardFooter>
                </Card>

                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} backdrop={true}>
                    <ModalHeader toggle={this.toggle}>Please Select Address</ModalHeader>
                    <ModalBody>
                        <ListGroup>
                            {listOfAddress.map((item, i) => (
                                <ListGroupItem key={i} className="list-text" style={selectedPlaceIndex === i ? { backgroundColor: "#95f08c" } : { backgroundColor: "#FFF" }} onClick={this.selectedPlace(item,i)}>
                                    <h5>{item.locality}</h5>
                                    <div style={{ fontSize: "12px", color: "gray" }}>{item.address}</div>
                                </ListGroupItem>
                            ))}
                        </ListGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.orderNow}>Yes</Button>{' '}
                        <Button color="danger" onClick={this.toggle}>No</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(CheckOutPage);