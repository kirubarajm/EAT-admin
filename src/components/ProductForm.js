import React from "react";
import { Field, reduxForm, change } from "redux-form";
import { connect } from "react-redux";
import Select from "react-dropdown-select";
import {
  MAKEIT_PRODUCT_CLEAR,
  MAKEIT_PRODUCT_LOAD,
  MAKEIT_PRODUCT_ADD,
  MAKEIT_PRODUCT_IMAGE,
  MAKEIT_PRODUCT_ITEM_ADD,
  MAKEIT_PRODUCT_ITEM_REMOVE,
  MAKEIT_PRODUCT_ITEM_UP,
  MAKEIT_PRODUCT_ITEM_DOWN,
  MAKEIT_PRODUCT_LIVE,
  MAKEIT_ADD_ITEMS_ALL,
  MAKEIT_PRODUCT_IMAGE_PRE_LOAD,
  MAKEIT_PRODUCT_FORM_CLEAR,
  MAKEIT_PRODUCT_FORM_LOAD,
  MAKEIT_GET_CUISINE,
  MAKEIT_ITEM_LIST,
  MAKEIT_PACKAGE_ITEMS_ADD_ALL,
  MAKEIT_PACKAGE_ITEM_ADD,
  MAKEIT_PACKAGE_ITEM_REMOVE,
  MAKEIT_PACKAGE_ITEM_COUNT_UP,
  MAKEIT_PACKAGE_ITEM_COUNT_DOWN,
  PACKAGE_BOX_LIST_MAP_PRODUCT,
  MAKEIT_GET_PRODUCT_TAG
} from "../constants/actionTypes";
import AxiosRequest from "../AxiosRequest";
import {
  Button,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import DropZoneField from "./dropzoneField";
import renderInputField from "./renderInputField";
import { reset, initialize } from "redux-form";
import {
  required,
  minLength2,
  alphaNumeric,
  imageIsRequired
} from "../utils/Validation";
import { MAKEIT_PRODUCT_FORM } from "../utils/constant";
import AutoCompleteInput from "./AutoCompleteInput";
import { FaTrash } from "react-icons/fa";
import AutoCompleteInputBox from "./AutoCompleteInputBox";
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
  );
};
const InputField = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
  ...custom
  //
}) => {
  return (
    <div>
      <label>
        {label}{" "}
        <span className="must" hidden={!custom.required}>
          *
        </span>
      </label>
      <div>
        {" "}
        <input
          {...input}
          placeholder={label}
          type={type}
          autoComplete="off"
          onWheel={event => {
            event.preventDefault();
          }}
          style={{ width: "250px" }}
        />
        {touched &&
          ((error && <span>{error}</span>) ||
            (warning && <span>{warning}</span>))}
      </div>
    </div>
  );
};

const Checkbox = ({ input, meta: { touched, error }, ...custom }) => (
  <div style={{ border: touched && error ? "1px solid red" : "none" }}>
    <input type="checkbox" {...input} />
  </div>
);

const InputSearchDropDown = ({
  onSelection,
  options,
  label,
  labelField,
  searchable,
  searchBy,
  values,
  disabled,
  clearable,
  noDataLabel,
  valueField
}) => {
  return (
    <div>
    <label>
      {label}{" "}
      <span className="must">
        *
      </span>
    </label>
    <div>
    <Select
      options={options}
      labelField={labelField}
      searchable={searchable}
      searchBy={searchBy}
      values={[...values]}
      clearable={clearable}
      noDataLabel={noDataLabel}
      valueField={valueField}
      dropdownHeight={'300px'}
      disabled={disabled}
      onChange={(value) => {
        onSelection(value);
      }}
    /></div>
    </div>
  );
};

// const renderSelect = ({
//   input,
//   label,
//   type,
//   meta: { touched, error },
//   children,
//   cusinieList
// }) => (
//   <div>
//     <label>
//       {label} <span className="must">*</span>
//     </label>
//     <div>
//     {cusinieList.map(item => (
//               <option value={item.cuisineid} key={item.cuisineid}>
//                 {item.cuisinename}
//               </option>
//             ))}
//       <select {...input}>{children}</select>
//       {touched && error && <span>{error}</span>}
//     </div>
//   </div>
// );

export const CHECKBOX = "CHECKBOX";
export const CHECKBOXES = "CHECKBOXES";

