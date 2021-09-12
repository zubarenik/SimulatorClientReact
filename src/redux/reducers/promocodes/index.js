const initialState = {
    promocodes: []
  }
    
    export default function(state = initialState, action) {
      switch(action.type){
        case "PROMOCODES_INDEX":
          return { ...state,  promocodes: action.payload }
        default: {
              return state
          }
      }
    }
    