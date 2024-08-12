import React from 'react';
import { EAT_VIEW_DETAIL } from '../constants/actionTypes'
import { connect } from 'react-redux'
import AxiosRequest from '../AxiosRequest';
import ViewEatUser from '../components/ViewEatUser';

const mapStateToProps = state => ({ ...state.vieweatuser });

const mapDispatchToProps = dispatch => ({
    onGetUser: (id) =>
        dispatch({ type: EAT_VIEW_DETAIL, payload: AxiosRequest.Eat.getsingle(id)}),
});
class ViewEatPage extends React.Component {

    componentWillMount() {
        const userid = this.props.match.params.id;
        this.props.onGetUser(userid);
    }
    render() {
        return (
            <div className="pd-8">
                <ViewEatUser title="Details"
                    onGetUser={this.props.onGetUser}
                    propdata={this.props.vieweatuser} />
            </div>
        );
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewEatPage);