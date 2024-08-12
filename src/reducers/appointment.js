import { APPOINTMENT_LIST, APPOINTMENT_ITEM_CLICK, SALESMAN_LIST, SALESMAN_ITEM_CLICK, SALES_APPOINTMENT_ASSIGN, SALES_APPOINTMENT_RESCHEDULE, SALES_APPOINTMENT_CANCEL } from '../constants/actionTypes';

export default (state = {
  appointmentlist: [], salesmanlist: [],
  selectedIndex: -1,
  selectedItem: {},
  selectedSalesIndex: -1,
  selectedSalesItem: {},
  appointmentstatus: false,
  appointmentReschedule:false,
  appointmentCancel:false,
}, action) => {
  switch (action.type) {
    case APPOINTMENT_LIST:
      return {
        ...state,
        appointmentlist: action.payload.result,
        appointmentstatus: false
      };

    case APPOINTMENT_ITEM_CLICK:
      return {
        ...state,
        selectedIndex: action.selectedIndex,
        selectedItem: state.appointmentlist[action.selectedIndex]
      };
    case SALESMAN_LIST:
      return {
        ...state,
        salesmanlist: action.payload.result,
        selectedSalesIndex: -1,
        selectedSalesItem: {},
      };
    case SALESMAN_ITEM_CLICK:
      return {
        ...state,
        selectedSalesIndex: action.selectedSalesIndex,
        selectedSalesItem: state.salesmanlist[action.selectedSalesIndex]
      };

    case SALES_APPOINTMENT_ASSIGN:
      return {
        ...state,
        selectedSalesIndex: -1,
        selectedSalesItem: {},
        selectedIndex: -1,
        selectedItem: {},
        appointmentstatus: action.payload.success
      };
      case SALES_APPOINTMENT_RESCHEDULE:
        return {
          ...state,
          appointmentReschedule: action.payload.status || false,
        };
        case SALES_APPOINTMENT_CANCEL:
        return {
          ...state,
          appointmentCancel: action.payload.status || false,
        };
    default:
      return state;
  }
};
