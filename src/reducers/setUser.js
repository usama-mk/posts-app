const setUserReducer= (state={
    user:"",
    additionalData:{}
}, action)=>{
    switch(action.type){
        case "SET_USER":
            return {...state, user: action.payload}
        case "SET_ADDITIONAL_DATA":
            return {...state, additionalData: action.payload}

        default:
            return state
    }
}

export default setUserReducer;