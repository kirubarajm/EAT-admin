import React , { useState, useEffect }  from 'react';
import { ORDERS_ALL_LIST, ORDERS_FILTER_LIST, ORDER_STATUS_UPDATE,ORDER_STATUS_CANCEL,ORDERS_STATUS_FILTER_LIST,ORDERS_PAGE_ONLOAD, MAKEIT_GET_HUB, MAKEIT_GET_HUB_SELEDED } from '../constants/actionTypes'
import { connect } from 'react-redux'
import AxiosRequest from '../AxiosRequest'
import OrdersTable from '../components/OrdersTable';
import { getLoginDetail,getOrderNextStatus} from "../utils/ConstantFunction";
import soundFile from "../assets/alert.wav"
import { ORDER_CANCEL_REASON, ADMIN_LOGIN, SUPER_ADMIN_LOGIN } from "../utils/constant";
import { Field, reduxForm, reset } from "redux-form";
import { required, minLength5, maxLength160 } from "../utils/Validation";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody
  } from "reactstrap";
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

const InputField = ({
    input,
    label,
    type,
    meta: { touched, error, warning },
    ...custom
    //
  }) => {
    return (
      <div>
        <div>
          <textarea
            {...input}
            placeholder={label}
            type={type}
            autoComplete="off"
            cols={custom.cols}
            rows={custom.rows}
          />
          <span style={{ flex: "0", WebkitFlex: "0", height: "20px" }}>
            {touched &&
              ((error && <span>{error}</span>) ||
                (warning && <span>{warning}</span>))}
          </span>
        </div>
      </div>
    );
  };

var loginType=0;
let today='today';
let history='history';
var orderType=today;
var loginData;
var makeithub_id=1;
var filter;
var cancel_order_id=0;
var defultStopCount=6;
class OrdersVirtualPage extends React.Component {
    intervalID;
    second=10;
    constructor(props) {
        super(props);
        loginData=null;
       this.state = {
            selectedPage: 1,
            dropdownOpen:false,
            dropdownvisible:false,
            isplaying:false,
            stopcount:6
        };
        this.handleSelected = this.handleSelected.bind(this);
        this.dropdowntoggle = this.dropdowntoggle.bind(this);
        this.orderStatusUpdate =this.orderStatusUpdate.bind(this);
        this.orderCancel=this.orderCancel.bind(this);
       this.selectHub=this.selectHub.bind(this);
        this.onPlay = this.onPlay.bind(this);
        this.onPasue = this.onPasue.bind(this);
    //     this.sound = new Audio(soundFile);
    //    this.sound.addEventListener('ended', this.onPlay, false);
    }
    
    componentWillMount() {
        this.props.onLoad();
        this.toggleCancelPopup = this.toggleCancelPopup.bind(this);
        this.orederCancelConfirm = this.orederCancelConfirm.bind(this);
        this.setState({ orderCancelModal: false });
        if(!loginData) {
            loginData=getLoginDetail();
            loginType = loginData.logindetail.user_roleid||2;
            makeithub_id = loginData.logindetail.makeit_hubid||1;
        }
        
        if(loginType===ADMIN_LOGIN||loginType===SUPER_ADMIN_LOGIN) {
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
            //if (e.keyCode === 13 && e.shiftKey === false) {
               // e.preventDefault();
                this.props.onSetFilter(e.target.value);
                this.onFiltersApply(e.target.value,defultPage,makeithub_id,this.props.orderstatus);
            //}
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

    toggleCancelPopup() {
        this.setState(prevState => ({
            orderCancelModal: !prevState.orderCancelModal
        }));
      }
    
      orederCancelConfirm(value) {
        // this.props.onReAssignOrder({
        //   orderid: this.props.selectedItem.orderid,
        //   cancel_reason: value.reason
        // });
        this.props.onOrderCancel({
          orderid: cancel_order_id,
          cancel_reason: value.reason
        });
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
            if(this.state.orderCancelModal) {
                this.props.dispatch(reset(ORDER_CANCEL_REASON));
                this.setState(prevState => ({
                    orderCancelModal: !prevState.orderCancelModal
                }));
              }
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
        //this.onPasue();
      }
    
      orderCancel(orderid) {
        cancel_order_id=orderid;
        this.toggleCancelPopup();
        // this.props.onOrderCancel({
        //   orderid: orderid
        // });
       
      }

    onFiltersApply(search,page,makeithub_id,orderstatus) {
        filter = {search: search ,page:page,makeithub_id:makeithub_id,orderstatus:orderstatus}
        orderType = this.props.match.params.type;
        if(orderType===history)
        this.props.onGetOrdersH(filter);
        else this.props.onGetOrders(filter);
    }

    daterangSelect(event, picker) {
        let startDate = picker.startDate.format('DD-MM-YYYY');
        let endDate = picker.endDate.format('DD-MM-YYYY');
        console.log("picker---startDate--" + startDate + "---- endDate---" + endDate);
    }
    onPlay(){
        if(defultStopCount!==this.state.stopcount){
            this.setState({stopcount:this.state.stopcount+1});
            this.setState({isplaying: false});
            return;
        }
       if(!this.state.isplaying){
            this.sound.play();
            this.setState({isplaying: true});
        }
    }

    onPasue(){
        if(this.state.isplaying){
            this.sound.pause();
            this.setState({isplaying: false,stopcount:0});
        }
    }



    render() {
        const handleSubmit = this.props.handleSubmit;
        const pristine = this.props.pristine;
        const submitting = this.props.submitting;

        const isAlert = this.props.isAlert;
        const isAlertCount = this.props.isAlertCount;
       
        //else this.onPasue();
        return (
            <div className="pd-8">
                <OrdersTable title='Virtual Orders' disableTabs={true} propsData={this.props} makeithub={this.props.makeithub} 
                dropdownOpen={this.state.dropdownOpen} dropdowntoggle={this.dropdowntoggle} selectHub={this.selectHub} selectedHub={this.props.selectedHub}
                filter={this.filter} onSearch={this.onSearch}  dropdownvisible={this.state.dropdownvisible} orderStatusUpdate={this.orderStatusUpdate} orderCancel={this.orderCancel}
                handleSelected={this.handleSelected} filterOrders={this.filterOrders} orderstatus={this.props.orderstatus} currentpage={this.props.currentpage} isPlayingSound={this.state.isplaying} onPasue={this.onPasue} searchvalue={this.props.search}/>
            
            <Modal
          isOpen={this.state.orderCancelModal}
          toggle={this.toggleCancelPopup}
          className={this.props.className}
          backdrop={true}
        >
          <ModalHeader toggle={this.toggleCancelPopup}>
            Cancel Reason
          </ModalHeader>
          <ModalBody>
            <form
              onSubmit={handleSubmit(this.orederCancelConfirm)}
              className="product_form"
            >
              <Field lg={6} md={12} sm={4} xl={4} xs={12}
                name="reason"
                type="text"
                component={InputField}
                validate={[required, minLength5, maxLength160]}
                cols="10"
                rows="3"
              />

              <div className="float-right">
                <Button type="submit" disabled={pristine || submitting}>
                  Submit
                </Button>
              </div>
            </form>
          </ModalBody>
        </Modal>

            </div>
        );
    };
}
OrdersVirtualPage = reduxForm({
    form: ORDER_CANCEL_REASON // a unique identifier for this form
  })(OrdersVirtualPage);
export default connect(mapStateToProps, mapDispatchToProps)(OrdersVirtualPage);