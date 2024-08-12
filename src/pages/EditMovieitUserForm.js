import React from 'react';
import { MOVEIT_ADD_USER, MOVEIT_USER_DETAIL, MOVEIT_FORM_CLEAR, MOVEIT_UPDATE_FIELD, MOVEIT_UPDATE_IMAGE_FIELD, MOVEIT_CLEAR_IMAGE_FIELD, MAKEIT_GET_HUB, GET_ALL_ZONE } from '../constants/actionTypes'
import { connect } from 'react-redux'
import AxiosRequest from '../AxiosRequest';
import { Field, reduxForm } from 'redux-form'
import DropZoneField from '../components/dropzoneField'
import renderInputField from '../components/renderInputField'
import { required, maxLength60, minLength2, alphaNumeric, minLength5, imageIsRequired } from '../utils/Validation'
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Button,
} from 'reactstrap';
import { reset } from 'redux-form';
import { history } from '../store';
import { MOVIEIT_USER_EIDT_FORM } from '../utils/constant';

// const renderSelect = ({ input, label, type, meta: { touched, error }, children }) => (
//     <div>
//         <label>{label} <span className='must'>*</span></label>
//         <div>
//             <select {...input}>
//                 {children}
//             </select>
//             {touched && error && <span>{error}</span>}
//         </div>
//     </div>
// )

const renderSelect = ({
    input,
    label,
    type,
    meta: { touched, error },
    children
  }) => (
    <div>
      <label>
        {label} <span className="must">*</span>
      </label>
      <div>
        <select {...input}>{children}</select>
        {touched && error && <span>{error}</span>}
      </div>
    </div>
  );

const mapStateToProps = state => ({ ...state.moveituser,
    makeithub: state.common.makeithub,
    zone_data: state.common.zone_data });

const mapDispatchToProps = dispatch => ({
    onGetUser: (id) =>
        dispatch({ type: MOVEIT_USER_DETAIL, payload: AxiosRequest.Moveit.getsingle(id) }),
    onChangeInput: (key, data) =>
        dispatch({ type: MOVEIT_UPDATE_FIELD, key, payload: AxiosRequest.Moveit.fileUpload(data) }),
    onProofImageLoad: (key, data) =>
        dispatch({ type: MOVEIT_UPDATE_IMAGE_FIELD, key, data }),
    onSubmit: (formData) =>
        dispatch({ type: MOVEIT_ADD_USER, local: formData, payload: AxiosRequest.Moveit.userUpdate(formData) }),
    onClearImage: () =>
        dispatch({ type: MOVEIT_CLEAR_IMAGE_FIELD}),
    onFromClear: () =>
        dispatch(reset(MOVIEIT_USER_EIDT_FORM)),
    onGetMovieitHub: () =>
        dispatch({
          type: MAKEIT_GET_HUB,
          payload: AxiosRequest.Master.getMovieitHub()
        }),
    onGetZone: data =>
    dispatch({
      type: GET_ALL_ZONE,
      payload: AxiosRequest.Zone.getAllZone(data)
    }),   
    onClearSuccess: () =>
        dispatch({ type: MOVEIT_FORM_CLEAR })
});
var userid;

function HubFieldView(props) {
    //if (props.virtualkey === 1) {
      return (
        <Field
          name="moveit_hub"
          component={renderSelect}
          label="Hub"
          validate={[required]}
        >
          {props.makeithub.map(item => (
            <option value={item.makeithub_id} key={item.makeithub_id}>
              {item.makeithub_name}
              {", "}
              {item.address}
            </option>
          ))}
        </Field>
      );
    //}
    //return <div />;
  }