const adapter = props => {
  return (
    <div className="check-group">
      {props.options.map((option, index) => (
        <label key={index}>
          <Field
            name={option.name}
            label={option.label}
            type="checkbox"
            onChange={props.itemCheck}
            component={Checkbox}
          />
          <span> </span>
          {option.label}
        </label>
      ))}
    </div>
  );
};

var weekdayOptions = [
  { value: true, label: "All", name: "alldays" },
  { value: false, label: "Mon", name: "monday" },
  { value: false, label: "Tues", name: "tuesday" },
  { value: false, label: "Wed", name: "wednesday" },
  { value: false, label: "Thu", name: "thrusday" },
  { value: false, label: "Fri", name: "friday" },
  { value: false, label: "Sat", name: "saturday" },
  { value: false, label: "Sun", name: "sunday" }
];

var foodcycleOptions = [
  { value: true, label: "All", name: "allcycle" },
  { value: false, label: "Breakfast", name: "breakfast" },
  { value: false, label: "Lunch", name: "lunch" },
  { value: false, label: "Dinner", name: "dinner" }
];

const mapStateToProps = state => ({
  ...state.product,
  AllItems: state.makeitprocess.makeit_Item_list,
  cusinieList: state.common.cusinieList
  
});

const mapDispatchToProps = dispatch => ({
  onPageLoad: () => dispatch({ type: MAKEIT_PRODUCT_FORM_LOAD }),
  onGetUser: id =>
    dispatch({
      type: MAKEIT_PRODUCT_LOAD,
      payload: AxiosRequest.MakeitProcess.getsingleProdcut(id)
    }),
  onGetCuisine: () =>
    dispatch({
      type: MAKEIT_GET_CUISINE,
      payload: AxiosRequest.Master.getCuisine()
    }),
    onGetProductTag: () =>
    dispatch({
      type: MAKEIT_GET_PRODUCT_TAG,
      payload: AxiosRequest.Master.getProductTag()
    }),
    onGetPackage: (userid) =>
    dispatch({
      type: PACKAGE_BOX_LIST_MAP_PRODUCT,
      payload: AxiosRequest.PackageInventory.getPackageInvetoryMappedList(userid)
    }),
  onSubmit: formData =>
    dispatch({
      type: MAKEIT_PRODUCT_ADD,
      payload: AxiosRequest.MakeitProcess.addProduct(formData)
    }),
  onUpdate: formData =>
    dispatch({
      type: MAKEIT_PRODUCT_ADD,
      payload: AxiosRequest.MakeitProcess.editProduct(formData)
    }),
  onProductImage: (key, data) =>
    dispatch({
      type: MAKEIT_PRODUCT_IMAGE,
      key,
      payload: AxiosRequest.Makeit.fileUpload(data)
    }),
  onProductImageLoad: (key, data) =>
    dispatch({ type: MAKEIT_PRODUCT_IMAGE_PRE_LOAD, key, data }),
  onAddProductQuantity: data =>
    dispatch({
      type: MAKEIT_PRODUCT_LIVE,
      payload: AxiosRequest.MakeitProcess.movetolive(data)
    }),
  onProductItemAddALL: Item => dispatch({ type: MAKEIT_ADD_ITEMS_ALL, Item }),
  onProductItemAdd: Item => dispatch({ type: MAKEIT_PRODUCT_ITEM_ADD, Item }),
  onProductItemRemove: Item =>
    dispatch({ type: MAKEIT_PRODUCT_ITEM_REMOVE, Item }),
  onQuantityUp: Item => dispatch({ type: MAKEIT_PRODUCT_ITEM_UP, Item }),
  onQuantityDown: Item => dispatch({ type: MAKEIT_PRODUCT_ITEM_DOWN, Item }),

  onPackageItemAddALL: packageItem =>
    dispatch({ type: MAKEIT_PACKAGE_ITEMS_ADD_ALL, packageItem }),
  onPackageItemAdd: packageItem =>
    dispatch({ type: MAKEIT_PACKAGE_ITEM_ADD, packageItem }),
  onPackageItemRemove: packageItem =>
    dispatch({ type: MAKEIT_PACKAGE_ITEM_REMOVE, packageItem }),
  onPackageCountUp: packageItem =>
    dispatch({ type: MAKEIT_PACKAGE_ITEM_COUNT_UP, packageItem }),
  onPackageCountDown: packageItem =>
    dispatch({ type: MAKEIT_PACKAGE_ITEM_COUNT_DOWN, packageItem }),

  onFromClear: () => dispatch(reset(MAKEIT_PRODUCT_FORM)),
  onLocalFromClear: () => dispatch({ type: MAKEIT_PRODUCT_FORM_CLEAR }),
  onFromLoad: productData =>
    dispatch(initialize(MAKEIT_PRODUCT_FORM, productData)),
  onClearSuccess: () => dispatch({ type: MAKEIT_PRODUCT_CLEAR }),
  onGetItem: makeitid =>
    dispatch({
      type: MAKEIT_ITEM_LIST,
      payload: AxiosRequest.MakeitProcess.getAllItem(makeitid)
    })
});
var userId, productId, isEdit;
var tempAmount = 0;
var virtualkey=0;
var makeit_type=0;
class ProductForm extends React.Component {
  state = { product_image: [],cusinie_values:[],producttag_values:[{
    "product_tag": 0,
    "product_tag_name": 'None'  
  }],product_tag:0 };
  componentWillMount() {
    userId = this.props.userId;
    productId = this.props.productId;
    isEdit = this.props.isEdit;
    virtualkey = this.props.virtualkey || 0;
    makeit_type = this.props.makeit_type || 0;
    if (this.props.cusinieList) this.props.onGetCuisine();
    if (!this.props.producttagList||this.props.producttagList.length == 0) this.props.onGetProductTag();
    if (!this.props.Items) this.props.onGetItem(userId);
    if (isEdit) this.props.onGetUser(productId);
    else this.props.onPageLoad();
    if(virtualkey===0&&makeit_type!==1) 
    this.props.onGetPackage(userId);

    this.handleProductImage = this.handleProductImage.bind(this);
    this.addItem = this.addItem.bind(this);
    this.addPackage =this.addPackage.bind(this);
    this.downQuantity = this.downQuantity.bind(this);
    this.upQuantity = this.upQuantity.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.downPackageCount=this.downPackageCount.bind();
    this.upPackageCount=this.upPackageCount.bind();
    this.removePackageItem=this.removePackageItem.bind();
    this.toggleLive = this.toggleLive.bind(this);
    this.toggleCount = this.toggleCount.bind(this);
    this.addCount = this.addCount.bind(this);
    this.formClearAndClose = this.formClearAndClose.bind(this);
    this.foodCycleCheck = this.foodCycleCheck.bind(this);
    this.onAddDescripation = this.onAddDescripation.bind(this);
    this.daysCheck = this.daysCheck.bind(this);
    this.setState({
      isFoodCycle: true,
      isDays: true,
      isItems: true,
      isPackageItems: true,
      liveModal: false,
      countModal: false,
      alldays: false
    });
  }
  componentDidUpdate(nextProps, nextState) {
    if (this.props.productAddSuccess) {
      this.props.onClearSuccess();
      if (!isEdit) this.toggleLive();
      else {
        this.formClearAndClose();
      }
    }

    if (this.props.itemTotalAmount !== tempAmount) {
      tempAmount = this.props.itemTotalAmount;
      this.onAddDescripation();
    }

    if (this.props.productMoveToLive) {
      this.toggleRemoveAll();
      this.props.onClearSuccess();
      this.props.onFromClear();
      this.props.update();
    }

    if (this.props.productPrefillSuccess) {
      var productData = this.props.productdetail;
      if (productData.image && productData.image !== "null") {
        productData.product_image = [
          {
            name: productData.product_name,
            preview: productData.image,
            size: 0,
            type: "image/jpeg"
          }
        ];
        this.setState({
          product_image: [
            {
              name: productData.product_name,
              preview: productData.image,
              size: 0,
              type: "image/jpeg"
            }
          ], 
        });
        this.props.onProductImageLoad("product_image", productData.image);
      }
     
      if(productData.cuisine){
        this.setState({
          cusinie_values:[{cuisinename:productData.cuisinename,cuisineid:productData.cuisine}]
        });
        
      }

      if(productData.product_tag){
        this.setState({
          producttag_values:[{product_tag_name:productData.product_tag_name,product_tag:productData.product_tag}]
        });
        
      }
      this.props.onFromLoad(productData);
      this.props.onProductItemAddALL(productData.items);
      if (productData.packageItems&&virtualkey===0&&makeit_type!==1)
        this.props.onPackageItemAddALL(productData.packageItems);
      this.onPreFillCheckBox(productData);
      this.props.onClearSuccess();
    }
  }

