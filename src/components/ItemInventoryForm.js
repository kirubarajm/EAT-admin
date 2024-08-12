
import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { MAKEIT_ITEM_CLEAR, MAKEIT_ITEM_LOAD, MAKEIT_ITEM_ADD } from '../constants/actionTypes';
import AxiosRequest from '../AxiosRequest';
import {
  Button,
} from 'reactstrap';
import renderInputField from './renderInputField'
import { reset } from 'redux-form';
import { required, maxLength15, minLength2, alphaNumeric, number } from '../utils/Validation'
import { MAKEIT_ITEM_INVENTORY_FORM } from '../utils/constant';


const mapStateToProps = state => ({ ...state.iteminventory });

const mapDispatchToProps = dispatch => ({
  onGetUser: (id) =>
    dispatch({ type: MAKEIT_ITEM_LOAD, payload: AxiosRequest.MakeitProcess.getsingleItem(id) }),
  onSubmit: (formData) =>
    dispatch({ type: MAKEIT_ITEM_ADD, payload: AxiosRequest.MakeitProcess.addItem(formData) }),
  onUpdate: (formData) =>
    dispatch({ type: MAKEIT_ITEM_ADD, payload: AxiosRequest.MakeitProcess.editItem(formData) }),
  onFromClear: () =>
    dispatch(reset(MAKEIT_ITEM_INVENTORY_FORM)),
  onClearSuccess: () =>
    dispatch({ type: MAKEIT_ITEM_CLEAR }),
});
const InputField = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
  ...custom
  // 
}) => {
 return (<div>
    <label>{label} <span className='must' hidden={!custom.required}>*</span></label>
    <div> <input {...input} placeholder={label} type={type} autoComplete="off" onWheel={event => { event.preventDefault(); }} style={{width:"250px"}}/>
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>);
}

var userId,itemId,isEdit;
class ItemInventoryForm extends React.Component {
  componentWillMount() {
    userId = this.props.userId;
    itemId =this.props.itemId;
    isEdit = this.props.isEdit;
    if(isEdit) this.props.onGetUser(itemId);
  }
  componentDidUpdate(nextProps, nextState) {
    if (this.props.itemAddSuccess) {
      this.props.onFromClear();
      this.props.onClearSuccess();
      this.props.update();
    }
    if (this.props.itemPrefillSuccess) {
      var userData = this.props.itemdetail;
      var initData = {
        makeit_userid: userData.makeit_userid,
        menuitemid: userData.menuitemid,
        menuitem_name: userData.menuitem_name,
        price: userData.price,
        vegtype:userData.vegtype==='0'?'Veg':'Non Veg',
      }
      this.props.initialize(initData);
      this.props.onClearSuccess();
    }
  }

  submit = values => {
    values.makeit_userid=userId
    values.vegtype=values.vegtype==='Veg'?0:1
    values.active_status=1;
    console.log(values);
     if(isEdit) this.props.onUpdate(values);
     else this.props.onSubmit(values);
  }
  render(){
    const pristine=this.props.pristine;
    const submitting=this.props.submitting;
    const handleSubmit=this.props.handleSubmit;
    return (
      <form onSubmit={handleSubmit(this.submit)}>
        <Field name="menuitem_name" type="text" component={InputField} label="Item Name" validate={[required, minLength2]} />
        <Field name="price" type="number" component={InputField} label="Item Price" validate={[required]}
          warn={number} />
        <div>
          <label>Item Type</label>
          <div className='radio-group'>
            <label><Field name="vegtype" component={renderInputField} type="radio" value="Veg" /> Veg</label>
            <label><Field name="vegtype" component={renderInputField} type="radio" value="Non Veg" /> Non Veg</label>
          </div>
        </div>
        <div className='float-right'>
          <Button type="submit" disabled={pristine || submitting}>Submit</Button>
          <Button type="button" disabled={pristine || submitting} onClick={reset} className='mr-l-10' hidden={isEdit}>Clear</Button>
        </div>
      </form>
    )
  }
}

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
ItemInventoryForm = reduxForm({
  form: MAKEIT_ITEM_INVENTORY_FORM // a unique identifier for this form
})(ItemInventoryForm)
export default connect(mapStateToProps, mapDispatchToProps)(ItemInventoryForm);
