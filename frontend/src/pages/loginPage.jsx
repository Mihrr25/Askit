import React, { useState,useEffect } from 'react';
import{useDispatch } from 'react-redux';
import { useNavigate} from 'react-router-dom';
// import arrowback from '../assets/arrowback.svg';
import {login,googleAuth} from "../actions/authActions"
import {connect} from "react-redux"
import { GoogleOAuthProvider,useGoogleLogin } from "@react-oauth/google";
// import { useGoogleLogin } from "@react-oauth/google";

function LoginPage() {
  // const [showPassword, setShowPassword] = useState(false);
  const dispatch=useDispatch();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit=(e)=>{
    e.preventDefault();
    // console.log(formData);
    dispatch(login(formData));
    // console.log("1222",formData);
  }

  const responseGoogle = async (authResult) => {
		try {
			if (authResult["code"]) {
				dispatch(googleAuth(authResult.code));
			} else {
				console.log(authResult);
				throw new Error(authResult);
			}
		} catch (e) {
			console.log('Error while Google Login...', e);
		}
	};


  const googleLogin = useGoogleLogin({
		onSuccess: responseGoogle,
		onError: responseGoogle,
		flow: "auth-code",
    
	});

  
  return (
    
    <div className="h-full w-full max-w-[500px] bg-black text-white flex flex-col p-4 justify-between">
      {/* Top Navigation Bar */}
      <div className="topNavBar flex w-full justify-between items-center mt-4">
        <div className="back-to-main-page flex pt-[0.2rem]"> 
        <button style={{ all: 'unset', cursor: 'pointer' }} className="h-full" type="button" onClick={() => navigate('/gettingstarted')}>
        <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="10" height="16" fill="none "/>
            <g id="App Icons">
            <rect width="663" height="1904" transform="translate(-118 -536)" fill="none"/>
            <g id="Iconly/Light/Arrow - Left 4">
            <g id="Iconly/Light/Arrow - Left 4_2">
            <g id="Arrow - Left 2">
            <path id="Stroke 1" d="M8.5 15L1.5 8L8.5 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
            </g>
            </g>
            </g>
        </svg>
          </button>
        </div>
        <div className="signIn flex">
          <div className="question text-white/50 text-sm">New User?</div>
          <div className="buttonmine flex items-center ml-[0.4rem]">
            <button style={{ all: 'unset', cursor: 'pointer' }} className="ml-2 h-full" type="button" onClick={() => navigate('/signup')}>
              <div className="text-white text-sm font-bold">Sign In</div>
            </button>
          </div>
        </div>
      </div>
      
      {/* Login Content */}
      <div className="flex flex-col w-full">
        <h1 className="text-4xl font-bold mb-15 sm:mb-8">Log In</h1>
        
        {/* Login Form */}
        <form className="flex flex-col w-full" onSubmit={(e)=>handleSubmit(e)}>
          {/* Email Input */}
          <div className="mb-4">
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-white/15 text-white p-3 rounded-md"
              required
            />
          </div>
          
          {/* Password Input with Toggle */}
          <div className="mb-4 relative">
            <input 
              type="password" 
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Enter password" 
              className="w-full bg-white/15 text-white p-3 rounded-md pr-10"
              required
            />
            
    
            <div className="flex justify-end mt-1">
              <button type="button" className="text-sm text-white" style={{cursor:"pointer", }}>Forgot password?</button>
            </div>
          </div>
          
          {/* Login Button */}
          <div className="self-center mt-4">
          <button type="submit" className="bg-white text-black w-[10rem] h-[2.75rem] font-bold py-1 px-4 rounded-md cursor-pointer">
            Log In
          </button>
          </div>
          
          {/* Divider */}
          <div className="flex items-center my-6 mt-13 mb-13 sm:my-4 sm:mt-8 sm:mb-8">
            <div className="flex-grow h-px bg-gray-700"></div>
            <span className="px-4 text-sm text-gray-400">or</span>
            <div className="flex-grow h-px bg-gray-700"></div>
          </div>
          
          {/* Social Login Buttons */}
          <button type="button" className="bg-blue-600 text-white py-3 px-4 rounded-md mb-3 flex items-center justify-center cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#ffffff">
              <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96C18.34 21.21 22 17.06 22 12.06C22 6.53 17.5 2.04 12 2.04Z" />
            </svg>
            <span className="ml-2">Continue with Facebook</span>
          </button>
          
          <button type="button" className="bg-white text-black py-3 px-4 rounded-md flex items-center justify-center cursor-pointer" onClick={() => googleLogin()}>
          <svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className='mr-1.75'>
          <path d="M27.7277 11.2581H26.6V11.2H14V16.8H21.9121C20.7578 20.0599 17.6561 22.4 14 22.4C9.3611 22.4 5.6 18.6389 5.6 14C5.6 9.3611 9.3611 5.6 14 5.6C16.1413 5.6 18.0894 6.4078 19.5727 7.7273L23.5326 3.7674C21.0322 1.4371 17.6876 0 14 0C6.2685 0 0 6.2685 0 14C0 21.7315 6.2685 28 14 28C21.7315 28 28 21.7315 28 14C28 13.0613 27.9034 12.145 27.7277 11.2581Z" fill="#FFC107"/>
          <path d="M1.61426 7.4837L6.21396 10.857C7.45856 7.7756 10.4728 5.6 14.0001 5.6C16.1414 5.6 18.0895 6.4078 19.5728 7.7273L23.5327 3.7674C21.0323 1.4371 17.6877 0 14.0001 0C8.62266 0 3.95926 3.0359 1.61426 7.4837Z" fill="#FF3D00"/>
          <path d="M13.9996 28.0001C17.6158 28.0001 20.9016 26.6162 23.3859 24.3657L19.0529 20.6991C17.6001 21.804 15.8249 22.4015 13.9996 22.4001C10.3582 22.4001 7.26633 20.0782 6.10153 16.8379L1.53613 20.3554C3.85313 24.8893 8.55853 28.0001 13.9996 28.0001Z" fill="#4CAF50"/>
          <path d="M27.7277 11.2581H26.6V11.2H14V16.8H21.9121C21.3599 18.3514 20.3653 19.7072 19.0512 20.6997L19.0533 20.6983L23.3863 24.3649C23.0797 24.6435 28 21 28 14C28 13.0613 27.9034 12.145 27.7277 11.2581Z" fill="#1976D2"/>
          </svg>
            <span className="ml-2">Continue with Google</span>
          </button>
        </form>
      </div>
      
      {/* App Version */}
      <div className="mt-10 mb-5 text-center text-xs text-gray-500 py-4 sm:py-0 sm:mt-5 sm:mb-2">
        App Version 1.5.2.0
      </div>
    </div>
      
  );
}

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps)(LoginPage);