import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();
export const AuthContexts = () => {
    return useContext(AuthContext);
  };

export const AuthProvider = ({children})=>{
    const navigate   =useNavigate();
    const [user,setUser] = useState(null);

    const setUserData = async(data)=>{
        setUser(data);
    }
    const loggedOutUser = async()=>{
        localStorage.removeItem("authToken")
        setUser(null);
        navigate("/")
    }

    const value ={
        user:user,
        setUserData,
        loggedOutUser
    }


    return(
        <AuthContext.Provider value={value}>
        {children}
        </AuthContext.Provider>
    );
}