import { SALES_PAGE_LOADED, SALES_UPDATE_DETAIL,SALES_PAGE_UNLOADED,UPDATE_FIELD_SALES,ADD_SALES, SALES_FORM_CLEAR,SALES_GET_DETAIL} from '../constants/actionTypes';

export default (state = {userAddSuccess:false,userPrefillSuccess:false,viewsalesuser:{}}, action) => {
  switch (action.type) {
    case SALES_PAGE_LOADED:
      return {
        ...state
      };
     case SALES_PAGE_UNLOADED:
      return {};
     case UPDATE_FIELD_SALES:
      return { ...state, [action.key]: action.payload.data.Location };
      case SALES_UPDATE_DETAIL:
      return { ...state, [action.key]: action.data };
    case ADD_SALES:
      return {
        ...state,userAddSuccess:action.payload.success
      };
      case SALES_FORM_CLEAR:
      return {
        ...state,
        userPrefillSuccess:false,
        userAddSuccess:false,id_proof:null,add_proof:null,birth_cer:null
      };

      case SALES_GET_DETAIL:
      return {
        ...state,
        userPrefillSuccess:true,
        viewsalesuser:action.payload.result[0],
      };
    
    default:
      return state;
  }
};
