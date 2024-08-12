import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Media, Row, Col
} from 'reactstrap';
import { FaEdit } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import { history } from '../store';
import PasswordShow from './PasswordShow';
var imgStyle = {
  maxWidth: "250px",
  maxHeight: "300px",
  padding: "10px"
};
class ViewSalesUser extends React.Component {

  componentWillMount() {
  }

  render() {
    const propdata = this.props.propdata;
    const name = propdata.name;
    const password = propdata.password;
    const email = propdata.email;
    const phonenumber = propdata.phoneno;
    const address = propdata.address;
    const proof = [];
    if (propdata.id_proof)
      proof.push({ name: 'Identity Proof', proof_url: propdata.id_proof });
    if (propdata.add_proof)
      proof.push({ name: 'Address Proof', proof_url: propdata.add_proof });
    if (propdata.birth_cer)
      proof.push({ name: 'Birthday Proof', proof_url: propdata.birth_cer });
    return (
      <div className="pd-8">
        <Card>
          <CardHeader>{name}
          <span className="float-right">
              <Link to={`/sales-edit/${propdata.id}`} className="preview-link"><Button color="link"><FaEdit size={22} /></Button></Link>
              <Button className="mr-r-10" onClick={history.goBack}>Back</Button>
            </span>
          </CardHeader>
          <CardBody className="scrollbar pd-10 view-form">
            <Row>
              <Col lg='2' className="lable"> Email:
              </Col>
              <Col> {email}
              </Col>
            </Row>
            <Row>
              <Col lg='2' className="lable"> Phone :
              </Col>
              <Col> {phonenumber}
              </Col>
            </Row>
            <Row>
              <Col lg='2' className="lable"> Address:
              </Col>
              <Col> {address}
              </Col>
            </Row>
            <Row>
              <Col lg='2' className="lable"> Password:
              </Col>
              <Col> <PasswordShow password={password}/>
              </Col>
            </Row>
            <Row hidden={proof.length===0}>
              <Col lg='2' className="lable"> Proof:
              </Col>
              <Col>
                <Media>
                  {proof.map((item, i) => (
                    <Media left key={i}>
                    <div className='txt-align-center lable'>{item.name}</div>
                      <Media className='gallary-img-style' style={imgStyle} object src={item.proof_url} alt={item.name} />
                    </Media>
                  ))}
                </Media>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </div>
    );
  };
}

export default ViewSalesUser;