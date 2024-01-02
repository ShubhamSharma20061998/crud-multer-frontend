export const fileReducer = (state, action) => {
  switch (action.type) {
    case "LIST_IMAGE": {
      return { ...state, file: action.payload };
    }
    case "UPDATE_PICTURE": {
      return {
        ...state,
        file: state.file.map(el => {
          if (el._id == action.payload._id) {
            return { ...el, image: action.payload.image };
          } else {
            return { ...el };
          }
        }),
      };
    }
    default: {
      return state;
    }
  }
};
