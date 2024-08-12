import React from "react";
import AxiosRequest from "../AxiosRequest";
import {
  MAKEIT_PRODUCT_APPROVED_DETAIL,
  MAKEIT_PRODUCT_APPROVED_UPDTAE,
  MAKEIT_ITEM_APPROVED_UPDTAE,
  LIVE_RESTAURANTS_SELECT,
  TOAST_SHOW
} from "../constants/actionTypes";
import placeholder from "../assets/img/placeholder.jpg";
import { connect } from "react-redux";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Row,
  Col,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CardImg
} from "reactstrap";
import { Link } from "react-router-dom";
import { isFoodCycle, isDaysCycle } from "../utils/ConstantFunction";
import { FaEdit, FaBan, FaCheck } from "react-icons/fa";
import ItemInventoryForm from "../components/ItemInventoryForm";
import { history } from "../store";
import { MdDoneAll } from "react-icons/md";
import ProductForm from "../components/ProductForm";

const mapStateToProps = state => ({ ...state.productapprovedetail });

const mapDispatchToProps = dispatch => ({
  onGetProducts: id =>
    dispatch({
      type: MAKEIT_PRODUCT_APPROVED_DETAIL,
      payload: AxiosRequest.MakeitProcess.getsingleProdcut(id)
    }),
  onUpdateProductApprove: data =>
    dispatch({
      type: MAKEIT_PRODUCT_APPROVED_UPDTAE,
      payload: AxiosRequest.MakeitProcess.approvedProduct(data)
    }),

  onUpdateItemApprove: data =>
    dispatch({
      type: MAKEIT_ITEM_APPROVED_UPDTAE,
      payload: AxiosRequest.MakeitProcess.approvedItems(data)
    }),
  onSelectedRestaurant: selectedRestaurant =>
    dispatch({ type: LIVE_RESTAURANTS_SELECT, selectedRestaurant }),
  ShowToast: message => dispatch({ type: TOAST_SHOW, message: message })
});

function TableAction(props) {
  const item = props.item;
  if (item.approved_status === 0 || item.approved_status === 3) {
    return (
      <td className="makeit-process-action">
        <FaEdit
          className="mr-r-10"
          onClick={props.toggleItemEditModal}
          color={item.approved_status === 1 ? "grey" : ""}
        />
        <FaCheck
          className="mr-r-10"
          onClick={props.onClickApproved}
          color={item.approved_status === 1 ? "green" : ""}
        />
        <FaBan
          onClick={props.onClickReject}
          color={item.approved_status === 1 ? "grey" : "red"}
        />
      </td>
    );
  } else if (item.approved_status === 2) {
    return (
      <td>
        <FaBan className="mr-l-10" color="red" />
      </td>
    );
  }

  return (
    <td>
      <MdDoneAll className="mr-l-10" color="green" />
    </td>
  );
}

function CardRowCol(props) {
  var lg = props.lg ? props.lg : "12";
  var lable = props.lable ? props.lable : "";
  var color = props.color ? props.color : "Black";
  if (props.value !== null) {
    return (
      <Row className="list-text cart-item">
        <Col lg={lg} className="lable">
          {lable}
        </Col>
        <Col lg="7" style={{ color: color }}>
          {props.value}
        </Col>
      </Row>
    );
  }

  return <div />;
}

function CardRowColPackage(props) {
  var lg = props.lg ? props.lg : "12";
  var lable = props.lable ? props.lable : "";
  var color = props.color ? props.color : "Black";
  if (props.value !== null) {
    return (
      <Row className="list-text cart-item">
        <Col lg={lg} className="lable">
          {lable}
        </Col>
        <Col lg="3" style={{ color: color }}>
          {props.value}
        </Col>
      </Row>
    );
  }

  return <div />;
}

function ImageCustom(props) {
  if (props.imageUrl === null) {
    return (
      <CardImg
        top
        width="100%"
        height="250px"
        className="object-fit_fill"
        src={placeholder}
        alt=""
      />
    );
  }

  return (
    <CardImg
      top
      width="100%"
      height="250px"
      src={props.imageUrl}
      className="object-fit_fill"
      alt=""
      onError={e => {
        e.target.src = placeholder;
        //"http://tfwpontevedrabeach.com/wp-content/uploads/2017/05/pojo-placeholder-2.png";
      }}
    />
  );
}

var productId;

