import React from 'react';
import {ORDER_RATING_GET_ALL, ORDER_RATING_SET_FILTER } from '../constants/actionTypes'
import AxiosRequest from '../AxiosRequest';
import PaginationComponent from "react-reactstrap-pagination";
import { connect } from 'react-redux'
import Moment from 'moment';
import { Link } from 'react-router-dom';
import {
    Row,
    Col,
    Card,
    Button,
    CardHeader,
    CardBody,
    CardFooter
} from 'reactstrap';
import { FaStar } from "react-icons/fa";

function CardRowCol(props) {
    var lg = props.lg ? props.lg : '12';
    var lable = props.lable ? props.lable : '';
    if (props.value !== null) {
      return (
          <div>
            <Row className="mr-t-0">
            <Col lg={lg} className="lable">{lable}</Col>
            </Row>
            <Row className="mr-t-0">
            <Col>{props.value}</Col>
            </Row>
       </div>
      );
    }
  
    return (<div></div>);
  }

function CardRowColOrderid(props) {
    if (props.value) {
      return (
        <div className="list-text mr-b-10"> 
        <span className="font-size-14 txt-align-left txt-color-black font-weight-bold pd-0">
        {props.lable}
        </span>
        <span className="font-size-14 txt-align-left font-weight-bold pd-0">
        <Link to={`/vieworder/${props.value}`} className="txt-color-black font-weight-bold text-decoration-underline">{props.value}</Link>
        </span>
        <span className="font-size-14 float-right txt-color-black pd-0">
        {props.date}
        </span>
        </div>
      );
    }
    return <div />;
  }

function CardRowColRating(props) {
    if (props.value) {
        return (
            <Row className="list-text">
                <Col lg={2} className='font-size-14 color-grey'>{props.value}</Col>
                <Col lg={2}>
                    <div className="star-rating">
                    <span>{[...Array(props.totalStars)].map((n, i) => (
                            <Star
                                key={i}
                                selected={i < props.starsSelected}
                                starsSelected={props.starsSelected}
                                postion={i}
                            />
                        ))}</span> 
                    </div> 
                </Col>
                {/* <span  className='font-size-12 color-grey'>{props.value}</span> */}
            </Row>
        );
    }
    return (<div></div>);
}

const Star = ({ selected = false, starsSelected, postion }) => {
    return (
        <FaStar className='star mr-b-15' size={12} color={selected ? "yellow" : 'grey'} />
    );
};
const mapStateToProps = state => ({ ...state.orderrating});

const mapDispatchToProps = dispatch => ({
    getOrderRating: (date) =>
        dispatch({ type: ORDER_RATING_GET_ALL, payload: AxiosRequest.Rating.getOrderRating(date) }),
    setOrderRatingFilter: (page) =>
        dispatch({ type: ORDER_RATING_SET_FILTER, 
        page}),

});
const pagelimit=20;
class OrderRating extends React.Component {

    componentWillMount() {
        this.props.getOrderRating({page:this.props.page});
        this.refreshOrderRating = this.refreshOrderRating.bind(this);
        this.handleSelected = this.handleSelected.bind(this);
        this.setState({ starsSelected: 1 });
    }
    componentDidUpdate(nextProps, nextState) {
    }
    refreshOrderRating() {
        this.props.getOrderRating({page:this.props.page});
    }
    handleSelected(selectedPage) {
        this.props.getOrderRating({page:selectedPage});
        this.props.setOrderRatingFilter(selectedPage);
      }

    render() {
        const orderRatingList = this.props.orderRatingList ? this.props.orderRatingList : [];
        const totalPagecount =this.props.page_count||0;
        return (
            <div className="pd-8">
                <Card>
                    <CardHeader>
                        Order Rating
                        <Row className="float-right">
                            <Row className="float-right">
                                <Col><Button className="mr-r-10" onClick={this.refreshOrderRating}>Refresh</Button></Col>
                            </Row>
                        </Row>
                    </CardHeader>
                    <CardBody  className={(totalPagecount<pagelimit?"scrollbar-rating":"scrollbar-rating-footer")+" pd-8 footer bg-color-grey"}>
                    <Row>
                        {orderRatingList.map((item, index) => (
                            <Col sm="12" className="mr-t-10" key={index}>
                            <Card className='mr-t-10 view-form'>
                                <CardBody>
                                    <CardRowColOrderid  lable={'Order ID : '} value={item.orderid} date={Moment(item.created_at).format('DD-MMM-YYYY,hh:mm a')}></CardRowColOrderid>
                                    <CardRowColRating lg='2' totalStars={5} starsSelected={item.rating_food} value={"Food Rating:"}></CardRowColRating>
                                    <CardRowColRating lg='2' totalStars={5} starsSelected={item.rating_delivery} value={"Delivery Rating:"}></CardRowColRating>
                                    {/* <CardRowCol lg='2' lable='Name:' value={item.name || '-'} totalStars={5} starsSelected={item.rating}/>
                                    <CardRowCol lg='2' lable='Phone:' value={item.phoneno || '-'} /> */}
                                    <hr></hr>
                                    {/* <Row><Col>{item.content}</Col></Row> */}
                                    <CardRowCol lg='8' lable='Food Description:' value={item.desc_food || '-'} />
                                    <CardRowCol lg='8' lable='Delivery description:' value={item.desc_delivery || '-'} />
                                    {/* <Row><Col className='font-size-12 txt-align-right color-grey'>{Moment(item.created_at).format('DD-MMM-YYYY hh:mm a')}</Col></Row> */}

                                </CardBody>
                            </Card></Col>
                        ))}</Row>
                    </CardBody>

                    <CardFooter hidden={totalPagecount<pagelimit}>
                    <div className="float-right">
                        <PaginationComponent
                            totalItems={totalPagecount}
                            pageSize={pagelimit}
                            onSelect={this.handleSelected}
                            activePage={this.props.page}/>
                        </div>
              </CardFooter>
                </Card>
            </div >
        );
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(OrderRating);