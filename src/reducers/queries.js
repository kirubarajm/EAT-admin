import { QUERIES_QUESTIONS_LIST,QUERIES_REPLIES, QUERIES_REPLIES_LIST,QUERIES_READ_CLEAR,
  QUERIES_CLEAR,QUERIES_PAGE_LOAD,QUERIES_PAGE_USER_SELECT, QUERIES_SELETED_QUESTIONS,
  QUERIES_READ,
  QUERIES_USER_DETAIL} from '../constants/actionTypes';

var appuserstype = [{typeid:1,role :'Make-it'},
  {typeid:2,role :'Move-it'},
  {typeid:4,role :'Eat'}
];

var initState={
  queriesQuestionList:[],
  queriesRepliesList:[],
  queriesReplies:false,
  queriesSelectedQuestion:{},
  productEdittQuantity:false,
  appuserstype:appuserstype,
  selectedUserType:4,
  selectedUserRole:'Eat',
  messagingDate:false,
  queriesUserid:0,
  queriesRead:false,
  allRepliesGet:false,
  userDetail:false,
};


export default (state = initState, action) => {
  switch (action.type) {
    case QUERIES_PAGE_LOAD:
    return {
      ...state,
    };
    case QUERIES_PAGE_USER_SELECT:
    return {
      ...state,
      selectedUserType:action.item.typeid,
      selectedUserRole:action.item.role,
      queriesQuestionList:[],
      queriesRepliesList:[],
    };
    case QUERIES_QUESTIONS_LIST:
    return {
      ...state,
      queriesQuestionList:action.payload.result,
      queriesUserid:action.userid,
      queriesSelectedQuestion:{},
      queriesRepliesList:[],
    };
    case QUERIES_USER_DETAIL:
    return {
      ...state,
      userDetail:action.payload.result?action.payload.result[0]:false
    };
    case QUERIES_READ:
    return {
      ...state,
      allRepliesGet:false,
      queriesRead:action.payload.status,
    };
    case QUERIES_SELETED_QUESTIONS:
    return {
      ...state,
      queriesSelectedQuestion:action.QItem,
    };
    case QUERIES_REPLIES_LIST:
    return { ...state, 
        queriesRepliesList:action.payload.result,
        queriesReplies:false, 
        messagingDate:true,
        allRepliesGet:(state.queriesSelectedQuestion&&(state.queriesSelectedQuestion.admin_un_read_count||!state.queriesSelectedQuestion.admin_read))?true:false,
    };
    case QUERIES_REPLIES:
        return { ...state, 
            queriesReplies:action.payload.success 
        };
    case QUERIES_CLEAR:
        return { ...state, 
            messagingDate:false, 
        };
        case QUERIES_READ_CLEAR:
        return { ...state, 
          allRepliesGet:false,
          queriesRead:false, 
        };
    default:
      return state;
  }
};