class ApprovedProductDetail extends React.Component {
  componentWillMount() {
    productId = this.props.match.params.productid;
    this.props.onGetProducts(productId);
    this.setState({
      modal: false,
      isItemEdit: false,
      itemId: 0,
      ApprovedItemId: 0,
      ApprovedProductId: 0,
      confirmProductPopup: false,
      confirmMessage: "",
      footerDisable: false,
      productmodal: false,
      isProductEdit: false,
      type: 0
    });
    this.toggleItemModal = this.toggleItemModal.bind(this);
    this.itemUpdate = this.itemUpdate.bind(this);
    this.productUpdate = this.productUpdate.bind(this);
    this.toggleConfirmModal = this.toggleConfirmModal.bind(this);
    this.toggleMessageModal = this.toggleMessageModal.bind(this);
    this.toggleProductModal = this.toggleProductModal.bind(this);
    this.toggleProductEditModal = this.toggleProductEditModal.bind(this);
    this.UpdateApproved = this.UpdateApproved.bind(this);
    this.selectedRestaurant = this.selectedRestaurant.bind(this);
  }

  selectedRestaurant = item => {
    this.props.onSelectedRestaurant(item);
  };

  componentDidUpdate(nextProps, nextState) {
    if (this.props.product_approved) {
      history.goBack();
    }

    if (this.props.item_approved) {
      this.props.onGetProducts(productId);
    }
  }

  toggleItemModal() {
    this.setState(prevState => ({
      modal: !prevState.modal,
      isItemEdit: false
    }));
  }
  toggleItemEditModal(index, item) {
    this.setState(prevState => ({
      modal: !prevState.modal,
      isItemEdit: !prevState.isItemEdit,
      itemId: item.menuitemid
    }));
  }

  itemUpdate = () => {
    this.toggleItemModal();
    //this.props.onGetProducts(productId);
  };
  productUpdate = () => {
    this.toggleProductModal();
    this.props.onGetProducts(productId);
  };

  toggleProductModal() {
    this.setState(prevState => ({
      productmodal: !prevState.productmodal,
      isProductEdit: !prevState.isProductEdit
    }));
  }
  toggleProductEditModal(productId) {
    this.setState(prevState => ({
      productmodal: !prevState.productmodal,
      isProductEdit: !prevState.isProductEdit
    }));
  }

  toggleConfirmModal() {
    this.setState(prevState => ({
      confirmProductPopup: !prevState.confirmProductPopup,
      footerDisable: false
    }));
  }

  toggleMessageModal() {
    this.setState(prevState => ({
      confirmProductPopup: !prevState.confirmProductPopup,
      footerDisable: true
    }));
  }

  onClickApproved(item, type) {
    var isCheckPack=true;
    if (item.makeitdetail && item.makeitdetail.ka_status !== 2) {
      this.props.ShowToast("First approve the kitchen and try again.");
      return;
    }
    if (type === 1) {
      this.setState({
        confirmMessage: "Are you sure you want to approve this item.",
        type: type,
        ApprovedItemId: item.menuitemid
      });
    } else if (type === 3) {
      this.setState({
        confirmMessage: "Are you sure you want to reject this item.",
        type: type,
        ApprovedItemId: item.menuitemid
      });
    } else if (type === 4) {
      this.setState({
        confirmMessage: "Are you sure you want to reject this product.",
        type: type,
        ApprovedProductId: item.productid
      });
    } else if (type === 2) {
      var isApproved = true;
      
      var isPackaged=(item.packageItems.length>0)?true:false;
      if (item.items) {
        for (var i = 0; i < item.items.length; i++) {
          if (item.items[i].approved_status !== 1) isApproved = false;
        }
      }

      if (isApproved) {
        //makeitdetail.virtualkey
        
        // if(item.makeitdetail.virtualkey==0&&item.makeitdetail.makeit_type==0){
        //   if(!isPackaged){
        //     isCheckPack=false;
        //     this.setState({
        //       confirmMessage:
        //         "Sorry can't approve this product.Please add package details.",
        //       type: type
        //     });
        //     this.toggleMessageModal();
        //     return;
        //   }
        // }

        if(isCheckPack){
          this.setState({
          confirmMessage: "Are you sure you want to approve this product",
          type: type,
          ApprovedProductId: item.productid
        });
        }
        
      } else {
        isCheckPack=false;
        this.setState({
          confirmMessage:
            "Sorry can't approve this product.Please approve the item first",
          type: type
        });
        this.toggleMessageModal();
        return;
      }
    }
    if(isCheckPack) 
    this.toggleConfirmModal();
  }

