import React from 'react';
import { MAKEIT_PRODUCT_PAGE_LOAD, MAKEIT_ITEM_LIST, MAKEIT_SUBMENU_SELECT, MAKEIT_PRODUCT_MENU, MAKEIT_PRODUCT_PAGE_UNLOAD, MAKEIT_PRODUCT_GET_LIVE, MAKEIT_PRODUCT_MENU_DELETE, MAKEIT_PRODUCT_DELETE_CLEAR, KITCHEN_PRODUCT_PERCENTAGE, MAKEIT_PACKAGE_INVENTORY_LIST, MAKEIT_PRODUCT_DEAIL_ADD_LIVE, MAKEIT_PRODUCT_DEAIL_REMOVE_LIVE } from '../constants/actionTypes'
import { connect } from 'react-redux'
import AxiosRequest from '../AxiosRequest';
import { Card, CardBody, CardHeader, Row, Col, Button, Modal, ModalHeader, ModalBody ,ModalFooter} from 'reactstrap';
//import SearchInput from '../components/SearchInput';
import MakeitSubmenu from '../components/MakeitSubmenu'
import MakeitItems from '../components/MakeitItems';
import MakeitProductList from '../components/MakeitProductList';
import { FaPlus } from 'react-icons/fa'
import ItemInventoryForm from '../components/ItemInventoryForm';
import ProductForm from '../components/ProductForm';
import MakeitLiveList from '../components/MakeitLiveList';
import { history } from '../store';
import ProductDetail from '../components/ProductDetail';
import ProductSuccession from '../components/ProductSuccession';
import PackageInventory from '../components/PackageInventory';
import PackageInventoryForm from '../components/PackageInventoryForm';

function Submenulist(props) {
    if (props.sub_menu_id === 0) {
        return (
            <MakeitItems Items={props.makeit_list} itemEdit={props.itemEdit}></MakeitItems>
        );
    }else if (props.sub_menu_id === 1) {

        return (
            <MakeitProductList products={props.makeit_list} itemEdit={props.itemEdit} 
            itemView={props.itemView} productDelete={props.productDelete} addCount={props.addCount}></MakeitProductList>
        );
    }else if (props.sub_menu_id === 2) {

        return (
            <MakeitLiveList products={props.makeit_list} itemView={props.itemView}></MakeitLiveList>
        );
    }else if (props.sub_menu_id === 3) {

        return (
            <ProductSuccession products={props.makeit_list}></ProductSuccession>
        );
    }else if (props.sub_menu_id === 4) {

        return (
            <PackageInventory productsInventorylist={props.makeit_list}></PackageInventory>
        );
    }else if (props.sub_menu_id === 4) {

        return (
            <PackageInventory productsInventorylist={props.makeit_list}></PackageInventory>
        );
    }

    return (
        <div></div>
    );

}

function FabButton(props) {
    if (props.sub_menu_id < 2 || props.sub_menu_id===4) {
        return (
            <Button color="success" className='fab-btn' onClick={props.toggleModal}><FaPlus /></Button>
        );
    }
    return (
        <div></div>
    );

}
const mapStateToProps = state => ({ ...state.makeitprocess });

const mapDispatchToProps = dispatch => ({
    onGetUserDetail: (makeitid) =>
        dispatch({ type: MAKEIT_PRODUCT_PAGE_LOAD, payload: AxiosRequest.Makeit.getsingle(makeitid) }),
    onPageUnLoad: () =>
        dispatch({type: MAKEIT_PRODUCT_PAGE_UNLOAD}),
    onGetItem: (makeitid) =>
        dispatch({ type: MAKEIT_ITEM_LIST, payload: AxiosRequest.MakeitProcess.getAllItem(makeitid) }),
    onGetMenu: (makeitdata) =>
        dispatch({ type: MAKEIT_PRODUCT_MENU, payload: AxiosRequest.MakeitProcess.getAllMenu(makeitdata) }),
    onProductDelete: (id) =>
        dispatch({ type: MAKEIT_PRODUCT_MENU_DELETE, payload: AxiosRequest.MakeitProcess.delete(id) }),
    onGetLiveProduct: (makeitid) =>
        dispatch({ type: MAKEIT_PRODUCT_GET_LIVE, payload: AxiosRequest.MakeitProcess.getAllLive(makeitid) }),
    onGetKitchenProductPercentage: (makeitdata) =>
        dispatch({ type: KITCHEN_PRODUCT_PERCENTAGE, payload: AxiosRequest.MakeitProcess.getKitchenProdcutPercentage(makeitdata) }),
    onGetPackageInventory: (userid) =>
        dispatch({ type: MAKEIT_PACKAGE_INVENTORY_LIST, payload: AxiosRequest.PackageInventory.getPackageInvetoryList(userid) }),
        onAddProductQuantity: (data) =>
        dispatch({ type: MAKEIT_PRODUCT_DEAIL_ADD_LIVE, payload: AxiosRequest.MakeitProcess.movetolive(data) }),
        onSelectMenu: (sub_menu_id) =>
        dispatch({ type: MAKEIT_SUBMENU_SELECT, sub_menu_id }),
    onClearProduct:() =>
    dispatch({ type: MAKEIT_PRODUCT_DELETE_CLEAR }),
});
var userid;
class MakeitProcess extends React.Component {

