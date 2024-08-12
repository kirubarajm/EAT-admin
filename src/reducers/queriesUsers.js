import { QUERIES_USER_PAGE_LOAD,QUERIES_USER_LIST,QUERIES_SELETED_USER} from '../constants/actionTypes';

var appuserstype = [{typeid:1,role :'Make-it'},
  {typeid:2,role :'Move-it'},
  {typeid:4,role :'Eat'}
];

var initState={
  queriesUserList:[],
  appuserstype:appuserstype,
  selectedUserType:4,
  selectedUserRole:'Eat',
  queriesSelectedUser:{}
};


export default (state = initState, action) => {
  switch (action.type) {
    case QUERIES_USER_PAGE_LOAD:
    return {
      ...state,
    };
    case QUERIES_USER_LIST:
    return {
      ...state,
      queriesUserList:action.payload.result,
    };
    case QUERIES_SELETED_USER:
    return {
      ...state,
      selectedUserType:action.item.typeid,
      selectedUserRole:action.item.role,
    };
    default:
      return state;
  }
};
