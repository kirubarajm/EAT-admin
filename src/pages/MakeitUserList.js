import React from "react";
import AxiosRequest from "../AxiosRequest";
import SearchInput from "../components/SearchInput";
import {
  MAKEIT_USERS_LIST,
  MAKEIT_USERS_FILTER,
  MAKEIT_USERS_SERVICE,
  MAKEIT_USERS_DELETE
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
  UncontrolledTooltip 
} from "reactstrap";
import { FaListAlt,FaTrashAlt } from "react-icons/fa";
import SwitchButton from "../components/SwitchButton";

function ActionButton(props) {
  var item = props.item;
  if (item.verified_status === "1") {
    return (
      <Row>
        <Col lg="2">
          <Link to={`/viewmakeituser/${item.userid}`} className="preview-link">
            <i className="fa fa-external-link-alt" />
          </Link>
        </Col>
        <Col lg="2">
          <Link to={"/makeitproduct/" + item.userid} className="preview-link" >
            <div className='mr-t-3'>
              <FaListAlt size={18}/>
            </div>
          </Link>
        </Col>
       {/*  <Col lg="2" hidden={item.virtualkey==1}>
            <FaTrashAlt  size={15} color={'grey'} className='faq-question'/>
        </Col>
        <Col lg="2" hidden={item.virtualkey!=1}>
            <FaTrashAlt onClick={()=>props.handleDeleteClick(item)} size={15} color={'red'} className='faq-question'/>
        </Col> */}
      </Row>
    );
  }
  return (
    <Row>
      <Col lg="2">
        <Link to={`/viewmakeituser/${item.userid}`} className="preview-link">
          <i className="fa fa-external-link-alt" />
        </Link>
      </Col>
      <Col lg="2">
      <span>
        <div id={'Tooltip-' + item.userid}><FaListAlt color="grey" /></div>
        <UncontrolledTooltip placement="top" target={'Tooltip-' + item.userid}>
        kitchen not approved. 
      </UncontrolledTooltip>
        </span>
      </Col>
      {/* <Col lg="2">
            <FaTrashAlt size={15} color={'grey'} className='faq-question'/>
        </Col> */}
    </Row>
  );
}
const mapStateToProps = state => ({ ...state.makeituserlist });

const mapDispatchToProps = dispatch => ({
  onGetUser: data =>
    dispatch({
      type: MAKEIT_USERS_LIST,
      payload: AxiosRequest.Makeit.getAllWithPercentage(data)
    }),
  onSetFilter: (listtype, search,page) =>
    dispatch({ type: MAKEIT_USERS_FILTER, listtype, search,page }),
  onUnServiceable: (data) =>
    dispatch({ type: MAKEIT_USERS_SERVICE, payload: AxiosRequest.Makeit.unserviceable(data)}),
  onDelete: (data) =>
    dispatch({ type: MAKEIT_USERS_DELETE, payload: AxiosRequest.Makeit.onMakeitdelete(data)})
});

const defultPage=1;


class MakeitUserList extends React.Component {
  constructor() {
    super();
    this.state = { checked: false,isDeleteProgress:false,removeKitchen:false,removeKitchenItem:false};
    this.handleSwitchChange = this.handleSwitchChange.bind(this);
    this.handleSelected = this.handleSelected.bind(this);
    this.handleDeleteClick=this.handleDeleteClick.bind(this);
    this.confirmToDelete=this.confirmToDelete.bind(this);
    this.deleteToggle=this.deleteToggle.bind(this);
  }

  handleSelected(selectedPage) {
    this.props.onSetFilter(this.props.listtype, this.props.search,selectedPage);
    this.onFiltersApply(this.props.listtype, this.props.search,selectedPage);
}
    componentDidMount(){
      this.setState({ ispagenation:true });
    }

