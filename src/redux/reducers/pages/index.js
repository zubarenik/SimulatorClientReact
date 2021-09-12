const initialState = {
    pages: [],
    page: {}
  }
    
    export default function(state = initialState, action) {
      switch(action.type){
        case "PAGES_INDEX":
          return { ...state,  pages: action.payload }
        case "PAGES_DETAILS":
          return {...state, page: action.payload}
        default: {
              return state
          }
      }
    }
    