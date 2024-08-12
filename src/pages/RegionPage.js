import React from 'react';
import AxiosRequest from '../AxiosRequest';
import { connect } from 'react-redux'
import { Card, CardBody, CardHeader, Table } from 'reactstrap';
import { MAKEIT_GET_REGION } from '../constants/actionTypes';

const mapStateToProps = state => ({
    regionList: state.common.regionList,
});

const mapDispatchToProps = dispatch => ({
    onGetRegion: () =>
        dispatch({ type: MAKEIT_GET_REGION, payload: AxiosRequest.Master.getRegion() }),
});

class RegionPage extends React.Component {
    componentWillMount() {
        if (this.props.regionList) this.props.onGetRegion();
    }


    render() {
        const regionList = this.props.regionList;
        return (
            <div className="pd-8">
                <Card>
                    <CardHeader>
                        REGION
                    </CardHeader>
                    <CardBody className="scrollbar pd-0">
                        <Table>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Region Name</th>
                                </tr>
                            </thead>
                            <tbody>

                                {regionList.map((item, i) => (
                                    <tr key={i}>
                                        <th scope="row">{i + 1}</th>
                                        <td>{item.regionname}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>
            </div>
        );
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(RegionPage);