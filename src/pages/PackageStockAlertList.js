import React from "react";
import AxiosRequest from "../AxiosRequest";
import SearchInput from "../components/SearchInput";
import { PACKAGE_STOCK_ALERT_LIST, PACKAGE_STOCK_LIST_ALERT_FILTER,
} from "../constants/actionTypes";
import { connect } from "react-redux";
import {
  Card,
  CardBody,
  CardHeader,CardFooter,
  Table,
  Row,
  Col,
} from "reactstrap";
import PaginationComponent from "react-reactstrap-pagination";


const mapStateToProps = state => ({ ...state.packagestockalertlist });

const mapDispatchToProps = dispatch => ({
  onGetAllPackageStock: data =>
    dispatch({
      type: PACKAGE_STOCK_ALERT_LIST,
      payload: AxiosRequest.PackageInventory.getPackageStockInvetoryList(data)
    }),
  onSetFilter: (search, page) =>
    dispatch({ type: PACKAGE_STOCK_LIST_ALERT_FILTER, search, page })
});

const defultPage = 1;

class PackageStockAlertList extends React.Component {
  constructor() {
    super();
  }

  handleSelected(selectedPage) {
    this.props.onSetFilter(this.props.search, selectedPage);
    this.onFiltersApply(this.props.search, selectedPage);
  }

  componentWillMount() {
    this.handleSelected=this.handleSelected.bind(this);
    this.props.onSetFilter(this.props.search, this.props.page);
    this.onFiltersApply(this.props.search, this.props.page);
    this.onSearch = e => {
      this.props.onSetFilter(e.target.value, defultPage);
      this.onFiltersApply(e.target.value, defultPage);
    };
  }
  onFiltersApply(search, page) {
    var filter = {
      search: search,
      page: page,
      isAlert:true
    };
    this.props.onGetAllPackageStock(filter);
  }

 

  componentDidUpdate(nextProps, nextState) {}

  render() {
    const packagestockarray = this.props.packagestockarray;
    return (
      <div className="pd-8">
        <Card>
          <CardHeader>
            Package Stock Alert
            <Row className="float-right">
              <Col>
                <SearchInput
                  onSearch={this.onSearch}
                  value={this.props.search}
                />
              </Col>
            </Row>
          </CardHeader>
          <CardBody className="card-footer-with-scroll pd-0">
            <Table>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Makeit-ID</th>
                  <th>Kitchen Name</th>
                  <th>Package Name</th>
                  <th>Stock Count</th>
                </tr>
              </thead>
              <tbody>
                {packagestockarray.map((item, i) => (
                  <tr key={i}>
                    <th scope="row">{i + 1}</th>
                    <th scope="row">{item.userid}</th>
                    <td>{item.brandname}</td>
                    <td>{item.name}</td>
                    <td>{item.remaining_count}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
          <CardFooter
            hidden={this.props.totalStockArrayCount < this.props.stockLimt}
          >
             <div className="float-right">
              <PaginationComponent
                totalItems={this.props.totalStockArrayCount}
                pageSize={this.props.stockLimt}
                onSelect={this.handleSelected}
                activePage={this.props.page}
              />
            </div> 
          </CardFooter>
        </Card>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PackageStockAlertList);
