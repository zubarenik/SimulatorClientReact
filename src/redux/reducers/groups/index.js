const initialState = {
    groups: [],
    curr_group: {}
  }
    
    export default function(state = initialState, action) {
      switch(action.type){
        case "SIMULATOR_GROUPS_INDEX":
          return { ...state,  groups: action.payload, curr_group: (action.payload && action.payload.length > 0) ? action.payload[0] : {}}
        default: {
          return state
        }
      }
    }
    