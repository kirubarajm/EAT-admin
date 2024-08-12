import {
  ORDERS_MOVEIT_REPORT,
  ORDERS_TURNORUND_REPORT_MAKEIT,
  ORDERS_TURNORUND_REPORT_MOVEIT,
  ORDERS_CANCELED_REPORT,
  ORDERS_COST_REPORT,
  ORDERS_DELIVERED_VIA_ADMIN_REPORT,
  REPORTS_CLEAR,
  NEW_USERS_REPORT,
  NEW_USERS_ORDER_REPORT,
  RETAINED_CUSTOMER_REPORT,
  USER_ORDER_HISTORY_REPORT,
  DRIVER_COD_REPORT,
  PRODUCT_REPORT,
  TOTAL_ORDERS_REPORT,
  ACCOUNT_REPORTS_CASH,
  ACCOUNT_REPORTS_ONLINE,
  KITCHEN_WISE_REPORT,
  VIRTUAL_KITCHEN_WISE_REPORT,
  ORIGINAL_KITCHEN_WISE_REPORT,
  ORIGINAL_PRODUCT_WISE_REPORT,
  VIRTUAL_PRODUCT_WISE_REPORT,
  TOTAL_VIRTUAL_ORDERS_REPORT,
  TOTAL_ORIGINAL_ORDERS_REPORT,
  VIRTUAL_KITCHEN_PREPARED_AFTER_CANCEL_REPORT,
  ORIGINAL_KITCHEN_PREPARED_AFTER_CANCEL_REPORT,
  ORIGINAL_KITCHEN_PREPARED_BEFORE_CANCEL_REPORT,
  VIRTUAL_KITCHEN_PREPARED_BEFORE_CANCEL_REPORT,
  REAL_KITCHEN_ORDERS_CANCELED_REPORT,
  REAL_KITCHEN_SUCCESSIONRATE_REPORT,
  VIRTUAL_KITCHEN_SUCCESSIONRATE_REPORT,
  VIRTUAL_ORDERS_PURCHASED,
  LOST_CUSTOMER_REPORT,
  XFACTOR_ORDERED_REPORT,
  FUNNEL_ORDERED_REPORT,
  MOVEIT_ORDERS_DELIVERY,
  MILE_MOVEIT_ORDERS_DELIVERY,
  MILE_MOVEIT_AVERAGE_DELIVERY,
  ONLINE_REFUNDED_ORDERS,
  COUPON_USED_ORDERS,
  ORDERS_DEATIL_REPORT_FINANCIAL,
  ITEM_WISE_REPORT_FINANCIAL,
  MOVEIT_MASTER_REPORT_FINANCIAL,
  MAKEIT_MASTER_REPORT_FINANCIAL,
  CANCELLED_ORDERS_FOLLOW_UP,
  UNCLOSED_ORDERS,
  CUSTOMER_EXPERIENCE,
  USER_GROWTH_REPORT,
  MOVEIT_TIME_LOG_REPORT,
  MAKEIT_TIME_LOG_REPORT,
  LIVE_PRODUCT_HISTORY_REPORT,
  ZONE_LEVEL_PERFORMANCE,
} from "../constants/actionTypes";

