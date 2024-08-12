import React from "react";
import AxiosRequest from "../AxiosRequest";
import {
  MAKEIT_PRODUCT_UNAPPROVED_LIST,
  MAKEIT_UNAPPROVED_FILTER
} from "../constants/actionTypes";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import {
  Card,
  CardBody,
  CardHeader,
  Table,
  Button,
  ButtonGroup,
  Row
} from "reactstrap";
import { FaExternalLinkAlt } from "react-icons/fa";
const mapStateToProps = state => ({ ...state.makeitapproved });

const mapDispatchToProps = dispatch => ({
  onGetProducts: data =>
    dispatch({
      type: MAKEIT_PRODUCT_UNAPPROVED_LIST,
      payload: AxiosRequest.MakeitProcess.getUnApprovedProducts(data)
    }),
  onSetFilter: approved_status =>
    dispatch({ type: MAKEIT_UNAPPROVED_FILTER, approved_status })
});

class ApprovedPage extends React.Component {
  componentWillMount() {
    this.filter = this.filter.bind(this);
    this.props.onGetProducts({ approved_status: this.props.approved_status===3?'1,4':this.props.approved_status });
  }

  filter = id => ev => {
    this.props.onSetFilter(id);
    var approved_status= id===3?'1,4':id;
    this.props.onGetProducts({ approved_status: approved_status });
  };

  render() {
    return (
      <div className="pd-8">
        <Card>
          <CardHeader>
            Product Approved
            <Row className="float-right">
              <ButtonGroup size="sm" hidden={this.props.typeid === 1}>
              <Button
                  color="primary"
                  onClick={this.filter(3)}
                  active={this.props.approved_status === 3}
                >
                  ALL <span className='font-size-10'>({this.props.total_product_count})</span>
                </Button>
                <Button
                  color="primary"
                  onClick={this.filter(1)}
                  active={this.props.approved_status === 1}>
                  New  <span className='font-size-10'>({this.props.new_product_count})</span>
                </Button>
                <Button
                  color="primary"
                  onClick={this.filter(4)}
                  active={this.props.approved_status === 4}
                >
                  Edit <span className='font-size-10'>({this.props.edit_product_count})</span>
                </Button>
              </ButtonGroup>
            </Row>
          </CardHeader>
          <CardBody className="scrollbar pd-0">
            <Table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Kitchen Name</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Approval Type</th>
                  <th>Type</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {this.props.productList.map((item, index) => (
                  <tr key={index}>
                    <td>{item.productid}</td>
                    <td>
                      {item.brandname}
                    </td>
                    <td>
                      {item.product_name}
                    </td>
                    
                    <td>{item.price}</td>
                    <td>{item.approved_status === 1 ? "New" : "Edit"}</td>
                    <td>{item.vegtype === "0" ? "Veg" : "Non Veg"}</td>
                    <td className="makeit-process-action">
                    <Link to={`/product-detail/${item.productid}`} className="preview-link"><FaExternalLinkAlt className="mr-r-10" /></Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApprovedPage);