  onPreFillCheckBox(productData) {
    var isAllCycle = true;
    var isAlldays = true;
    if (productData.breakfast) foodcycleOptions[1].value = true;
    if (productData.lunch) foodcycleOptions[2].value = true;
    if (productData.dinner) foodcycleOptions[3].value = true;
    foodcycleOptions.forEach(cycle => {
      if (!cycle.value) isAllCycle = false;
    });
    this.props.change("allcycle", isAllCycle);

    if (productData.monday) weekdayOptions[1].value = true;
    if (productData.tuesday) weekdayOptions[2].value = true;
    if (productData.wednesday) weekdayOptions[3].value = true;
    if (productData.thrusday) weekdayOptions[4].value = true;
    if (productData.friday) weekdayOptions[5].value = true;
    if (productData.saturday) weekdayOptions[6].value = true;
    if (productData.sunday) weekdayOptions[7].value = true;

    weekdayOptions.forEach(weekday => {
      if (!weekday.value) isAlldays = false;
    });
    this.props.change("alldays", isAlldays);
  }

  handleProductImage = newImageFile => {
    var data = new FormData();
    data.append("lic", newImageFile[0]);
    if (newImageFile[0].size !== 0) {
      this.props.onProductImage("product_image", data);
      this.setState({ product_image: newImageFile });
    }
  };
  onCheckValue = value => {
    return value ? 1 : 0;
  };

