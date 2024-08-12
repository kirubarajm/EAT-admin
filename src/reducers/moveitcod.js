import { MOVEIT_COD_LIST} from '../constants/actionTypes';

export default (state = {order_data:[],cod_amount:0}, action) => {
  switch (action.type) {
    case MOVEIT_COD_LIST:
        return {
          ...state,
          order_data:action.payload.result,
          cod_amount:action.payload.cod_amount
        };
    default:
      return state;
  }
};
