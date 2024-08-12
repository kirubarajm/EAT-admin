import React from "react";
import { connect } from "react-redux";
import {
  LIVE_PRODUCT_LIST,
  LIVE_PRODUCT_ADD_CART,
  LIVE_PRODUCT_REMOVE_CART,
  LIVE_ITEM_QUANTITY_DOWN,
  LIVE_ITEM_QUANTITY_UP,
  CART_TIEM_STORE,
  LIVE_PRODUCT_PAGE_LOADED,
  LIVE_PRODUCT_FILTER_LIST,
  LIVE_PRODUCT_RESET_CART,
  LIVE_ITEM_QUANTITY_CHECK
} from "../constants/actionTypes";
import AxiosRequest from "../AxiosRequest";
import { Link } from "react-router-dom";
import placeholder from "../assets/img/placeholder.jpg";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Button,
  CardFooter,
  CardTitle,
  CardText,
  CardImg,
  ButtonGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import ItemIncrementButton from "../components/ItemIncrementButton";
import SearchInput from "../components/SearchInput";
import { history } from "../store";
import {
  PRODUCT_UN_APPROVEL,
  PRODUCT_APPROVEL,
  PRODUCT_LIVE
} from "../constants/updateStatus";

var cartItemTemp;

const mapStateToProps = state => ({
  ...state.liveproduct,
  selectedRestaurant: state.restaurants.selectedRestaurant
  // cartcount: state.common.cartcount,
  // cartItems: state.common.cartItems,
  // subTotal: state.common.subTotal,
});
const mapDispatchToProps = dispatch => ({
  onLoad: (cartItem, cartcount, cartDetail, checkout_status) =>
    dispatch({
      type: LIVE_PRODUCT_PAGE_LOADED,
      cartItem,
      cartcount,
      cartDetail,
      checkout_status
    }),
  onGetProducts: filter =>
    dispatch({
      type: LIVE_PRODUCT_LIST,
      payload: AxiosRequest.Liveproducts.getAllProducts(filter)
    }),
  onAddToCart: item =>
    dispatch({ type: LIVE_PRODUCT_ADD_CART, cartItem: item }),
  onRemoveToCart: item =>
    dispatch({ type: LIVE_PRODUCT_REMOVE_CART, cartItem: item }),
  onQuantityUp: item =>
    dispatch({ type: LIVE_ITEM_QUANTITY_UP, cartItem: item }),
  onQuantityDown: item =>
    dispatch({ type: LIVE_ITEM_QUANTITY_DOWN, cartItem: item }),
  onQuantityCheck: checkItem =>
    dispatch({
      type: LIVE_ITEM_QUANTITY_CHECK,
      payload: AxiosRequest.Liveproducts.checkAddCartDetail(checkItem)
    }),
  onUpdateLocalstore: (item, cartdetail, checkout_status) =>
    dispatch({
      type: CART_TIEM_STORE,
      cartlist: item,
      cartdetail,
      checkout_status
    }),
  onSetFilter: (search, product_approvel,islive) =>
    dispatch({ type: LIVE_PRODUCT_FILTER_LIST, search, product_approvel,islive }),
  onCartReset: () => dispatch({ type: LIVE_PRODUCT_RESET_CART })
});

function ImageCustom(props) {
  if (!props.imageUrl) {
    return <CardImg top width="100%" height="200px" src={placeholder} alt="" />;
  }
  return (
    <CardImg
      top
      width="100%"
      height="200px"
      src={props.imageUrl}
      alt=""
      onError={e => {
        e.target.src = placeholder;
      }}
    />
  );
}

