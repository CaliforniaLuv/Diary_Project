export const reducer = (state, action) => {
  let newState = [];

  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      newState = [action.data, ...state];
      break;
    }

    case "REMOVE": {
      newState = state.filter((el) => el.id !== action.targerId);
      break;
    }

    case "EDIT": {
      newState = state.map((el) =>
        el.id === action.data.id ? { ...action.data } : el
      );
      break;
    }

    default:
      return state;
  }

  return newState;
};
