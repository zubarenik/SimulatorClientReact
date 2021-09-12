const initialState = JSON.parse(localStorage.getItem("auth")) || {}

export default function(state = initialState, action) {
  switch(action.type){
    case "LOGIN": {
      return { ...state, ...action.payload }
    }
    case "LOGOUT": {
      return {}
    }
    default: {
      return state
    }
  }
}
