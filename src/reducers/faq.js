import { FAQ_POST, FAQ_CLEAR, FAQ_SELETED, FAQ_PAGE_USER_SELECT, FAQ_PAGE_LOAD, FAQ_LIST, FAQ_DELETE} from '../constants/actionTypes';

var appuserstype = [{typeid:1,role :'Make-it'},
  {typeid:2,role :'Move-it'},
  {typeid:3,role :'Sales'},
  {typeid:4,role :'Eat'}
];

var initState={
  faqList:[],
  faqPost:false,
  faqSelected:{},
  appuserstype:appuserstype,
  selectedUserType:4,
  selectedUserRole:'Eat'
};


export default (state = initState, action) => {
  switch (action.type) {
    case FAQ_PAGE_LOAD:
    return {
      ...state,
    };
    case FAQ_PAGE_USER_SELECT:
    return {
      ...state,
      selectedUserType:action.item.typeid,
      selectedUserRole:action.item.role,
      faqList:[],
    };
    case FAQ_LIST:
    return {
      ...state,
      faqList:action.payload.result,
    };
    case FAQ_SELETED:
    return {
      ...state,
      faqSelected:action.faqItem,
    };
    case FAQ_CLEAR:
        return { ...state, 
            faqPost:false 
        };
    case FAQ_POST:
        return { ...state, 
            faqPost:action.payload.success 
        };
    case FAQ_DELETE:
        return { ...state, 
            faqPost:action.payload.success
        };
    default:
      return state;
  }
};
