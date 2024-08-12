import {
  MOVEIT_CURRENT_LOCATION,
  MOVEIT_CURRENT_LOCATION_CLEAR,
  LIVE_GET_MAKEIT,
  MAKEIT_LOCATION_CLEAR,
  GET_UNASSIGN_ZONE,
  UPDATE_ZONE_BOUNDARIES,
  ZONE_UPDATE_CLEAR,
  DELETE_ZONE_BOUNDARIES,
  GET_ALL_ZONE_FOR_DRAWING
} from "../constants/actionTypes";

export default (
  state = { moveit_data: [], makeit_data: [], zone_data: [], un_zone_data: [],update_zone:false,delete_zone:false },
  action
) => {
  switch (action.type) {
    case MOVEIT_CURRENT_LOCATION:
      return {
        ...state,
        moveit_data: action.payload.result
      };
    case MOVEIT_CURRENT_LOCATION_CLEAR:
      return {
        ...state,
        moveit_data: []
      };
    case LIVE_GET_MAKEIT:
      return {
        ...state,
        makeit_data: action.payload.result
      };
      case GET_ALL_ZONE_FOR_DRAWING:
        return {
          ...state,
          zone_data: action.payload.result || []
        };
    case GET_UNASSIGN_ZONE:
      var unAssignZone=[];
      var zoneList=action.payload.result || []
      if(zoneList.length>0){
        unAssignZone.push({id:0,Zonename:'None'})
      }
      Array.prototype.push.apply(unAssignZone, action.payload.result);
      return {
        ...state,
        un_zone_data: unAssignZone
      };
    case UPDATE_ZONE_BOUNDARIES:
      return {
        ...state,
        update_zone: action.payload.status
    };
    case DELETE_ZONE_BOUNDARIES:
      return {
        ...state,
        delete_zone: action.payload.status
    };
    
    case ZONE_UPDATE_CLEAR:
      return {
        ...state,
        update_zone: false,
        delete_zone:false,
        zone_data:[]
    };
    case MAKEIT_LOCATION_CLEAR:
      return {
        ...state,
        makeit_data: []
      };

    default:
      return state;
  }
};