  componentWillMount() {
    this.setState({ ispagenation:false });
    this.props.onSetFilter(this.props.listtype, this.props.search,this.props.page);
    this.onFiltersApply(this.props.listtype, this.props.search,this.props.page);
    this.onSearch = e => {
      if (e.keyCode === 13 && e.shiftKey === false) {
        e.preventDefault();
        this.props.onSetFilter(this.props.listtype, e.target.value,defultPage);
        this.onFiltersApply(this.props.listtype, e.target.value,defultPage);
      }else if(e.target.value===''){
        e.preventDefault();
        this.props.onSetFilter(this.props.listtype, e.target.value,defultPage);
        this.onFiltersApply(this.props.listtype, e.target.value,defultPage);
      }
    };

    this.filter = id => ev => {
      ev.preventDefault();
      this.props.onSetFilter(id, this.props.search,defultPage);
      this.onFiltersApply(id, this.props.search,defultPage);
    };
  }
  onFiltersApply(vId, search,page) {
    var virtualkey = vId === -1 ? "all" : vId;
    var filter = {
      virtualkey: virtualkey,
      search: search,
      page:page,
      appointment_status: "all"
    };
    this.props.onGetUser(filter);
  }
  componentDidUpdate(nextProps, nextState) {
    if(this.props.unServiceable&&this.state.checked){
      this.setState({ checked:false });
      this.onFiltersApply(this.props.listtype, this.props.search);
    }

    if(this.props.makeitDelete&&this.state.isDeleteProgress){
      this.setState({ isDeleteProgress:false,removeKitchenItem:false });
      this.deleteToggle();
      this.onFiltersApply(this.props.listtype, this.props.search);
    }
  }
  
  handleSwitchChange(item) {
    console.log("--item--",item);
    var data={userid:item.userid,
    unservicable:item.unservicable?0:1};
    this.setState({ checked:true });
    this.props.onUnServiceable(data);
  }

  deleteToggle(){
    this.setState(prevState => ({
      removeKitchen: !prevState.removeKitchen
    }));
  }

  handleDeleteClick(item){
    this.setState({removeKitchenItem:item});
    this.deleteToggle();
  }

  confirmToDelete(){
    if(!this.state.removeKitchenItem) return
    this.setState({ isDeleteProgress:true });
    var data={userid:this.state.removeKitchenItem.userid};
    this.props.onDelete(data);
  }
  
  render() {
    const makeituserlist = this.props.makeituserlist || [];
    return (
      <div className="pd-8">
        <Card>
          <CardHeader>
            MAKEIT USERS DETAILS
            <Row className="float-right">
              <ButtonGroup size="sm">
                <Button
                  color="primary"
                  onClick={this.filter(-1)}
                  active={this.props.listtype === -1}
                >
                  All
                </Button>
                <Button
                  color="primary"
                  onClick={this.filter(0)}
                  active={this.props.listtype === 0}
                >
                  Real User
                </Button>
                <Button
                  color="primary"
                  onClick={this.filter(1)}
                  active={this.props.listtype === 1}
                >
                  Virtual User
                </Button>
              </ButtonGroup>
                
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
                  <th>Id</th>
                  <th>Owner Name</th>
                  <th>Brand Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Successionrate %</th>
                  <th>Service</th>
                  {/* <th>status</th> */}
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {makeituserlist.map((item, i) => (
                  <tr key={i}>
                    <th scope="row">{i + 1}</th>
                    <th scope="row">{item.userid}</th>
                    <td>{item.name}</td>
                    <td>{item.brandname}</td>
                    <td>{item.email}</td>
                    <td>{item.phoneno}</td>
                    <td>{(!item.kitchen_percentage||item.kitchen_percentage==='0.00'||item.kitchen_percentage==='NaN')?0:item.kitchen_percentage}</td>
                    <td><SwitchButton handleSwitchChange={this.handleSwitchChange} item={item}/></td>
                    <td>
                      <ActionButton item={item} handleDeleteClick={this.handleDeleteClick}/>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
          <CardFooter hidden={this.props.totalKitchenCount<this.props.kitchenLimit && !this.state.ispagenation}>
                    <div className="float-right">
                        <PaginationComponent
                            totalItems={this.props.totalKitchenCount}
                            pageSize={this.props.kitchenLimit}
                            onSelect={this.handleSelected}
                            maxPaginationNumbers={'5'}
                            activePage={this.props.page}/>
                        </div>
                    </CardFooter>
        </Card>
        
        <Modal isOpen={this.state.removeKitchen} toggle={this.deleteToggle} className='add_live_modal' backdrop={'static'}>
                    <ModalHeader>Confirm Message</ModalHeader>
                    <ModalBody>
                        Are you sure you want to delete this Kitchen?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary"  onClick={this.confirmToDelete}>Yes</Button>{' '}
                        <Button color="secondary" onClick={this.deleteToggle}>NO</Button>
                    </ModalFooter>
                </Modal>
      </div>
    );
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MakeitUserList);
