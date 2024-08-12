import {
  APPOINTMENT_LIST_FILTER,
  APPOINTMENT_LIST_SET_FILTER,
  SALES_APPOINTMENT_RESCHEDULE,
  SALES_APPOINTMENT_CANCEL
} from "../constants/actionTypes";

export default (
  state = {
    appointmentlist: [],
    appointmentstatus: 0,
    appointmentstatusName: "All",
    appointmentDateStatus: 0,
    appointmentDate: 0,
    appointmentReschedule:false,
    appointmentCancel:false,
    page: 1,
    appointmentcount:0,
  },
  action
) => {
  switch (action.type) {
    case APPOINTMENT_LIST_FILTER:
      return {
        ...state,
        appointmentlist: action.payload.result,
        appointmentReschedule:false,
        appointmentCancel:false,
        appointmentcount:action.payload.appointmentcount,
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
    case APPOINTMENT_LIST_SET_FILTER:
      return {
        ...state,
        appointmentstatus: action.appointmentstatus,
        appointmentstatusName: action.appointmentstatusName,
        page: action.page,
        appointmentDateStatus: action.dateid,
        appointmentDate: action.date,
        search:action.search
      };
    default:
      return state;
  }
};
