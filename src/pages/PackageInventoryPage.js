import React from "react";
import Moment from "moment";
import { connect } from "react-redux";
import AxiosRequest from '../AxiosRequest';
import {FaEdit} from 'react-icons/fa'
import PaginationComponent from "react-reactstrap-pagination";
import {
  Card,
  CardBody,
  Table,
  Row,
  Col,
  CardHeader,CardFooter,
  Button, Modal, ModalHeader, ModalBody ,ModalFooter
} from "reactstrap";
import { IoIosAdd } from "react-icons/io";
import { MAKEIT_PACKAGE_INVENTORY_ROOT_LIST_FILTER, MAKEIT_PACKAGE_INVENTORY_ROOT_LIST } from "../constants/actionTypes";
import SearchInput from "../components/SearchInput";
import PackageInventoryForm from "../components/PackageInventoryForm";

const mapStateToProps = state => ({ ...state.packageinventorylist });

const mapDispatchToProps = dispatch => ({
    onGetALLMakeitPackageInventory: (data) =>
        dispatch({ type: MAKEIT_PACKAGE_INVENTORY_ROOT_LIST, payload: AxiosRequest.PackageInventory.getPackageInvetoryAllList(data) }),
        onSetFilter: (search, page) =>
        dispatch({ type: MAKEIT_PACKAGE_INVENTORY_ROOT_LIST_FILTER, search, page })
});

function lessThanOneDay(date) {
  if (!date) return false;
  const startDate = Moment(date);
  const timeEnd = Moment(new Date());
  const diff = timeEnd.diff(startDate);
  const diffDuration = Moment.duration(diff);
  //console.log("Days:", diffDuration.days());
  //console.log("Hours:", diffDuration.hours());
  return diffDuration.days() > 0 || diffDuration.hours() > 23;
  //return Moment.unix(date).isAfter(Moment().subtract(24, 'hours'));
}
function InventoryEdit(props) {
    if (lessThanOneDay(props.created_at)) return <div />;
    else
      return (
        <Row>
          <Col className='faq-question'>
          <FaEdit className='mr-r-10' onClick={props.editClick}/>
          </Col>
        </Row>
      );
}

const defultPage = 1;
class PackageInventoryPage extends React.Component {
  constructor() {
    super();
  }

  componentWillMount() {
    this.togglePackageModal=this.togglePackageModal.bind(this);
    this.addPackage=this.addPackage.bind(this);
    this.packageUpdate=this.packageUpdate.bind(this);
    this.editClick=this.editClick.bind(this);
    this.handleSelected=this.handleSelected.bind(this);
    this.setState({packageInventoryModal:false,inventoryid:0,isEdit:false})
    this.props.onSetFilter(this.props.search, this.props.page);
    this.onFiltersApply(this.props.search, this.props.page);
    this.onSearch = e => {
      this.props.onSetFilter(e.target.value, defultPage);
      this.onFiltersApply(e.target.value, defultPage);
    };
  }
  onFiltersApply(search, page) {
    var filter = {
      search: search,
      page: page
    };
    this.props.onGetALLMakeitPackageInventory(filter);
  }
  componentDidUpdate(nextProps, nextState) {}
  togglePackageModal() {
    this.setState(prevState => ({
        packageInventoryModal: !prevState.packageInventoryModal,
        isProductEdit: false
    }));
  }
  addPackage(){
    this.setState({inventoryid:0,isEdit:false});
    this.togglePackageModal();
  }
packageUpdate() {
  this.togglePackageModal();
  this.onFiltersApply(this.props.search, this.props.page);
}

editClick= (item)=>{
  console.log("item-->",item);
  this.setState({inventoryid:item.id,isEdit:true});
  this.togglePackageModal();
}

handleSelected =(page)=>{
  this.props.onSetFilter(this.props.search, page);
  this.onFiltersApply(this.props.search, page);
}


  render() {
      const packageInventoryarray= this.props.packageInventoryarray|| []
    return (
      <div className="pd-8">
      <Card>
        <CardHeader>
          Package Inventory
          <Row className="float-right">
            <Col>
              <SearchInput
                onSearch={this.onSearch}
                value={this.props.search}
              />
            </Col>
            <Col>
                <Button color="primary" onClick={this.addPackage}>
                  <IoIosAdd size={25} />
                </Button>
                </Col>
          </Row>
        </CardHeader>
        <CardBody className="card-footer-with-scroll pd-0">
        <Table>
          <thead>
            <tr>
              <th>No</th>
              <th>Makeit-ID</th>
              <th>Kitchen Name</th>
              <th>Package Name</th>
              <th>Date of Inventory</th>
              <th>Count</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {packageInventoryarray.map((item, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <th scope="row">{item.userid}</th>
                <td>{item.brandname}</td>
                <td>{item.pname}</td>
                <td>{Moment(item.created_at).format("DD-MMM-YYYY/hh:mm a")}</td>
                <td>{item.count}</td>
                <td><InventoryEdit created_at={item.created_at} editClick={()=>this.editClick(item)} ></InventoryEdit></td>
              </tr>
            ))}
          </tbody>
        </Table>
        </CardBody>
         <CardFooter
            hidden={this.props.totalInventoryArrayCount < this.props.pageLimt}
          >
             <div className="float-right">
              <PaginationComponent
                totalItems={this.props.totalInventoryArrayCount}
                pageSize={this.props.pageLimt}
                onSelect={this.handleSelected}
                activePage={this.props.page}
              />
            </div> 
          </CardFooter>

                <Modal isOpen={this.state.packageInventoryModal} toggle={this.togglePackageModal} className={this.props.className} backdrop={'static'}>
                    <ModalHeader toggle={this.togglePackageModal}>Package Inventory</ModalHeader>
                    <ModalBody>
                       <PackageInventoryForm  update={this.packageUpdate} inventoryid={this.state.inventoryid} isEdit={this.state.isEdit}></PackageInventoryForm>
                    </ModalBody>
                </Modal>
        </Card>
      </div>
    );
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(PackageInventoryPage)