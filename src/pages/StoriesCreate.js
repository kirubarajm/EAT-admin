import React from "react";
import { connect } from "react-redux";
import AxiosRequest from "../AxiosRequest";
import { Field, reduxForm } from "redux-form";
import DropZoneField from "../components/dropzoneField";
import renderInputField from "../components/renderInputField";
import DropzoneFieldMultiple from "../components/dropzoneFieldMultiple";
import {
  required,
  maxLength160,
  minLength2,
  alphaNumeric,
  minLength5,
  maxLength4,
  minLength50,
  rating
} from "../utils/Validation";
import { Row, Col, Card, CardHeader, CardBody, Button } from "reactstrap";
import { reset } from "redux-form";
import { STORIES_CREATE_FORM } from "../utils/constant";
import {
  STORIES_CREATE_PAGE_LOAD,
  STORIES_CREATE_PAGE_UNLOAD,
  STORIES_CREATE,
  STORIES_IMAGE_UPLOAD,
  STORIES_FIELD_UPDATE
} from "../constants/actionTypes";
import RatingText from "../components/RatingText";
var storieslist = [1, 1, 1, 1, 1, 1];
const renderSelect = ({
  input,
  label,
  type,
  meta: { touched, error },
  children
}) => (
  <div>
    <label>{label}</label>
    <div>
      <select {...input}>{children}</select>
      {touched && error && <span>{error}</span>}
    </div>
  </div>
);

const InputTextField = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
  ...custom
  //
}) => {
  return (
    <div>
      <label hidden={custom.labeldisable}>
        {label}{" "}
        <span className="must" hidden={!custom.required}>
          *
        </span>
      </label>
      <div>
        <textarea
          {...input}
          placeholder={label}
          type={type}
          autoComplete="off"
          cols={custom.cols}
          rows={custom.rows}
        />
        <span style={{ flex: "0", WebkitFlex: "0", height: "20px" }}>
          {touched &&
            ((error && <span>{error}</span>) ||
              (warning && <span>{warning}</span>))}
        </span>
      </div>
    </div>
  );
};

