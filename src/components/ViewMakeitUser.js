import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Media, Row, Col,
  Modal, ModalHeader, ModalBody, ModalFooter,
  TabContent, TabPane, Nav, NavItem, NavLink,
} from 'reactstrap';
import { FaMapMarkedAlt, FaEdit } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import { history } from '../store';
import MapContainer from './MapContainer';
import AddMakeitVirtualForm from './AddMakeitVirtualForm';
import SwitchButton from './SwitchButton';
var imgStyle = {
  maxWidth: "250px",
  maxHeight: "300px",
  padding: "10px"
};

function Gallery(props) {
  if (props.gallary && props.gallary.length !== 0) {
    return (
      <Row>
        <Col lg='2' className="lable">Kitchan Images</Col>
        <Col lg='10'>
          <Row className='pd-10 mr-t-10 image-gallery-parent'>
            {props.gallary.map((item, i) => (
              <Col key={i}>
                <Media left>
                  <div className='txt-align-center lable'>{item.docid}</div>
                  <Media className='gallary-img-style' style={imgStyle} object src={item.url} alt={item.docid} />
                </Media>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    );
  }

  return (
    <div></div>
  );
}

function CardRowCol(props) {
  var lg = props.lg ? props.lg : '12';
  var lable = props.lable ? props.lable : '';
  if (props.value !== null) {
    return (
      <Row className="list-text cart-item">
        <Col lg={lg} className="lable">{lable}</Col>
        <Col>{props.value}</Col>
      </Row>
    );
  }

  return (<div></div>);
}
class ViewMakeitUser extends React.Component {

  componentWillMount() {
    this.setState({ modal: false, activeTab: '1', editmodal: false })
    this.toggle = this.toggle.bind(this);
    this.tabsToggle = this.tabsToggle.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.viewMap = () => {
      this.toggle()
    }
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }
  toggleEdit() {
    this.setState(prevState => ({
      editmodal: !prevState.editmodal
    }));
  }

  tabsToggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  

  getCuisine(item) {
    var cuisine=''
    if (item.cuisines) {
      item.cuisines.map(item => {
        if(cuisine.length!==0) cuisine=cuisine+','+item.cuisinename;
        else cuisine=item.cuisinename;
          return item;
        }
      )
    }
    
    if(cuisine.length===0) cuisine='-';
    //else cuisine = cuisine.slice(0,-1);
    return cuisine;
  }

  render() {
    const propdata = this.props.propdata;
    const name = propdata.name;
    const address = propdata.address;
    const gallary = propdata.gallery;
    const lat = propdata.lat;
    const lng = propdata.lon;
    const cuisines=this.getCuisine(propdata);
    return (
      <div className="pd-8">
        <Card>
          <CardHeader>{name}
            <span className="float-right">
              <SwitchButton handleSwitchChange={this.props.handleSwitchChange} item={propdata}/>
              <Link to={`/makeit-edit/${propdata.userid}`} className="preview-link"><Button color="link"><FaEdit size={22} /></Button></Link>
              <Button className="mr-r-10" onClick={history.goBack}>Back</Button>
            </span>
          </CardHeader>
          <CardBody className="scrollbar pd-10 view-form">
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={this.state.activeTab === '1' ? 'active' : ''}
                  onClick={() => { this.tabsToggle('1'); }}>
                  Profile
            </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={this.state.activeTab === '2' ? 'active' : ''}
                  onClick={() => { this.tabsToggle('2'); }}>
                  Account
            </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={this.state.activeTab === '3' ? 'active' : ''}
                  onClick={() => { this.tabsToggle('3'); }}>
                  Kitchan
            </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={this.state.activeTab === '4' ? 'active' : ''}
                  onClick={() => { this.tabsToggle('4'); }}>
                  Gallery
            </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <CardRowCol lg='2' lable='Email' value={propdata.email || '-'} />
                <CardRowCol lg='2' lable='Phone' value={propdata.phoneno || '-'} />
                <CardRowCol lg='2' lable='Address' value={propdata.address || '-'} />
                <CardRowCol lg='2' lable='Hub ' value={propdata.makeithub_address || '-'} />
                <CardRowCol lg='2' lable='Zone ' value={propdata.Zonename || '-'} />
                <Row className="list-text cart-item">
                  <Col lg='2' className="lable">Map View</Col>
                  <Col><div onClick={this.viewMap} className='flex-row'><FaMapMarkedAlt className='makeit-view-map-icon' /> <span className="lable makeit-view-map-text">Show</span> </div></Col>
                </Row>
              </TabPane>
              <TabPane tabId="2">
                <CardRowCol lg='2' lable='Account No' value={propdata.bank_account_no || '-'} />
                <CardRowCol lg='2' lable='Bank Name' value={propdata.bank_name || '-'} />
                <CardRowCol lg='2' lable='Holder Name' value={propdata.bank_holder_name || '-'} />
                <CardRowCol lg='2' lable='IFSC Code' value={propdata.ifsc || '-'} />
              </TabPane>
              <TabPane tabId="3">
                <CardRowCol lg='2' lable='Brand Name' value={propdata.brandname || '-'} />
                <CardRowCol lg='2' lable='Rating' value={propdata.rating || '0'} />
                <CardRowCol lg='2' lable='Region' value={propdata.regionname} />
                <CardRowCol lg='2' lable='Cuisine' value={cuisines} />
                <CardRowCol lg='2' lable='Cost for two' value={propdata.costfortwo || '-'} />
                <CardRowCol lg='2' lable='Home Town' value={propdata.hometownname || '-'} />
                <Row className="list-text cart-item">
                  <Col lg='2' className="lable">Images</Col>
                  <Col><img hidden={!propdata.img1} src={propdata.img1} width={200} alt={'kitchenlogo'}/></Col>
                  <Col><img hidden={!propdata.img2} src={propdata.img2} width={200} alt={'kitchenlogo'}/></Col>
                  <Col><img hidden={!propdata.img3} src={propdata.img3} width={200} alt={'kitchenlogo'}/></Col>
                  <Col><img hidden={!propdata.img4} src={propdata.img4} width={200} alt={'kitchenlogo'}/></Col>
                </Row>
              </TabPane>
              <TabPane tabId="4">
                <Gallery gallary={gallary}></Gallery>
              </TabPane>
            </TabContent>

          </CardBody>
        </Card>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} backdrop={false}>
          <ModalHeader toggle={this.toggle}>Map</ModalHeader>
          <ModalBody>
            <MapContainer className='mr-t-10' 
            editMap={false} clocation={false} lat={lat} lng={lng} address={address} zonearea={this.props.ZoneData}/>
          </ModalBody>
          <ModalFooter>
            <div>Latitude : <span className='font-weight-600'>{lat}</span></div>
            <div>Longitude: <span className='font-weight-600'>{lng}</span></div>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.editmodal} toggle={this.toggleEdit} className={this.props.className} backdrop={true}>
          <ModalHeader toggle={this.toggleEdit}>Makeit Edit</ModalHeader>
          <ModalBody>
            <AddMakeitVirtualForm edit={true} initdata={propdata} />
          </ModalBody>
        </Modal>
      </div>
    );
  };
}

export default ViewMakeitUser;