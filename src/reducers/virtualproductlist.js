import { VIRTUAL_PRODUCT_LIST,MAKEIT_PRODUCT_DEAIL_ADD_LIVE,MAKEIT_PRODUCT_DELETE_CLEAR, VIRTUAL_PRODUCT_FILTER,MAKEIT_GET_HUB,MAKEIT_PRODUCT_DEAIL_EDIT_COUNT,EDIT_QUANTITY_VIRTUAL_PRODUCT_LIST, EDIT_QUANTITY_BUTTON_ENABLE} from '../constants/actionTypes';

export default (state = {  VirtualProductList:[],productMoveToLive:false,total_page_count:0,productlimit:10,page:1,search:"",makeithub:[],hubItem:false, productEditQuantityStatus:false}, action) => {
  switch (action.type) {
    case VIRTUAL_PRODUCT_LIST:
        return{
            ...state,
            VirtualProductList: action.payload.result || [],
            total_page_count:action.payload.total_count || 0,
            productlimit:action.payload.productlimit || 10,
            
          }
    case MAKEIT_PRODUCT_DEAIL_ADD_LIVE:
        return{
            ...state,
            productMoveToLive:action.payload.status
        }
    
    case MAKEIT_PRODUCT_DELETE_CLEAR:
            return{
                ...state,
                productMoveToLive:false
            }

   case VIRTUAL_PRODUCT_FILTER:
                return{
                  ...state,
                  search:action.search,
                  page:action.page,
                  hubItem:action.hubitem,
            }
    
    case MAKEIT_GET_HUB:
    return{
      ...state,
      makeithub: action.payload.result || []
     
      
    }

    case MAKEIT_PRODUCT_DEAIL_EDIT_COUNT:
    return { 
      ...state, 
      productEdittQuantity:action.payload.success,
      productEditQuantityStatus:action.payload.status 
      
    };

    case EDIT_QUANTITY_VIRTUAL_PRODUCT_LIST:
    return { 
      ...state, 
      VirtualProductList:state.VirtualProductList.map((item, index) => {
        if (index === action.index) {
          return Object.assign({}, item, item.editquantity=action.quantity)
        }
        return item
      })
    };
    case EDIT_QUANTITY_BUTTON_ENABLE:
      return { 
        ...state, 
        productEdittQuantity:false,
        productEditQuantityStatus:false,
        VirtualProductList:state.VirtualProductList.map((item, index) => {
          if (index === action.index) {
            item.editquantity=item.quantity
            return Object.assign({}, item, item.isEdit=action.isEdit)
          }
          return item
        })
      };

    default:
      return state;
  }
};
