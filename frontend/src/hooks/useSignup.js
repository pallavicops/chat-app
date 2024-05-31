import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const {authUser,setAuthUser} = useAuthContext();

  const signup = async ({fullName, username, password, confirmPassword, gender})=>{
    const success = handleInputError({fullName, username, password, confirmPassword, gender})
    if(!success) return ;
    setLoading(true);
		try {
			const res = await fetch("/api/auth/signup", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ fullName, username, password, confirmPassword, gender }),
			});
            

			const data = await res.json();
            console.log(data);
			if (data.error) {
				throw new Error(data.error);
			}

            //localStorege
            localStorage.setItem("chat-user",JSON.stringify(data));

            //Context
            setAuthUser(data);
			
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, signup };
    
  
}

export default useSignup

function handleInputError({fullName, username, password, confirmPassword, gender}){
    if(!fullName || !username || !password || !confirmPassword || !gender){
        toast.error("Please fill all the fields");
        return false;
    }
    if(password !== confirmPassword){
        toast.error("password do not match");
        return false;
    }
    if(password.length>6){
        toast.error("length of the password is more then 6 digit")
        return false;
    }
    return true;
}
