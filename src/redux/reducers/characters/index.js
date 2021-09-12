const initialState = {
    characters: [], 
  }
    
    export default function(state = initialState, action) {
      switch(action.type){
        case "CHARACTERS_INDEX":
          return { ...state,  characters: action.payload }
        default: {
            return state
        }
      }
    }
    