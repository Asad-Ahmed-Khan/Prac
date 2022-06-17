

export const allUserOrdersReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
      case "ALL_ORDER_REQUEST":
        return {
          loading: true,
          ...state,
        };
      case "GET_ALL_ORDERS":
        return {
          loading: action.loading,
          success: true,
          orders: action.data,
        };
      case "ALL_ORDER_FAIL":
        return {
          loading: false,
          error: action.data,
        };
      default:
        return state;
    }
  };
  
