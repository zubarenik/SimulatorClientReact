const initialState = {
    theory: []
  }
    
    export default function(state = initialState, action) {
      switch(action.type){
        case "THEORY_INDEX":
          return { ...state,  theory: action.payload }
        default: {
              return state
          }
      }
    }
    