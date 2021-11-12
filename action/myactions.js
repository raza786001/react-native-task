export const anotherName = (name) => {
    console.log("actions: " + name);
    return {
        type: "CHANGE_NAME",
        payload: name
    }
}

export const anotherLogin = (data) => {
    console.log("Action Ka data: "+JSON.stringify(data));
    return {
        type: "LOGIN_DATA",
        payload: data
    }
}

export const authLogout = (data) => {
    return {
        type: "LOGOUT_DATA",
        payload: data.data
    }
   
}
