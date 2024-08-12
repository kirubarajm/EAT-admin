import React from 'react';
import { SALESMAN_DETAIL, SALES_USERS_FILTER } from '../constants/actionTypes'
import { connect } from 'react-redux'
//import * as salesman from '../utils/salesman.json';
import { Link } from 'react-router-dom';
import AxiosRequest from '../AxiosRequest';
import { Card, CardBody, CardHeader, Table,Row,Col,CardFooter} from 'reactstrap';
import SearchInput from '../components/SearchInput'
import PasswordShow from '../components/PasswordShow';
import PaginationComponent from "react-reactstrap-pagination";

const mapStateToProps = state => ({ ...state.salesman });

const mapDispatchToProps = dispatch => ({
  onGetUser: (data) =>
    dispatch({ type: SALESMAN_DETAIL, payload: AxiosRequest.Sales.getAll(data)}),
    onSetFilter: (search) =>
    dispatch({ type: SALES_USERS_FILTER,search }),
});
const defultPage = 1;
class SalesmanPage extends React.Component {
  componentWillMount() {
    //this.props.onGetUser();
  this.handleSelected=this.handleSelected.bind(this);
  this.onFiltersApply(this.props.search,defultPage);

    this.onSearch = e => {
     // if (e.keyCode === 13 && e.shiftKey === false) {
        //e.preventDefault()
        this.props.onSetFilter(e.target.value,defultPage);
        this.onFiltersApply(e.target.value,defultPage);
     // }
    }

  }
  onFiltersApply(search,page) {
    var filter = {search: search,page:page}
    this.props.onGetUser(filter);
  }

  handleSelected(selectedPage) {
    this.props.onSetFilter(this.props.search, selectedPage);
    this.onFiltersApply(this.props.search, selectedPage);
  }

  render() {
    const salesmandetail = this.props.salesmandetail;
    return (
      <div className="pd-8">
        <Card>
          <CardHeader>
            <b>SALES MAN DETAILS</b>
            <Row className="float-right">
              <Col><SearchInput  onSearch={this.onSearch} value={this.props.search}/></Col>
            </Row>
          </CardHeader>
          <CardBody className="card-footer-with-scroll pd-0">
            <Table>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Emp ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Password</th>
                  <th>Today Count</th>
                  {/* <th>Status</th> */}
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {salesmandetail.map((item, i) => (
                  <tr key={i}>
                    <th scope="row">{i + 1}</th>
                    <th>{item.id}</th>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phoneno}</td>
                    <td><PasswordShow password={item.password}/></td>
                    <td>{item.totalassigned}</td>
                    {/* <td>{i % 2 === 0 ? <span style={{ color: "blue" }}>Active</span> : <span style={{ color: "red" }}>Deactive</span>}</td> */}
                    <td><Link to={`/viewsalesuser/${item.id}`} className="preview-link"><i className="fa fa-external-link-alt"></i></Link></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
          <CardFooter
            hidden={this.props.totalSalesuserArrayCount < this.props.pageLimt}
          >
             <div className="float-right">
              <PaginationComponent
                totalItems={this.props.totalSalesuserArrayCount}
                pageSize={this.props.pageLimt}
                onSelect={this.handleSelected}
                activePage={this.props.page}
              />
            </div> 
          </CardFooter>
        </Card>
      </div>
    );
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(SalesmanPage);