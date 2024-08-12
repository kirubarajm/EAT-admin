import React from 'react';
import { SALESMAN_VIEW_DETAIL } from '../constants/actionTypes'
import { connect } from 'react-redux'
import AxiosRequest from '../AxiosRequest';
import ViewSalesUser from '../components/ViewSalesUser';

const mapStateToProps = state => ({ ...state.viewsales });

const mapDispatchToProps = dispatch => ({
    onGetUser: (id) =>
        dispatch({ type: SALESMAN_VIEW_DETAIL, payload: AxiosRequest.Sales.getsingle(id) }),
});
class ViewSalesPage extends React.Component {

    componentWillMount() {
        const userid = this.props.match.params.id;
        this.props.onGetUser(userid);
    }
    render() {
        return (
            <div className="pd-8">
                <ViewSalesUser title="Details"
                    onGetUser={this.props.onGetUser}
                    propdata={this.props.viewsalesuser} />
            </div>
        );
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewSalesPage);