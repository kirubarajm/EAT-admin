import React from "react";
import AxiosRequest from "../AxiosRequest";
import { connect } from "react-redux";
import {
  Card,
  CardBody,
  CardHeader,
  Table,
  Row,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  Button
} from "reactstrap";
import { PACKAGE_BOX_LIST } from "../constants/actionTypes";
import { IoIosAdd } from "react-icons/io";
import PackageBoxForm from "../components/PackageBoxForm";
import {FaEdit} from 'react-icons/fa'

const mapStateToProps = state => ({
  ...state.packageboxlist
});

const mapDispatchToProps = dispatch => ({
  onGetPackage: () =>
    dispatch({
      type: PACKAGE_BOX_LIST,
      payload: AxiosRequest.PackageBox.getTypesofPackageList()
    })
});

class PackageboxlistPage extends React.Component {
  componentWillMount() {
    //if (this.props.cusinieList) this.props.onGetCuisine();
    this.setState({boxingmodal:false,
        isPackageEdit:false,
        packageId:0
    });
    this.toggleBoxingModal=this.toggleBoxingModal.bind(this);
    this.editClick=this.editClick.bind(this);
    this.props.onGetPackage();
  } 

  toggleBoxingModal=()=>{
    this.setState(prevState => ({
        boxingmodal: !prevState.boxingmodal,
        isPackageEdit: false,
    }));
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

  render() {
    const packageBox = this.props.packageBoxList || [];
    return (
      <div className="pd-8">
        <Card>
          <CardHeader>
            Packaging Box
            <div className="float-right">
                <Button color="primary" onClick={this.toggleBoxingModal}>
                  <IoIosAdd size={25} />
                </Button>
            </div>
          </CardHeader>
          <CardBody className="scrollbar pd-0">
            <Table>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Package Name</th>
                  <th>Price</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                {packageBox.map((item, i) => (
                  <tr key={i}>
                    <th scope="row">{i + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td><FaEdit className='mr-r-10' onClick={this.editClick.bind(this, i , item)}/></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
        <Modal isOpen={this.state.boxingmodal} toggle={this.toggleBoxingModal} className={this.props.className} backdrop={'static'}>
                    <ModalHeader toggle={this.toggleBoxingModal}>Package Add</ModalHeader>
                    <ModalBody>
                        <PackageBoxForm  isEdit={this.state.isPackageEdit} update={this.itemUpdate} packageId={this.state.packageId}></PackageBoxForm>
                    </ModalBody>
                </Modal>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PackageboxlistPage);
