import {
  STORIES_CREATE_PAGE_LOAD,STORIES_CREATE_PAGE_UNLOAD,STORIES_CREATE,STORIES_FIELD_UPDATE,STORIES_IMAGE_UPLOAD
  } from "../constants/actionTypes";
  
  export default (
    state = {
      StoriesUploadList: [],
      storiesUploadSuccess:false,
      cateType:[{id:-1,name:"None"},{id:1,name:"Product"},{id:2,name:"Kitchen"}],
      mediaType:[{id:-1,name:"None"},{id:1,name:"Image"},{id:2,name:"Video"}]
    },
    action
  ) => {
    switch (action.type) {
      case STORIES_CREATE_PAGE_LOAD:
        return {
          ...state
        };
      case STORIES_CREATE_PAGE_UNLOAD:
        return {};
      case STORIES_CREATE:
        return {
          ...state,
          storiesUploadSuccess: action.payload.status
        };
      case STORIES_FIELD_UPDATE:
      return { ...state, [action.key]: action.payload.data.Location };
      case STORIES_IMAGE_UPLOAD:
      var imagePath = {
        img_url: action.payload.data.Location,
        index: action.index
      };
      return {
        ...state,
        StoriesUploadList: [...state.StoriesUploadList, imagePath]
      };
      default:
        return state;
    }
  };
  