    componentWillMount() {
        userid = this.props.match.params.makeitid;
        this.props.onGetUserDetail(userid);
        this.props.onGetItem(userid);
        this.props.onGetKitchenProductPercentage({makeit_id:userid});
        
        this.setState({ isAddQuantity:false,modal: false, isItemEdit: false, itemId: 0, productmodal: false, productviewmodal: false, isProductEdit: false, productId: 0, isLiveList:false,removeProductModal:false,packageInventoryModal:false})
        this.showList = this.showList.bind(this);
        this.toggleItemModal = this.toggleItemModal.bind(this);
        this.toggleItemEditModal = this.toggleItemEditModal.bind(this);
        this.toggleProductModal = this.toggleProductModal.bind(this);
        this.toggleProductEditModal = this.toggleProductEditModal.bind(this);
        this.toggleProductViewModal=this.toggleProductViewModal.bind(this);
        this.togglePackageModal=this.togglePackageModal.bind(this);
        this.itemUpdate = this.itemUpdate.bind(this);
        this.productUpdate = this.productUpdate.bind(this);
        this.productUpdateView=this.productUpdateView.bind(this);
        this.packageUpdate=this.packageUpdate.bind(this);
        this.toggleRemoveAllModal=this.toggleRemoveAllModal.bind(this);
        this.productDeleteCall=this.productDeleteCall.bind(this);
        this.toggleProductRemove=this.toggleProductRemove.bind(this);
        this.onSearch =this.onSearch.bind(this);
        this.addCount=this.addCount.bind(this);
    }
    componentDidUpdate(nextProps, nextState) {
        if (this.props.product_delete) {
            this.props.onGetMenu({ makeit_userid: userid });
            this.props.onClearProduct();
        }

        if(this.props.productMoveToLive&&this.state.isAddQuantity){
            this.setState({isAddQuantity:false});
            this.props.onGetMenu({ makeit_userid: userid });
            this.props.onClearProduct();
        }
    }
    componentWillUnmount(){
        this.props.onPageUnLoad();
    }

    onSearch = e => {
        if (e.keyCode === 13 && e.shiftKey === false) {
          e.preventDefault()
        }
      }

    itemUpdate() {
        this.toggleItemModal();
        this.props.onGetItem(userid);
    }

    productUpdate() {
        this.toggleProductModal();
        this.props.onGetMenu({ makeit_userid: userid });
    }
    packageUpdate() {
        this.togglePackageModal();
        this.props.onGetPackageInventory(userid);
    }

    productUpdateView() {
        this.toggleRemoveAllModal();
        this.props.onGetMenu({ makeit_userid: userid });
        this.props.onGetLiveProduct(userid);
    }
    showList(id) {
        this.props.onSelectMenu(id);
        if (id === 0) this.props.onGetItem(userid);
        else if (id === 1) this.props.onGetMenu({ makeit_userid: userid });
        else if (id === 2) this.props.onGetLiveProduct(userid);
        else if (id === 3) this.props.onGetKitchenProductPercentage({makeit_id:userid});
        else if (id === 4) this.props.onGetPackageInventory(userid);
    }

    toggleItemModal() {
        this.setState(prevState => ({
            modal: !prevState.modal,
            isItemEdit: false
        }));
    }
    toggleItemEditModal(itemId) {
        this.setState(prevState => ({
            modal: !prevState.modal,
            isItemEdit: !prevState.isItemEdit,
            itemId: itemId
        }));
    }

    toggleProductModal() {
        this.setState(prevState => ({
            productmodal: !prevState.productmodal,
            isProductEdit: false
        }));
    }
    togglePackageModal() {
        this.setState(prevState => ({
            packageInventoryModal: !prevState.packageInventoryModal,
            isProductEdit: false
        }));
    }

    toggleRemoveAllModal() {
        this.setState({
            productviewmodal: false
        });
    }

    toggleProductViewModal(productId,islive) {
        this.setState(prevState => ({
            productviewmodal: !prevState.productviewmodal,
            productId: productId,
            isLiveList:islive
        }));
    }

    productDeleteCall(){
        this.props.onProductDelete(this.state.productId);
        this.setState(prevState => ({
            removeProductModal: !prevState.removeProductModal,
        }));
    }

    toggleProductRemove(productId){
        this.setState(prevState => ({
            removeProductModal: !prevState.removeProductModal,
            productId: productId,
        }));
        
    }

    toggleProductEditModal(productId) {
        this.setState(prevState => ({
            productmodal: !prevState.productmodal,
            isProductEdit: !prevState.isProductEdit,
            productId: productId
        }));
    }

