const initialState = {
  posts: [],
  post: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "LOADING_DATA":
      return {
        ...state,
        loading: true,
      };
    case "SET_POSTS":
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case "SET_POST":
      return {
        ...state,
        post: action.payload,
      };
    case "DELETE_POST":
      let index = state.posts.findIndex(
        (post) => post.postID === action.payload
      );

      state.posts.splice(index, 1);

      return {
        ...state,
      };
    //start of adding posts case
    case "ADD_POST":
      return {
        ...state,
        posts: [
          action.payload,
          ...state.posts
        ]
      };
    //end of adding post case 
    default:
      return state;
  }
}