function HubFieldView(props) {
  if (props.virtualkey === 1) {
    return (
      <Field
        name="makeithub_id"
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
  }
  return <div />;
}

const mapStateToProps = state => ({
  ...state.storiescreate
});

const mapDispatchToProps = dispatch => ({
  onSubmit: formData =>
    dispatch({
      type: STORIES_CREATE,
      payload: AxiosRequest.Stories.storiesCreate(formData)
    }),
  onChangeInput: (key, data) =>
    dispatch({
      type: STORIES_FIELD_UPDATE,
      key,
      payload: AxiosRequest.Makeit.fileUpload(data)
    }),
    onUpdateMenuImages: (index, data) =>
    dispatch({
      type: STORIES_IMAGE_UPLOAD,
      index,
      payload: AxiosRequest.Makeit.fileUpload(data)
    }),
  onFromClear: () => dispatch(reset(STORIES_CREATE_FORM)),
  onClearSuccess: () => dispatch({ type: STORIES_FIELD_UPDATE })
});
class StoriesCreate extends React.Component {
  componentWillMount() {
    this.setState({ thumbImage: [] });
    this.submit = this.submit.bind(this);
  }
  componentDidUpdate(nextProps, nextState) {
    if (this.props.storiesUploadSuccess) {
      this.props.onFromClear();
      this.props.onClearSuccess();
    }
  }

  submit = values => {
    this.props.onSubmit(values);
  };

  handleThumbimage = newImageFile => {
    var data = new FormData();
    data.append("lic", newImageFile[0]);
    this.props.onChangeInput("stories_thumb_image", data);
    this.setState({ thumb: newImageFile });
  };

  handleFirstimage = newImageFile => {
    var data = new FormData();
    data.append("lic", newImageFile[0]);
    this.props.onChangeInput("stories_first_image", data);
    this.setState({ firstImage: newImageFile });
  };

  handleonRemove = (imgid, imgType, index) => {
    const { removeimages } = this.state;
    // this.props.onDeleteMenuImages(imgType, index);
    // if (imgid) {
    //   removeimages.push(imgid);
    //   this.setState({
    //     removeimages
    //   });
    // }
  };

  handleKitchenSpecialitieimages = (newImageFile,index) => {
    var data = new FormData();
    data.append("lic", newImageFile[0]);
    this.props.onUpdateMenuImages(1, data);
  };

  render() {
    return (
      <div className="pd-8">
        <Row>
          <Col lg="12" md="12" sm="12" xs="12">
            <Card>
              <CardHeader>CREATE STORIES</CardHeader>
              <CardBody>
                <form
                  onSubmit={this.props.handleSubmit(this.submit)}
                  className="edit_makeit_form"
                >
                  <Field
                    name="title"
                    type="text"
                    component={renderInputField}
                    label="Stories Title"
                    validate={[required, maxLength160, minLength2]}
                    warn={alphaNumeric}
                    required={true}
                  />

                  <Field
                    name="description"
                    type="text"
                    component={InputTextField}
                    label="Description"
                    validate={[required, minLength2]}
                    required={true}
                  />
                  <Field
                    name="thumb_title"
                    type="text"
                    component={renderInputField}
                    label="Thumb Title"
                    validate={[required, maxLength160, minLength2]}
                    warn={alphaNumeric}
                    required={true}
                  />
                  <Row className="pd-0 mr-t-10 image-upload-parent">
                    <label>Stories Thumb</label>
                    <Col lg="4">
                      <Row className="pd-10 mr-t-10 image-upload-parent">
                        <Field
                          name="thumb"
                          component={DropZoneField}
                          type="file"
                          imagefile={this.state.storiesImage}
                          handleOnDrop={this.handleThumbimage}
                        />
                      </Row>
                    </Col>
                    <label>First Image</label>

                    <Col lg="4">
                      <Row className="pd-10 mr-t-10 image-upload-parent">
                        <Field
                          name="first_image"
                          component={DropZoneField}
                          type="file"
                          imagefile={this.state.firstImage}
                          handleOnDrop={this.handleFirstimage}
                        />
                      </Row>
                    </Col>
                  </Row>

                  <Field
                    name="first_story_duration"
                    type="number"
                    component={RatingText}
                    label="First Story Duration"
                    validate={[required, rating]}
                    required={true}
                  />

                  <Row className="pd-0 mr-t-10 image-upload-parent">
                    <label>Stories List </label>
                    <Col lg="10">
                      <Row className="pd-10 mr-t-10 image-upload-parent ">
                        {storieslist.map((item, i) => (
                          <Col key={i} className="mr-t-10 pd-l-10 pd-b-10 border-1px-blue">
                            <div className="header">
                              {"Stories - " + (i + 1)}
                            </div>
                            <Field
                              name={"ST_" + i}
                              index={i}
                              component={DropzoneFieldMultiple}
                              type="file"
                              imgPrefillDetail={
                                this.props.StoriesUploadList[i]
                                  ? this.props.StoriesUploadList[i]
                                  : ""
                              }
                              handleonRemove={this.handleonRemove}
                              handleOnDrop={()=>this.handleKitchenSpecialitieimages}
                            />

                            <Field
                              name={"title_" + i}
                              type="text"
                              component={renderInputField}
                              label="Title"
                            />

                            <Field
                              name={"subtitle_" + i}
                              type="text"
                              component={renderInputField}
                              label="Subtitle"
                            />

                            <Field
                              name={"mediatype_" + i}
                              component={renderSelect}
                              label="MediaType"
                            >
                              {this.props.mediaType.map(item => (
                                <option value={item.id} key={item.id}>
                                  {item.name}
                                </option>
                              ))}
                            </Field>

                            <Field
                              name={"cat_type_" + i}
                              component={renderSelect}
                              label="Catorgey"
                            >
                              {this.props.cateType.map(item => (
                                <option value={item.id} key={item.id}>
                                  {item.name}
                                </option>
                              ))}
                            </Field>

                            <Field
                              name={"cat_id_" + i}
                              type="number"
                              component={RatingText}
                              label="Catorgey ID"
                            />

                            <Field
                              name={"duration_" + i}
                              type="number"
                              component={RatingText}
                              label="Duration"
                            />
                          </Col>
                        ))}
                      </Row>
                    </Col>
                  </Row>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
StoriesCreate = reduxForm({
  form: STORIES_CREATE_FORM // a unique identifier for this form
})(StoriesCreate);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StoriesCreate);
