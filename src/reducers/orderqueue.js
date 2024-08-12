import { ORDERS_QUEUE_LIST, ORDERS_QUEUE_HUB, ORDERS_QUEUE_ZONE, ORDERS_QUEUE_FILTER, ORDERS_QUEUE_FILTER_ZONE, ORDERS_QUEUE_FILTER_HUB } from '../constants/actionTypes'      
export default (state = {orderQueueList:[],orderQueueRealList:[],zoneList:[],hubList:[],zoneFliterList:[],zonename:"All",zoneid:0,isZoneFilter:true,hubid:0,hubname:"ALL"}, action) => {
  switch (action.type) {
    case ORDERS_QUEUE_LIST:
      var qList=action.payload.result||[]
      return {
        ...state,
        orderQueueRealList:qList,
        orderQueueList:state.isZoneFilter?state.zoneid?qList.filter(zoneItem => zoneItem.zone===state.zoneid):qList:state.hubid?qList.filter(hub => hub.makeithub_id===state.hubid):qList,
      };
      case ORDERS_QUEUE_HUB:
      var hubData=[];
      var hubList=action.payload.result || []
      if(hubList.length>0){
        hubData.push({makeithub_id:0,address:'All'})
      }
      Array.prototype.push.apply(hubData,hubList);
      return {
        ...state,
        hubList:hubData,
        orderQueueList:state.hubid?state.orderQueueRealList.filter(hub => hub.makeithub_id===state.hubid):state.orderQueueRealList
      };
      case ORDERS_QUEUE_ZONE:
      var zoneData=[];
      var zoneList=action.payload.result || []
      if(zoneList.length>0){
        zoneData.push({id:0,Zonename:'All'})
      }
      Array.prototype.push.apply(zoneData,zoneList);
      return {
        ...state,
        zoneList:zoneData,
        orderQueueList:state.zoneid?state.orderQueueRealList.filter(zoneItem => zoneItem.zone===state.zoneid):state.orderQueueRealList
      };
      case ORDERS_QUEUE_FILTER_ZONE:
      return {
        ...state,
        zonename:action.zonename,
        zoneid:action.id,
        orderQueueList:action.id?state.orderQueueRealList.filter(zoneItem => zoneItem.zone===action.id):state.orderQueueRealList
      };
      case ORDERS_QUEUE_FILTER_HUB:
      return {
        ...state,
        hubname:action.hubname,
        hubid:action.id,
        orderQueueList:action.id?state.orderQueueRealList.filter(hub => hub.makeithub_id===action.id):state.orderQueueRealList
      };
    default:
      return state;
  }
};
