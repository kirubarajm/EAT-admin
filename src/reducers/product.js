import {MAKEIT_PRODUCT_PAGE_UNLOAD, MAKEIT_PRODUCT_CLEAR, MAKEIT_PRODUCT_LOAD, MAKEIT_PRODUCT_ADD, MAKEIT_PRODUCT_IMAGE, MAKEIT_PRODUCT_ITEM_ADD, MAKEIT_PRODUCT_ITEM_REMOVE, MAKEIT_PRODUCT_ITEM_DOWN, MAKEIT_PRODUCT_ITEM_UP, MAKEIT_PRODUCT_LIVE, MAKEIT_ADD_ITEMS_ALL, MAKEIT_PRODUCT_IMAGE_PRE_LOAD, MAKEIT_PRODUCT_FORM_CLEAR, MAKEIT_PRODUCT_FORM_LOAD, MAKEIT_PRODUCT_ITEMS_LIST, MAKEIT_PACKAGE_ITEM_REMOVE,MAKEIT_PACKAGE_ITEMS_ADD_ALL, MAKEIT_PACKAGE_ITEM_COUNT_UP, MAKEIT_PACKAGE_ITEM_COUNT_DOWN, MAKEIT_PACKAGE_ITEM_ADD, PACKAGE_BOX_LIST_MAP_PRODUCT, MAKEIT_GET_PRODUCT_TAG,VIRTUAL_PRODUCT_LIST } from '../constants/actionTypes';

var initState = {
  productAddSuccess: false,
  productPrefillSuccess: false,
  productMoveToLive: false,
  ItemList: [],
  PackageList:[],
  makeit_Item_list:[],
  PackageMasterList:[],
  itemcount: 0,
  itempackageCount: 0,
  itemTotalAmount: 0,
  productid: 0,
  producttagList:[],
  VirtualProductList:[],
};

export default (state = initState, action) => {
  switch (action.type) {
    case MAKEIT_PRODUCT_FORM_LOAD:
      return {
        ...state,
        ItemList: [],
        PackageList:[],
        product_image: null,
      };
    case MAKEIT_PRODUCT_PAGE_UNLOAD:
      return {};
    case MAKEIT_PRODUCT_ADD:
      return {
        ...state, productAddSuccess: action.payload.success,
        productid: action.payload.productid
      };
    case MAKEIT_PRODUCT_CLEAR:
      return {
        ...state,
        productAddSuccess: false,
        productPrefillSuccess: false,
        productMoveToLive: false,
      };
    case MAKEIT_PRODUCT_FORM_CLEAR:
      return {
        ...state,
        product_image: null,
        ItemList: [],
        PackageList:[]
      };

    case MAKEIT_PRODUCT_LOAD:
      return {
        ...state,
        productPrefillSuccess: true,
        productdetail: action.payload.result[0],
        ItemList: [],
        itemTotalAmount: action.payload.result[0].price
      };
    case MAKEIT_PRODUCT_ITEM_ADD:
      return {
        ...state,
        ItemList: [...state.ItemList, action.Item],
        itemcount: state.itemcount + action.Item.quantity,
        itemTotalAmount: state.itemTotalAmount + action.Item.price
      };

    case MAKEIT_PRODUCT_ITEM_REMOVE:
      const ItemID = action.Item.menuitemid
      return {
        ...state,
        itemcount: state.itemcount - action.Item.quantity,
        itemTotalAmount: state.itemTotalAmount - (action.Item.quantity * action.Item.price),
        ItemList: state.ItemList.filter(item => item.menuitemid !== ItemID),
      }

    case MAKEIT_PRODUCT_ITEM_UP:
      return {
        ...state,
        ItemList: state.ItemList.map((item) => {
          if (item.menuitemid === action.Item.menuitemid) {
            return Object.assign({}, item, {
              quantity: item.quantity + 1
            })
          }
          return item
        }),
        itemcount: state.itemcount + 1,
        itemTotalAmount: state.itemTotalAmount + (action.Item.price)
      }

    case MAKEIT_PRODUCT_ITEM_DOWN:
      return {
        ...state,
        ItemList: state.ItemList.map((item) => {
          if (item.menuitemid === action.Item.menuitemid) {
            return Object.assign({}, item, {
              quantity: item.quantity - 1
            })
          }
          return item
        }),
        itemcount: state.itemcount - 1,
        itemTotalAmount: state.itemTotalAmount - (action.Item.price)
      }

      case MAKEIT_PACKAGE_ITEM_ADD:
        return {
          ...state,
          PackageList: [...state.PackageList, action.packageItem],
          itempackageCount: state.itempackageCount + action.packageItem.count,
        };

      case MAKEIT_PACKAGE_ITEM_REMOVE:
      const packageID = action.packageItem.id
      return {
        ...state,
        itempackageCount: state.itempackageCount - action.packageItem.count,
        PackageList: state.PackageList.filter(packageItem => packageItem.id !== packageID),
      }

      case MAKEIT_PACKAGE_ITEM_COUNT_UP:
      return {
        ...state,
        PackageList: state.PackageList.map((packageItem) => {
          if (packageItem.id === action.packageItem.id) {
            return Object.assign({}, packageItem, {
              count: packageItem.count + 1
            })
          }
          return packageItem
        }),
        itempackageCount: state.itempackageCount + 1,
      }

      case MAKEIT_PACKAGE_ITEM_COUNT_DOWN:
      return {
        ...state,
        PackageList: state.PackageList.map((packageItem) => {
          if (packageItem.id === action.packageItem.id) {
            return Object.assign({}, packageItem, {
              count: packageItem.count - 1
            })
          }
          return packageItem
        }),
        itempackageCount: state.itempackageCount - 1
      }

      case MAKEIT_GET_PRODUCT_TAG:
    
        return{
          ...state,
          producttagList: action.payload.result || []
        }

      case VIRTUAL_PRODUCT_LIST:
    
          return{
            ...state,
            VirtualProductList: action.payload.result || []
          }

    case MAKEIT_PRODUCT_IMAGE:
      return { ...state, [action.key]: action.payload.data.Location };
    case MAKEIT_PRODUCT_IMAGE_PRE_LOAD:
      return { ...state, [action.key]: action.data };
    case MAKEIT_PRODUCT_LIVE:
      return { ...state, productMoveToLive: action.payload.success };
    case MAKEIT_ADD_ITEMS_ALL:
      return { ...state, ItemList: state.ItemList.concat(action.Item) };
    case MAKEIT_PACKAGE_ITEMS_ADD_ALL:
        return { ...state, PackageList: state.PackageList.concat(action.packageItem) };
    case MAKEIT_PRODUCT_ITEMS_LIST:
      return { ...state, makeit_Item_list:action.payload.result };
    case PACKAGE_BOX_LIST_MAP_PRODUCT:
      return { ...state, PackageMasterList:action.payload.result,PackageList:[]};

    default:
      return state;
  }
};
