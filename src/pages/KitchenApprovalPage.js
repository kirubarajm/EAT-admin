import React from "react";
import AxiosRequest from "../AxiosRequest";
import {
  MAKEIT_UNAPPROVED_USERS_LIST,
  MAKEIT_UNAPPROVED__USERS_FILTER
} from "../constants/actionTypes";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Table,
  Button,
} from "reactstrap";
import {FaEdit} from "react-icons/fa";


const mapStateToProps = state => ({...state.makeitunapproved});

const mapDispatchToProps = dispatch => ({
  onGetUser: data =>
    dispatch({
      type: MAKEIT_UNAPPROVED_USERS_LIST,
      payload: AxiosRequest.Makeit.getUnapproved(data)
    }),
  onSetFilter: (search) =>
    dispatch({ type: MAKEIT_UNAPPROVED__USERS_FILTER,search })
});

class KitchenApprovalPage extends React.Component {
  componentWillMount() {
    this.onFiltersApply();
    this.onSearch = e => {
      if (e.keyCode === 13 && e.shiftKey === false) {
        e.preventDefault();
        this.props.onSetFilter( e.target.value);
        this.onFiltersApply(e.target.value);
      }
    };
  }
  onFiltersApply( search) {
    var filter = {
      search: search ||"",
    };
    this.props.onGetUser(filter);
  }

  render() {
    const makeituserlist = this.props.makeituserlist;
    return (
      <div className="pd-8">
        <Card>
          <CardHeader>
            KITCHEN APPROVAL
          </CardHeader>
          <CardBody className="scrollbar pd-0">
            <Table>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Id</th>
                  <th>Owner Name</th>
                  <th>Brand Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  {/* <th>status</th> */}
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {makeituserlist.map((item, i) => (
                  <tr key={i}>
                    <th scope="row">{i + 1}</th>
                    <th scope="row">{item.userid}</th>
                    <td>{item.name}</td>
                    <td>{item.brandname}</td>
                    <td>{item.email}</td>
                    <td>{item.phoneno}</td>
                    <td>
                    <Link to={`/makeit-edit/${item.userid}`} className="preview-link">
                      <Button color="link"><FaEdit size={20} /></Button>
                    </Link>
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
)(KitchenApprovalPage);
