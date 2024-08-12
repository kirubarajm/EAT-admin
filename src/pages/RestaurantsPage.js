import React from 'react';
import SearchInput from '../components/SearchInput'
import AxiosRequest from '../AxiosRequest'
import { connect } from 'react-redux';
import placeholder from "../assets/img/placeholder.jpg";
import { LIVE_GET_RESTAURANTS, LIVE_RESTAURANTS_FILTER, LIVE_RESTAURANTS_SELECT, LIVE_RESTAURANTS_APPROVAL } from '../constants/actionTypes'
import { Link } from 'react-router-dom';
import {
    Row, Col, Card, CardBody, CardHeader, CardTitle, CardImg, ButtonGroup, Button, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import { FaListAlt } from 'react-icons/fa';
import { NORMAL_USER,VIRTUAL_USER} from '../constants/updateStatus';

const mapStateToProps = state => ({
    ...state.restaurants,
});
const mapDispatchToProps = dispatch => ({
    onGetRestaurants: (data) =>
        dispatch({ type: LIVE_GET_RESTAURANTS, payload: AxiosRequest.Liveproducts.getAllRestaurants(data) }),
    onSetFilter: (virtualkey, search) =>
        dispatch({ type: LIVE_RESTAURANTS_FILTER, virtualkey, search }),
    onSelectedRestaurant: (selectedRestaurant) =>
        dispatch({ type: LIVE_RESTAURANTS_SELECT, selectedRestaurant }),
    onApproval: (approvaldata, index) =>
        dispatch({ type: LIVE_RESTAURANTS_APPROVAL, payload: AxiosRequest.Liveproducts.postApproval(approvaldata), index })

});

function ImageCustom(props) {
    if (!props.imageUrl) {
      return ( <div className="overlay-parent"><CardImg top width="100%" height="200px" src={placeholder} alt="" />
       <Link className="overlay-icon-menu" hidden={!props.virtualkey} to={"/makeitproduct/" + props.userid} className="preview-link">
          <FaListAlt size={20}/>
      </Link>
      </div>);
    }
    return (
    <div className="overlay-parent">
      <CardImg
        top
        width="100%"
        height="200px"
        src={props.imageUrl}
        alt=""
        onError={e => {
          e.target.src = placeholder;
        }}
      />
      <Link className="overlay-icon-menu" hidden={!props.virtualkey} to={"/makeitproduct/" + props.userid} className="preview-link">
          <FaListAlt size={20}/>
      </Link></div>
      
    );
  }


// function VerifiedStatus(props) {
//     if (props.item.appointment_status === MAKEIT_APPROVEL) {
//         return (
//             <div className='appointment-approvel'><FaCheckCircle /></div>
//         );
//     } else if (props.item.appointment_status === MAKEIT_APPOINTMENT_POSTED) {
//         return (
//             <div style={{ color: "gray" }}>waiting</div>
//         );
//     } else if (props.item.appointment_status === MAKEIT_APPOINTMENT_ASSIGNED) {
//         return (
//             <div onClick={props.approvalStatus(props.item.userid, props.index)}>Approvel</div>
//         );
//     } else if (props.item.appointment_status === MAKEIT_REGISTRATION) {
//         return (
//             <div style={{ color: "gray" }}>only Registration</div>
//         );
//     }
//     return (
//         <div className='appointment-approvel'></div>
//     );
// }

var approvalData, index;
class RestaurantsPage extends React.Component {

    componentWillMount() {
        this.onFiltersApply(this.props.virtualkey,
            this.props.search);

        this.onSearch = e => {
            //if (e.keyCode === 13 && e.shiftKey === false) {
               // e.preventDefault()
                this.props.onSetFilter( this.props.virtualkey, e.target.value);
                this.onFiltersApply(this.props.virtualkey, e.target.value);
           // }
        }
        this.filter = (id) => ev => {
            ev.preventDefault();
            this.props.onSetFilter(id, this.props.search);
            this.onFiltersApply(id, this.props.search);
        }

        this.selectedRestaurant = (item) => e => {
            this.props.onSelectedRestaurant(item);
        }
        this.approvalStatus = (id, i) => e => {
            e.preventDefault();
            index = i;
            approvalData = { makeit_userid: id, verified_status: 1 }
            this.toggle();
        }

        this.sendApproval = () => {
            this.toggle();
            this.props.onApproval(approvalData, index);
        }
        this.setState({ modal: false })
        this.toggle = this.toggle.bind(this);
    }

    onFiltersApply(listtype, search) {
        var appointment_status = 3;
        var virtualkey = listtype === -1 ? 'all' : listtype;
        var filter = { virtualkey: virtualkey, appointment_status: appointment_status, search: search,active_status:"1"}
        this.props.onGetRestaurants(filter);
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    render() {
        const restaurantslist = this.props.restaurantslist || [];
        const search=this.props.search || "";
        return (
            <div className="pd-12">
                <Card>
                    <CardHeader>
                        KITCHENS
                        <Row className="float-right">
                            <ButtonGroup size="sm">
                                <Button color="primary" onClick={this.filter(-1)} active={this.props.virtualkey === -1}>All</Button>
                                <Button color="primary" onClick={this.filter(NORMAL_USER)} active={this.props.virtualkey === NORMAL_USER}>Real</Button>
                                <Button color="primary" onClick={this.filter(VIRTUAL_USER)} active={this.props.virtualkey === VIRTUAL_USER}>Virtual</Button>
                            </ButtonGroup>
                            <Col><SearchInput placeholder="Search restaurants" onSearch={this.onSearch} value={search}/></Col>
                        </Row>

                    </CardHeader>
                    <CardBody className="scrollbar" style={{ background: '#f0f0ee' }}>
                        <Row>
                            {restaurantslist.map((item, i) => (
                                <Col sm="3" className="mr-t-10" key={i}>
                                    <Link to={`/restaurant/${item.name.replace(' ', '_')}`} onClick={this.selectedRestaurant(item)} className="restaurants">
                                        <Card>
                                            <ImageCustom imageUrl={item.img1} userid={item.userid} virtualkey={item.virtualkey}/>
                                            <Card body>
                                                <CardTitle><Row> <Col lg='8' className='pd-0 pd-l-10'><div style={{ fontSize: "16px",height:"3em",overflow:"hidden",lineHeight:"1.5em" }}>{item.brandname || item.name}</div></Col>
                                                    {/* <Col className='appointment-unapprovel'>
                                                        <VerifiedStatus item={item} index={i} approvalStatus={this.approvalStatus} />
                                                    </Col> */}
                                                    <Col className='appointment-unapprovel pd-0 pd-r-10'>
                                                       {item.virtualkey===VIRTUAL_USER?"virtual":""}
                                                    </Col>
                                                    </Row>
                                                </CardTitle>
                                                <Row>
                                                    <Col lg='12'> <div style={{ fontSize: "12px", color: "gray",height:"3em",overflow:"hidden",lineHeight:"1.5em" }}>{item.address}</div>
                                                    </Col>
                                                </Row>
                                            </Card>
                                        </Card>
                                    </Link>
                                </Col>
                            ))}
                        </Row>
                    </CardBody>
                </Card>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} backdrop={true}>
                    <ModalHeader toggle={this.toggle}>Confirm Message</ModalHeader>
                    <ModalBody>
                        Are you sure you want to change the approval state.
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.sendApproval}>Yes</Button>{' '}
                        <Button color="danger" onClick={this.toggle}>No</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(RestaurantsPage);