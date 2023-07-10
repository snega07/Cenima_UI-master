import axios from "axios";
const API_URL="http://localhost:8080/api/";

/*const register = (username,email,password)=>{
    return axios.post(API_URL+"register",{
        username,
        email,
        password
    })
}*/
const login = async (username,password)=>{
    const res = await axios.post(API_URL + "login", {
        username,
        password
    })
    .then((res)=>{
        if(res.data.token){
            localStorage.setItem("user",JSON.stringify(res.data))
        }
        console.log(res.data);
    })
    

}

const logout =()=>{
    localStorage.removeItem("user");
}

const getCurrentUser=()=>{
    return JSON.parse(localStorage.getItem("user"));
}
const AuthServices={
   // register,
    login,
    logout,
    getCurrentUser
}

export default AuthServices;