function AddButton(props) {
  const item = props.item;
  var isCartItem = false;
  var selectedCartItem = null;
  if (props.seletedItems && props.seletedItems.length > 0) {
    for (var i = 0; i < props.seletedItems.length; i++) {
      if (props.seletedItems[i].productid === item.productid) {
        isCartItem = true;
        selectedCartItem = props.seletedItems[i];
        break;
      }
    }
    if (isCartItem)
      return (
        <Button
          className="mr-t-10"
          onClick={props.removeCart(selectedCartItem)}
        >
          <i className="fas fa-cart-plus" /> REMOVE
        </Button>
      );
  }

  return (
    <Button className="mr-t-10" onClick={props.addCart(item)}>
      <i className="fas fa-cart-plus" /> ADD
    </Button>
  );
}
class LiveProductsPage extends React.Component {
  componentWillMount() {
    if (
      !this.props.selectedRestaurant ||
      !this.props.selectedRestaurant.userid
    ) {
      this.props.history.push("/live-product");
    }
    this.setState({ islive: false });
    var cartItemLocal = window.localStorage.getItem("yourOrders") || "[]";
    var cartDetail = window.localStorage.getItem("cartdetail") || "{}";
    var checkout_status =
      window.localStorage.getItem("checkout_status") || false;
    var quantity = 0;
    if (cartItemLocal !== "") {
      const storageItems = JSON.parse(cartItemLocal);
      cartDetail = JSON.parse(cartDetail);
      for (var v = 0; v < storageItems.length; v++) {
        quantity = quantity + storageItems[v].quantity;
      }
      this.props.onLoad(
        storageItems,
        quantity,
        cartDetail,
        JSON.parse(checkout_status)
      );
    }
    this.onFiltersApply(this.props.search,this.props.product_approvel,this.props.islive);
    this.onSearch = e => {
      //if (e.keyCode === 13 && e.shiftKey === false) {
       // e.preventDefault();
        this.props.onSetFilter(e.target.value, this.props.product_approvel,this.props.islive);
        this.onFiltersApply(e.target.value, this.props.product_approvel,this.props.islive);
      //}
    };

    this.filter = key => {
      this.setState(prevState => ({
        islive: false
      }));
      this.props.onSetFilter(this.props.search, key,false);
      this.onFiltersApply(this.props.search, key,false);
    };

    this.addCart = item => ev => {
      cartItemTemp = {
        // productItem: item,
        productid: item.productid,
        cartquantity: 1,
        quantity: 1
      };
      const cartDetail = this.props.cartDetail;
      if (
        cartDetail &&
        cartDetail.makeituserid &&
        cartDetail.makeituserid !== item.makeit_userid
      ) {
        this.toggle();
      } else {
        this.props.onAddToCart(cartItemTemp);
      }
    };

    this.removeCart = item => ev => {
      this.props.onRemoveToCart(item);
    };

    this.upQuantity = item => ev => {
      this.props.onQuantityUp(item);
    };

    this.downQuantity = item => ev => {
      if (item.cartquantity === 1) {
        if (this.props.cartItems.length === 1) this.props.onCartReset();
        else this.props.onRemoveToCart(item);
      } else this.props.onQuantityDown(item);
    };

    this.setState({ modal: false });
    this.toggle = this.toggle.bind(this);
    this.clearStorage = this.clearStorage.bind(this);
    this.handleSwitchChange=this.handleSwitchChange.bind(this);
  }

  onFiltersApply(search, approved_status,islive) {
    var filter = {
      makeit_userid: this.props.selectedRestaurant.userid,
      search: search,
      active_status:islive?1:0
    };
    if (approved_status) filter.approved_status = approved_status;
    this.props.onGetProducts(filter);
  }