  UpdateApproved() {
    this.toggleConfirmModal();
    if (this.state.type === 1) {
      this.props.onUpdateItemApprove({
        menuitemid: this.state.ApprovedItemId,
        approved_status: 1
      });
    } else if (this.state.type === 2) {
      this.props.onUpdateProductApprove({
        productid: this.state.ApprovedProductId,
        approved_status: 2
      });
    } else if (this.state.type === 3) {
      this.props.onUpdateItemApprove({
        menuitemid: this.state.ApprovedItemId,
        approved_status: 2
      });
    } else if (this.state.type === 4) {
      this.props.onUpdateProductApprove({
        productid: this.state.ApprovedProductId,
        approved_status: 3
      });
    }
  }

  render() {
    const productdetail = this.props.productdetail;
    const Items = productdetail.items || [];
    const packageItems = productdetail.packageItems || [];
    const makeitdetail = productdetail.makeitdetail || {};
    const linkName = makeitdetail.name || "";
    const Url = linkName.replace(" ", "-");
    return (
      <div className="pd-8">
        <Card>
          <CardHeader>
            Product Approved
            <Row className="float-right">
              <Button
                className="mr-r-10"
                color="success"
                onClick={() => this.onClickApproved(productdetail, 2)}
              >
                Approved
              </Button>
              <Button
                className="mr-r-10"
                color="danger"
                onClick={() => this.onClickApproved(productdetail, 4)}
              >
                Reject
              </Button>
              <Button className="mr-r-10" onClick={history.goBack}>
                Back
              </Button>
            </Row>
          </CardHeader>
          <CardBody className="scrollbar pd-0">
            <Row className="mr-t-20 mr-r-10 mr-l-10">
              <Col lg="5">
                <Card>
                  <CardHeader>
                    Product Detail
                    <Row className="float-right">
                      <Button
                        size="sm"
                        color="primary"
                        onClick={() => this.toggleProductModal()}
                      >
                        <FaEdit size={20} color={"white"} />
                      </Button>
                    </Row>
                  </CardHeader>
                  <CardBody className="card-footer-with-scroll">
                    <ImageCustom
                      imageUrl={productdetail.image}
                      className="product_detail_image"
                      alt="product_image"
                    />

                    <div className="product_detail_content">
                      <Row
                        className="font-weight-bold"
                        style={{ color: "black" }}
                      >
                        <Col lg="6">Product Name</Col>
                        <Col lg="6">{productdetail.product_name}</Col>
                      </Row>
                      <hr />
                      <Row
                        className="font-weight-bold"
                        style={{ color: "black" }}
                      >
                        <Col lg="6">Price</Col>
                        <Col lg="6">
                          <i className="fas fa-rupee-sign" />{" "}
                          {productdetail.price}
                        </Col>
                      </Row>
                      <hr />
                      <Row className="mr-t-10 font-weight-bold">
                        <Col lg="6">Type</Col>
                        <Col lg="1">
                          <div className="square-food" />
                        </Col>
                        <Col lg="5">
                          {productdetail.vegtype === "0" ? "Veg" : "Non Veg"}
                        </Col>
                      </Row>
                      <hr />
                      <Row
                        className="font-weight-bold"
                        style={{ color: "black" }}
                      >
                        <Col lg="6">Food Cycle</Col>
                        <Col lg="6">{isFoodCycle(productdetail)}</Col>
                      </Row>
                      <hr />

                      <Row
                        className="font-weight-bold"
                        style={{ color: "black" }}
                      >
                        <Col lg="6">Days</Col>
                        <Col lg="6">{isDaysCycle(productdetail)}</Col>
                      </Row>

                      <div hidden={packageItems.length == 0 ||makeitdetail.makeit_type!=0}>
                        <hr></hr>
                        <Row className="mr-t-10 font-weight-bold">
                          <Col lg="12" className="txt-align-center">
                            Package Detail
                          </Col>
                          {/* <Col lg='4' className='txt-align-left'> Quantity</Col> */}
                        </Row>
                        <div className="mr-t-10 font-weight-bold">
                        <CardRowColPackage
                              lg="8"
                              lable={"Package Name"}
                              value={"Count"}
                            ></CardRowColPackage>
                            <hr></hr>
                          {packageItems.map((item, index) => (
                            <CardRowColPackage
                              lg="9"
                              key={index}
                              lable={item.name}
                              value={item.count}
                            ></CardRowColPackage>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col>
                <Row>
                  <Col>
                    <Card>
                      <CardHeader>Item Detail</CardHeader>
                      <CardBody className="order-v-cb-item card-body">
                        <Table>
                          <thead>
                            <tr>
                              <th>Id</th>
                              <th>Name</th>
                              <th>Price</th>
                              <th>Quantity</th>
                              <th>Type</th>
                              <th>Action</th>
                            </tr>
                          </thead>

                          <tbody>
                            {Items.map((item, index) => (
                              <tr key={index}>
                                <td>{item.menuitemid}</td>
                                <td>{item.menuitem_name}</td>
                                <td>{item.price}</td>
                                <td>{item.quantity}</td>
                                <td>
                                  {item.vegtype === "0" ? "Veg" : "Non Veg"}
                                </td>
                                <TableAction
                                  item={item}
                                  index={index}
                                  onClickApproved={() =>
                                    this.onClickApproved(item, 1)
                                  }
                                  onClickReject={() =>
                                    this.onClickApproved(item, 3)
                                  }
                                  toggleItemEditModal={this.toggleItemEditModal.bind(
                                    this,
                                    index,
                                    item
                                  )}
                                />
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </CardBody>
                    </Card>

                    <Card className="mr-t-20">
                      <CardHeader>
                        Kitchen Detail
                        <Row className="float-right">
                          <Link
                            to={`/restaurant/${Url}`}
                            onClick={this.selectedRestaurant(makeitdetail)}
                          >
                            <Button size="sm" color="primary">
                              Kitchen
                            </Button>
                          </Link>
                        </Row>
                      </CardHeader>
                      <CardBody className="order-v-cb-user">
                        <CardRowCol
                          lg="4"
                          lable="Brand "
                          value={makeitdetail.brandName || "-"}
                        />
                        <CardRowCol
                          lg="4"
                          lable="Name "
                          value={makeitdetail.name}
                        />
                        <CardRowCol
                          lg="4"
                          lable="Phone"
                          value={makeitdetail.phoneno}
                        />
                        <CardRowCol
                          lg="4"
                          lable="Address"
                          value={makeitdetail.address}
                        />

                        <CardRowCol
                          lg="4"
                          lable="Approved Status"
                          color={makeitdetail.ka_status === 2 ? "green" : "red"}
                          value={
                            makeitdetail.ka_status === 2
                              ? "Approved"
                              : "UnApproved"
                          }
                        />
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
          </CardBody>
        </Card>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggleItemModal}
          className={this.props.className}
          backdrop={"static"}
        >
          <ModalHeader toggle={this.toggleItemModal}>Item</ModalHeader>
          <ModalBody>
            <ItemInventoryForm
              userId={productdetail.makeit_userid}
              isEdit={this.state.isItemEdit}
              update={this.itemUpdate}
              itemId={this.state.itemId}
            />
          </ModalBody>
        </Modal>

        <Modal
          isOpen={this.state.productmodal}
          toggle={this.toggleProductModal}
          className={this.props.className}
          backdrop={"static"}
        >
          <ModalHeader toggle={this.toggleProductModal}>
            {this.props.sub_menu_name}
          </ModalHeader>
          <ModalBody>
            <ProductForm
              userId={productdetail.makeit_userid}
              isEdit={this.state.isProductEdit}
              update={this.productUpdate}
              productId={productdetail.productid}
              virtualkey={makeitdetail.virtualkey} 
              makeit_type={makeitdetail.makeit_type}
            />
          </ModalBody>
        </Modal>

        <Modal
          isOpen={this.state.confirmProductPopup}
          toggle={this.toggleConfirmModal}
          className={this.props.className}
          backdrop={"static"}
        >
          <ModalHeader toggle={this.toggleConfirmModal}>
            Confirm Message
          </ModalHeader>
          <ModalBody>{this.state.confirmMessage}</ModalBody>
          <ModalFooter hidden={this.state.footerDisable}>
            <Button color="primary" onClick={this.UpdateApproved}>
              Yes
            </Button>{" "}
            <Button color="secondary" onClick={this.toggleConfirmModal}>
              NO
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
)(ApprovedProductDetail);
