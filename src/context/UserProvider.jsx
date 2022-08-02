import { 
         createUserWithEmailAndPassword, 
         onAuthStateChanged            , 
         signInWithEmailAndPassword    , 
         signOut 
        } from "firebase/auth";
import { createContext,useEffect,useState } from "react"
import { auth } from "../firebase";

export const UserContext = createContext();

const UserProvider = (props) => {
  
    const [user   ,setUser   ]= useState(false);
    
    useEffect(() => {
    
        const unSubscribe = onAuthStateChanged(auth,(user)=>{
        console.log(user)
        if(user){
            const {email,photoURL,displayName,uid}=user
            setUser({email,photoURL,displayName,uid})
        }else{
            setUser(null)
        }
        })  
    
        return () => unSubscribe();
    
    }, [])
    

    const registerUser=(email,password)=>createUserWithEmailAndPassword(auth,email,password);
    
    const loginUser   =(email,password)=>signInWithEmailAndPassword(auth,email,password);

    const signOutUser =()=>signOut(auth)

    return (
        <UserContext.Provider value={{user,setUser,registerUser,loginUser,signOutUser}}>
         {props.children}
        </UserContext.Provider>
        
    )
}

export default UserProvider