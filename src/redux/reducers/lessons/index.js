const initialState = {
    lessons: []
  }
    
    export default function(state = initialState, action) {
      switch(action.type){
        case "LESSONS_INDEX":
          return { ...state,  lessons: action.payload }
        default: {
              return state
          }
      }
    }
    