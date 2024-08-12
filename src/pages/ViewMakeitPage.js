import React from 'react';
import { MAKEIT_VIEW_DETAIL, MAKEIT_GET_CUISINE, MAKEIT_USERS_SERVICE, MAKEIT_ZONE_AREA } from '../constants/actionTypes'
import { connect } from 'react-redux'
import AxiosRequest from '../AxiosRequest';
import ViewMakeitUser from '../components/ViewMakeitUser';

const mapStateToProps = state => ({ ...state.viewmakeit,
    cusinieList:state.common.cusinieList,
    hometownList:state.common.hometownList });

const mapDispatchToProps = dispatch => ({
    onGetUser: (id) =>
        dispatch({ type: MAKEIT_VIEW_DETAIL, payload: AxiosRequest.Makeit.getsingle(id)}),
    onGetCuisine: () =>
        dispatch({ type: MAKEIT_GET_CUISINE, payload: AxiosRequest.Master.getCuisine() }),
    onUnServiceable: (data) =>
        dispatch({ type: MAKEIT_USERS_SERVICE, payload: AxiosRequest.Makeit.unserviceable(data)}),
        onGetZone: data =>
    dispatch({
      type: MAKEIT_ZONE_AREA,
      payload: AxiosRequest.Zone.getAllZone(data)
    }),
});
class ViewMakeitPage extends React.Component {

    constructor() {
        super();
        this.state = { checked: false };
        this.handleSwitchChange = this.handleSwitchChange.bind(this);
      }
    componentWillMount() {
        const userid = this.props.match.params.id;
        this.props.onGetUser(userid);
        this.props.onGetZone({ boundaries: 1 });
        if(!this.props.cusinieList||this.props.cusinieList.length===0) this.props.onGetCuisine();
        this.props.onGetCuisine();
    }
    componentDidUpdate(nextProps, nextState) {
        if(this.props.unServiceable&&this.state.checked){
          this.setState({ checked:false });
          const userid = this.props.match.params.id;
            this.props.onGetUser(userid);
        }
      }

    handleSwitchChange(item) {
        var data={userid:item.userid,
        unservicable:item.unservicable?0:1};
        this.setState({ checked:true });
        this.props.onUnServiceable(data);
      }

    render() {
        return (
            <div className="pd-8">
                <ViewMakeitUser title="Details"
                    handleSwitchChange={this.handleSwitchChange}
                    onGetUser={this.props.onGetUser}
                    propdata={this.props.viewmakeituser} ZoneData={this.props.ZoneData}/>
            </div>
        );
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewMakeitPage);