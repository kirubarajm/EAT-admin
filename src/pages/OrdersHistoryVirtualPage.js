import React from 'react';
import { ORDERS_ALL_LIST, ORDERS_FILTER_LIST, ORDER_STATUS_UPDATE,ORDER_STATUS_CANCEL,ORDERS_STATUS_FILTER_LIST,ORDERS_PAGE_ONLOAD, MAKEIT_GET_HUB, MAKEIT_GET_HUB_SELEDED } from '../constants/actionTypes'
import { connect } from 'react-redux'
import AxiosRequest from '../AxiosRequest'
import OrdersHistoryTable from '../components/OrdersHistoryTable';
import { getLoginDetail,getOrderNextStatus} from "../utils/ConstantFunction";
import { ADMIN_LOGIN } from '../utils/constant';

const defultPage=1;
const mapStateToProps = state => ({ ...state.orders,  makeithub:state.common.makeithub, });

const mapDispatchToProps = dispatch => ({
    onGetOrders: (data) =>
        dispatch({ type: ORDERS_ALL_LIST, payload: AxiosRequest.Eat.getvOrders(data),currentpage:'today' }),
    onGetOrdersH: (data) =>
        dispatch({ type: ORDERS_ALL_LIST, payload: AxiosRequest.Eat.getvOrdersHistory(data),currentpage:'history' }),
    onSetFilter: (search) =>
        dispatch({ type: ORDERS_FILTER_LIST, orderType:1, search }),
    onOrderStatusFilter: (orderstatus) =>
        dispatch({ type: ORDERS_STATUS_FILTER_LIST, orderstatus }),
    onGetMovieitHub: () =>
        dispatch({ type: MAKEIT_GET_HUB, payload: AxiosRequest.Master.getMovieitHub()}),
    onSelectedMovieitHub: (item) =>
        dispatch({ type: MAKEIT_GET_HUB_SELEDED, item}),
        onOrderChangeStatus: data =>
    dispatch({
      type: ORDER_STATUS_UPDATE,
      payload: AxiosRequest.MakeitProcess.orderStatusUpdate(data)
    }),
  onOrderCancel: data =>
    dispatch({
      type: ORDER_STATUS_CANCEL,
      payload: AxiosRequest.MakeitProcess.orderCancel(data)
    }),
    onLoad:()=>
        dispatch({ type: ORDERS_PAGE_ONLOAD}),
});
var loginType=0;
let today='today';
let history='history';
var loginData;
var makeithub_id=1;
var filter;
class OrdersHistoryVirtualPage extends React.Component {
    intervalID;
    second=5;
    constructor(props) {
        super(props);
        loginData=null;
       this.state = {
            selectedPage: 1,
            dropdownOpen:false,
            dropdownvisible:false
        };
        this.handleSelected = this.handleSelected.bind(this);
        this.dropdowntoggle = this.dropdowntoggle.bind(this);
        this.orderStatusUpdate =this.orderStatusUpdate.bind(this);
        this.orderCancel=this.orderCancel.bind(this);
       this.selectHub=this.selectHub.bind(this);
    }
    
    componentWillMount() {
        this.props.onLoad();

        if(!loginData) {
            loginData=getLoginDetail();
            loginType = loginData.logindetail.user_roleid||2;
            makeithub_id = loginData.logindetail.makeit_hubid||1;
        }
        
        if(loginType===ADMIN_LOGIN) {
            this.setState({dropdownvisible:true});
            if(!this.props.makeithub||this.props.makeithub.length===0)
                this.props.onGetMovieitHub();
            else{ 
                this.selectHub(this.props.makeithub[0]); 
            }
        }
        
        this.onFiltersApply('',defultPage,makeithub_id,this.props.orderstatus);

        

        this.filterTable = (filterSelected) => ev => {
            this.props.onFilterOrders(filterSelected);
        }

        this.onSearch = e => {
                this.props.onSetFilter(e.target.value);
                this.onFiltersApply(e.target.value,defultPage,makeithub_id,this.props.orderstatus);
        }

        this.filter = (id) => ev => {
            ev.preventDefault();
            //this.props.onSetFilter(this.props.search);
            this.onFiltersApply(this.props.search,defultPage,makeithub_id,this.props.orderstatus);
        }

        this.filterOrders = (orderstatus) => ev => {
            ev.preventDefault();
            this.props.onOrderStatusFilter(orderstatus);
            this.onFiltersApply(this.props.search,defultPage,makeithub_id,orderstatus);
        }

    }

    componentDidUpdate(nextProps, nextState) {
        if(window.location.pathname.includes('/history')&&this.props.currentpage===today){
            this.onFiltersApply('',defultPage,makeithub_id,this.props.orderstatus);
        }else if(window.location.pathname.includes('/today')&&this.props.currentpage===history){
            this.onFiltersApply('',defultPage,makeithub_id,this.props.orderstatus);
        }
        if(this.props.makeithub&&this.props.makeithub.length!==0&&!this.props.selectedHub&&loginType===1){
            this.selectHub(this.props.makeithub[0]);
        } 
        if (this.props.updateStatus) {
            this.getData();
          }
    }
    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    
    getData(){
        if(this.props.currentpage===today&&filter)
        this.props.onGetOrders(filter);
      }

    componentDidMount() {
        if(this.props.currentpage===today)
        this.intervalID = setInterval(this.getData.bind(this), this.second*1000);
      }

    dropdowntoggle(){
        this.setState({dropdownOpen: !this.state.dropdownOpen});
    }

    selectHub(item){
        this.props.onSelectedMovieitHub(item);
        makeithub_id=item.makeithub_id;
        this.onFiltersApply(this.props.search,defultPage,makeithub_id,this.props.orderstatus);
    }

    handleSelected(selectedPage) {
        //this.props.onSetFilter(this.props.search);
        this.onFiltersApply(this.props.search,selectedPage,makeithub_id,this.props.orderstatus);
    }
    
    orderStatusUpdate(orderStatus,orderid) {
        var nextStatus = getOrderNextStatus(orderStatus);
        this.props.onOrderChangeStatus({
          orderstatus: nextStatus,
          orderid: orderid
        });
      }
    
      orderCancel(orderid) {
        this.props.onOrderCancel({
          orderid: orderid
        });
      }

    onFiltersApply(search,page,makeithub_id,orderstatus) {
        filter = {search: search ,page:page,makeithub_id:makeithub_id,orderstatus:orderstatus}
        this.props.onGetOrdersH(filter);
    }

    daterangSelect(event, picker) {
        let startDate = picker.startDate.format('DD-MM-YYYY');
        let endDate = picker.endDate.format('DD-MM-YYYY');
        console.log("picker---startDate--" + startDate + "---- endDate---" + endDate);
    }
    

    render() {
        
        return (
            <div className="pd-8">
                <OrdersHistoryTable title='Virtual Orders' disableTabs={true} propsData={this.props} makeithub={this.props.makeithub} 
                dropdownOpen={this.state.dropdownOpen} dropdowntoggle={this.dropdowntoggle} selectHub={this.selectHub} selectedHub={this.props.selectedHub}
                filter={this.filter} onSearch={this.onSearch}  dropdownvisible={this.state.dropdownvisible} orderStatusUpdate={this.orderStatusUpdate} orderCancel={this.orderCancel}
                handleSelected={this.handleSelected} filterOrders={this.filterOrders} orderstatus={this.props.orderstatus} currentpage={this.props.currentpage} searchvalue={this.props.search}/>
            </div>
        );
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(OrdersHistoryVirtualPage);