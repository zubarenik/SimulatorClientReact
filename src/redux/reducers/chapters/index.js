const initialState = {
    chapters: [], 
  }
    
    export default function(state = initialState, action) {
      switch(action.type){
        case "CHAPTERS_INDEX":
          return { ...state,  chapters: action.payload }
        default: {
            return state
        }
      }
    }
    