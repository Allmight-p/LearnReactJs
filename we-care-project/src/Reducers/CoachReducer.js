
const coachReducer = (state ={}, actions) =>{
        switch(actions.type){
            case "Login":
                return{
                    ...state, isAuthenticated: actions.status, loginid : actions.id
                }
            case "Profile":
                return{
                    ...state, displayProfile : actions.show
                }
            
            default:
                return state;
        }
}

export default coachReducer;