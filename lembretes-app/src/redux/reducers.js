
const initialState = {
  lembretes: [],
};

const lembretesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CARREGAR_LEMBRETES':
      return {
        ...state,
        lembretes: action.payload,
      };
    
    default:
      return state;
  }
};

export default lembretesReducer;