var AssignZone=[];
class EditMovieitUserForm extends React.Component {
    state = { driverLicenceFile: [], vehicleInsuranceFile: [], rcBookFile: [], photoFile: [], legalDocumentFile: [] };
    componentWillMount() {
        userid = this.props.match.params.userid;
        this.props.onGetUser(userid);
        if (!this.props.makeithub || this.props.makeithub.length === 0)
        this.props.onGetMovieitHub();
        
        this.props.onGetZone({ boundaries: 1 });
        
    }
    componentDidUpdate(nextProps, nextState) {
        if (this.props.userAddSuccess) {
            this.props.onFromClear();
            this.props.onClearSuccess();
            this.props.onClearImage();
            this.setState({ driverLicenceFile: [], vehicleInsuranceFile: [], rcBookFile: [], photoFile: [], legalDocumentFile: [] });
            history.goBack();
        }
        if (this.props.userPrefillSuccess) {
            var userData = this.props.viewmoveittuser;
            var initData = {
                userid: userData.userid,

                name: userData.name,
                Vehicle_no: userData.Vehicle_no,
                moveit_hub: userData.moveit_hub||1,
                address: userData.address,

                bank_account_no: userData.bank_account_no,
                bank_name: userData.bank_name,
                bank_holder_name: userData.bank_holder_name,
                ifsc: userData.ifsc,
                branch: userData.branch,

                driver_lic: userData.driver_lic,
                vech_insurance: userData.vech_insurance,
                vech_rcbook: userData.vech_rcbook,
                photo: userData.photo,
                legal_document: userData.legal_document,
                zone:userData.zone,
            }

            if (userData.driver_lic) {
                this.setState({ driverLicenceFile: [{ name: userData.name, preview: userData.driver_lic, size: 0, type: "image/jpeg" }] })
                this.props.onProofImageLoad('driver_lic', userData.driver_lic);
            }
            if (userData.vech_insurance) {
                this.setState({ vehicleInsuranceFile: [{ name: userData.name, preview: userData.vech_insurance, size: 0, type: "image/jpeg" }] })
                this.props.onProofImageLoad('vech_insurance', userData.vech_insurance);
            }
            if (userData.vech_rcbook) {
                this.setState({ rcBookFile: [{ name: userData.name, preview: userData.vech_rcbook, size: 0, type: "image/jpeg" }] })
                this.props.onProofImageLoad('vech_rcbook', userData.vech_rcbook);
            }
            if (userData.photo){
                this.setState({ photoFile: [{ name: userData.name, preview: userData.photo, size: 0, type: "image/jpeg" }] })
                this.props.onProofImageLoad('photo', userData.photo);
            } 
            if (userData.legal_document){
                this.setState({ legalDocumentFile: [{ name: userData.name, preview: userData.legal_document, size: 0, type: "image/jpeg" }] })
                this.props.onProofImageLoad('legal_document', userData.legal_document);
            }

            //this.props.onProductImageLoad('driver_lic', productData.image);
            this.props.initialize(initData);
            this.props.onClearSuccess();
        }
    }

    handleDriverLicence = (newImageFile) => {
        var data = new FormData();
        data.append('lic', newImageFile[0]);
        this.props.onChangeInput('driver_lic', data);
        this.setState({ driverLicenceFile: newImageFile });
    };
    handleVehicleInsurance = (newImageFile) => {
        var data = new FormData();
        data.append('lic', newImageFile[0]);
        this.props.onChangeInput('vech_insurance', data);
        this.setState({ vehicleInsuranceFile: newImageFile });
    };
    handleVechicleRcbook = (newImageFile) => {
        var data = new FormData();
        data.append('lic', newImageFile[0]);
        this.props.onChangeInput('vech_rcbook', data);
        this.setState({ rcBookFile: newImageFile });
    };

    handlePhoto = (newImageFile) => {
        var data = new FormData();
        data.append('lic', newImageFile[0]);
        this.props.onChangeInput('photo', data);
        this.setState({ photoFile: newImageFile });
    };
    handleLegalDocument = (newImageFile) => {
        var data = new FormData();
        data.append('lic', newImageFile[0]);
        this.props.onChangeInput('legal_document', data);
        this.setState({ legalDocumentFile: newImageFile });
    };

    submit = value => {
        var initData = {
            userid: value.userid,

            name: value.name,
            Vehicle_no: value.Vehicle_no,
            moveit_hub: value.moveit_hub,
            zone:value.zone,
            address: value.address,

            bank_account_no: value.bank_account_no,
            bank_name: value.bank_name,
            bank_holder_name: value.bank_holder_name,
            ifsc: value.ifsc,
            branch: value.branch,

            driver_lic: this.props.driver_lic,
            vech_insurance: this.props.vech_insurance,
            vech_rcbook: this.props.vech_rcbook,
            photo: this.props.photo,
            legal_document: this.props.legal_document,
        }
        // if(this.props.vech_insurance)initData.vech_insurance=this.props.vech_insurance
        // if(this.props.vech_rcbook)initData.vech_insurance=this.props.vech_rcbook
        // if(this.props.photo)initData.vech_insurance=this.props.photo
        // if(this.props.legal_document)initData.vech_insurance=this.props.legal_document
        this.props.onSubmit(initData);
    }