var initState = {
  moveit_count_data: [],
  turnarount_moveit_data: [],
  turnarount_makeit_data: [],
  order_canceled_data: [],
  product_wise_report: [],
  order_cost_data: [],
  orders_report: [],
  real_kitchen_order_canceled_data: [],
  virtual_orders_report: [],
  original_orders_report: [],
  order_delivery_via_admin: [],
  new_user_reports: [],
  new_user_orders_reports: [],
  retained_customer_reports: [],
  user_order_history: [],
  accounts_reports_cash: [],
  accounts_reports_online: [],
  driver_wise_cod: [],
  kitchen_wise_reports: [],
  original_kitchen_wise_reports: [],
  virtual_kitchen_wise_reports: [],
  virtual_product_wise_report: [],
  original_product_wise_report: [],
  virtual_kitchen_prepared_canceled_report: [],
  original_kitchen_prepared_canceled_report: [],
  virtual_kitchen_prepared_before_canceled_report: [],
  original_kitchen_prepared_before_canceled_report: [],
  virtual_kitchen_succession_rate_report: [],
  real_kitchen_succession_rate_report: [],
  virtual_orders_purchased_report: [],
  lost_customer_report: [],
  funnel_orders_report: [],
  xfactors_orders_report: [],
  moveit_orders_delivery: [],
  maile_moveit_order_delivery: [],
  maile_moveit_average_delivery: [],
  refunded_oline_orders: [],
  coupon_used_orders: [],
  orders_detail_financial: [],
  Item_wise_financial: [],
  Makeit_master_financial: [],
  Moveit_master_financial: [],
  cancelled_orders_reports:[],
  customer_experience_reports:[],
  unclosed_orders_reports:[],
  user_growth_reports:[],
  live_product_history_reports:[],
  makeit_time_log_reports:[],
  makeitmatrix:[],
  moveitmatrix:[],
  ordermatrix:[],
  kitchenshutdownmatrix:[],
  logisticsshutdownmatrix:[],
};
export default (state = initState, action) => {
  switch (action.type) {
    case ORDERS_MOVEIT_REPORT:
      return {
        moveit_count_data: action.payload.result
      };
    case ORDERS_TURNORUND_REPORT_MOVEIT:
      return {
        turnarount_moveit_data: action.payload.result
      };
    case ORDERS_TURNORUND_REPORT_MAKEIT:
      return {
        turnarount_makeit_data: action.payload.result
      };
    case ORDERS_CANCELED_REPORT:
      return {
        order_canceled_data: action.payload.result
      };
    case REAL_KITCHEN_ORDERS_CANCELED_REPORT:
      return {
        real_kitchen_order_canceled_data: action.payload.result
      };
    case ORDERS_COST_REPORT:
      return {
        order_cost_data: action.payload.result
      };
    case ORDERS_DELIVERED_VIA_ADMIN_REPORT:
      return {
        order_delivery_via_admin: action.payload.result
      };
    case NEW_USERS_REPORT:
      return {
        new_user_reports: action.payload.result
      };
    case NEW_USERS_ORDER_REPORT:
      return {
        new_user_orders_reports: action.payload.result
      };
    case RETAINED_CUSTOMER_REPORT:
      return {
        retained_customer_reports: action.payload.result
      };
    case USER_ORDER_HISTORY_REPORT:
      return {
        user_order_history: action.payload.result
      };
    case DRIVER_COD_REPORT:
      return {
        driver_wise_cod: action.payload.result
      };
    case PRODUCT_REPORT:
      return {
        product_wise_report: action.payload.result
      };
    case VIRTUAL_PRODUCT_WISE_REPORT:
      return {
        virtual_product_wise_report: action.payload.result
      };
    case ORIGINAL_PRODUCT_WISE_REPORT:
      return {
        original_product_wise_report: action.payload.result
      };
    case TOTAL_ORDERS_REPORT:
      return {
        orders_report: action.payload.result
      };
    case TOTAL_VIRTUAL_ORDERS_REPORT:
      return {
        virtual_orders_report: action.payload.result
      };
    case TOTAL_ORIGINAL_ORDERS_REPORT:
      return {
        original_orders_report: action.payload.result
      };
    case ACCOUNT_REPORTS_ONLINE:
      return {
        accounts_reports_online: action.payload.result
      };
    case ACCOUNT_REPORTS_CASH:
      return {
        accounts_reports_cash: action.payload.result
      };
    case KITCHEN_WISE_REPORT:
      return {
        kitchen_wise_reports: action.payload.result
      };
    case VIRTUAL_KITCHEN_WISE_REPORT:
      return {
        virtual_kitchen_wise_reports: action.payload.result
      };
    case ORIGINAL_KITCHEN_WISE_REPORT:
      return {
        original_kitchen_wise_reports: action.payload.result
      };
    case VIRTUAL_KITCHEN_PREPARED_AFTER_CANCEL_REPORT:
      return {
        virtual_kitchen_prepared_canceled_report: action.payload.result
      };
    case ORIGINAL_KITCHEN_PREPARED_AFTER_CANCEL_REPORT:
      return {
        original_kitchen_prepared_canceled_report: action.payload.result
      };
    case VIRTUAL_KITCHEN_PREPARED_BEFORE_CANCEL_REPORT:
      return {
        virtual_kitchen_prepared_before_canceled_report: action.payload.result
      };
    case ORIGINAL_KITCHEN_PREPARED_BEFORE_CANCEL_REPORT:
      return {
        original_kitchen_prepared_before_canceled_report: action.payload.result
      };
    case VIRTUAL_KITCHEN_SUCCESSIONRATE_REPORT:
      return {
        virtual_kitchen_succession_rate_report: action.payload.result
      };
    case REAL_KITCHEN_SUCCESSIONRATE_REPORT:
      return {
        real_kitchen_succession_rate_report: action.payload.result
      };
    case VIRTUAL_ORDERS_PURCHASED:
      return {
        virtual_orders_purchased_report: action.payload.result
      };
    case LOST_CUSTOMER_REPORT:
      return {
        lost_customer_report: action.payload.result
      };
    case FUNNEL_ORDERED_REPORT:
      return {
        funnel_orders_report: action.payload.result
      };
    case XFACTOR_ORDERED_REPORT:
      return {
        xfactors_orders_report: action.payload.result
      };
    case MOVEIT_ORDERS_DELIVERY:
      return {
        moveit_orders_delivery: action.payload.result
      };
    case MILE_MOVEIT_ORDERS_DELIVERY:
      return {
        maile_moveit_order_delivery: action.payload.result
      };
    case MILE_MOVEIT_AVERAGE_DELIVERY:
      return {
        maile_moveit_average_delivery: action.payload.result
      };

    case ONLINE_REFUNDED_ORDERS:
      return {
        refunded_oline_orders: action.payload.result
      };
    case COUPON_USED_ORDERS:
      return {
        coupon_used_orders: action.payload.result
      };
      case ORDERS_DEATIL_REPORT_FINANCIAL:
      return {
        orders_detail_financial: action.payload.result
      };
      case ITEM_WISE_REPORT_FINANCIAL:
      return {
        Item_wise_financial: action.payload.result
      };
      case MOVEIT_MASTER_REPORT_FINANCIAL:
      return {
        Moveit_master_financial: action.payload.result
      };
      case MAKEIT_MASTER_REPORT_FINANCIAL:
      return {
        Makeit_master_financial: action.payload.result
      };

      case CANCELLED_ORDERS_FOLLOW_UP:
      return {
        cancelled_orders_reports: action.payload.result
      };

      case CUSTOMER_EXPERIENCE:
      return {
        customer_experience_reports: action.payload.result
      };

      case UNCLOSED_ORDERS:
      return {
        unclosed_orders_reports: action.payload.result
      };
      case USER_GROWTH_REPORT:
        return {
          user_growth_reports: action.payload.result
        };
        case LIVE_PRODUCT_HISTORY_REPORT:
        return {
          live_product_history_reports: action.payload.result
        };
        case MAKEIT_TIME_LOG_REPORT:
        return {
          makeit_time_log_reports: action.payload.result
        };
        case MOVEIT_TIME_LOG_REPORT:
        return {
          moveit_time_log_reports: action.payload.result
        };
        case ZONE_LEVEL_PERFORMANCE:
        return {
          makeitmetrix: action.payload.makeitmatrix,
          moveitmetrix: action.payload.moveitmatrix,
          ordermetrix: action.payload.ordermatrix,
          kitchenshutdownmetrix: action.payload.kitchenshutdownmatrix, 
          logisticsshutdownmetrix: action.payload.logisticsshutdownmatrix
        };
    case REPORTS_CLEAR:
      return initState;

    default:
      return state;
  }
};
