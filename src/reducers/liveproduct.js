import {
  LIVE_PRODUCT_PAGE_LOADED,
  LIVE_PRODUCT_PAGE_UNLOADED,
  LIVE_PRODUCT_LIST,
  LIVE_PRODUCT_ADD_CART,
  LIVE_PRODUCT_REMOVE_CART,
  LIVE_ITEM_QUANTITY_DOWN,
  LIVE_ITEM_QUANTITY_UP,
  LIVE_PRODUCT_FILTER_LIST,
  LIVE_PRODUCT_RESET_CART,
  LIVE_ITEM_QUANTITY_CHECK,
} from '../constants/actionTypes';
const defaultState = {
  productlist: [],
  cartcount: 0,
  cartItems: [],
  cartDetail:{},
  subTotal: 0,
  quantityupdate:false,
  checkout_status:false,
  product_approvel:0,
  islive:false
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case LIVE_PRODUCT_PAGE_LOADED:
      return {
        ...state,
        cartItems:action.cartItem,
        cartcount:action.cartcount,
        cartDetail:action.cartDetail,
        checkout_status:action.checkout_status,
      };
    case LIVE_PRODUCT_PAGE_UNLOADED:
      return defaultState;
    case LIVE_PRODUCT_LIST:
      return {
        ...state,
        productlist: action.payload.result,
      };
      case LIVE_PRODUCT_FILTER_LIST:
      return {
        ...state,
        search:action.search,
        product_approvel:action.product_approvel,
        islive:action.islive
      };
      
    case LIVE_PRODUCT_ADD_CART:
      return {
        ...state,
        cartItems: [...state.cartItems, action.cartItem],
        cartcount: state.cartcount + action.cartItem.cartquantity,
        quantityupdate:true
        //subTotal: state.subTotal + action.cartItem.price
      }
    case LIVE_PRODUCT_REMOVE_CART:
      const cartItemID = action.cartItem.productid
      return {
        ...state,
        cartcount: state.cartcount - action.cartItem.cartquantity,
       // subTotal: state.subTotal - (action.cartItem.quantity * action.cartItem.price),
        cartItems: state.cartItems.filter(item => item.productid !== cartItemID),
        quantityupdate:true
      }
      case LIVE_ITEM_QUANTITY_CHECK:
      return {
        ...state,
        cartDetail:action.payload.result[0],
        checkout_status:action.payload.status,
        quantityupdate:false
      }
    case LIVE_ITEM_QUANTITY_UP:
      return {
        ...state,
        cartItems: state.cartItems.map((item) => {
          if (item.productid === action.cartItem.productid) {
            return Object.assign({}, item, {
              quantity: item.quantity + 1
            })
          }
          return item
        }),
        cartcount: state.cartcount + 1,
        quantityupdate:true
       // subTotal: state.subTotal + (action.cartItem.price)
      }
    case LIVE_ITEM_QUANTITY_DOWN:
      return {
        ...state,
        cartItems: state.cartItems.map((item) => {
          if (item.productid === action.cartItem.productid) {
            return Object.assign({}, item, {
              quantity: item.quantity - 1
            })
          }
          return item
        }),
        cartcount: state.cartcount - 1,
        quantityupdate:true
        //subTotal: state.subTotal - (action.cartItem.price)
      }

      case LIVE_PRODUCT_RESET_CART:
      return {
        ...state,
        cartItems:[], 
        cartDetail:{},
        cartcount: 0,
        subTotal: 0,
      }
    default:
      return state;
  }
};
