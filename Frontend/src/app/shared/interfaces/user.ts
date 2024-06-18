export interface User {
    username: string,
    password: string,
    email: string,
    userRole: string
}

export interface Credentials {
    email: string
    password: string
}

export interface loggedInUser {
    Username: string
    User_Email: string
    User_Role: string 
    User_ID: string
}

export interface updateUser {
    username: string,
    password: string,
    email: string,
    userRole: string,
    id: string
}