  formClearAndClose() {
    this.toggleRemoveAll();
    this.props.onClearSuccess();
    this.props.onFromClear();
    this.props.onLocalFromClear();
    this.props.update();
  }

  submit = data => {
    var values = {};
    var tempData = this.props.ItemList;
    var tempPackageData = this.props.PackageList;
   
    if (!tempData || tempData.length === 0) {
      this.setState({ isItems: false });
      return;
    }
  //   else if ((virtualkey===0&&makeit_type!==1) && (!tempPackageData || tempPackageData.length === 0)) {
  //   this.setState({ isPackageItems: false });
  //   return;
  // } 
  else if (!data.breakfast && !data.lunch && !data.dinner) {
      this.setState({ isFoodCycle: false });
      return;
    } else if (
      !data.monday &&
      !data.tuesday &&
      !data.wednesday &&
      !data.thrusday &&
      !data.friday &&
      !data.saturday &&
      !data.sunday
    ) {
      this.setState({ isDays: false });
      return;
    }
    values.makeit_userid = userId;
    values.image = this.props.product_image;
    values.prod_desc = data.prod_desc;

    //values.vegtype = 0;
    //values.price = this.props.itemTotalAmount;
    values.active_status = 0;
    values.cuisine = 1;
    values.product_tag = this.state.product_tag;
    values.items = [];
    if(virtualkey===0 && makeit_type!==1)
    values.packageItems= tempPackageData;
    var itemTotalAmount = 0;
    for (var i = 0; i < tempData.length; i++) {
      itemTotalAmount =
        itemTotalAmount + tempData[i].price * tempData[i].quantity;
      values.items.push({
        itemid: tempData[i].menuitemid,
        quantity: tempData[i].quantity
      });
    }
    //values.price = itemTotalAmount;
    values.breakfast = this.onCheckValue(data.breakfast);
    values.lunch = this.onCheckValue(data.lunch);
    values.dinner = this.onCheckValue(data.dinner);
    values.monday = this.onCheckValue(data.monday);
    values.tuesday = this.onCheckValue(data.tuesday);
    values.wednesday = this.onCheckValue(data.wednesday);
    values.thrusday = this.onCheckValue(data.thrusday);
    values.friday = this.onCheckValue(data.friday);
    values.saturday = this.onCheckValue(data.saturday);
    values.sunday = this.onCheckValue(data.sunday);
    values.cuisine = this.state.cuisineid;//data.cuisine;
     values.product_tag = this.state.product_tag;
    values.product_name = data.product_name;
    if (isEdit) {
      values.productid = data.productid;
      this.props.onUpdate(values);
    } else this.props.onSubmit(values);
  };

