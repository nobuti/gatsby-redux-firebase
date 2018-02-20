const initialState = { authUser: null };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_LOGGED_IN':
      return {
        ...state,
        authUser: action.user
      };
    default:
      return state;
  }
};

export default reducer;
