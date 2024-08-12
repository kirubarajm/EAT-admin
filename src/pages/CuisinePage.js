import React from 'react';
import AxiosRequest from '../AxiosRequest';
import { connect } from 'react-redux'
import { Card, CardBody, CardHeader, Table } from 'reactstrap';
import { MAKEIT_GET_CUISINE } from '../constants/actionTypes';

const mapStateToProps = state => ({
    cusinieList: state.common.cusinieList,
});

const mapDispatchToProps = dispatch => ({
    onGetCuisine: () =>
        dispatch({ type: MAKEIT_GET_CUISINE, payload: AxiosRequest.Master.getCuisine() }),
});

class CuisinePage extends React.Component {
    componentWillMount() {
        if (this.props.cusinieList) this.props.onGetCuisine();
    }


    render() {
        const cusinieList = this.props.cusinieList;
        return (
            <div className="pd-8">
                <Card>
                    <CardHeader>
                     CUISINE
                    </CardHeader>
                    <CardBody className="scrollbar pd-0">
                        <Table>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Cuisine Name</th>
                                </tr>
                            </thead>
                            <tbody>

                                {cusinieList.map((item, i) => (
                                    <tr key={i}>
                                        <th scope="row">{i + 1}</th>
                                        <td>{item.cuisinename}</td>
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
export default connect(mapStateToProps, mapDispatchToProps)(CuisinePage);