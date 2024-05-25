


const initialstate = {
    usertoken: localStorage.getItem('authUserTokens') || null,
    admintoken: localStorage.getItem('authAdminTokens') || null,
    role: localStorage.getItem('role') || null,
}



const authReducer = (state = initialstate,action) =>{
    switch(action.type){
        case "LOGIN SUCCESS":
            return {
                ...state,
                usertoken : action.payload.usertoken,
                admintoken:action.payload.admintoken,
                role:action.payload.role
            }
        case "LOGIN FAILURE":
            return{
                ...state,
                usertoken : null,
                admintoken :  null,
                role:null
            }
        case "LOGOUT":
            return{
                ...state,
                usertoken : null,
                admintoken :  null,
                role:null

            }
        default:
            return state
    }
}

export default authReducer