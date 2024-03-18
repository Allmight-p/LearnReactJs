
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
            case "Logout":
                return{
                    ...state, isAuthenticated: false, loginid : ""
                }
            
            default:
                return state;
        }
}

export default coachReducer;