  componentDidUpdate(nextProps, nextState) {
    console.log("Component DID UPDATE!");
    if (this.props.quantityupdate) {
      var cartCheck = {
        makeit_user_id: this.props.selectedRestaurant.userid,
        orderitems: this.props.cartItems
      };
      this.props.onQuantityCheck(cartCheck);
    } else {
      this.props.onUpdateLocalstore(
        this.props.cartItems,
        this.props.cartDetail,
        this.props.checkout_status
      );
    }
  }
  clearStorage() {
    this.toggle();
    this.props.onCartReset();
    this.props.onAddToCart(cartItemTemp);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  handleSwitchChange(){
    this.setState(prevState => ({
      islive: true
    }));
    this.props.onSetFilter(this.props.search, PRODUCT_APPROVEL,true);
    this.onFiltersApply(this.props.search, PRODUCT_APPROVEL,true);
  }

  render() {
    const productlist = this.props.productlist;
    const cartItems = this.props.cartDetail
      ? this.props.cartDetail.item
        ? this.props.cartDetail.item
        : []
      : [];
    const priceDetail = this.props.cartDetail
      ? this.props.cartDetail.amountdetails
        ? this.props.cartDetail.amountdetails
        : {}
      : {};
    const checkout_status = this.props.checkout_status;
    return (
      <div className="pd-12">
        <Row>
          <Col lg="8" md="12" sm="12" xs="12">
            <Card>
              <CardHeader>
                PRODUCTS
                <Row className="float-right">
                  <ButtonGroup size="sm">
                    <Button
                      color="primary"
                      onClick={() => this.filter(0)}
                      active={this.props.product_approvel === 0}
                    >
                      All
                    </Button>
                    <Button
                      color="primary"
                      onClick={() => this.filter(PRODUCT_UN_APPROVEL)}
                      active={
                        this.props.product_approvel === PRODUCT_UN_APPROVEL
                      }
                    >
                      Unapproved
                    </Button>
                    <Button
                      color="primary"
                      onClick={() => this.filter(PRODUCT_APPROVEL)}
                      active={this.props.product_approvel === PRODUCT_APPROVEL}
                    >
                      Approved
                    </Button>
                    <Button
                      color="primary"
                      onClick={() => this.handleSwitchChange()}
                      active={this.state.islive === PRODUCT_LIVE}
                    >
                      Live
                    </Button>
                  </ButtonGroup>
                  {/* <Col><SwitchButtonCommon handleSwitchChange={this.handleSwitchChange} checked={this.state.islive}/></Col> */}
                  <Col>
                    <SearchInput
                      placeholder="Search Product"
                      onSearch={this.onSearch}
                      value={this.props.search}
                    />
                  </Col>
                  <Col>
                    <Button className="mr-r-10" onClick={history.goBack}>
                      Back
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody className="scrollbar bg-color-grey">
                <Row>
                  {productlist.map((item, i) => (
                    <Col sm="4" className="mr-t-10" key={i}>
                      <Card>
                        <ImageCustom imageUrl={item.image} />
                        
                        <Card body>
                          <CardTitle>{item.product_name} <span hidden={item.active_status!==1}><span className={item.active_status===1?'mr-l-10 live-bg':''}> </span> <span className='color-grey font-size-10'>live</span></span></CardTitle>
                          <CardText>Rs. {item.price}</CardText>
                          <CardText>
                            {item.vegtype === 1 ? "Veg" : "Nonveg"} <span className='appointment-unapprovel mr-l-50'>{item.approved_status===PRODUCT_UN_APPROVEL?"unapproved":""}</span>
                          </CardText>
                          <AddButton
                            seletedItems={cartItems}
                            item={item}
                            addCart={this.addCart}
                            removeCart={this.removeCart}
                          />
                        </Card>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </CardBody>
            </Card>
          </Col>

          <Col lg="4" md="12" sm="12" xs="12">
            <Card>
              <CardHeader>
                <Row>
                  <Col>
                    <div> Cart</div>
                    <div style={{ fontSize: "12px", color: "gray" }}>
                      {this.props.cartcount}{" "}
                      {cartItems.length > 1 ? "Items" : "Item"}
                    </div>
                  </Col>
                  <Col className="float-right">
                    <span
                      className="float-right"
                      style={{
                        color: "#FFF",
                        fontSize: "18px",
                        backgroundColor: "#339AF0",
                        width: "80px",
                        height: "40px",
                        textAlign: "center",
                        paddingTop: "10px"
                      }}
                    >
                      <div>
                        {this.props.cartcount}
                        <span>
                          <i className="fas fa-cart-plus" />
                        </span>
                      </div>
                    </span>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody className="scrollbar-cart">
                {cartItems.map((item, i) => (
                  <div className="list-text cart-item" key={i}>
                    <Row>
                      <Col lg="4">
                        <div className="font-size-16"> {item.product_name} </div>
                      </Col>
                      <Col className="txt-align-right" lg="4">
                        <ItemIncrementButton
                          item={item}
                          down={this.downQuantity}
                          up={this.upQuantity}
                        />
                      </Col>
                      <Col className="txt-align-right" lg="4">
                        <div className="font-size-14">
                          {" "}
                          <i className="fas fa-rupee-sign font-size-12" />{" "}
                          {item.amount}
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="txt-align-left">
                        <div className="font-size-12">
                          {!item.availablity ? (
                            <span style={{ color: "red" }}>
                              Availablity Count: {item.quantity}
                            </span>
                          ) : (
                            <span />
                          )}
                        </div>
                      </Col>
                    </Row>
                  </div>
                ))}
              </CardBody>
              <CardFooter hidden={!priceDetail.totalamount}>
                <Row>
                  <Col>Total</Col>
                  <Col className="txt-align-right mr-r-10">
                    <i className="fas fa-rupee-sign" />{" "}
                    {priceDetail.totalamount}
                  </Col>
                </Row>
                <Row>
                  <Col>Gst</Col>
                  <Col className="txt-align-right mr-r-10">
                    <i className="fas fa-rupee-sign" /> {priceDetail.gstcharge}
                  </Col>
                </Row>
                <Row>
                  <Col>Delivery Charge</Col>
                  <Col className="txt-align-right mr-r-10">
                    <i className="fas fa-rupee-sign" />{" "}
                    {priceDetail.delivery_charge}
                  </Col>
                </Row>
                <hr />
                <Row>
                  <Col>Grand Total</Col>
                  <Col className="txt-align-right mr-r-10">
                    <i className="fas fa-rupee-sign" /> {priceDetail.grandtotal}
                  </Col>
                </Row>
                <hr />
                <Row className="float-right mr-t-10">
                  <Col>
                    <Link to={"/checkout"} className="restaurants">
                      {" "}
                      <Button
                        disabled={!checkout_status || !priceDetail.grandtotal}
                      >
                        Checkout
                      </Button>
                    </Link>
                  </Col>
                </Row>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
          backdrop={true}
        >
          <ModalHeader toggle={this.toggle}>confirmation</ModalHeader>
          <ModalBody>
            {" "}
            <b>Sorry!! </b>
            Your cart contains items from other kitchen. Would you like to reset
            your cart for adding items from this kitchen?
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.clearStorage}>
              Yes
            </Button>{" "}
            <Button color="danger" onClick={this.toggle}>
              No
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LiveProductsPage);
