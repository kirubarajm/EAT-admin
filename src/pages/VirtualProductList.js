import React from "react";
import AxiosRequest from "../AxiosRequest";
import SearchInput from "../components/SearchInput";
import {FaEdit,FaExternalLinkAlt,FaTrashAlt} from 'react-icons/fa';
import Select from "react-dropdown-select";
import { Field, reduxForm } from "redux-form";
import { required, minLength5,is_url } from "../utils/Validation";


import {
  VIRTUAL_PRODUCT_LIST,
  MAKEIT_PRODUCT_DEAIL_ADD_LIVE,
  MAKEIT_PRODUCT_DELETE_CLEAR,
  VIRTUAL_PRODUCT_FILTER,
  MAKEIT_GET_HUB,
  MAKEIT_PRODUCT_DEAIL_EDIT_COUNT,
  EDIT_QUANTITY_VIRTUAL_PRODUCT_LIST,
  EDIT_QUANTITY_BUTTON_ENABLE
} from "../constants/actionTypes";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PaginationComponent from "react-reactstrap-pagination";
import {
  Card,
  CardBody,
  CardHeader,
  Table,
  Row,
  Col,
  ButtonGroup,
  Button,
  CardFooter,
  Modal, ModalHeader, ModalBody,ModalFooter,
  UncontrolledTooltip,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { FaListAlt } from "react-icons/fa";
import SwitchButtonCommon from "../components/SwitchButtonCommon";
import ProductForm from '../components/ProductForm';
import ProductDetail from '../components/ProductDetail';
import PackageBoxForm from "../components/PackageBoxForm";



function HubDropDown1(props) {
  if (props.visible && props.selectedHub) {
    return (
      <ButtonDropdown
        isOpen={props.dropdownOpen}
        toggle={props.dropdowntoggle}
        size="sm"
      >
        <DropdownToggle caret  disabled={props.disabled}>{props.selectedHub.address}</DropdownToggle>
        <DropdownMenu>
          {props.makeithub.map((item, index) => (
            <DropdownItem onClick={() => props.selectHub(item)} key={index}>
              {item.address}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </ButtonDropdown>
    );
  } else {
    return <div />;
  }
}

function EditQuantity(props) {
  //if (props.isLiveList) {
    var Items=props.item;
    var isEdit=Items.isEdit===undefined?false:Items.isEdit;
    var editQuantity=Items.editquantity;
      if (!isEdit) {
        editQuantity=Items.quantity;
          return (
              <Row className="mr-t-10">
                  {/* <Col lg='8'>Live Quantity</Col> */}
                  <Col  style={{display:"flex",alignItems:"center"}}>{editQuantity}</Col>
                  <Col  className='pd-0'>
                      <Button onClick={props.action}>Edit</Button>
                  </Col>
              </Row>
          );
      } else if (isEdit) {
          return (
              <Row className="mr-t-10 font-weight-bold">
                  {/* <Col lg='8'>Live Quantity</Col> disabled={!props.quantity}*/}
                  <Col   style={{display:"flex",alignItems:"center"}}>
                      <input type="number" value={editQuantity} style={{ "width": "40px","height": "30px",}} onChange={(e)=>props.onChangeQuantity(props.index,e)}/>
                  </Col>
                  <Col  className='pd-0'>
                      <Button  onClick={props.action}>Done</Button>
                  </Col>
              </Row>
          );
      }
 // }

  // return (
  //     <Row className="mr-t-10 font-weight-bold">
  //         {/* <Col lg='8'>Live Quantity</Col> */}
  //         <Col lg='4'>{props.quantity}</Col>
  //     </Row>
  // );
}

const mapStateToProps = state => ({ ...state.virtualproductlist });

const mapDispatchToProps = dispatch => ({

   onGetVirtualProduct:(data) =>
    dispatch({
      type: VIRTUAL_PRODUCT_LIST,
      payload: AxiosRequest.MakeitProcess.getAllVirtualProduct(data)
    }),
    onAddProductQuantity: (data) =>
    dispatch({ type: MAKEIT_PRODUCT_DEAIL_ADD_LIVE, payload: AxiosRequest.MakeitProcess.movetolive(data) }),
    onClearProduct:() =>
    dispatch({ type: MAKEIT_PRODUCT_DELETE_CLEAR }),
    onSetFilter: ( search,page,hubitem) =>
    dispatch({ type: VIRTUAL_PRODUCT_FILTER, search,page,hubitem }),
    onGetMovieitHub: () =>
    dispatch({
      type: MAKEIT_GET_HUB,
      payload: AxiosRequest.Master.getMovieitHub()
    }),
    onEditProductQuantity: (data) =>
        dispatch({ type: MAKEIT_PRODUCT_DEAIL_EDIT_COUNT, payload: AxiosRequest.MakeitProcess.movetolive(data) }),
    editVirtualProductQuantity : (index,quantity)=>
    dispatch({ type: EDIT_QUANTITY_VIRTUAL_PRODUCT_LIST, index,quantity }),
    onEditQuantityEnable : (index,isEdit)=>
    dispatch({ type: EDIT_QUANTITY_BUTTON_ENABLE, index,isEdit })
});

const defultPage=1;


class VirtualProductList extends React.Component {
  constructor() {
    super();
    this.state = {isAddQuantity:false,productviewmodal:false,ispagenation:false,dropdownOpen: false,liveModal: false,countModal: false, isEdit: false,editIndex:0};
  }

 
  componentDidMount(){
      this.setState({ ispagenation:true });
 }

  componentWillMount() {
    this.selectHub = this.selectHub.bind(this);
    this.productUpdateView=this.productUpdateView.bind(this);
    this.dropdowntoggle = this.dropdowntoggle.bind(this);
    this.onAction=this.onAction.bind(this);;
    //this.props.onGetVirtualProduct({search:this.props.search,page:this.props.page});
    this.addCount=this.addCount.bind(this);
    this.handleSelected=this.handleSelected.bind(this);
    this.onSearch=this.onSearch.bind(this);
    if (!this.props.makeithub || this.props.makeithub.length === 0)
    this.props.onGetMovieitHub();
  }

  
  handleSelected(selectedPage) {
    this.props.onSetFilter( this.props.search,selectedPage,this.props.hubItem);
    this.props.onGetVirtualProduct({search:this.props.search,page:selectedPage,makeithub_id:this.props.hubItem.makeithub_id});
 }
  
  componentDidUpdate(nextProps, nextState) {
    if (this.props.makeithub &&this.props.makeithub.length !== 0 &&!this.props.hubItem) {
      this.selectHub(this.props.makeithub[0]);
    }

    if(this.props.productMoveToLive&&this.state.isAddQuantity ){
      this.setState({isAddQuantity:false});
      this.props.onGetVirtualProduct({search:this.props.search,page:this.props.page,makeithub_id:this.props.hubItem.makeithub_id});
      this.props.onClearProduct();
    }

    
    if (this.props.productEdittQuantity) {
      //console.log("this.state.lastliveQuantity-->",this.state.lastliveQuantity);
      if(!this.props.productEditQuantityStatus){
        this.props.onEditQuantityEnable(this.state.editIndex,false);
      }else{
        this.props.onEditQuantityEnable(this.state.editIndex,false);
        this.props.onGetVirtualProduct({search:this.props.search,page:this.props.page,makeithub_id:this.props.hubItem.makeithub_id});
      }
  }
    
  }
 

  selectHub(hubitem) {
    this.props.onSetFilter("",defultPage,hubitem);
    this.props.onGetVirtualProduct({search:this.props.search,page:defultPage,makeithub_id: hubitem.makeithub_id});
  }

  onSearch = e => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      this.props.onSetFilter(e.target.value,defultPage,this.props.hubItem);
      this.props.onGetVirtualProduct({search:e.target.value,page:defultPage,makeithub_id:this.props.hubItem.makeithub_id});
    }else if(e.target.value===''){
      e.preventDefault();
      this.props.onSetFilter( e.target.value,defultPage,this.props.hubItem);
      this.props.onGetVirtualProduct({search:e.target.value,page:defultPage,makeithub_id:this.props.hubItem.makeithub_id});
    }
  };


  productUpdateView() {
    this.setState(prevState => ({
      productviewmodal: !prevState.productviewmodal}))
    this.props.onGetVirtualProduct({search:this.props.search,page:this.props.page,makeithub_id: this.props.hubItem.makeithub_id});
}

 
addCount(item) {
  this.setState({isAddQuantity:true});
  var userid = item.makeit_userid;
  if(item.active_status===1){
      this.props.onAddProductQuantity({
          productid: item.productid,
          quantity: 1,
          active_status: 0,
          makeit_userid: userid
      });
  }else{
      this.props.onAddProductQuantity({
          productid: item.productid,
          quantity: 10,
          active_status: 1,
          makeit_userid: userid
      });
  }
  
}
  
toggleCount = () => {
  this.setState(prevState => ({
      countModal: !prevState.countModal,
      liveModal: false,
  }));
}

handleClick(index, item) {
  // this.props.itemView(item.productid,true);
  var userid = item.makeit_userid;
  this.setState(prevState => ({
    productviewmodal: !prevState.productviewmodal,
    productId: item.productid,
    isLiveList:false,
    userid:userid
}));
}




dropdowntoggle() {
  this.setState({ dropdownOpen: !this.state.dropdownOpen });
}

editClick =(packageid)=>{
  var id=(packageid+1);
  console.log("packageid-->",id);
  this.setState(prevState => ({
    packageId: id,
    isPackageEdit: true,
}));

  this.setState(prevState => ({
    boxingmodal: !prevState.boxingmodal,
}));
}


itemUpdate =()=>{
  this.props.onGetPackage();
  this.setState(prevState => ({
    boxingmodal: !prevState.boxingmodal,
    isPackageEdit: false,
  }));
}

onAction(item,index){
  if (item.isEdit) {
      var liveq=this.state.lastliveQuantity;
      this.setState({
          lastliveQuantity: liveq?liveq:item.quantity
      });
      this.props.onEditProductQuantity({
          productid: item.productid,
          quantity: item.editquantity||0,
          makeit_userid:item.makeit_userid,
          active_status:1,
      });
      
  }else{
    this.setState({
      lastliveQuantity:item.quantity,
      editIndex:index,
    });
    this.props.onEditQuantityEnable(index,!item.isEdit);
  }
}

onChangeQuantity = (index,e) => {
  this.props.editVirtualProductQuantity(index,e.target.value)
}


  render() {
    const VirtualProductList = this.props.VirtualProductList || [];
    const isLiveList = this.props.isLiveList;
  //  console.log("virualproductList-----------------",virtualproductList);
    return (
      <div className="pd-8">
        <Card>
          <CardHeader>
            Virtual Product
            <Row className="float-right">
             
            <Col>
                <HubDropDown1
               //  disabled={this.props.makeithub}
                  dropdownOpen={this.state.dropdownOpen}
                  visible={true}
                  dropdowntoggle={this.dropdowntoggle}
                  selectedHub={this.props.hubItem}
                  selectHub={this.selectHub}
                  makeithub={this.props.makeithub}
                />
                  
             </Col>
                <Col>
                <SearchInput onSearch={this.onSearch} value={this.props.search}/>
                 {/* <SearchInputnew onSearch={this.onSearch} value={this.props.search}/> */}
                 </Col>
            </Row>
          </CardHeader>
          <CardBody className="card-footer-with-scroll pd-0">
            <Table>
              <thead>
                <tr>
                  <th>No</th>
                  <th>makeit Id</th>
                  <th>brandname</th>
                  <th>Product Id</th>
                  <th>Product Name</th>
                  <th>Price</th>
              
                  {/* <th>Service</th> */}
                  <th>Type</th>
                  <th>Live</th>   
                  {/* <th>Quantity</th>   */}
                  <th>action</th>  
                
                </tr>
              </thead>
              <tbody>
                {VirtualProductList.map((item, index) => (
                  <tr key={index}>
                   
                   <th scope="row">{index + 1}</th>
                    <th scope="row">{item.makeit_userid}</th>
                    <th scope="row">{item.brandname}</th>
                    <td>{item.productid}</td>
                    <td>{item.product_name}</td>
                    <td>{item.price}</td>
                    
                    <td>{item.vegtype==="0"? 'Veg' : 'Non Veg'}</td>
                    <td>
                    <td><SwitchButtonCommon  handleSwitchChange={this.addCount.bind(this, item)} checked={item.active_status===1?true:false}/></td>
                    </td>
                    {/* <td>{item.quantity}</td> */}
                    <td className='makeit-process-action'>
                    {/* <FaExternalLinkAlt onClick={this.handleClick.bind(this, index, item)}/>
                   <FaEdit className='mr-r-10' onClick={this.editClick.bind(this,index , item)}/> */}
                   <EditQuantity action={()=>this.onAction(item,index)} index={index} item={item}   onChangeQuantity={this.onChangeQuantity}/>

                   </td>             
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
          
          
          <CardFooter hidden={this.props.total_page_count<this.props.productlimit && !this.state.ispagenation}>
                    <div className="float-right">
                        <PaginationComponent
                            totalItems={this.props.total_page_count}
                            pageSize={this.props.productlimit}
                            onSelect={this.handleSelected}
                            maxPaginationNumbers={'5'}
                            activePage={this.props.page}/>
                        </div>
          </CardFooter>

        
        </Card>
        <Modal isOpen={this.state.productviewmodal} toggle={this.toggleProductViewModal} className={this.props.className} backdrop={true}>
                    <ModalHeader toggle={this.toggleProductViewModal}>{this.props.sub_menu_name}</ModalHeader>
                    <ModalBody>
                        <ProductDetail userId={this.state.userid} update={this.productUpdateView} productId={this.state.productId} isLiveList={this.state.isLiveList}></ProductDetail>
                    </ModalBody>
                </Modal>
        
                {/* <Modal isOpen={this.state.boxingmodal} toggle={this.toggleBoxingModal} className={this.props.className} backdrop={'static'}>
                    <ModalHeader toggle={this.toggleBoxingModal}>Package Add</ModalHeader>
                    <ModalBody>
                        <PackageBoxForm  isEdit={this.state.isPackageEdit} update={this.itemUpdate} packageId={this.state.packageId}></PackageBoxForm>
                    </ModalBody>
                </Modal> */}


                {/* <Modal isOpen={this.state.countModal} toggle={this.toggleCount}>
                    <ModalHeader>ENTER QUANTITY</ModalHeader>
                    <ModalBody>
                        <form onSubmit={handleSubmit(this.addCount)} className='product_form'>
                            <Field name="quantity" type="number" component={renderInputField} label="Enter the quantity for live" validate={[required]} />
                            <div className='float-right'>
                                <Button type="submit" disabled={pristine || submitting}>Submit</Button>
                            </div>
                        </form>
                    </ModalBody>
                </Modal> */}
        
      </div>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VirtualProductList);