  addItem = item => {
    this.setState({ isItems: true });
    var isAlready = false;
    this.props.ItemList.map(Item => {
      if (Item.menuitemid === item.menuitemid) {
        isAlready = true;
      }
      return Item;
    });
    if (!isAlready) {
      item.quantity = 1;
      this.props.onProductItemAdd(item);
    }
  };

  downQuantity = item => {
    if (item.quantity === 1) this.props.onProductItemRemove(item);
    else this.props.onQuantityDown(item);
  };

  upQuantity = item => {
    this.props.onQuantityUp(item);
  };

  removeItem = item => {
    this.props.onProductItemRemove(item);
  };

  addPackage = item => {
    this.setState({ isPackageItems: true });
    var isPackageAlready = false;
    this.props.PackageList.map(packageItem => {
      if (packageItem.id === item.id) {
        isPackageAlready = true;
      }
      return packageItem;
    });
    if (!isPackageAlready) {
      item.count = 1;
      this.props.onPackageItemAdd(item);
    }
  };

  downPackageCount = item => {
    if (item.count === 1) this.props.onPackageItemRemove(item);
    else this.props.onPackageCountDown(item);
  };

  upPackageCount = item => {
    this.props.onPackageCountUp(item);
  };

  removePackageItem = item => {
    this.props.onPackageItemRemove(item);
  };

  onAddDescripation = () => {
    if (this.props.ItemList) {
      var des = "";
      this.props.ItemList.map(item => {
        if (item.quantity > 1)
          des = des + item.menuitem_name + " x " + item.quantity + "" + ", ";
        else des = des + item.menuitem_name + ", ";
      });
      des = des.length > 2 ? des.slice(0, des.length - 2) : "";
      this.props.dispatch(change(MAKEIT_PRODUCT_FORM, "prod_desc", des));
    }
  };

  toggleCount = () => {
    this.setState(prevState => ({
      countModal: !prevState.countModal,
      liveModal: false
    }));
  };

  toggleRemoveAll() {
    this.setState({
      countModal: false,
      liveModal: false
    });
  }
  toggleLive = () => {
    this.setState(prevState => ({
      liveModal: !prevState.liveModal,
      countModal: false
    }));
  };

  addCount(value) {
    this.props.onAddProductQuantity({
      productid: this.props.productid,
      quantity: value.quantity,
      active_status: 1,
      makeit_userid: userId
    });
  }

  resetForm = () => {
    this.setState({ product_image: [] });
    this.props.onFromClear();
    this.props.onLocalFromClear();
  };
  foodCycleCheck = e => {
    var isAllCycle = true;
    this.setState({ isFoodCycle: true });
    if (e.target.name === "allcycle") {
      foodcycleOptions.forEach(cycle => (cycle.value = e.target.checked));
      this.props.change("breakfast", e.target.checked);
      this.props.change("lunch", e.target.checked);
      this.props.change("dinner", e.target.checked);
    } else {
      foodcycleOptions.forEach(cycle => {
        if (cycle.name === e.target.name) cycle.value = e.target.checked;
        if (!cycle.value) isAllCycle = false;
      });
      this.props.change("allcycle", isAllCycle);
    }
  };

  daysCheck = e => {
    var isAlldays = true;
    this.setState({ isDays: true });
    if (e.target.name === "alldays") {
      weekdayOptions.forEach(weekday => (weekday.value = e.target.checked));
      this.props.change("monday", e.target.checked);
      this.props.change("tuesday", e.target.checked);
      this.props.change("wednesday", e.target.checked);
      this.props.change("thrusday", e.target.checked);
      this.props.change("friday", e.target.checked);
      this.props.change("saturday", e.target.checked);
      this.props.change("sunday", e.target.checked);
    } else {
      weekdayOptions.forEach(weekday => {
        if (weekday.name === e.target.name) weekday.value = e.target.checked;
        if (!weekday.value) isAlldays = false;
      });
      this.props.change("alldays", isAlldays);
    }
  };

  selectedCuisineItem = values => {
    if(!values || values.length==0) return;
    this.props.change("cuisine", values[0].cuisineid);
    var cuisineid = values[0].cuisineid;
    this.setState({cuisineid: cuisineid});
  };

