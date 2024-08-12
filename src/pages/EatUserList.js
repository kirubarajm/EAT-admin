import React from 'react';
import { EAT_USERS_LIST, EAT_USERS_FILTER_APPLY, EAT_USRE_PAGE_LOADED } from '../constants/actionTypes'
import { connect } from 'react-redux'
import AxiosRequest from '../AxiosRequest';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Table, Row, Col,ButtonGroup,Button,CardFooter } from 'reactstrap';
import SearchInput from '../components/SearchInput'
import PaginationComponent from "react-reactstrap-pagination";

const defultPage=1;
const pagelimit=20;

const mapStateToProps = state => ({ ...state.eatuserlist });

const mapDispatchToProps = dispatch => ({
  onGetUser: (filter) =>
    dispatch({ type: EAT_USERS_LIST, payload: AxiosRequest.Eat.getAll(filter) }),
  onSetFilter: (listtype,search) =>
    dispatch({ type: EAT_USERS_FILTER_APPLY,listtype,search}),
    onLoad:()=>
        dispatch({ type: EAT_USRE_PAGE_LOADED}),
});
class EatUserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        selectedPage: 1
    };
    this.handleSelected = this.handleSelected.bind(this);
    this.props.onLoad();

}
  componentWillMount() {
    this.onFiltersApply(this.props.listtype,this.props.search);
    this.onSearch = e => {
      //if(e.keyCode === 13 && e.shiftKey === false) {
       // e.preventDefault()
        this.props.onSetFilter(this.props.listtype,e.target.value);
        this.onFiltersApply(this.props.listtype,e.target.value,defultPage);
      //}
    }

    this.filter = (id) => ev => {
      ev.preventDefault();
      this.props.onSetFilter(id,this.props.search);
      this.onFiltersApply(id,this.props.search,defultPage);
    }
    
  }
  handleSelected(selectedPage) {
    this.props.onSetFilter(this.props.listtype, this.props.search);
    this.onFiltersApply(this.props.listtype, this.props.search,selectedPage);
}
  
  onFiltersApply(vId,search,page) {
    var virtualkey=vId===-1?'all':vId;
    var filter = { virtualkey: virtualkey, search: search ,page:page}
    this.props.onGetUser(filter);
  }

  render() {
    const eatuserlist = this.props.eatuserlist;
    return (
      <div className="pd-8">
        <Card>
          <CardHeader>
            EAT USERS DETAILS
            <Row className="float-right">
              <ButtonGroup size="sm">
                <Button color="primary" onClick={this.filter(-1)} active={this.props.listtype === -1}>All</Button>
                <Button color="primary" onClick={this.filter(0)} active={this.props.listtype === 0}>Real User</Button>
                <Button color="primary" onClick={this.filter(1)} active={this.props.listtype === 1}>Virtual User</Button>
              </ButtonGroup>
              <Col><SearchInput onSearch={this.onSearch} value={this.props.search}/></Col>
            </Row>
          </CardHeader>
          <CardBody className="scrollbar pd-0">
            <Table>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Id</th>
                  <th>Name</th>
                  <th>email</th>
                  <th>phone</th>
                  {/* <th>status</th> */}
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>

                {eatuserlist.map((item, i) => (
                  <tr key={i}>
                    <th scope="row">{i + 1}</th>
                    <th scope="row">{item.userid}</th>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phoneno}</td>
                    {/* <td>{i % 2 === 0 ? <span style={{ color: "blue" }}>Active</span> : <span style={{ color: "red" }}>Deactive</span>}</td> */}
                    <td>
                    <Row>
        <Col lg="2">
                      <Link to={`/vieweatuser/${item.userid}`} className="preview-link"><i className="fa fa-external-link-alt"></i></Link>
                     </Col>
        <Col lg="2">
                    <Link to={`/user/order/${item.userid}/${item.name}`} className="preview-link"><i className="fa fa-th-list"></i></Link>
                    </Col>
                    </Row>
                    </td>
                  </tr>

                ))}
              </tbody>

            </Table>

          </CardBody>
          <CardFooter hidden={this.props.totalcount<pagelimit}>
                    <div className="float-right">
                        <PaginationComponent
                            totalItems={this.props.totalcount}
                            pageSize={pagelimit}
                            onSelect={this.handleSelected}
                            activePage={1}/>
                        </div>
                    </CardFooter>
        </Card>
      </div>
    );
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(EatUserList);