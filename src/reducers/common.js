import {
  APP_LOAD,
  REDIRECT,
  LOGOUT,
  LOGIN,
  HOME_PAGE_UNLOADED,
  LOGIN_PAGE_UNLOADED,
  TOAST_SHOW,
  MAKEIT_GET_REGION,
  MAKEIT_GET_CUISINE,
  ADMIN_EAT_ADDRESS,
  MAKEIT_GET_CLUSTER,
  MAKEIT_GET_HOMETOWN,
  MAKEIT_GET_HUB,
  HOME_REDIRECT,
  GET_ALL_ZONE,
 
} from '../constants/actionTypes';
import {notify} from 'react-notify-toast';


const defaultState = {
  appName: 'Tovo Admin',
  token: null,
  viewChangeCounter: 0,
  hub_radius:1,
  regionList:[],
  cusinieList:[],
  clusterList:[],
  hometownList:[],
  makeithub:[],
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case APP_LOAD:
      return {
        ...state,
        token: action.token || null,
        appLoaded: true,
        currentUser: action.payload ? action.payload.user : null
      };
    case REDIRECT:
      return { ...state, redirectTo: null };
    case LOGOUT:
      return { ...state, redirectTo: '/login', token: null, currentUser: null };
      case MAKEIT_GET_REGION:
      return {
        ...state,
        regionList:action.payload.result
      };
      case MAKEIT_GET_HOMETOWN:
      return {
        ...state,
        hometownList:action.payload.result || []
      };
      case MAKEIT_GET_CUISINE:
      return {
        ...state,
        cusinieList:action.payload.result?action.payload.result.map(opation => {
          opation.value=opation.cuisinename;
          return opation;
        }) :[]
      };

      case MAKEIT_GET_CLUSTER:
      return {
        ...state,
        clusterList:action.payload.result || []
      };
      case GET_ALL_ZONE:
      return {
        ...state,
        zone_data: action.payload.result || []
      };
      case MAKEIT_GET_HUB:
      return {
        ...state,
        hub_radius:action.payload.hub_radius||1,
        makeithub:action.payload.result || []
      };
      case ADMIN_EAT_ADDRESS:
      return {
        ...state,
        eataddress:action.payload.result || []
      };
    case LOGIN:
      return {
        ...state,
        token: action.payload ? null : action.payload,
        currentUser: action.payload ? null : action.payload
      };
      case HOME_REDIRECT:
      return {
        ...state,
        redirectTo: action.redirectTo ? action.redirectTo : '/login',
      };
    case HOME_PAGE_UNLOADED:
    case LOGIN_PAGE_UNLOADED:
      return { ...state, viewChangeCounter: state.viewChangeCounter + 1 };
    case TOAST_SHOW:
      let myColor = { background: '#314911', text: "#FFFFFF" };
      notify.show(action.message,"custom", 7000,myColor);
    return{...state}
    default:
      return state;
  }
};
