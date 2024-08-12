import React from 'react';
import AxiosRequest from '../AxiosRequest';
import { connect } from 'react-redux'
import { Card, CardBody, CardHeader, Table } from 'reactstrap';
import { MAKEIT_GET_CLUSTER } from '../constants/actionTypes';

const mapStateToProps = state => ({
    clusterList: state.common.clusterList,
});

const mapDispatchToProps = dispatch => ({
    onGetCluster: () =>
        dispatch({ type: MAKEIT_GET_CLUSTER, payload: AxiosRequest.Master.getCluster() }),
});

class ClusterPage extends React.Component {
    componentWillMount() {
        if (this.props.clusterList) this.props.onGetCluster();
    }


    render() {
        const clusterList = this.props.clusterList ||[];
        return (
            <div className="pd-8">
                <Card>
                    <CardHeader>
                      Cluster
                    </CardHeader>
                    <CardBody className="scrollbar pd-0">
                        <Table>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Cluster Name</th>
                                    <th>Avarage Rating</th>
                                </tr>
                            </thead>
                            <tbody>

                                {clusterList.map((item, i) => (
                                    <tr key={i}>
                                        <th scope="row">{i + 1}</th>
                                        <td>{item.clustername}</td>
                                        <td>{item.avg_rating}</td>
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
export default connect(mapStateToProps, mapDispatchToProps)(ClusterPage);