    render() {
        var zoneList=this.props.zone_data || []
        if(zoneList.length>0&&AssignZone.length===0){
           AssignZone.push({id:0,Zonename:'None'})
           Array.prototype.push.apply(AssignZone,zoneList);
        }
        
        return (
            <div className="pd-8">
                <Row>
                    <Col lg="12" md="12" sm="12" xs="12">
                        <Card>
                            <CardHeader>Edit MOVIEIT USER
                            <span className="float-right">
                                    <Button className="mr-r-10" onClick={history.goBack}>Back</Button>
                                </span>
                            </CardHeader>
                            <CardBody>
                                <form onSubmit={this.props.handleSubmit(this.submit)} className='edit_makeit_form'>
                                    <Field name="name" type="text" component={renderInputField} label="Username" validate={[required, maxLength60, minLength2]} warn={alphaNumeric} required={true} />
                                    <Field name="Vehicle_no" type="text" component={renderInputField} label="Vehicle No" validate={[required, minLength2]} required={true} />
                                    <Field name="address" type="text" component={renderInputField} label="Address" validate={[required, minLength5]} required={true}/>
                                    {/* <Field name="moveit_hub" component={renderSelect} label="Hub" validate={[required]} >
                                        {listOfHub.map(item =>
                                            <option value={item.id} key={item.id}>
                                                {item.place}
                                            </option>
                                        )}
                                    </Field> */}
                                    <HubFieldView
                    makeithub={this.props.makeithub}/>

                <Field name="zone"  component={renderSelect} label="Zone" validate={[required]}>
                  {AssignZone.map(item => (
                    <option value={item.id} key={item.id}>
                      {item.Zonename}
                    </option>
                  ))}
                </Field>

                                    <div><label className='color-grey'>Bank Account Details :</label></div>
                                    <Field name="bank_holder_name" type="text" component={renderInputField} label="Holder Name" validate={[required, minLength2]} required={true} />
                                    <Field name="bank_account_no" type="number" component={renderInputField} label="Account No" validate={[required, minLength5]} required={true} />
                                    <Field name="bank_name" type="text" component={renderInputField} label="Bank Name" validate={[required, minLength2]} required={true} />
                                    <Field name="branch" type="text" component={renderInputField} label="Branch Name" validate={[required, minLength2]} required={true} />
                                    <Field name="ifsc" type="text" component={renderInputField} label="IFSC Code" validate={[required, minLength2]} required={true} />

                                    {/* <div><label className='color-grey'>Address Details :</label></div>
                                    <Field name="address" type="text" component={renderInputField} label="Address" validate={[required, minLength5]} required={true} /> */}

                                    <Row className='pd-0 mr-t-10 image-upload-parent'>
                                        <label>Proof</label>
                                        <Col lg='10'>
                                            <Row className='pd-10 mr-t-10 image-upload-parent'>
                                                <Col>
                                                    <div className='header'>Driving License <span className='must'>*</span></div>
                                                    <Field
                                                        name="driver_lic"
                                                        component={DropZoneField}
                                                        type="file"
                                                        imagefile={this.state.driverLicenceFile}
                                                        handleOnDrop={this.handleDriverLicence}
                                                        validate={[imageIsRequired]}
                                                    /></Col>
                                                <Col>
                                                    <div className='header'>Vehicle Insurance</div>
                                                    <Field
                                                        name="vech_insurance"
                                                        component={DropZoneField}
                                                        type="file"
                                                        imagefile={this.state.vehicleInsuranceFile}
                                                        handleOnDrop={this.handleVehicleInsurance}
                                                    />
                                                </Col>
                                                <Col>
                                                    <div className='header'>Vehicle RC Book</div>
                                                    <Field
                                                        name="vech_rcbook"
                                                        component={DropZoneField}
                                                        type="file"
                                                        imagefile={this.state.rcBookFile}
                                                        handleOnDrop={this.handleVechicleRcbook}
                                                    />
                                                </Col>
                                                <Col>
                                                    <div className='header'>Photo</div>
                                                    <Field
                                                        name="photo"
                                                        component={DropZoneField}
                                                        type="file"
                                                        imagefile={this.state.photoFile}
                                                        handleOnDrop={this.handlePhoto}
                                                    />
                                                </Col>
                                                <Col>
                                                    <div className='header'>Legal Document</div>
                                                    <Field
                                                        name="legal_document"
                                                        component={DropZoneField}
                                                        type="file"
                                                        imagefile={this.state.legalDocumentFile}
                                                        handleOnDrop={this.handleLegalDocument}
                                                    />
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>

                                    <div className='float-right'>
                                        <Button type="submit" disabled={this.props.pristine || this.props.submitting}>Submit</Button>
                                    </div>
                                </form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

            </div>
        );
    };
}
// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
EditMovieitUserForm = reduxForm({
    form: MOVIEIT_USER_EIDT_FORM // a unique identifier for this form
})(EditMovieitUserForm)
export default connect(mapStateToProps, mapDispatchToProps)(EditMovieitUserForm);