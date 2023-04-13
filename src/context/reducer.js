const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_QUERY":
      return {
        ...state,
        searchQuery: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