  selectedProducttag = values => {
    if(!values || values.length==0) return;
    this.props.change("product_tag_name", values[0].product_tag);
    var product_tag =values[0].product_tag;
    this.setState({product_tag: product_tag});
  };

  render() {
    //validate={[imageIsRequired]}
    const pristine = isEdit ? false : this.props.pristine;
    const submitting = this.props.submitting;
    const handleSubmit = this.props.handleSubmit;
    const ItemList = this.props.ItemList || [];
    const PackageList = this.props.PackageList || [];
    const PackageMasterList = this.props.PackageMasterList || [];
    if (!isEdit && this.props.cusinieList.length !== 0)
      this.props.change("cuisine", this.props.cusinieList[0].cuisineid);
    
    if (!isEdit && this.props.producttagList.length !== 0)
      this.props.change("product_tag_name", this.props.producttagList[0].product_tag);
    
    return (
      <div>
        <form onSubmit={handleSubmit(this.submit)} className="product_form">
          <Field
            name="product_image"
            component={DropZoneField}
            type="file"
            imagefile={this.state.product_image}
            handleOnDrop={this.handleProductImage}
          />

          <Field
            name="product_name"
            autoComplete="off"
            type="text"
            component={InputField}
            label="Product Name"
            validate={[required, minLength2]}
            required={true}
          />

          {/* <Field name="cuisine" component="select">
            <option value="">Select a cuisine...</option>
            {this.props.cusinieList.map(item =>
              <option value={item.cuisineid} key={item.cuisineid}>{item.cuisinename}</option>)}
          </Field> */}

<Field
          name="product tag"
          component={InputSearchDropDown}
          options={this.props.producttagList}
          labelField="product_tag_name"
          searchable={true}
          clearable={true}
          searchBy="product_tag_name"
          valueField="product_tag"
          noDataLabel="No matches found"
          values={this.state.producttag_values}
          onSelection={this.selectedProducttag}
          label="Product tag name"
        />




<Field
          name="cuisine"
          component={InputSearchDropDown}
          options={this.props.cusinieList}
          labelField="cuisinename"
          searchable={true}
          clearable={true}
          searchBy="cuisinename"
          valueField="cuisineid"
          noDataLabel="No matches found"
          values={this.state.cusinie_values}
          onSelection={this.selectedCuisineItem}
          label="Cuisine name"
        />
          {/*<Field
            name="cuisine"
            component={renderSelect}
            cusinieList={this.props.cusinieList}
            label="Cuisine"
            validate={[required]}
          >
            {/* {this.props.cusinieList.map(item => (
              <option value={item.cuisineid} key={item.cuisineid}>
                {item.cuisinename}
              </option>
            ))}
          </Field>*/}

          <div>
            <label>
              Add Item <span className="must">*</span>
            </label>
            <div
              className="auto-complete"
              style={{ border: !this.state.isItems ? "1px solid red" : "none" }}
            >
              <AutoCompleteInput
                Items={this.props.AllItems}
                addItem={this.addItem}
              />
              {/* <button>add</button> */}
            </div>
          </div>

          <div>
            <label />
            <div>
              {!this.state.isItems && (
                <span style={{ color: "red" }}>
                  Please select product items
                </span>
              )}
            </div>
          </div>

          <div>
            <label>Product Items</label>{" "}
          </div>
          <div>
            <div className="item_list">
              {ItemList.map((item, i) => (
                <Row className="list-text cart-item max-height-50" key={i}>
                  <Col lg="6">
                    <div className="font-size-16"> {item.menuitem_name}</div>
                  </Col>
                  <Col className="txt-align-right" lg="4">
                    <div className="inc_dec_button">
                      <span
                        className="dec"
                        onClick={() => this.downQuantity(item)}
                      >
                        -
                      </span>
                      <span className="count">{item.quantity}</span>
                      <span
                        className="inc"
                        onClick={() => this.upQuantity(item)}
                      >
                        +
                      </span>
                    </div>
                  </Col>
                  <Col className="txt-align-right" lg="2">
                    <FaTrash
                      className="makeit-process-action"
                      size={15}
                      onClick={() => this.removeItem(item)}
                    />
                  </Col>
                </Row>
              ))}
            </div>
          </div>
          <div>
            <label>
              Description <span className="must">*</span>{" "}
            </label>
          </div>
          <div>
            <Field
              name="prod_desc"
              type="text"
              component={InputTextField}
              validate={[required]}
              cols="40"
              rows="3"
            />
          </div>
            {/* <div hidden={virtualkey===1 || makeit_type===1} >
            <label>
              Add Package <span className="must">*</span>
            </label>
            <div
              className="package-complete"
              style={{ border: !this.state.isPackageItems ? "1px solid red" : "none" }}
            >
              <AutoCompleteInputBox
                Items={PackageMasterList}
                addItem={this.addPackage}
                placeholder="search box"
              />
            </div>
          </div>
            <div hidden={virtualkey===1 || makeit_type===1}>
            <label />
            <div>
              {!this.state.isPackageItems && (
                <span style={{ color: "red" }}>
                  Please select package items
                </span>
              )}

              {PackageMasterList.length==0 && (
                <span style={{ color: "red" }}>
                  Please add package inventory
                </span>
              )}
            </div>
          </div>
            <div hidden={virtualkey===1 || makeit_type===1}>
            <label>Package Detail</label>{" "}
          </div>
            <div hidden={virtualkey===1 || makeit_type===1}>
            <div className="item_list">
              {PackageList.map((item, i) => (
                <Row className="list-text cart-item max-height-50" key={i}>
                  <Col lg="6">
                    <div className="font-size-16"> {item.name}</div>
                  </Col>
                  <Col className="txt-align-right" lg="4">
                    <div className="inc_dec_button">
                      <span
                        className="dec"
                        onClick={() => this.downPackageCount(item)}
                      >
                        -
                      </span>
                      <span className="count">{item.count}</span>
                      <span
                        className="inc"
                        onClick={() => this.upPackageCount(item)}
                      >
                        +
                      </span>
                    </div>
                  </Col>
                  <Col className="txt-align-right" lg="2">
                    <FaTrash
                      className="makeit-process-action"
                      size={15}
                      onClick={() => this.removePackageItem(item)}
                    />
                  </Col>
                </Row>
              ))}
            </div>
          </div> */}
          <div>
            <label>Food Cycle</label>
          </div>
          <div
            style={{
              border: !this.state.isFoodCycle ? "1px solid red" : "none"
            }}
          >
            <Field
              name="foodcycle"
              component={adapter}
              options={foodcycleOptions}
              itemCheck={this.foodCycleCheck}
            />
          </div>
          {!this.state.isFoodCycle && (
            <span style={{ color: "red", fontSize: "smaller" }}>
              Please select food cycle
            </span>
          )}
          <div>
            <label>Select Days</label>
          </div>
          <div
            style={{ border: !this.state.isDays ? "1px solid red" : "none" }}
          >
            <Field
              name="weekdays"
              label="Weekdays"
              component={adapter}
              options={weekdayOptions}
              itemCheck={this.daysCheck}
            />
          </div>
          {!this.state.isDays && (
            <span style={{ color: "red", fontSize: "smaller" }}>
              Please select days
            </span>
          )}

          <div className="float-right">
            <Button type="submit" disabled={pristine || submitting}>
              Submit
            </Button>
            <Button
              type="button"
              disabled={pristine || submitting}
              onClick={this.resetForm}
              className="mr-l-10"
              hidden={isEdit}
            >
              Clear
            </Button>
          </div>
        </form>
        <Modal isOpen={this.state.liveModal} toggle={this.toggleLive} className="add_live_modal" backdrop={"static"}>
          <ModalBody>ADD TO LIVE PRODUCT LIST</ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggleCount}>
              Yes
            </Button>{" "}
            <Button color="secondary" onClick={this.formClearAndClose}>
              NO
            </Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.countModal} toggle={this.toggleCount} className="add_live_modal"
          backdrop={"static"}
        >
          <ModalHeader>ENTER QUANTITY</ModalHeader>
          <ModalBody>
            <form
              onSubmit={handleSubmit(this.addCount)}
              className="product_form"
            >
              <Field
                name="quantity"
                type="number"
                component={renderInputField}
                label="Enter the quantity for live"
                validate={[required]}
              />
              <div className="float-right">
                <Button type="submit" disabled={pristine || submitting}>
                  Submit
                </Button>
              </div>
            </form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
ProductForm = reduxForm({
  form: MAKEIT_PRODUCT_FORM // a unique identifier for this form
})(ProductForm);
export default connect(mapStateToProps, mapDispatchToProps)(ProductForm);
