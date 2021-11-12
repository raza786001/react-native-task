const isState = {
    name: "Javed",
    isLoggedIn: false,
    // session:[],
    wishlist: ['eat', 'code']
}

const mainReducer = (state = isState, action) => {
    switch (action.type) {
        case 'CHANGE_NAME':
            return {
                ...state,
                name: action.payload
            }
        case 'Register_USER':
            return {
                ...state,
                registerMessage: action.payload
            }      
        case 'LOGIN_DATA':
            return {
                ...state,
                loginUser:action.payload,
                loggedIn: true
            }                            
    }
    return state;
}
export default mainReducer;