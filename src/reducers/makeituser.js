import {
  MAKEIT_USRE_PAGE_LOADED,
  MAKEIT_USRE_PAGE_UNLOADED,
  MAKEIT_ADD_USER,
  MAKEIT_FORM_CLEAR,
  MAKEIT_USER_DETAIL,
  MAKEIT_UPDATE_FIELD,
  MAKEIT_UPDATE_MENU_IMAGES,
  MAKEIT_DELETE_MENU_IMAGES,
  MAKEIT_ZONE_AREA
} from "../constants/actionTypes";
import { Kitchen_Signature_Type, Kitchen_Specialitie_Type, Kitchen_Info_Type } from "../constants/updateStatus";

export default (
  state = {
    userAddSuccess: false,
    userPrefillSuccess: false,
    kitchenmenuimage: [],
    kitcheninfoimage:[],
    Specialitiesfood:[],
    Signature:[],
    kitchenthumb:[],
    ZoneData:[],
    MemberType:[{id:-1,name:"None"},{id:1,name:"Gold"},{id:2,name:"Silver"},{id:3,name:"Bronze"}]
  },
  action
) => {
  switch (action.type) {
    case MAKEIT_USRE_PAGE_LOADED:
      return {
        ...state
      };
    case MAKEIT_USRE_PAGE_UNLOADED:
      return {};
    case MAKEIT_ADD_USER:
      return {
        ...state,
        userAddSuccess: action.payload.status
      };
      case MAKEIT_ZONE_AREA:
        return {
          ...state,
          ZoneData: action.payload.result
        };
  //MAKEIT_ZONE_AREA
    case MAKEIT_FORM_CLEAR:
      return {
        ...state,
        userAddSuccess: false,
        userPrefillSuccess: false
      };
    case MAKEIT_USER_DETAIL:
      return {
        ...state,
        userPrefillSuccess: true,
        viewmakeituser: action.payload.result ? action.payload.result[0] : {},
        kitchenmenuimage: action.payload.result
          ? action.payload.result[0].kitchenmenuimage
          : [],
          kitcheninfoimage: action.payload.result
          ? action.payload.result[0].kitcheninfoimage
          : [],
          Specialitiesfood: action.payload.result
          ? action.payload.result[0].Specialitiesfood
          : [],
          Signature: action.payload.result
          ? action.payload.result[0].Signature
          : []
      };
    case MAKEIT_UPDATE_FIELD:
      if(action.isloading)
      return { ...state, [action.key]: action.payload.data.Location };
      else return { ...state, [action.key]: action.image };
    case MAKEIT_UPDATE_MENU_IMAGES:
      var imagePath = {
        img_url: action.payload.data.Location,
        type: action.imgType
      };

      if(action.imgType===Kitchen_Signature_Type){
      return {
        ...state,
        Signature: [...state.Signature, imagePath]
      };
      }else if(action.imgType===Kitchen_Info_Type){
        return {
          ...state,
          kitcheninfoimage: [...state.kitcheninfoimage, imagePath]
        };
      }else if(action.imgType===Kitchen_Specialitie_Type){
        return {
          ...state,
          Specialitiesfood: [...state.Specialitiesfood, imagePath]
        };
      }else{
        return {
          ...state,
          kitchenmenuimage: [...state.kitchenmenuimage, imagePath]
        };
      }

      case MAKEIT_DELETE_MENU_IMAGES:
        
      if(action.imgType===Kitchen_Signature_Type){
        return {
          ...state,
          Signature:state.Signature.filter((v,i)=>i!==action.index)
        };
        }else if(action.imgType===Kitchen_Info_Type){
          return {
            ...state,
            kitcheninfoimage:state.kitcheninfoimage.filter((v,i)=>i!==action.index)
          };
        }else if(action.imgType===Kitchen_Specialitie_Type){
          return {
            ...state,
            Specialitiesfood:state.Specialitiesfood.filter((v,i)=>i!==action.index)
          };
        }else{
          return {
            ...state,
            kitchenmenuimage:state.kitchenmenuimage.filter((v,i)=>i!==action.index)
          };
        }
    default:
      return state;
  }
};
