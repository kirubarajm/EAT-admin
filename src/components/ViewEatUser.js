import React from "react";
import { Card, CardHeader, CardBody, Button, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { history } from "../store";
import PasswordShow from "./PasswordShow";

class ViewEatUser extends React.Component {
  componentWillMount() {}

  render() {
    const propdata = this.props.propdata;
    const name = propdata.name;
    const userid = propdata.userid;
    const password = propdata.password;
    const email = propdata.email;
    const phonenumber = propdata.phoneno;
    const address = propdata.address;
    return (
      <div className="pd-8">
        <Card>
          <CardHeader>
            {name}x{" "}
            <Row className="float-right">
              <Col lg="2">
                <Link
                  to={`/user/order/${userid}/${name}`}
                  className="preview-link"
                >
                  <i className="fa fa-th-list"></i>
                </Link>
              </Col>
              <Col lg="2">
                <Button className="mr-r-10" onClick={history.goBack}>
                  Back
                </Button>
              </Col>
            </Row>
          </CardHeader>
          <CardBody className="scrollbar pd-10 view-form">
            <Row>
              <Col lg="2" className="lable">
                {" "}
                Email:
              </Col>
              <Col> {email}</Col>
            </Row>
            <Row>
              <Col lg="2" className="lable">
                {" "}
                Phone :
              </Col>
              <Col> {phonenumber}</Col>
            </Row>
            <Row>
              <Col lg="2" className="lable">
                {" "}
                Address:
              </Col>
              <Col> {address}</Col>
            </Row>
            <Row>
              <Col lg="2" className="lable">
                {" "}
                Password:
              </Col>
              <Col>
                {" "}
                <PasswordShow password={password} />
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default ViewEatUser;
