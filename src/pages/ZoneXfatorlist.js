import React from "react";
import { connect } from "react-redux";
import AxiosRequest from '../AxiosRequest';
import {FaEdit} from 'react-icons/fa'
import {
  Card,
  CardBody,
  Table,
  CardHeader, Modal, ModalHeader, ModalBody 
} from "reactstrap";
import { ZONE_XFACTOR_LIST } from "../constants/actionTypes";
import ZoneForm from "../components/ZoneForm";

const mapStateToProps = state => ({ ...state.zonexfactorlist });

const mapDispatchToProps = dispatch => ({
    onGetALLZONE: (data) =>
        dispatch({ type: ZONE_XFACTOR_LIST, payload: AxiosRequest.Zone.getAllZone(data) })
});
class ZoneXfatorlist extends React.Component {
  constructor() {
    super();
  }

  componentWillMount() {
    this.zoneClick=this.zoneClick.bind(this);
    this.toggleZoneModal=this.toggleZoneModal.bind(this);
    this.xfactorUpdate=this.xfactorUpdate.bind(this);
    this.props.onGetALLZONE({boundaries:1});
    this.setState({zoneModal:false,zoneid:0,isEdit:false});
  }
  
  componentDidUpdate(nextProps, nextState) {}
  toggleZoneModal() {
    this.setState(prevState => ({
        zoneModal: !prevState.zoneModal,
    }));
  }
  addPackage(){
    this.setState({zoneid:0,isEdit:false});
    this.toggleZoneModal();
  }
  xfactorUpdate() {
   this.toggleZoneModal();
   this.props.onGetALLZONE({boundaries:1});
 }

 zoneClick= (item)=>{
  this.setState({zoneItem:item,zoneid:item.id,isEdit:true});
  this.toggleZoneModal();
}

  render() {
      const zonedata= this.props.zonedata|| []
    return (
      <div className="pd-8">
      <Card>
        <CardHeader>
          ZONE Xfactors
        </CardHeader>
        <CardBody className="scrollbar pd-0">
        <Table>
          <thead>
            <tr>
              <th>No</th>
              <th>Zone ID</th>
              <th>Zone Name</th>
              <th>Xfactor</th>
              <th>Zone Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {zonedata.map((item, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <th scope="row">{item.id}</th>
                <td>{item.Zonename}</td>
                <td>{item.xfactor}</td>
                <td>{item.zone_status===2?'Dunzo':'EAT'}</td>
                <td> <FaEdit className='mr-r-10' onClick={()=>this.zoneClick(item)}/></td>
              </tr>
            ))}
          </tbody>
        </Table>
        </CardBody>
                <Modal isOpen={this.state.zoneModal} toggle={this.toggleZoneModal} className={this.props.className} backdrop={'static'}>
                    <ModalHeader toggle={this.toggleZoneModal}>{this.state.zoneItem?this.state.zoneItem.Zonename:'Zone'}</ModalHeader>
                    <ModalBody>
                       <ZoneForm  item={this.state.zoneItem} update={this.xfactorUpdate} zoneid={this.state.zoneid} isEdit={this.state.isEdit}></ZoneForm>
                    </ModalBody>
                </Modal>
        </Card>
      </div>
    );
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(ZoneXfatorlist)