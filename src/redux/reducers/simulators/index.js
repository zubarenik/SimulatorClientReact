const initialState = {
    simulators: [],
    onboarding: {},
    curr_simulator: {}
  }
    
    export default function(state = initialState, action) {
      switch(action.type){
        case "SIMULATORS_INDEX":
          return { ...state,  simulators: action.payload }
        case "SIMULATORS_ONBOARDING":
          return { ...state,  onboarding: action.payload }
        case "SIMULATORS_DETAILS":
          return { ...state,  curr_simulator: action.payload }
        default: {
              return state
          }
      }
    }
    