    getTableList = (sub_menu_id) => {
        const product_percentage = this.props.product_percentage_list || [];
        return sub_menu_id === 0 ? this.props.makeit_Item_list : sub_menu_id === 1 ? this.props.makeit_Product_list :  sub_menu_id === 2 ?this.props.makeit_Product_Live_list:sub_menu_id === 3 ?product_percentage:this.props.packageInventorylist;
    }

    getEditModal = (sub_menu_id) => {
        return sub_menu_id === 0 ? this.toggleItemEditModal : sub_menu_id === 1 ? this.toggleProductEditModal:this.toggleProductViewModal;
    }

    addCount(item) {
        this.setState({isAddQuantity:true});
        var userid = this.props.match.params.makeitid;
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
    

    render() {
        const sub_menu_id = this.props.sub_menu_id;
        const makeitDetail = this.props.makeit_detail;
        const percentage = (!this.props.kitchen_percentage||this.props.kitchen_percentage==='0.00'||this.props.kitchen_percentage==='NaN')?0:this.props.kitchen_percentage;
        // const makeit_Item_list = this.props.makeit_Item_list;
        //const makeit_Product_list = this.props.makeit_Product_list;
        return (
            <div>
                <div className='makeit-process-header'>
                    <Row className='pd-8'>
                        <Col><div className='title'>Makeit Process</div></Col>
                        <Row className='action'>
                            {/* <Col><SearchInput onSearch={this.onSearch} /></Col> */}
                            <Col><Button className="mr-r-10" onClick={history.goBack}>Back</Button></Col>
                        </Row>
                    </Row>
                </div>
                <Row className='pd-8'>
                    <Col lg='2'>
                        <Card>
                            <CardHeader>
                                <h5>{makeitDetail.brandname}</h5>
                                <div className='font-size-10 font-weight-normal'>succession rate - <span className='font-size-12 font-weight-bold'>{percentage} %</span></div>
                            </CardHeader>
                            <CardBody className='makeit-process-submenu pd-0'>
                                <MakeitSubmenu menu={this.props.subMenu} showList={this.showList} />
                            </CardBody>
                        </Card>
                    </Col>
                    <Col lg='9'>
                        <Card>
                            <CardHeader>
                                <h5>{this.props.sub_menu_name}</h5>
                            </CardHeader>
                            <CardBody className='makeit-process-card-body pd-0'>
                                <Submenulist sub_menu_id={sub_menu_id} makeit_list={this.getTableList(sub_menu_id)} itemEdit={this.getEditModal(sub_menu_id)} itemView={this.toggleProductViewModal} productDelete={this.toggleProductRemove} addCount={this.addCount}/>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col lg='1'>
                        <FabButton sub_menu_id={sub_menu_id} toggleModal={sub_menu_id === 0 ? this.toggleItemModal :sub_menu_id === 4 ?this.togglePackageModal:this.toggleProductModal} />
                    </Col>
                </Row>

                <Modal isOpen={this.state.modal} toggle={this.toggleItemModal} className={this.props.className} backdrop={'static'}>
                    <ModalHeader toggle={this.toggleItemModal}>{this.props.sub_menu_name}</ModalHeader>
                    <ModalBody>
                        <ItemInventoryForm userId={userid} isEdit={this.state.isItemEdit} update={this.itemUpdate} itemId={this.state.itemId}></ItemInventoryForm>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.packageInventoryModal} toggle={this.togglePackageModal} className={this.props.className} backdrop={'static'}>
                    <ModalHeader toggle={this.togglePackageModal}>{this.props.sub_menu_name}</ModalHeader>
                    <ModalBody>
                       <PackageInventoryForm userId={userid} update={this.packageUpdate} productId={this.state.productId}></PackageInventoryForm>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.productmodal} toggle={this.toggleProductModal} className={this.props.className} backdrop={'static'}>
                    <ModalHeader toggle={this.toggleProductModal}>{this.props.sub_menu_name}</ModalHeader>
                    <ModalBody>
                        <ProductForm userId={userid} isEdit={this.state.isProductEdit} update={this.productUpdate} productId={this.state.productId} virtualkey={makeitDetail.virtualkey} makeit_type={makeitDetail.makeit_type}></ProductForm>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.productviewmodal} toggle={this.toggleProductViewModal} className={this.props.className} backdrop={true}>
                    <ModalHeader toggle={this.toggleProductViewModal}>{this.props.sub_menu_name}</ModalHeader>
                    <ModalBody>
                        <ProductDetail userId={userid} update={this.productUpdateView} productId={this.state.productId} isLiveList={this.state.isLiveList}></ProductDetail>
                    </ModalBody>
                </Modal>


                <Modal isOpen={this.state.removeProductModal} toggle={this.toggleProductRemove} className='add_live_modal' backdrop={'static'}>
                    <ModalHeader>Confirm Message</ModalHeader>
                    <ModalBody>
                        Are you sure you want to delete this Product?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary"  onClick={this.productDeleteCall}>Yes</Button>{' '}
                        <Button color="secondary" onClick={this.toggleProductRemove}>NO</Button>
                    </ModalFooter>
                </Modal>

            </div>
        );
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(MakeitProcess);