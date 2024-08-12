import AxiosRequest from './AxiosRequest';
import {
  ASYNC_START,
  ASYNC_END,
  LOGIN,
  LOGOUT,
  CART_TIEM_STORE,
  TOAST_SHOW,
  CHECKOUT_ORDER_SUCCESS,
  LIVE_PRODUCT_PAGE_UNLOADED,
  LIVE_PRODUCT_RESET_CART,
  MAKEIT_GET_CUISINE,
  MAKEIT_GET_REGION,
  ADMIN_EAT_ADDRESS
} from './constants/actionTypes';
import { LoginType } from './utils/constant';
const promiseMiddleware = store => next => action => {
  if (isPromise(action.payload)) {
    store.dispatch({ type: ASYNC_START, subtype: action.type });

    const currentView = store.getState().viewChangeCounter;
    const skipTracking = action.skipTracking;

    action.payload.then(
      res => {
        const currentState = store.getState()
        if (!skipTracking && currentState.viewChangeCounter !== currentView) {
          return
        }
        console.log('RESULT', res);
        action.payload = res;
        store.dispatch({ type: ASYNC_END, promise: action.payload });
        if(res.message)
        store.dispatch({ type: TOAST_SHOW, message: res.message });
        store.dispatch(action);
      },
      error => {
        const currentState = store.getState()
        if (!skipTracking && currentState.viewChangeCounter !== currentView) {
          return
        }
        console.log('ERROR', error);
        action.error = true;
        if(error.response!==undefined)
        action.payload = error.response;
        else action.payload =error.message;
        if (!action.skipTracking) {
          store.dispatch({ type: ASYNC_END, promise: action.payload });
        }
        if(error.response&&error.response.data&&error.response.data.message)
        store.dispatch({ type: TOAST_SHOW, message: error.response.data.message });
        
        store.dispatch(action);
      }
    );

    return;
  }

  next(action);
};

const localStorageMiddleware = store => next => action => {
  if (action.type === LOGIN) {
    if (!action.error) {
      window.localStorage.setItem('login_detail',JSON.stringify({loginsuccess:action.payload.status,logindetail:action.payload.result[0]}));
      AxiosRequest.setToken(action.payload);
    }
  } else if (action.type === LOGOUT) {
    window.localStorage.setItem('login_detail', '');
    window.localStorage.setItem('yourOrders',JSON.stringify(''));
    window.localStorage.setItem('cartdetail',JSON.stringify(''));
    window.localStorage.setItem('checkout_status',JSON.stringify(''));
    AxiosRequest.setToken(null);
  } else  if (action.type === CART_TIEM_STORE) {
    window.localStorage.setItem('yourOrders',JSON.stringify(action.cartlist));
    window.localStorage.setItem('cartdetail',JSON.stringify(action.cartdetail));
    window.localStorage.setItem('checkout_status',JSON.stringify(action.checkout_status));
  }else  if (action.type === CHECKOUT_ORDER_SUCCESS) {
    store.dispatch({ type: LIVE_PRODUCT_PAGE_UNLOADED});
    window.localStorage.setItem('yourOrders',JSON.stringify([]));
    window.localStorage.setItem('cartdetail',JSON.stringify({}));
    window.localStorage.setItem('checkout_status',JSON.stringify(false));
  }else  if (action.type === LIVE_PRODUCT_RESET_CART) {
    window.localStorage.setItem('yourOrders',JSON.stringify([]));
    window.localStorage.setItem('cartdetail',JSON.stringify({}));
    window.localStorage.setItem('checkout_status',JSON.stringify(false));
  }

  next(action);
};

const AdminMiddleware = store => next => action => {
  if (action.type === MAKEIT_GET_CUISINE) {
    store.dispatch({ type: MAKEIT_GET_CUISINE, payload: action.payload });
  }else if (action.type === MAKEIT_GET_REGION) {
    store.dispatch({ type: MAKEIT_GET_REGION, payload: action.payload });
  }else if (action.type === ADMIN_EAT_ADDRESS) {
    store.dispatch({ type: ADMIN_EAT_ADDRESS, payload: action.payload });
  } 

  next(action);
};

function isPromise(v) {
  return v && typeof v.then === 'function';
}


export { promiseMiddleware, localStorageMiddleware,AdminMiddleware}
