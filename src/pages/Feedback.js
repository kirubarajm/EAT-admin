import React from 'react';
import { FEEDBACK_GET_ALL } from '../constants/actionTypes'
import AxiosRequest from '../AxiosRequest';
import { connect } from 'react-redux'
import Moment from 'moment';
import {
    Row,
    Col,
    Card,
    Button,
    CardHeader,
    CardBody,
} from 'reactstrap';
import { FaStar } from "react-icons/fa";

function CardRowColRating(props) {
    if (props.value) {
        return (
            <Row className="list-text">
                <Col lg={10} className='font-size-12 color-grey'>{props.value}</Col>
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
    // starsSelected=2.5
    // var isHalf=starsSelected-(postion-1)
    // var mod=(starsSelected % postion )
    // console.log("isHalf-->"+mod)
    // if(isHalf===0.5){
    //     return (
    //         <FaStarHalfAlt className={"star"}  color={selected ? "yellow" :'grey'}/>
    //       );
    // }
    return (
        <FaStar className='star mr-b-15' size={12} color={selected ? "yellow" : 'grey'} />
    );
};
const mapStateToProps = state => ({ ...state.feedback });

const mapDispatchToProps = dispatch => ({
    getAllFeedback: () =>
        dispatch({ type: FEEDBACK_GET_ALL, payload: AxiosRequest.Feedback.getFeedback() }),

});
class Feedback extends React.Component {

    componentWillMount() {
        this.props.getAllFeedback();
        this.refreshFeedback = this.refreshFeedback.bind(this);
        this.setState({ starsSelected: 1 });
    }
    componentDidUpdate(nextProps, nextState) {
    }
    refreshFeedback() {
        this.props.getAllFeedback();
    }


    render() {
        const feedbackList = this.props.feedbackList ? this.props.feedbackList : [];
        return (
            <div className="pd-8">
                <Card>
                    <CardHeader>
                        Feedback
                        <Row className="float-right">
                            <Row className="float-right">
                                <Col><Button className="mr-r-10" onClick={this.refreshFeedback}>Refresh</Button></Col>
                            </Row>
                        </Row>
                    </CardHeader>
                    <CardBody className="pd-8 scrollbar bg-color-grey">
                    <Row>
                        {feedbackList.map((item, index) => (
                            <Col sm="12" className="mr-t-10" key={index}>
                            <Card className='mr-t-10 view-form'>
                                <CardBody>
                                    <div>{item.name || item.phoneno || '-'}</div>
                                    <CardRowColRating lg='2' totalStars={5} starsSelected={item.rating} value={Moment(item.created_at).format('DD-MMM-YYYY')}></CardRowColRating>
                                    {/* <CardRowCol lg='2' lable='Name:' value={item.name || '-'} totalStars={5} starsSelected={item.rating}/>
                                    <CardRowCol lg='2' lable='Phone:' value={item.phoneno || '-'} /> */}
                                    <hr></hr>
                                    <Row><Col>{item.content}</Col></Row>
                                    {/* <Row><Col className='font-size-12 txt-align-right color-grey'>{Moment(item.created_at).format('DD-MMM-YYYY hh:mm a')}</Col></Row> */}

                                </CardBody>
                            </Card></Col>
                        ))}</Row>
                    </CardBody>
                </Card>
            </div >
        );
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Feedback);